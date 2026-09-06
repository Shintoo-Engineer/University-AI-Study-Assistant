from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.pipeline import ask_question


app = FastAPI(
    title="University AI Study Assistant",
    description="RAG-based university study assistant"
)


# ============================================================
# CORS
# ============================================================

app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3001"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


# ============================================================
# REQUEST MODEL
# ============================================================

class QuestionRequest(BaseModel):
    question: str
    document: str | None = None


# ============================================================
# ROOT ENDPOINT
# ============================================================

@app.get("/")
def root():
    return {
        "message": "University AI Study Assistant API is running"
    }


# ============================================================
# ASK QUESTION
# ============================================================

@app.post("/ask")
def ask(request: QuestionRequest):

    result = ask_question(
        request.question,
        document=request.document
    )

    return {
        "question": request.question,
        "document": request.document,
        "answer": result["answer"],
        "sources": result["sources"]
    }