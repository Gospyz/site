"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Edit, Plus, Save, Trash2, X } from "lucide-react"
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

// Date hardcodate pentru specialități
const initialProducts: Product[] = [
  // Preparate Tradiționale
  {
    id: "1",
    name: "Sarmale în foi de varză",
    price: "28",
    description: "Sarmale tradiționale cu carne de porc și vită, servite cu smântână și mămăligă",
    category: "traditionale",
    image: "/placeholder.svg?height=200&width=300&text=Sarmale"
  },
  {
    id: "2",
    name: "Mici cu muștar",
    price: "22",
    description: "Mici din carne de vită și porc, grătare pe jar, serviți cu muștar și pâine",
    category: "traditionale",
    image: "/placeholder.svg?height=200&width=300&text=Mici"
  },
  {
    id: "3",
    name: "Ciorbă de burtă",
    price: "18",
    description: "Ciorbă tradițională de burtă cu smântână, usturoi și oțet",
    category: "traditionale",
    image: "/placeholder.svg?height=200&width=300&text=Ciorba+Burta"
  },
  
  // Specialitățile Chef-ului
  {
    id: "4",
    name: "File de somon glazurat",
    price: "48",
    description: "File de somon proaspăt cu glazură de miere și ierburi aromate, garnitură de legume",
    category: "chef",
    image: "/placeholder.svg?height=200&width=300&text=Somon"
  },
  {
    id: "5",
    name: "Mușchi de vită Wellington",
    price: "65",
    description: "Mușchi de vită în foietaj cu ciuperci și pate de ficat, sos de vin roșu",
    category: "chef",
    image: "/placeholder.svg?height=200&width=300&text=Wellington"
  },
  {
    id: "6",
    name: "Rack de miel cu ierburi",
    price: "55",
    description: "Coastă de miel marinată în ierburi mediteraneene, garnitură de cartofi gratinați",
    category: "chef",
    image: "/placeholder.svg?height=200&width=300&text=Miel"
  },
  
  // Preparate Internaționale
  {
    id: "7",
    name: "Risotto cu ciuperci porcini",
    price: "32",
    description: "Risotto cremos cu ciuperci porcini, parmezan și trufe",
    category: "internationale",
    image: "/placeholder.svg?height=200&width=300&text=Risotto"
  },
  {
    id: "8",
    name: "Pasta Carbonara",
    price: "26",
    description: "Spaghetti cu bacon, ou, parmezan și piper negru proaspăt măcinat",
    category: "internationale",
    image: "/placeholder.svg?height=200&width=300&text=Carbonara"
  },
  {
    id: "9",
    name: "Paella Valenciana",
    price: "38",
    description: "Paella tradițională cu pui, fructe de mare, legume și șofran",
    category: "internationale",
    image: "/placeholder.svg?height=200&width=300&text=Paella"
  },
  
  // Preparate de Sezon
  {
    id: "10",
    name: "Ciorbă de ciuperci de pădure",
    price: "16",
    description: "Ciorbă de sezon cu ciuperci proaspete de pădure și smântână",
    category: "sezon",
    image: "/placeholder.svg?height=200&width=300&text=Ciorba+Ciuperci"
  },
  {
    id: "11",
    name: "Salată de dovleac copt",
    price: "20",
    description: "Dovleac copt cu brânză de capră, nuci și dressing de miere",
    category: "sezon",
    image: "/placeholder.svg?height=200&width=300&text=Salata+Dovleac"
  },
  {
    id: "12",
    name: "Supă cremă de castane",
    price: "14",
    description: "Supă cremă de castane cu aromă de rozmarin și crutoane",
    category: "sezon",
    image: "/placeholder.svg?height=200&width=300&text=Supa+Castane"
  }
]

