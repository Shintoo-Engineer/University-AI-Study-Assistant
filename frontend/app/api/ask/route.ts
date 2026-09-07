import { NextRequest, NextResponse } from "next/server";
const API_URL = process.env.RAG_API_URL;

export async function POST(request: NextRequest) {
  try {
    if (!API_URL) {
      console.error(
        "NEXT_PUBLIC_API_URL is not configured"
      );

      return NextResponse.json(
        {
          error:
            "NEXT_PUBLIC_API_URL is not configured",
        },
        {
          status: 500,
        }
      );
    }

    const body = await request.json();

    if (!body.question || !body.question.trim()) {
      return NextResponse.json(
        {
          error: "Question is required",
        },
        {
          status: 400,
        }
      );
    }

    console.log(
      "Sending question to RAG backend:",
      body.question
    );

    const response = await fetch(
      `${API_URL}/ask`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          question: body.question.trim(),
          document: body.document ?? null,
        }),
        cache: "no-store",
      }
    );

    const data = await response.json();

    if (!response.ok) {
      console.error(
        "RAG backend returned error:",
        data
      );

      return NextResponse.json(
        {
          error:
            data?.detail ||
            data?.error ||
            "RAG backend request failed",
        },
        {
          status: response.status,
        }
      );
    }

    return NextResponse.json(data);
  } catch (error) {
    console.error(
      "RAG proxy error:",
      error
    );

    return NextResponse.json(
      {
        error:
          "Unable to connect to the RAG backend. Make sure FastAPI and Cloudflare Tunnel are running.",
      },
      {
        status: 502,
      }
    );
  }
}