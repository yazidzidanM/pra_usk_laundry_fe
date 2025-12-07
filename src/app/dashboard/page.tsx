"use client"
import UserDashboard from '@/layouts/templates/userDashboard'
import { useAuthStore } from '@/menageState/zustandStore'
import React from 'react'

function PageDashboard() {
  const user = useAuthStore((u) => u.user)
  const role = user?.role
  return (
    <div>
      {role === "user" && <UserDashboard user={user}/>}
    </div>
  )
}

export default PageDashboard