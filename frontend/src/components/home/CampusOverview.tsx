'use client'

import { useEffect, useState } from 'react'
import { buildingService } from '@/modules/buildings/services/building.service'
import { IBuilding } from '@/interfaces/building.interface'
import { Building2, Layers, DoorOpen, Filter } from 'lucide-react'
import Link from 'next/link'

export function CampusOverview() {
  const [buildings, setBuildings] = useState<IBuilding[]>([])
  const [loading, setLoading] = useState(true)
  const [filter, setFilter] = useState<'all' | 'available' | 'occupied'>('all')

  useEffect(() => {
    loadBuildings()
  }, [])

  const loadBuildings = async () => {
    try {
      const data = await buildingService.getAll()
      setBuildings(data)
    } catch (err) {
      console.error('Failed to load buildings:', err)
    } finally {
      setLoading(false)
    }
  }

  if (loading) {
    return <LoadingSkeleton />
  }

  return (
    <div id="campus-overview">
      {/* Section Header */}
      <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-8">
        <div>
          <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">
            Campus Overview
          </h2>
          <p className="text-slate-600 dark:text-slate-300">
            Explore all campus buildings and their availability status
          </p>
        </div>

        {/* Filter Panel */}
        <div className="flex gap-2 mt-4 md:mt-0">
          <button
            onClick={() => setFilter('all')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'all'
                ? 'bg-blue-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            All
          </button>
          <button
            onClick={() => setFilter('available')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'available'
                ? 'bg-green-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Available
          </button>
          <button
            onClick={() => setFilter('occupied')}
            className={`px-4 py-2 rounded-lg font-medium transition-colors ${
              filter === 'occupied'
                ? 'bg-red-600 text-white'
                : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
            }`}
          >
            Occupied
          </button>
        </div>
      </div>

      {/* Summary Stats */}
      <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
        <SummaryCard
          icon={<Building2 className="h-6 w-6" />}
          title="Total Buildings"
          value={buildings.length.toString()}
          color="bg-blue-500"
        />
        <SummaryCard
          icon={<Layers className="h-6 w-6" />}
          title="Total Floors"
          value="48"
          color="bg-purple-500"
        />
        <SummaryCard
          icon={<DoorOpen className="h-6 w-6" />}
          title="Total Rooms"
          value="245"
          color="bg-green-500"
        />
        <SummaryCard
          icon={<Filter className="h-6 w-6" />}
          title="Available Now"
          value="187"
          color="bg-yellow-500"
        />
      </div>

      {/* Building Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {buildings.map((building) => (
          <BuildingCard key={building.id} building={building} />
        ))}
      </div>
    </div>
  )
}

function BuildingCard({ building }: { building: IBuilding }) {
  // Mock data for demonstration
  const totalRooms = Math.floor(Math.random() * 50) + 10
  const occupiedRooms = Math.floor(Math.random() * totalRooms)
  const availabilityPercent = Math.round(((totalRooms - occupiedRooms) / totalRooms) * 100)

  return (
    <Link href={`/buildings/${building.id}`}>
      <div className="bg-white dark:bg-slate-800 rounded-xl p-6 shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1 border border-slate-200 dark:border-slate-700">
        {/* Building Header */}
        <div className="flex items-start justify-between mb-4">
          <div className="bg-blue-100 dark:bg-blue-900 p-3 rounded-lg">
            <Building2 className="h-6 w-6 text-blue-600 dark:text-blue-400" />
          </div>
          <div
            className={`px-3 py-1 rounded-full text-xs font-semibold ${
              availabilityPercent > 50
                ? 'bg-green-100 text-green-700 dark:bg-green-900 dark:text-green-300'
                : 'bg-red-100 text-red-700 dark:bg-red-900 dark:text-red-300'
            }`}
          >
            {availabilityPercent}% Free
          </div>
        </div>

        {/* Building Info */}
        <h3 className="text-xl font-bold text-slate-900 dark:text-white mb-2">
          {building.name}
        </h3>
        {building.description && (
          <p className="text-sm text-slate-600 dark:text-slate-400 mb-4 line-clamp-2">
            {building.description}
          </p>
        )}

        {/* Stats */}
        <div className="space-y-2">
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Floors</span>
            <span className="font-semibold text-slate-900 dark:text-white">
              {Math.floor(Math.random() * 5) + 2}
            </span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Total Rooms</span>
            <span className="font-semibold text-slate-900 dark:text-white">{totalRooms}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-slate-600 dark:text-slate-400">Available</span>
            <span className="font-semibold text-green-600 dark:text-green-400">
              {totalRooms - occupiedRooms}
            </span>
          </div>
        </div>

        {/* Availability Bar */}
        <div className="mt-4 h-2 bg-slate-200 dark:bg-slate-700 rounded-full overflow-hidden">
          <div
            className="h-full bg-gradient-to-r from-green-500 to-green-600 transition-all"
            style={{ width: `${availabilityPercent}%` }}
          ></div>
        </div>
      </div>
    </Link>
  )
}

function SummaryCard({
  icon,
  title,
  value,
  color,
}: {
  icon: React.ReactNode
  title: string
  value: string
  color: string
}) {
  return (
    <div className="bg-white dark:bg-slate-800 rounded-lg p-6 shadow-md border border-slate-200 dark:border-slate-700">
      <div className="flex items-center gap-4">
        <div className={`${color} text-white p-3 rounded-lg`}>{icon}</div>
        <div>
          <div className="text-2xl font-bold text-slate-900 dark:text-white">{value}</div>
          <div className="text-sm text-slate-600 dark:text-slate-400">{title}</div>
        </div>
      </div>
    </div>
  )
}

function LoadingSkeleton() {
  return (
    <div className="space-y-6">
      <div className="h-12 bg-slate-200 dark:bg-slate-700 rounded animate-pulse"></div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="h-64 bg-slate-200 dark:bg-slate-700 rounded-xl animate-pulse"></div>
        ))}
      </div>
    </div>
  )
}
