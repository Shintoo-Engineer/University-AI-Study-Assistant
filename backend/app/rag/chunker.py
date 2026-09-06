def chunk_pages(
    pages: list[dict],
    chunk_size: int = 1000,
    chunk_overlap: int = 200
) -> list[dict]:
    """
    Split PDF pages into overlapping chunks
    while preserving page numbers.
    """

    if chunk_size <= chunk_overlap:
        raise ValueError(
            "chunk_size must be greater than chunk_overlap"
        )

    chunks = []

    for page in pages:

        text = page["text"]
        page_number = page["page"]

        start = 0
        text_length = len(text)

        while start < text_length:

            end = min(
                start + chunk_size,
                text_length
            )

            # Try to end at a sentence boundary
            if end < text_length:

                sentence_end = text.rfind(
                    ".",
                    start,
                    end
                )

                if sentence_end > start + (chunk_size // 2):
                    end = sentence_end + 1

            chunk_text = text[start:end].strip()

            if chunk_text:

                chunks.append({
                    "page": page_number,
                    "text": chunk_text
                })

            # Always move forward
            next_start = end - chunk_overlap

            if next_start <= start:
                next_start = end

            start = next_start

    return chunks