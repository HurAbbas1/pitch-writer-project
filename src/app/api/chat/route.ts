import { NextResponse } from "next/server"
import axios from "axios"

export async function POST(req: Request) {
  const { message } = await req.json()

  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "openchat/openchat-3.5", // Free model
        messages: [{ role: "user", content: message }],
      },
      {
        headers: {
          Authorization: `Bearer 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`,
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
