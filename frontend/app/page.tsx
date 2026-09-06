"use client";

import { useState } from "react";

type Source = {
  score: number;
  text: string;
};

export default function Home() {
  const [question, setQuestion] = useState("");
  const [answer, setAnswer] = useState("");
  const [sources, setSources] = useState<Source[]>([]);
  const [loading, setLoading] = useState(false);

  const askQuestion = async (selectedQuestion?: string) => {
    const currentQuestion = selectedQuestion ?? question;

    if (!currentQuestion.trim()) return;

    setQuestion(currentQuestion);
    setLoading(true);
    setAnswer("");
    setSources([]);

    try {
      const response = await fetch("http://127.0.0.1:8000/ask", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: currentQuestion,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error("Failed to get answer");
      }

      setAnswer(
        data.answer || "No answer could be generated."
      );

      setSources(data.sources || []);
    } catch (error) {
      console.error(error);
      setAnswer(
        "Unable to connect to the RAG backend. Make sure the FastAPI server is running."
      );
    } finally {
      setLoading(false);
    }
  };

  const clearChat = () => {
    setQuestion("");
    setAnswer("");
    setSources([]);
  };

  return (
    <main className="min-h-screen bg-slate-50 text-slate-900">

      {/* Header */}
      <header className="border-b bg-white">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-5">

          <div>
            <h1 className="text-2xl font-bold">
              📚 University AI Study Assistant
            </h1>

            <p className="mt-1 text-sm text-slate-500">
              AI-powered answers from your university study materials
            </p>
          </div>

          <div className="hidden rounded-full bg-green-50 px-4 py-2 text-sm font-medium text-green-700 sm:block">
            ● RAG Online
          </div>

        </div>
      </header>


      {/* Main */}
      <div className="mx-auto max-w-6xl px-6 py-10">

        {/* Welcome */}
        {!answer && !loading && (
          <div className="mb-10 text-center">

            <div className="mb-4 text-5xl">
              🎓
            </div>

            <h2 className="text-3xl font-bold">
              Study smarter with AI
            </h2>

            <p className="mx-auto mt-3 max-w-2xl text-slate-500">
              Ask questions about your university notes and get
              answers based on your uploaded study materials.
            </p>

          </div>
        )}


        {/* Question Area */}
        <div className="rounded-2xl border bg-white p-6 shadow-sm">

          <div className="mb-3 flex items-center justify-between">

            <label className="text-sm font-semibold">
              Ask your question
            </label>

            {(question || answer) && (
              <button
                onClick={clearChat}
                className="text-sm text-slate-500 hover:text-slate-900"
              >
                Clear
              </button>
            )}

          </div>


          <textarea
            value={question}
            onChange={(e) => setQuestion(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter" && !e.shiftKey) {
                e.preventDefault();
                askQuestion();
              }
            }}
            placeholder="Example: What are the types of cloud deployment models?"
            className="min-h-32 w-full resize-none rounded-xl border border-slate-300 bg-slate-50 p-4 text-slate-900 outline-none transition focus:border-blue-500 focus:bg-white focus:ring-2 focus:ring-blue-100"
          />


          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">

            <p className="text-xs text-slate-400">
              Press Enter to ask • Shift + Enter for a new line
            </p>

            <button
              onClick={() => askQuestion()}
              disabled={loading || !question.trim()}
              className="rounded-xl bg-blue-600 px-7 py-3 font-semibold text-white transition hover:bg-blue-700 disabled:cursor-not-allowed disabled:bg-slate-300"
            >
              {loading ? "Thinking..." : "Ask Question →"}
            </button>

          </div>

        </div>


        {/* Quick Questions */}
        {!answer && !loading && (
          <div className="mt-6">

            <p className="mb-3 text-sm font-semibold text-slate-700">
              Try asking
            </p>

            <div className="grid gap-3 md:grid-cols-3">

              <button
                onClick={() =>
                  askQuestion("What is Docker?")
                }
                className="rounded-xl border bg-white p-4 text-left text-sm transition hover:border-blue-400 hover:shadow-sm"
              >
                <span className="text-lg">🐳</span>

                <span className="mt-2 block font-medium">
                  What is Docker?
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Learn the basics of Docker
                </span>
              </button>


              <button
                onClick={() =>
                  askQuestion("What are Docker Components?")
                }
                className="rounded-xl border bg-white p-4 text-left text-sm transition hover:border-blue-400 hover:shadow-sm"
              >
                <span className="text-lg">⚙️</span>

                <span className="mt-2 block font-medium">
                  What are Docker Components?
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Understand Docker architecture
                </span>
              </button>


              <button
                onClick={() =>
                  askQuestion(
                    "What are the types of cloud deployment models?"
                  )
                }
                className="rounded-xl border bg-white p-4 text-left text-sm transition hover:border-blue-400 hover:shadow-sm"
              >
                <span className="text-lg">☁️</span>

                <span className="mt-2 block font-medium">
                  Cloud deployment models
                </span>

                <span className="mt-1 block text-xs text-slate-500">
                  Explore cloud deployment types
                </span>
              </button>

            </div>

          </div>
        )}


        {/* Loading */}
        {loading && (
          <div className="mt-8 rounded-2xl border bg-white p-8 text-center shadow-sm">

            <div className="mx-auto mb-4 h-8 w-8 animate-spin rounded-full border-4 border-slate-200 border-t-blue-600" />

            <p className="font-medium">
              Searching your study materials...
            </p>

            <p className="mt-1 text-sm text-slate-500">
              Retrieving relevant notes and generating an answer
            </p>

          </div>
        )}


        {/* Answer */}
        {answer && !loading && (
          <section className="mt-8">

            <div className="rounded-2xl border bg-white shadow-sm">

              <div className="border-b px-6 py-5">

                <div className="flex items-center gap-3">

                  <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100 text-xl">
                    🤖
                  </div>

                  <div>
                    <h2 className="font-bold">
                      AI Answer
                    </h2>

                    <p className="text-xs text-slate-500">
                      Generated from your university materials
                    </p>
                  </div>

                </div>

              </div>


              <div className="px-6 py-6">

                <div className="whitespace-pre-line leading-8 text-slate-700">
                  {answer}
                </div>

              </div>

            </div>


            {/* Sources */}
            {sources.length > 0 && (
              <div className="mt-6">

                <div className="mb-4">

                  <h2 className="text-xl font-bold">
                    📖 Retrieved Sources
                  </h2>

                  <p className="mt-1 text-sm text-slate-500">
                    Relevant sections retrieved from your study materials
                  </p>

                </div>


                <div className="space-y-4">

                  {sources.map((source, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border bg-white p-5 shadow-sm"
                    >

                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-sm font-bold">
                            {index + 1}
                          </div>

                          <h3 className="font-semibold">
                            Source {index + 1}
                          </h3>

                        </div>


                        <div className="flex items-center gap-2">
                          <span className="rounded-full bg-blue-50 px-3 py-1 text-xs font-semibold text-blue-700">
                            Similarity: {source.score.toFixed(4)}
                          </span>

                         {source.page && (
                           <span className="rounded-full bg-slate-100 px-3 py-1 text-xs font-semibold text-slate-700">
                             Page: {source.page}
                           </span>
                          )}
                      </div>

                      </div>


                      <p className="whitespace-pre-line leading-7 text-slate-600">
                        {source.text}
                      </p>

                    </div>

                  ))}

                </div>

              </div>
            )}

          </section>
        )}

      </div>


      {/* Footer */}
      <footer className="mt-16 border-t bg-white">

        <div className="mx-auto max-w-6xl px-6 py-6 text-center text-xs text-slate-400">

          University AI Study Assistant •
          RAG + Qdrant + Local LLM

        </div>

      </footer>

    </main>
  );
}