'use client'

import Link from 'next/link'
import { Building2, Upload, Search } from 'lucide-react'

export function Hero() {
  return (
    <section className="relative bg-gradient-to-r from-blue-600 to-blue-800 dark:from-blue-900 dark:to-slate-900 text-white py-20">
      <div className="container mx-auto px-4">
        <div className="max-w-4xl mx-auto text-center">
          {/* Welcome Message */}
          <h1 className="text-5xl md:text-6xl font-bold mb-6 animate-fade-in">
            Welcome to Campus Rooms Availability System
          </h1>
          <p className="text-xl md:text-2xl mb-12 text-blue-100">
            Explore buildings, floors, and rooms in real-time with interactive visualization
          </p>

          {/* Call-to-Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Link
              href="#campus-overview"
              className="inline-flex items-center px-8 py-4 bg-white text-blue-600 rounded-lg font-semibold hover:bg-blue-50 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1"
            >
              <Building2 className="mr-2 h-5 w-5" />
              View Buildings
            </Link>
            <Link
              href="#quick-search"
              className="inline-flex items-center px-8 py-4 bg-blue-700 text-white rounded-lg font-semibold hover:bg-blue-600 transition-all shadow-lg hover:shadow-xl transform hover:-translate-y-1 border-2 border-white"
            >
              <Search className="mr-2 h-5 w-5" />
              Search Rooms
            </Link>
            <Link
              href="#upload"
              className="inline-flex items-center px-8 py-4 bg-transparent text-white rounded-lg font-semibold hover:bg-blue-700 transition-all border-2 border-white"
            >
              <Upload className="mr-2 h-5 w-5" />
              Upload Data
            </Link>
          </div>

          {/* Optional Campus Illustration */}
          <div className="mt-16 relative">
            <div className="absolute inset-0 bg-gradient-to-t from-blue-600 to-transparent opacity-50"></div>
            <div className="grid grid-cols-3 gap-4 max-w-2xl mx-auto">
              <StatBadge value="12" label="Buildings" color="bg-green-500" />
              <StatBadge value="145" label="Rooms" color="bg-yellow-500" />
              <StatBadge value="89%" label="Available" color="bg-purple-500" />
            </div>
          </div>
        </div>
      </div>

      {/* Decorative Elements */}
      <div className="absolute bottom-0 left-0 right-0">
        <svg viewBox="0 0 1440 120" fill="none" xmlns="http://www.w3.org/2000/svg">
          <path
            d="M0 120L60 110C120 100 240 80 360 70C480 60 600 60 720 65C840 70 960 80 1080 85C1200 90 1320 90 1380 90L1440 90V120H1380C1320 120 1200 120 1080 120C960 120 840 120 720 120C600 120 480 120 360 120C240 120 120 120 60 120H0Z"
            className="fill-slate-50 dark:fill-slate-900"
          />
        </svg>
      </div>
    </section>
  )
}

function StatBadge({ value, label, color }: { value: string; label: string; color: string }) {
  return (
    <div className={`${color} rounded-lg p-6 shadow-lg transform hover:scale-105 transition-transform`}>
      <div className="text-3xl font-bold mb-1">{value}</div>
      <div className="text-sm font-medium opacity-90">{label}</div>
    </div>
  )
}
