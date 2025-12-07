"use client"

import { useAuthStore } from "@/menageState/zustandStore";
import MyOrderComponent from "./_components/MyOrderComponent";
import { useGetCustomerOrderByIdUser } from "@/hooks/customer/useGetOrderUserId";
import { useGetCustomerMemberByIdUser } from "@/hooks/customer/useGetMemberById";
import { AnimatedCounter } from "@/animations/animate";


export default function MyOrderPage() {
  const user = useAuthStore((u) => u.user)
  const id_user = user?.id
  const { data: orders, isLoading: loadingOrder } = useGetCustomerOrderByIdUser(
    { id: id_user!, queryConfig: { enabled: !!id_user } });
  const { data: member, isLoading: loadingMember } = useGetCustomerMemberByIdUser(
    { id: id_user!, queryConfig: { enabled: !!id_user } });

  return <MyOrderComponent
    user={user}
    onWaiting={<AnimatedCounter target={orders?.filter((u) => u.status === "waiting")?.length ?? 0} duration={1000}/>}
    onAccept={<AnimatedCounter target={orders?.filter((u) => u.status === "diterima")?.length ?? 0} duration={1000}/>}
    onProcess={<AnimatedCounter target={orders?.filter((u) => u.status === "proses")?.length ?? 0} duration={1000}/>}
    done={<AnimatedCounter target={orders?.filter((u) => u.status === "selesai")?.length ?? 0} duration={1000}/>}
    dataMember={member ?? []} 
    />
}