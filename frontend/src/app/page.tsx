import { Header } from '@/components/layout/Header'
import { Hero } from '@/components/home/Hero'
import { CampusOverview } from '@/components/home/CampusOverview'
import { QuickSearch } from '@/components/home/QuickSearch'
import { RecentActivity } from '@/components/home/RecentActivity'
import { DataUploadSection } from '@/components/home/DataUploadSection'
import { Footer } from '@/components/layout/Footer'
import { Suspense } from 'react'

export default function HomePage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-slate-100 dark:from-slate-900 dark:to-slate-800">
      <Header />
      
      <main>
        {/* Hero / Welcome Section */}
        <Hero />

        {/* Campus Overview Section */}
        <section className="container mx-auto px-4 py-12">
          <Suspense fallback={<LoadingSkeleton />}>
            <CampusOverview />
          </Suspense>
        </section>

        {/* Quick Room Availability Search */}
        <section className="bg-white dark:bg-slate-800 py-12">
          <div className="container mx-auto px-4">
            <QuickSearch />
          </div>
        </section>

        {/* Recent Activity / Notifications */}
        <section className="container mx-auto px-4 py-12">
          <RecentActivity />
        </section>

        {/* Data Upload Section (Admin) */}
        <section className="bg-slate-100 dark:bg-slate-900 py-12">
          <div className="container mx-auto px-4">
            <DataUploadSection />
          </div>
        </section>
      </main>

      <Footer />
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-4">
      {[1, 2, 3].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="h-24 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
        </div>
      ))}
    </div>
  )
}
