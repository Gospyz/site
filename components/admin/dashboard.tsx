"use client"

import type React from "react"

import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import {
  LayoutDashboard,
  ImageIcon,
  FileText,
  MenuIcon,
  Settings,
  LogOut,
  ChevronDown,
  ChevronRight,
} from "lucide-react"

import { cn } from "@/lib/utils"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card"
import { Separator } from "@/components/ui/separator"

interface NavItemProps {
  href: string
  icon: React.ReactNode
  title: string
  isActive?: boolean
  isExpanded?: boolean
  children?: React.ReactNode
  onClick?: () => void
}

function NavItem({ href, icon, title, isActive, isExpanded, children, onClick }: NavItemProps) {
  const [expanded, setExpanded] = useState(isExpanded)
  const hasChildren = Boolean(children)

  const handleClick = () => {
    if (hasChildren) {
      setExpanded(!expanded)
    }
    if (onClick) {
      onClick()
    }
  }

  return (
    <div className="flex flex-col">
      <Link
        href={hasChildren ? "#" : href}
        onClick={handleClick}
        className={cn(
          "flex items-center gap-3 rounded-lg px-3 py-2 transition-all",
          isActive ? "bg-amber-100 text-amber-900" : "text-gray-500 hover:bg-amber-50 hover:text-amber-900",
        )}
      >
        {icon}
        <span className="flex-1">{title}</span>
        {hasChildren && (expanded ? <ChevronDown className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />)}
      </Link>
      {hasChildren && expanded && <div className="ml-6 mt-1 space-y-1">{children}</div>}
    </div>
  )
}

export default function AdminDashboard() {
  const pathname = usePathname()
  const router = useRouter()

  const handleLogout = () => {
    // Ștergem flag-ul de autentificare din localStorage
    localStorage.removeItem("isAdminLoggedIn")
    router.push("/admin/login")
  }

  return (
    <div className="flex min-h-screen w-full flex-col">
      <header className="sticky top-0 z-10 flex h-16 items-center gap-4 border-b bg-white px-6">
        <Link href="/admin" className="flex items-center gap-2 font-semibold">
          <span className="text-amber-700">Restaurant Admin</span>
        </Link>
        <div className="ml-auto flex items-center gap-4">
          <Button variant="outline" size="sm" onClick={handleLogout}>
            <LogOut className="mr-2 h-4 w-4" />
            Deconectare
          </Button>
        </div>
      </header>
      <div className="flex flex-1">
        <aside className="w-64 border-r bg-gray-50/40">
          <nav className="flex flex-col gap-1 p-4">
            <NavItem
              href="/admin"
              icon={<LayoutDashboard className="h-5 w-5" />}
              title="Dashboard"
              isActive={pathname === "/admin"}
            />
            <NavItem
              href="/admin/imagini"
              icon={<ImageIcon className="h-5 w-5" />}
              title="Imagini"
              isActive={pathname === "/admin/imagini"}
            />
            <NavItem
              href="/admin/pagini"
              icon={<FileText className="h-5 w-5" />}
              title="Pagini"
              isActive={pathname === "/admin/pagini"}
            />
            <NavItem
              href="/admin/meniuri"
              icon={<MenuIcon className="h-5 w-5" />}
              title="Meniuri"
              isActive={pathname === "/admin/meniuri"}
            />
            <Separator className="my-2" />
            <NavItem
              href="/admin/setari"
              icon={<Settings className="h-5 w-5" />}
              title="Setări"
              isActive={pathname === "/admin/setari"}
            />
          </nav>
        </aside>
        <main className="flex-1 overflow-auto p-6">
          {pathname === "/admin" && (
            <div className="grid gap-6">
              <div>
                <h1 className="text-3xl font-bold tracking-tight">Dashboard</h1>
                <p className="text-gray-500">Bine ați venit în panoul de administrare al restaurantului.</p>
              </div>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Imagini</CardTitle>
                    <CardDescription>Gestionați imaginile site-ului</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">24</div>
                    <p className="text-xs text-gray-500">imagini încărcate</p>
                    <Button asChild className="mt-4 w-full" variant="outline">
                      <Link href="/admin/imagini">Gestionare Imagini</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Pagini</CardTitle>
                    <CardDescription>Editați conținutul paginilor</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">6</div>
                    <p className="text-xs text-gray-500">pagini active</p>
                    <Button asChild className="mt-4 w-full" variant="outline">
                      <Link href="/admin/pagini">Gestionare Pagini</Link>
                    </Button>
                  </CardContent>
                </Card>
                <Card>
                  <CardHeader className="pb-2">
                    <CardTitle className="text-lg">Meniuri</CardTitle>
                    <CardDescription>Actualizați meniurile restaurantului</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="text-3xl font-bold">3</div>
                    <p className="text-xs text-gray-500">categorii de meniu</p>
                    <Button asChild className="mt-4 w-full" variant="outline">
                      <Link href="/admin/meniuri">Gestionare Meniuri</Link>
                    </Button>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          {pathname !== "/admin" && <div>{/* Conținutul specific fiecărei pagini va fi afișat aici */}</div>}
        </main>
      </div>
    </div>
  )
}
