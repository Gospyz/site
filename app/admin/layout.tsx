"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter, usePathname } from "next/navigation"

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const router = useRouter()
  const pathname = usePathname()
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    // Verificăm dacă utilizatorul este autentificat
    const isLoggedIn = localStorage.getItem("isAdminLoggedIn") === "true"
    setIsAuthenticated(isLoggedIn)
    setIsLoading(false)

    // Dacă nu este autentificat și nu se află deja pe pagina de login, redirecționăm
    if (!isLoggedIn && pathname !== "/admin/login") {
      router.push("/admin/login")
    }
  }, [pathname, router])

  // Afișăm un loading state în timp ce verificăm autentificarea
  if (isLoading) {
    return <div className="flex min-h-screen items-center justify-center">Se încarcă...</div>
  }

  // Dacă utilizatorul nu este autentificat și nu se află pe pagina de login, nu afișăm nimic
  if (!isAuthenticated && pathname !== "/admin/login") {
    return null
  }

  // Afișăm conținutul pentru utilizatorii autentificați sau pagina de login
  return <div className="min-h-screen flex">{children}</div>
}
