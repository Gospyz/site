import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import Navigation from "../navigation/navigation"

// Datele pentru galeria foto
const galleryImages = [
  {
    id: 1,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Interior restaurant",
    category: "interior",
  },
  {
    id: 2,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Preparate culinare",
    category: "preparate",
  },
  {
    id: 3,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Evenimente speciale",
    category: "evenimente",
  },
  {
    id: 4,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Interior restaurant",
    category: "interior",
  },
  {
    id: 5,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Preparate culinare",
    category: "preparate",
  },
  {
    id: 6,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Evenimente speciale",
    category: "evenimente",
  },
  {
    id: 7,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Interior restaurant",
    category: "interior",
  },
  {
    id: 8,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Preparate culinare",
    category: "preparate",
  },
  {
    id: 9,
    src: "/placeholder.svg?height=400&width=600",
    alt: "Evenimente speciale",
    category: "evenimente",
  },
]

export default function GalerieFoto() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation - Simplified for this page */}
      <Navigation />


      {/* Gallery Header */}
      <div className="relative h-[300px] w-full">
        <Image
          src="/placeholder.svg?height=300&width=1200&text=Galerie+Foto"
          alt="Galerie Foto Header"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Galerie Foto</h1>
        </div>
      </div>

      {/* Gallery Filters */}
      <section className="py-8 bg-amber-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-wrap justify-center gap-4">
            <Button variant="outline" className="bg-amber-700 text-white hover:bg-amber-800">
              Toate
            </Button>
            <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-100">
              Interior
            </Button>
            <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-100">
              Preparate
            </Button>
            <Button variant="outline" className="border-amber-700 text-amber-700 hover:bg-amber-100">
              Evenimente
            </Button>
          </div>
        </div>
      </section>

      {/* Gallery Grid */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
            {galleryImages.map((image) => (
              <div key={image.id} className="group relative overflow-hidden rounded-lg shadow-md h-64">
                <Image
                  src={image.src || "/placeholder.svg"}
                  alt={image.alt}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-110"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
                  <Button className="bg-amber-700 hover:bg-amber-800">Vezi imaginea</Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Upload Section */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4 max-w-2xl">
          <h2 className="text-2xl font-semibold mb-6 text-amber-800 text-center">Adaugă Imagini Noi</h2>

          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="mb-6">
              <label htmlFor="image-upload" className="block text-sm font-medium text-gray-700 mb-2">
                Selectează imagini
              </label>
              <div className="mt-1 flex justify-center px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                <div className="space-y-1 text-center">
                  <svg
                    className="mx-auto h-12 w-12 text-gray-400"
                    stroke="currentColor"
                    fill="none"
                    viewBox="0 0 48 48"
                    aria-hidden="true"
                  >
                    <path
                      d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                      strokeWidth={2}
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                  <div className="flex text-sm text-gray-600">
                    <label
                      htmlFor="file-upload"
                      className="relative cursor-pointer bg-white rounded-md font-medium text-amber-700 hover:text-amber-800"
                    >
                      <span>Încarcă fișiere</span>
                      <input id="file-upload" name="file-upload" type="file" className="sr-only" multiple />
                    </label>
                    <p className="pl-1">sau trage și plasează</p>
                  </div>
                  <p className="text-xs text-gray-500">PNG, JPG, GIF până la 10MB</p>
                </div>
              </div>
            </div>

            <div className="mb-6">
              <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
                Categorie
              </label>
              <select
                id="category"
                name="category"
                className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-amber-700 focus:border-amber-700 sm:text-sm rounded-md"
              >
                <option value="interior">Interior</option>
                <option value="preparate">Preparate</option>
                <option value="evenimente">Evenimente</option>
              </select>
            </div>

            <div className="mb-6">
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
                Descriere (opțional)
              </label>
              <textarea
                id="description"
                name="description"
                rows={3}
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm py-2 px-3 focus:outline-none focus:ring-amber-700 focus:border-amber-700 sm:text-sm"
                placeholder="Adaugă o scurtă descriere a imaginii"
              ></textarea>
            </div>

            <div className="flex justify-end">
              <Button className="bg-amber-700 hover:bg-amber-800">Încarcă Imagini</Button>
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
