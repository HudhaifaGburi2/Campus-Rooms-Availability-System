'use client'

import { useEffect, useState } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Search, Filter, DoorOpen } from 'lucide-react'
import { apiService } from '@/services/api.service'

interface Room {
  id: string
  roomNumber: string
  floorId: string
  type: string
  capacity: number
  features: any
  createdAt: string
}

export default function RoomsPage() {
  const [rooms, setRooms] = useState<Room[]>([])
  const [loading, setLoading] = useState(true)
  const [searchTerm, setSearchTerm] = useState('')
  const [filterType, setFilterType] = useState('ALL')

  useEffect(() => {
    const fetchRooms = async () => {
      try {
        const data = await apiService.get<Room[]>('/rooms')
        setRooms(data)
      } catch (error) {
        console.error('Failed to fetch rooms:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchRooms()
  }, [])

  const filteredRooms = rooms.filter(room => {
    const matchesSearch = room.roomNumber.toLowerCase().includes(searchTerm.toLowerCase())
    const matchesType = filterType === 'ALL' || room.type === filterType
    return matchesSearch && matchesType
  })

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Campus Rooms
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Browse and search all rooms across campus
          </p>
        </div>

        {/* Search and Filter */}
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 mb-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <input
                type="text"
                placeholder="Search by room number..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              />
            </div>
            <div className="relative">
              <Filter className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-slate-400" />
              <select
                value={filterType}
                onChange={(e) => setFilterType(e.target.value)}
                className="w-full pl-10 pr-4 py-3 rounded-lg border border-slate-300 dark:border-slate-600 bg-white dark:bg-slate-700 text-slate-900 dark:text-white focus:ring-2 focus:ring-blue-500"
              >
                <option value="ALL">All Types</option>
                <option value="CLASSROOM">Classroom</option>
                <option value="LAB">Lab</option>
                <option value="OFFICE">Office</option>
                <option value="AUDITORIUM">Auditorium</option>
                <option value="LIBRARY">Library</option>
                <option value="OTHER">Other</option>
              </select>
            </div>
          </div>
        </div>

        {/* Rooms List */}
        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-2/3"></div>
              </div>
            ))}
          </div>
        ) : filteredRooms.length === 0 ? (
          <div className="text-center py-12">
            <DoorOpen className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No Rooms Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              Try adjusting your search or filters
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredRooms.map((room) => (
              <div
                key={room.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-1">
                      Room {room.roomNumber}
                    </h3>
                    <span className="inline-block px-3 py-1 bg-blue-100 dark:bg-blue-900 text-blue-700 dark:text-blue-300 text-xs font-semibold rounded-full">
                      {room.type}
                    </span>
                  </div>
                  <DoorOpen className="h-6 w-6 text-slate-400" />
                </div>
                <div className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                  <p>Capacity: {room.capacity} people</p>
                  <p>Floor ID: {room.floorId.substring(0, 8)}...</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Results Count */}
        {!loading && (
          <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Showing {filteredRooms.length} of {rooms.length} rooms
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
