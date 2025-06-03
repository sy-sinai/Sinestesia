"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Navigation } from "@/components/navigation"
import { AuthProvider } from "@/components/auth-provider"

export function ClientLayout({ children }: { children: React.ReactNode }) {
  const [mounted, setMounted] = useState(false)

  useEffect(() => {
    setMounted(true)
  }, [])

  if (!mounted) {
    return (
      <div className="min-h-screen bg-background">
        <div className="flex items-center justify-center min-h-screen">
          <div className="text-lg">Cargando...</div>
        </div>
      </div>
    )
  }

  return (
    <AuthProvider>
      <Navigation />
      <main>{children}</main>
    </AuthProvider>
  )
}
