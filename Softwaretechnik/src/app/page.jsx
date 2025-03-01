"use client"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Home() {
  const [session, setSession] = useState()
  const router = useRouter()

  useEffect(() => {
    const handleSession = async () => {
      const session = await getSession()
      setSession(session)
    }
    handleSession()
  }, [])

  if (session?.user) {
    router.push("/dashboard")
  } else {
    router.push("/auth/login")
    router.refresh()
  }

  return
}
