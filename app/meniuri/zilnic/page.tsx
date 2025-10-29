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

export default function MeniuZilnic() {
  // State pentru produse
  const [products, setProducts] = useState<Product[]>([])
  const [selectedCategory, setSelectedCategory] = useState("toate")

  // Încărcăm produsele din localStorage la încărcarea paginii
  useEffect(() => {
    const savedProducts = localStorage.getItem("meniuZilnicProducts")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
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
          src="/placeholder.svg?height=200&width=1200&text=Meniu+Zilnic"
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
                <TabsTrigger value="ciorbe">Ciorbe și Supe</TabsTrigger>
                <TabsTrigger value="felPrincipal">Fel Principal</TabsTrigger>
                <TabsTrigger value="garnituri">Garnituri</TabsTrigger>
                <TabsTrigger value="desert">Desert</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-0">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 gap-6">
                    {filteredProducts.map((product) => (
                      <Card key={product.id}>
                        <div className="relative aspect-video">
                          <Image
                            src={product.image || "/placeholder.svg?height=200&width=300&text=Preparat"}
                            alt={product.name}
                            fill
                            className="object-cover"
                          />
                        </div>
                        <CardContent className="p-4">
                          <div className="flex justify-between items-start mb-2">
                            <h3 className="text-lg font-semibold">{product.name}</h3>
                            <p className="font-bold text-amber-700">{product.price} lei</p>
                          </div>
                          <p className="text-sm text-gray-500 capitalize mb-2">
                            {product.category === "ciorbe"
                              ? "Ciorbă/Supă"
                              : product.category === "felPrincipal"
                                ? "Fel Principal"
                                : product.category === "garnituri"
                                  ? "Garnitură"
                                  : "Desert"}
                          </p>
                          {product.description && <p className="text-sm text-gray-700 mb-4">{product.description}</p>}
                          <div className="flex gap-2 mt-2">
                            <Button variant="outline" size="sm">
                              Vezi detalii
                            </Button>
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
