from app.rag.vector_store import search_chunks
from app.rag.generator import generate_answer


def ask_question(question: str, limit: int = 3) -> dict:
    """
    Complete RAG pipeline:
    Question → Retrieval → Context → Generation → Answer + Sources
    """

    results = search_chunks(question, limit=limit)

    context = "\n\n".join(
        result["text"]
        for result in results
    )

    answer = generate_answer(
        question,
        context
    )

    return {
        "answer": answer,
        "sources": results
    }