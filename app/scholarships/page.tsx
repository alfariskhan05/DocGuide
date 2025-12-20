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
import {
  IndianRupee,
  CheckCircle2,
  ExternalLink,
  Search,
  Filter,
  Award,
  Calendar,
  TrendingUp,
  FileText,
  AlertCircle,
} from "lucide-react"
import { LynxChatbot } from "@/components/lynx-chatbot"
import { FooterNavigation } from "@/components/footer-navigation"
import { Alert, AlertDescription } from "@/components/ui/alert"

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
  documents: string[]
}

export default function ScholarshipsPage() {
  const [showForm, setShowForm] = useState(true)
  const [showResults, setShowResults] = useState(false)
  const [validationError, setValidationError] = useState("")
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

  const allScholarships: Scholarship[] = [
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
        "Visit the National Scholarship Portal (scholarships.gov.in)",
        "Register with your Aadhaar number and mobile number",
        "Fill out the application form with academic details and personal information",
        "Upload required documents (marksheets, income certificate, bank passbook)",
        "Verify all details and submit the application before deadline",
        "Track application status on the portal regularly",
        "Keep your application ID safe for future reference",
      ],
      documents: [
        "Aadhaar Card",
        "Class 10th & 12th Marksheets",
        "Income Certificate (below ₹8 lakh)",
        "Bank Account Passbook (first page)",
        "Passport Size Photograph",
        "Domicile Certificate",
        "Admission Proof/Bonafide Certificate",
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
      documents: [
        "Aadhaar Card",
        "Caste Certificate",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "3",
      name: "Post Matric Scholarship for ST Students",
      provider: "Ministry of Tribal Affairs",
      amount: "₹1,35,000 per year",
      deadline: "April 20, 2025",
      eligibility: ["ST", "Post-matric", "Family income < 2.5 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 90,
      steps: [
        "Access National Scholarship Portal",
        "Choose ST Post Matric category",
        "Register with tribal certificate",
        "Upload income certificate and admission proof",
        "Fill bank details for DBT",
        "Submit and download acknowledgment",
      ],
      documents: [
        "Aadhaar Card",
        "Tribal Certificate",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "4",
      name: "OBC Pre-Matric Scholarship",
      provider: "Ministry of Social Justice",
      amount: "₹60,000 per year",
      deadline: "May 10, 2025",
      eligibility: ["OBC", "Pre-matric", "Family income < 1 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 88,
      steps: [
        "Visit NSP portal",
        "Select OBC Pre-Matric scheme",
        "Register with OBC certificate",
        "Upload marksheets and income proof",
        "Verify details and submit",
        "Track status regularly",
      ],
      documents: [
        "Aadhaar Card",
        "OBC Certificate",
        "Class 10th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "5",
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
      documents: [
        "Service Number of Parent",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "6",
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
      documents: [
        "PWD Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "7",
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
      documents: [
        "Sports Achievement Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "8",
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
      documents: [
        "Aadhaar Card",
        "Class 12 Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "9",
      name: "Minority Community Scholarship",
      provider: "Ministry of Minority Affairs",
      amount: "₹1,00,000 per year",
      deadline: "September 15, 2025",
      eligibility: ["Muslim", "Christian", "Sikh", "Buddhist", "Jain", "Family income < 2 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 89,
      steps: [
        "Access NSP portal",
        "Select Minority scholarship scheme",
        "Upload minority community certificate",
        "Provide income and academic documents",
        "Complete bank account details",
        "Submit application online",
      ],
      documents: [
        "Minority Community Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "10",
      name: "EWS Merit-cum-Means Scholarship",
      provider: "Ministry of Education",
      amount: "₹45,000 per year",
      deadline: "October 10, 2025",
      eligibility: ["EWS", "Merit-based", "Family income < 1 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 86,
      steps: [
        "Visit National Scholarship Portal",
        "Register under EWS category",
        "Upload EWS certificate",
        "Provide academic performance proof",
        "Submit income certificate",
        "Complete and submit application",
      ],
      documents: [
        "EWS Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "11",
      name: "Girl Child Education Scholarship",
      provider: "Ministry of Women & Child Development",
      amount: "₹30,000 per year",
      deadline: "November 20, 2025",
      eligibility: ["Female", "All categories", "Above 75%"],
      link: "https://scholarships.gov.in/",
      matchScore: 91,
      steps: [
        "Access NSP website",
        "Select girl child education scheme",
        "Register with personal details",
        "Upload academic certificates",
        "Provide bank account details",
        "Submit before deadline",
      ],
      documents: [
        "Aadhaar Card",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "12",
      name: "Begum Hazrat Mahal National Scholarship",
      provider: "Maulana Azad Education Foundation",
      amount: "₹10,000 per year",
      deadline: "December 5, 2025",
      eligibility: ["Muslim", "Female", "Class 9-12", "Merit-based"],
      link: "https://maef.nic.in/",
      matchScore: 88,
      steps: [
        "Visit MAEF portal",
        "Register for Begum Hazrat Mahal scheme",
        "Upload minority certificate",
        "Provide academic marksheets",
        "Complete application form",
        "Submit online",
      ],
      documents: [
        "Minority Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "13",
      name: "National Means-cum-Merit Scholarship",
      provider: "Ministry of Education",
      amount: "₹12,000 per year",
      deadline: "January 15, 2026",
      eligibility: ["All categories", "Class 9-12", "Family income < 1.5 lakh"],
      link: "https://scholarships.gov.in/",
      matchScore: 84,
      steps: [
        "Go to NSP portal",
        "Select NMMSS scheme",
        "Register with Aadhaar",
        "Upload income and academic certificates",
        "Complete application details",
        "Submit and track status",
      ],
      documents: [
        "Aadhaar Card",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "14",
      name: "Inspire Scholarship for Higher Education",
      provider: "Department of Science & Technology",
      amount: "₹80,000 per year",
      deadline: "February 28, 2026",
      eligibility: ["All categories", "Science stream", "Top 1% in board exams"],
      link: "https://online-inspire.gov.in/",
      matchScore: 93,
      steps: [
        "Visit INSPIRE portal",
        "Register with academic credentials",
        "Upload Class 12 marksheet",
        "Provide rank certificate",
        "Fill course admission details",
        "Submit application",
      ],
      documents: [
        "Class 12 Marksheet",
        "Rank Certificate",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "15",
      name: "State Government Merit Scholarship - Karnataka",
      provider: "Karnataka Government",
      amount: "₹40,000 per year",
      deadline: "March 20, 2025",
      eligibility: ["Karnataka residents", "Merit-based", "Above 80%"],
      link: "https://ssp.karnataka.gov.in/",
      matchScore: 87,
      steps: [
        "Access Karnataka SSP portal",
        "Register with domicile certificate",
        "Upload academic documents",
        "Provide bank details",
        "Submit application online",
        "Track status on portal",
      ],
      documents: [
        "Domicile Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "16",
      name: "Swami Vivekananda Merit-cum-Means Scholarship",
      provider: "West Bengal Government",
      amount: "₹1,000 per month",
      deadline: "April 30, 2025",
      eligibility: ["West Bengal residents", "Undergraduate", "Family income < 2.5 lakh"],
      link: "https://svmcm.wbhed.gov.in/",
      matchScore: 85,
      steps: [
        "Visit SVMCM portal",
        "Register with student credentials",
        "Upload domicile and income proof",
        "Provide academic records",
        "Complete bank details",
        "Submit application",
      ],
      documents: [
        "Domicile Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "17",
      name: "Dr. Ambedkar Post-Matric Scholarship",
      provider: "Various State Governments",
      amount: "₹1,50,000 per year",
      deadline: "May 15, 2025",
      eligibility: ["SC", "Post-graduate", "Merit-based"],
      link: "https://scholarships.gov.in/",
      matchScore: 91,
      steps: [
        "Access NSP portal",
        "Select Dr. Ambedkar scheme",
        "Upload SC certificate",
        "Provide PG admission proof",
        "Submit academic documents",
        "Complete application",
      ],
      documents: [
        "SC Certificate",
        "PG Admission Proof",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "18",
      name: "Sitaram Jindal Foundation Scholarship",
      provider: "Sitaram Jindal Foundation",
      amount: "₹20,000 one-time",
      deadline: "June 20, 2025",
      eligibility: ["All categories", "Undergraduate/Graduate", "Family income < 5 lakh"],
      link: "https://www.sitaramjindalfoundation.org/",
      matchScore: 83,
      steps: [
        "Visit foundation website",
        "Download application form",
        "Fill details and attach documents",
        "Submit via email or post",
        "Wait for selection announcement",
        "Collect scholarship if selected",
      ],
      documents: [
        "Application Form",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "19",
      name: "Tata Scholarship for Underprivileged Students",
      provider: "Tata Trusts",
      amount: "Full tuition coverage",
      deadline: "July 30, 2025",
      eligibility: ["All categories", "Economically disadvantaged", "Merit-based"],
      link: "https://www.tatatrusts.org/",
      matchScore: 94,
      steps: [
        "Visit Tata Trusts portal",
        "Register for scholarship program",
        "Upload income and academic proof",
        "Write statement of purpose",
        "Provide recommendation letters",
        "Submit application online",
      ],
      documents: [
        "Income Certificate",
        "Class 10th & 12th Marksheets",
        "Statement of Purpose",
        "Recommendation Letters",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
    {
      id: "20",
      name: "Udaan Scholarship for J&K Students",
      provider: "IIT Delhi & Ministry of HRD",
      amount: "Free coaching + stipend",
      deadline: "August 15, 2025",
      eligibility: ["Jammu & Kashmir residents", "Class 11-12", "Science stream"],
      link: "https://www.udaanprogram.org/",
      matchScore: 86,
      steps: [
        "Access Udaan portal",
        "Register with J&K domicile",
        "Upload academic certificates",
        "Take online entrance test",
        "Attend interview if selected",
        "Join coaching program",
      ],
      documents: [
        "J&K Domicile Certificate",
        "Class 10th & 12th Marksheets",
        "Income Certificate",
        "Bank Account Passbook",
        "Passport Size Photograph",
        "Admission Proof/Bonafide Certificate",
      ],
    },
  ]

  const [matchedScholarships, setMatchedScholarships] = useState<Scholarship[]>([])

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (!profile.religion) {
      setValidationError("Please select your religion")
      return
    }
    if (!profile.caste) {
      setValidationError("Please select your caste category")
      return
    }
    if (!profile.gender) {
      setValidationError("Please select your gender")
      return
    }
    if (!profile.state) {
      setValidationError("Please select your state")
      return
    }
    if (!profile.academicPercentage) {
      setValidationError("Please enter your academic percentage")
      return
    }
    if (!profile.familyIncome) {
      setValidationError("Please select your family income range")
      return
    }

    setValidationError("")

    const filtered = allScholarships.filter((scholarship) => {
      const eligibilityText = scholarship.eligibility.join(" ").toLowerCase()

      // Gender check - STRICT exclusion
      if (eligibilityText.includes("female") || eligibilityText.includes("women") || eligibilityText.includes("girl")) {
        if (profile.gender !== "Female") return false // Male/Other cannot apply to female scholarships
      }
      if (eligibilityText.includes("male only") || eligibilityText.includes("boys only")) {
        if (profile.gender !== "Male") return false
      }

      // Disability check - STRICT
      if (eligibilityText.includes("pwd") || eligibilityText.includes("disability")) {
        if (!profile.disability) return false // Must have disability
      }

      // Sports check - STRICT
      if (eligibilityText.includes("sports") && !eligibilityText.includes("all categories")) {
        if (!profile.sports) return false // Must have sports achievement
      }

      // State check - STRICT for state-specific scholarships
      if (eligibilityText.includes("domicile") || eligibilityText.includes("resident")) {
        const stateNames = ["andhra pradesh", "kerala", "karnataka", "tamil nadu", "maharashtra", "delhi", "other"]
        const hasStateRequirement = stateNames.some((state) => eligibilityText.includes(state))

        if (hasStateRequirement && profile.state) {
          const matchesState = eligibilityText.includes(profile.state.toLowerCase())
          if (!matchesState) return false // Wrong state
        }
      }

      // Academic percentage check - STRICT minimum requirement
      const percentage = Number.parseFloat(profile.academicPercentage)
      if (!isNaN(percentage)) {
        if (eligibilityText.includes("above 85") && percentage < 85) return false
        if (eligibilityText.includes("above 80") && percentage < 80) return false
        if (eligibilityText.includes("above 75") && percentage < 75) return false
        if (eligibilityText.includes("above 60") && percentage < 60) return false
      }

      // Income check - STRICT maximum limit
      const income = Number.parseFloat(profile.familyIncome)
      if (!isNaN(income)) {
        if (eligibilityText.includes("< 1 lakh") && income >= 100000) return false
        if (eligibilityText.includes("< 1.5 lakh") && income >= 150000) return false
        if (eligibilityText.includes("< 2 lakh") && income >= 200000) return false
        if (eligibilityText.includes("< 2.5 lakh") && income >= 250000) return false
        if (eligibilityText.includes("< 5 lakh") && income >= 500000) return false
        if (eligibilityText.includes("< 8 lakh") && income >= 800000) return false
      }

      // POSITIVE MATCHING - Must match at least ONE primary criterion
      let hasPositiveMatch = false

      // Caste-based scholarships
      if (profile.caste) {
        const casteMatch =
          (profile.caste === "SC" && eligibilityText.includes("sc")) ||
          (profile.caste === "ST" && eligibilityText.includes("st")) ||
          (profile.caste === "OBC" && eligibilityText.includes("obc")) ||
          (profile.caste === "EWS" && eligibilityText.includes("ews")) ||
          (profile.caste === "General" && eligibilityText.includes("general"))

        if (casteMatch) hasPositiveMatch = true
      }

      // Religion-based scholarships
      if (profile.religion) {
        const religionMatch =
          (profile.religion === "Hindu" && eligibilityText.includes("hindu")) ||
          (profile.religion === "Muslim" && eligibilityText.includes("muslim")) ||
          (profile.religion === "Christian" && eligibilityText.includes("christian")) ||
          (profile.religion === "Sikh" && eligibilityText.includes("sikh")) ||
          (profile.religion === "Buddhist" && eligibilityText.includes("buddhist")) ||
          (profile.religion === "Jain" && eligibilityText.includes("jain"))

        if (religionMatch) hasPositiveMatch = true
      }

      // PWD scholarships
      if (profile.disability && eligibilityText.includes("pwd")) {
        hasPositiveMatch = true
      }

      // Sports scholarships
      if (profile.sports && eligibilityText.includes("sports")) {
        hasPositiveMatch = true
      }

      // Gender-specific scholarships
      if (
        profile.gender === "Female" &&
        (eligibilityText.includes("female") || eligibilityText.includes("women") || eligibilityText.includes("girl"))
      ) {
        hasPositiveMatch = true
      }

      // State-specific scholarships
      if (profile.state && eligibilityText.includes(profile.state.toLowerCase())) {
        hasPositiveMatch = true
      }

      // Academic merit scholarships
      if (
        percentage >= 75 &&
        (eligibilityText.includes("merit") ||
          eligibilityText.includes("above 75") ||
          eligibilityText.includes("above 80") ||
          eligibilityText.includes("above 85"))
      ) {
        hasPositiveMatch = true
      }

      // Income-based scholarships
      if (
        income < 250000 &&
        (eligibilityText.includes("< 2.5 lakh") ||
          eligibilityText.includes("< 2 lakh") ||
          eligibilityText.includes("< 1.5 lakh") ||
          eligibilityText.includes("< 1 lakh"))
      ) {
        hasPositiveMatch = true
      }

      // "All categories" scholarships - always eligible
      if (eligibilityText.includes("all categories") || eligibilityText.includes("all students")) {
        hasPositiveMatch = true
      }

      return hasPositiveMatch
    })

    const scoredScholarships = filtered.map((scholarship) => {
      let score = 0
      const eligibilityText = scholarship.eligibility.join(" ").toLowerCase()

      // Primary match criteria (higher weights)
      if (profile.caste && eligibilityText.includes(profile.caste.toLowerCase())) score += 40
      if (profile.religion && eligibilityText.includes(profile.religion.toLowerCase())) score += 40
      if (profile.disability && eligibilityText.includes("pwd")) score += 45
      if (profile.sports && eligibilityText.includes("sports")) score += 40
      if (profile.gender === "Female" && (eligibilityText.includes("female") || eligibilityText.includes("women")))
        score += 35
      if (profile.state && eligibilityText.includes(profile.state.toLowerCase())) score += 35

      // Academic performance match
      const percentage = Number.parseFloat(profile.academicPercentage)
      if (!isNaN(percentage)) {
        if (percentage >= 85 && eligibilityText.includes("above 85")) score += 30
        else if (percentage >= 80 && eligibilityText.includes("above 80")) score += 25
        else if (percentage >= 75 && eligibilityText.includes("above 75")) score += 22
        else if (percentage >= 60 && eligibilityText.includes("above 60")) score += 18
      }

      // Income match
      const income = Number.parseFloat(profile.familyIncome)
      if (!isNaN(income)) {
        if (income < 100000) score += 25
        else if (income < 250000) score += 20
        else if (income < 500000) score += 15
      }

      // Multiple criteria bonus
      let criteriaCount = 0
      if (eligibilityText.includes(profile.caste?.toLowerCase() || "")) criteriaCount++
      if (eligibilityText.includes(profile.religion?.toLowerCase() || "")) criteriaCount++
      if (profile.disability && eligibilityText.includes("pwd")) criteriaCount++
      if (profile.sports && eligibilityText.includes("sports")) criteriaCount++
      if (criteriaCount >= 2) score += 20 // Increased bonus for matching multiple criteria

      // Base eligibility bonus - if they passed all filters, they deserve a good score
      score += 30

      return { ...scholarship, matchScore: Math.min(score, 100) }
    })

    scoredScholarships.sort((a, b) => b.matchScore - a.matchScore)

    setMatchedScholarships(scoredScholarships)
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
    setValidationError("")
  }

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Scholarship Finder</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Find scholarships tailored to your profile. Fill out your complete profile to discover relevant scholarship
            opportunities with detailed application guidance.
          </p>
        </div>

        {showForm && (
          <Card className="p-8 mb-8">
            <div className="flex items-center gap-3 mb-6">
              <Filter className="h-6 w-6 text-primary" />
              <h2 className="text-2xl font-bold">Complete Your Profile</h2>
            </div>

            {validationError && (
              <Alert variant="destructive" className="mb-6">
                <AlertCircle className="h-4 w-4" />
                <AlertDescription>{validationError}</AlertDescription>
              </Alert>
            )}

            <form onSubmit={handleSubmit} className="space-y-6">
              <div className="grid gap-6 md:grid-cols-2">
                <div className="space-y-2">
                  <Label htmlFor="religion">
                    Religion <span className="text-destructive">*</span>
                  </Label>
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
                  <Label htmlFor="caste">
                    Caste Category <span className="text-destructive">*</span>
                  </Label>
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
                  <Label htmlFor="gender">
                    Gender <span className="text-destructive">*</span>
                  </Label>
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
                  <Label htmlFor="state">
                    State <span className="text-destructive">*</span>
                  </Label>
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
                  <Label htmlFor="percentage">
                    Academic Percentage <span className="text-destructive">*</span>
                  </Label>
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
                  <Label htmlFor="income">
                    Annual Family Income <span className="text-destructive">*</span>
                  </Label>
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
                Save Profile & Find Scholarships
              </Button>
            </form>
          </Card>
        )}

        {showResults && (
          <>
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-2xl font-bold mb-2">Your Matched Scholarships</h2>
                <p className="text-muted-foreground">
                  {matchedScholarships.length > 0
                    ? `Found ${matchedScholarships.length} scholarships matching your eligibility criteria`
                    : "No scholarships match your current profile. Try updating your profile or check back later for new opportunities."}
                </p>
              </div>
              <Button variant="outline" onClick={handleReset}>
                <Filter className="mr-2 h-4 w-4" />
                Edit Profile
              </Button>
            </div>

            {matchedScholarships.length === 0 && (
              <Card className="p-8 text-center">
                <AlertCircle className="h-12 w-12 text-muted-foreground mx-auto mb-4" />
                <h3 className="text-xl font-bold mb-2">No Matching Scholarships Found</h3>
                <p className="text-muted-foreground mb-4">
                  Based on your profile, we couldn't find scholarships you're currently eligible for. This could change
                  as new scholarships are added or your profile changes.
                </p>
                <Button variant="outline" onClick={handleReset}>
                  Update Your Profile
                </Button>
              </Card>
            )}

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

                  <div className="bg-primary/5 rounded-lg p-4 mb-4 border border-primary/20">
                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                      <FileText className="h-4 w-4 text-primary" />
                      Required Documents
                    </h4>
                    <ul className="grid grid-cols-1 md:grid-cols-2 gap-2">
                      {scholarship.documents.map((doc, index) => (
                        <li key={index} className="flex items-start gap-2 text-sm">
                          <CheckCircle2 className="h-4 w-4 text-primary mt-0.5 flex-shrink-0" />
                          <span>{doc}</span>
                        </li>
                      ))}
                    </ul>
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
