'use client'

import { Suspense } from 'react'
import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { FloorVisualization3D } from '@/visualization/FloorVisualization3D'

export default function VisualizationPage() {
  return (
    <div className="min-h-screen bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">3D Floor Visualization</h1>
          <p className="text-slate-300">Interactive 3D view of campus rooms and availability</p>
        </div>

        <Suspense fallback={<LoadingVisualization />}>
          <FloorVisualization3D />
        </Suspense>
      </main>

      <Footer />
    </div>
  )
}

function LoadingVisualization() {
  return (
    <div className="bg-slate-800 rounded-lg h-[600px] flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent mx-auto mb-4"></div>
        <p className="text-slate-300">Loading 3D visualization...</p>
      </div>
    </div>
  )
}
