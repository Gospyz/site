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

// Date hardcodate pentru băuturi
const initialProducts: Product[] = [
  // Răcoritoare
  {
    id: "1",
    name: "Apă plată 0.5L",
    price: "8",
    description: "Apă plată, 500ml",
    category: "racoritoare",
    image: "/apa-plata.jpg"
  },
  {
    id: "2",
    name: "Apă minerală 0.5L",
    price: "8",
    description: "Apă minerală naturală, 500ml",
    category: "racoritoare",
    image: "/apa-minerala.png"
  },
  {
    id: "3",
    name: "Apă plată 0.75L",
    price: "12",
    description: "Apă plată, 750ml",
    category: "racoritoare",
    image: "/Apa-plata-75.jpg"
  },
  {
    id: "4",
    name: "Apă minerală 0.75L",
    price: "12",
    description: "Apă minerală naturală, 750ml",
    category: "racoritoare",
    image: "/apa-minerala-75.jpg"
  },
  {
    id: "5",
    name: "Coca-Cola / Zero 0.33L",
    price: "12",
    description: "Coca-Cola, 330ml",
    category: "racoritoare",
    image: "/coca-cola.jpg"
  },
  {
    id: "6",
    name: "Fanta 0.33L",
    price: "12",
    description: "Fanta, 330ml",
    category: "racoritoare",
    image: "/fanta.jpg"
  },
  {
    id: "7",
    name: "Sprite 0.33L",
    price: "12",
    description: "Sprite, 330ml",
    category: "racoritoare",
    image: "/sprite.png"
  },
  {
    id: "8",
    name: "Prigat 0.33L",
    price: "13",
    description: "Prigat, 330ml",
    category: "racoritoare",
    image: "/prigat.png"
  },
  {
    id: "9",
    name: "Red Bull 0.25L",
    price: "14",
    description: "Red Bull, 250ml",
    category: "racoritoare",
    image: "/red-bull.jpg"
  },
  {
    id: "10",
    name: "Fuzetea 0.5L",
    price: "15",
    description: "Fuzetea, 500ml",
    category: "racoritoare",
    image: "/fuze-tea.jpg"
  },
  {
    id: "11",
    name: "Schweppes tonic 0.5L",
    price: "15",
    description: "Schweppes tonic, 500ml",
    category: "racoritoare",
    image: "/schewpp.jpg"
  },
  {
    id: "12",
    name: "Schweppes lemon 0.5L",
    price: "15",
    description: "Schweppes lemon, 500ml",
    category: "racoritoare",
    image: "/schw-lemon.jpg"
  },
  {
    id: "13",
    name: "Limonadă naturală 0.5L",
    price: "20",
    description: "Limonadă casei, 500ml",
    category: "racoritoare",
    image: "/limonada.jpg"
  },

  // Cafea
  {
    id: "14",
    name: "Espresso",
    price: "7",
    description: "Cafea italiană tradițională, aromată și intensă",
    category: "cafea",
    image: "/espresso.jpg?height=200&width=300&text=Espresso"
  },
  {
    id: "15",
    name: "Cafea cu lapte",
    price: "8",
    description: "Espresso cu lapte.",
    category: "cafea",
    image: "/cafea-lapte.jpg?height=200&width=300&text=Cafea+cu+lapte"
  },
  {
    id: "16",
    name: "Cappucino",
    price: "10",
    description: "Cafea cu lapte și spumă de lapte si cacao.",
    category: "cafea",
    image: "/cappucino.jpg?height=200&width=300&text=Cappuccino"
  },
  {
    id: "16a",
    name: "Caffe latte",
    price: "12",
    description: "Cafea cu lapte și spumă de lapte.",
    category: "cafea",
    image: "/latte.jpg?height=200&width=300&text=Caffe+Latte"
  },
  {
    id: "17",
    name: "Frappe cu ciocolată",
    price: "18",
    description: "Cafea frappe cu sirop de ciocolată și frișcă",
    category: "cafea",
    image: "/frappe.jpg?height=200&width=300&text=Frappe+cu+ciocolata"
  },
  // Vodka
  {
    id: "18",
    name: "Vodka Stalinskaya",
    price: "16",
    description: "Vodka Stalinskaya, 100ml",
    category: "vodka",
    image: "/stalinskaya.png?height=200&width=300&text=Vodka+Stalinskaya"
  },
  {
    id: "19",
    name: "Vodka Tazovsky",
    price: "14",
    description: "Vodka Tazovsky, 100ml",
    category: "vodka",
    image: "/tazovky.jpg?height=200&width=300&text=Vodka+Tazovsky"
  },
  {
    id: "20",
    name: "Vodka Absolut",
    price: "25",
    description: "Vodka Absolut, 100ml",
    category: "vodka",
    image: "/absolut.jpg?height=200&width=300&text=Vodka+Absolut"
  },
  // Whisky
  {
    id: "21",
    name: "J&B Rare Blended",
    price: "25",
    description: "Whisky italian, 100ml",
    category: "whisky",
    image: "/jb.jpg?height=200&width=300&text=JB+Rare+Blended"
  },
  {
    id: "22",
    name: "Chivas Regal",
    price: "35",
    description: "Whisky scotian  , 100ml",
    category: "whisky",
    image: "/Chivas.png?height=200&width=300&text=Chivas+Regal"
  },
  {
    id: "23",
    name: "Red Label ",
    price: "30",
    description: "Whisky, 100ml",
    category: "whisky",
    image: "/red-label.jpg?height=200&width=300&text=Red+Label"
  },
  {
    id: "23a",
    name: "Jack Daniel's",
    price: "32",
    description: "Whisky american Tennessee, 100ml",
    category: "whisky",
    image: "/jack-daniels.jpg?height=200&width=300&text=Jack+Daniels"
  },
  // Cocktail
  {
    id: "24",
    name: "Aperol Spritz",
    price: "30",
    description: "Aperol, prosecco și apă minerală, 400ml",
    category: "cocktail",
    image: "/aperol-spritz.jpg?height=200&width=300&text=Aperol+Spritz"
  },
  {
    id: "25",
    name: "Cuba Libre",
    price: "25",
    description: "Rom, cola și lime, 300ml",
    category: "cocktail",
    image: "/cuba-libre.png?height=200&width=300&text=Cuba+Libre"
  },
  {
    id: "26",
    name: "Gin Tonic ",
    price: "35",
    description: "Gin, apă tonică și felii de lime, 300ml",
    category: "cocktail",
    image: "/gin-tonic.jpg?height=200&width=300&text=Gin+Tonic"
  },
  {
    id: "27",
    name: "Mojito",
    price: "35",
    description: "Rom, mentă proaspătă, lime și apă minerală, 300ml",
    category: "cocktail",
    image: "/mojito.jpg?height=200&width=300&text=Mojito"
  },
  // Coniac
  {
    id: "28",
    name: "Cavadoro",
    price: "10",
    description: "Coniac francez premium, 100ml",
    category: "coniac",
    image: "/cavadoro.jpg?height=200&width=300&text=Hennessy"
  },
  {
    id: "29",
    name: "Alexandrion",
    price: "14",
    description: "Coniac românesc, 100ml",
    category: "coniac",
    image: "/alexandrion.jpg?height=200&width=300&text=Hennessy"
  },
  {
    id: "30",
    name: "Jidvei Vinars",
    price: "25",
    description: "Coniac românesc, 100ml",
    category: "coniac",
    image: "/jidvei.png?height=200&width=300&text=Hennessy"
  },
  // Diverse
  {
    id: "31",
    name: "Gin Wembley",
    price: "15",
    description: "Gin englezesc, 100ml",
    category: "diverse",
    image: "/wembley.jpg?height=200&width=300&text=Gin+Wembley"
  },
  {
    id: "32",
    name: "Fernet",
    price: "12",
    description: "Fernet, 100ml",
    category: "diverse",
    image: "/fernet.jpg?height=200&width=300&text=Fernet"
  },
  {
    id: "33",
    name: "Tequila Camino",
    price: "10",
    description: "Tequila, 100ml",
    category: "diverse",
    image: "/camino.jpg?height=200&width=300&text=Tequila"
  },
  {
    id: "34",
    name: "Capitan Morgan",
    price: "25",
    description: "Rom spiced, 100ml",
    category: "diverse",
    image: "/morgan.jpg?height=200&width=300&text=Capitan+Morgan"
  },
  {
    id: "35",
    name: "Jagermeister",
    price: "25",
    description: "Rom spiced, 100ml",
    category: "diverse",
    image: "/jagermeister.png?height=200&width=300&text=Jagermeister"
  },
  // Vinuri
  {
    id: "36",
    name: "Vinul Casei Alb/Rose 0,5L",
    price: "20",
    description: "Vin alb sau roze, 500ml",
    category: "vinuri",
    image: "/vin.jpg?height=200&width=300&text=Vinul+Casei"
  },
  {
    id: "37",
    name: "Vinul casei alb/rose 1l",
    price: "40",
    description: "Vin alb sau roze, 1L",
    category: "vinuri",
    image: "/vin.jpg?height=200&width=300&text=Vinul+Casei"
  },
  {
    id: "38",
    name: "Jidvei Riesling 0,75L",
    price: "35",
    description: "Vin alb sec, cu arome de piersici și flori de tei",
    category: "vinuri",
    image: "/Jidvei-Riesling.jpg?height=200&width=300&text=jidvei+riesling"
  },
  {
    id: "39",
    name: "Pelin Urlati Alb/Rose 0,75L",
    price: "3",
    description: "Vin alb sau roze, 0,75L",
    category: "vinuri",
    image: "/pelin.jpg?height=200&width=300&text=Pelin+Urlati"
  },
  {
    id: "40",
    name: "Jidvei fata in iarba 0,75L",
    price: "45",
    description: "Vin roșu sec, corpulent cu arome de fructe negre",
    category: "vinuri",
    image: "/jidvei-fata.jpg?height=200&width=300&text=Jidvei+Fata+in+Iarba"
  },
  {
    id: "41",
    name: "Jidvei Alb Traditional 0,75L",
    price: "35",
    description: "Vin alb sec, cu arome de flori de tei și piersici",
    category: "vinuri",
    image: "/jidvei-alb.jpg?height=200&width=300&text=Jidvei+Alb+Traditional"
  },
  {
    id: "42",
    name: "Feteasca Neagră 0,75L",
    price: "40",
    description: "Vin roșu sec, cu arome de fructe negre și condimente",
    category: "vinuri",
    image: "/feteasca-neagra.png?height=200&width=300&text=Feteasca+Neagra"
  },
  {
    id: "43",
    name: "Castel Huniade Sec/Demi 0,75L",
    price: "45",
    description: "Vin alb sec, cu arome de flori de tei și piersici",
    category: "vinuri",
    image: "/castel-huniade.jpg?height=200&width=300&text=Castel+Huniade"
  },
  {
    id: "44",
    name: "Mateus Rose 0,75L",
    price: "55",
    description: "Vin roze demisec, cu arome de fructe roșii",
    category: "vinuri",
    image: "/mateus.jpg?height=200&width=300&text=Mateus+Rose"
  },
  {
    id: "45",
    name: "Purcari 1827 Alb 0,75L",
    price: "65",
    description: "Vin alb sec, cu arome de flori de tei și piersici",
    category: "vinuri",
    image: "/purcari.jpg?height=200&width=300&text=Purcari+1827+Alb"
  },
  // Bere
  {
    id: "46",
    name: "Bergenbier 0.5L",
    price: "8",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/bergenbier.jpg?height=200&width=300&text=Bergenbier"
  },
  {
    id: "47",
    name: "Beck's 0.5L",
    price: "9",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/beks.jpg?height=200&width=300&text=Beck's"
  },
  {
    id: "48",
    name: "Caraiman 0.5L",
    price: "9",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/caraiman.jpg?height=200&width=300&text=Caraiman"
  },
  {
    id: "49",
    name: "Staropramen 0.5L",
    price: "9",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/Staropramen.jpg?height=200&width=300&text=staropramen"
  },
  {
    id: "50",
    name: "Bere draft 0.5L",
    price: "9",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/halba.jpg?height=200&width=300&text=Bere+draft"
  },
  {
    id: "51",
    name: "Madri 0.5L",
    price: "10",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/madri.jpg?height=200&width=300&text=Madri"
  },
  {
    id: "52",
    name: "Bergenbier 0% 0.5L",
    price: "12",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/bergenbier-0.jpg?height=200&width=300&text=bergenbier+0%"
  },
  {
    id: "53",
    name: "Fresh 0% 0.33L",
    price: "10",
    description: "Bere blondă românească, 330ml",
    category: "bere",
    image: "/fresh.jpg?height=200&width=300&text=fresh+0%"
  },
  {
    id: "54",
    name: "Corona 0.35L",
    price: "15",
    description: "Bere blondă românească, 330ml",
    category: "bere",
    image: "/corona.jpg?height=200&width=300&text=Corona"
  },
  {
    id: "55",
    name: "Stella Artois 0.5L",
    price: "15",
    description: "Bere blondă românească, 500ml",
    category: "bere",
    image: "/stella.png?height=200&width=300&text=Stella+Artois"
  },
]

