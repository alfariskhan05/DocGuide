"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { Checkbox } from "@/components/ui/checkbox"
import { useState } from "react"
import { ExternalLink, CheckCircle2, AlertCircle, ChevronRight, XCircle, HelpCircle } from "lucide-react"
import { LynxChatbot } from "@/components/lynx-chatbot"
import { FooterNavigation } from "@/components/footer-navigation"

type Document = {
  id: string
  name: string
  description: string
  link: string
  category: string
  required: boolean
  applicabilityInstructions: string
  steps: string[]
}

const documentCategories = [
  {
    category: "Academic Documents",
    icon: "🎓",
    documents: [
      {
        id: "10th-marksheet",
        name: "10th Standard Marksheet",
        description: "Secondary School Certificate (SSC) or equivalent examination marksheet",
        link: "https://www.cbse.gov.in/",
        required: true,
        applicabilityInstructions:
          "Applicable to ALL students - This is a mandatory document for any further education or career opportunities. Required for college admissions, government jobs, and scholarships.",
        steps: [
          "Visit your school or board's official website",
          "Navigate to 'Download Certificates' or 'Duplicate Marksheet' section",
          "Enter your roll number, registration number, and date of birth",
          "Pay the processing fee (if applicable) through online payment",
          "Download the digital marksheet or request physical copy",
          "Get it attested by your school principal if physical copy is needed",
          "Keep both original and photocopies for future use",
        ],
      },
      {
        id: "12th-marksheet",
        name: "12th Standard Marksheet",
        description: "Higher Secondary Certificate (HSC) or equivalent examination marksheet",
        link: "https://www.cbse.gov.in/",
        required: true,
        applicabilityInstructions:
          "Applicable to ALL students who have completed 12th standard - Essential for undergraduate admissions, competitive exams, and employment verification.",
        steps: [
          "Visit your board's official website (CBSE/State Board)",
          "Go to the 'Results & Certificates' section",
          "Enter your roll number and date of birth",
          "Download the provisional certificate immediately after result declaration",
          "Apply for original marksheet through school or board office",
          "Pay the prescribed fee at authorized centers",
          "Collect original marksheet from school after 2-3 months",
          "Get multiple attested copies made",
        ],
      },
      {
        id: "ug-degree",
        name: "Bachelor's Degree Certificate",
        description: "Undergraduate degree certificate from recognized university",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have completed your bachelor's degree - Required for postgraduate admissions, job applications, and professional certifications. Not applicable for current undergraduate students.",
        steps: [
          "Contact your university examination department",
          "Fill the degree application form online or offline",
          "Submit required documents (ID proof, fee receipt, provisional certificate)",
          "Pay the degree issuance fee",
          "Wait for processing (typically 2-6 months)",
          "Collect degree from university or receive by post",
          "Verify details and get it attested if needed",
        ],
      },
      {
        id: "ug-transcripts",
        name: "Bachelor's Transcripts/Consolidated Marksheet",
        description: "Semester-wise or year-wise complete academic records",
        link: "https://www.parchment.com/",
        required: false,
        applicabilityInstructions:
          "Applicable if you have completed bachelor's degree OR currently in final year - Required for higher studies abroad, postgraduate programs, and detailed academic verification.",
        steps: [
          "Login to university portal or visit examination department",
          "Request official transcripts (specify number of copies needed)",
          "Fill transcript request form with purpose of requirement",
          "Pay transcript processing fee per copy",
          "Choose delivery method (sealed envelope/digital/mail)",
          "Wait 2-4 weeks for processing",
          "Receive sealed transcripts (DO NOT open if for official use)",
        ],
      },
      {
        id: "pg-degree",
        name: "Master's Degree Certificate",
        description: "Postgraduate degree certificate from recognized university",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have completed your master's degree - Required for doctoral programs, senior job positions, and academic careers. Not applicable if you haven't pursued postgraduate education.",
        steps: [
          "Contact your postgraduate university",
          "Submit degree application with all required documents",
          "Pay the degree processing fee",
          "Provide thesis/dissertation completion certificate if applicable",
          "Wait for processing period",
          "Collect degree in convocation or from university office",
          "Get multiple attested copies for future use",
        ],
      },
      {
        id: "pg-transcripts",
        name: "Master's Transcripts",
        description: "Complete postgraduate academic records",
        link: "https://www.parchment.com/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have completed or are in final year of master's program - Required for PhD admissions, international opportunities, and detailed academic verification.",
        steps: [
          "Visit university examination department or portal",
          "Fill transcript request form for postgraduate records",
          "Specify if you need WES evaluation format for abroad",
          "Pay applicable fees per transcript copy",
          "Provide student ID and other verification documents",
          "Choose delivery method and destination",
          "Track application status online if available",
        ],
      },
      {
        id: "provisional",
        name: "Provisional Certificate",
        description: "Temporary certificate issued until degree is ready",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you have completed degree but haven't received final certificate yet - Valid for job applications and admissions until original degree arrives. Get this immediately after final results.",
        steps: [
          "Apply for provisional certificate from your institution",
          "Submit ID proof and latest semester marksheet",
          "Pay nominal processing fee",
          "Provisional certificate usually issued within 15 days",
          "Download from student portal or collect from office",
          "Use it for temporary verification purposes",
          "Replace with degree certificate once received",
        ],
      },
      {
        id: "migration",
        name: "Migration Certificate",
        description: "Certificate for transferring from one university to another",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you are changing universities or pursuing further studies in different university - Required when moving from one board/university to another for higher education.",
        steps: [
          "Apply for migration certificate from current university",
          "Submit degree/provisional certificate and final marksheets",
          "Fill migration certificate application form",
          "Pay prescribed fee",
          "Provide proof of admission in new institution",
          "Certificate issued within 30 days typically",
          "Submit to new university as part of admission process",
        ],
      },
      {
        id: "bonafide",
        name: "Bonafide Certificate",
        description: "Certificate proving you are a student of the institution",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY to CURRENT students - Required for travel concessions, bank accounts, scholarships, and various student benefits. Not applicable if you've completed your studies.",
        steps: [
          "Contact your institution's administrative office",
          "Fill bonafide certificate request form",
          "Specify purpose (scholarship/travel/bank account etc.)",
          "Submit student ID card copy",
          "Pay nominal fee if applicable",
          "Certificate usually issued same day or within 3 days",
          "Get it signed and stamped by principal/registrar",
        ],
      },
      {
        id: "conduct",
        name: "Character/Conduct Certificate",
        description: "Certificate of good conduct from your institution",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable to students who have completed their studies - Required for job applications, government positions, and visa applications. Schools/colleges issue this upon request.",
        steps: [
          "Request conduct certificate from your institution",
          "Fill application form with purpose of requirement",
          "Provide ID proof and completed course certificate",
          "No disciplinary action should be on your record",
          "Pay processing fee if applicable",
          "Certificate issued within 7-15 days",
          "Get it attested by principal/head of institution",
        ],
      },
      {
        id: "lor",
        name: "Letters of Recommendation (LOR)",
        description: "Academic recommendation letters from professors/mentors (2-3 letters)",
        link: "https://www.interfolio.com/",
        required: false,
        applicabilityInstructions:
          "Applicable if applying for higher studies, scholarships, or specialized programs - Required by most international universities and competitive programs. Approach professors you've worked closely with.",
        steps: [
          "Identify 2-3 professors who know your work well",
          "Request meeting to discuss recommendation",
          "Provide your CV, purpose, and deadline",
          "Share specific points you'd like them to highlight",
          "Give at least 3-4 weeks notice",
          "Provide recommendation letter template if required",
          "Follow up politely and send thank you note",
        ],
      },
      {
        id: "sop",
        name: "Statement of Purpose (SOP)",
        description: "Personal essay explaining your goals and motivation",
        link: "https://www.essayedge.com/",
        required: false,
        applicabilityInstructions:
          "Applicable if applying for higher studies (especially abroad) or scholarship programs - Essential document for university admissions and competitive scholarships. Craft unique SOP for each application.",
        steps: [
          "Research the program/institution requirements thoroughly",
          "Brainstorm your academic journey and career goals",
          "Write about why this specific program interests you",
          "Include relevant experiences and achievements",
          "Explain career aspirations and how program helps",
          "Keep it within word limit (usually 500-1000 words)",
          "Get it reviewed by mentors and proofread multiple times",
        ],
      },
    ],
  },
  {
    category: "Identity Documents",
    icon: "🪪",
    documents: [
      {
        id: "aadhar",
        name: "Aadhar Card",
        description: "12-digit unique identity number issued by UIDAI",
        link: "https://uidai.gov.in/",
        required: true,
        applicabilityInstructions:
          "Applicable to ALL Indian citizens and residents - Mandatory for government services, scholarships, admissions, and banking. Must have for every Indian citizen.",
        steps: [
          "Visit nearest Aadhar Enrollment Center with address proof",
          "Fill enrollment form with accurate details",
          "Provide biometric data (fingerprints and iris scan)",
          "Submit address proof and date of birth proof",
          "Collect enrollment slip with acknowledgment number",
          "Wait 60-90 days for Aadhar generation",
          "Download e-Aadhar from UIDAI website using enrollment number",
          "Original Aadhar card will be mailed to your address",
        ],
      },
      {
        id: "pan",
        name: "PAN Card",
        description: "Permanent Account Number issued by Income Tax Department",
        link: "https://www.onlineservices.nsdl.com/paam/endUserRegisterContact.html",
        required: true,
        applicabilityInstructions:
          "Applicable to ALL students above 18 years or earning income - Required for financial transactions above ₹50,000, bank accounts, and tax filing. Apply before starting any internship or job.",
        steps: [
          "Visit NSDL or UTIITSL PAN application website",
          "Fill Form 49A (Indian citizens) online",
          "Upload photo, signature, ID proof, and address proof",
          "Pay application fee (₹93 for Indian address)",
          "Submit application and note acknowledgment number",
          "PAN card will be dispatched to address in 15-20 days",
          "Download e-PAN immediately from website",
        ],
      },
      {
        id: "passport",
        name: "Passport",
        description: "Official travel document issued by Government of India",
        link: "https://www.passportindia.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you plan to travel abroad for studies, work, or tourism - Essential for international travel, studying abroad, and overseas employment. Apply well in advance (2-3 months) before travel.",
        steps: [
          "Register on Passport Seva portal",
          "Fill application form accurately with all details",
          "Upload photograph and documents as per specifications",
          "Pay passport fee online (₹1,500 for normal, ₹3,500 for tatkal)",
          "Book appointment at nearest Passport Seva Kendra",
          "Visit PSK with original documents on appointment date",
          "Complete biometric verification and document check",
          "Police verification will be conducted at your address",
          "Passport delivered to address in 30-45 days (7 days for tatkal)",
        ],
      },
      {
        id: "voter",
        name: "Voter ID Card (EPIC)",
        description: "Electoral Photo Identity Card for voting rights",
        link: "https://voters.eci.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable to Indian citizens aged 18+ years - Serves as important ID proof for various purposes and enables you to vote. Apply after turning 18.",
        steps: [
          "Visit National Voter Service Portal",
          "Fill Form 6 for new voter registration",
          "Upload photograph, age proof, and address proof",
          "Submit application online",
          "Electoral officer will verify details and visit address",
          "Name added to electoral roll after verification",
          "Voter ID card issued and mailed within 30-45 days",
        ],
      },
      {
        id: "driving",
        name: "Driving License",
        description: "License to drive motor vehicles on public roads",
        link: "https://parivahan.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you are 18+ years old (16+ for vehicles without gear) and want to drive vehicles legally - Required for driving any motor vehicle and serves as ID proof.",
        steps: [
          "Visit Parivahan Sewa portal or local RTO",
          "Apply for Learner's License first (Form 2)",
          "Pass learner's test after studying traffic rules",
          "Practice driving for 30 days with learner's license",
          "Apply for Permanent Driving License (Form 4)",
          "Book slot for driving test at RTO",
          "Clear practical driving test",
          "License issued after successful test",
        ],
      },
      {
        id: "ration",
        name: "Ration Card",
        description: "Card for purchasing subsidized food grains",
        link: "https://nfsa.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if your family income is below threshold limits (varies by state) - Helps in buying subsidized food and serves as address proof. Head of family applies for entire household.",
        steps: [
          "Visit your state's food & civil supplies department portal",
          "Download ration card application form",
          "Fill form with all family members' details",
          "Attach income certificate, address proof, and ID proofs",
          "Submit at nearest Taluk/Tehsil office",
          "Officials will verify details and conduct home visit",
          "Ration card issued after approval (typically 30 days)",
        ],
      },
      {
        id: "birth",
        name: "Birth Certificate",
        description: "Official record of birth issued by municipal authority",
        link: "https://crsorgi.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable to ALL - Important age proof document. If you don't have it, apply for it now as it's required for passport, marriage certificate, and legal purposes.",
        steps: [
          "Visit CRS (Civil Registration System) portal or local municipal office",
          "Fill birth certificate application form",
          "Provide hospital records or affidavit if birth not registered",
          "Submit parents' ID proof and address proof",
          "Pay nominal fee",
          "Certificate issued immediately if birth registered, else takes 15-30 days",
          "Download digital certificate from portal",
        ],
      },
    ],
  },
  {
    category: "Financial Documents",
    icon: "💰",
    documents: [
      {
        id: "income",
        name: "Income Certificate",
        description: "Certificate showing annual family income issued by Tehsildar",
        link: "https://edistrict.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if your annual family income is below ₹8 lakhs (varies by state/scheme) - Required for scholarship applications, fee waivers, and government schemes. Income must be below specified limits.",
        steps: [
          "Visit e-District portal or Tehsil office",
          "Fill income certificate application form",
          "Provide parents' employment details and salary slips",
          "Attach Aadhar, address proof, and family details",
          "Submit land records if family has agricultural income",
          "Pay processing fee (usually ₹20-50)",
          "Certificate issued by Tehsildar in 7-15 days",
          "Validity is usually 1 year, renew annually",
        ],
      },
      {
        id: "bank-statement",
        name: "Bank Account Statements",
        description: "Last 6 months transaction history from your bank account",
        link: "https://www.onlinesbi.sbi/",
        required: false,
        applicabilityInstructions:
          "Applicable if applying for education loans, visa applications, or financial verification - Shows financial history and credibility. Required by most international universities and loan providers.",
        steps: [
          "Login to your net banking account",
          "Navigate to 'Account Statement' or 'Download Statement' section",
          "Select account and date range (last 6 months)",
          "Choose PDF format with bank seal",
          "Download statement - it will be password protected",
          "Alternatively visit bank branch with passbook and ID",
          "Get stamped statements from bank teller",
        ],
      },
      {
        id: "itr",
        name: "Income Tax Returns (ITR)",
        description: "Annual income tax filing documents for last 2-3 years",
        link: "https://www.incometax.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you or your parents have taxable income (above ₹2.5 lakhs annually) - Required for education loans, visa applications, and financial verification. Both parents' ITRs may be needed.",
        steps: [
          "Login to Income Tax e-filing portal",
          "Go to 'View Returns/Forms' section",
          "Select assessment year and download ITR-V acknowledgment",
          "Download Form 26AS (tax credit statement)",
          "If not filed, file ITR immediately with CA's help",
          "Get ITR verified through Aadhar OTP or EVC",
          "Download acknowledgment after verification",
          "Keep ITR and computation of income ready",
        ],
      },
      {
        id: "loan-sanction",
        name: "Education Loan Sanction Letter",
        description: "Loan approval letter from bank showing sanctioned amount",
        link: "https://www.sbi.co.in/web/student-platform",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have applied and received approval for education loan - Required for college admission (fee payment proof) and visa applications showing financial ability.",
        steps: [
          "Apply for education loan at bank with admission letter",
          "Submit academic records and course fee details",
          "Provide collateral documents if loan above ₹7.5 lakhs",
          "Bank processes application in 15-30 days",
          "Sanction letter issued after approval",
          "Review sanctioned amount and interest terms",
          "Keep original sanction letter for visa and college",
        ],
      },
      {
        id: "scholarship-award",
        name: "Scholarship Award Letter",
        description: "Official letter confirming scholarship grant and amount",
        link: "https://scholarships.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have been awarded a scholarship - Serves as proof of financial support and may be required for college records and visa applications.",
        steps: [
          "Apply for scholarships through NSP or institution",
          "Track application status regularly",
          "Award letter issued upon selection",
          "Download from scholarship portal",
          "Get it verified by scholarship authority if needed",
          "Submit to college/university as required",
          "Keep for visa and financial verification",
        ],
      },
      {
        id: "fd-certificate",
        name: "Fixed Deposit Certificate",
        description: "Certificate showing fixed deposits as financial proof",
        link: "https://www.sbi.co.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you have made fixed deposits for education expenses - Required for study abroad visa applications to show financial capability. Deposit amount should cover 1st year expenses.",
        steps: [
          "Create fixed deposit at bank with sufficient amount",
          "Request FD certificate from bank",
          "Get certificate mentioning FD amount and maturity date",
          "Ensure FD is in your or parent's name",
          "Certificate should be recent (within 3 months)",
          "Get bank manager's signature and official seal",
          "Submit as financial proof for visa",
        ],
      },
      {
        id: "sponsorship",
        name: "Sponsorship Letter",
        description: "Letter from sponsor declaring financial support",
        link: "https://www.notary.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if someone (parent/relative/organization) is sponsoring your education - Required for visa applications when sponsor is funding studies. Must be notarized with sponsor's financial documents.",
        steps: [
          "Draft sponsorship letter stating sponsor's commitment",
          "Include sponsor's name, relation, and amount committed",
          "Attach sponsor's bank statements and income proof",
          "Get letter notarized from authorized notary",
          "Sponsor should sign in presence of notary",
          "Include sponsor's ID proof and address proof",
          "Attach affidavit if required by university/embassy",
        ],
      },
    ],
  },
  {
    category: "Category Certificates",
    icon: "📋",
    documents: [
      {
        id: "caste-sc",
        name: "SC (Scheduled Caste) Certificate",
        description: "Caste certificate for SC category issued by competent authority",
        link: "https://edistrict.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you belong to Scheduled Caste community - Required for reservations in education and employment, and SC-specific scholarships. Both parents must belong to SC community.",
        steps: [
          "Visit e-District portal or Tehsil office",
          "Fill SC certificate application form",
          "Attach parents' caste certificates (if available)",
          "Provide domicile certificate and address proof",
          "Submit family tree/pedigree if required",
          "Attach parent's community certificate",
          "Pay nominal fee",
          "Verification done by Tehsildar/SDM",
          "Certificate issued in 15-30 days",
        ],
      },
      {
        id: "caste-st",
        name: "ST (Scheduled Tribe) Certificate",
        description: "Caste certificate for ST category issued by competent authority",
        link: "https://edistrict.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you belong to Scheduled Tribe community - Required for ST reservations and tribal welfare schemes. Both parents must belong to ST community.",
        steps: [
          "Visit e-District portal or District Tribal Welfare Office",
          "Fill ST certificate application form",
          "Provide proof of tribal ancestry (parents' certificates)",
          "Submit domicile certificate showing tribal area residence",
          "Attach family documents and tribal verification",
          "Officials may conduct field verification",
          "Certificate issued by District Collector/SDM",
          "Processing time: 30-45 days",
        ],
      },
      {
        id: "caste-obc",
        name: "OBC (Other Backward Class) Certificate",
        description: "Non-creamy layer OBC certificate for reservations",
        link: "https://edistrict.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you belong to OBC community AND annual family income is below ₹8 lakhs (central list) - Required for OBC reservations. Creamy layer families not eligible. Valid for 1 year only.",
        steps: [
          "Verify your caste is in Central/State OBC list",
          "Visit e-District portal or Tehsil office",
          "Fill OBC certificate application with non-creamy layer clause",
          "Submit parents' income certificate (below ₹8 lakhs)",
          "Provide parents' caste certificates if available",
          "Attach employment details of parents",
          "Certificate issued by Tehsildar/SDM",
          "Validity: 1 year (renew annually with income proof)",
          "Processing time: 15-30 days",
        ],
      },
      {
        id: "ews",
        name: "EWS (Economically Weaker Section) Certificate",
        description: "Certificate for general category students with low income",
        link: "https://edistrict.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you are from General category AND annual family income below ₹8 lakhs AND family doesn't own certain assets (5+ acres, 1000+ sqft house) - For 10% EWS reservation.",
        steps: [
          "Verify you belong to General category (not SC/ST/OBC)",
          "Ensure family income is below ₹8 lakhs annually",
          "Check you don't have disqualifying assets",
          "Visit e-District portal or Tehsil office",
          "Fill EWS certificate application form",
          "Submit income certificate and asset declaration",
          "Provide Aadhar, address proof, and family details",
          "Certificate issued by Tehsildar/Revenue Officer",
          "Valid for 1 financial year, renew annually",
          "Processing time: 7-15 days",
        ],
      },
      {
        id: "disability",
        name: "Disability Certificate (PWD)",
        description: "Certificate for Persons with Disabilities (40%+ disability)",
        link: "https://www.swavlambancard.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have a physical/mental disability of 40% or more - Required for PWD reservations, scholarships, and special accommodations. Must be certified by medical board.",
        steps: [
          "Visit Government hospital or medical board",
          "Get examined by specialist doctors (3-5 member board)",
          "Bring all medical records and previous reports",
          "Medical board assesses disability percentage",
          "If disability ≥40%, certificate issued",
          "Apply for UDID (Unique Disability ID) card online",
          "Download disability certificate from portal",
          "Valid for 5 years (permanent for some conditions)",
          "Use for reservations and assistance schemes",
        ],
      },
      {
        id: "domicile",
        name: "Domicile Certificate",
        description: "Certificate proving you are resident of particular state",
        link: "https://edistrict.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you need to prove residency in a state (for state quota admissions, state jobs, regional scholarships) - Required for state-level benefits and quotas.",
        steps: [
          "Visit e-District portal or Tehsil office of your state",
          "Fill domicile certificate application form",
          "Provide address proof showing residence (utility bills, rent agreement)",
          "Submit parent's domicile certificate if available",
          "Attach Aadhar card with current address",
          "Provide school/college records showing study in state",
          "Pay processing fee",
          "Certificate issued by Tehsildar in 15-30 days",
        ],
      },
      {
        id: "minority",
        name: "Minority Community Certificate",
        description: "Certificate for minority religious communities",
        link: "https://www.minorityaffairs.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable if you belong to minority religious community (Muslim, Christian, Sikh, Buddhist, Jain, Parsi) - Required for minority-specific scholarships and schemes.",
        steps: [
          "Visit District Minority Welfare Office",
          "Fill minority certificate application form",
          "Attach religion proof (birth certificate/community certificate)",
          "Provide parent's community certificates if available",
          "Submit ID proof and address proof",
          "Local verification may be conducted",
          "Certificate issued by District Collector/SDM",
          "Use for minority scholarships and welfare schemes",
          "Processing time: 15-30 days",
        ],
      },
      {
        id: "sports",
        name: "Sports Certificate",
        description: "Certificate for achievements in sports at district/state/national level",
        link: "https://yas.nic.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have participated and won medals/positions in recognized sports competitions at district level or above - Required for sports quota admissions and sports scholarships.",
        steps: [
          "Gather all competition participation certificates",
          "Collect medal/position certificates from organizing body",
          "Get certificate from District Sports Officer",
          "Mention specific achievements (gold/silver/bronze, level)",
          "Attach photographs of competitions if available",
          "Certificate should be on official letterhead",
          "Get it attested by Sports Authority of India if national level",
          "Valid for admissions in same academic year",
        ],
      },
      {
        id: "ncc-nss",
        name: "NCC/NSS Certificate",
        description: "Certificate for NCC (National Cadet Corps) or NSS (National Service Scheme) participation",
        link: "https://indiancc.nic.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have participated in NCC or NSS activities during school/college - Provides additional points in admissions and some scholarships. Must have 'B' or 'C' certificate for NCC.",
        steps: [
          "Ensure you completed minimum required hours/camps",
          "Apply for certificate through college NCC/NSS unit",
          "Fill application form with attendance records",
          "Submit participation proof (camp certificates, activities)",
          "For NCC: Clear B/C certificate exam",
          "Certificate issued by college/university",
          "Get it signed by NCC officer or NSS coordinator",
          "Mention grade achieved and duration of participation",
        ],
      },
    ],
  },
  {
    category: "Additional Documents",
    icon: "📄",
    documents: [
      {
        id: "gap-certificate",
        name: "Gap Certificate/Affidavit",
        description: "Document explaining gap year(s) in education",
        link: "https://www.notary.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have a gap of 1+ years in your education - Required for college admissions and visa applications. Must explain reason for gap (preparation, health, work, etc.).",
        steps: [
          "Draft gap affidavit on stamp paper (₹10-100 depending on state)",
          "Clearly mention period of gap and reasons",
          "Include what you did during gap (preparation/work/health recovery)",
          "Attach supporting documents (medical certificate, work experience letter)",
          "Get affidavit notarized from authorized notary",
          "Sign in presence of notary public",
          "Keep multiple copies for different applications",
        ],
      },
      {
        id: "name-change",
        name: "Name Change Certificate",
        description: "Legal document for official name change in records",
        link: "https://www.egazette.nic.in/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if your name is different in various documents OR you legally changed your name - Required to ensure all documents have consistent name.",
        steps: [
          "Draft name change affidavit on stamp paper",
          "Publish name change notice in Official Gazette",
          "Publish in two newspapers (one English, one regional)",
          "Submit affidavit and publication proofs to authorities",
          "Update name in all government documents (Aadhar, PAN, etc.)",
          "Collect updated documents with new name",
          "Keep affidavit and publication proofs for future reference",
        ],
      },
      {
        id: "transfer-certificate",
        name: "Transfer Certificate (TC)",
        description: "Certificate issued when leaving school/college",
        link: "https://www.digilocker.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable when you complete studies at one institution and join another - Required for admission to new school/college. Get it from last attended institution.",
        steps: [
          "Apply for TC from your current/last school/college",
          "Clear all dues (library, fees, hostel)",
          "Submit ID card and any institution property",
          "Fill TC application form",
          "Usually issued on last day or within 15 days",
          "Verify all details (name, dates, conduct) are correct",
          "Original TC must be submitted to new institution",
        ],
      },
      {
        id: "experience",
        name: "Work Experience Certificate",
        description: "Certificate from previous employer showing work duration and role",
        link: "https://www.linkedin.com/",
        required: false,
        applicabilityInstructions:
          "Applicable ONLY if you have work experience (internships, jobs) - Required for job applications showing relevant experience. Request from all previous employers.",
        steps: [
          "Draft experience letter request to HR department",
          "Mention your designation, duration, and responsibilities",
          "Request on company letterhead with official seal",
          "Should include joining and leaving dates",
          "Get it signed by reporting manager or HR head",
          "Multiple copies may be needed for different applications",
          "Get it within 15 days of relieving",
        ],
      },
      {
        id: "medical-fitness",
        name: "Medical Fitness Certificate",
        description: "Certificate from registered doctor confirming physical fitness",
        link: "https://www.nhp.gov.in/",
        required: false,
        applicabilityInstructions:
          "Applicable for certain college admissions, sports trials, government jobs, and hostel admissions - Required by institution to ensure you're medically fit for activities.",
        steps: [
          "Visit registered medical practitioner or government hospital",
          "Complete physical examination including vitals check",
          "Doctor checks height, weight, vision, hearing",
          "May require blood tests or X-ray in some cases",
          "Doctor issues fitness certificate on letterhead",
          "Certificate should have doctor's registration number",
          "Valid typically for 6 months to 1 year",
        ],
      },
      {
        id: "passport-photos",
        name: "Passport Size Photographs",
        description: "Standard size photos (4.5cm x 3.5cm) for applications",
        link: "https://www.passportindia.gov.in/",
        required: true,
        applicabilityInstructions:
          "Applicable to ALL students - Required for almost every application (admissions, exams, documents, ID cards). Always keep 20-30 copies ready.",
        steps: [
          "Visit professional photo studio",
          "Wear formal/semi-formal attire with light background",
          "Remove glasses unless worn regularly for medical reasons",
          "Face should be clearly visible with neutral expression",
          "Get both matte and glossy finish (10-15 each)",
          "Carry digital copy on USB for online applications",
          "Specification: 4.5cm x 3.5cm, white/light blue background",
        ],
      },
    ],
  },
]

