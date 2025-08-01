// app/api/chat/route.ts
import { NextResponse } from "next/server"

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const apiKey = process.env.OPENROUTER_API_KEY
    if (!apiKey) throw new Error("Missing API Key")

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${apiKey}`,
        "Content-Type": "application/json",
        "HTTP-Referer": "https://pitch-writer-project.vercel.app", // ✅ optional but recommended
        "X-Title": "Pitch Writer", // ✅ optional but recommended
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        messages: [{ role: "user", content: message }],
      }),
    })

    const data = await response.json()
    const reply = data.choices?.[0]?.message?.content ?? "No reply received."

    return NextResponse.json({ reply })
  } catch (err: any) {
    console.error("❌ AI request failed:", err)
    return NextResponse.json({ error: err.message || "Internal server error" }, { status: 500 })
  }
}
