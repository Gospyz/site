import { NextResponse } from "next/server"
import { deleteSession } from "@/lib/auth-simple"

export async function POST() {
  try {
    await deleteSession()
    return NextResponse.json({ success: true })
  } catch (error) {
    console.error("Eroare la deconectare:", error)
    return NextResponse.json({ error: "A apărut o eroare la deconectare" }, { status: 500 })
  }
}
