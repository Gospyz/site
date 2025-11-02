import Image from "next/image"
import Navigation from "../../navigation/navigation"

export default function MeniuZilnic() {

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
          <div className="max-w-2xl mx-auto text-center">
            <div className="bg-white p-8 rounded-lg shadow-lg border-2 border-amber-200">
              <h2 className="text-2xl font-bold text-amber-800 mb-6">Meniul Zilei</h2>
              
              <div className="space-y-4">
                <p className="text-lg text-gray-700">
                  Meniul zilei conține <strong>ciorbă + fel principal</strong>
                </p>
                
                <p className="text-gray-600">
                  (De luni până vineri, mâncare diversificată)
                </p>
                
                <div className="mt-6 p-4 bg-amber-50 rounded-lg border border-amber-200">
                  <p className="text-3xl font-bold text-amber-800">28 lei</p>
                </div>
                
                <div className="mt-6 text-sm text-gray-500">
                  <p>Pentru informații despre meniul zilei, vă rugăm să ne contactați.</p>
                </div>

                <div className="mt-8">
                  <a 
                    href="https://restaurantminish.ro/meniu" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="inline-block bg-amber-700 hover:bg-amber-800 text-white font-semibold py-3 px-6 rounded-lg shadow-lg transition-colors duration-200 text-center"
                  >
                    Dacă dorești să vizualizezi meniul - apasă aici
                  </a>
                </div>
              </div>
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
