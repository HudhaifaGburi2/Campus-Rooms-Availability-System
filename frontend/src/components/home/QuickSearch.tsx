'use client'

import { useState } from 'react'
import { Search, Calendar, Users, Home } from 'lucide-react'

export function QuickSearch() {
  const [searching, setSearching] = useState(false)
  const [results, setResults] = useState<any[]>([])

  const handleSearch = () => {
    setSearching(true)
    setTimeout(() => {
      setResults([
        { id: '1', roomNumber: 'A-101', building: 'Engineering', floor: 1, type: 'CLASSROOM', capacity: 40, status: 'Available' },
        { id: '2', roomNumber: 'B-205', building: 'Science', floor: 2, type: 'LAB', capacity: 30, status: 'Available' },
      ])
      setSearching(false)
    }, 1000)
  }

  return (
    <div id="quick-search" className="max-w-6xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Quick Room Search</h2>
        <p className="text-slate-600 dark:text-slate-300">Find available rooms instantly</p>
      </div>

      <div className="bg-slate-50 dark:bg-slate-900 rounded-xl p-6 shadow-lg mb-8">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
          <input type="datetime-local" className="px-4 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
          <input type="datetime-local" className="px-4 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
          <select className="px-4 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white">
            <option>All Types</option>
            <option>Classroom</option>
            <option>Lab</option>
          </select>
          <input type="number" placeholder="Min Capacity" className="px-4 py-2 rounded-lg border bg-white dark:bg-slate-800 text-slate-900 dark:text-white" />
        </div>
        <button onClick={handleSearch} className="px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold">
          <Search className="inline h-5 w-5 mr-2" />
          {searching ? 'Searching...' : 'Search Rooms'}
        </button>
      </div>

      {results.length > 0 && (
        <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg overflow-hidden">
          <table className="w-full">
            <thead className="bg-slate-100 dark:bg-slate-900">
              <tr>
                <th className="px-6 py-4 text-left text-sm font-semibold">Room</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Building</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Type</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Capacity</th>
                <th className="px-6 py-4 text-left text-sm font-semibold">Status</th>
              </tr>
            </thead>
            <tbody>
              {results.map((room) => (
                <tr key={room.id} className="border-t dark:border-slate-700">
                  <td className="px-6 py-4">{room.roomNumber}</td>
                  <td className="px-6 py-4">{room.building}</td>
                  <td className="px-6 py-4">{room.type}</td>
                  <td className="px-6 py-4">{room.capacity}</td>
                  <td className="px-6 py-4"><span className="px-3 py-1 bg-green-100 text-green-700 rounded-full text-xs">{room.status}</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
