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
  // Mic Dejun
  {
    id: "1",
    name: "Oua ochiuri (2 bucati)",
    price: "8",
    description: "Oua ochiuri (2 bucati)",
    category: "mic-dejun",
    image: "/Oua-ochiuri.jpg?height=200&width=300&text=Oua+Ochiuri"
  },
  {
    id: "2",
    name: "Omletă simplă",
    price: "12",
    description: "Omletă simplă din 2 ouă",
    category: "mic-dejun",
    image: "/omleta-simpla.jpg?height=200&width=300&text=Omleta+Simpla"
  },
  {
    id: "3",
    name: "Omletă taranească",
    price: "15",
    description: "Omletă taranească din 2 ouă, bacon 50g, ardei gras 50g, ceapă 30g.",
    category: "mic-dejun",
    image: "/omleta-taraneasca.jpg?height=200&width=300&text=Omleta+Taraneasca"
  },
  {
    id: "4",
    name: "Omletă cu cașcaval",
    price: "14",
    description: "Omletă cu cașcaval din 2 ouă si 70g cașcaval.",
    category: "mic-dejun",
    image: "/omleta-cascaval.jpg?height=200&width=300&text=Omleta+Casacaval"
  },
  // Ciorbe
  {
    id: "5",
    name: "Ciorbă de burtă",
    price: "20",
    description: "Ciorbă tradițională de burtă cu smântână, usturoi și oțet",
    category: "ciorbe",
    image: "/ciorba-burta.jpg?height=200&width=300&text=Ciorba+Burta"
  },
  {
    id: "6",
    name: "Ciorbă de vacută",
    price: "20",
    description: "Ciorbă de vacută cu bucatele fragede de carne de vita, zarzavaturi si legume de sezon",
    category: "ciorbe",
    image: "/ciorba-vacuta.jpeg?height=200&width=300&text=Ciorba+Vacuta"
  },
  {
    id: "7",
    name: "Ciorbă de porc taranească",
    price: "18",
    description: "Ciorbă de porc taranească cu legume proaspete și verdeață",
    category: "ciorbe",
    image: "/ciorba-taraneasca.jpg?height=200&width=300&text=Ciorba+Porc+Taraneasca"
  },
  {
    id: "8",
    name: "Ciorbă de perișoare",
    price: "18",
    description: "Ciorbă de perișoare din carne de porc și vită, cu legume proaspete și verdeață",
    category: "ciorbe",
    image: "/Ciorba-perisoare.jpg?height=200&width=300&text=Ciorba+Perisoare"
  },
  {
    id: "9",
    name: "Ciorbă de legume",
    price: "14",
    description: "Ciorbă de legume proaspete, cu zarzavaturi și verdeață",
    category: "ciorbe",
    image: "/ciorba-legume.jpg?height=200&width=300&text=Ciorba+Legume"
  },
  {
    id: "10",
    name: "Ciorbă de afumatura",
    price: "18",
    description: " Ciorba de afumatura acrita cu bors, cu multe legume si leustean aromat.",
    category: "ciorbe",
    image: "/ciorba-afumatura.jpg?height=200&width=300&text=Ciorba+Afumatura"
  },
  {
    id: "11",
    name: "Ciorbă de pui",
    price: "18",
    description: " Ciorba de pui cu legume proaspete si verdeata.",
    category: "ciorbe",
    image: "/ciorba-cu-pui.jpg?height=200&width=300&text=Ciorba+Pui"
  },

  // Grătar
  {
    id: "12",
    name: "Mici 80g (vita/porc)",
    price: "6",
    description: "Mici din carne de vită și porc, preparati pe jar",
    category: "gratar",
    image: "/mititei.jpg?height=200&width=300&text=Mici"
  },
  {
    id: "13",
    name: "Mici 80g (vita/oaie)",
    price: "7",
    description: "Mici din carne de vită și oaie, preparati pe jar",
    category: "gratar",
    image: "/mititei.jpg?height=200&width=300&text=Mici"
  },
  {
    id: "14",
    name: "Carnat semiafumat de porc (1 bucata)",
    price: "8",
    description: "Carnat semiafumat de porc, preparat pe jar",
    category: "gratar",
    image: "/carnati4.jpg?height=200&width=300&text=Carnat+Semiafumat"
  },
  {
    id: "15",
    name: "Ceafa de porc 250g",
    price: "35",
    description: "Ceafa de porc preparata pe jar, cu cartofi prajiti, salata si paine.",
    category: "gratar",
    image: "/ceafa.jpg?height=200&width=300&text=Ceafa+Porc"
  },
  {
    id: "16",
    name: "Pizdulici de porc 250g",
    price: "40",
    description: "Pizdulici de porc, preparate pe jar",
    category: "gratar",
    image: "/pizdulici.jpg?height=200&width=300&text=Pizdulici+Porc"
  },
  {
    id: "17",
    name: "Curelusa de porc 250g",
    price: "32",
    description: "Curelusa de porc, preparata pe jar",
    category: "gratar",
    image: "/curelusa.jpg?height=200&width=300&text=Curelusa+Porc"
  },
  {
    id: "18",
    name: "Fleica de porc 250g",
    price: "30",
    description: "Fleica de porc, preparata pe jar",
    category: "gratar",
    image: "/fleica.jpg?height=200&width=300&text=Fleica+Porc"
  },
  {
    id: "19",
    name: "Piept de pui 250g",
    price: "30",
    description: "Piept de pui, preparat pe jar",
    category: "gratar",
    image: "/piept-pui.jpg?height=200&width=300&text=Piept+Pui"
  },
  {
    id: "20",
    name: "Pulpa de pui dezosata 250g",
    price: "28",
    description: "Pulpa de pui dezosata, preparata pe jar",
    category: "gratar",
    image: "/pulpa-dezosata.jpg?height=200&width=300&text=Pulpa+Pui"
  },
  {
    id: "21",
    name: "Frigarui de pui 120/80g",
    price: "27",
    description: "Frigarui de pui, preparate pe jar",
    category: "gratar",
    image: "/frigarui-de-pui.jpg?height=200&width=300&text=Frigarui+Pui"
  },
  {
    id: "22",
    name: "Pastrama de oaie 300g",
    price: "45",
    description: "Pastrama de oaie, preparata pe jar",
    category: "gratar",
    image: "/pastrama-de-oaie.jpg?height=200&width=300&text=Pastrama+Oaie"
  },
  // Platouri
  {
    id: "23",
    name: "Platou de 2 persoane",
    price: "110",
    description: "Ceafa de porc 200g, piept de pui 150g, carnati semiafumati 150g, mici 160g, cartofi prajiti 300g, muraturi 300g.",
    category: "platouri",
    image: "/platou-2.jpg?height=200&width=300&text=Platou+2+persoane"
  },
  {
    id: "24",
    name: "Platou de 4 persoane",
    price: "210",
    description: "Ceafa de porc 400g, piept de pui 300g, carnati semiafumati 300g, mici 320g, cartofi prajiti 600g, muraturi 400g.",
    category: "platouri",
    image: "/platou-4.jpg?height=200&width=300&text=Platou+4+persoane"
  },

  // Meniuri Speciale
  {
    id: "25",
    name: "Meniu mici",
    price: "28",
    description: "Meniu mici (3 mici, cartofi prajiti 150g, mustar si paine)",
    category: "meniuri-speciale",
    image: "/mici-meniu.jpg?height=200&width=300&text=Meniu+Chef"
  },
  {
    id: "26",
    name: "Meniu carnati afumati",
    price: "28",
    description: "Meniu carnati afumati (2 carnati afumati, cartofi prajiti 150g, salata/mustar si paine)",
    category: "meniuri-speciale",
    image: "/meniu-carnati.jpg?height=200&width=300&text=Meniu+Chef"
  },
  {
    id: "27",
    name: "Meniu ceafa de porc",
    price: "45",
    description: "Meniu ceafa de porc (200g ceafa de porc, cartofi prajiti 150g, salata de varza 150g, paine)",
    category: "meniuri-speciale",
    image: "/meniu-ceafa.jpg?height=200&width=300&text=Meniu+Chef"
  },
  {
    id: "28",
    name: "Meniu piept de pui",
    price: "41",
    description: "Meniu piept de pui (200g piept de pui, cartofi prajiti 150g, salata de varza 150g, paine)",
    category: "meniuri-speciale",
    image: "/meniu-piept.jpg?height=200&width=300&text=Meniu+Chef"
  },
  {
    id: "29",
    name: "Meniu snitel de pui",
    price: "41",
    description: "Meniu snitel de pui (200g snitel de pui, cartofi prajiti 150g, salata de varza 150g, paine)",
    category: "meniuri-speciale",
    image: "/meniu-snitel.jpg?height=200&width=300&text=Meniu+Chef"
  },

  // Sosuri/Diverse
  {
    id: "30",
    name: "Ketchup 50g",
    price: "4",
    description: "Sos de ketchup clasic, 50g",
    category: "sosuri-diverse",
    image: "/ketchup.jpg?height=200&width=300&text=Ketchup"
  },
  {
    id: "31",
    name: "Mustar 50g",
    price: "2",
    description: "Mustar clasic, 50g",
    category: "sosuri-diverse",
    image: "/mustar.jpg?height=200&width=300&text=Sos+Mustar"
  },
  {
    id: "32",
    name: "Smantana 50g",
    price: "4",
    description: "Smântână clasică, 50g",
    category: "sosuri-diverse",
    image: "/Smantana.jpg?height=200&width=300&text=Smantana"
  },
  {
    id: "33",
    name: "Mujdei 50g",
    price: "4",
    description: "Sos de mujdei proaspăt făcut în casă, perfect pentru mici și grătar",
    category: "sosuri-diverse",
    image: "/mujdei.jpg?height=200&width=300&text=Sos+Mujdei"
  },
  {
    id: "34",
    name: "Branza rasa 50g",
    price: "4",
    description: "Brânză rasă, 50g",
    category: "sosuri-diverse",
    image: "/branza-rasa.jpg?height=200&width=300&text=Branza+Rasa"
  },
  {
    id: "35",
    name: "Paine",
    price: "3",
    description: "Pâine proaspătă, 1 felie",
    category: "sosuri-diverse",
    image: "/paine.jpg?height=200&width=300&text=Paine"
  },
  {
    id: "36",
    name: "Paine pe gratar",
    price: "3",
    description: "Pâine proaspătă prăjită pe grătar, 1 felie",
    category: "sosuri-diverse",
    image: "/paine-prajita.jpg?height=200&width=300&text=Paine+pe+gratar"
  },
  {
    id: "37",
    name: "Ardei iute",
    price: "2",
    description: "Ardei iute proaspăt, 1 bucată",
    category: "sosuri-diverse",
    image: "/ardei-iute.jpg?height=200&width=300&text=Ardei+iute"
  },
  // Salate
  {
    id: "38",
    name: "Salată de varză 150g",
    price: "8",
    description: "Salată de varză cu morcov si mărar",
    category: "salate",
    image: "/salata-varza.jpg?height=200&width=300&text=salata+de+varza"
  },
  {
    id: "39",
    name: "Muraturi asortate 150g",
    price: "12",
    description: "Murături asortate, 150g",
    category: "salate",
    image: "/muraturi-asortate.jpg?height=200&width=300&text=Muraturi"
  },
  {
    id: "40",
    name: "Salată de vară 275g",
    price: "15",
    description: "Salată de vară cu roșii 100g, castraveți 100g, ardei gras 45g, ceapă 30g, ulei",
    category: "salate",
    image: "/salata-vara.jpg?height=200&width=300&text=Salată+de+vară"
  },
  // Garnituri
  {
    id: "41",
    name: "Cartofi prăjiți 150g",
    price: "10",
    description: "Cartofi prăjiți crocanți și aurii",
    category: "garnituri",
    image: "/cartofi-prajiti.jpg?height=200&width=300&text=Cartofi"
  },
  {
    id: "42",
    name: "Mamaliga 200g",
    price: "6",
    description: "Mămăligă cremoasă, 200g",
    category: "garnituri",
    image: "/mamaliga.jpg?height=200&width=300&text=Mamaliga"
  },
  {
    id: "43",
    name: "Ciuperci la gratar 250g",
    price: "15",
    description: "Ciuperci gatite la grătar",
    category: "garnituri",
    image: "/ciuperci-la-gratar.jpg?height=200&width=300&text=Ciuperci+la+gratar"
  },
  {
    id: "44",
    name: "Piure de cartofi 200g",
    price: "12",
    description: "Piure de cartofi cremos, 200g",
    category: "garnituri",
    image: "/piure-de-cartofi.jpg?height=200&width=300&text=Piure+de+cartofi"
  },
  // Desert
  {
    id: "45",
    name: "Papanași cu smântână si dulceata 200g",
    price: "18",
    description: "Papanași tradiționali cu smântână și dulceață",
    category: "desert",
    image: "/papanasi.jpg?height=200&width=300&text=Papanasi"
  },
  {
    id: "46",
    name: "Clatite cu gem 200g",
    price: "15",
    description: "Clătite pufoase umplute cu gem de fructe",
    category: "desert",
    image: "/clatite.jpg?height=200&width=300&text=Clatite"
  },
   {
    id: "47",
    name: "Inghetata asortata 200g",
    price: "18",
    description: "Inghetata asortata cu diverse arome",
    category: "desert",
    image: "/inghetata-asortata.jpg?height=200&width=300&text=Inghetata"
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
    category: "mic-dejun",
    image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
  })

  // Încărcăm produsele din localStorage la încărcarea paginii
  useEffect(() => {
    // Forțăm folosirea produselor noi hardcodate (temporar pentru a vedea noile categorii)
    setProducts(initialProducts)
    localStorage.setItem("meniuSpecialitatiProducts", JSON.stringify(initialProducts))

    // Codul original comentat temporar:
    // const savedProducts = localStorage.getItem("meniuSpecialitatiProducts")
    // if (savedProducts) {
    //   setProducts(JSON.parse(savedProducts))
    // } else {
    //   setProducts(initialProducts)
    // }
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
      category: "mic-dejun",
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
                <TabsList className="mb-6 mx-auto flex-wrap h-auto gap-1 p-2">
                  <TabsTrigger value="toate" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Toate</TabsTrigger>
                  <TabsTrigger value="mic-dejun" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Mic Dejun</TabsTrigger>
                  <TabsTrigger value="ciorbe" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Ciorbe</TabsTrigger>
                  <TabsTrigger value="gratar" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Grătar</TabsTrigger>
                  <TabsTrigger value="platouri" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Platouri</TabsTrigger>
                  <TabsTrigger value="meniuri-speciale" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Meniuri Speciale</TabsTrigger>
                  <TabsTrigger value="sosuri-diverse" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Sosuri/Diverse</TabsTrigger>
                  <TabsTrigger value="salate" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Salate</TabsTrigger>
                  <TabsTrigger value="garnituri" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Garnituri</TabsTrigger>
                  <TabsTrigger value="desert" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Desert</TabsTrigger>
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
                              className="object-content"
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
                                : product.category === "ciorbe"
                                  ? "Ciorbe"
                                  : product.category === "gratar"
                                    ? "Grătar"
                                    : product.category === "platouri"
                                      ? "Platouri"
                                      : product.category === "meniuri-speciale"
                                        ? "Meniuri Speciale"
                                        : product.category === "sosuri-diverse"
                                          ? "Sosuri/Diverse"
                                          : product.category === "salate"
                                            ? "Salate"
                                            : product.category === "garnituri"
                                              ? "Garnituri"
                                              : product.category === "desert"
                                                ? "Desert"
                                                : "Altele"}
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
