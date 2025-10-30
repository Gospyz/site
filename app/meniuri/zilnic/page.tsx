"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import Navigation from "../../navigation/navigation"

// Tipuri pentru produse
type Product = {
  id: string
  name: string
  price: string
  description: string
  category: string
  image: string
}

// Date hardcodate pentru meniul zilnic
const initialProducts: Product[] = [
  // Mic dejun
  {
    id: "1",
    name: "Omletă cu jambon și cașcaval",
    price: "16",
    description: "Omletă din 3 ouă cu jambon afumat și cașcaval, servită cu roșii cherry",
    category: "mic-dejun",
    image: "/placeholder.svg?height=200&width=300&text=Omleta"
  },
  {
    id: "2",
    name: "Clătite cu dulceață",
    price: "14",
    description: "Clătite pufoase cu dulceață de căpșuni și frișcă",
    category: "mic-dejun",
    image: "/placeholder.svg?height=200&width=300&text=Clatite"
  },
  {
    id: "3",
    name: "Toast cu avocado",
    price: "18",
    description: "Pâine prăjită cu avocado, ou poșat și semințe de susan",
    category: "mic-dejun",
    image: "/placeholder.svg?height=200&width=300&text=Toast+Avocado"
  },
  
  // Prânz
  {
    id: "4",
    name: "Ciorbă de legume",
    price: "12",
    description: "Ciorbă de legume proaspete cu smântână și mărar",
    category: "pranz",
    image: "/placeholder.svg?height=200&width=300&text=Ciorba+Legume"
  },
  {
    id: "5",
    name: "Schnizel cu piure",
    price: "24",
    description: "Schnizel de pui pane cu piure de cartofi și salată de varză",
    category: "pranz",
    image: "/placeholder.svg?height=200&width=300&text=Schnizel"
  },
  {
    id: "6",
    name: "Paste cu sos bolognese",
    price: "22",
    description: "Paste italiene cu sos bolognese și parmezan proaspăt ras",
    category: "pranz",
    image: "/placeholder.svg?height=200&width=300&text=Bolognese"
  },
  
  // Cină
  {
    id: "7",
    name: "Somon la grătar",
    price: "35",
    description: "File de somon la grătar cu legume și sos de lămâie",
    category: "cina",
    image: "/placeholder.svg?height=200&width=300&text=Somon+Gratar"
  },
  {
    id: "8",
    name: "Mușchi de porc la tigaie",
    price: "28",
    description: "Mușchi de porc cu ciuperci și sos de smântână, garnitură la alegere",
    category: "cina",
    image: "/placeholder.svg?height=200&width=300&text=Muschi+Porc"
  },
  {
    id: "9",
    name: "Salată Caesar",
    price: "20",
    description: "Salată Caesar cu pui la grătar, parmezan și crutoane",
    category: "cina",
    image: "/placeholder.svg?height=200&width=300&text=Caesar"
  },
  
  // Desert
  {
    id: "10",
    name: "Tiramisu",
    price: "16",
    description: "Desert italian clasic cu mascarpone și cafea",
    category: "desert",
    image: "/placeholder.svg?height=200&width=300&text=Tiramisu"
  },
  {
    id: "11",
    name: "Papanași cu smântână",
    price: "14",
    description: "Papanași tradiționali cu smântână și dulceață de afine",
    category: "desert",
    image: "/placeholder.svg?height=200&width=300&text=Papanasi"
  },
  {
    id: "12",
    name: "Înghețată artizanală",
    price: "12",
    description: "3 bile de înghețată artizanală - vanilie, ciocolată și căpșuni",
    category: "desert",
    image: "/placeholder.svg?height=200&width=300&text=Inghetata"
  }
]

export default function MeniuZilnic() {
  // State pentru produse
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState("toate")

  // Încărcăm produsele din localStorage la încărcarea paginii
  useEffect(() => {
    const savedProducts = localStorage.getItem("meniuZilnicProducts")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Dacă nu există date salvate, folosim datele hardcodate
      setProducts(initialProducts)
    }
  }, [])

  // Salvăm produsele în localStorage când se modifică
  useEffect(() => {
    localStorage.setItem("meniuZilnicProducts", JSON.stringify(products))
  }, [products])

  // Filtrăm produsele în funcție de categoria selectată
  const filteredProducts =
    selectedCategory === "toate" ? products : products.filter((product) => product.category === selectedCategory)

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation */}
      <Navigation />


      {/* Header */}
      <div className="relative h-[200px] w-full">
        <Image
          src="/meniuz.jpg?height=200&width=1200&text=Meniu+Zilnic"
          alt="Meniu Zilnic"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Meniu Zilnic</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">

            {/* Lista de produse */}
            <Tabs defaultValue="toate" onValueChange={setSelectedCategory}>
              <TabsList className="mb-6 mx-auto">
                <TabsTrigger value="toate">Toate</TabsTrigger>
                <TabsTrigger value="mic-dejun">Mic Dejun</TabsTrigger>
                <TabsTrigger value="pranz">Prânz</TabsTrigger>
                <TabsTrigger value="cina">Cină</TabsTrigger>
                <TabsTrigger value="desert">Desert</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-0">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="h-full">
                        <div className="relative aspect-video">
                          <Image
                            src={product.image || "/placeholder.svg?height=200&width=300&text=Preparat"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-semibold">{product.name}</h3>
                            <p className="font-bold text-amber-700 text-sm">{product.price} lei</p>
                          </div>
                          <p className="text-xs text-gray-500 capitalize mb-2">
                            {product.category === "mic-dejun"
                              ? "Mic Dejun"
                              : product.category === "pranz"
                                ? "Prânz"
                                : product.category === "cina"
                                  ? "Cină"
                                  : "Desert"}
                          </p>
                          {product.description && <p className="text-xs text-gray-700 mb-3 line-clamp-2">{product.description}</p>}
                          <div className="flex gap-2 mt-2">
                            {/*<Button variant="outline" size="sm">
                              Vezi detalii
                            </Button>*/}
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                ) : (
                  <div className="text-center py-12 bg-gray-50 rounded-lg border border-dashed">
                    <p className="text-gray-500 mb-4">Nu există produse în această categorie.</p>
                    <p className="text-sm text-gray-400">
                      Folosiți formularul din stânga pentru a adăuga produse noi.
                    </p>
                  </div>
                )}
              </TabsContent>
            </Tabs>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-6 mt-auto">
        <div className="container mx-auto px-4 text-center">
          <p className="text-sm text-gray-400">© {new Date().getFullYear()} Restaurant. Toate drepturile rezervate.</p>
        </div>
      </footer>
    </main>
  )
}
