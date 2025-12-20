"use client"

import { Navigation } from "@/components/navigation"
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { LynxChatbot } from "@/components/lynx-chatbot"
import { FileCheck, GraduationCap, Briefcase, Video, MessageSquare, ArrowRight, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { useState } from "react"

export default function HomePage() {
  const [chatbotOpen, setChatbotOpen] = useState(false)

  const features = [
    {
      icon: FileCheck,
      title: "Document Acquisition",
      description:
        "Get personalized checklists for all required documents with direct links and step-by-step guidance.",
      href: "/documents",
      color: "text-chart-1",
    },
    {
      icon: GraduationCap,
      title: "Scholarship Finder",
      description:
        "Match with relevant scholarships based on your profile including religion, caste, disability, and achievements.",
      href: "/scholarships",
      color: "text-chart-2",
    },
    {
      icon: Briefcase,
      title: "Job Matching",
      description: "Upload your resume and get matched with relevant job opportunities through LinkedIn integration.",
      href: "/jobs",
      color: "text-chart-4",
    },
  ]

  const additionalFeatures = [
    {
      icon: Video,
      title: "AI Virtual Interview",
      description: "Practice with live video-tracked interviews with AI-generated questions based on your resume.",
      href: "/interview",
    },
    {
      icon: MessageSquare,
      title: "Lynx Chatbot",
      description: "Get instant answers to your career questions with our AI-powered assistant.",
      action: "Chat Now",
      onClick: () => setChatbotOpen(true),
    },
  ]

  const benefits = [
    "Comprehensive career development guidance",
    "Personalized recommendations",
    "AI-powered interview practice",
    "24/7 chatbot assistance",
    "Direct links to resources",
    "Step-by-step instructions",
  ]

  return (
    <div className="min-h-screen bg-background">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden border-b border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-24 md:py-32">
          <div className="mx-auto max-w-3xl text-center">
            <h1 className="text-4xl font-bold tracking-tight sm:text-6xl md:text-7xl text-balance">
              The complete platform for student career development
            </h1>
            <p className="mt-6 text-lg leading-relaxed text-muted-foreground text-pretty max-w-2xl mx-auto">
              From document acquisition to job matching, DocGuide provides comprehensive guidance powered by AI to help
              you succeed in your career journey.
            </p>
            <div className="mt-10 flex items-center justify-center gap-4 flex-wrap">
              <Button size="lg" asChild>
                <Link href="/documents">
                  Get Started
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
              <Button size="lg" variant="outline" asChild>
                <Link href="#features">Explore Features</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="border-b border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4">
            {[
              { label: "Documents Tracked", value: "500+" },
              { label: "Scholarships", value: "1,000+" },
              { label: "Job Matches", value: "10,000+" },
              { label: "Students Helped", value: "50,000+" },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl font-bold text-primary">{stat.value}</div>
                <div className="mt-2 text-sm text-muted-foreground">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Main Features Section */}
      <section id="features" className="py-24 md:py-32">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl md:text-5xl">Core Features</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Three powerful tools designed to streamline your career development journey
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-3">
            {features.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-8 hover:border-primary transition-colors">
                  <Icon className={`h-12 w-12 ${feature.color} mb-4`} />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                  <Button variant="ghost" className="group" asChild>
                    <Link href={feature.href}>
                      Learn More
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </Link>
                  </Button>
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Additional Features Section */}
      <section className="py-24 bg-card border-y border-border">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold tracking-tight sm:text-4xl">AI-Powered Tools</h2>
            <p className="mt-4 text-lg text-muted-foreground max-w-2xl mx-auto">
              Advanced features to give you an edge in your career preparation
            </p>
          </div>

          <div className="grid gap-8 md:grid-cols-2 max-w-4xl mx-auto">
            {additionalFeatures.map((feature) => {
              const Icon = feature.icon
              return (
                <Card key={feature.title} className="p-8 hover:border-primary transition-colors">
                  <Icon className="h-12 w-12 text-primary mb-4" />
                  <h3 className="text-xl font-bold mb-3">{feature.title}</h3>
                  <p className="text-muted-foreground leading-relaxed mb-6">{feature.description}</p>
                  {feature.href && (
                    <Button variant="default" asChild>
                      <Link href={feature.href}>Get Started</Link>
                    </Button>
                  )}
                  {feature.action && (
                    <Button variant="default" onClick={feature.onClick}>
                      {feature.action}
                    </Button>
                  )}
                </Card>
              )
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-24">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="grid gap-12 lg:grid-cols-2 items-center">
            <div>
              <h2 className="text-3xl font-bold tracking-tight sm:text-4xl mb-6">Everything you need to succeed</h2>
              <p className="text-lg text-muted-foreground leading-relaxed mb-8">
                DocGuide combines cutting-edge AI technology with comprehensive career resources to provide students
                with a complete development platform.
              </p>
              <div className="grid gap-4 sm:grid-cols-2">
                {benefits.map((benefit) => (
                  <div key={benefit} className="flex items-start gap-3">
                    <CheckCircle2 className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                    <span className="text-sm text-muted-foreground">{benefit}</span>
                  </div>
                ))}
              </div>
            </div>
            <Card className="p-8 lg:p-12 bg-gradient-to-br from-card to-card/50">
              <h3 className="text-2xl font-bold mb-4">Ready to get started?</h3>
              <p className="text-muted-foreground mb-6 leading-relaxed">
                Join thousands of students who are already using DocGuide to accelerate their career development.
              </p>
              <Button size="lg" className="w-full sm:w-auto" asChild>
                <Link href="/documents">
                  Start Your Journey
                  <ArrowRight className="ml-2 h-4 w-4" />
                </Link>
              </Button>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-card">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold">DocGuide</span>
            </div>
            <p className="text-sm text-muted-foreground">
              © 2025 DocGuide. Complete guidance for student career development.
            </p>
          </div>
        </div>
      </footer>

      <LynxChatbot isOpen={chatbotOpen} onClose={() => setChatbotOpen(false)} />
    </div>
  )
}
