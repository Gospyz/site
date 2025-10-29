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

          <div className="grid grid-cols-1 gap-12">
            <div className="mx-auto">
              <h2 className="text-2xl font-semibold mb-4 text-amber-800">Informații de Contact</h2>

              <div className="space-y-4 text-gray-700">
                <p className="flex items-start">
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
                  <span>Strada Exemplu, Nr. 123, București</span>
                </p>

                <p className="flex items-start">
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
                  <span>0712 345 678</span>
                </p>

                <p className="flex items-start">
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
                      d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                    />
                  </svg>
                  <span>contact@restaurant.ro</span>
                </p>

                <div className="mt-6">
                  <h3 className="text-xl font-semibold mb-2 text-amber-800">Program</h3>
                  <p className="mb-1">Luni - Vineri: 10:00 - 22:00</p>
                  <p className="mb-1">Sâmbătă: 10:00 - 23:00</p>
                  <p>Duminică: 12:00 - 22:00</p>
                </div>
              </div>

              <div className="mt-8 h-64 relative rounded-lg overflow-hidden">
                <Image src="/map.jpg" alt="Locație restaurant" fill className="object-cover" />
              </div>
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
