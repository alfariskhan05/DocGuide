"use client"

import Link from "next/link"
import { Button } from "@/components/ui/button"
import { GraduationCap, Menu, X, MessageSquare } from "lucide-react"
import { useState } from "react"
import { LynxChatbot } from "@/components/lynx-chatbot"

export function Navigation() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [showChatbot, setShowChatbot] = useState(false)

  const navLinks = [
    { href: "/documents", label: "Documents" },
    { href: "/scholarships", label: "Scholarships" },
    { href: "/jobs", label: "Job Matching" },
    { href: "/interview", label: "AI Interview" },
  ]

  return (
    <>
      <nav className="border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center gap-2">
              <Link href="/" className="flex items-center gap-2">
                <GraduationCap className="h-8 w-8 text-primary" />
                <span className="text-xl font-bold">DocGuide</span>
              </Link>
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex md:items-center md:gap-8">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="text-sm font-medium text-muted-foreground transition-colors hover:text-foreground"
                >
                  {link.label}
                </Link>
              ))}
              <Button size="sm" variant="ghost" className="ml-2" onClick={() => setShowChatbot(true)}>
                <MessageSquare className="h-4 w-4" />
              </Button>
              <Button size="sm" asChild>
                <Link href="/documents">Get Started</Link>
              </Button>
            </div>

            {/* Mobile menu button */}
            <button onClick={() => setMobileMenuOpen(!mobileMenuOpen)} className="md:hidden">
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>

          {/* Mobile Navigation */}
          {mobileMenuOpen && (
            <div className="md:hidden pb-4 pt-2 space-y-2">
              {navLinks.map((link) => (
                <Link
                  key={link.href}
                  href={link.href}
                  className="block px-3 py-2 text-base font-medium text-muted-foreground transition-colors hover:text-foreground hover:bg-muted rounded-md"
                  onClick={() => setMobileMenuOpen(false)}
                >
                  {link.label}
                </Link>
              ))}
              <div className="px-3 pt-2">
                <Button className="w-full" size="sm" asChild>
                  <Link href="/documents">Get Started</Link>
                </Button>
              </div>
            </div>
          )}
        </div>
      </nav>

      {showChatbot && (
        <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-40" onClick={() => setShowChatbot(false)}>
          <div className="fixed bottom-6 right-6 z-50" onClick={(e) => e.stopPropagation()}>
            <LynxChatbot isOpen={showChatbot} onClose={() => setShowChatbot(false)} />
          </div>
        </div>
      )}
    </>
  )
}
