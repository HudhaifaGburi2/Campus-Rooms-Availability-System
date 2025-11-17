'use client'

import { useEffect, useState } from 'react'
import Link from 'next/link'
import { Building2, AlertCircle, RefreshCw, Wifi, WifiOff } from 'lucide-react'
import { buildingService } from '../services/building.service'
import { IBuilding } from '@/interfaces/building.interface'

export function BuildingList() {
  const [buildings, setBuildings] = useState<IBuilding[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [retrying, setRetrying] = useState(false)

  const fetchBuildings = async () => {
    try {
      setError(null)
      const data = await buildingService.getAll()
      // Handle both array response and empty/null responses
      setBuildings(Array.isArray(data) ? data : [])
    } catch (err: any) {
      console.error('Failed to fetch buildings:', err)
      
      // Determine error message based on error type
      let errorMessage = 'Failed to load buildings'
      
      if (err.code === 'ERR_NETWORK' || err.message.includes('Network Error')) {
        errorMessage = 'Unable to connect to the server. Please check your connection.'
      } else if (err.code === 'ECONNREFUSED' || err.message.includes('ECONNREFUSED')) {
        errorMessage = 'Cannot reach the backend server. Make sure it is running on http://localhost:3001'
      } else if (err.response?.status === 404) {
        errorMessage = 'API endpoint not configured correctly. Please check the backend setup.'
      } else if (err.response?.status >= 500) {
        errorMessage = 'Server error occurred. Please try again later.'
      } else if (err.response?.status === 401) {
        errorMessage = 'Authentication required. Please log in.'
      } else if (err.response?.data?.message) {
        errorMessage = err.response.data.message
      }
      
      setError(errorMessage)
    } finally {
      setLoading(false)
      setRetrying(false)
    }
  }

  useEffect(() => {
    fetchBuildings()
  }, [])

  const handleRetry = () => {
    setRetrying(true)
    setLoading(true)
    fetchBuildings()
  }

  if (loading) {
    return (
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div
            key={i}
            className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-6 animate-pulse"
          >
            <div className="flex items-start gap-4">
              <div className="w-12 h-12 bg-slate-200 dark:bg-slate-700 rounded-lg"></div>
              <div className="flex-1 space-y-3">
                <div className="h-5 bg-slate-200 dark:bg-slate-700 rounded w-3/4"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded"></div>
                <div className="h-4 bg-slate-200 dark:bg-slate-700 rounded w-5/6"></div>
              </div>
            </div>
          </div>
        ))}
      </div>
    )
  }

  if (error) {
    return (
      <div className="min-h-[400px] flex items-center justify-center px-4">
        <div className="max-w-lg w-full">
          {/* Error Card */}
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-2xl p-8 border-t-4 border-red-500">
            {/* Error Icon */}
            <div className="flex justify-center mb-6">
              <div className="relative">
                <div className="absolute inset-0 bg-red-500 opacity-20 rounded-full animate-ping"></div>
                <div className="relative bg-red-100 dark:bg-red-900/30 p-4 rounded-full">
                  <WifiOff className="h-12 w-12 text-red-600 dark:text-red-400" />
                </div>
              </div>
            </div>

            {/* Error Title */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white text-center mb-3">
              Unable to Load Buildings
            </h3>

            {/* Error Message */}
            <div className="bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg p-4 mb-6">
              <div className="flex gap-3">
                <AlertCircle className="h-5 w-5 text-red-600 dark:text-red-400 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-800 dark:text-red-200">
                  {error}
                </p>
              </div>
            </div>

            {/* Troubleshooting Tips */}
            <div className="bg-slate-50 dark:bg-slate-900 rounded-lg p-4 mb-6">
              <h4 className="text-sm font-semibold text-slate-900 dark:text-white mb-3">
                Common Solutions:
              </h4>
              <ul className="space-y-2 text-sm text-slate-600 dark:text-slate-400">
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Start the backend: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">cd backend && npm run start:dev</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Verify backend is running: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">http://localhost:3001/api/v1/buildings</code></span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Check database connection in backend logs</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-blue-600 dark:text-blue-400 mt-0.5">•</span>
                  <span>Run Prisma migrations: <code className="px-1 py-0.5 bg-slate-200 dark:bg-slate-700 rounded text-xs">npx prisma migrate dev</code></span>
                </li>
              </ul>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3">
              <button
                onClick={handleRetry}
                disabled={retrying}
                className="flex-1 flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-400 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                <RefreshCw className={`h-5 w-5 ${retrying ? 'animate-spin' : ''}`} />
                {retrying ? 'Retrying...' : 'Try Again'}
              </button>
              <button
                onClick={() => window.location.href = '/'}
                className="flex-1 px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold transition-colors"
              >
                Go Home
              </button>
            </div>

            {/* Help Link */}
            <div className="mt-6 text-center">
              <p className="text-xs text-slate-500 dark:text-slate-400">
                Need help? <a href="mailto:support@ccfvs.edu" className="text-blue-600 dark:text-blue-400 hover:underline">Contact Support</a>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  if (buildings.length === 0) {
    return (
      <div className="min-h-[400px] flex items-center justify-center px-4">
        <div className="max-w-md w-full text-center">
          <div className="bg-white dark:bg-slate-800 rounded-2xl shadow-xl p-8 border border-slate-200 dark:border-slate-700">
            {/* Success Icon - Not an Error */}
            <div className="bg-blue-100 dark:bg-blue-900/30 p-6 rounded-full w-24 h-24 mx-auto mb-6 flex items-center justify-center">
              <Building2 className="h-12 w-12 text-blue-600 dark:text-blue-400" />
            </div>
            
            {/* Welcome Message */}
            <h3 className="text-2xl font-bold text-slate-900 dark:text-white mb-3">
              Welcome to Campus Buildings
            </h3>
            <p className="text-slate-600 dark:text-slate-400 mb-2">
              No buildings have been added to the system yet.
            </p>
            <p className="text-sm text-slate-500 dark:text-slate-500 mb-6">
              This is normal for a fresh installation. Upload building data to get started.
            </p>
            
            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-3 justify-center">
              <button 
                onClick={() => window.location.href = '/upload'}
                className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold transition-colors shadow-lg hover:shadow-xl"
              >
                Upload Building Data
              </button>
              <button 
                onClick={() => window.location.href = '/'}
                className="px-6 py-3 bg-slate-200 hover:bg-slate-300 dark:bg-slate-700 dark:hover:bg-slate-600 text-slate-900 dark:text-white rounded-lg font-semibold transition-colors"
              >
                Go to Dashboard
              </button>
            </div>
            
            {/* Info Box */}
            <div className="mt-6 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg p-4">
              <p className="text-xs text-blue-800 dark:text-blue-200 flex items-start gap-2">
                <Wifi className="h-4 w-4 flex-shrink-0 mt-0.5" />
                <span>
                  <strong>Connected successfully!</strong> The system is ready. Upload JSON or CSV files to populate the database.
                </span>
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div>
      {/* Success Banner */}
      <div className="mb-6 bg-green-50 dark:bg-green-900/20 border border-green-200 dark:border-green-800 rounded-lg p-4">
        <div className="flex items-center gap-3">
          <Wifi className="h-5 w-5 text-green-600 dark:text-green-400" />
          <p className="text-sm text-green-800 dark:text-green-200">
            Connected - Showing {buildings.length} building{buildings.length !== 1 ? 's' : ''}
          </p>
        </div>
      </div>

      {/* Buildings Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {buildings.map((building) => (
          <Link
            key={building.id}
            href={`/buildings/${building.id}`}
            className="group bg-white dark:bg-slate-800 rounded-xl shadow-lg hover:shadow-2xl transition-all duration-300 p-6 border border-transparent hover:border-blue-500 dark:hover:border-blue-400"
          >
            <div className="flex items-start gap-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-lg group-hover:scale-110 transition-transform">
                <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
              </div>
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-slate-900 dark:text-white mb-2 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {building.name}
                </h3>
                <p className="text-sm text-slate-600 dark:text-slate-400 line-clamp-2">
                  {building.description || 'No description available'}
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {[1, 2, 3, 4, 5, 6].map((i) => (
        <div key={i} className="animate-pulse">
          <div className="bg-slate-200 dark:bg-slate-700 rounded-lg h-40"></div>
        </div>
      ))}
    </div>
  )
}
