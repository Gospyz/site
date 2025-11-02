import type React from "react"
import "./globals.css"
import type { Metadata } from "next"
import { Inter } from "next/font/google"
import { ThemeProvider } from "@/components/theme-provider"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NODE_ENV === 'production' 
    ? 'https://www.restaurantminish.ro' 
    : 'http://localhost:3000'),
  title: "Restaurant Minish",
  description:
    "Restaurant tradițional cu preparate autentice, organizare de evenimente și servicii de livrare la domiciliu.",
  icons: {
    icon: "/favicon.ico",
    //shortcut: "/favicon-16x16.png",
    //apple: "/apple-touch-icon.png",
  },
  openGraph: {
    title: "Restaurant Minish",
    description: "Restaurant tradițional cu preparate autentice, organizare de evenimente și servicii de livrare la domiciliu.",
    url: "https://www.restaurantminish.ro", // Înlocuiește cu domeniul tău real
    siteName: "Restaurant Minish",
    images: [
      {
        url: "/hero.jpg", // Imaginea pentru preview
        width: 1200,
        height: 630,
        alt: "Restaurant Minish - Preparate tradiționale",
      },
    ],
    locale: "ro_RO",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Restaurant Minish",
    description: "Restaurant tradițional cu preparate autentice, organizare de evenimente și servicii de livrare la domiciliu.",
    images: ["/hero.jpg"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ro">
      <body className={inter.className}>
        <ThemeProvider attribute="class" defaultTheme="light" enableSystem>
          {children}
        </ThemeProvider>
      </body>
    </html>
  )
}
