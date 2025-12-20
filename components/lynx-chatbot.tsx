"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { MessageSquare, X, Send, Bot, User } from "lucide-react"
import { useState, useRef, useEffect } from "react"

type Message = {
  id: string
  role: "user" | "assistant"
  content: string
  timestamp: Date
}

export function LynxChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: "1",
      role: "assistant",
      content:
        "Hello! I'm Lynx, your career development assistant. I can help you with documents, scholarships, job searches, and interview preparation. How can I assist you today?",
      timestamp: new Date(),
    },
  ])
  const [input, setInput] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const suggestedQuestions = [
    "What documents do I need for college admission?",
    "How can I find scholarships for engineering students?",
    "Tips for preparing for a technical interview",
    "How do I write a strong resume?",
  ]

  const getAIResponse = (userMessage: string): string => {
    const lowerMessage = userMessage.toLowerCase()

    // Document-related responses
    if (lowerMessage.includes("document") || lowerMessage.includes("paperwork")) {
      return "I can help you with document acquisition! DocGuide provides checklists for academic documents (transcripts, degrees), identity documents (passport, Aadhar), financial documents, and category certificates. Visit the Documents section to get started with step-by-step guidance and official links."
    }

    // Scholarship-related responses
    if (lowerMessage.includes("scholarship") || lowerMessage.includes("financial aid")) {
      return "Looking for scholarships? The Scholarship Finder can match you with opportunities based on your profile including religion, caste, disability status, sports achievements, and academic performance. I can help you understand eligibility criteria and application processes. Check out the Scholarships section!"
    }

    // Job-related responses
    if (
      lowerMessage.includes("job") ||
      lowerMessage.includes("career") ||
      lowerMessage.includes("employment") ||
      lowerMessage.includes("resume")
    ) {
      return "For job searching, our Job Matching feature can help! You can upload your resume or fill in your details, and we'll match you with relevant positions on LinkedIn. We analyze your skills, experience, and education to find the best opportunities for you."
    }

    // Interview-related responses
    if (lowerMessage.includes("interview") || lowerMessage.includes("practice")) {
      return "Interview preparation is crucial! Our AI Virtual Interview feature lets you practice with video recording and receive personalized feedback on your communication skills, body language, and answer structure. You'll get AI-generated questions based on your resume and experience level."
    }

    // Resume writing
    if (lowerMessage.includes("resume") || lowerMessage.includes("cv")) {
      return "A strong resume should highlight your education, experience, skills, and achievements. Use clear formatting, action verbs, and quantify your accomplishments when possible. Our Job Matching feature can help analyze your resume and suggest improvements based on job requirements."
    }

    // General career advice
    if (lowerMessage.includes("career") || lowerMessage.includes("guidance")) {
      return "Career development involves multiple aspects: getting the right documents, finding financial support through scholarships, preparing strong applications, and practicing for interviews. DocGuide covers all these areas! Which specific aspect would you like to explore first?"
    }

    // Default response
    return "I'm here to help with documents, scholarships, job matching, and interview preparation. Could you please be more specific about what you need? For example, you could ask about required documents for college, scholarship eligibility, or interview tips."
  }

  const handleSendMessage = (messageText?: string) => {
    const textToSend = messageText || input.trim()
    if (!textToSend) return

    // Add user message
    const userMessage: Message = {
      id: Date.now().toString(),
      role: "user",
      content: textToSend,
      timestamp: new Date(),
    }
    setMessages((prev) => [...prev, userMessage])
    setInput("")
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const aiResponse: Message = {
        id: (Date.now() + 1).toString(),
        role: "assistant",
        content: getAIResponse(textToSend),
        timestamp: new Date(),
      }
      setMessages((prev) => [...prev, aiResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Floating Chat Button */}
      {!isOpen && (
        <Button
          size="lg"
          className="fixed bottom-6 right-6 h-14 w-14 rounded-full shadow-lg z-50"
          onClick={() => setIsOpen(true)}
        >
          <MessageSquare className="h-6 w-6" />
        </Button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <Card className="fixed bottom-6 right-6 w-96 h-[600px] shadow-2xl z-50 flex flex-col">
          {/* Header */}
          <div className="flex items-center justify-between p-4 border-b border-border bg-primary text-primary-foreground rounded-t-lg">
            <div className="flex items-center gap-3">
              <div className="h-10 w-10 bg-primary-foreground/10 rounded-full flex items-center justify-center">
                <Bot className="h-6 w-6" />
              </div>
              <div>
                <h3 className="font-bold">Lynx</h3>
                <p className="text-xs opacity-90">Career Assistant</p>
              </div>
            </div>
            <Button
              size="icon"
              variant="ghost"
              className="hover:bg-primary-foreground/10 text-primary-foreground"
              onClick={() => setIsOpen(false)}
            >
              <X className="h-5 w-5" />
            </Button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-muted/20">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex gap-3 ${message.role === "user" ? "justify-end" : "justify-start"}`}
              >
                {message.role === "assistant" && (
                  <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                    <Bot className="h-5 w-5 text-primary-foreground" />
                  </div>
                )}
                <div
                  className={`max-w-[80%] rounded-lg px-4 py-2 ${
                    message.role === "user"
                      ? "bg-primary text-primary-foreground"
                      : "bg-card text-card-foreground border border-border"
                  }`}
                >
                  <p className="text-sm leading-relaxed">{message.content}</p>
                  <p className="text-xs opacity-70 mt-1">
                    {message.timestamp.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                  </p>
                </div>
                {message.role === "user" && (
                  <div className="h-8 w-8 bg-secondary rounded-full flex items-center justify-center flex-shrink-0">
                    <User className="h-5 w-5" />
                  </div>
                )}
              </div>
            ))}

            {isTyping && (
              <div className="flex gap-3 justify-start">
                <div className="h-8 w-8 bg-primary rounded-full flex items-center justify-center flex-shrink-0">
                  <Bot className="h-5 w-5 text-primary-foreground" />
                </div>
                <div className="bg-card border border-border rounded-lg px-4 py-2">
                  <div className="flex gap-1">
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce" />
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-100" />
                    <div className="h-2 w-2 bg-muted-foreground rounded-full animate-bounce delay-200" />
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Suggested Questions */}
          {messages.length <= 1 && (
            <div className="px-4 py-2 border-t border-border">
              <p className="text-xs text-muted-foreground mb-2">Quick questions:</p>
              <div className="flex flex-wrap gap-2">
                {suggestedQuestions.slice(0, 2).map((question) => (
                  <Button
                    key={question}
                    size="sm"
                    variant="outline"
                    className="text-xs h-auto py-1 bg-transparent"
                    onClick={() => handleSendMessage(question)}
                  >
                    {question}
                  </Button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="p-4 border-t border-border">
            <div className="flex gap-2">
              <Input
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message..."
                className="flex-1"
              />
              <Button size="icon" onClick={() => handleSendMessage()} disabled={!input.trim()}>
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </Card>
      )}
    </>
  )
}
