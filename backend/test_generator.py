from app.rag.generator import generate_answer


question = "What is cloud computing?"

context = """
Cloud computing provides on-demand access to computing resources
such as software, hardware, and data as a service.
"""


answer = generate_answer(
    question,
    context
)


print("=" * 60)
print("LOCAL LLM TEST")
print("=" * 60)

print("\nQuestion:")
print(question)

print("\nAnswer:")
print(answer)