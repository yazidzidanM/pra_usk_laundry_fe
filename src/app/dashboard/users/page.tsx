"use client"

import { useGetUsers } from "@/hooks/users/useGetUsers";
import ChartRolePerOutlet from "./_components/ChartPengguna";
import UserRoleOverview from "./_components/ComponentUsers"
import { groupUsersByOutlet } from "./_components/grouping";
import { AnimatedCounter } from "@/animations/animate";

export default function UsersPage(){
  const { data: dataUsers } = useGetUsers()  

  const grouped = groupUsersByOutlet(dataUsers ?? []);

  console.log(grouped)
  return (
    <div className="min-h-screen w-full mb-16">
      <UserRoleOverview
      username="aik"
      adminCount={<AnimatedCounter target={dataUsers?.filter((i) => i.role === "admin").length ?? 0} duration={1000}/>}
      kasirCount={<AnimatedCounter target={dataUsers?.filter((i) => i.role === "kasir").length ?? 0} duration={1000}/>}
      ownerCount={<AnimatedCounter target={dataUsers?.filter((i) => i.role === "owner").length ?? 0} duration={1000}/>}
      userCount={<AnimatedCounter target={dataUsers?.filter((i) => i.role === "user").length ?? 0} duration={1000}/>}
      />
      <div className="w-full px-6">
      <ChartRolePerOutlet data={grouped} />
      </div>
    </div>
  )
}