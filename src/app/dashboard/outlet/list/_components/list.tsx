"use client"

import { useEffect, useState } from "react";
import HorizontalCardList from "./listCard";
import { useGetOutlets } from "@/hooks/outlets/useGetOutlets";
import HorizontalCardListSkeleton from "@/layouts/organism/listCardSkeleton";

export default function List() {
  const {data, isPending} = useGetOutlets()

  return (
    <div className="flex flex-col gap-4 w-full">
      {isPending
        ? <HorizontalCardListSkeleton />
        : data?.map((outlet: any) => (
            <HorizontalCardList key={outlet.id} outlet={outlet} />
          ))
      }
    </div>
  );
}
