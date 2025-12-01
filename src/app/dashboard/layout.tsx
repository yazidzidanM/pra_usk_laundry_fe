"use server"

import { ModeToggle } from "@/components/common/DarkModeToggle";
import { Separator } from "@/components/ui/separator";
import { SidebarInset, SidebarProvider, SidebarTrigger } from "@/components/ui/sidebar";
import { ReactNode } from "react";
import DashboardBreadcrumb from "./_components/dashboard-breadcrumb";
import { getUserFromCookie } from "@/stores/auth-store";
import AppSidebar from "@/components/common/app-sidebar";
import { Toaster } from "@/components/ui/sonner";
import { cn } from "@/lib/utils";
import WrapperLayoutDashboard from "@/providers/dashboardLayoutWrap";
export const dynamic = "force-dynamic";
export const revalidate = 0;


type DashboardLayoutProps = {
  children: ReactNode
}

export default async function DashboardLayout({ children }: DashboardLayoutProps) {
  const user = await getUserFromCookie()
  return (
    <div>
      <SidebarProvider>
        <AppSidebar user={user} />
        <WrapperLayoutDashboard>
            <header className="flex items-center h-16 justify-between gap-2 shrink-0 transition-[height,widht] ease-linear group-has-data-[collapsible=icon]/sidebar-wrapper:h-12">
              <div className="flex items-center gap-2 px-4">
                <SidebarTrigger className="cursor-pointer" />
                <Separator
                  orientation="vertical"
                  className="mr-4 data-[orientation=vertical]:h-4"
                />
                <DashboardBreadcrumb />
              </div>
              <div className="px-4">
                <ModeToggle />
              </div>
            </header>
            {/* <Separator/> */}
            <main className="flex-1 h-full overflow-y-hidden px-4 py-0">
              <Toaster position="top-center" />
              {children}
            </main>
        </WrapperLayoutDashboard>
      </SidebarProvider>
    </div>
  )
}