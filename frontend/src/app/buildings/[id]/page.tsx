'use client'

import { useEffect, useState } from 'react'
import { useParams } from 'next/navigation'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { Building2, MapPin, Layers } from 'lucide-react'
import { buildingService } from '@/modules/buildings/services/building.service'
import { IBuilding } from '@/interfaces/building.interface'

export default function BuildingDetailPage() {
  const params = useParams()
  const [building, setBuilding] = useState<IBuilding | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchBuilding = async () => {
      try {
        const data = await buildingService.getById(params.id as string)
        setBuilding(data)
      } catch (error) {
        console.error('Failed to fetch building:', error)
      } finally {
        setLoading(false)
      }
    }

    if (params.id) {
      fetchBuilding()
    }
  }, [params.id])

  if (loading) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="animate-pulse">
            <div className="h-8 bg-slate-200 dark:bg-slate-700 rounded w-1/4 mb-4"></div>
            <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-1/2 mb-8"></div>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  if (!building) {
    return (
      <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
        <Header />
        <main className="container mx-auto px-4 py-8">
          <div className="text-center">
            <Building2 className="h-16 w-16 mx-auto text-slate-400 mb-4" />
            <h2 className="text-2xl font-bold text-slate-900 dark:text-white mb-2">
              Building Not Found
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              The building you're looking for doesn't exist.
            </p>
          </div>
        </main>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8 mb-8">
          <div className="flex items-start gap-6">
            <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-lg">
              <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            <div className="flex-1">
              <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
                {building.name}
              </h1>
              {building.description && (
                <p className="text-slate-600 dark:text-slate-300 mb-4">
                  {building.description}
                </p>
              )}
              <div className="flex gap-4 text-sm text-slate-500 dark:text-slate-400">
                <div className="flex items-center gap-2">
                  <MapPin className="h-4 w-4" />
                  <span>Building ID: {building.id}</span>
                </div>
                <div className="flex items-center gap-2">
                  <Layers className="h-4 w-4" />
                  <span>Created: {new Date(building.createdAt).toLocaleDateString()}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Floors
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Floor information coming soon...
            </p>
          </div>

          <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6">
            <h2 className="text-xl font-bold text-slate-900 dark:text-white mb-4">
              Statistics
            </h2>
            <p className="text-slate-600 dark:text-slate-400">
              Building statistics coming soon...
            </p>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  )
}
