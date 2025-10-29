"use client"

import type React from "react"

import { useState } from "react"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { Loader2, Plus, Trash2, Upload } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
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

// Simulare date imagini
const mockImages = [
  {
    id: 1,
    name: "Hero Restaurant",
    category: "hero",
    url: "/placeholder.svg?height=300&width=500&text=Hero+Restaurant",
  },
  { id: 2, name: "Meniu Special", category: "meniu", url: "/placeholder.svg?height=300&width=500&text=Meniu+Special" },
  {
    id: 3,
    name: "Interior Restaurant",
    category: "galerie",
    url: "/placeholder.svg?height=300&width=500&text=Interior",
  },
  { id: 4, name: "Preparat 1", category: "preparate", url: "/placeholder.svg?height=300&width=500&text=Preparat+1" },
  { id: 5, name: "Preparat 2", category: "preparate", url: "/placeholder.svg?height=300&width=500&text=Preparat+2" },
  {
    id: 6,
    name: "Eveniment Corporate",
    category: "evenimente",
    url: "/placeholder.svg?height=300&width=500&text=Eveniment",
  },
]

export function ImageManager() {
  const router = useRouter()
  const [images, setImages] = useState(mockImages)
  const [selectedCategory, setSelectedCategory] = useState("toate")
  const [isUploading, setIsUploading] = useState(false)
  const [uploadData, setUploadData] = useState({
    name: "",
    category: "galerie",
    description: "",
    file: null as File | null,
  })
  const [previewUrl, setPreviewUrl] = useState<string | null>(null)

  const filteredImages =
    selectedCategory === "toate" ? images : images.filter((img) => img.category === selectedCategory)

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null
    setUploadData({ ...uploadData, file })

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

  const handleUpload = async () => {
    if (!uploadData.file || !uploadData.name) {
      toast({
        title: "Eroare",
        description: "Vă rugăm să completați toate câmpurile obligatorii și să selectați o imagine.",
        variant: "destructive",
      })
      return
    }

    setIsUploading(true)

    // Simulare upload - în producție, aici ar trebui să faceți upload-ul real
    setTimeout(() => {
      const newImage = {
        id: images.length + 1,
        name: uploadData.name,
        category: uploadData.category,
        url: previewUrl || "/placeholder.svg?height=300&width=500&text=Imagine+Nouă",
      }

      setImages([...images, newImage])
      setIsUploading(false)
      setUploadData({
        name: "",
        category: "galerie",
        description: "",
        file: null,
      })
      setPreviewUrl(null)

      toast({
        title: "Succes!",
        description: "Imaginea a fost încărcată cu succes.",
      })

      router.refresh()
    }, 1500)
  }

  const handleDelete = (id: number) => {
    setImages(images.filter((img) => img.id !== id))
    toast({
      title: "Imagine ștearsă",
      description: "Imaginea a fost ștearsă cu succes.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestionare Imagini</h1>
          <p className="text-gray-500">Încărcați și gestionați imaginile site-ului.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-amber-700 hover:bg-amber-800">
              <Plus className="mr-2 h-4 w-4" />
              Încarcă Imagine
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[500px]">
            <DialogHeader>
              <DialogTitle>Încarcă o imagine nouă</DialogTitle>
              <DialogDescription>
                Completați detaliile și selectați fișierul pentru a încărca o imagine nouă.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="name">Nume imagine *</Label>
                <Input
                  id="name"
                  value={uploadData.name}
                  onChange={(e) => setUploadData({ ...uploadData, name: e.target.value })}
                  placeholder="Ex: Hero Restaurant"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="category">Categorie *</Label>
                <Select
                  value={uploadData.category}
                  onValueChange={(value) => setUploadData({ ...uploadData, category: value })}
                >
                  <SelectTrigger>
                    <SelectValue placeholder="Selectați o categorie" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hero">Hero</SelectItem>
                    <SelectItem value="galerie">Galerie</SelectItem>
                    <SelectItem value="meniu">Meniu</SelectItem>
                    <SelectItem value="preparate">Preparate</SelectItem>
                    <SelectItem value="evenimente">Evenimente</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="description">Descriere</Label>
                <Textarea
                  id="description"
                  value={uploadData.description}
                  onChange={(e) => setUploadData({ ...uploadData, description: e.target.value })}
                  placeholder="Descriere opțională a imaginii"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="image">Imagine *</Label>
                <div className="flex items-center gap-4">
                  <Input id="image" type="file" accept="image/*" onChange={handleFileChange} className="flex-1" />
                </div>
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
                  setUploadData({
                    name: "",
                    category: "galerie",
                    description: "",
                    file: null,
                  })
                  setPreviewUrl(null)
                }}
              >
                Anulează
              </Button>
              <Button onClick={handleUpload} className="bg-amber-700 hover:bg-amber-800" disabled={isUploading}>
                {isUploading ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se încarcă...
                  </>
                ) : (
                  <>
                    <Upload className="mr-2 h-4 w-4" />
                    Încarcă
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
          <TabsTrigger value="hero">Hero</TabsTrigger>
          <TabsTrigger value="galerie">Galerie</TabsTrigger>
          <TabsTrigger value="meniu">Meniu</TabsTrigger>
          <TabsTrigger value="preparate">Preparate</TabsTrigger>
          <TabsTrigger value="evenimente">Evenimente</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedCategory} className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredImages.map((image) => (
              <Card key={image.id} className="overflow-hidden">
                <div className="relative aspect-video">
                  <Image src={image.url || "/placeholder.svg"} alt={image.name} fill className="object-cover" />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-medium">{image.name}</h3>
                      <p className="text-sm text-gray-500 capitalize">{image.category}</p>
                    </div>
                    <Button
                      variant="outline"
                      size="icon"
                      className="text-red-500 hover:bg-red-50 hover:text-red-600"
                      onClick={() => handleDelete(image.id)}
                    >
                      <Trash2 className="h-4 w-4" />
                      <span className="sr-only">Șterge</span>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          {filteredImages.length === 0 && (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-gray-500">Nu există imagini în această categorie.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Încarcă prima imagine
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Conținut dialog */}</DialogContent>
              </Dialog>
            </div>
          )}
        </TabsContent>
      </Tabs>
    </div>
  )
}
