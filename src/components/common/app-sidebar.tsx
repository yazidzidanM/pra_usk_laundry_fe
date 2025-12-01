'use client';

import { Shirt, EllipsisVertical, LogOut, ChevronDown, ChevronUp, User2, Receipt, MoreHorizontal } from "lucide-react";
import { Sidebar, SidebarContent, SidebarFooter, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarHeader, SidebarMenu, SidebarMenuAction, SidebarMenuBadge, SidebarMenuButton, SidebarMenuItem, SidebarMenuSub, SidebarMenuSubItem, useSidebar } from "../ui/sidebar";
import { DropdownMenu, DropdownMenuContent, DropdownMenuGroup, DropdownMenuItem, DropdownMenuLabel, DropdownMenuSeparator, DropdownMenuTrigger } from "../ui/dropdown-menu";
import { cn } from "@/lib/utils";
import { redirect, usePathname } from "next/navigation";
import { SIDEBAR_MENU_KEY, SIDEBAR_MENU_LIST, SIDEBAR_ORDERS_MENU_LIST, SIDEBAR_SECRET_MENU_KEY, SIDEBAR_SECRET_MENU_LIST } from "@/constants/sidebar-constant";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "../ui/collapsible";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useGetOrders } from "@/hooks/orders/useGetOrders";
import { useUpcase } from "@/func/UpCase";
import { LogOutAction } from "@/func/logout";

export default function AppSidebar({ user }: any) {
  const { data } = useGetOrders()
  const loading = !data;

  const filterWaiting = loading
    ? <div className="animate-pulse">+0</div>
    : data.filter(item => item.status === "waiting").length;

  const filterEWaiting = loading
    ? <div className="animate-pulse">+0</div>
    : data.filter(item => !["waiting", "ditolak", "selesai"].includes(item.status)).length;

  const { nama, namauser, roleuser } = useUpcase(user.nama, user.username, user.role)
  const { isMobile } = useSidebar()
  const pathname = usePathname() as unknown as string
  // const parts = pathname.join("/")
  return (
    <Sidebar collapsible="icon">
      <SidebarHeader>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton size="lg" asChild>
              <div className="font-semibold mt-[3px]">
                <div className="bg-teal-500 flex items-center justigy-center p-2 rounded-md">
                  <Shirt className="size-4" />
                </div>
                My Laundry
              </div>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarGroupLabel>Services</SidebarGroupLabel>
          <SidebarGroupContent className="flex flex-col gap-2">
            <SidebarMenu className="flex flex-col gap-1.5">
              {SIDEBAR_MENU_LIST[user.role as SIDEBAR_MENU_KEY]?.map((item: any) => {
                const isSameSecret = SIDEBAR_SECRET_MENU_LIST.some(same => same.title === item.title)
                const isSameOrders = SIDEBAR_ORDERS_MENU_LIST.some(same => same.title === item.title)
                return (
                  isSameOrders ?
                    <SidebarMenuItem key={item.title}>
                      <SidebarMenuButton asChild>
                        <a
                          href={item.url}
                          className={cn("flex items-center justify-between w-full p-4 py-5.5", { "bg-teal-500 text-white hover:bg-teal-500 hover:text-white": pathname.startsWith(item.url) })}
                        >
                          <div className="flex items-center gap-2">
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </div>
                          <SidebarMenuBadge className="animate-bounce">
                            {item.title === "Orders"
                              ? filterWaiting
                              : filterEWaiting}
                          </SidebarMenuBadge>
                        </a>
                      </SidebarMenuButton>
                    </SidebarMenuItem>
                    :
                    isSameSecret ?
                      <SidebarMenuItem className="flex flex-row justify-between items-center" key={item.title}>
                        <SidebarMenuButton className={cn("flex justify-between items-center p-4 py-5.5", { "bg-teal-500 text-white hover:bg-teal-500 hover:text-white": pathname.startsWith(item.url) })}>
                          <a href={item.url} className="flex flex-row items-center gap-2">
                            {item.icon && <item.icon />}
                            <span>{item.title}</span>
                          </a>
                        </SidebarMenuButton>
                        <DropdownMenu>
                          <DropdownMenuTrigger asChild>
                            <SidebarMenuAction className="flex mt-1.5">
                              <MoreHorizontal />
                            </SidebarMenuAction>
                          </DropdownMenuTrigger>
                          <DropdownMenuContent side="right" align="start">
                            {item.features?.map((feature: any) => (
                              <DropdownMenuItem key={feature.title}>
                                <Link href={feature.url} className="text-[13.8px]">{feature.title}</Link>
                              </DropdownMenuItem>
                            ))}
                          </DropdownMenuContent>
                        </DropdownMenu>
                      </SidebarMenuItem>
                      :
                      <Collapsible defaultOpen={pathname !== item.url && pathname.startsWith(item.url)} className="group" key={item.title}>
                        <SidebarMenuItem>
                          <CollapsibleTrigger asChild>
                            <SidebarMenuButton className={cn("flex justify-between items-center pl-4 py-5.5", {
                              "bg-teal-500 text-white hover:bg-teal-500 hover:text-white":
                                pathname === item.url,
                              "bg-neutral-800 text-white hover:bg-neutral-800 hover:text-white":
                                pathname !== item.url && pathname.startsWith(item.url)
                            })}>
                              <div className="flex flex-row items-center gap-2">
                                {item.icon && <item.icon />}
                                <a href={item.url}>{item.title}</a>
                              </div>
                              <ChevronDown className="h-4 w-4 rotate-270 transition-transform group-data-[state=open]:rotate-360" />
                            </SidebarMenuButton>
                          </CollapsibleTrigger>
                          <CollapsibleContent>
                            <SidebarMenuSub>
                              {item.features?.map((feature: any) => {
                                return (
                                  <SidebarMenuSubItem key={feature.title}>
                                    <SidebarMenuButton asChild>
                                      <Link href={feature.url} className={cn("text-[13.8px]", { "bg-teal-500 text-white hover:bg-teal-500 hover:text-white": pathname === feature.url })}>{feature.title}</Link>
                                    </SidebarMenuButton>
                                  </SidebarMenuSubItem>
                                )
                              }
                              )}
                            </SidebarMenuSub>
                          </CollapsibleContent>
                        </SidebarMenuItem>
                      </Collapsible>
                )
              })}
            </SidebarMenu>
          </SidebarGroupContent>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <DropdownMenu >
              <DropdownMenuTrigger asChild>
                <SidebarMenuButton size="lg" className="data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground"><User2 /> {nama}
                  <EllipsisVertical className="size-4 ml-auto" />
                </SidebarMenuButton>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                className="min-w-56 rounded-lg"
                side={isMobile ? "bottom" : "right"}
                align="end"
                sideOffset={4}
              >
                <DropdownMenuLabel className="p-0 font-normal">
                  <div className="flex items-center flex-row gap-2 px-2 py-1.5 text-[15px]">
                    {namauser}
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuGroup>
                  <DropdownMenuItem className="flex py-2">
                    {roleuser} Account
                  </DropdownMenuItem>
                  {user.role === "user" && 
                  <DropdownMenuItem className="flex py-2">
                    <Receipt /> Billing
                  </DropdownMenuItem>
                  }
                  <DropdownMenuItem onClick={() => LogOutAction()} className="flex py-2 mb-1">
                    <LogOut /> Log Out
                  </DropdownMenuItem>
                </DropdownMenuGroup>
              </DropdownMenuContent>
            </DropdownMenu>
          </SidebarMenuItem>
        </SidebarMenu>
      </SidebarFooter>
    </Sidebar >
  )
}