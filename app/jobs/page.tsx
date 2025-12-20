"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { useState } from "react"
import {
  Briefcase,
  Upload,
  MapPin,
  Building2,
  DollarSign,
  Clock,
  TrendingUp,
  ExternalLink,
  FileText,
  Linkedin,
  CheckCircle2,
} from "lucide-react"
import { LynxChatbot } from "@/components/lynx-chatbot"
import { FooterNavigation } from "@/components/footer-navigation"

type ResumeData = {
  name: string
  email: string
  phone: string
  location: string
  experience: string
  skills: string
  education: string
  summary: string
  file?: File
}

type Job = {
  id: string
  title: string
  company: string
  location: string
  type: string
  salary: string
  experience: string
  skills: string[]
  description: string
  linkedInUrl: string
  matchScore: number
  postedDate: string
}

export default function JobsPage() {
  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [uploadMethod, setUploadMethod] = useState<"upload" | "form">("upload")
  const [resumeData, setResumeData] = useState<ResumeData>({
    name: "",
    email: "",
    phone: "",
    location: "",
    experience: "",
    skills: "",
    education: "",
    summary: "",
  })

  const jobs: Job[] = [
    {
      id: "1",
      title: "Frontend Developer",
      company: "Tech Innovations Inc.",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8-12 LPA",
      experience: "2-4 years",
      skills: ["React", "TypeScript", "Next.js", "Tailwind CSS"],
      description:
        "We're seeking a talented Frontend Developer to join our dynamic team. You'll work on cutting-edge web applications using modern technologies.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 95,
      postedDate: "2 days ago",
    },
    {
      id: "2",
      title: "Full Stack Engineer",
      company: "Digital Solutions Ltd.",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹10-15 LPA",
      experience: "3-5 years",
      skills: ["Node.js", "React", "MongoDB", "AWS"],
      description:
        "Looking for a Full Stack Engineer with expertise in both frontend and backend technologies to build scalable applications.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 92,
      postedDate: "1 week ago",
    },
    {
      id: "3",
      title: "UI/UX Designer",
      company: "Creative Labs",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹6-10 LPA",
      experience: "1-3 years",
      skills: ["Figma", "Adobe XD", "User Research", "Prototyping"],
      description:
        "Join our design team to create beautiful and intuitive user experiences for web and mobile applications.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 88,
      postedDate: "3 days ago",
    },
    {
      id: "4",
      title: "Backend Developer",
      company: "Cloud Systems",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹9-14 LPA",
      experience: "3-6 years",
      skills: ["Python", "Django", "PostgreSQL", "Docker"],
      description:
        "We need a Backend Developer to build robust APIs and manage our cloud infrastructure for our SaaS platform.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 90,
      postedDate: "5 days ago",
    },
    {
      id: "5",
      title: "Data Analyst",
      company: "Analytics Pro",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹7-11 LPA",
      experience: "2-4 years",
      skills: ["Python", "SQL", "Power BI", "Excel"],
      description: "Seeking a Data Analyst to transform data into actionable insights that drive business decisions.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 85,
      postedDate: "1 week ago",
    },
    {
      id: "6",
      title: "DevOps Engineer",
      company: "Infrastructure Tech",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹12-18 LPA",
      experience: "4-7 years",
      skills: ["Kubernetes", "Docker", "CI/CD", "AWS"],
      description: "Join our DevOps team to automate deployments and manage cloud infrastructure at scale.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 87,
      postedDate: "4 days ago",
    },
    {
      id: "7",
      title: "Mobile App Developer - React Native",
      company: "AppCraft Studios",
      location: "Chennai, India",
      type: "Full-time",
      salary: "₹7-13 LPA",
      experience: "2-5 years",
      skills: ["React Native", "JavaScript", "iOS", "Android"],
      description:
        "Build cross-platform mobile applications for millions of users using React Native and modern mobile development practices.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 89,
      postedDate: "1 day ago",
    },
    {
      id: "8",
      title: "Machine Learning Engineer",
      company: "AI Innovations",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹15-25 LPA",
      experience: "3-6 years",
      skills: ["Python", "TensorFlow", "PyTorch", "Machine Learning"],
      description:
        "Work on cutting-edge AI/ML projects, developing models for computer vision, NLP, and predictive analytics.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 91,
      postedDate: "3 days ago",
    },
    {
      id: "9",
      title: "Product Manager",
      company: "Growth Ventures",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹18-30 LPA",
      experience: "5-8 years",
      skills: ["Product Strategy", "Agile", "Data Analysis", "Stakeholder Management"],
      description:
        "Lead product development from ideation to launch, working with cross-functional teams to deliver impactful products.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 84,
      postedDate: "1 week ago",
    },
    {
      id: "10",
      title: "Cybersecurity Analyst",
      company: "SecureNet Solutions",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹10-16 LPA",
      experience: "3-5 years",
      skills: ["Network Security", "Penetration Testing", "SIEM", "Incident Response"],
      description:
        "Protect our infrastructure by identifying vulnerabilities, responding to incidents, and implementing security best practices.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 86,
      postedDate: "2 days ago",
    },
    {
      id: "11",
      title: "Quality Assurance Engineer",
      company: "TestPro Technologies",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹5-9 LPA",
      experience: "1-4 years",
      skills: ["Selenium", "API Testing", "Test Automation", "JIRA"],
      description:
        "Ensure product quality through comprehensive testing strategies, automation frameworks, and bug tracking.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 82,
      postedDate: "5 days ago",
    },
    {
      id: "12",
      title: "Cloud Architect",
      company: "CloudScale Inc.",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹20-35 LPA",
      experience: "6-10 years",
      skills: ["AWS", "Azure", "GCP", "Microservices", "Infrastructure as Code"],
      description:
        "Design and implement scalable cloud architectures for enterprise clients, leading migration and optimization projects.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 88,
      postedDate: "1 week ago",
    },
    {
      id: "13",
      title: "Business Analyst",
      company: "Consulting Partners",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8-14 LPA",
      experience: "2-5 years",
      skills: ["Requirements Analysis", "SQL", "Business Intelligence", "Stakeholder Management"],
      description:
        "Bridge the gap between business needs and technical solutions by analyzing requirements and documenting specifications.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 80,
      postedDate: "4 days ago",
    },
    {
      id: "14",
      title: "Content Writer - Technical",
      company: "DocuWrite Solutions",
      location: "Remote",
      type: "Full-time",
      salary: "₹4-7 LPA",
      experience: "1-3 years",
      skills: ["Technical Writing", "Documentation", "API Documentation", "Content Strategy"],
      description:
        "Create clear and engaging technical documentation, blog posts, and guides for developer-focused products.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 78,
      postedDate: "6 days ago",
    },
    {
      id: "15",
      title: "Blockchain Developer",
      company: "CryptoTech Ventures",
      location: "Mumbai, India",
      type: "Full-time",
      salary: "₹12-20 LPA",
      experience: "2-5 years",
      skills: ["Solidity", "Ethereum", "Smart Contracts", "Web3.js"],
      description:
        "Build decentralized applications and smart contracts on blockchain platforms, working with cutting-edge Web3 technologies.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 90,
      postedDate: "2 days ago",
    },
    {
      id: "16",
      title: "HR Generalist",
      company: "PeopleFirst HR",
      location: "Chennai, India",
      type: "Full-time",
      salary: "₹5-8 LPA",
      experience: "2-4 years",
      skills: ["Recruitment", "Employee Relations", "HRIS", "Performance Management"],
      description:
        "Manage end-to-end HR operations including recruitment, onboarding, employee engagement, and policy implementation.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 75,
      postedDate: "1 week ago",
    },
    {
      id: "17",
      title: "Sales Executive - Tech Solutions",
      company: "SalesDrive Corp",
      location: "Delhi, India",
      type: "Full-time",
      salary: "₹6-12 LPA",
      experience: "1-4 years",
      skills: ["B2B Sales", "CRM", "Negotiation", "Client Management"],
      description:
        "Drive revenue growth by identifying prospects, building relationships, and closing deals for enterprise software solutions.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 76,
      postedDate: "3 days ago",
    },
    {
      id: "18",
      title: "Digital Marketing Manager",
      company: "MarketGrowth Agency",
      location: "Bangalore, India",
      type: "Full-time",
      salary: "₹8-15 LPA",
      experience: "3-6 years",
      skills: ["SEO", "Google Ads", "Social Media Marketing", "Analytics"],
      description:
        "Lead digital marketing campaigns across channels, optimize conversions, and drive brand awareness for B2B and B2C clients.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 81,
      postedDate: "5 days ago",
    },
    {
      id: "19",
      title: "Game Developer - Unity",
      company: "GameStudio Plus",
      location: "Pune, India",
      type: "Full-time",
      salary: "₹6-12 LPA",
      experience: "2-5 years",
      skills: ["Unity3D", "C#", "Game Design", "3D Modeling"],
      description:
        "Create immersive gaming experiences for mobile and PC platforms using Unity engine and innovative gameplay mechanics.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 83,
      postedDate: "1 week ago",
    },
    {
      id: "20",
      title: "Data Scientist",
      company: "InsightData Labs",
      location: "Hyderabad, India",
      type: "Full-time",
      salary: "₹12-22 LPA",
      experience: "3-6 years",
      skills: ["Python", "R", "Machine Learning", "Statistics", "Data Visualization"],
      description:
        "Extract insights from complex datasets, build predictive models, and communicate findings to drive business decisions.",
      linkedInUrl: "https://www.linkedin.com/jobs/",
      matchScore: 89,
      postedDate: "2 days ago",
    },
  ]

  const [matchedJobs, setMatchedJobs] = useState<Job[]>([])

  const calculateMatchScore = (job: Job, userSkills: string): number => {
    if (!userSkills) return 70 // Default score if no skills provided

    const userSkillsArray = userSkills
      .toLowerCase()
      .split(/[,;]+/)
      .map((s) => s.trim())
    const jobSkillsArray = job.skills.map((s) => s.toLowerCase())

    let matchCount = 0
    jobSkillsArray.forEach((jobSkill) => {
      userSkillsArray.forEach((userSkill) => {
        if (jobSkill.includes(userSkill) || userSkill.includes(jobSkill)) {
          matchCount++
        }
      })
    })

    // Calculate match percentage
    const matchPercentage = Math.min(95, Math.max(50, Math.round((matchCount / jobSkillsArray.length) * 100)))
    return matchPercentage
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    const jobsWithScores = jobs.map((job) => ({
      ...job,
      matchScore: calculateMatchScore(job, resumeData.skills),
    }))

    // Sort by match score (highest first)
    const sortedJobs = jobsWithScores.sort((a, b) => b.matchScore - a.matchScore)

    setMatchedJobs(sortedJobs)
    setShowResults(true)
    setShowForm(false)
  }

  const handleReset = () => {
    setShowForm(true)
    setShowResults(false)
    setResumeData({
      name: "",
      email: "",
      phone: "",
      location: "",
      experience: "",
      skills: "",
      education: "",
      summary: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Job Matching</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Upload your resume or fill in your details to find job opportunities matched to your skills and experience.
            Connect directly with LinkedIn listings.
          </p>
        </div>

        {/* Resume Input Form */}
        {showForm && (
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <FileText className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Your Resume</h2>
            </div>

            {/* Method Toggle */}
            <div className="flex gap-4 mb-6 border-b border-border pb-6">
              <Button
                variant={uploadMethod === "upload" ? "default" : "outline"}
                onClick={() => setUploadMethod("upload")}
              >
                <Upload className="mr-2 h-4 w-4" />
                Upload Resume
              </Button>
              <Button variant={uploadMethod === "form" ? "default" : "outline"} onClick={() => setUploadMethod("form")}>
                <FileText className="mr-2 h-4 w-4" />
                Fill Details
              </Button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              {uploadMethod === "upload" ? (
                <div className="space-y-4">
                  <div className="border-2 border-dashed border-border rounded-lg p-12 text-center hover:border-primary transition-colors">
                    <Upload className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                    <Label htmlFor="resume-file" className="cursor-pointer">
                      <span className="text-lg font-semibold text-foreground block mb-2">
                        Click to upload or drag and drop
                      </span>
                      <span className="text-sm text-muted-foreground">PDF, DOC, DOCX (Max 5MB)</span>
                    </Label>
                    <Input
                      id="resume-file"
                      type="file"
                      className="hidden"
                      accept=".pdf,.doc,.docx"
                      onChange={handleFileUpload}
                    />
                    {resumeData.file && (
                      <div className="mt-4 text-sm text-primary flex items-center justify-center gap-2">
                        <CheckCircle2 className="h-4 w-4" />
                        <span>{resumeData.file.name}</span>
                      </div>
                    )}
                  </div>
                </div>
              ) : (
                <div className="grid gap-6 md:grid-cols-2">
                  <div className="space-y-2">
                    <Label htmlFor="name">Full Name</Label>
                    <Input
                      id="name"
                      value={resumeData.name}
                      onChange={(e) => setResumeData({ ...resumeData, name: e.target.value })}
                      placeholder="Enter your full name"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="email">Email</Label>
                    <Input
                      id="email"
                      type="email"
                      value={resumeData.email}
                      onChange={(e) => setResumeData({ ...resumeData, email: e.target.value })}
                      placeholder="your.email@example.com"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      type="tel"
                      value={resumeData.phone}
                      onChange={(e) => setResumeData({ ...resumeData, phone: e.target.value })}
                      placeholder="+91 1234567890"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="location">Location</Label>
                    <Input
                      id="location"
                      value={resumeData.location}
                      onChange={(e) => setResumeData({ ...resumeData, location: e.target.value })}
                      placeholder="City, State"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="experience">Years of Experience</Label>
                    <Input
                      id="experience"
                      value={resumeData.experience}
                      onChange={(e) => setResumeData({ ...resumeData, experience: e.target.value })}
                      placeholder="e.g., 3 years"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <Label htmlFor="education">Highest Education</Label>
                    <Input
                      id="education"
                      value={resumeData.education}
                      onChange={(e) => setResumeData({ ...resumeData, education: e.target.value })}
                      placeholder="e.g., B.Tech in Computer Science"
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="skills">Skills</Label>
                    <Textarea
                      id="skills"
                      value={resumeData.skills}
                      onChange={(e) => setResumeData({ ...resumeData, skills: e.target.value })}
                      placeholder="List your key skills separated by commas (e.g., React, Node.js, Python)"
                      rows={3}
                      required
                    />
                  </div>

                  <div className="space-y-2 md:col-span-2">
                    <Label htmlFor="summary">Professional Summary</Label>
                    <Textarea
                      id="summary"
                      value={resumeData.summary}
                      onChange={(e) => setResumeData({ ...resumeData, summary: e.target.value })}
                      placeholder="Brief summary of your professional background and career goals"
                      rows={4}
                      required
                    />
                  </div>
                </div>
              )}

              <Button type="submit" size="lg" className="w-full md:w-auto">
                <TrendingUp className="mr-2 h-4 w-4" />
                Find Matching Jobs
              </Button>
            </form>
          </Card>
        )}

        {/* Job Results */}
        {showResults && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Matched Jobs</h2>
                <p className="text-muted-foreground">
                  Found {matchedJobs.length} jobs matching your profile. Sorted by relevance.
                </p>
              </div>
              <Button variant="outline" onClick={handleReset}>
                <Upload className="mr-2 h-4 w-4" />
                Update Resume
              </Button>
            </div>

            <div className="grid gap-6">
              {matchedJobs.map((job) => (
                <Card key={job.id} className="p-6 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex-1">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <h3 className="text-xl font-bold mb-1">{job.title}</h3>
                          <div className="flex items-center gap-2 text-muted-foreground">
                            <Building2 className="h-4 w-4" />
                            <span>{job.company}</span>
                          </div>
                        </div>
                        <div className="flex items-center gap-2 bg-primary/10 text-primary px-3 py-1 rounded-full">
                          <TrendingUp className="h-4 w-4" />
                          <span className="text-sm font-semibold">{job.matchScore}% Match</span>
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-4 mb-4 text-sm">
                        <div className="flex items-center gap-2">
                          <MapPin className="h-4 w-4 text-muted-foreground" />
                          <span>{job.location}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Briefcase className="h-4 w-4 text-muted-foreground" />
                          <span>{job.type}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <DollarSign className="h-4 w-4 text-muted-foreground" />
                          <span className="font-semibold">{job.salary}</span>
                        </div>
                        <div className="flex items-center gap-2">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span>{job.experience}</span>
                        </div>
                      </div>

                      <p className="text-sm text-muted-foreground leading-relaxed mb-4">{job.description}</p>

                      <div className="mb-4">
                        <h4 className="text-sm font-semibold mb-2">Required Skills:</h4>
                        <div className="flex flex-wrap gap-2">
                          {job.skills.map((skill) => (
                            <span
                              key={skill}
                              className="text-xs bg-secondary text-secondary-foreground px-3 py-1 rounded-full"
                            >
                              {skill}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div className="flex flex-wrap gap-3">
                        <Button asChild>
                          <a href={job.linkedInUrl} target="_blank" rel="noopener noreferrer">
                            <Linkedin className="mr-2 h-4 w-4" />
                            View on LinkedIn
                          </a>
                        </Button>
                        <Button variant="outline" asChild>
                          <a href={job.linkedInUrl} target="_blank" rel="noopener noreferrer">
                            Apply Now
                            <ExternalLink className="ml-2 h-4 w-4" />
                          </a>
                        </Button>
                      </div>

                      <div className="mt-3 text-xs text-muted-foreground">Posted {job.postedDate}</div>
                    </div>
                  </div>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Help Section */}
        {!showResults && (
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-bold mb-2">Prepare for Interviews</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Once you find jobs that interest you, practice with our AI Virtual Interview feature to improve your
              interview skills.
            </p>
            <Button variant="default">Try AI Interview</Button>
          </Card>
        )}
      </div>

      <LynxChatbot />
      <FooterNavigation />
    </div>
  )
}

const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0]
  if (file) {
    // In a real app, you would parse the PDF/DOC here
  }
}
