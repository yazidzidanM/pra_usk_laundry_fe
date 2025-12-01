"use client"

import { usePathname } from "next/navigation"
import { cn } from "@/lib/utils"
import { SidebarInset } from "@/components/ui/sidebar"

export default function WrapperLayoutDashboard({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const same = pathname === "/dashboard/outlet/list" 

  return (
    <SidebarInset className={cn("hoverflow-x-hidden", { "h-screen": same })}>
      {children}
    </SidebarInset>
  )
}
