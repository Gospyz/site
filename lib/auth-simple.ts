import { cookies } from "next/headers"
import { ADMIN_EMAIL, ADMIN_PASSWORD } from "./auth-constants"

// Funcție simplificată pentru verificarea credențialelor
export function verifyCredentials(email: string, password: string) {
  if (email === ADMIN_EMAIL && password === ADMIN_PASSWORD) {
    return true
  }
  return false
}

// Funcție pentru verificarea sesiunii
export async function getSession() {
  const cookieStore = await cookies()
  const sessionCookie = cookieStore.get("admin-session")

  if (!sessionCookie) {
    return null
  }

  try {
    // În producție, ar trebui să verificați semnătura și să decriptați cookie-ul
    const sessionData = JSON.parse(sessionCookie.value)
    return sessionData
  } catch (error) {
    return null
  }
}

// Funcție pentru crearea sesiunii
export async function createSession(user: any) {
  // În producție, ar trebui să semnați și să criptați datele sesiunii
  const sessionData = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    expires: Date.now() + 24 * 60 * 60 * 1000, // 24 ore
  }

  const cookieStore = await cookies()
  cookieStore.set({
    name: "admin-session",
    value: JSON.stringify(sessionData),
    httpOnly: true,
    path: "/",
    secure: process.env.NODE_ENV === "production",
    maxAge: 60 * 60 * 24, // 24 ore
  })

  return sessionData
}

// Funcție pentru ștergerea sesiunii
export async function deleteSession() {
  const cookieStore = await cookies()
  cookieStore.delete("admin-session")
}
