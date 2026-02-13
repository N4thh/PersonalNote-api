import jwt from 'jsonwebtoken'
import { cookies } from 'next/headers'

export async function getUser() {
  const cookieStore = await cookies()
  const token = cookieStore.get('token')?.value

  if (!token) return null

  try {
    return jwt.verify(token, process.env.JWT_SECRET!) as {
      id: string
      username: string
    }
  } catch {
    return null
  }
}
