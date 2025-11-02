"use client"

import Image from "next/image"
import Link from "next/link"
import Navigation from "./navigation/navigation"
import { useState, useEffect } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"

// Imagini pentru carusel
const heroImages = [
  {
    id: 1,
    src: "/home1.jpg",
    alt: "Restaurant Ambiance",
    title: "Experiență Culinară Autentică",
    subtitle: "Descoperă gusturile tradiționale într-un cadru modern"
  },
  {
    id: 2,
    src: "/locatie1.jpg",
    alt: "Terasa Restaurant",
    title: "Terasa cu Vedere Splendidă",
    subtitle: "Bucură-te de preparatele noastre în aer liber"
  },
  {
    id: 3,
    src: "/preparate.jpg",
    alt: "Preparate Speciale",
    title: "Preparate Tradiționale",
    subtitle: "Rețete transmise din generație în generație"
  },
  {
    id: 4,
    src: "/bauturi.png",
    alt: "Băuturi Selecte",
    title: "Băuturi Fine și Cocktailuri",
    subtitle: "O selecție rafinată pentru fiecare gust"
  }
]

export default function Home() {
  const [currentSlide, setCurrentSlide] = useState(0)

  // Auto-play functionality
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length)
    }, 5000) // Schimbă imaginea la fiecare 5 secunde

    return () => clearInterval(timer)
  }, [])

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % heroImages.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + heroImages.length) % heroImages.length)
  }

  const goToSlide = (index: number) => {
    setCurrentSlide(index)
  }

  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation */}
      <Navigation />


      {/* Hero Carousel Section */}
      <div className="relative h-[500px] w-full overflow-hidden bg-gray-200">
        {/* Images */}
        <div className="relative h-full w-full">
          {heroImages.map((image, index) => (
            <div
              key={image.id}
              className={`absolute inset-0 w-full h-full transition-opacity duration-1000 ease-in-out ${
                index === currentSlide ? 'opacity-100 z-10' : 'opacity-0 z-0'
              }`}
            >
              <Image
                src={image.src}
                alt={image.alt}
                fill
                priority={index === 0}
                className="object-cover"
                sizes="100vw"
                onError={(e) => {
                  console.log(`Failed to load image: ${image.src}`)
                }}
                onLoad={() => {
                  console.log(`Loaded image: ${image.src}`)
                }}
              />
              
              {/* Text overlay cu background doar pe text */}
              <div className="absolute inset-0 flex items-center justify-center text-center text-white z-30 px-4">
                <div className="max-w-3xl px-4 py-6 sm:px-6 sm:py-8 bg-black bg-opacity-50 rounded-lg backdrop-blur-sm">
                  <h1 className="text-2xl sm:text-4xl md:text-6xl font-bold mb-4 drop-shadow-lg">
                    {image.title}
                  </h1>
                  <p className="text-sm sm:text-lg md:text-xl drop-shadow-lg">
                    {image.subtitle}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Navigation Arrows */}
        <button
          onClick={prevSlide}
          className="absolute left-2 sm:left-4 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-40 border-2 border-white"
        >
          <ChevronLeft className="h-4 w-4 sm:h-6 sm:w-6 stroke-2" />
        </button>
        
        <button
          onClick={nextSlide}
          className="absolute right-2 sm:right-4 top-1/2 transform -translate-y-1/2 bg-amber-600 hover:bg-amber-700 text-white p-2 sm:p-3 rounded-full shadow-lg transition-all duration-200 z-40 border-2 border-white"
        >
          <ChevronRight className="h-4 w-4 sm:h-6 sm:w-6 stroke-2" />
        </button>

        {/* Dots Indicator */}
        <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2 z-40">
          {heroImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-3 h-3 rounded-full transition-all duration-200 ${
                index === currentSlide 
                  ? 'bg-amber-400 scale-125' 
                  : 'bg-white bg-opacity-50 hover:bg-opacity-75'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12 text-center">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 tracking-wider">RESTAURANT - EVENIMENTE - LIVRARI</h1>

          <div className="max-w-3xl mx-auto space-y-6 text-gray-700">
            <p className="text-lg">
              Restaurant Minish – locul unde tradiția culinară se întâlnește cu modernitatea într-un cadru primitor
              și relaxant. Cu un restaurant elegant, terasa generoasă și un meniu diversificat, restaurantul nostru
              este locul unde te poți bucura de o experiență culinară autentică.
            </p>

            <p className="text-lg">
              Organizăm petreceri private, parastase si botezuri, oferind servicii personalizate.
            </p>

            <p className="text-lg">
              Vă oferim servicii de livrare la domiciliu în sectoarele X, pentru a vă aduce savoarea
              preparatelor, direct în confortul casei voastre. Vă invităm să ne vizitați și să vă bucurați de servicii
              la standarde de calitate Premium!
            </p>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-12 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Restaurant</h3>
              <p className="text-gray-700">
                Bucurați-vă de preparate tradiționale și internaționale într-un ambient elegant și primitor.
              </p>
              {/*<Link
                href="/restaurant"
                className="inline-block mt-4 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
              >
                Află mai multe
              </Link>*/}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Evenimente</h3>
              <p className="text-gray-700">
                Organizăm petreceri private, parastase si botezuri, oferind servicii personalizate.
              </p>
             {/*} <Link
                href="/evenimente"
                className="inline-block mt-4 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
              >
                Află mai multe
              </Link> */}
            </div>

            <div className="bg-white p-6 rounded-lg shadow-md text-center">
              <h3 className="text-xl font-semibold mb-4 text-amber-800">Livrări</h3>
              <p className="text-gray-700">
                Comandă preparatele tale preferate direct la tine acasă, rapid și în condiții optime.
              </p>
              {/*<Link
                href="/livrari-la-domiciliu"
                className="inline-block mt-4 px-4 py-2 bg-amber-700 text-white rounded hover:bg-amber-800 transition"
              >
                Află mai multe
              </Link> */}
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-400">Contact</h4>
              <p className="mb-2">Adresă: <a href="https://www.google.com/maps/place/Restaurant+Minish/@44.4287258,26.1663356,17z/data=!4m6!3m5!1s0x40b1feb3efad4e9d:0x5256b8452252b05b!8m2!3d44.4290438!4d26.1680324!16s%2Fg%2F1tc_phx2?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D" target="_blank" rel="noopener noreferrer" className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">Strada Barajul Uzului CA 9</a></p>
              <p className="mb-2">Telefon: <a href="tel:+40770285661" className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">0770 285 661</a></p>
              <p className="mb-2">Email: <a href="mailto:contact@restaurant.ro" className="text-amber-400 hover:text-amber-300 transition-colors cursor-pointer">contact@restaurant.ro</a></p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-400">Program</h4>
              <p className="mb-2">Luni - Duminica: 10:00 - 22:00</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-400">Urmărește-ne</h4>
              <div className="flex space-x-4">
                <a href="https://www.facebook.com/restaurantminish" className="text-amber-100 hover:text-amber-400">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="https://www.instagram.com/restaurant_minish/" className="text-amber-100 hover:text-amber-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="https://www.tiktok.com/@minishrestaurant" target="_blank" rel="noopener noreferrer" className="text-amber-100 hover:text-amber-400">
                  <span className="sr-only">TikTok</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path d="M19.59 6.69a4.83 4.83 0 0 1-3.77-4.25V2h-3.45v13.67a2.89 2.89 0 0 1-5.2 1.74 2.89 2.89 0 0 1 2.31-4.64 2.93 2.93 0 0 1 .88.13V9.4a6.84 6.84 0 0 0-.88-.05A6.33 6.33 0 0 0 5.16 20.5a6.33 6.33 0 0 0 10.86-4.43V7.83a8.2 8.2 0 0 0 4.77 1.52v-3.4a4.85 4.85 0 0 1-1.2-.26z"/>
                  </svg>
                </a>
              </div>
            </div>
          </div>

          <div className="mt-8 pt-8 border-t border-gray-800 text-center">
            <p className="text-sm text-gray-400">
              © {new Date().getFullYear()} Restaurant. Toate drepturile rezervate.
            </p>
          </div>
        </div>
      </footer>
    </main>
  )
}
