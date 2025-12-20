"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { useState, useRef, useEffect } from "react"
import {
  Video,
  VideoOff,
  Mic,
  MicOff,
  Play,
  CheckCircle2,
  AlertCircle,
  Upload,
  ArrowRight,
  RotateCcw,
} from "lucide-react"
import { LynxChatbot } from "@/components/lynx-chatbot"
import { Progress } from "@/components/ui/progress"
import { Badge } from "@/components/ui/badge"
import { FooterNavigation } from "@/components/footer-navigation"

// Sample interview questions - will be fetched from API in a real scenario
const defaultQuestions: InterviewQuestion[] = [
  {
    id: 1,
    question: "Tell me about yourself and your background.",
    category: "Introduction",
    difficulty: "Easy",
  },
  {
    id: 2,
    question: "What interests you most about this role and our company?",
    category: "Motivation",
    difficulty: "Easy",
  },
  {
    id: 3,
    question: "Describe a challenging project you worked on and how you handled it.",
    category: "Experience",
    difficulty: "Medium",
  },
  {
    id: 4,
    question: "What are your key technical skills and how have you applied them in your work?",
    category: "Technical",
    difficulty: "Medium",
  },
  {
    id: 5,
    question: "How do you handle disagreements with team members?",
    category: "Behavioral",
    difficulty: "Medium",
  },
  {
    id: 6,
    question: "Where do you see yourself in 5 years?",
    category: "Career Goals",
    difficulty: "Easy",
  },
  {
    id: 7,
    question: "Tell me about a time when you failed and what you learned from it.",
    category: "Behavioral",
    difficulty: "Hard",
  },
]

type InterviewQuestion = {
  id: number
  question: string
  category: string
  difficulty: string
  expectedPoints?: string[]
}

type InterviewSetup = {
  jobRole: string
  experience: string
  resumeFile?: File
}

type ResponseAnalysis = {
  overallScore: number
  relevanceScore: number
  clarityScore: number
  confidenceScore: number
  technicalAccuracy: number
  strengths: string[]
  improvements: string[]
  feedback: string
  keywords: string[]
  wordCount: number
  responseTime: number
  suggestions?: string[]
}

type AnswerRecord = {
  question: string
  answer: string
  duration: number
  analysis?: ResponseAnalysis
}

type Feedback = {
  overallScore: number
  communicationScore: number
  technicalScore: number
  confidenceScore: number
  strengths: string[]
  improvements: string[]
  detailedAnalysis: ResponseAnalysis[]
}

