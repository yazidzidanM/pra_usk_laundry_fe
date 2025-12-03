import { Skeleton } from "@/components/ui/skeleton";
import { SummaryCardSkeleton } from "../molecules/summarySkeleton";
import { FiltersSkeleton } from "../molecules/filterSkeleton";
import { ChartSkeleton } from "../molecules/chartSkeleton";
import { TableSkeleton } from "../molecules/tableSkeleton";


export default function PageSkeleton() {
  return (
    <div className="p-6 space-y-6 animate-pulse">
      <Skeleton className="h-6 w-48" />

      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
        <SummaryCardSkeleton />
      </div>

      <FiltersSkeleton />

      <ChartSkeleton />

      <TableSkeleton />
    </div>
  );
}
