import { NextResponse } from "next/server";
import groq from "../../lib/groq";

export async function POST(request) {
  try {
    const body = await request.json();
    const { messages } = body;

    const response = await groq.chat.completions.create({
      messages: [
        {
          role: "system",
          content:
            "You are an Indian legal assistant specializing in law, criminal justice, and government portals. Provide clear, concise, and factual responses strictly related to the constitution, law, and government portals. Avoid political, moral, or non-relevant topics. Be direct and to the point, offering step-by-step guidance where necessary. Refer to authentic sources and legal articles. Keep responses minimal and focused, serving as a practical go-to guide for users.",
        },
        ...messages,
      ],
      model: "gemma2-9b-it",
      temperature: 0.7,
      max_tokens: 500,
      top_p: 1,
      stream: false,
    });

    return NextResponse.json(response.choices[0].message);
  } catch (error) {
    console.error("Groq API Error:", error);
    return NextResponse.json(
      { error: "An error occurred during chat completion" },
      { status: 500 }
    );
  }
}
