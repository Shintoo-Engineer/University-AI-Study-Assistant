import atexit

from qdrant_client import QdrantClient
from qdrant_client.models import Distance, VectorParams, PointStruct

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
    and store them in Qdrant with page numbers.
    """

    if not chunks:
        print("No chunks to store.")
        return

    points = []

    for index, chunk in enumerate(chunks):

        print(
            f"Embedding chunk {index + 1}/{len(chunks)}"
        )

        vector = create_embedding(
            chunk["text"]
        )

        point = PointStruct(
            id=index,
            vector=vector,
            payload={
                "text": chunk["text"],
                "page": chunk["page"]
            }
        )

        points.append(point)

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
    min_score: float = 0.55
) -> list[dict]:
    """
    Search Qdrant for relevant university-note chunks.

    Only return chunks whose similarity score is
    greater than or equal to min_score.
    """

    if not query.strip():
        return []

    query_vector = create_embedding(query)

    results = client.query_points(
        collection_name=COLLECTION_NAME,
        query=query_vector,
        limit=limit,
        with_payload=True
    )

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
                "text": result.payload["text"]
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


# Register cleanup when Python exits
atexit.register(close_qdrant)