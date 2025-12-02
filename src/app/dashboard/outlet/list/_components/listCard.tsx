"use client"

import Image from "next/image";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { AlertDelete } from "@/components/common/alertDelete";
import { useDeleteOutlet } from "@/hooks/outlets/useDeleteOutlet";
import { toast } from "sonner";
import { EditOutletSheet } from "./editOutletSheet";
import { IOutlet } from "@/hooks/outlets/useGetOutlets";

interface HorizontalCardProps {
  outlet: IOutlet;
}

export default function HorizontalCardList({ outlet }: HorizontalCardProps) {
  const {mutate} = useDeleteOutlet({
    mutationConfig: {
      onSuccess: () => toast.success("success delete outlet")
    }
  })
  return (
    <Card className="flex flex-col sm:flex-row items-start gap-4 p-4 shadow-sm hover:shadow-md transition-shadow">

      <div className="h-36 w-36 min-w-36 rounded-lg overflow-hidden bg-muted border">
        <Image
          src={outlet.gambar}
          alt={outlet.nama}
          width={144}
          height={144}
          className="object-cover h-full w-full"
        />
      </div>

      <div className="flex flex-col flex-1 gap-2">
        <h1 className="text-[1.3rem] font-semibold">Outlet-Id {outlet.id}</h1>
        <div className="flex lg:flex-row flex-col justify-between gap-4">
          <div className="space-y-0.5 flex-1">
            <h3 className="text-[1rem] font-medium capitalize">
              Nama Outlet : {outlet.nama}
            </h3>
            <h3 className="text-[1rem] font-medium capitalize">
              Kota Outlet : {outlet.kota}
            </h3>
            <p className="text-muted-foreground text-[1rem]">
              Alamat Outlet : {outlet.alamat}
            </p>
            <p className="font-semibold text-[1rem]">
              Nomor Telp : {outlet.tlp}
            </p>
          </div>

          <div className="flex flex-col gap-2 min-w-[200px] mr-2">

            <Link href={`/dashboard/packet/list`} className="w-full">
              <Button
                className="w-full h-12 text-[16px] font-medium bg-blue-700 hover:bg-blue-600"
                variant="secondary"
              >
                Lihat Paket
              </Button>
            </Link>

            <div className="flex flex-row gap-2 w-full">

              <div className="w-1/2">
                <div className="w-full h-12">
                  <EditOutletSheet id={outlet.id!}/>
                </div>
              </div>

              <div className="w-1/2">
                <div className="w-full h-12">
                  <AlertDelete 
                  description={"are you sure to delete this outlet?"}
                  action={() => {mutate(outlet.id!)}}
                  />
                </div>
              </div>

            </div>
          </div>

        </div>
      </div>
    </Card>
  );
}
