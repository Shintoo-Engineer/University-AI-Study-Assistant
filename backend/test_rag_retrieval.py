from app.rag.vector_store import search_chunks


print("=" * 60)
print("UNIVERSITY AI STUDY ASSISTANT")
print("=" * 60)


question = input("\nAsk a question: ")


results = search_chunks(
    question,
    limit=3
)


print("\n" + "=" * 60)
print("RELEVANT INFORMATION FROM YOUR NOTES")
print("=" * 60)


for i, result in enumerate(results, start=1):

    print("\n" + "-" * 60)
    print(f"RESULT {i}")
    print(f"Page: {result['page']}")
    print(f"Similarity: {result['score']:.4f}")
    print("-" * 60)

    print(result["text"])