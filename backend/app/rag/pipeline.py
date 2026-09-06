from app.rag.vector_store import search_chunks
from app.rag.generator import generate_answer


def ask_question(question: str, limit: int = 3) -> dict:
    """
    Complete RAG pipeline:
    Question
        ↓
    Retrieval
        ↓
    Context with page numbers
        ↓
    LLM generation
        ↓
    Answer + Sources
    """

    results = search_chunks(
        question,
        limit=limit,
        min_score=0.55
    )

    # No relevant information found
    if not results:
        return {
            "answer": (
                "Information not found in the provided "
                "university study materials."
            ),
            "sources": []
        }

    # Include page numbers in the context
    context_parts = []

    for index, result in enumerate(results, start=1):
        context_parts.append(
            f"SOURCE {index} [Page {result['page']}]\n"
            f"{result['text']}"
        )

    context = "\n\n".join(context_parts)

    answer = generate_answer(
        question,
        context
    )

    return {
        "answer": answer,
        "sources": results
    }