from pathlib import Path

from app.rag.loader import load_pdf
from app.rag.cleaner import clean_text
from app.rag.chunker import chunk_pages
from app.rag.vector_store import create_collection, add_chunks


DOCUMENTS_DIR = Path("../data/documents")


def index_all_pdfs():
    """
    Find and index every PDF inside data/documents.
    """

    pdf_files = list(DOCUMENTS_DIR.glob("*.pdf"))

    if not pdf_files:
        print("No PDF files found.")
        return

    print("=" * 60)
    print("MULTI-PDF RAG INDEXING")
    print("=" * 60)

    print(f"\nFound {len(pdf_files)} PDF file(s).")

    create_collection()

    for pdf_path in pdf_files:

        print("\n" + "-" * 60)
        print(f"Processing: {pdf_path.name}")
        print("-" * 60)

        pages = load_pdf(str(pdf_path))

        print(f"Pages: {len(pages)}")

        for page in pages:
            page["text"] = clean_text(page["text"])

        chunks = chunk_pages(pages)

        print(f"Chunks: {len(chunks)}")

        for chunk in chunks:
            chunk["document"] = pdf_path.name

        add_chunks(chunks)

    print("\n" + "=" * 60)
    print("MULTI-PDF INDEXING COMPLETE")
    print("=" * 60)


if __name__ == "__main__":
    index_all_pdfs()