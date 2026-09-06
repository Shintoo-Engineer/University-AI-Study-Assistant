from app.rag.loader import load_pdf
from app.rag.chunker import chunk_text
from app.rag.vector_store import create_collection, add_chunks


PDF_PATH = "../data/documents/CCS335-Cloud-Computing-Lecture-Notes-1.pdf"


print("=" * 60)
print("LOADING PDF")
print("=" * 60)

text = load_pdf(PDF_PATH)

print(f"Characters: {len(text)}")


print("\n" + "=" * 60)
print("CHUNKING PDF")
print("=" * 60)

chunks = chunk_text(
    text,
    chunk_size=1000,
    chunk_overlap=200
)

print(f"Chunks: {len(chunks)}")


print("\n" + "=" * 60)
print("CREATING QDRANT COLLECTION")
print("=" * 60)

create_collection()


print("\n" + "=" * 60)
print("STORING EMBEDDINGS")
print("=" * 60)

add_chunks(chunks)


print("\n" + "=" * 60)
print("INDEXING COMPLETE")
print("=" * 60)