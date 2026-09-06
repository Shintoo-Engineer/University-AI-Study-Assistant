from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

from app.rag.pipeline import ask_question


# ============================================================
# FASTAPI APPLICATION
# ============================================================

app = FastAPI(
    title="University AI Study Assistant",
    description="RAG-based university study assistant",
    version="1.0.0",
)


# ============================================================
# CORS
# ============================================================

# Allow the Vercel frontend and local development frontend
# to communicate with the FastAPI backend.
#
# Since this project does not use browser credentials/cookies,
# wildcard origins are safe for this demo configuration.

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=False,
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
# HEALTH CHECK
# ============================================================

@app.get("/health")
def health():
    return {
        "status": "healthy",
        "service": "University AI Study Assistant API"
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