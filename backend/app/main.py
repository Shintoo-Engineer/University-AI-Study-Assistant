from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.pipeline import ask_question


app = FastAPI(
    title="University AI Study Assistant",
    description="RAG-based university study assistant"
)


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
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
def ask(request: QuestionRequest):
    result = ask_question(request.question)

    return {
        "question": request.question,
        "answer": result["answer"],
        "sources": result["sources"]
    }