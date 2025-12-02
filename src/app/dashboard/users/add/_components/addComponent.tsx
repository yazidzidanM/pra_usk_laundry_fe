"use client"

import { useGetOutlets } from "@/hooks/outlets/useGetOutlets";
import AddUserForm from "./addUserForm";
import { columns } from "./columns";
import { DataTable } from "./data-table";

export default function AddUsersComponents() {
  const {data} = useGetOutlets()
  const Outlets = data ? data : []
  return (
    <div className="w-full gap-4 flex md:justify-between flex-col sm:flex-row">
      <div className="w-full md:w-1/2">
        <AddUserForm />
      </div>
      <div className="w-full md:w-2/5">
        <div className="container h-full mx-auto">
          <DataTable columns={columns} data={Outlets} />
        </div>
      </div>
    </div>
  )
}