export default function InterviewPage() {
  const [stage, setStage] = useState<"setup" | "interview" | "feedback">("setup")
  const [setup, setSetup] = useState<InterviewSetup>({
    jobRole: "",
    experience: "",
  })

  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0)
  const [isRecording, setIsRecording] = useState(false)
  const [videoEnabled, setVideoEnabled] = useState(true)
  const [audioEnabled, setAudioEnabled] = useState(true)
  const [interviewStarted, setInterviewStarted] = useState(false)
  const [answers, setAnswers] = useState<AnswerRecord[]>([])
  const [currentAnswer, setCurrentAnswer] = useState("")
  const [isListening, setIsListening] = useState(false)
  const [questionStartTime, setQuestionStartTime] = useState<number>(0)
  const [isAnalyzing, setIsAnalyzing] = useState(false)
  const [questions, setQuestions] = useState<InterviewQuestion[]>([])
  const [isLoadingQuestions, setIsLoadingQuestions] = useState(false)
  const [responseAnalyses, setResponseAnalyses] = useState<ResponseAnalysis[]>([])
  const [feedback, setFeedback] = useState<Feedback>({
    overallScore: 0,
    communicationScore: 0,
    technicalScore: 0,
    confidenceScore: 0,
    strengths: [],
    improvements: [],
    detailedAnalysis: [],
  })
  const [currentQuestionFeedback, setCurrentQuestionFeedback] = useState<ResponseAnalysis | null>(null)

  const videoRef = useRef<HTMLVideoElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const recognitionRef = useRef<any>(null)
  const isRecognitionActive = useRef(false)
  const shouldKeepListening = useRef(false) // Track if we should keep recognition active

  const currentQuestion = questions[currentQuestionIndex]

  useEffect(() => {
    console.log("[v0] Checking for speech recognition support")
    if (typeof window !== "undefined" && ("webkitSpeechRecognition" in window || "SpeechRecognition" in window)) {
      console.log("[v0] Speech recognition supported, initializing...")
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition
      const recognition = new SpeechRecognition()
      recognition.continuous = true
      recognition.interimResults = true
      recognition.lang = "en-US"

      recognition.onresult = (event: any) => {
        let interimTranscript = ""
        let finalTranscript = ""

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const transcript = event.results[i][0].transcript
          if (event.results[i].isFinal) {
            finalTranscript += transcript + " "
          } else {
            interimTranscript += transcript
          }
        }

        if (finalTranscript) {
          console.log("[v0] Captured speech:", finalTranscript)
          setCurrentAnswer((prev) => prev + finalTranscript)
        }
      }

      recognition.onerror = (event: any) => {
        console.error("[v0] Speech recognition error:", event.error)
        isRecognitionActive.current = false
        setIsListening(false)
        if (shouldKeepListening.current && stage === "interview") {
          setTimeout(() => {
            if (recognitionRef.current && !isRecognitionActive.current) {
              try {
                console.log("[v0] Restarting after error...")
                recognitionRef.current.start()
              } catch (err) {
                console.error("[v0] Error restarting speech recognition:", err)
              }
            }
          }, 500)
        }
      }

      recognition.onend = () => {
        console.log("[v0] Speech recognition ended")
        isRecognitionActive.current = false
        setIsListening(false)
        if (shouldKeepListening.current && stage === "interview") {
          setTimeout(() => {
            if (recognitionRef.current && !isRecognitionActive.current) {
              try {
                console.log("[v0] Auto-restarting speech recognition...")
                recognitionRef.current.start()
              } catch (err) {
                console.error("[v0] Error restarting speech recognition:", err)
              }
            }
          }, 300)
        }
      }

      recognition.onstart = () => {
        console.log("[v0] Speech recognition started")
        isRecognitionActive.current = true
        setIsListening(true)
      }

      recognitionRef.current = recognition
      console.log("[v0] Speech recognition initialized successfully")
    } else {
      console.error("[v0] Speech recognition not supported in this browser")
    }

    return () => {
      shouldKeepListening.current = false // Stop auto-restart on cleanup
      if (recognitionRef.current) {
        recognitionRef.current.stop()
        isRecognitionActive.current = false
      }
    }
  }, [stage])

  // Initialize webcam
  useEffect(() => {
    if (stage === "interview" && videoEnabled) {
      navigator.mediaDevices
        .getUserMedia({ video: true, audio: audioEnabled })
        .then((stream) => {
          streamRef.current = stream
          if (videoRef.current) {
            videoRef.current.srcObject = stream
          }
        })
        .catch((err) => {
          console.error("[v0] Error accessing camera:", err)
        })
    }

    return () => {
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }, [stage, videoEnabled, audioEnabled])

  const handleStartSetup = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoadingQuestions(true)

    try {
      let resumeText = ""
      if (setup.resumeFile) {
        // In a real implementation, you would extract text from the resume
        resumeText = "Resume uploaded"
      }

      // Generate questions locally based on job role and experience
      const generatedQuestions = generateQuestionsLocally(setup.jobRole, setup.experience)
      setQuestions(generatedQuestions)
      setStage("interview")
    } finally {
      setIsLoadingQuestions(false)
    }
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setSetup({ ...setup, resumeFile: file })
    }
  }

  const startInterview = () => {
    console.log("[v0] Starting interview...")
    setInterviewStarted(true)
    setIsRecording(true)
    setQuestionStartTime(Date.now())
    shouldKeepListening.current = true // Enable continuous listening
    if (recognitionRef.current && !isRecognitionActive.current) {
      try {
        console.log("[v0] Starting speech recognition...")
        recognitionRef.current.start()
      } catch (err) {
        console.error("[v0] Error starting speech recognition:", err)
      }
    }
  }

  const toggleSpeechRecognition = () => {
    if (isListening && isRecognitionActive.current) {
      recognitionRef.current?.stop()
    } else {
      if (currentQuestion && interviewStarted && !isRecognitionActive.current) {
        try {
          recognitionRef.current?.start()
        } catch (err) {
          console.error("[v0] Error starting speech recognition:", err)
        }
      }
    }
  }

  const analyzeResponseLocally = (question: string, answer: string, duration: number): ResponseAnalysis => {
    const words = answer.trim().split(/\s+/)
    const wordCount = words.length

    // Calculate scores based on response characteristics
    const lengthScore = Math.min((wordCount / 50) * 100, 100) // Ideal: 50+ words
    const durationScore = duration >= 30 && duration <= 180 ? 90 : duration < 30 ? 50 : 70
    const clarityScore = answer.includes(".") && answer.length > 20 ? 85 : 60

    // Check for technical keywords based on job role
    const technicalKeywords = [
      "experience",
      "project",
      "team",
      "developed",
      "implemented",
      "managed",
      "designed",
      "created",
      "analyzed",
      "solved",
      "improved",
      "skills",
    ]
    const keywordMatches = technicalKeywords.filter((kw) => answer.toLowerCase().includes(kw))
    const technicalScore = Math.min((keywordMatches.length / 3) * 100, 100)

    // Calculate overall score
    const overallScore = Math.round(
      lengthScore * 0.25 + durationScore * 0.25 + clarityScore * 0.25 + technicalScore * 0.25,
    )

    // Generate feedback
    const strengths: string[] = []
    const improvements: string[] = []
    const suggestions: string[] = []

    if (wordCount >= 40) strengths.push("Good level of detail in your response")
    if (duration >= 30 && duration <= 180) strengths.push("Appropriate response time")
    if (keywordMatches.length >= 2) strengths.push("Used relevant professional terminology")

    if (wordCount < 30) improvements.push("Provide more detailed responses")
    if (duration < 20) improvements.push("Take more time to think through your answers")
    if (keywordMatches.length < 2) improvements.push("Include more specific examples and technical terms")

    if (wordCount < 30) suggestions.push("Consider elaborating more on your experience")
    if (duration < 20) suggestions.push("Try to pause before answering to gather your thoughts")
    if (keywordMatches.length < 2) suggestions.push("Use more technical terms related to the job role")

    return {
      overallScore,
      relevanceScore: Math.round(lengthScore),
      clarityScore: Math.round(clarityScore),
      confidenceScore: Math.round(durationScore),
      technicalAccuracy: Math.round(technicalScore),
      strengths,
      improvements,
      feedback:
        overallScore >= 75
          ? "Strong response with good structure and content."
          : overallScore >= 50
            ? "Decent response, but could be improved with more details."
            : "Response needs more depth and specific examples.",
      keywords: keywordMatches,
      wordCount,
      responseTime: duration,
      suggestions,
    }
  }

  const handleNextQuestion = () => {
    console.log("[v0] Moving to next question...")
    let analysis: ResponseAnalysis | null = null

    if (currentAnswer.trim()) {
      const duration = Date.now() - questionStartTime
      analysis = analyzeResponseLocally(currentQuestion.question, currentAnswer, duration)
      setResponseAnalyses([...responseAnalyses, analysis])
      setCurrentQuestionFeedback(analysis)

      // Save answer with analysis
      setAnswers([
        ...answers,
        {
          question: currentQuestion.question,
          answer: currentAnswer,
          duration,
          analysis,
        },
      ])
    }

    setTimeout(() => {
      setCurrentQuestionFeedback(null)

      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex(currentQuestionIndex + 1)
        setCurrentAnswer("")
        setQuestionStartTime(Date.now())
      } else {
        console.log("[v0] Interview complete, stopping speech recognition")
        shouldKeepListening.current = false
        if (recognitionRef.current) {
          recognitionRef.current.stop()
        }
        setInterviewStarted(false)
        setIsRecording(false)

        const allAnalyses = analysis ? [...responseAnalyses, analysis] : responseAnalyses
        const avgRelevance = allAnalyses.reduce((sum, r) => sum + r.relevanceScore, 0) / allAnalyses.length
        const avgClarity = allAnalyses.reduce((sum, r) => sum + r.clarityScore, 0) / allAnalyses.length
        const avgConfidence = allAnalyses.reduce((sum, r) => sum + r.confidenceScore, 0) / allAnalyses.length
        const avgTechnical = allAnalyses.reduce((sum, r) => sum + r.technicalAccuracy, 0) / allAnalyses.length
        const overallScore = (avgRelevance + avgClarity + avgConfidence + avgTechnical) / 4

        setFeedback({
          overallScore,
          communicationScore: avgClarity,
          technicalScore: avgTechnical,
          confidenceScore: avgConfidence,
          strengths: [
            avgClarity >= 75 ? "Clear and articulate communication" : null,
            avgTechnical >= 75 ? "Strong technical knowledge" : null,
            avgConfidence >= 75 ? "Confident delivery" : null,
          ].filter(Boolean) as string[],
          improvements: [
            avgClarity < 75 ? "Work on clarity and structure in responses" : null,
            avgTechnical < 75 ? "Strengthen technical knowledge in key areas" : null,
            avgConfidence < 75 ? "Build confidence through practice" : null,
          ].filter(Boolean) as string[],
          detailedAnalysis: allAnalyses,
        })
        setStage("feedback")
      }
    }, 3000)
  }

  const skipQuestion = () => {
    // Save empty answer
    const duration = Date.now() - questionStartTime
    setAnswers([
      ...answers,
      {
        question: currentQuestion.question,
        answer: "",
        duration,
      },
    ])

    setCurrentAnswer("")
    if (recognitionRef.current && isListening) {
      recognitionRef.current.stop()
    }

    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1)
      setQuestionStartTime(Date.now())
    } else {
      setStage("feedback")
      setIsRecording(false)
      if (streamRef.current) {
        streamRef.current.getTracks().forEach((track) => track.stop())
      }
    }
  }

  const toggleVideo = () => {
    setVideoEnabled(!videoEnabled)
    if (streamRef.current) {
      streamRef.current.getVideoTracks().forEach((track) => {
        track.enabled = !videoEnabled
      })
    }
  }

  const toggleAudio = () => {
    setAudioEnabled(!audioEnabled)
    if (streamRef.current) {
      streamRef.current.getAudioTracks().forEach((track) => {
        track.enabled = !audioEnabled
      })
    }
  }

  // Generate questions locally based on job role and experience
  const generateQuestionsLocally = (jobRole: string, experience: string): InterviewQuestion[] => {
    const baseQuestions: InterviewQuestion[] = [
      {
        id: 1,
        question: "Tell me about yourself and your background.",
        category: "Introduction",
        difficulty: "Easy",
      },
      {
        id: 2,
        question: `What interests you most about the ${jobRole || "this"} role?`,
        category: "Motivation",
        difficulty: "Easy",
      },
      {
        id: 3,
        question: "Describe a challenging project you worked on and how you handled it.",
        category: "Experience",
        difficulty: "Medium",
      },
      {
        id: 4,
        question: `What are your key skills relevant to ${jobRole || "this position"} and how have you applied them?`,
        category: "Technical",
        difficulty: "Medium",
      },
      {
        id: 5,
        question: "How do you handle disagreements or conflicts with team members?",
        category: "Behavioral",
        difficulty: "Medium",
      },
      {
        id: 6,
        question: "Where do you see yourself in 5 years?",
        category: "Career Goals",
        difficulty: "Easy",
      },
      {
        id: 7,
        question: "Tell me about a time when you failed and what you learned from it.",
        category: "Behavioral",
        difficulty: "Hard",
      },
    ]

    return baseQuestions
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Setup Stage */}
        {stage === "setup" && (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">AI Virtual Interview</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Practice your interview skills with our AI-powered system. We'll ask you questions based on your resume
                and provide real-time analysis of your responses.
              </p>
            </div>

            <div className="grid gap-8 lg:grid-cols-2">
              <Card className="p-8">
                <div className="flex items-center gap-3 mb-6">
                  <Video className="h-6 w-6 text-primary" />
                  <h2 className="text-2xl font-bold">Interview Setup</h2>
                </div>

                <form onSubmit={handleStartSetup} className="space-y-6">
                  <div className="space-y-2">
                    <Label htmlFor="jobRole">Job Role / Position</Label>
                    <Input
                      id="jobRole"
                      value={setup.jobRole}
                      onChange={(e) => setSetup({ ...setup, jobRole: e.target.value })}
                      placeholder="e.g., Software Engineer"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Select
                      value={setup.experience}
                      onValueChange={(value) => setSetup({ ...setup, experience: value })}
                    >
                      <SelectTrigger id="experience">
                        <SelectValue placeholder="Select experience level" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="0-1">0-1 years (Entry Level)</SelectItem>
                        <SelectItem value="2-4">2-4 years (Junior)</SelectItem>
                        <SelectItem value="5-7">5-7 years (Mid-level)</SelectItem>
                        <SelectItem value="8+">8+ years (Senior)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="resume">Upload Resume (Optional)</Label>
                    <div className="border-2 border-dashed border-border rounded-lg p-6 text-center hover:border-primary transition-colors">
                      <Upload className="h-8 w-8 text-muted-foreground mx-auto mb-2" />
                      <Label htmlFor="resume" className="cursor-pointer">
                        <span className="text-sm font-semibold text-foreground block mb-1">Upload your resume</span>
                        <span className="text-xs text-muted-foreground">
                          We'll tailor questions based on your experience
                        </span>
                      </Label>
                      <Input
                        id="resume"
                        type="file"
                        className="hidden"
                        accept=".pdf,.doc,.docx"
                        onChange={handleFileUpload}
                      />
                      {setup.resumeFile && (
                        <div className="mt-3 text-sm text-primary flex items-center justify-center gap-2">
                          <CheckCircle2 className="h-4 w-4" />
                          <span>{setup.resumeFile.name}</span>
                        </div>
                      )}
                    </div>
                  </div>

                  <Button type="submit" size="lg" className="w-full" disabled={isLoadingQuestions}>
                    {isLoadingQuestions ? (
                      <>Generating Questions...</>
                    ) : (
                      <>
                        <Video className="mr-2 h-4 w-4" />
                        Start Interview
                      </>
                    )}
                  </Button>
                </form>
              </Card>

              <Card className="p-8 bg-gradient-to-br from-primary/5 to-primary/10 border-primary/20">
                <h3 className="text-xl font-bold mb-4">What to Expect</h3>
                <div className="space-y-4">
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Video Recording</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your camera will record your responses to track your performance.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Speech Recognition</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Your spoken answers will be transcribed in real-time.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">AI Analysis</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Each answer is analyzed for relevance, clarity, and confidence.
                      </p>
                    </div>
                  </div>
                  <div className="flex gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary flex-shrink-0 mt-0.5" />
                    <div>
                      <p className="font-semibold mb-1">Detailed Feedback</p>
                      <p className="text-sm text-muted-foreground leading-relaxed">
                        Get specific insights on strengths and areas for improvement.
                      </p>
                    </div>
                  </div>
                </div>
              </Card>
            </div>
          </>
        )}

        {/* Interview Stage */}
        {stage === "interview" && (
          <>
            <div className="mb-8">
              <div className="flex items-center justify-between mb-4">
                <h1 className="text-3xl font-bold">Live Interview</h1>
                <div className="flex items-center gap-2">
                  {isRecording && (
                    <>
                      <div className="h-3 w-3 rounded-full bg-red-500 animate-pulse"></div>
                      <span className="text-sm text-muted-foreground">Recording</span>
                    </>
                  )}
                </div>
              </div>
              <Progress value={((currentQuestionIndex + 1) / questions.length) * 100} className="h-2" />
              <p className="text-sm text-muted-foreground mt-2">
                Question {currentQuestionIndex + 1} of {questions.length}
              </p>
            </div>

            {!interviewStarted ? (
              <Card className="p-12 text-center">
                <Video className="h-16 w-16 text-primary mx-auto mb-6" />
                <h2 className="text-2xl font-bold mb-4">Ready to Start?</h2>
                <p className="text-muted-foreground mb-8 max-w-md mx-auto leading-relaxed">
                  Make sure you're in a quiet environment with good lighting. Click the button below when you're ready
                  to begin.
                </p>
                <Button onClick={startInterview} size="lg">
                  <Play className="mr-2 h-5 w-5" />
                  Begin Interview
                </Button>
              </Card>
            ) : (
              <div className="grid gap-8 lg:grid-cols-2">
                {/* Video Preview */}
                <div className="space-y-6">
                  <Card className="p-6">
                    <div className="aspect-video bg-muted rounded-lg overflow-hidden mb-4 relative">
                      {videoEnabled ? (
                        <video ref={videoRef} autoPlay muted className="w-full h-full object-cover" />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <VideoOff className="h-16 w-16 text-muted-foreground" />
                        </div>
                      )}
                    </div>

                    <div className="flex gap-3 justify-center">
                      <Button variant={videoEnabled ? "default" : "outline"} size="icon" onClick={toggleVideo}>
                        {videoEnabled ? <Video className="h-4 w-4" /> : <VideoOff className="h-4 w-4" />}
                      </Button>
                      <Button variant={audioEnabled ? "default" : "outline"} size="icon" onClick={toggleAudio}>
                        {audioEnabled ? <Mic className="h-4 w-4" /> : <MicOff className="h-4 w-4" />}
                      </Button>
                    </div>

                    {isListening && (
                      <div className="mt-4 p-3 bg-primary/10 rounded-lg">
                        <div className="flex items-center gap-2 text-sm text-primary">
                          <div className="h-2 w-2 rounded-full bg-primary animate-pulse"></div>
                          <span className="font-medium">Listening to your answer...</span>
                        </div>
                      </div>
                    )}
                  </Card>
                </div>

                {/* Question and Answer */}
                <div className="space-y-6">
                  <Card className="p-6 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
                    <div className="flex items-center gap-2 mb-4">
                      <Badge variant="outline">{currentQuestion?.category}</Badge>
                      <Badge
                        variant={
                          currentQuestion?.difficulty === "Easy"
                            ? "secondary"
                            : currentQuestion?.difficulty === "Medium"
                              ? "default"
                              : "destructive"
                        }
                      >
                        {currentQuestion?.difficulty}
                      </Badge>
                    </div>
                    <h2 className="text-2xl font-bold mb-4 text-balance">{currentQuestion?.question}</h2>
                    <p className="text-sm text-muted-foreground">
                      Take your time to think and provide a clear, structured answer. Use the microphone button to start
                      recording your response.
                    </p>
                  </Card>

                  <Card className="p-6 bg-muted/50">
                    <h3 className="text-sm font-semibold mb-3">Your Response:</h3>
                    <p className="text-sm text-muted-foreground leading-relaxed min-h-[60px]">
                      {currentAnswer || "Start speaking to record your answer..."}
                    </p>
                    {currentAnswer && (
                      <div className="flex gap-4 mt-3 text-xs text-muted-foreground">
                        <span>{currentAnswer.split(" ").length} words</span>
                        <span>{((Date.now() - questionStartTime) / 1000).toFixed(0)}s elapsed</span>
                      </div>
                    )}
                  </Card>

                  {currentQuestionFeedback && (
                    <Card className="p-6 bg-primary/5 border-primary">
                      <h3 className="text-lg font-semibold mb-4 flex items-center gap-2">
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                        Instant Feedback
                      </h3>

                      <div className="grid gap-4 md:grid-cols-4 mb-4">
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Relevance</p>
                          <p className="text-2xl font-bold text-primary">
                            {currentQuestionFeedback.relevanceScore.toFixed(0)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Clarity</p>
                          <p className="text-2xl font-bold text-primary">
                            {currentQuestionFeedback.clarityScore.toFixed(0)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Confidence</p>
                          <p className="text-2xl font-bold text-primary">
                            {currentQuestionFeedback.confidenceScore.toFixed(0)}%
                          </p>
                        </div>
                        <div>
                          <p className="text-sm text-muted-foreground mb-1">Technical</p>
                          <p className="text-2xl font-bold text-primary">
                            {currentQuestionFeedback.technicalAccuracy.toFixed(0)}%
                          </p>
                        </div>
                      </div>

                      <div className="space-y-2">
                        <div className="flex items-start gap-2">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <p className="text-sm">{currentQuestionFeedback.feedback}</p>
                        </div>
                        {currentQuestionFeedback.suggestions &&
                          currentQuestionFeedback.suggestions.map((suggestion, idx) => (
                            <div key={idx} className="flex items-start gap-2">
                              <AlertCircle className="h-4 w-4 text-muted-foreground mt-0.5 flex-shrink-0" />
                              <p className="text-sm text-muted-foreground">{suggestion}</p>
                            </div>
                          ))}
                      </div>
                    </Card>
                  )}

                  {/* Controls */}
                  <div className="flex gap-4 flex-wrap">
                    <Button
                      size="lg"
                      onClick={handleNextQuestion}
                      className="flex-1 min-w-[200px]"
                      disabled={isAnalyzing}
                    >
                      {isAnalyzing ? (
                        <>Analyzing Response...</>
                      ) : (
                        <>
                          {currentQuestionIndex < questions.length - 1 ? "Next Question" : "Finish Interview"}
                          <ArrowRight className="ml-2 h-4 w-4" />
                        </>
                      )}
                    </Button>
                    <Button onClick={skipQuestion} variant="outline" size="lg" disabled={isAnalyzing}>
                      Skip
                    </Button>
                  </div>
                </div>
              </div>
            )}
          </>
        )}

        {/* Feedback Stage */}
        {stage === "feedback" && (
          <>
            <div className="mb-12">
              <h1 className="text-4xl font-bold mb-4">Interview Complete!</h1>
              <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
                Here's your detailed performance analysis based on your actual responses.
              </p>
            </div>

            {/* Performance Scores */}
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-5 mb-8">
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{feedback.overallScore.toFixed(0)}%</div>
                <p className="text-sm text-muted-foreground">Overall Score</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{feedback.communicationScore.toFixed(0)}%</div>
                <p className="text-sm text-muted-foreground">Communication</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{feedback.technicalScore.toFixed(0)}%</div>
                <p className="text-sm text-muted-foreground">Technical Skills</p>
              </Card>
              <Card className="p-6 text-center">
                <div className="text-4xl font-bold text-primary mb-2">{feedback.confidenceScore.toFixed(0)}%</div>
                <p className="text-sm text-muted-foreground">Confidence</p>
              </Card>
            </div>

            {/* Detailed Analysis */}
            <div className="space-y-6 mb-8">
              <h2 className="text-2xl font-bold">Detailed Question Analysis</h2>
              {answers.map((answer, index) => (
                <Card key={index} className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline">Question {index + 1}</Badge>
                        {answer.analysis && (
                          <Badge
                            variant={
                              answer.analysis.overallScore >= 80
                                ? "default"
                                : answer.analysis.overallScore >= 60
                                  ? "secondary"
                                  : "destructive"
                            }
                          >
                            {answer.analysis.overallScore.toFixed(0)}% Score
                          </Badge>
                        )}
                      </div>
                      <h3 className="font-semibold mb-2 text-balance">{answer.question}</h3>
                    </div>
                  </div>

                  {answer.answer ? (
                    <>
                      <div className="mb-4 p-4 bg-muted rounded-lg">
                        <p className="text-sm font-medium mb-1">Your Answer:</p>
                        <p className="text-sm text-muted-foreground leading-relaxed">{answer.answer}</p>
                        <div className="flex gap-4 mt-2 text-xs text-muted-foreground">
                          <span>{answer.analysis?.wordCount || answer.answer.split(" ").length} words</span>
                          <span>{answer.duration.toFixed(0)}s response time</span>
                        </div>
                      </div>

                      {answer.analysis && (
                        <>
                          <div className="grid grid-cols-4 gap-4 mb-4">
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Relevance</p>
                              <Progress value={answer.analysis.relevanceScore} className="h-2" />
                              <p className="text-xs font-medium mt-1">{answer.analysis.relevanceScore.toFixed(0)}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Clarity</p>
                              <Progress value={answer.analysis.clarityScore} className="h-2" />
                              <p className="text-xs font-medium mt-1">{answer.analysis.clarityScore.toFixed(0)}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Confidence</p>
                              <Progress value={answer.analysis.confidenceScore} className="h-2" />
                              <p className="text-xs font-medium mt-1">{answer.analysis.confidenceScore.toFixed(0)}%</p>
                            </div>
                            <div>
                              <p className="text-xs text-muted-foreground mb-1">Technical</p>
                              <Progress value={answer.analysis.technicalAccuracy} className="h-2" />
                              <p className="text-xs font-medium mt-1">
                                {answer.analysis.technicalAccuracy.toFixed(0)}%
                              </p>
                            </div>
                          </div>

                          <div className="grid md:grid-cols-2 gap-4 mb-4">
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <CheckCircle2 className="h-4 w-4 text-green-500" />
                                <p className="text-sm font-semibold">Strengths</p>
                              </div>
                              <ul className="space-y-1">
                                {answer.analysis.strengths.map((strength, i) => (
                                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                                    • {strength}
                                  </li>
                                ))}
                              </ul>
                            </div>
                            <div>
                              <div className="flex items-center gap-2 mb-2">
                                <AlertCircle className="h-4 w-4 text-orange-500" />
                                <p className="text-sm font-semibold">Areas for Improvement</p>
                              </div>
                              <ul className="space-y-1">
                                {answer.analysis.improvements.map((improvement, i) => (
                                  <li key={i} className="text-sm text-muted-foreground leading-relaxed">
                                    • {improvement}
                                  </li>
                                ))}
                              </ul>
                            </div>
                          </div>

                          <div className="p-4 bg-primary/5 rounded-lg">
                            <p className="text-sm font-medium mb-1">AI Feedback:</p>
                            <p className="text-sm text-muted-foreground leading-relaxed">{answer.analysis.feedback}</p>
                          </div>

                          {answer.analysis.keywords.length > 0 && (
                            <div className="mt-3">
                              <p className="text-xs text-muted-foreground mb-2">Keywords mentioned:</p>
                              <div className="flex flex-wrap gap-2">
                                {answer.analysis.keywords.map((keyword, i) => (
                                  <Badge key={i} variant="secondary" className="text-xs">
                                    {keyword}
                                  </Badge>
                                ))}
                              </div>
                            </div>
                          )}
                        </>
                      )}
                    </>
                  ) : (
                    <div className="p-4 bg-muted rounded-lg text-center">
                      <p className="text-sm text-muted-foreground">Question skipped - no answer provided</p>
                    </div>
                  )}
                </Card>
              ))}
            </div>

            {/* Action Buttons */}
            <div className="flex gap-4">
              <Button size="lg" onClick={() => window.location.reload()}>
                <RotateCcw className="mr-2 h-4 w-4" />
                Retake Interview
              </Button>
              <Button variant="outline" size="lg" onClick={() => (window.location.href = "/")}>
                Back to Home
              </Button>
            </div>
          </>
        )}
      </div>

      <LynxChatbot />
      <FooterNavigation />
    </div>
  )
}
