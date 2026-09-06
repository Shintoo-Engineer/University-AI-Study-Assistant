from app.rag.embeddings import create_embedding


text = "What is cloud computing?"

embedding = create_embedding(text)

print("=" * 60)
print("EMBEDDING CREATED")
print("=" * 60)

print(f"Vector length: {len(embedding)}")

print("\nFirst 10 values:")
print(embedding[:10])