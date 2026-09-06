from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.vector_store import search_chunks
from app.rag.generator import generate_answer


app = FastAPI(
    title="University AI Study Assistant",
    description="RAG-based university study assistant"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3001"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


class QuestionRequest(BaseModel):
    question: str


@app.get("/")
def root():
    return {
        "message": "University AI Study Assistant API is running"
    }


@app.post("/ask")
def ask_question(request: QuestionRequest):

    # Step 1: Retrieve relevant university notes
    results = search_chunks(
        request.question,
        limit=3
    )

    # Step 2: Combine retrieved chunks
    context = "\n\n".join(
        result["text"]
        for result in results
    )

    # Step 3: Generate answer using local LLM
    answer = generate_answer(
        request.question,
        context
    )

    # Step 4: Return answer + sources
    return {
        "question": request.question,
        "answer": answer,
        "sources": results
    }