from app.rag.vector_store import search_chunks


query = "What is Docker?"

results = search_chunks(query, limit=5)


print("=" * 60)
print("SEMANTIC SEARCH RESULTS")
print("=" * 60)

print(f"\nQuestion: {query}")

for i, result in enumerate(results, start=1):

    print("\n" + "-" * 60)
    print(f"RESULT {i}")
    print(f"Similarity score: {result['score']:.4f}")
    print("-" * 60)

    print(result["text"])