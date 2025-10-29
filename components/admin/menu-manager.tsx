"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Edit, Loader2, Plus, Save, Trash2 } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { toast } from "@/components/ui/use-toast"

// Simulare date meniuri
const mockMenuItems = [
  {
    id: 1,
    name: "Ciorbă de văcuță",
    category: "ciorbe",
    price: "25",
    description: "Ciorbă tradițională cu carne de vită și legume proaspete",
    image: "/placeholder.svg?height=200&width=300&text=Ciorba+de+vacuta",
  },
  {
    id: 2,
    name: "Sarmale cu mămăliguță",
    category: "principale",
    price: "35",
    description: "Sarmale tradiționale învelite în foi de varză, servite cu mămăliguță și smântână",
    image: "/placeholder.svg?height=200&width=300&text=Sarmale",
  },
  {
    id: 3,
    name: "Papanași",
    category: "desert",
    price: "25",
    description: "Papanași cu smântână și dulceață de afine",
    image: "/placeholder.svg?height=200&width=300&text=Papanasi",
  },
  {
    id: 4,
    name: "Platou tradițional",
    category: "aperitive",
    price: "75",
    description: "Selecție de mezeluri, brânzeturi și murături tradiționale",
    image: "/placeholder.svg?height=200&width=300&text=Platou",
  },
]

