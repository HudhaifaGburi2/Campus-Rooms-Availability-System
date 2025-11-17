'use client'

import { Header } from '@/components/layout/Header'
import { Footer } from '@/components/layout/Footer'
import { DataUploadSection } from '@/components/home/DataUploadSection'

export default function UploadPage() {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900">
      <Header />
      
      <main className="container mx-auto px-4 py-8">
        <DataUploadSection />
      </main>

      <Footer />
    </div>
  )
}
