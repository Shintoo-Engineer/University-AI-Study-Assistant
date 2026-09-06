from app.rag.loader import load_pdf
from app.rag.cleaner import clean_text
from app.rag.chunker import chunk_pages
from app.rag.vector_store import create_collection, add_chunks


PDF_PATH = "../data/documents/CCS335-Cloud-Computing-Lecture-Notes-1.pdf"


print("=" * 60)
print("PAGE-AWARE RAG INDEXING")
print("=" * 60)


# 1. Load PDF with page numbers
pages = load_pdf(PDF_PATH)

print(f"\nTotal pages: {len(pages)}")


# 2. Clean each page
for page in pages:
    page["text"] = clean_text(page["text"])


print("PDF cleaning complete.")


# 3. Create page-aware chunks
chunks = chunk_pages(pages)

print(f"Total chunks: {len(chunks)}")


# 4. Create Qdrant collection
create_collection()


# 5. Store chunks and page numbers
add_chunks(chunks)


print("\n" + "=" * 60)
print("PAGE-AWARE INDEXING COMPLETE")
print("=" * 60)