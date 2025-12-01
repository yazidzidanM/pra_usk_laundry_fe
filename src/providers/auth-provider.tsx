"use client"

import { useRouter } from "next/router"
import { ReactNode, useEffect } from "react"

export async function AuthProvider({ children }: { children: ReactNode }){
  const router = useRouter()
  useEffect(() => {
    function checkAuth() {
      try {

      } catch (error) {
        
      }
    }
    checkAuth()
  }, [router])

  return <>{children}</>
}