export function MenuManager() {
  const router = useRouter()
  const [menuItems, setMenuItems] = useState(mockMenuItems)
  const [selectedCategory, setSelectedCategory] = useState("toate")
  const [editingItem, setEditingItem] = useState<(typeof mockMenuItems)[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [newItem, setNewItem] = useState({
    name: "",
    category: "principale",
    price: "",
    description: "",
    image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const filteredItems =
    selectedCategory === "toate" ? menuItems : menuItems.filter((item) => item.category === selectedCategory)

  const handleEditItem = (item: (typeof mockMenuItems)[0]) => {
    setEditingItem(item)
    setIsEditing(true)
  }

  const handleSaveItem = async () => {
    if (!editingItem) return

    setIsSaving(true)

    // Simulare salvare - în producție, aici ar trebui să faceți un API call
    setTimeout(() => {
      setMenuItems(menuItems.map((item) => (item.id === editingItem.id ? editingItem : item)))

      // Actualizare în localStorage pentru meniul zilnic dacă categoria este zilnic
      if (editingItem.category === "zilnic") {
        const savedProducts = localStorage.getItem("meniuZilnicProducts")
        if (savedProducts) {
          const meniuZilnicProducts = JSON.parse(savedProducts)
          const updatedProducts = meniuZilnicProducts.map((product: any) =>
            product.id === editingItem.id.toString()
              ? {
                  ...product,
                  name: editingItem.name,
                  price: editingItem.price,
                  description: editingItem.description,
                  image: previewUrl || editingItem.image,
                }
              : product,
          )
          localStorage.setItem("meniuZilnicProducts", JSON.stringify(updatedProducts))
        }
      }

      setIsSaving(false)
      setIsEditing(false)
      setEditingItem(null)

      toast({
        title: "Succes!",
        description: "Preparatul a fost actualizat cu succes.",
      })

      router.refresh()
    }, 1000)
  }

  const handleCreateItem = async () => {
    if (!newItem.name || !newItem.price) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să completați toate câmpurile obligatorii.",
        variant: "destructive",
      })
      return
    }

    setIsSaving(true)

    // Simulare creare - în producție, aici ar trebui să faceți un API call
    setTimeout(() => {
      const newItemWithId = {
        id: menuItems.length + 1,
        ...newItem,
        image: previewUrl || newItem.image,
      }

      setMenuItems([...menuItems, newItemWithId])

      // Salvare în localStorage pentru meniul zilnic dacă categoria este zilnic
      if (newItem.category === "zilnic") {
        const savedProducts = localStorage.getItem("meniuZilnicProducts")
        const meniuZilnicProducts = savedProducts ? JSON.parse(savedProducts) : []
        const newZilnicProduct = {
          id: Date.now().toString(),
          name: newItem.name,
          price: newItem.price,
          description: newItem.description,
          category: newItem.category === "zilnic" ? "felPrincipal" : newItem.category,
          image: previewUrl || newItem.image,
        }
        localStorage.setItem("meniuZilnicProducts", JSON.stringify([...meniuZilnicProducts, newZilnicProduct]))
      }

      setIsSaving(false)
      setNewItem({
        name: "",
        category: "principale",
        price: "",
        description: "",
        image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
      })
      setPreviewUrl(null)

      toast({
        title: "Succes!",
        description: "Preparatul a fost adăugat cu succes.",
      })

      router.refresh()
    }, 1000)
  }

  const handleDeleteItem = (id: number) => {
    const itemToDelete = menuItems.find((item) => item.id === id)

    setMenuItems(menuItems.filter((item) => item.id !== id))

    // Ștergere din localStorage pentru meniul zilnic dacă categoria este zilnic
    if (itemToDelete && itemToDelete.category === "zilnic") {
      const savedProducts = localStorage.getItem("meniuZilnicProducts")
      if (savedProducts) {
        const meniuZilnicProducts = JSON.parse(savedProducts)
        const updatedProducts = meniuZilnicProducts.filter((product: any) => product.id !== id.toString())
        localStorage.setItem("meniuZilnicProducts", JSON.stringify(updatedProducts))
      }
    }

    toast({
      title: "Preparat șters",
      description: "Preparatul a fost șters cu succes.",
    })
  }

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null

    if (file) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setPreviewUrl(reader.result as string)
      }
      reader.readAsDataURL(file)
    } else {
      setPreviewUrl(null)
    }
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestionare Meniuri</h1>
          <p className="text-gray-500">Adăugați și editați preparatele din meniu.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-amber-700 hover:bg-amber-800">
              <Plus className="mr-2 h-4 w-4" />
              Adaugă Preparat
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Adaugă un preparat nou</DialogTitle>
              <DialogDescription>Completați detaliile pentru a adăuga un preparat nou în meniu.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nume preparat *</Label>
                <Input
                  id="name"
                  value={newItem.name}
                  onChange={(e) => setNewItem({ ...newItem, name: e.target.value })}
                  placeholder="Ex: Ciorbă de văcuță"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categorie *</Label>
                <Select value={newItem.category} onValueChange={(value) => setNewItem({ ...newItem, category: value })}>
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați o categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aperitive">Aperitive</SelectItem>
                    <SelectItem value="ciorbe">Ciorbe și Supe</SelectItem>
                    <SelectItem value="principale">Feluri Principale</SelectItem>
                    <SelectItem value="desert">Deserturi</SelectItem>
                    <SelectItem value="bauturi">Băuturi</SelectItem>
                    <SelectItem value="zilnic">Meniu Zilnic</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="price">Preț (lei) *</Label>
                <Input
                  id="price"
                  value={newItem.price}
                  onChange={(e) => setNewItem({ ...newItem, price: e.target.value })}
                  placeholder="Ex: 25"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={newItem.description}
                  onChange={(e) => setNewItem({ ...newItem, description: e.target.value })}
                  placeholder="Descriere preparat"
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Imagine</Label>
                <Input id="image" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              {previewUrl && (
                <div className="mt-2">
                  <p className="mb-2 text-sm font-medium">Previzualizare:</p>
                  <div className="relative h-40 w-full overflow-hidden rounded-md border">
                    <Image src={previewUrl || "/placeholder.svg"} alt="Preview" fill className="object-contain" />
                  </div>
                </div>
              )}
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setNewItem({
                    name: "",
                    category: "principale",
                    price: "",
                    description: "",
                    image: "/placeholder.svg?height=200&width=300&text=Nou+Preparat",
                  })
                  setPreviewUrl(null)
                }}
              >
                Anulează
              </Button>
              <Button onClick={handleCreateItem} className="bg-amber-700 hover:bg-amber-800" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se salvează...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Adaugă
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="toate" onValueChange={setSelectedCategory}>
        <TabsList className="mb-4">
          <TabsTrigger value="toate">Toate</TabsTrigger>
          <TabsTrigger value="aperitive">Aperitive</TabsTrigger>
          <TabsTrigger value="ciorbe">Ciorbe și Supe</TabsTrigger>
          <TabsTrigger value="principale">Feluri Principale</TabsTrigger>
          <TabsTrigger value="desert">Deserturi</TabsTrigger>
          <TabsTrigger value="bauturi">Băuturi</TabsTrigger>
          <TabsTrigger value="zilnic">Meniu Zilnic</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredItems.map((item) => (
              <Card key={item.id}>
                <div className="relative aspect-video">
                  <Image src={item.image || "/placeholder.svg"} alt={item.name} fill className="object-cover" />
                </div>
                <CardHeader className="pb-2">
                  <div className="flex items-center justify-between">
                    <CardTitle className="text-lg">{item.name}</CardTitle>
                    <p className="font-bold text-amber-700">{item.price} lei</p>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500 capitalize">{item.category}</p>
                  <p className="mt-2 line-clamp-3 text-sm">{item.description}</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditItem(item)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editează
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDeleteItem(item.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Șterge
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredItems.length === 0 && (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-gray-500">Nu există preparate în această categorie.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Adaugă primul preparat
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Conținut dialog */}</DialogContent>
              </Dialog>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog pentru editarea preparatului */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => {
          if (!open) setIsEditing(false)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editează preparatul</DialogTitle>
            <DialogDescription>
              Modificați detaliile preparatului și apăsați Salvează pentru a actualiza.
            </DialogDescription>
          </DialogHeader>
          {editingItem && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-name">Nume preparat</Label>
                <Input
                  id="edit-name"
                  value={editingItem.name}
                  onChange={(e) => setEditingItem({ ...editingItem, name: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-category">Categorie</Label>
                <Select
                  value={editingItem.category}
                  onValueChange={(value) => setEditingItem({ ...editingItem, category: value })}
                >
                  <SelectTrigger id="edit-category">
                    <SelectValue placeholder="Selectați o categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="aperitive">Aperitive</SelectItem>
                    <SelectItem value="ciorbe">Ciorbe și Supe</SelectItem>
                    <SelectItem value="principale">Feluri Principale</SelectItem>
                    <SelectItem value="desert">Deserturi</SelectItem>
                    <SelectItem value="bauturi">Băuturi</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-price">Preț (lei)</Label>
                <Input
                  id="edit-price"
                  value={editingItem.price}
                  onChange={(e) => setEditingItem({ ...editingItem, price: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-description">Descriere</Label>
                <Textarea
                  id="edit-description"
                  value={editingItem.description}
                  onChange={(e) => setEditingItem({ ...editingItem, description: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-image">Imagine</Label>
                <Input id="edit-image" type="file" accept="image/*" onChange={handleFileChange} />
              </div>
              <div className="mt-2">
                <p className="mb-2 text-sm font-medium">Imagine curentă:</p>
                <div className="relative h-40 w-full overflow-hidden rounded-md border">
                  <Image src={previewUrl || editingItem.image} alt={editingItem.name} fill className="object-contain" />
                </div>
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Anulează
            </Button>
            <Button onClick={handleSaveItem} className="bg-amber-700 hover:bg-amber-800" disabled={isSaving}>
              {isSaving ? (
                <>
                  <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  Se salvează...
                </>
              ) : (
                <>
                  <Save className="mr-2 h-4 w-4" />
                  Salvează
                </>
              )}
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  )
}
