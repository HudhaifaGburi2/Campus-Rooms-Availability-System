'use client'

import { useState } from 'react'
import { Upload, FileJson, FileText, CheckCircle, AlertCircle } from 'lucide-react'

export function DataUploadSection() {
  const [uploading, setUploading] = useState(false)
  const [uploadResult, setUploadResult] = useState<{ success: boolean; message: string } | null>(null)

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    if (!file) return

    setUploading(true)
    // Mock upload
    setTimeout(() => {
      setUploadResult({ success: true, message: `Successfully uploaded ${file.name}` })
      setUploading(false)
    }, 2000)
  }

  return (
    <div id="upload" className="max-w-4xl mx-auto">
      <div className="text-center mb-8">
        <h2 className="text-3xl font-bold text-slate-900 dark:text-white mb-2">Data Upload</h2>
        <p className="text-slate-600 dark:text-slate-300">Upload building, room, or schedule data (JSON/CSV)</p>
      </div>

      <div className="bg-white dark:bg-slate-800 rounded-xl shadow-lg p-8">
        <div className="border-2 border-dashed border-slate-300 dark:border-slate-600 rounded-lg p-12 text-center hover:border-blue-500 transition-colors">
          <Upload className="h-16 w-16 mx-auto mb-4 text-slate-400" />
          <h3 className="text-xl font-semibold text-slate-900 dark:text-white mb-2">Drag & Drop Files Here</h3>
          <p className="text-slate-600 dark:text-slate-400 mb-4">or click to browse</p>
          <input
            type="file"
            accept=".json,.csv"
            onChange={handleFileUpload}
            className="hidden"
            id="file-upload"
          />
          <label
            htmlFor="file-upload"
            className="inline-flex items-center px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg font-semibold cursor-pointer transition-colors"
          >
            <Upload className="h-5 w-5 mr-2" />
            Select File
          </label>
        </div>

        {uploading && (
          <div className="mt-6 text-center">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-4 border-blue-600 border-t-transparent"></div>
            <p className="mt-2 text-slate-600 dark:text-slate-400">Uploading...</p>
          </div>
        )}

        {uploadResult && (
          <div className={`mt-6 p-4 rounded-lg ${uploadResult.success ? 'bg-green-100 dark:bg-green-900' : 'bg-red-100 dark:bg-red-900'}`}>
            <div className="flex items-center gap-3">
              {uploadResult.success ? (
                <CheckCircle className="h-6 w-6 text-green-600 dark:text-green-400" />
              ) : (
                <AlertCircle className="h-6 w-6 text-red-600 dark:text-red-400" />
              )}
              <p className={uploadResult.success ? 'text-green-800 dark:text-green-200' : 'text-red-800 dark:text-red-200'}>
                {uploadResult.message}
              </p>
            </div>
          </div>
        )}

        <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-4">
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <FileJson className="h-6 w-6 text-blue-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">JSON Format</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Upload building and room data in JSON format</p>
            </div>
          </div>
          <div className="flex items-start gap-3 p-4 bg-slate-50 dark:bg-slate-900 rounded-lg">
            <FileText className="h-6 w-6 text-green-600 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-slate-900 dark:text-white mb-1">CSV Format</h4>
              <p className="text-sm text-slate-600 dark:text-slate-400">Upload room and schedule data in CSV format</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
