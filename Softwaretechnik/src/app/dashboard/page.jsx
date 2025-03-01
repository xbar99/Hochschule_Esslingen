"use client"
import { getSession } from "next-auth/react"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"
import Header from "@/components/Header/Header"
import DashboardBox from "@/components/DashboardBox/DashboardBox"
import FeatureButtons from "@/components/FeatureButtons/FeatureButtons"
import Footer from "@/components/Footer/Footer"

const Dashboard = () => {
  const router = useRouter()

  useEffect(() => {
    const handleSession = async () => {
      const session = await getSession()

      if (!session) {
        router.push("/auth/login")
        router.refresh()
      }
    }
    handleSession()
  })

  return (
    <div>
      <Header />
      <DashboardBox />
      <FeatureButtons />
      <Footer />
    </div>
  )
}

export default Dashboard
