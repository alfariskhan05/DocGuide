import Link from "next/link"
import { GraduationCap, FileCheck, Award, Briefcase, Video } from "lucide-react"

export function FooterNavigation() {
  return (
    <footer className="border-t border-border bg-card mt-12">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <GraduationCap className="h-6 w-6 text-primary" />
              <span className="font-bold text-lg">DocGuide</span>
            </div>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Complete guidance for student career development. Get documents, find scholarships, match jobs, and
              practice interviews.
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-3">
              <li>
                <Link
                  href="/documents"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <FileCheck className="h-4 w-4" />
                  Document Acquisition
                </Link>
              </li>
              <li>
                <Link
                  href="/scholarships"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Award className="h-4 w-4" />
                  Scholarship Finder
                </Link>
              </li>
              <li>
                <Link
                  href="/jobs"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Briefcase className="h-4 w-4" />
                  Job Matching
                </Link>
              </li>
              <li>
                <Link
                  href="/interview"
                  className="text-sm text-muted-foreground hover:text-primary transition-colors flex items-center gap-2"
                >
                  <Video className="h-4 w-4" />
                  AI Virtual Interview
                </Link>
              </li>
            </ul>
          </div>

          {/* Support */}
          <div>
            <h3 className="font-semibold mb-4">Support</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <button className="text-sm text-muted-foreground hover:text-primary transition-colors">
                  Chat with Lynx
                </button>
              </li>
            </ul>
          </div>
        </div>

        <div className="border-t border-border mt-8 pt-8 text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 DocGuide. Complete guidance for student career development.
          </p>
        </div>
      </div>
    </footer>
  )
}
