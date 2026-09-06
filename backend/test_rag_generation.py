from app.rag.vector_store import search_chunks
from app.rag.generator import generate_answer


question = input("Ask a question: ")

# Retrieve relevant university notes
results = search_chunks(question, limit=3)

# Combine retrieved chunks
context = "\n\n".join(
    result["text"]
    for result in results
)

# Generate answer using retrieved notes
answer = generate_answer(
    question,
    context
)

print("\n" + "=" * 60)
print("RAG ANSWER")
print("=" * 60)

print("\nQuestion:")
print(question)

print("\nAnswer:")
print(answer)

print("\n" + "=" * 60)
print("SOURCES")
print("=" * 60)

for i, result in enumerate(results, start=1):
    print(f"\nSource {i} - Similarity: {result['score']:.4f}")