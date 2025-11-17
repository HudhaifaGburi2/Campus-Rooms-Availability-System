'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { BuildingList } from '@/modules/buildings/components/BuildingList'

export default function BuildingsPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-slate-900 dark:text-white mb-2">
            Campus Buildings
          </h1>
          <p className="text-slate-600 dark:text-slate-300">
            Browse all buildings on campus
          </p>
        </div>

        <BuildingList />
      </main>

      <Footer />
    </div>
  )
}
