"use client"
import { useGetUsers } from "@/hooks/users/useGetUsers"
import DataTable from "./_components/data-table"
import { createColumns } from "./_components/coloums"
import { useDeleteUser } from "@/hooks/users/useDeleteUsers"
import { useState } from "react"
import { useGetUserById } from "@/hooks/users/useGetUserById"
import { EditUserModal } from "./_components/EditUserModal"
import { useUpdateUser } from "@/hooks/users/useUpdateUsers"

export type TUsers = {
  id?: number
  username: string
  nama: string
  id_outlet: number | null
  role: string 
}

export default function ListUsersPage() {
  const [isOpen, setIsOpen] = useState(false)
  const [id, setId] = useState<number>()

  const { mutate: mutateDelete } = useDeleteUser()
  const { data: dataUsers, isPending } = useGetUsers()
  const { data: selectedUser, } = useGetUserById({
    id: id as number,
    queryConfig: { enabled: !!id }
  })
  const {mutate: mutateUpdate} = useUpdateUser({
    id: id as number,
  })
  
  const columns = createColumns({
    onEdit: (data: TUsers) => {
      setId(data.id)
      setIsOpen(true)
    },
    onDelete: (id: number) => mutateDelete(id),
  })
  
  const users = dataUsers ? dataUsers : []
  return (
    <>
      <DataTable data={users} columns={columns} />
      <EditUserModal
        open={isOpen}
        onOpenChange={setIsOpen}
        user={selectedUser ?? null}
        onSubmit={(values) => {
          setIsOpen(false)
            mutateUpdate({
              id: id!,
              data: values,
            });
        }}
      />
    </>
  )
}