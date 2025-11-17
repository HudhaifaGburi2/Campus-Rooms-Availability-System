'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Calendar, Clock, MapPin } from 'lucide-react'

export default function SchedulesPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Room Schedules
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            View and manage room booking schedules
          </p>
        </div>

        {/* Calendar View */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-center gap-3 mb-6">
            <Calendar className="h-8 w-8 text-blue-600" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white">
              Weekly Schedule
            </h2>
          </div>

          <div className="text-center py-12">
            <Clock className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              Schedule View Coming Soon
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-6">
              Interactive schedule calendar is under development
            </p>
          </div>
        </div>

        {/* Quick Actions */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg">
                <Calendar className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Today's Schedule
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              View all room bookings for today
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-green-100 dark:bg-green-900 rounded-lg">
                <Clock className="h-6 w-6 text-green-600 dark:text-green-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                Available Now
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Find rooms available at this moment
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                <MapPin className="h-6 w-6 text-purple-600 dark:text-purple-400" />
              </div>
              <h3 className="text-lg font-bold text-slate-900 dark:text-white">
                By Building
              </h3>
            </div>
            <p className="text-slate-600 dark:text-slate-400 text-sm">
              Browse schedules by building location
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
