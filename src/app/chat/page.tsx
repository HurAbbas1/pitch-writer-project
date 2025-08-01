'use client'

import { useEffect, useRef, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationHeader } from "@/components/navigation-header"
import { AnimatedBackground } from "@/components/animated-background"
import { Send, Bot, User } from "lucide-react"

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialQuestions = [
  "What type of pitch are you creating?",
  "Who is your target audience?",
  "What problem does your product/service solve?",
  "What makes your solution unique?",
  "What tone would you like?"
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "welcome-1",
      role: "assistant",
      content: "Hi! I'm your AI Pitch Assistant. Ready to craft the perfect pitch?",
      timestamp: new Date()
    }
  ])
  const [answers, setAnswers] = useState<string[]>([])
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [input, setInput] = useState("")
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef<HTMLDivElement | null>(null)
  const askedQuestionRef = useRef<Set<number>>(new Set())

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  useEffect(() => {
    if (
      currentQuestionIndex < initialQuestions.length &&
      !askedQuestionRef.current.has(currentQuestionIndex)
    ) {
      const question = initialQuestions[currentQuestionIndex]
      const questionMsg: Message = {
        id: `q-${Date.now()}`,
        role: "assistant",
        content: question,
        timestamp: new Date()
      }
      setMessages((prev) => [...prev, questionMsg])
      askedQuestionRef.current.add(currentQuestionIndex)
    }
  }, [currentQuestionIndex])

  const handleSend = async () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: `${Date.now()}`,
      role: "user",
      content: input.trim(),
      timestamp: new Date()
    }

    const updatedAnswers = [...answers, input.trim()]
    setMessages((prev) => [...prev, userMessage])
    setAnswers(updatedAnswers)
    setInput("")
    setLoading(true)

    if (currentQuestionIndex === initialQuestions.length - 1) {
      const prompt = `Please write a business pitch based on the following:
1. Pitch type: ${updatedAnswers[0]}
2. Target audience: ${updatedAnswers[1]}
3. Problem it solves: ${updatedAnswers[2]}
4. Unique selling point: ${updatedAnswers[3]}
5. Tone: ${updatedAnswers[4]}`

      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt: `
You are an AI that helps users write professional business pitches. Return only the pitch in one paragraph. Then on a separate line, say: 'If you'd like to change or improve the pitch, feel free to type below.'

User prompt:
${prompt}
`
        })
      })

      const data = await res.json()
      const aiText = data.reply || "Sorry, I couldn't generate the pitch."

      const [pitch, ...rest] = aiText.split("\n").filter((line: string) => line.trim() !== "")
      const pitchMessage: Message = {
        id: `${Date.now()}-pitch`,
        role: "assistant",
        content: pitch,
        timestamp: new Date()
      }
      const followupMessage: Message = {
        id: `${Date.now()}-followup`,
        role: "assistant",
        content: rest.join("\n") || "If you'd like to change or improve the pitch, feel free to type below.",
        timestamp: new Date()
      }

      setMessages((prev) => [...prev, pitchMessage, followupMessage])
    }

    setCurrentQuestionIndex((prev) => Math.min(prev + 1, initialQuestions.length))
    setLoading(false)
  }

  return (
    <div className="relative min-h-screen bg-background text-foreground">
      <AnimatedBackground />
      <NavigationHeader />
      <div className="container mx-auto pt-16 pb-12 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12 mt-4"
        >
          <h1 className="text-5xl font-bold text-primary mb-3">AI Pitch Assistant</h1>
          <p className="text-lg text-muted-foreground">
            Let's create your perfect pitch together
          </p>
        </motion.div>

        <div className="flex justify-center mt-6">
          <div className="flex items-center gap-2">
            {initialQuestions.map((_, index) => (
              <div
                key={index}
                className={`h-2 w-8 rounded-full ${index <= currentQuestionIndex ? "bg-primary" : "bg-muted"}`}
              />
            ))}
          </div>
        </div>

        <div className="mt-10 max-w-3xl mx-auto space-y-6 h-[60vh] overflow-y-auto pr-2 scrollbar-thin scrollbar-thumb-muted-foreground scrollbar-track-transparent">
          {messages.map((msg) => (
            <Card key={msg.id} className="shadow-md">
              <CardHeader className="flex flex-row items-center justify-between">
                <CardTitle className="text-base">
                  {msg.role === "user" ? (
                    <div className="flex items-center gap-2">
                      <User className="w-4 h-4" /> You
                    </div>
                  ) : (
                    <div className="flex items-center gap-2">
                      <Bot className="w-4 h-4" /> Assistant
                    </div>
                  )}
                </CardTitle>
              </CardHeader>
              <CardContent>
                {msg.content.split("\n").map((line, i) => (
                  <p key={i} className="mb-2 whitespace-pre-line">
                    {line}
                  </p>
                ))}
              </CardContent>
            </Card>
          ))}
          <div ref={chatEndRef} />
        </div>

        <div className="mt-8 flex items-center gap-4 max-w-3xl mx-auto">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && handleSend()}
            className="flex-grow px-4 py-2 border rounded-md focus:outline-none"
            placeholder={loading ? "Please wait..." : "Type your message"}
            disabled={loading}
          />
          <Button onClick={handleSend} disabled={loading}>
            <Send className="w-4 h-4 mr-2" /> {loading ? "Thinking..." : "Send"}
          </Button>
        </div>
      </div>
    </div>
  )
}
