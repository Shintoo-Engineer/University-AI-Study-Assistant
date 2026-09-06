import atexit
import uuid

from qdrant_client import QdrantClient
from qdrant_client.models import (
    Distance,
    VectorParams,
    PointStruct,
    Filter,
    FieldCondition,
    MatchValue,
)

from app.rag.embeddings import create_embedding


# ============================================================
# LOCAL QDRANT DATABASE
# ============================================================

client = QdrantClient(path="qdrant_data")

COLLECTION_NAME = "university_documents"

VECTOR_SIZE = 384


# ============================================================
# CREATE COLLECTION
# ============================================================

def create_collection():
    """
    Create the Qdrant collection if it does not already exist.
    """

    existing_collections = [
        collection.name
        for collection in client.get_collections().collections
    ]

    if COLLECTION_NAME not in existing_collections:

        client.create_collection(
            collection_name=COLLECTION_NAME,
            vectors_config=VectorParams(
                size=VECTOR_SIZE,
                distance=Distance.COSINE
            )
        )

        print(
            f"Collection '{COLLECTION_NAME}' created."
        )

    else:

        print(
            f"Collection '{COLLECTION_NAME}' already exists."
        )


# ============================================================
# ADD CHUNKS
# ============================================================

def add_chunks(chunks: list[dict]):
    """
    Convert text chunks into embeddings
    and store them in Qdrant.

    Each chunk gets a deterministic UUID based
    on the document name and chunk index.
    """

    if not chunks:
        print("No chunks to store.")
        return

    points = []

    for index, chunk in enumerate(chunks):

        print(
            f"Embedding chunk {index + 1}/{len(chunks)}"
        )

        # Create embedding
        vector = create_embedding(
            chunk["text"]
        )

        # Get document name
        document_name = chunk.get(
            "document",
            "unknown_document"
        )

        # Create deterministic unique ID
        unique_id = str(
            uuid.uuid5(
                uuid.NAMESPACE_URL,
                f"{document_name}_{index}"
            )
        )

        # Create Qdrant point
        point = PointStruct(
            id=unique_id,
            vector=vector,
            payload={
                "text": chunk["text"],
                "page": chunk["page"],
                "document": document_name
            }
        )

        points.append(point)

    # Store points
    client.upsert(
        collection_name=COLLECTION_NAME,
        points=points
    )

    print(
        f"\nStored {len(points)} chunks in Qdrant."
    )


# ============================================================
# SEARCH CHUNKS
# ============================================================

def search_chunks(
    query: str,
    limit: int = 5,
    min_score: float = 0.55,
    document: str | None = None
) -> list[dict]:
    """
    Search Qdrant for relevant university-note chunks.

    If 'document' is provided, search only inside
    that specific PDF.

    Example:

        search_chunks(
            "What is Docker?",
            document="CCS335-Cloud-Computing-Lecture-Notes-1.pdf"
        )
    """

    # Reject empty questions
    if not query.strip():
        return []

    # Create embedding for the question
    query_vector = create_embedding(query)

    # ========================================================
    # OPTIONAL DOCUMENT FILTER
    # ========================================================

    query_filter = None

    if document:

        query_filter = Filter(
            must=[
                FieldCondition(
                    key="document",
                    match=MatchValue(
                        value=document
                    )
                )
            ]
        )

    # ========================================================
    # SEARCH QDRANT
    # ========================================================

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        query_filter=query_filter,
        limit=limit,
        with_payload=True
    )

    # ========================================================
    # PROCESS RESULTS
    # ========================================================

    matches = []

    for result in results.points:

        score = float(result.score)

        # Reject weak/unrelated results
        if score < min_score:
            continue

        if result.payload and "text" in result.payload:

            matches.append({
                "score": score,
                "page": result.payload.get("page"),
                "text": result.payload["text"],
                "document": result.payload.get("document")
            })

    return matches


# ============================================================
# CLOSE QDRANT CLEANLY
# ============================================================

def close_qdrant():
    """
    Close the local Qdrant database cleanly.
    """

    try:
        client.close()
    except Exception:
        pass


# ============================================================
# REGISTER CLEANUP
# ============================================================

atexit.register(close_qdrant)