from app.rag.loader import load_pdf
from app.rag.cleaner import clean_text


PDF_PATH = "../data/documents/CCS335-Cloud-Computing-Lecture-Notes-1.pdf"


text = load_pdf(PDF_PATH)

print("=" * 60)
print("BEFORE CLEANING")
print("=" * 60)

print(text[:2000])


cleaned_text = clean_text(text)

print("\n" + "=" * 60)
print("AFTER CLEANING")
print("=" * 60)

print(cleaned_text[:2000])

print("\n" + "=" * 60)
print("CLEANING COMPLETE")
print("=" * 60)

print(f"Original characters: {len(text)}")
print(f"Cleaned characters: {len(cleaned_text)}")