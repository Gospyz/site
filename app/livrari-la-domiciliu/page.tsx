import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Card, CardContent } from "@/components/ui/card"
import { PhoneCall, Clock, MapPin, Truck } from "lucide-react"
import Navigation from "../navigation/navigation"

export default function LivrariLaDomiciliu() {
  return (
    <main className="flex min-h-screen flex-col">
      {/* Top gold banner */}
      <div className="h-6 w-full bg-amber-400"></div>

      {/* Navigation - Simplified for this page */}
      <Navigation />


      {/* Hero Section */}
      <div className="relative h-[300px] w-full">
        <Image
          src="/placeholder.svg?height=300&width=1200&text=Livrari+La+Domiciliu"
          alt="Livrari La Domiciliu"
          fill
          className="object-cover brightness-75"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <h1 className="text-4xl md:text-5xl font-bold text-white drop-shadow-lg">Livrări la Domiciliu</h1>
        </div>
      </div>

      {/* Main Content */}
      <section className="py-12">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center mb-12">
            <h2 className="text-3xl font-bold mb-6 text-amber-800">Comandă preparatele tale preferate</h2>
            <p className="text-lg text-gray-700">
              Vă oferim servicii de livrare la domiciliu în sectoarele 2, 3 și 4, pentru a vă aduce savoarea
              preparatelor, direct în confortul casei voastre.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-12">
            {/* Delivery Info */}
            <div className="mx-auto  ">
              <h3 className="text-2xl font-semibold mb-6 text-amber-800">Informații Livrare</h3>

              <div className="grid grid-cols-2 gap-6">
                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <MapPin className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Zone de Livrare</h4>
                      <p className="text-gray-600">Sectoarele 2, 3 și 4 din București</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Clock className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Program Livrări</h4>
                      <p className="text-gray-600">Luni - Duminică: 10:00 - 21:00</p>
                    </div>
                  </CardContent>
                </Card>

                <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                    <div className="bg-amber-100 p-3 rounded-full">
                      <Truck className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                      <h4 className="font-medium text-lg mb-1">Taxă de Livrare</h4>
                      <p className="text-gray-600">15 lei pentru comenzi sub 100 lei</p>
                      <p className="text-gray-600">Gratuită pentru comenzi peste 100 lei</p>
                    </div>
                  </CardContent>
                </Card>

                 <Card>
                  <CardContent className="flex items-start gap-4 p-6">
                   <div className="bg-amber-100 p-3 rounded-full">
                    <PhoneCall className="h-6 w-6 text-amber-700" />
                    </div>
                    <div>
                    <h4 className="font-medium text-lg mb-1">Comenzi Telefonice</h4>
                      <p className="text-gray-600">0712 345 678</p>
                    </div>
                  </CardContent>
                </Card>
              </div>

              <div className="mt-8">
                <h3 className="text-2xl font-semibold mb-6 text-amber-800">Meniu Disponibil pentru Livrare</h3>
                <Button className="bg-amber-700 hover:bg-amber-800 w-full">Descarcă Meniul PDF</Button>
              </div>
            </div>

            {/* Order Form */}
           {/* <div>
              <h3 className="text-2xl font-semibold mb-6 text-amber-800">Comandă Online</h3>

              <form className="space-y-4 bg-amber-50 p-6 rounded-lg">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Nume și Prenume
                  </label>
                  <Input id="name" placeholder="Numele și prenumele dvs." />
                </div>

                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Telefon
                  </label>
                  <Input id="phone" placeholder="Numărul dvs. de telefon" />
                </div>

                <div>
                  <label htmlFor="address" className="block text-sm font-medium text-gray-700 mb-1">
                    Adresa de Livrare
                  </label>
                  <Textarea
                    id="address"
                    placeholder="Adresa completă de livrare (stradă, număr, bloc, scară, apartament, sector)"
                    rows={3}
                  />
                </div>

                <div>
                  <label htmlFor="order" className="block text-sm font-medium text-gray-700 mb-1">
                    Comanda Dvs.
                  </label>
                  <Textarea id="order" placeholder="Detaliați comanda dvs. (preparate, cantități, etc.)" rows={5} />
                </div>

                <div>
                  <label htmlFor="notes" className="block text-sm font-medium text-gray-700 mb-1">
                    Mențiuni Speciale (opțional)
                  </label>
                  <Textarea id="notes" placeholder="Orice alte detalii sau cerințe speciale" rows={2} />
                </div>

                <div className="pt-4">
                  <Button className="w-full bg-amber-700 hover:bg-amber-800">Trimite Comanda</Button>
                </div>
              </form>
            </div>*/}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 bg-amber-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-12 text-center text-amber-800">Ce Spun Clienții Noștri</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400">★★★★★</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Mâncarea a ajuns caldă și în timp record. Sarmalele sunt exact ca cele făcute de bunica mea. Cu
                  siguranță voi mai comanda!"
                </p>
                <p className="font-medium">- Maria D.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400">★★★★★</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Calitate excelentă, porții generoase și livrare rapidă. Recomand cu încredere tuturor celor care vor
                  să guste mâncare tradițională autentică."
                </p>
                <p className="font-medium">- Alexandru P.</p>
              </CardContent>
            </Card>

            <Card>
              <CardContent className="p-6">
                <div className="flex items-center mb-4">
                  <div className="text-amber-400">★★★★★</div>
                </div>
                <p className="text-gray-700 mb-4">
                  "Am comandat pentru o întâlnire de afaceri și toată lumea a fost impresionată. Ambalajul elegant și
                  mâncarea delicioasă au făcut diferența!"
                </p>
                <p className="font-medium">- Elena M.</p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black text-white py-8 mt-auto">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-400">Contact</h4>
              <p className="mb-2">Adresă: Strada Exemplu, Nr. 123</p>
              <p className="mb-2">Telefon: 0712 345 678</p>
              <p className="mb-2">Email: contact@restaurant.ro</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-400">Program</h4>
              <p className="mb-2">Luni - Vineri: 10:00 - 22:00</p>
              <p className="mb-2">Sâmbătă: 10:00 - 23:00</p>
              <p className="mb-2">Duminică: 12:00 - 22:00</p>
            </div>

            <div>
              <h4 className="text-xl font-semibold mb-4 text-amber-400">Urmărește-ne</h4>
              <div className="flex space-x-4">
                <a href="#" className="text-amber-100 hover:text-amber-400">
                  <span className="sr-only">Facebook</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M22 12c0-5.523-4.477-10-10-10S2 6.477 2 12c0 4.991 3.657 9.128 8.438 9.878v-6.987h-2.54V12h2.54V9.797c0-2.506 1.492-3.89 3.777-3.89 1.094 0 2.238.195 2.238.195v2.46h-1.26c-1.243 0-1.63.771-1.63 1.562V12h2.773l-.443 2.89h-2.33v6.988C18.343 21.128 22 16.991 22 12z"
                      clipRule="evenodd"
                    />
                  </svg>
                </a>
                <a href="#" className="text-amber-100 hover:text-amber-400">
                  <span className="sr-only">Instagram</span>
                  <svg className="h-6 w-6" fill="currentColor" viewBox="0 0 24 24" aria-hidden="true">
                    <path
                      fillRule="evenodd"
                      d="M12.315 2c2.43 0 2.784.013 3.808.06 1.064.049 1.791.218 2.427.465a4.902 4.902 0 011.772 1.153 4.902 4.902 0 011.153 1.772c.247.636.416 1.363.465 2.427.048 1.067.06 1.407.06 4.123v.08c0 2.643-.012 2.987-.06 4.043-.049 1.064-.218 1.791-.465 2.427a4.902 4.902 0 01-1.153 1.772 4.902 4.902 0 01-1.772 1.153c-.636.247-1.363.416-2.427.465-1.067.048-1.407.06-4.123.06h-.08c-2.643 0-2.987-.012-4.043-.06-1.064-.049-1.791-.218-2.427-.465a4.902 4.902 0 01-1.772-1.153 4.902 4.902 0 01-1.153-1.772c-.247-.636-.416-1.363-.465-2.427-.047-1.024-.06-1.379-.06-3.808v-.63c0-2.43.013-2.784.06-3.808.049-1.064.218-1.791.465-2.427a4.902 4.902 0 011.153-1.772A4.902 4.902 0 015.45 2.525c.636-.247 1.363-.416 2.427-.465C8.901 2.013 9.256 2 11.685 2h.63zm-.081 1.802h-.468c-2.456 0-2.784.011-3.807.058-.975.045-1.504.207-1.857.344-.467.182-.8.398-1.15.748-.35.35-.566.683-.748 1.15-.137.353-.3.882-.344 1.857-.047 1.023-.058 1.351-.058 3.807v.468c0 2.456.011 2.784.058 3.807.045.975.207 1.504.344 1.857.182.466.399.8.748 1.15.35.35.683.566 1.15.748.353.137.882.3 1.857.344 1.054.048 1.37.058 4.041.058h.08c2.597 0 2.917-.01 3.96-.058.976-.045 1.505-.207 1.858-.344.466-.182.8-.398 1.15-.748.35-.35.566-.683.748-1.15.137-.353.3-.882.344-1.857.048-1.055.058-1.37.058-4.041v-.08c0-2.597-.01-2.917-.058-3.96-.045-.976-.207-1.505-.344-1.858a3.097 3.097 0 00-.748-1.15 3.098 3.098 0 00-1.15-.748c-.353-.137-.882-.3-1.857-.344-1.023-.047-1.351-.058-3.807-.058zM12 6.865a5.135 5.135 0 110 10.27 5.135 5.135 0 010-10.27zm0 1.802a3.333 3.333 0 100 6.666 3.333 3.333 0 000-6.666zm5.338-3.205a1.2 1.2 0 110 2.4 1.2 1.2 0 010-2.4z"
                      clipRule="evenodd"
                    />
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
