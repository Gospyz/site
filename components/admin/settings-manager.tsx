"use client"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Loader2, Save } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { toast } from "@/components/ui/use-toast"

export function SettingsManager() {
  const router = useRouter()
  const [isSaving, setIsSaving] = useState(false)
  const [generalSettings, setGeneralSettings] = useState({
    siteName: "Restaurant",
    siteDescription:
      "Restaurant tradițional cu preparate autentice, organizare de evenimente și servicii de livrare la domiciliu.",
    contactEmail: "contact@restaurant.ro",
    contactPhone: "0712 345 678",
    address: "Strada Exemplu, Nr. 123, București",
  })

  const [socialSettings, setSocialSettings] = useState({
    facebook: "https://facebook.com/restaurant",
    instagram: "https://instagram.com/restaurant",
    twitter: "",
    youtube: "",
  })

  const [deliverySettings, setDeliverySettings] = useState({
    enableDelivery: true,
    deliveryFee: "15",
    freeDeliveryThreshold: "100",
    deliveryAreas: "Sectoarele 2, 3 și 4 din București",
    deliveryHours: "Luni - Duminică: 10:00 - 21:00",
  })

  const handleSaveSettings = async (settingsType: string) => {
    setIsSaving(true)

    // Simulare salvare - în producție, aici ar trebui să faceți un API call
    setTimeout(() => {
      setIsSaving(false)

      toast({
        title: "Succes!",
        description: `Setările ${settingsType === "general" ? "generale" : settingsType === "social" ? "sociale" : "de livrare"} au fost actualizate cu succes.`,
      })

      router.refresh()
    }, 1000)
  }

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold tracking-tight">Setări</h1>
        <p className="text-gray-500">Gestionați setările generale ale site-ului.</p>
      </div>

      <Tabs defaultValue="general" className="w-full">
        <TabsList className="mb-4">
          <TabsTrigger value="general">Generale</TabsTrigger>
          <TabsTrigger value="social">Social Media</TabsTrigger>
          <TabsTrigger value="delivery">Livrare</TabsTrigger>
        </TabsList>

        <TabsContent value="general">
          <Card>
            <CardHeader>
              <CardTitle>Setări Generale</CardTitle>
              <CardDescription>Configurați informațiile de bază ale site-ului.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="site-name">Numele Site-ului</Label>
                <Input
                  id="site-name"
                  value={generalSettings.siteName}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteName: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="site-description">Descriere Site</Label>
                <Textarea
                  id="site-description"
                  value={generalSettings.siteDescription}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, siteDescription: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-email">Email Contact</Label>
                <Input
                  id="contact-email"
                  type="email"
                  value={generalSettings.contactEmail}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, contactEmail: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="contact-phone">Telefon Contact</Label>
                <Input
                  id="contact-phone"
                  value={generalSettings.contactPhone}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, contactPhone: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="address">Adresă</Label>
                <Textarea
                  id="address"
                  value={generalSettings.address}
                  onChange={(e) => setGeneralSettings({ ...generalSettings, address: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("general")}
                className="bg-amber-700 hover:bg-amber-800"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se salvează...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvează Setările
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="social">
          <Card>
            <CardHeader>
              <CardTitle>Setări Social Media</CardTitle>
              <CardDescription>Configurați link-urile către rețelele sociale.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid gap-2">
                <Label htmlFor="facebook">Facebook</Label>
                <Input
                  id="facebook"
                  value={socialSettings.facebook}
                  onChange={(e) => setSocialSettings({ ...socialSettings, facebook: e.target.value })}
                  placeholder="https://facebook.com/pagina-dvs"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="instagram">Instagram</Label>
                <Input
                  id="instagram"
                  value={socialSettings.instagram}
                  onChange={(e) => setSocialSettings({ ...socialSettings, instagram: e.target.value })}
                  placeholder="https://instagram.com/pagina-dvs"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="twitter">Twitter</Label>
                <Input
                  id="twitter"
                  value={socialSettings.twitter}
                  onChange={(e) => setSocialSettings({ ...socialSettings, twitter: e.target.value })}
                  placeholder="https://twitter.com/pagina-dvs"
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="youtube">YouTube</Label>
                <Input
                  id="youtube"
                  value={socialSettings.youtube}
                  onChange={(e) => setSocialSettings({ ...socialSettings, youtube: e.target.value })}
                  placeholder="https://youtube.com/c/pagina-dvs"
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("social")}
                className="bg-amber-700 hover:bg-amber-800"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se salvează...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvează Setările
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>

        <TabsContent value="delivery">
          <Card>
            <CardHeader>
              <CardTitle>Setări Livrare</CardTitle>
              <CardDescription>Configurați opțiunile de livrare la domiciliu.</CardDescription>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between">
                <Label htmlFor="enable-delivery">Activează Livrarea</Label>
                <Switch
                  id="enable-delivery"
                  checked={deliverySettings.enableDelivery}
                  onCheckedChange={(checked) => setDeliverySettings({ ...deliverySettings, enableDelivery: checked })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="delivery-fee">Taxă de Livrare (lei)</Label>
                <Input
                  id="delivery-fee"
                  value={deliverySettings.deliveryFee}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryFee: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="free-delivery-threshold">Prag pentru Livrare Gratuită (lei)</Label>
                <Input
                  id="free-delivery-threshold"
                  value={deliverySettings.freeDeliveryThreshold}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, freeDeliveryThreshold: e.target.value })}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="delivery-areas">Zone de Livrare</Label>
                <Textarea
                  id="delivery-areas"
                  value={deliverySettings.deliveryAreas}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryAreas: e.target.value })}
                  rows={3}
                />
              </div>
              <div className="grid gap-2">
                <Label htmlFor="delivery-hours">Program Livrări</Label>
                <Textarea
                  id="delivery-hours"
                  value={deliverySettings.deliveryHours}
                  onChange={(e) => setDeliverySettings({ ...deliverySettings, deliveryHours: e.target.value })}
                  rows={2}
                />
              </div>
            </CardContent>
            <CardFooter>
              <Button
                onClick={() => handleSaveSettings("delivery")}
                className="bg-amber-700 hover:bg-amber-800"
                disabled={isSaving}
              >
                {isSaving ? (
                  <>
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                    Se salvează...
                  </>
                ) : (
                  <>
                    <Save className="mr-2 h-4 w-4" />
                    Salvează Setările
                  </>
                )}
              </Button>
            </CardFooter>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  )
}
