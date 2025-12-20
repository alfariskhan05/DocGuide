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

  // Sample job database
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
  ]

  const [matchedJobs, setMatchedJobs] = useState<Job[]>([])

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      setResumeData({ ...resumeData, file })
      // In a real app, you would parse the PDF/DOC here
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    // In a real app, you would analyze the resume here
    // For demo, we'll show all jobs with match scores
    setMatchedJobs(jobs)
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
