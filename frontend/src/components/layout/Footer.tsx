import { Building2, Github, Mail, FileText } from 'lucide-react'
import Link from 'next/link'

export function Footer() {
  return (
    <footer className="bg-slate-900 text-slate-300 py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="h-8 w-8 text-blue-400" />
              <span className="text-xl font-bold text-white">CCFVS</span>
            </div>
            <p className="text-sm text-slate-400">
              Campus Classroom & Facilities Visualization System
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="text-white font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/" className="hover:text-blue-400 transition-colors">Home</Link></li>
              <li><Link href="/buildings" className="hover:text-blue-400 transition-colors">Buildings</Link></li>
              <li><Link href="/rooms" className="hover:text-blue-400 transition-colors">Rooms</Link></li>
              <li><Link href="/schedules" className="hover:text-blue-400 transition-colors">Schedules</Link></li>
            </ul>
          </div>

          {/* Resources */}
          <div>
            <h3 className="text-white font-semibold mb-4">Resources</h3>
            <ul className="space-y-2 text-sm">
              <li><Link href="/docs" className="hover:text-blue-400 transition-colors">Documentation</Link></li>
              <li><Link href="/api" className="hover:text-blue-400 transition-colors">API Reference</Link></li>
              <li><Link href="/support" className="hover:text-blue-400 transition-colors">Support</Link></li>
              <li><Link href="/about" className="hover:text-blue-400 transition-colors">About</Link></li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-white font-semibold mb-4">Contact</h3>
            <ul className="space-y-2 text-sm">
              <li className="flex items-center gap-2">
                <Mail className="h-4 w-4" />
                <a href="mailto:support@ccfvs.edu" className="hover:text-blue-400 transition-colors">
                  support@ccfvs.edu
                </a>
              </li>
              <li className="flex items-center gap-2">
                <Github className="h-4 w-4" />
                <a href="https://github.com" className="hover:text-blue-400 transition-colors">
                  GitHub
                </a>
              </li>
              <li className="flex items-center gap-2">
                <FileText className="h-4 w-4" />
                <Link href="/docs" className="hover:text-blue-400 transition-colors">
                  Documentation
                </Link>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="border-t border-slate-800 pt-8 flex flex-col md:flex-row justify-between items-center text-sm">
          <p className="text-slate-400">
            © {new Date().getFullYear()} CCFVS. All rights reserved.
          </p>
          <div className="flex gap-6 mt-4 md:mt-0">
            <Link href="/privacy" className="hover:text-blue-400 transition-colors">Privacy Policy</Link>
            <Link href="/terms" className="hover:text-blue-400 transition-colors">Terms of Service</Link>
            <span className="text-slate-600">Version 1.0.0</span>
          </div>
        </div>
      </div>
    </footer>
  )
}
