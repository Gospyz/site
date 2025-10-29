"use client"

import { useState } from "react"
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
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { toast } from "@/components/ui/use-toast"

// Adaugă importul pentru RichTextEditor
import { RichTextEditor } from "@/components/admin/rich-text-editor"

// Simulare date pagini
const mockPages = [
  { id: 1, title: "Acasă", slug: "acasa", content: "Conținutul paginii principale", status: "published" },
  { id: 2, title: "Despre Noi", slug: "despre-noi", content: "Informații despre restaurant", status: "published" },
  { id: 3, title: "Meniuri", slug: "meniuri", content: "Lista de meniuri disponibile", status: "published" },
  { id: 4, title: "Galerie", slug: "galerie", content: "Galerie de imagini", status: "published" },
  {
    id: 5,
    title: "Livrări la Domiciliu",
    slug: "livrari-la-domiciliu",
    content: "Informații despre livrări",
    status: "published",
  },
  { id: 6, title: "Contact", slug: "contact", content: "Detalii de contact", status: "published" },
]

export function PageManager() {
  const router = useRouter()
  const [pages, setPages] = useState(mockPages)
  const [selectedTab, setSelectedTab] = useState("toate")
  const [editingPage, setEditingPage] = useState<(typeof mockPages)[0] | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setIsSaving] = useState(false)
  const [newPage, setNewPage] = useState({
    title: "",
    slug: "",
    content: "",
  })

  const filteredPages = selectedTab === "toate" ? pages : pages.filter((page) => page.status === selectedTab)

  const handleEditPage = (page: (typeof mockPages)[0]) => {
    setEditingPage(page)
    setIsEditing(true)
  }

  const handleSavePage = async () => {
    if (!editingPage) return

    setIsSaving(true)

    // Simulare salvare - în producție, aici ar trebui să faceți un API call
    setTimeout(() => {
      setPages(pages.map((page) => (page.id === editingPage.id ? editingPage : page)))
      setIsSaving(false)
      setIsEditing(false)
      setEditingPage(null)

      toast({
        title: "Succes!",
        description: "Pagina a fost actualizată cu succes.",
      })

      router.refresh()
    }, 1000)
  }

  const handleCreatePage = async () => {
    if (!newPage.title || !newPage.slug) {
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
      const newPageWithId = {
        id: pages.length + 1,
        ...newPage,
        status: "published",
      }

      setPages([...pages, newPageWithId])
      setIsSaving(false)
      setNewPage({
        title: "",
        slug: "",
        content: "",
      })

      toast({
        title: "Succes!",
        description: "Pagina a fost creată cu succes.",
      })

      router.refresh()
    }, 1000)
  }

  const handleDeletePage = (id: number) => {
    setPages(pages.filter((page) => page.id !== id))
    toast({
      title: "Pagină ștearsă",
      description: "Pagina a fost ștearsă cu succes.",
    })
  }

  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight">Gestionare Pagini</h1>
          <p className="text-gray-500">Editați conținutul paginilor site-ului.</p>
        </div>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="bg-amber-700 hover:bg-amber-800">
              <Plus className="mr-2 h-4 w-4" />
              Pagină Nouă
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Creează o pagină nouă</DialogTitle>
              <DialogDescription>Completați detaliile pentru a crea o pagină nouă pe site.</DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="title">Titlu pagină *</Label>
                <Input
                  id="title"
                  value={newPage.title}
                  onChange={(e) => setNewPage({ ...newPage, title: e.target.value })}
                  placeholder="Ex: Despre Noi"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="slug">Slug *</Label>
                <Input
                  id="slug"
                  value={newPage.slug}
                  onChange={(e) => setNewPage({ ...newPage, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })}
                  placeholder="Ex: despre-noi"
                />
                <p className="text-xs text-gray-500">
                  URL-ul paginii va fi: https://restaurant.ro/{newPage.slug || "slug-pagina"}
                </p>
              </div>
              <div className="grid gap-2">
                <Label htmlFor="content">Conținut</Label>
                <RichTextEditor
                  value={newPage.content}
                  onChange={(value) => setNewPage({ ...newPage, content: value })}
                />
              </div>
            </div>
            <DialogFooter>
              <Button
                variant="outline"
                onClick={() => {
                  setNewPage({
                    title: "",
                    slug: "",
                    content: "",
                  })
                }}
              >
                Anulează
              </Button>
              <Button onClick={handleCreatePage} className="bg-amber-700 hover:bg-amber-800" disabled={isSaving}>
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se salvează...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Creează Pagina
                  </>
                )}
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue="toate" onValueChange={setSelectedTab}>
        <TabsList className="mb-4">
          <TabsTrigger value="toate">Toate</TabsTrigger>
          <TabsTrigger value="published">Publicate</TabsTrigger>
          <TabsTrigger value="draft">Ciorne</TabsTrigger>
        </TabsList>

        <TabsContent value={selectedTab} className="mt-0">
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {filteredPages.map((page) => (
              <Card key={page.id}>
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">{page.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-500">/{page.slug}</p>
                  <p className="mt-2 line-clamp-3 text-sm">{page.content.substring(0, 100)}...</p>
                </CardContent>
                <CardFooter className="flex justify-between">
                  <Button variant="outline" size="sm" onClick={() => handleEditPage(page)}>
                    <Edit className="mr-2 h-4 w-4" />
                    Editează
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    className="text-red-500 hover:bg-red-50 hover:text-red-600"
                    onClick={() => handleDeletePage(page.id)}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Șterge
                  </Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          {filteredPages.length === 0 && (
            <div className="flex h-[200px] flex-col items-center justify-center rounded-lg border border-dashed p-8 text-center">
              <p className="text-sm text-gray-500">Nu există pagini în această categorie.</p>
              <Dialog>
                <DialogTrigger asChild>
                  <Button variant="outline" className="mt-4">
                    <Plus className="mr-2 h-4 w-4" />
                    Creează prima pagină
                  </Button>
                </DialogTrigger>
                <DialogContent>{/* Conținut dialog */}</DialogContent>
              </Dialog>
            </div>
          )}
        </TabsContent>
      </Tabs>

      {/* Dialog pentru editarea paginii */}
      <Dialog
        open={isEditing}
        onOpenChange={(open) => {
          if (!open) setIsEditing(false)
        }}
      >
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>Editează pagina</DialogTitle>
            <DialogDescription>Modificați conținutul paginii și apăsați Salvează pentru a actualiza.</DialogDescription>
          </DialogHeader>
          {editingPage && (
            <div className="grid gap-4 py-4">
              <div className="grid gap-2">
                <Label htmlFor="edit-title">Titlu pagină</Label>
                <Input
                  id="edit-title"
                  value={editingPage.title}
                  onChange={(e) => setEditingPage({ ...editingPage, title: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-slug">Slug</Label>
                <Input
                  id="edit-slug"
                  value={editingPage.slug}
                  onChange={(e) =>
                    setEditingPage({ ...editingPage, slug: e.target.value.toLowerCase().replace(/\s+/g, "-") })
                  }
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="edit-content">Conținut</Label>
                <RichTextEditor
                  value={editingPage.content}
                  onChange={(value) => setEditingPage({ ...editingPage, content: value })}
                />
              </div>
            </div>
          )}
          <DialogFooter>
            <Button variant="outline" onClick={() => setIsEditing(false)}>
              Anulează
            </Button>
            <Button onClick={handleSavePage} className="bg-amber-700 hover:bg-amber-800" disabled={isSaving}>
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
