"use client"

import { useGetOutlets } from "@/hooks/outlets/useGetOutlets";
import AddUserForm from "./addUserForm";
import { columns } from "./columns";
import { DataTable } from "./data-table";



export default function AddUsersComponents() {
  const {data} = useGetOutlets()
  const Outlets = data ? data : []
  return (
    <div className="w-full flex justify-between">
      <div className="w-1/2">
        <AddUserForm />
      </div>
      <div className="w-1/5">
        <div className="container h-full mx-auto">
          <DataTable columns={columns} data={Outlets} />
        </div>
      </div>
    </div>
  )
}