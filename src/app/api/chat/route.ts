import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
  const { message } = await req.json()

  const apiKey = process.env.OPENROUTER_API_KEY

  if (!apiKey) {
    return NextResponse.json({ error: "API key missing" }, { status: 500 })
  }

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openchat/openchat-3.5", // Free model
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
          "Content-Type": "application/json",
        },
      }
    )

    const aiReply = response.data.choices[0].message.content
    return NextResponse.json({ reply: aiReply })
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 })
  }
}
