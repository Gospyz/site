import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function Meniuri() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation */}
      <nav className="bg-black text-white py-4">
        <div className="container mx-auto px-4 flex justify-between">
          <Link href="/" className="text-2xl font-bold text-amber-400">
            Restaurant
          </Link>
          <Link href="/" className="text-amber-100 hover:text-amber-400 transition">
            Înapoi la pagina principală
          </Link>
        </div>
      </nav>

      {/* Header */}
      <div className="relative h-[300px] w-full">
        <Image src="/menu-header.jpg" alt="Meniurile Noastre" fill className="object-cover brightness-75" />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Meniurile Noastre</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-amber-800">Alegeți categoria de meniu</h2>
            <p className="text-lg text-gray-700">
              Explorați varietatea noastră de meniuri, de la preparate zilnice la specialitățile casei și băuturi
              rafinate.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Meniu+Zilnic"
                  alt="Meniu Zilnic"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Meniu Zilnic</h3>
              <p className="text-gray-700 mb-4">
                Preparate tradiționale românești și internaționale, pregătite zilnic din ingrediente proaspete.
              </p>
              <Link href="/meniuri/zilnic">
                <Button className="bg-amber-700 hover:bg-amber-800">Vezi meniul zilnic</Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Specialitati"
                  alt="Specialități"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Specialitățile Casei</h3>
              <p className="text-gray-700 mb-4">
                Preparate deosebite, create după rețete unice, care reprezintă mândria bucătarilor noștri.
              </p>
              <Link href="/meniuri/specialitati">
                <Button className="bg-amber-700 hover:bg-amber-800">Vezi specialitățile</Button>
              </Link>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <div className="relative h-48 mb-4 rounded-md overflow-hidden">
                <Image
                  src="/placeholder.svg?height=300&width=400&text=Bauturi"
                  alt="Băuturi"
                  fill
                  className="object-cover"
                />
              </div>
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Băuturi</h3>
              <p className="text-gray-700 mb-4">
                O selecție variată de vinuri, băuturi răcoritoare, cafea și ceaiuri pentru orice preferință.
              </p>
              <Link href="/meniuri/bauturi">
                <Button className="bg-amber-700 hover:bg-amber-800">Vezi băuturile</Button>
              </Link>
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
