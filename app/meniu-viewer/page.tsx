"use client"

import { useState } from "react"

export default function MeniuViewer() {
  const [isLoading, setIsLoading] = useState(true)

  return (
    <div className="min-h-screen bg-gray-100">
      {/* Header simplu */}
      <div className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4">
          <h1 className="text-2xl font-bold text-amber-800">Meniul Nostru</h1>
          <div className="flex gap-4 mt-2">
            <a 
              href="/meniu.pdf" 
              download
              className="text-amber-600 hover:text-amber-700 underline text-sm"
            >
              Descarcă PDF
            </a>
            <a 
              href="/" 
              className="text-gray-600 hover:text-gray-700 underline text-sm"
            >
              Înapoi la site
            </a>
          </div>
        </div>
      </div>

      {/* PDF Viewer */}
      <div className="container mx-auto px-4 py-6">
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-amber-600 mr-3"></div>
            <span className="text-gray-600">Se încarcă meniul...</span>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          <iframe
            src="/meniu.pdf#toolbar=1&navpanes=0&scrollbar=1"
            width="100%"
            height="800"
            className="border-0"
            onLoad={() => setIsLoading(false)}
            onError={() => setIsLoading(false)}
            title="Meniul restaurantului"
          />
        </div>

        {/* Fallback pentru cazul în care PDF-ul nu se încarcă */}
        <div className="mt-4 text-center text-gray-500">
          <p className="text-sm">
            Nu vezi meniul? 
            <a 
              href="/meniu.pdf" 
              target="_blank"
              className="text-amber-600 hover:text-amber-700 underline ml-1"
            >
              Deschide în tab nou
            </a>
          </p>
        </div>
      </div>
    </div>
  )
}