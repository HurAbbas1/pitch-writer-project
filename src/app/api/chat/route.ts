// /api/chat/route.ts
import { NextResponse } from 'next/server'

export async function POST(req: Request) {
  try {
    const { message } = await req.json()

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${process.env.OPENROUTER_API_KEY}`,
        'Content-Type': 'application/json',
        'HTTP-Referer': 'http://localhost:3000', // Or your deployed site URL
        'X-Title': 'Pitch Writer'
      },
      body: JSON.stringify({
        model: 'openai/gpt-3.5-turbo', // You can also use 'openai/gpt-4o'
        messages: [
          {
            role: 'user',
            content: message,
          }
        ]
      }),
    })

    const data = await response.json()

    if (!response.ok) {
      console.error('OpenRouter Error:', data)
      return NextResponse.json({ error: 'AI request failed', details: data }, { status: 500 })
    }

    const reply = data.choices[0].message.content
    return NextResponse.json({ reply })

  } catch (err: any) {
    console.error('Server Error:', err)
    return NextResponse.json({ error: 'Server error', details: err.message }, { status: 500 })
  }
}
