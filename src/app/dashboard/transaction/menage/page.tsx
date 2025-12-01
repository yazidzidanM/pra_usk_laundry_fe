"use client"

import { useGetTrxs } from "@/hooks/trx/useGetAllTrx";
import { AdminTransactionTable } from "./_components/dataTable";
import { AdminTransactionSkeleton } from "./_components/dataTableSkeleton";


export default function AdminTransactionPage() {
  const { data, isLoading } = useGetTrxs();

  return (
    <div className="p-0 max-w-5xl flex justify-center">
      {isLoading && <AdminTransactionSkeleton />}

      {!isLoading && (
        <AdminTransactionTable
          data={data ?? []}
        />
      )}
    </div>
  );
}
