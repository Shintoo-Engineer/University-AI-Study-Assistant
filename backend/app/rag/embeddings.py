from sentence_transformers import SentenceTransformer


# Load the local embedding model
model = SentenceTransformer("all-MiniLM-L6-v2")


def create_embedding(text: str) -> list[float]:
    """
    Create an embedding vector for the given text.
    """

    embedding = model.encode(text)

    return embedding.tolist()