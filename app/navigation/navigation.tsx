"use client"

import Image from "next/image"
import Link from "next/link"
import { ChevronDown } from "lucide-react"
import { useState } from "react"

export default function Navigation() {
    const [menuOpen, setMenuOpen] = useState(false)
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
    return (
        <nav className="bg-black text-white">
            <div className="container mx-auto flex items-center justify-between px-4 py-2 z-999"
                onMouseLeave={() => setMenuOpen(false)}>
                <div className="flex-shrink-0">
                    <Link href="/">
                        <Image src="/logob.png" alt="Restaurant Logo" width={280} height={120} className="h-auto w-39" />
                    </Link>
                </div>

                <div className="hidden md:flex items-center space-x-8">
                    <Link href="/" className="text-amber-100 hover:text-amber-400 transition">
                        Acasa
                    </Link>
                    <div className="relative group">
                        <button
                            className="flex items-center text-amber-100 hover:text-amber-400 transition"
                            onMouseEnter={() => setMenuOpen(true)}
                        >
                            Meniuri <ChevronDown className="ml-1 h-4 w-4" />
                        </button>
                        <div
                            className={`absolute left-0 mt-2 w-56 bg-black shadow-lg rounded-md ${menuOpen ? "block" : "hidden group-hover:block"} z-999`}
                        >
                            <Link
                                href="/meniuri/zilnic"
                                className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-900 hover:text-amber-400"
                            >
                                Meniu Zilnic
                            </Link>
                            <Link
                                href="/meniuri/specialitati"
                                className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-900 hover:text-amber-400"
                            >
                                Specialități
                            </Link>
                            <Link
                                href="/meniuri/bauturi"
                                className="block px-4 py-2 text-sm text-amber-100 hover:bg-amber-900 hover:text-amber-400"
                            >
                                Băuturi
                            </Link>
                        </div>
                    </div>
                    <Link href="/livrari-la-domiciliu" className="text-amber-100 hover:text-amber-400 transition">
                        Livrari la domiciliu
                    </Link>
                    <Link href="/galerie" className="text-amber-100 hover:text-amber-400 transition">
                        Galerie foto
                    </Link>
                    <Link href="/contact" className="text-amber-100 hover:text-amber-400 transition">
                        Contact
                    </Link>
                </div>

                <button 
                    className="md:hidden text-white"
                    onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                >
                    <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-6 w-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                    >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                    </svg>
                </button>
            </div>

            {/* Mobile Menu */}
            {mobileMenuOpen && (
                <div className="md:hidden bg-black border-t border-gray-700">
                    <div className="px-4 py-2 space-y-1">
                        <Link
                            href="/"
                            className="block px-3 py-2 text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Acasa
                        </Link>
                        
                        <div className="px-3 py-2">
                            <div className="text-amber-100 font-medium mb-2">Meniuri</div>
                            <div className="pl-4 space-y-1">
                                <Link
                                    href="/meniuri/zilnic"
                                    className="block px-3 py-2 text-sm text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Meniu Zilnic
                                </Link>
                                <Link
                                    href="/meniuri/specialitati"
                                    className="block px-3 py-2 text-sm text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Specialități
                                </Link>
                                <Link
                                    href="/meniuri/bauturi"
                                    className="block px-3 py-2 text-sm text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                                    onClick={() => setMobileMenuOpen(false)}
                                >
                                    Băuturi
                                </Link>
                            </div>
                        </div>
                        
                        <Link
                            href="/livrari-la-domiciliu"
                            className="block px-3 py-2 text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Livrari la domiciliu
                        </Link>
                        <Link
                            href="/galerie"
                            className="block px-3 py-2 text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Galerie foto
                        </Link>
                        <Link
                            href="/contact"
                            className="block px-3 py-2 text-amber-100 hover:text-amber-400 hover:bg-amber-900 rounded transition"
                            onClick={() => setMobileMenuOpen(false)}
                        >
                            Contact
                        </Link>
                    </div>
                </div>
            )}
        </nav>
    )
}