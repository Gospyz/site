"use client"

import { useEffect } from "react"

export default function MeniuPage() {
  useEffect(() => {
    // Redirect direct către PDF-ul de meniu
    // Înlocuiește "meniu.pdf" cu numele real al fișierului tău PDF
    window.location.href = "/meniu.pdf"
  }, [])

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-amber-600 mx-auto mb-4"></div>
        <p className="text-gray-600">Se încarcă meniul...</p>
        <p className="text-sm text-gray-500 mt-2">
          Dacă nu ești redirecționat automat, 
          <a 
            href="/meniu.pdf" 
            className="text-amber-600 hover:text-amber-700 underline ml-1"
          >
            apasă aici
          </a>
        </p>
      </div>
    </div>
  )
}