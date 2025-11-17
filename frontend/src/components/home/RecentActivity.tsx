'use client'

import { useEffect, useState } from 'react'
import { Bell, Clock, DoorOpen, Calendar } from 'lucide-react'

interface Activity {
  id: string
  type: 'room_update' | 'schedule_update' | 'booking'
  message: string
  timestamp: Date
}

export function RecentActivity() {
  const [activities, setActivities] = useState<Activity[]>([
    { id: '1', type: 'room_update', message: 'Room A-101 is now available', timestamp: new Date() },
    { id: '2', type: 'schedule_update', message: 'New schedule uploaded for Science Building', timestamp: new Date() },
    { id: '3', type: 'booking', message: 'Room B-205 booked for 2:00 PM - 4:00 PM', timestamp: new Date() },
    { id: '4', type: 'room_update', message: 'Room C-301 maintenance completed', timestamp: new Date() },
  ])

  return (
    <div className="max-w-6xl mx-auto">
      <div className="flex items-center justify-between mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Recent Activity</h2>
          <p className="text-slate-600 dark:text-slate-300">Live updates from across campus</p>
        </div>
        <Bell className="h-8 w-8 text-blue-600 dark:text-blue-400" />
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
        <div className="divide-y divide-slate-200 dark:divide-slate-700">
          {activities.map((activity) => (
            <div key={activity.id} className="p-6 hover:bg-slate-50 dark:hover:bg-slate-700 transition-colors">
              <div className="flex items-start gap-4">
                <div className={`p-3 rounded-lg ${getActivityColor(activity.type)}`}>
                  {getActivityIcon(activity.type)}
                </div>
                <div className="flex-1">
                  <p className="text-slate-900 dark:text-white font-medium mb-1">{activity.message}</p>
                  <div className="flex items-center gap-2 text-sm text-slate-600 dark:text-slate-400">
                    <Clock className="h-4 w-4" />
                    <span>{formatTime(activity.timestamp)}</span>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-6 text-center">
        <button className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors">
          View All Activity
        </button>
      </div>
    </div>
  )
}

function getActivityIcon(type: string) {
  switch (type) {
    case 'room_update':
      return <DoorOpen className="h-5 w-5 text-white" />
    case 'schedule_update':
      return <Calendar className="h-5 w-5 text-white" />
    case 'booking':
      return <Bell className="h-5 w-5 text-white" />
    default:
      return <Bell className="h-5 w-5 text-white" />
  }
}

function getActivityColor(type: string) {
  switch (type) {
    case 'room_update':
      return 'bg-green-500'
    case 'schedule_update':
      return 'bg-blue-500'
    case 'booking':
      return 'bg-purple-500'
    default:
      return 'bg-slate-500'
  }
}

function formatTime(date: Date) {
  const now = new Date()
  const diff = now.getTime() - date.getTime()
  const minutes = Math.floor(diff / 60000)
  if (minutes < 1) return 'Just now'
  if (minutes < 60) return `${minutes} min ago`
  const hours = Math.floor(minutes / 60)
  if (hours < 24) return `${hours} hour${hours > 1 ? 's' : ''} ago`
  return date.toLocaleDateString()
}