export default function DocumentsPage() {
  const [checkedDocuments, setCheckedDocuments] = useState<Set<string>>(new Set())
  const [applicableDocuments, setApplicableDocuments] = useState<Set<string>>(new Set())
  const [expandedCategory, setExpandedCategory] = useState<string | null>(documentCategories[0].category)

  const handleToggle = (docId: string) => {
    const newChecked = new Set(checkedDocuments)
    if (newChecked.has(docId)) {
      newChecked.delete(docId)
    } else {
      newChecked.add(docId)
    }
    setCheckedDocuments(newChecked)
  }

  const handleApplicability = (docId: string, applicable: boolean) => {
    const newApplicable = new Set(applicableDocuments)
    if (applicable) {
      newApplicable.add(docId)
    } else {
      newApplicable.delete(docId)
      // Also uncheck if marked not applicable
      const newChecked = new Set(checkedDocuments)
      newChecked.delete(docId)
      setCheckedDocuments(newChecked)
    }
    setApplicableDocuments(newApplicable)
  }

  const totalDocuments = documentCategories.reduce((acc, cat) => acc + cat.documents.length, 0)
  const applicableCount = applicableDocuments.size
  const completedDocuments = checkedDocuments.size
  const completionPercentage = applicableCount > 0 ? Math.round((completedDocuments / applicableCount) * 100) : 0

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        {/* Header */}
        <div className="mb-12">
          <h1 className="text-4xl font-bold mb-4">Document Acquisition</h1>
          <p className="text-lg text-muted-foreground leading-relaxed max-w-3xl">
            Comprehensive document checklist for your educational and career journey. First, review applicability
            instructions to see which documents you need, then track your progress.
          </p>
        </div>

        {/* Progress Card */}
        <Card className="p-6 mb-8 bg-gradient-to-br from-primary/10 to-primary/5 border-primary/20">
          <div className="flex items-center justify-between mb-4">
            <div>
              <h2 className="text-2xl font-bold">Your Progress</h2>
              <p className="text-muted-foreground mt-1">
                {completedDocuments} of {applicableCount} applicable documents completed
              </p>
              <p className="text-sm text-muted-foreground/80 mt-1">
                {applicableCount} applicable out of {totalDocuments} total documents
              </p>
            </div>
            <div className="text-right">
              <div className="text-4xl font-bold text-primary">{completionPercentage}%</div>
            </div>
          </div>
          <div className="w-full bg-secondary rounded-full h-3 overflow-hidden">
            <div
              className="bg-primary h-full transition-all duration-500 rounded-full"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
        </Card>

        {/* Instructions Card */}
        <Card className="p-6 mb-8 bg-card border-primary/30">
          <div className="flex items-start gap-4">
            <HelpCircle className="h-6 w-6 text-primary mt-1 flex-shrink-0" />
            <div>
              <h3 className="text-lg font-bold mb-2">How to Use This Checklist</h3>
              <ol className="space-y-2 text-sm text-muted-foreground leading-relaxed">
                <li>
                  <span className="font-semibold text-foreground">1.</span> Read the "Who Should Get This?" section for
                  each document to determine if it applies to you
                </li>
                <li>
                  <span className="font-semibold text-foreground">2.</span> Click "Applicable to Me" for documents you
                  need, or "Not Applicable" for those you don't
                </li>
                <li>
                  <span className="font-semibold text-foreground">3.</span> For applicable documents, follow the
                  step-by-step guidance and use the official links
                </li>
                <li>
                  <span className="font-semibold text-foreground">4.</span> Check off documents as you obtain them to
                  track your progress
                </li>
              </ol>
            </div>
          </div>
        </Card>

        {/* Document Categories */}
        <div className="space-y-6">
          {documentCategories.map((category) => {
            const categoryApplicable = category.documents.filter((d) => applicableDocuments.has(d.id)).length
            const categoryCompleted = category.documents.filter((d) => checkedDocuments.has(d.id)).length
            const categoryTotal = category.documents.length
            const isExpanded = expandedCategory === category.category

            return (
              <Card key={category.category} className="overflow-hidden">
                <button
                  onClick={() => setExpandedCategory(isExpanded ? null : category.category)}
                  className="w-full p-6 flex items-center justify-between hover:bg-muted/50 transition-colors"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-3xl">{category.icon}</div>
                    <div className="text-left">
                      <h3 className="text-xl font-bold">{category.category}</h3>
                      <p className="text-sm text-muted-foreground">
                        {categoryCompleted} completed • {categoryApplicable} applicable • {categoryTotal} total
                      </p>
                    </div>
                  </div>
                  <ChevronRight className={`h-5 w-5 transition-transform ${isExpanded ? "rotate-90" : ""}`} />
                </button>

                {isExpanded && (
                  <div className="border-t border-border">
                    {category.documents.map((doc) => {
                      const isChecked = checkedDocuments.has(doc.id)
                      const isApplicable = applicableDocuments.has(doc.id)
                      const applicabilitySet =
                        applicableDocuments.has(doc.id) ||
                        (!applicableDocuments.has(doc.id) && checkedDocuments.size === 0)

                      return (
                        <div
                          key={doc.id}
                          className={`p-6 border-b border-border last:border-b-0 transition-colors ${
                            isApplicable ? "hover:bg-muted/30" : "bg-muted/10"
                          }`}
                        >
                          <div className="flex items-start gap-4">
                            <Checkbox
                              id={doc.id}
                              checked={isChecked}
                              onCheckedChange={() => handleToggle(doc.id)}
                              className="mt-1"
                              disabled={!isApplicable}
                            />
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-2 flex-wrap">
                                <label htmlFor={doc.id} className="text-lg font-semibold cursor-pointer">
                                  {doc.name}
                                </label>
                                {doc.required && (
                                  <span className="text-xs bg-destructive/20 text-destructive px-2 py-0.5 rounded">
                                    Essential
                                  </span>
                                )}
                                {isChecked && <CheckCircle2 className="h-5 w-5 text-primary" />}
                                {isApplicable && !isChecked && (
                                  <span className="text-xs bg-primary/20 text-primary px-2 py-0.5 rounded">To-Do</span>
                                )}
                                {!isApplicable && applicableDocuments.size > 0 && (
                                  <span className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded">
                                    Not Applicable
                                  </span>
                                )}
                              </div>

                              <p className="text-sm text-muted-foreground mb-4 leading-relaxed">{doc.description}</p>

                              <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 mb-4">
                                <h4 className="text-sm font-semibold mb-2 flex items-center gap-2 text-primary">
                                  <HelpCircle className="h-4 w-4" />
                                  Who Should Get This Document?
                                </h4>
                                <p className="text-sm text-foreground leading-relaxed mb-3">
                                  {doc.applicabilityInstructions}
                                </p>

                                <div className="flex gap-2">
                                  <Button
                                    size="sm"
                                    variant={isApplicable ? "default" : "outline"}
                                    onClick={() => handleApplicability(doc.id, true)}
                                    className="text-xs"
                                  >
                                    <CheckCircle2 className="h-3 w-3 mr-1" />
                                    Applicable to Me
                                  </Button>
                                  <Button
                                    size="sm"
                                    variant={!isApplicable && applicableDocuments.size > 0 ? "secondary" : "outline"}
                                    onClick={() => handleApplicability(doc.id, false)}
                                    className="text-xs"
                                  >
                                    <XCircle className="h-3 w-3 mr-1" />
                                    Not Applicable
                                  </Button>
                                </div>
                              </div>

                              {isApplicable && (
                                <>
                                  {/* Step-by-step guidance */}
                                  <div className="bg-muted/50 rounded-lg p-4 mb-4">
                                    <h4 className="text-sm font-semibold mb-3 flex items-center gap-2">
                                      <AlertCircle className="h-4 w-4 text-primary" />
                                      Step-by-Step Guide
                                    </h4>
                                    <ol className="space-y-2 text-sm text-muted-foreground">
                                      {doc.steps.map((step, index) => (
                                        <li key={index} className="flex gap-2">
                                          <span className="font-semibold text-foreground min-w-[1.5rem]">
                                            {index + 1}.
                                          </span>
                                          <span className="leading-relaxed">{step}</span>
                                        </li>
                                      ))}
                                    </ol>
                                  </div>

                                  <Button variant="outline" size="sm" asChild>
                                    <a href={doc.link} target="_blank" rel="noopener noreferrer">
                                      Get Document
                                      <ExternalLink className="ml-2 h-4 w-4" />
                                    </a>
                                  </Button>
                                </>
                              )}
                            </div>
                          </div>
                        </div>
                      )
                    })}
                  </div>
                )}
              </Card>
            )
          })}
        </div>

        {/* Help Section */}
        <Card className="mt-8 p-6 bg-card">
          <h3 className="text-lg font-bold mb-2">Need Help?</h3>
          <p className="text-sm text-muted-foreground leading-relaxed mb-4">
            If you're having trouble obtaining any documents or need personalized guidance on applicability, our Lynx
            chatbot is here to help 24/7.
          </p>
          <Button variant="default">Chat with Lynx</Button>
        </Card>
      </div>

      <LynxChatbot />
      <FooterNavigation />
    </div>
  )
}
