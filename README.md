# University AI Study Assistant

A **RAG-based AI study assistant** designed for university students. It allows students to ask questions from their study materials and receive AI-generated answers based on the relevant content retrieved from uploaded documents.

## 🚀 Features

* 📚 **PDF Study Material Support**
* 🔎 **Semantic Search using RAG**
* 🤖 **AI-generated answers**
* 📄 **Source references with page numbers**
* 🧠 **Hugging Face local AI models**
* ⚡ **FastAPI backend**
* 💻 **Next.js + TypeScript frontend**
* 🗄️ **Qdrant vector database**
* 🐳 **Docker & Docker Compose**
* 🔐 **No OpenAI API required**

## 🏗️ Tech Stack

| Technology            | Purpose              |
| --------------------- | -------------------- |
| Next.js               | Frontend             |
| TypeScript            | Frontend development |
| Tailwind CSS          | UI styling           |
| Python                | Backend & RAG        |
| FastAPI               | REST API             |
| Sentence Transformers | Text embeddings      |
| Qdrant                | Vector database      |
| Hugging Face          | Local LLM            |
| PyTorch               | Model inference      |
| Docker                | Containerization     |

## 🔄 RAG Architecture

```text
University PDFs
      ↓
   PDF Loader
      ↓
    Cleaner
      ↓
    Chunker
      ↓
  Embeddings
      ↓
 Qdrant Vector DB
      ↓
   User Question
      ↓
Question Embedding
      ↓
 Semantic Search
      ↓
Relevant Documents
      ↓
   Local LLM
      ↓
   AI Answer
      ↓
 Answer + Sources
```

## 📁 Project Structure

```text
University-AI-Study-Assistant/
│
├── backend/
│   ├── app/
│   │   ├── rag/
│   │   │   ├── loader.py
│   │   │   ├── cleaner.py
│   │   │   ├── chunker.py
│   │   │   ├── embeddings.py
│   │   │   ├── vector_store.py
│   │   │   ├── generator.py
│   │   │   └── pipeline.py
│   │   ├── main.py
│   │   └── __init__.py
│   │
│   ├── requirements.txt
│   └── Dockerfile
│
├── frontend/
│   ├── app/
│   ├── public/
│   ├── package.json
│   └── Dockerfile
│
├── data/
│   └── documents/
│
├── docker-compose.yml
├── .gitignore
└── README.md
```

## 🐳 Run with Docker

Clone the repository:

```bash
git clone https://github.com/Shintoo-Engineer/University-AI-Study-Assistant.git
```

Go into the project:

```bash
cd University-AI-Study-Assistant
```

Start the application:

```bash
docker compose up -d --build
```

The application will run on:

```text
Frontend: http://localhost:3001
Backend:  http://localhost:8000
```

## 🔌 API

### Health Check

```http
GET /health
```

### Ask a Question

```http
POST /ask
```

Example:

```json
{
  "question": "What is Docker?"
}
```

The API returns the generated answer along with the retrieved document sources and page numbers.

## 🎯 Project Goal

The goal of this project is to provide university students with an AI-powered learning assistant that can answer questions **from their actual study materials rather than relying only on general-purpose AI knowledge**.

## 📌 Current Status

* ✅ PDF ingestion
* ✅ Text cleaning
* ✅ Text chunking
* ✅ Embeddings
* ✅ Qdrant vector search
* ✅ RAG retrieval
* ✅ Local LLM generation
* ✅ FastAPI API
* ✅ Next.js frontend
* ✅ Docker Compose
* 🚧 Public cloud deployment

## 👨‍💻 Project

**University AI Study Assistant**

Built as a university-focused RAG application for intelligent study-material search and question answering.
