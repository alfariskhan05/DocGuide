"use client"

import type React from "react"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { IndianRupee, CheckCircle2, ExternalLink, Search, Filter, Award, Calendar, TrendingUp } from "lucide-react"
import { LynxChatbot } from "@/components/lynx-chatbot"
import { FooterNavigation } from "@/components/footer-navigation"

type ScholarshipProfile = {
  religion: string
  caste: string
  disability: boolean
  sports: boolean
  academicPercentage: string
  familyIncome: string
  state: string
  gender: string
}

type Scholarship = {
  id: string
  name: string
  provider: string
  amount: string
  deadline: string
  eligibility: string[]
  link: string
  matchScore: number
  steps: string[]
}

export default function ScholarshipsPage() {
  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [profile, setProfile] = useState<ScholarshipProfile>({
    religion: "",
    caste: "",
    disability: false,
    sports: false,
    academicPercentage: "",
    familyIncome: "",
    state: "",
    gender: "",
  })

  // Sample scholarship database
  const scholarships: Scholarship[] = [
    {
      id: "1",
      name: "National Merit Scholarship",
      provider: "Ministry of Education",
      amount: "₹50,000 per year",
      deadline: "March 31, 2025",
      eligibility: ["General", "Merit-based", "Above 85%"],
      link: "https://scholarships.gov.in/",
      matchScore: 95,
      steps: [
        "Visit the National Scholarship Portal",
        "Register with your Aadhaar number",
        "Fill out the application form with academic details",
        "Upload required documents (marksheets, income certificate)",
        "Submit the application before deadline",
        "Track application status on the portal",
      ],
    },
    {
      id: "2",
      name: "Post Matric Scholarship for SC Students",
      provider: "Ministry of Social Justice",
      amount: "₹1,20,000 per year",
      deadline: "April 15, 2025",
      eligibility: ["SC", "Post-matric", "Family income < 2.5 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 90,
      steps: [
        "Go to National Scholarship Portal",
        "Select SC Post Matric scheme",
        "Complete registration with personal details",
        "Upload caste certificate and income certificate",
        "Provide bank account details for direct transfer",
        "Submit and save application number",
      ],
    },
    {
      id: "3",
      name: "Prime Minister's Scholarship Scheme",
      provider: "Ministry of Defence",
      amount: "₹25,000 per year",
      deadline: "May 31, 2025",
      eligibility: ["All categories", "Defence background", "Above 60%"],
      link: "https://desw.gov.in/",
      matchScore: 85,
      steps: [
        "Visit DESW official website",
        "Register using Service Number of parent",
        "Fill application with educational qualifications",
        "Upload relevant certificates",
        "Get application verified by Zila Sainik Board",
        "Submit before deadline",
      ],
    },
    {
      id: "4",
      name: "PWD Scholarship for Higher Education",
      provider: "Ministry of Social Justice",
      amount: "₹2,00,000 per year",
      deadline: "June 30, 2025",
      eligibility: ["PWD", "Above 40% disability", "Higher education"],
      link: "https://scholarships.gov.in/",
      matchScore: 88,
      steps: [
        "Access National Scholarship Portal",
        "Select PWD scholarship category",
        "Complete profile with disability details",
        "Upload disability certificate from competent authority",
        "Attach admission proof and fee receipt",
        "Submit application and note reference number",
      ],
    },
    {
      id: "5",
      name: "Sports Merit Scholarship",
      provider: "Sports Authority of India",
      amount: "₹75,000 per year",
      deadline: "July 15, 2025",
      eligibility: ["Sports achievers", "State/National level", "All categories"],
      link: "https://sportsauthorityofindia.nic.in/",
      matchScore: 92,
      steps: [
        "Visit SAI scholarship portal",
        "Register with sports achievements",
        "Upload sports certificates (state/national level)",
        "Provide academic records",
        "Get recommendation from sports authority",
        "Submit complete application online",
      ],
    },
    {
      id: "6",
      name: "Central Sector Scheme",
      provider: "Ministry of Education",
      amount: "₹20,000 per year",
      deadline: "August 31, 2025",
      eligibility: ["All categories", "Top 20% in class 12", "Family income < 8 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 87,
      steps: [
        "Go to NSP website",
        "Register with Aadhaar authentication",
        "Fill details of Class 12 marks and rank",
        "Upload income certificate and bank details",
        "Verify mobile number via OTP",
        "Submit and download acknowledgment",
      ],
    },
  ]

  const [matchedScholarships, setMatchedScholarships] = useState<Scholarship[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Filter scholarships based on profile
    const filtered = scholarships.filter((scholarship) => {
      const matches = true

      // Check caste eligibility
      if (profile.caste && scholarship.eligibility.some((e) => e.includes(profile.caste))) {
        return true
      }

      // Check disability
      if (profile.disability && scholarship.eligibility.some((e) => e.includes("PWD"))) {
        return true
      }

      // Check sports
      if (profile.sports && scholarship.eligibility.some((e) => e.includes("Sports"))) {
        return true
      }

      // Check general eligibility
      if (scholarship.eligibility.some((e) => e.includes("All categories"))) {
        return true
      }

      return false
    })

    setMatchedScholarships(filtered.length > 0 ? filtered : scholarships)
    setShowResults(true)
    setShowForm(false)
  }

  const handleReset = () => {
    setShowForm(true)
    setShowResults(false)
    setProfile({
      religion: "",
      caste: "",
      disability: false,
      sports: false,
      academicPercentage: "",
      familyIncome: "",
      state: "",
      gender: "",
    })
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Scholarship Finder</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Find scholarships tailored to your profile. Provide your details and we'll match you with relevant
            opportunities along with complete application guidance.
          </p>
        </div>

        {/* Profile Form */}
        {showForm && (
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Your Profile</h2>
            </div>

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="religion">Religion</Label>
                  <Select
                    value={profile.religion}
                    onValueChange={(value) => setProfile({ ...profile, religion: value })}
                  >
                    <SelectTrigger id="religion">
                      <SelectValue placeholder="Select religion" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="hindu">Hindu</SelectItem>
                      <SelectItem value="muslim">Muslim</SelectItem>
                      <SelectItem value="christian">Christian</SelectItem>
                      <SelectItem value="sikh">Sikh</SelectItem>
                      <SelectItem value="buddhist">Buddhist</SelectItem>
                      <SelectItem value="jain">Jain</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="caste">Caste Category</Label>
                  <Select value={profile.caste} onValueChange={(value) => setProfile({ ...profile, caste: value })}>
                    <SelectTrigger id="caste">
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="General">General</SelectItem>
                      <SelectItem value="SC">SC (Scheduled Caste)</SelectItem>
                      <SelectItem value="ST">ST (Scheduled Tribe)</SelectItem>
                      <SelectItem value="OBC">OBC (Other Backward Class)</SelectItem>
                      <SelectItem value="EWS">EWS (Economically Weaker Section)</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="gender">Gender</Label>
                  <Select value={profile.gender} onValueChange={(value) => setProfile({ ...profile, gender: value })}>
                    <SelectTrigger id="gender">
                      <SelectValue placeholder="Select gender" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="male">Male</SelectItem>
                      <SelectItem value="female">Female</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="state">State</Label>
                  <Select value={profile.state} onValueChange={(value) => setProfile({ ...profile, state: value })}>
                    <SelectTrigger id="state">
                      <SelectValue placeholder="Select state" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="andhra-pradesh">Andhra Pradesh</SelectItem>
                      <SelectItem value="karnataka">Karnataka</SelectItem>
                      <SelectItem value="kerala">Kerala</SelectItem>
                      <SelectItem value="tamil-nadu">Tamil Nadu</SelectItem>
                      <SelectItem value="maharashtra">Maharashtra</SelectItem>
                      <SelectItem value="delhi">Delhi</SelectItem>
                      <SelectItem value="other">Other</SelectItem>
                    </SelectContent>
                  </Select>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="percentage">Academic Percentage</Label>
                  <Input
                    id="percentage"
                    type="number"
                    placeholder="Enter percentage"
                    value={profile.academicPercentage}
                    onChange={(e) => setProfile({ ...profile, academicPercentage: e.target.value })}
                    min="0"
                    max="100"
                  />
                </div>

                <div className="space-y-2">
                  <Label htmlFor="income">Annual Family Income</Label>
                  <Select
                    value={profile.familyIncome}
                    onValueChange={(value) => setProfile({ ...profile, familyIncome: value })}
                  >
                    <SelectTrigger id="income">
                      <SelectValue placeholder="Select income range" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="below-1">Below ₹1 Lakh</SelectItem>
                      <SelectItem value="1-2.5">₹1 - 2.5 Lakh</SelectItem>
                      <SelectItem value="2.5-5">₹2.5 - 5 Lakh</SelectItem>
                      <SelectItem value="5-8">₹5 - 8 Lakh</SelectItem>
                      <SelectItem value="above-8">Above ₹8 Lakh</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
              </div>

              <div className="space-y-4 pt-4 border-t border-border">
                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="disability"
                    checked={profile.disability}
                    onCheckedChange={(checked) => setProfile({ ...profile, disability: checked as boolean })}
                  />
                  <Label htmlFor="disability" className="cursor-pointer">
                    I have a disability (PWD)
                  </Label>
                </div>

                <div className="flex items-center space-x-2">
                  <Checkbox
                    id="sports"
                    checked={profile.sports}
                    onCheckedChange={(checked) => setProfile({ ...profile, sports: checked as boolean })}
                  />
                  <Label htmlFor="sports" className="cursor-pointer">
                    I have achievements in sports (State/National level)
                  </Label>
                </div>
              </div>

              <Button type="submit" size="lg" className="w-full md:w-auto">
                <Search className="mr-2 h-4 w-4" />
                Find Matching Scholarships
              </Button>
            </form>
          </Card>
        )}

        {/* Results */}
        {showResults && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Matched Scholarships</h2>
                <p className="text-muted-foreground">
                  Found {matchedScholarships.length} scholarships matching your profile
                </p>
              </div>
              <Button variant="outline" onClick={handleReset}>
                <Filter className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            <div className="grid gap-6">
              {matchedScholarships.map((scholarship) => (
                <Card key={scholarship.id} className="p-6 hover:border-primary transition-colors">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-start gap-4 flex-1">
                      <Award className="h-8 w-8 text-primary mt-1" />
                      <div className="flex-1">
                        <h3 className="text-xl font-bold mb-2">{scholarship.name}</h3>
                        <p className="text-sm text-muted-foreground mb-3">{scholarship.provider}</p>

                        <div className="flex flex-wrap gap-4 mb-4">
                          <div className="flex items-center gap-2 text-sm">
                            <IndianRupee className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{scholarship.amount}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <Calendar className="h-4 w-4 text-destructive" />
                            <span>Deadline: {scholarship.deadline}</span>
                          </div>
                          <div className="flex items-center gap-2 text-sm">
                            <TrendingUp className="h-4 w-4 text-primary" />
                            <span className="font-semibold">{scholarship.matchScore}% Match</span>
                          </div>
                        </div>

                        <div className="flex flex-wrap gap-2 mb-4">
                          {scholarship.eligibility.map((criteria) => (
                            <span key={criteria} className="text-xs bg-primary/10 text-primary px-3 py-1 rounded-full">
                              {criteria}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Step-by-step guidance */}
                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <CheckCircle2 className="h-4 w-4 text-primary" />
                      Application Steps
                    </h4>
                    <ol className="space-y-2">
                      {scholarship.steps.map((step, index) => (
                        <li key={index} className="flex gap-3 text-sm text-muted-foreground">
                          <span className="font-semibold text-foreground min-w-[1.5rem]">{index + 1}.</span>
                          <span>{step}</span>
                        </li>
                      ))}
                    </ol>
                  </div>

                  <Button asChild>
                    <a href={scholarship.link} target="_blank" rel="noopener noreferrer">
                      Apply Now
                      <ExternalLink className="ml-2 h-4 w-4" />
                    </a>
                  </Button>
                </Card>
              ))}
            </div>
          </>
        )}

        {/* Help Section */}
        {!showResults && (
          <Card className="p-6 bg-card">
            <h3 className="text-lg font-bold mb-2">Need Assistance?</h3>
            <p className="text-sm text-muted-foreground leading-relaxed mb-4">
              Our Lynx chatbot can help you find more scholarships or answer questions about eligibility criteria.
            </p>
            <Button variant="default">Chat with Lynx</Button>
          </Card>
        )}
      </div>

      <LynxChatbot />
      <FooterNavigation />
    </div>
  )
}
