'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Layers, Building2, ArrowRight } from 'lucide-react'
import { apiService } from '@/services/api.service'

interface Floor {
  id: string
  floorNumber: number
  buildingId: string
  mapData: any
  createdAt: string
}

export default function FloorsPage() {
  const [floors, setFloors] = useState<Floor[]>([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchFloors = async () => {
      try {
        const data = await apiService.get<Floor[]>('/floors')
        setFloors(data)
      } catch (error) {
        console.error('Failed to fetch floors:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchFloors()
  }, [])

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Building Floors
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            View all floors across campus buildings
          </p>
        </div>

        {loading ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <div key={i} className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-pulse">
                <div className="h-6 bg-slate-200 dark:bg-slate-700 rounded mb-4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded mb-2"></div>
              </div>
            ))}
          </div>
        ) : floors.length === 0 ? (
          <div className="text-center py-12">
            <Layers className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">
              No Floors Found
            </h3>
            <p className="text-slate-600 dark:text-slate-400">
              No floor data available yet
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {floors.map((floor) => (
              <div
                key={floor.id}
                className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 hover:shadow-xl transition-shadow"
              >
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center gap-3">
                    <div className="p-3 bg-purple-100 dark:bg-purple-900 rounded-lg">
                      <Layers className="h-6 w-6 text-purple-600 dark:text-purple-400" />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold text-slate-900 dark:text-white">
                        Floor {floor.floorNumber}
                      </h3>
                      <p className="text-sm text-slate-600 dark:text-slate-400">
                        Building {floor.buildingId.substring(0, 8)}...
                      </p>
                    </div>
                  </div>
                </div>
                
                <Link
                  href={`/floors/${floor.id}`}
                  className="inline-flex items-center gap-2 text-blue-600 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 font-medium"
                >
                  View Details
                  <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            ))}
          </div>
        )}

        {!loading && floors.length > 0 && (
          <div className="mt-8 text-center text-slate-600 dark:text-slate-400">
            Total: {floors.length} floors
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
