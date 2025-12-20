import { generateObject } from "ai"
import { z } from "zod"

const questionSchema = z.object({
  questions: z.array(
    z.object({
      id: z.number(),
      question: z.string(),
      category: z.string(),
      difficulty: z.enum(["Easy", "Medium", "Hard"]),
      expectedPoints: z.array(z.string()).describe("Key points the candidate should cover"),
    }),
  ),
})

export async function POST(req: Request) {
  const { jobRole, experience, resumeText } = await req.json()

  try {
    const { object } = await generateObject({
      model: "openai/gpt-5",
      schema: questionSchema,
      prompt: `Generate 7 personalized interview questions for the following candidate:

Job Role: ${jobRole}
Experience Level: ${experience}
${resumeText ? `Resume Summary: ${resumeText}` : ""}

Create a mix of questions:
- 2 Easy questions (introduction, motivation)
- 3 Medium questions (experience, technical skills, behavioral)
- 2 Hard questions (complex problem-solving, leadership)

Make questions relevant to their experience level and role. If resume information is provided, tailor questions to their background.

Each question should test different aspects: technical skills, problem-solving, teamwork, communication, and career goals.`,
      maxOutputTokens: 2000,
    })

    return Response.json({ questions: object.questions })
  } catch (error) {
    console.error("[v0] Error generating questions:", error)
    return Response.json({ error: "Failed to generate questions" }, { status: 500 })
  }
}
