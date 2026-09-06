from app.rag.loader import load_pdf
from app.rag.chunker import chunk_text


pdf_path = "../data/documents/CCS335-Cloud-Computing-Lecture-Notes-1.pdf"

# Step 1: Load PDF
text = load_pdf(pdf_path)

print("=" * 60)
print("PDF LOADED")
print("=" * 60)

print(f"Total characters: {len(text)}")


# Step 2: Chunk the text
chunks = chunk_text(
    text,
    chunk_size=1000,
    chunk_overlap=200
)

print("\n" + "=" * 60)
print("CHUNKING COMPLETE")
print("=" * 60)

print(f"Total chunks: {len(chunks)}")


# Display first 3 chunks
for i, chunk in enumerate(chunks[:3], start=1):
    print("\n" + "-" * 60)
    print(f"CHUNK {i}")
    print("-" * 60)
    print(chunk)