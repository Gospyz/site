import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Navigation from "../navigation/navigation"

export default function Contact() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation - Simplified for this page */}
      <Navigation />

      {/* Contact Section */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <h1 className="text-3xl md:text-4xl font-bold mb-8 text-center">Contact</h1>

          <div className="flex flex-col">
            <div className="centered-content max-w-2xl mx-auto text-center">
              <h2 className="text-2xl font-semibold mb-4 text-amber-800">Informații de Contact</h2>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
                    />
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
                    />
                  </svg>
                  <span>Strada Barajul Uzului CA 9, București</span>
                </p>

                <p className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                    />
                  </svg>
                  <span>0770 285 661</span>
                </p>

                <p className="flex items-center justify-center">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="h-6 w-6 mr-2 text-amber-600"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 002 2z"
                    />
                  </svg>
                  <span>contact@restaurant.ro</span>
                </p>

                <div className="mt-6 text-center">
                  <h3 className="text-xl font-semibold mb-2 text-amber-800">Program</h3>
                  <p className="mb-1">Luni - Duminica: 10:00 - 22:00</p>
                </div>
              </div>
            </div>

            <div className="w-full h-64 relative rounded-lg overflow-hidden group cursor-pointer">
              <a 
                href="https://www.google.com/maps/place/Restaurant+Minish/@44.4287258,26.1663356,17z/data=!4m6!3m5!1s0x40b1feb3efad4e9d:0x5256b8452252b05b!8m2!3d44.4290438!4d26.1680324!16s%2Fg%2F1tc_phx2?entry=ttu&g_ep=EgoyMDI1MTAyOS4yIKXMDSoASAFQAw%3D%3D" 
                target="_blank" 
                rel="noopener noreferrer"
                className="block w-full h-full relative"
              >
                <Image src="/locatie.png" alt="Locație restaurant - Click pentru a vedea pe Google Maps" fill className="object-cover transition-transform duration-300" />
                
                {/* Butonul centrat care apare la hover */}
                <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                  <div className="bg-amber-600 hover:bg-amber-700 text-white px-6 py-3 rounded-lg shadow-lg flex items-center text-base font-medium">
                    <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    Vezi pe Google Maps
                  </div>
                </div>
              </a>
            </div>
            {/*} <div>
              <h2 className="text-2xl font-semibold mb-4 text-amber-800">Trimite-ne un Mesaj</h2>

              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nume
                  </label>
                  <Input id="name" placeholder="Numele tău" />
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email
                  </label>
                  <Input id="email" type="email" placeholder="Email-ul tău" />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <Input id="phone" placeholder="Numărul tău de telefon" />
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subiect
                  </label>
                  <Input id="subject" placeholder="Subiectul mesajului" />
                </div>

                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                    Mesaj
                  </label>
                  <Textarea id="message" placeholder="Mesajul tău" rows={5} />
                </div>

                <Button className="w-full bg-amber-700 hover:bg-amber-800">Trimite Mesaj</Button>
              </form>
            </div>*/}
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
