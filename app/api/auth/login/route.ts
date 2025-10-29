import { type NextRequest, NextResponse } from "next/server"
import { verifyCredentials, createSession } from "@/lib/auth-simple"

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email, password } = body

    const user = await verifyCredentials(email, password)

    if (!user) {
      return NextResponse.json({ error: "Credențiale invalide" }, { status: 401 })
    }

    const session = await createSession(user)

    return NextResponse.json({ success: true, user: session })
  } catch (error) {
    console.error("Eroare la autentificare:", error)
    return NextResponse.json({ error: "A apărut o eroare la autentificare" }, { status: 500 })
  }
}
