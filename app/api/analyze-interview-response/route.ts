import { generateObject } from "ai"
import { z } from "zod"

const responseAnalysisSchema = z.object({
  overallScore: z.number().min(0).max(100).describe("Overall performance score"),
  relevanceScore: z.number().min(0).max(100).describe("How relevant the answer is to the question"),
  clarityScore: z.number().min(0).max(100).describe("How clear and well-structured the answer is"),
  confidenceScore: z.number().min(0).max(100).describe("Confidence level in the response"),
  technicalAccuracy: z.number().min(0).max(100).describe("Technical accuracy if applicable"),
  strengths: z.array(z.string()).describe("Key strengths in the response"),
  improvements: z.array(z.string()).describe("Areas that need improvement"),
  feedback: z.string().describe("Detailed feedback on the answer"),
  keywords: z.array(z.string()).describe("Important keywords mentioned"),
  wordCount: z.number().describe("Approximate word count"),
  responseTime: z.number().describe("Response time in seconds"),
})

export async function POST(req: Request) {
  const { question, answer, jobRole, experience, duration } = await req.json()

  if (!answer || answer.trim().length === 0) {
    return Response.json({
      error: "No answer provided",
      analysis: {
        overallScore: 0,
        relevanceScore: 0,
        clarityScore: 0,
        confidenceScore: 0,
        technicalAccuracy: 0,
        strengths: [],
        improvements: ["No response was provided"],
        feedback: "Please provide an answer to receive feedback.",
        keywords: [],
        wordCount: 0,
        responseTime: duration,
      },
    })
  }

  try {
    const { object: analysis } = await generateObject({
      model: "openai/gpt-5",
      schema: responseAnalysisSchema,
      prompt: `You are an expert interview coach analyzing a candidate's response. 

Job Role: ${jobRole}
Experience Level: ${experience}
Interview Question: ${question}
Candidate's Answer: ${answer}
Response Time: ${duration} seconds

Analyze this interview response and provide:
1. Overall score (0-100) considering relevance, clarity, and confidence
2. Relevance score: How well does the answer address the question?
3. Clarity score: Is the answer well-structured and easy to understand?
4. Confidence score: Does the candidate sound confident and knowledgeable?
5. Technical accuracy: For technical questions, how accurate is the information?
6. List 2-4 specific strengths in the response
7. List 2-4 specific areas for improvement
8. Provide detailed constructive feedback (2-3 sentences)
9. Extract key keywords mentioned
10. Estimate word count
11. Note the response time

Be constructive but honest in your assessment.`,
      maxOutputTokens: 1500,
    })

    return Response.json({ analysis })
  } catch (error) {
    console.error("[v0] Error analyzing response:", error)
    return Response.json({ error: "Failed to analyze response" }, { status: 500 })
  }
}
