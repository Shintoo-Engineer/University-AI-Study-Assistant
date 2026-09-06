"use client";

import { useState } from "react";

type Source = {
  score: number;
  text: string;
  page?: number;
  document?: string;
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
    <main className="min-h-screen overflow-hidden bg-white text-slate-900">

      {/* ===================================================== */}
      {/* HEADER */}
      {/* ===================================================== */}

      <header className="relative z-20 border-b border-slate-200/70 bg-white/90 backdrop-blur-xl">

        <div className="mx-auto flex h-[84px] max-w-[1600px] items-center justify-between px-6 lg:px-12">

          {/* Logo */}

          <div className="flex items-center gap-4">

            <div className="flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-fuchsia-500 shadow-lg shadow-violet-300/40">

              <span className="text-3xl">
                🎓
              </span>

            </div>

            <div>

              <h1 className="text-xl font-extrabold tracking-tight text-slate-950 sm:text-2xl">
                University{" "}
                <span className="bg-gradient-to-r from-blue-600 via-violet-600 to-fuchsia-500 bg-clip-text text-transparent">
                  AI
                </span>{" "}
                Study Assistant
              </h1>

              <p className="text-sm text-slate-500">
                Your intelligent university study companion
              </p>

            </div>

          </div>


          {/* Navigation */}

          <nav className="hidden items-center gap-2 lg:flex">

            <button className="flex items-center gap-2 rounded-full bg-gradient-to-r from-violet-600 to-blue-500 px-6 py-3 text-sm font-semibold text-white shadow-lg shadow-violet-200">
              <span>⌂</span>
              Home
            </button>

            <button className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <span>▣</span>
              Library
            </button>

            <button className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <span>◷</span>
              Chat History
            </button>

            <button className="flex items-center gap-2 rounded-full px-5 py-3 text-sm font-medium text-slate-600 transition hover:bg-slate-100 hover:text-slate-900">
              <span>📖</span>
              Resources
            </button>

          </nav>


          {/* Status */}

          <div className="flex items-center gap-2 rounded-full border border-emerald-200 bg-slate-950 px-5 py-3 text-sm font-bold text-emerald-300 shadow-xl shadow-slate-300/30">

            <span className="h-2.5 w-2.5 animate-pulse rounded-full bg-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.9)]" />

            RAG Online

          </div>

        </div>

      </header>


      {/* ===================================================== */}
      {/* HERO */}
      {/* ===================================================== */}

      <section className="relative min-h-[680px] overflow-hidden bg-gradient-to-br from-blue-50 via-white to-violet-50">

        {/* Background glow */}

        <div className="absolute -left-40 top-20 h-[450px] w-[450px] rounded-full bg-blue-300/30 blur-[100px]" />

        <div className="absolute -right-40 top-10 h-[500px] w-[500px] rounded-full bg-fuchsia-300/30 blur-[110px]" />

        <div className="absolute bottom-0 left-[35%] h-[350px] w-[500px] rounded-full bg-cyan-200/30 blur-[120px]" />


        {/* Decorative circles */}

        <div className="absolute left-[-100px] top-[300px] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-violet-200/60 to-blue-100/20" />

        <div className="absolute right-[-100px] top-[420px] h-[280px] w-[280px] rounded-full bg-gradient-to-br from-blue-200/60 to-cyan-100/20" />


        {/* ================================================= */}
        {/* LEFT DECORATION */}
        {/* ================================================= */}

        <div className="absolute left-[3%] top-[90px] hidden xl:block">

          <div className="mb-5 rotate-[-5deg] text-center">

            <p className="text-lg font-bold leading-6 text-slate-800">
              All your
              <br />
              study materials
              <br />
              in one place
            </p>

            <div className="mt-3 text-3xl text-violet-500">
              ↘
            </div>

          </div>


          {/* Books */}

          <div className="space-y-[-8px]">

            <div className="flex h-16 w-64 rotate-[-5deg] items-center justify-center rounded-2xl border-4 border-blue-400 bg-gradient-to-r from-blue-400 to-blue-600 text-xl font-bold text-white shadow-xl">
              📘 Notes
            </div>

            <div className="flex h-16 w-64 rotate-[-4deg] items-center justify-center rounded-2xl border-4 border-violet-400 bg-gradient-to-r from-violet-500 to-purple-600 text-xl font-bold text-white shadow-xl">
              📕 Syllabus
            </div>

            <div className="flex h-16 w-64 rotate-[-3deg] items-center justify-center rounded-2xl border-4 border-pink-400 bg-gradient-to-r from-pink-500 to-rose-500 text-xl font-bold text-white shadow-xl">
              📗 Textbooks
            </div>

            <div className="flex h-16 w-64 rotate-[-2deg] items-center justify-center rounded-2xl border-4 border-orange-300 bg-gradient-to-r from-orange-400 to-amber-500 text-xl font-bold text-white shadow-xl">
              📙 Previous Papers
            </div>

          </div>


          <div className="mt-[-20px] ml-[-10px] flex h-28 w-28 rotate-[-8deg] items-center justify-center rounded-3xl border-4 border-white bg-white text-center shadow-2xl">

            <div>

              <div className="text-4xl">
                📄
              </div>

              <span className="rounded bg-red-500 px-2 py-1 text-xs font-bold text-white">
                PDF
              </span>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* RIGHT DECORATION */}
        {/* ================================================= */}

        <div className="absolute right-[3%] top-[100px] hidden xl:block">

          <div className="relative h-[360px] w-[380px]">

            {/* Laptop */}

            <div className="absolute right-8 top-10 h-[220px] w-[330px] rotate-[7deg] rounded-[25px] border-8 border-slate-800 bg-gradient-to-br from-blue-100 to-white shadow-2xl">

              <div className="m-5 flex h-[170px] items-center justify-center rounded-xl bg-white shadow-inner">

                <div className="space-y-4">

                  <div className="h-4 w-40 rounded-full bg-blue-200" />

                  <div className="h-4 w-52 rounded-full bg-violet-200" />

                  <div className="h-4 w-32 rounded-full bg-pink-200" />

                  <div className="h-4 w-44 rounded-full bg-blue-100" />

                </div>

              </div>

            </div>


            {/* Search bubble */}

            <div className="absolute right-[-30px] top-0 flex items-center gap-3 rounded-full border border-white bg-white/90 px-5 py-4 shadow-xl backdrop-blur">

              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-gradient-to-br from-cyan-300 to-emerald-400 text-2xl">
                🔍
              </div>

              <div className="text-sm font-bold text-blue-700">
                Search across
                <br />
                all your PDFs
              </div>

            </div>


            {/* AI bubble */}

            <div className="absolute bottom-16 right-[-50px] flex items-center gap-3 rounded-full border border-white bg-white/90 px-5 py-4 shadow-xl">

              <div className="text-2xl">
                🧠
              </div>

              <div className="text-sm font-bold text-blue-700">
                Get clear
                <br />
                AI answers
              </div>

            </div>


            {/* Study bubble */}

            <div className="absolute bottom-[-20px] right-10 flex items-center gap-3 rounded-full border border-white bg-orange-50 px-5 py-4 shadow-xl">

              <div className="text-2xl">
                💡
              </div>

              <div className="text-sm font-bold text-orange-600">
                Study
                <br />
                smarter
              </div>

            </div>

          </div>

        </div>


        {/* ================================================= */}
        {/* CENTER CONTENT */}
        {/* ================================================= */}

        <div className="relative z-10 mx-auto max-w-7xl px-6 pt-12 lg:px-8">

          {/* Badge */}

          <div className="flex justify-center">

            <div className="inline-flex items-center gap-2 rounded-full border border-fuchsia-200 bg-white/80 px-5 py-2.5 text-sm font-semibold text-violet-600 shadow-lg shadow-violet-100 backdrop-blur">

              <span>✦</span>

              Powered by{" "}
              <span className="bg-gradient-to-r from-violet-600 to-pink-500 bg-clip-text text-transparent">
                Retrieval-Augmented Generation
              </span>

            </div>

          </div>


          {/* Heading */}

          <div className="mx-auto mt-5 max-w-4xl text-center">

            <h2 className="text-5xl font-black tracking-tight text-slate-950 sm:text-6xl lg:text-[68px] lg:leading-[1.05]">

              Study smarter.

              <span className="block bg-gradient-to-r from-blue-600 via-violet-600 to-pink-500 bg-clip-text text-transparent">

                Learn faster with AI.

              </span>

            </h2>


            <p className="mx-auto mt-6 max-w-2xl text-base leading-7 text-slate-600 sm:text-lg">

              Ask questions from your university study materials
              and get clear answers grounded in your uploaded PDFs.

            </p>

          </div>


          {/* ================================================= */}
          {/* QUESTION CARD */}
          {/* ================================================= */}

          <div className="mx-auto mt-8 max-w-5xl">

            <div className="relative">

              {/* Glow */}

              <div className="absolute -inset-1 rounded-[28px] bg-gradient-to-r from-blue-400/30 via-violet-400/40 to-pink-400/30 blur-md" />


              <div className="relative rounded-[28px] border border-white bg-white/90 p-5 shadow-2xl shadow-blue-200/50 backdrop-blur-xl sm:p-7">

                {/* Header */}

                <div className="mb-4 flex items-center gap-4">

                  <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 via-violet-600 to-pink-500 text-xl text-white shadow-lg shadow-violet-200">
                    ✨
                  </div>

                  <div>

                    <h3 className="text-base font-bold text-slate-900">
                      Ask your question
                    </h3>

                    <p className="text-sm text-slate-500">
                      Search across all your university materials...
                    </p>

                  </div>

                </div>


                {/* Input */}

                <textarea
                  value={question}
                  onChange={(e) => setQuestion(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter" && !e.shiftKey) {
                      e.preventDefault();
                      askQuestion();
                    }
                  }}
                  placeholder="Ask anything from your study materials..."
                  className="min-h-[105px] w-full resize-none rounded-2xl border border-slate-200 bg-slate-50/80 p-5 text-base text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-violet-300 focus:bg-white focus:ring-4 focus:ring-violet-100"
                />


                {/* Bottom */}

                <div className="mt-4 flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">

                  <p className="text-xs text-slate-500">

                    <span className="mr-2 rounded-md bg-slate-100 px-2 py-1">
                      ↵
                    </span>

                    Press Enter to ask

                    <span className="mx-2">
                      •
                    </span>

                    Shift + Enter for new line

                  </p>


                  <button
                    onClick={() => askQuestion()}
                    disabled={loading || !question.trim()}
                    className="group flex items-center justify-center gap-3 rounded-xl bg-gradient-to-r from-violet-600 via-purple-600 to-pink-500 px-8 py-3.5 text-sm font-bold text-white shadow-xl shadow-violet-300/40 transition hover:-translate-y-0.5 hover:shadow-2xl hover:shadow-violet-300/50 disabled:cursor-not-allowed disabled:from-slate-300 disabled:via-slate-300 disabled:to-slate-300 disabled:shadow-none"
                  >

                    {loading ? (
                      <>
                        <span className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                        Thinking...
                      </>
                    ) : (
                      <>
                        <span>
                          ➤
                        </span>

                        Ask Question

                        <span className="transition-transform group-hover:translate-x-1">
                          →
                        </span>
                      </>
                    )}

                  </button>

                </div>

              </div>

            </div>

          </div>


          {/* ================================================= */}
          {/* QUICK QUESTIONS */}
          {/* ================================================= */}

          {!answer && !loading && (

            <div className="mx-auto mt-7 max-w-6xl">

              <div className="mb-4 flex items-center gap-3">

                <span className="text-xl">
                  ⚡
                </span>

                <h3 className="text-base font-bold text-slate-900">
                  Try asking
                </h3>

              </div>


              <div className="grid gap-4 md:grid-cols-3">


                {/* Docker */}

                <button
                  onClick={() =>
                    askQuestion("What is Docker?")
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-blue-100 bg-gradient-to-r from-blue-50 to-sky-50 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-blue-100"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-blue-400 to-cyan-500 text-2xl text-white shadow-lg">
                    🐳
                  </div>

                  <div className="min-w-0 flex-1">

                    <h4 className="font-bold text-slate-900">
                      What is Docker?
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Learn the fundamentals of Docker and containers.
                    </p>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-blue-500 shadow-sm transition group-hover:translate-x-1">
                    →
                  </div>

                </button>


                {/* Components */}

                <button
                  onClick={() =>
                    askQuestion("What are Docker Components?")
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-purple-100 bg-gradient-to-r from-purple-50 to-fuchsia-50 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-purple-100"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-violet-600 to-fuchsia-500 text-2xl text-white shadow-lg">
                    ⚙️
                  </div>

                  <div className="min-w-0 flex-1">

                    <h4 className="font-bold text-slate-900">
                      Docker Components
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Understand Docker architecture and its components.
                    </p>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-violet-600 shadow-sm transition group-hover:translate-x-1">
                    →
                  </div>

                </button>


                {/* Cloud */}

                <button
                  onClick={() =>
                    askQuestion(
                      "What are the types of cloud deployment models?"
                    )
                  }
                  className="group flex items-center gap-4 rounded-2xl border border-emerald-100 bg-gradient-to-r from-emerald-50 to-cyan-50 p-5 text-left shadow-sm transition hover:-translate-y-1 hover:shadow-xl hover:shadow-emerald-100"
                >

                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 text-2xl text-white shadow-lg">
                    ☁️
                  </div>

                  <div className="min-w-0 flex-1">

                    <h4 className="font-bold text-slate-900">
                      Cloud Deployment Models
                    </h4>

                    <p className="mt-1 text-xs text-slate-500">
                      Explore the different cloud deployment models.
                    </p>

                  </div>

                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-white text-xl text-emerald-500 shadow-sm transition group-hover:translate-x-1">
                    →
                  </div>

                </button>

              </div>

            </div>

          )}

        </div>

      </section>


      {/* ===================================================== */}
      {/* LOADING */}
      {/* ===================================================== */}

      {loading && (

        <section className="relative z-10 bg-white px-6 py-10">

          <div className="mx-auto max-w-5xl rounded-3xl border border-violet-100 bg-gradient-to-br from-violet-50 to-blue-50 p-10 text-center shadow-xl shadow-violet-100">

            <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-2xl bg-gradient-to-br from-violet-600 to-blue-500 shadow-lg shadow-violet-200">

              <div className="h-6 w-6 animate-spin rounded-full border-2 border-white/30 border-t-white" />

            </div>

            <h3 className="font-bold text-slate-900">
              Searching your study materials...
            </h3>

            <p className="mt-2 text-sm text-slate-500">
              Retrieving relevant notes and generating an answer
            </p>

          </div>

        </section>

      )}


      {/* ===================================================== */}
      {/* ANSWER */}
      {/* ===================================================== */}

      {answer && !loading && (

        <section className="relative z-10 bg-slate-50 px-6 py-12">

          <div className="mx-auto max-w-5xl">


            {/* Answer */}

            <div className="overflow-hidden rounded-3xl border border-slate-200 bg-white shadow-xl shadow-slate-200/70">

              <div className="border-b border-slate-100 bg-gradient-to-r from-blue-50 via-violet-50 to-fuchsia-50 px-6 py-5">

                <div className="flex items-center justify-between">

                  <div className="flex items-center gap-4">

                    <div className="flex h-12 w-12 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-600 to-violet-600 text-xl text-white shadow-lg">
                      🤖
                    </div>

                    <div>

                      <h2 className="font-bold text-slate-900">
                        AI Answer
                      </h2>

                      <p className="text-xs text-slate-500">
                        Generated from your university materials
                      </p>

                    </div>

                  </div>


                  <div className="hidden rounded-full border border-emerald-200 bg-emerald-50 px-4 py-2 text-xs font-bold text-emerald-600 sm:block">

                    ✓ Grounded Response

                  </div>

                </div>

              </div>


              <div className="px-6 py-7">

                <div className="whitespace-pre-line text-[15px] leading-8 text-slate-700 sm:text-base">
                  {answer}
                </div>

              </div>

            </div>


            {/* ================================================= */}
            {/* SOURCES */}
            {/* ================================================= */}

            {sources.length > 0 && (

              <div className="mt-10">

                <div className="mb-5 flex items-center justify-between">

                  <div>

                    <h2 className="flex items-center gap-3 text-xl font-bold text-slate-900">

                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-100">
                        📖
                      </span>

                      Retrieved Sources

                    </h2>

                    <p className="mt-2 text-sm text-slate-500">
                      Relevant sections retrieved from your study materials
                    </p>

                  </div>


                  <span className="hidden rounded-full bg-white px-4 py-2 text-xs font-semibold text-slate-500 shadow-sm sm:block">

                    {sources.length} sources

                  </span>

                </div>


                <div className="space-y-4">

                  {sources.map((source, index) => (

                    <div
                      key={index}
                      className="rounded-2xl border border-slate-200 bg-white p-5 shadow-sm transition hover:border-violet-200 hover:shadow-lg"
                    >

                      <div className="mb-4 flex flex-wrap items-center justify-between gap-3">

                        <div className="flex items-center gap-3">

                          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-500 text-sm font-bold text-white">
                            {index + 1}
                          </div>

                          <div>

                            <h3 className="font-bold text-slate-900">
                              Source {index + 1}
                            </h3>

                            {source.document && (

                              <p className="max-w-[400px] truncate text-xs text-slate-400">
                                {source.document}
                              </p>

                            )}

                          </div>

                        </div>


                        <div className="flex items-center gap-2">

                          <span className="rounded-full bg-blue-50 px-3 py-1.5 text-xs font-bold text-blue-600">
                            Similarity {source.score.toFixed(4)}
                          </span>

                          {source.page && (

                            <span className="rounded-full bg-slate-100 px-3 py-1.5 text-xs font-bold text-slate-600">
                              Page {source.page}
                            </span>

                          )}

                        </div>

                      </div>


                      <p className="whitespace-pre-line text-sm leading-7 text-slate-600">
                        {source.text}
                      </p>

                    </div>

                  ))}

                </div>

              </div>

            )}

          </div>

        </section>

      )}


      {/* ===================================================== */}
      {/* FOOTER */}
      {/* ===================================================== */}

      <footer className="border-t border-slate-200 bg-gradient-to-r from-[#081329] via-[#10183b] to-[#0b1530] text-white">

        <div className="mx-auto flex max-w-[1600px] flex-col items-center justify-between gap-4 px-6 py-6 sm:flex-row lg:px-12">

          <div className="flex items-center gap-3">

            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-gradient-to-br from-blue-500 to-violet-600">
              🎓
            </div>

            <div>

              <p className="text-sm font-bold">
                University AI Study Assistant
              </p>

              <p className="text-xs text-slate-400">
                Your intelligent university study companion
              </p>

            </div>

          </div>


          <div className="flex items-center gap-3 text-xs text-slate-400">

            <span className="cursor-pointer hover:text-white">
              Privacy
            </span>

            <span>|</span>

            <span className="cursor-pointer hover:text-white">
              Terms
            </span>

            <span>|</span>

            <span className="cursor-pointer hover:text-white">
              Help
            </span>

          </div>

        </div>

      </footer>

    </main>
  );
}