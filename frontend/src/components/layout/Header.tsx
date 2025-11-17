'use client'

import Link from 'next/link'
import { Building2, Menu, Search, Upload, Calendar, User, Bell } from 'lucide-react'
import { useState } from 'react'

export function Header() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  return (
    <header className="bg-white dark:bg-slate-900 shadow-md sticky top-0 z-50">
      <nav className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between gap-4">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-2 flex-shrink-0">
            <Building2 className="h-8 w-8 text-blue-600" />
            <span className="text-xl font-bold text-slate-900 dark:text-white">
              Campus Rooms
            </span>
          </Link>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search rooms, buildings, floors..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-10 pr-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden lg:flex items-center space-x-6">
            <Link href="/" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">
              Home
            </Link>
            <Link href="/buildings" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">
              Buildings
            </Link>
            <Link href="/floors" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">
              Floors
            </Link>
            <Link href="/rooms" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">
              Rooms
            </Link>
            <Link href="/schedules" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">
              <Calendar className="inline h-4 w-4 mr-1" />
              Schedule
            </Link>
            <Link href="/upload" className="text-slate-700 dark:text-slate-300 hover:text-blue-600 font-medium transition-colors">
              <Upload className="inline h-4 w-4 mr-1" />
              Upload
            </Link>
          </div>

          {/* User Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
              <Bell className="h-5 w-5 text-slate-700 dark:text-slate-300" />
            </button>
            {typeof window !== 'undefined' && localStorage.getItem('auth_token') ? (
              <>
                <Link href="/profile" className="p-2 hover:bg-slate-100 dark:hover:bg-slate-800 rounded-lg transition-colors">
                  <User className="h-5 w-5 text-slate-700 dark:text-slate-300" />
                </Link>
                <button
                  onClick={() => {
                    localStorage.removeItem('auth_token')
                    window.location.href = '/login'
                  }}
                  className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg font-medium transition-colors"
                >
                  Logout
                </button>
              </>
            ) : (
              <Link
                href="/login"
                className="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                Login
              </Link>
            )}
          </div>

          {/* Mobile Menu Button */}
          <button className="lg:hidden" onClick={() => setMobileMenuOpen(!mobileMenuOpen)}>
            <Menu className="h-6 w-6 text-slate-700 dark:text-slate-300" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div className="lg:hidden mt-4 space-y-2 pb-4">
            <div className="mb-4">
              <input
                type="text"
                placeholder="Search..."
                className="w-full px-4 py-2 rounded-lg border border-slate-300 dark:border-slate-600 bg-slate-50 dark:bg-slate-800"
              />
            </div>
            <Link href="/" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">Home</Link>
            <Link href="/buildings" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">Buildings</Link>
            <Link href="/floors" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">Floors</Link>
            <Link href="/rooms" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">Rooms</Link>
            <Link href="/schedules" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">Schedule</Link>
            <Link href="/upload" className="block py-2 text-slate-700 dark:text-slate-300 hover:text-blue-600">Upload Data</Link>
          </div>
        )}
      </nav>
    </header>
  )
}
