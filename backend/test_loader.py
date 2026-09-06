from app.rag.loader import load_pdf


pdf_path = "../data/documents/CCS335-Cloud-Computing-Lecture-Notes-1.pdf"

text = load_pdf(pdf_path)

print("=" * 60)
print("PDF LOADED SUCCESSFULLY")
print("=" * 60)

print(f"\nTotal characters: {len(text)}")

print("\nFirst 2000 characters:")
print(text[:2000])