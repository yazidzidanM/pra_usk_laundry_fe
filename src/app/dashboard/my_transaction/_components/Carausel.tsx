import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IDetail } from "@/hooks/customer/useGetDetail";
import { cn } from "@/lib/utils";


type TransactionCarouselProps = {
  data: IDetail[]
}

export default function TransactionCarousel({ data }: TransactionCarouselProps) {
  return (
    <div className="w-full px-8">
      <CardTitle className="text-xl font-semibold mb-4">Detail Transaksi</CardTitle>

      <Carousel className="w-full " opts={{ align: "start", loop: true }}>
        <CarouselContent>
          {data?.map((trx: any, index: number) => (
            <CarouselItem
              key={trx.id}
              className="basis-1/1 sm:basis-1/2 md:basis1/3 lg:basis-1/4"
            >
              <Card className="relative overflow-hidden rounded-2xl border bg-card/50 backdrop-blur-sm p-5 shadow-sm hover:shadow-md transition-all duration-300">
                {trx.dibayar === "dibayar" ? 
                <div className="absolute -top-6 left-30 w-32 h-32 bg-emerald-500/40 rounded-full blur-3xl pointer-events-none" />
                :
                <div className="absolute -top-6 left-30 w-32 h-32 bg-yellow-500/40 rounded-full blur-3xl pointer-events-none" />
                }

                <div className="flex items-center justify-between mb-4">
                  <CardTitle className="text-base font-semibold text-foreground">
                    Transaksi #{trx.id}
                  </CardTitle>

                  <span
                    className={cn(
                      "text-[10px] px-2 py-1 rounded-full font-medium tracking-wide",
                      trx.dibayar === "dibayar"
                        ? "bg-emerald-500/15 text-emerald-500"
                        : "bg-yellow-500/15 text-yellow-500"
                    )}
                  >
                    {trx.dibayar === "dibayar" ? "Dibayar" : "Belum"}
                  </span>
                </div>

                <CardContent className="text-sm text-muted-foreground flex flex-col gap-2 pt-0">

                  {/* <div className="flex justify-between">
                    <span className="text-muted-foreground">Outlet</span>
                    <span className="font-medium text-foreground">{trx.id_outlet}</span>
                  </div> */}

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Paket</span>
                    <span className="font-medium text-foreground">{trx.id_paket}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-muted-foreground">Jumlah</span>
                    <span className="font-medium text-foreground">{trx.qty}</span>
                  </div>

                  <div className="flex flex-col mt-2">
                    <span className="text-muted-foreground text-xs">Keterangan</span>
                    <span className="text-foreground text-sm">{trx.keterangan}</span>
                  </div>

                </CardContent>
              </Card>
            </CarouselItem>

          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
