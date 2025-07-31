'use client'

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { NavigationHeader } from "@/components/navigation-header"
import { AnimatedBackground } from "@/components/animated-background"
import { 
  Send, 
  Bot, 
  User, 
  Sparkles,
  MessageCircle,
  ArrowRight,
  CheckCircle2
} from "lucide-react"

type Message = {
  id: string
  role: 'user' | 'assistant'
  content: string
  timestamp: Date
}

const initialQuestions = [
  "What type of pitch are you creating? (elevator pitch, investor pitch, sales pitch, etc.)",
  "Who is your target audience?",
  "What problem does your product/service solve?",
  "What makes your solution unique?",
  "What tone would you like? (professional, casual, enthusiastic, etc.)"
]

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: "Hi! I'm your AI pitch writing assistant. I'll help you create a compelling pitch by asking you some questions. Let's start with the basics - what type of pitch are you looking to create?",
      timestamp: new Date()
    }
  ])
  const [input, setInput] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [currentStep, setCurrentStep] = useState(0)

  const handleSend = () => {
    if (!input.trim()) return

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInput('')
    setIsTyping(true)

    // Simulate AI response
    setTimeout(() => {
      const nextStep = currentStep + 1
      let aiResponse = ""

      if (nextStep < initialQuestions.length) {
        aiResponse = `Great! ${initialQuestions[nextStep]}`
      } else {
        aiResponse = "Perfect! I have all the information I need. Let me create your pitch for you. This will take just a moment..."
      }

      const aiMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: aiResponse,
        timestamp: new Date()
      }

      setMessages(prev => [...prev, aiMessage])
      setCurrentStep(nextStep)
      setIsTyping(false)

      // If we've completed all questions, redirect to pitch output
      if (nextStep >= initialQuestions.length) {
        setTimeout(() => {
          window.location.href = '/pitch-output'
        }, 2000)
      }
    }, 1500)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSend()
    }
  }

  const handleQuickReply = (reply: string) => {
    setInput(reply)
  }

  const quickReplies = currentStep === 0 
    ? ["Elevator Pitch", "Investor Pitch", "Sales Pitch", "Product Launch"]
    : currentStep === 1
    ? ["Investors", "Customers", "Partners", "General Audience"]
    : currentStep === 4
    ? ["Professional", "Enthusiastic", "Casual", "Confident"]
    : []

  return (
    <div className="min-h-screen bg-background relative">
      <AnimatedBackground />
      <NavigationHeader />
      
      <div className="pt-20 pb-8 px-4">
        <div className="container mx-auto max-w-4xl">
          {/* Header */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center mb-8"
          >
            <h1 className="text-4xl font-bold mb-4">
              AI Pitch Assistant
            </h1>
            <p className="text-xl text-muted-foreground">
              Let's create your perfect pitch together
            </p>
            
            {/* Progress Indicator */}
            <div className="flex justify-center mt-6">
              <div className="flex items-center gap-2">
                {initialQuestions.map((_, index) => (
                  <div
                    key={index}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index < currentStep 
                        ? 'bg-green-500' 
                        : index === currentStep 
                        ? 'bg-primary' 
                        : 'bg-muted'
                    }`}
                  />
                ))}
              </div>
            </div>
          </motion.div>

          {/* Chat Container */}
          <Card className="h-[600px] flex flex-col">
            <CardHeader className="border-b">
              <CardTitle className="flex items-center gap-2">
                <MessageCircle className="w-5 h-5 text-primary" />
                Chat with AI Assistant
              </CardTitle>
            </CardHeader>

            {/* Messages */}
            <CardContent className="flex-1 overflow-y-auto p-6 space-y-4">
              <AnimatePresence>
                {messages.map((message) => (
                  <motion.div
                    key={message.id}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -20 }}
                    className={`flex gap-3 ${
                      message.role === 'user' ? 'justify-end' : 'justify-start'
                    }`}
                  >
                    {message.role === 'assistant' && (
                      <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center flex-shrink-0">
                        <Bot className="w-4 h-4 text-primary" />
                      </div>
                    )}
                    
                    <div
                      className={`max-w-[80%] p-4 rounded-lg ${
                        message.role === 'user'
                          ? 'bg-primary text-primary-foreground'
                          : 'bg-muted'
                      }`}
                    >
                      <p className="whitespace-pre-wrap">{message.content}</p>
                      <span className="text-xs opacity-70 mt-2 block">
                        {message.timestamp.toLocaleTimeString([], {
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                    </div>

                    {message.role === 'user' && (
                      <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                        <User className="w-4 h-4" />
                      </div>
                    )}
                  </motion.div>
                ))}
              </AnimatePresence>

              {/* Typing Indicator */}
              {isTyping && (
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="flex gap-3 justify-start"
                >
                  <div className="w-8 h-8 bg-primary/10 rounded-full flex items-center justify-center">
                    <Bot className="w-4 h-4 text-primary" />
                  </div>
                  <div className="bg-muted p-4 rounded-lg">
                    <div className="flex gap-1">
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse" />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse animate-delay-100" />
                      <div className="w-2 h-2 bg-muted-foreground/50 rounded-full animate-pulse animate-delay-200" />
                    </div>
                  </div>
                </motion.div>
              )}
            </CardContent>

            {/* Quick Replies */}
            {quickReplies.length > 0 && (
              <div className="px-6 pb-4">
                <p className="text-sm text-muted-foreground mb-2">Quick replies:</p>
                <div className="flex flex-wrap gap-2">
                  {quickReplies.map((reply) => (
                    <Button
                      key={reply}
                      variant="outline"
                      size="sm"
                      onClick={() => handleQuickReply(reply)}
                      className="text-xs"
                    >
                      {reply}
                    </Button>
                  ))}
                </div>
              </div>
            )}

            {/* Input Area */}
            <div className="border-t p-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <textarea
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    onKeyPress={handleKeyPress}
                    placeholder="Type your response..."
                    className="w-full p-3 border border-input rounded-lg resize-none focus:outline-none focus:ring-2 focus:ring-ring bg-background"
                    rows={1}
                    disabled={isTyping}
                  />
                </div>
                <Button
                  onClick={handleSend}
                  disabled={!input.trim() || isTyping}
                  className="px-6"
                >
                  <Send className="w-4 h-4" />
                </Button>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  )
}