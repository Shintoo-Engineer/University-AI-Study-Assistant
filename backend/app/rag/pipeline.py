from app.rag.vector_store import search_chunks
from app.rag.generator import generate_answer


def ask_question(
    question: str,
    document: str | None = None,
    limit: int = 3
) -> dict:
    """
    Complete RAG pipeline:

    Question
        ↓
    Optional document filter
        ↓
    Retrieval
        ↓
    Context with page numbers
        ↓
    LLM generation
        ↓
    Answer + Sources
    """

    # ========================================================
    # RETRIEVE RELEVANT CHUNKS
    # ========================================================

    results = search_chunks(
        question,
        limit=limit,
        min_score=0.55,
        document=document
    )

    # ========================================================
    # NO RELEVANT INFORMATION
    # ========================================================

    if not results:
        return {
            "answer": (
                "Information not found in the selected "
                "university study materials."
            ),
            "sources": []
        }

    # ========================================================
    # BUILD CONTEXT
    # ========================================================

    context_parts = []

    for index, result in enumerate(results, start=1):

        context_parts.append(
            f"SOURCE {index} "
            f"[Document: {result['document']}] "
            f"[Page {result['page']}]\n"
            f"{result['text']}"
        )

    context = "\n\n".join(context_parts)

    # ========================================================
    # GENERATE ANSWER
    # ========================================================

    answer = generate_answer(
        question,
        context
    )

    # ========================================================
    # RETURN ANSWER + SOURCES
    # ========================================================

    return {
        "answer": answer,
        "sources": results
    }