export default function MeniuSpecialitati() {
  // State pentru produse
  const [products, setProducts] = useState<Product[]>(initialProducts)
  const [selectedCategory, setSelectedCategory] = useState("toate")
  const [editingProduct, setEditingProduct] = useState<Product | null>(null)
  const [isEditing, setIsEditing] = useState(false)

  // State pentru formular
  const [formData, setFormData] = useState({
    name: "",
    price: "",
    description: "",
    category: "traditionale",
    image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
  })

  // Încărcăm produsele din localStorage la încărcarea paginii
  useEffect(() => {
    const savedProducts = localStorage.getItem("meniuSpecialitatiProducts")
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts))
    } else {
      // Dacă nu există date salvate, folosim datele hardcodate
      setProducts(initialProducts)
    }
  }, [])

  // Salvăm produsele în localStorage când se modifică
  useEffect(() => {
    localStorage.setItem("meniuSpecialitatiProducts", JSON.stringify(products))
  }, [products])

  // Filtrăm produsele în funcție de categoria selectată
  const filteredProducts =
    selectedCategory === "toate" ? products : products.filter((product) => product.category === selectedCategory)

  // Funcție pentru adăugarea unui produs nou
  const handleAddProduct = () => {
    if (!formData.name || !formData.price) {
      alert("Vă rugăm să completați cel puțin numele și prețul produsului!")
      return
    }

    const newProduct: Product = {
      id: Date.now().toString(),
      ...formData,
    }

    setProducts([...products, newProduct])

    // Resetăm formularul
    setFormData({
      name: "",
      price: "",
      description: "",
      category: "traditionale",
      image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
    })
  }

  // Funcție pentru editarea unui produs
  const handleEditProduct = (product: Product) => {
    setEditingProduct(product)
    setIsEditing(true)
  }

  // Funcție pentru salvarea modificărilor
  const handleSaveEdit = () => {
    if (!editingProduct) return

    setProducts(products.map((product) => (product.id === editingProduct.id ? editingProduct : product)))

    setIsEditing(false)
    setEditingProduct(null)
  }

  // Funcție pentru ștergerea unui produs
  const handleDeleteProduct = (id: string) => {
    if (confirm("Sigur doriți să ștergeți acest produs?")) {
      setProducts(products.filter((product) => product.id !== id))
    }
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation */}
      <Navigation />

      {/* Header */}
      <div className="relative h-[200px] w-full">
        <Image src="/traditionalr.jpg?height=200&width=1200&text=Specialitati"
          alt="Specialitățile Casei"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Specialitățile Casei</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4" id="test1">
          <div className="grid grid-cols-1 gap-8" id="test2">
            {/* Formular adăugare/editare */}
            {/*<div className="lg:col-span-1">
              <div className="bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-semibold mb-6 text-amber-800">
                  {isEditing ? "Editare produs" : "Adaugă un produs nou"}
                </h2>

              <div className="space-y-4">
                  <div>
                    <Label htmlFor="name">Nume produs *</Label>
                    <Input
                      id="name"
                      value={isEditing ? editingProduct?.name : formData.name}
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({ ...editingProduct!, name: e.target.value })
                          : setFormData({ ...formData, name: e.target.value })
                      }
                      placeholder="Ex: Platou Tradițional"
                    />
                  </div>

                  <div>
                    <Label htmlFor="category">Categorie *</Label>
                    <Select
                      value={isEditing ? editingProduct?.category : formData.category}
                      onValueChange={(value) =>
                        isEditing
                          ? setEditingProduct({ ...editingProduct!, category: value })
                          : setFormData({ ...formData, category: value })
                      }
                    >
                      <SelectTrigger>
                        <SelectValue placeholder="Selectați o categorie" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="traditionale">Preparate Tradiționale</SelectItem>
                        <SelectItem value="chef">Specialitățile Chef-ului</SelectItem>
                        <SelectItem value="internationale">Preparate Internaționale</SelectItem>
                        <SelectItem value="sezon">Preparate de Sezon</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div>
                    <Label htmlFor="price">Preț (lei) *</Label>
                    <Input
                      id="price"
                      value={isEditing ? editingProduct?.price : formData.price}
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({ ...editingProduct!, price: e.target.value })
                          : setFormData({ ...formData, price: e.target.value })
                      }
                      placeholder="Ex: 75"
                    />
                  </div>

                  <div>
                    <Label htmlFor="description">Descriere</Label>
                    <Textarea
                      id="description"
                      value={isEditing ? editingProduct?.description : formData.description}
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({ ...editingProduct!, description: e.target.value })
                          : setFormData({ ...formData, description: e.target.value })
                      }
                      placeholder="Descriere produs"
                      rows={3}
                    />
                  </div>

                  <div>
                    <Label htmlFor="image">URL Imagine</Label>
                    <Input
                      id="image"
                      value={isEditing ? editingProduct?.image : formData.image}
                      onChange={(e) =>
                        isEditing
                          ? setEditingProduct({ ...editingProduct!, image: e.target.value })
                          : setFormData({ ...formData, image: e.target.value })
                      }
                      placeholder="URL imagine"
                    />
                    <p className="text-xs text-gray-500 mt-1">Lăsați gol pentru a folosi imaginea implicită</p>
                  </div>

                  <div className="flex gap-2 pt-2">
                    {isEditing ? (
                      <>
                        <Button onClick={handleSaveEdit} className="flex-1 bg-amber-700 hover:bg-amber-800">
                          <Save className="mr-2 h-4 w-4" />
                          Salvează
                        </Button>
                        <Button
                          variant="outline"
                          onClick={() => {
                            setIsEditing(false)
                            setEditingProduct(null)
                          }}
                        >
                          <X className="mr-2 h-4 w-4" />
                          Anulează
                        </Button>
                      </>
                    ) : (
                      <Button onClick={handleAddProduct} className="w-full bg-amber-700 hover:bg-amber-800">
                        <Plus className="mr-2 h-4 w-4" />
                        Adaugă Produs
                      </Button>
                    )}
                  </div>
                </div>
              </div>
            </div>*/}

            {/* Lista de produse */}
            <div>
              <Tabs defaultValue="toate" onValueChange={setSelectedCategory}>
                <TabsList className="mb-6 mx-auto">
                  <TabsTrigger value="toate">Toate</TabsTrigger>
                  <TabsTrigger value="traditionale">Tradiționale</TabsTrigger>
                  <TabsTrigger value="chef">Specialități Chef</TabsTrigger>
                  <TabsTrigger value="internationale">Internaționale</TabsTrigger>
                  <TabsTrigger value="sezon">De Sezon</TabsTrigger>
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
                              {product.category === "traditionale"
                                ? "Preparat Tradițional"
                                : product.category === "chef"
                                  ? "Specialitatea Chef-ului"
                                  : product.category === "internationale"
                                    ? "Preparat Internațional"
                                    : "Preparat de Sezon"}
                            </p>
                            {product.description && <p className="text-xs text-gray-700 mb-3 line-clamp-2">{product.description}</p>}
                            <div className="flex gap-2 mt-2">
                              {/*<Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                                <Edit className="mr-1 h-4 w-4" />
                                Editează
                              </Button>
                              <Button
                                variant="outline"
                                size="sm"
                                className="text-red-500 hover:bg-red-50 hover:text-red-600"
                                onClick={() => handleDeleteProduct(product.id)}
                              >
                                <Trash2 className="mr-1 h-4 w-4" />
                                Șterge
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