export default function MeniuBauturi() {
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
    category: "racoritoare",
    image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
  })

  // Încărcăm produsele din localStorage la încărcarea paginii
  useEffect(() => {
    // Forțăm folosirea produselor hardcodate noi
    setProducts(initialProducts)
    // Șterge produsele vechi din localStorage pentru a începe cu datele noi
    localStorage.removeItem("meniuBauturiProducts")
  }, [])

  // Salvăm produsele în localStorage când se modifică
  useEffect(() => {
    localStorage.setItem("meniuBauturiProducts", JSON.stringify(products))
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
      category: "vinuri",
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
        <Image
          src="/bauturi.png?height=20&width=1200&text=Bauturi"
          alt="Băuturi"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl font-bold text-white drop-shadow-lg">Băuturi</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-8">
            {/* Formular adăugare/editare
            <div className="lg:col-span-1">
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
                      placeholder="Ex: Fetească Neagră"
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
                        <SelectItem value="racoritoare">Răcoritoare</SelectItem>
                        <SelectItem value="cafea">Cafea</SelectItem>
                        <SelectItem value="vodka">Vodka</SelectItem>
                        <SelectItem value="whisky">Whisky</SelectItem>
                        <SelectItem value="cocktail">Cocktail</SelectItem>
                        <SelectItem value="coniac">Coniac</SelectItem>
                        <SelectItem value="diverse">Diverse</SelectItem>
                        <SelectItem value="vinuri">Vinuri</SelectItem>
                        <SelectItem value="bere">Bere</SelectItem>
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
                      placeholder="Ex: 90"
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
            <Tabs defaultValue="toate" onValueChange={setSelectedCategory}>
              <TabsList className="mb-6 mx-auto flex-wrap h-auto gap-1 p-2">
                <TabsTrigger value="toate" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Toate</TabsTrigger>
                <TabsTrigger value="racoritoare" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Răcoritoare</TabsTrigger>
                <TabsTrigger value="cafea" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Cafea</TabsTrigger>
                <TabsTrigger value="vodka" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Vodka</TabsTrigger>
                <TabsTrigger value="whisky" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Whisky</TabsTrigger>
                <TabsTrigger value="cocktail" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Cocktail</TabsTrigger>
                <TabsTrigger value="coniac" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Coniac</TabsTrigger>
                <TabsTrigger value="diverse" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Diverse</TabsTrigger>
                <TabsTrigger value="vinuri" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Vinuri</TabsTrigger>
                <TabsTrigger value="bere" className="text-xs sm:text-sm px-2 py-1 sm:px-3 sm:py-2">Bere</TabsTrigger>
              </TabsList>

              <TabsContent value={selectedCategory} className="mt-0">
                {filteredProducts.length > 0 ? (
                  <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
                    {filteredProducts.map((product) => (
                      <Card key={product.id} className="h-full">
                        <div className="relative aspect-video">
                          <Image
                            src={product.image || "/placeholder.svg?height=200&width=300&text=Bautura"}
                            alt={product.name}
                            fill
                            className="object-contain"
                          />
                        </div>
                        <CardContent className="p-3">
                          <div className="flex justify-between items-start mb-1">
                            <h3 className="text-base font-semibold">{product.name}</h3>
                            <p className="font-bold text-amber-700 text-sm">{product.price} lei</p>
                          </div>
                          <p className="text-xs text-gray-500 capitalize mb-2">
                            {product.category === "racoritoare"
                              ? "Răcoritoare"
                              : product.category === "cafea"
                                ? "Cafea"
                                : product.category === "vodka"
                                  ? "Vodka"
                                  : product.category === "whisky"
                                    ? "Whisky"
                                    : product.category === "cocktail"
                                      ? "Cocktail"
                                      : product.category === "coniac"
                                        ? "Coniac"
                                        : product.category === "diverse"
                                          ? "Diverse"
                                          : product.category === "vinuri"
                                            ? "Vinuri"
                                            : product.category === "bere"
                                              ? "Bere"
                                              : "Altele"}
                          </p>
                          {product.description && <p className="text-xs text-gray-700 mb-3 line-clamp-2">{product.description}</p>}
                          <div className="flex gap-2 mt-2">
                            {/*} <Button variant="outline" size="sm" onClick={() => handleEditProduct(product)}>
                              <Edit className="mr-1 h-4 w-4" />
                              Editează
                            </Button>*/}
                            {/*<Button
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
