import { Skeleton } from "@/components/ui/skeleton";

export function SummaryCardSkeleton() {
  return (
    <div className="border rounded-xl p-4 shadow-sm">
      <Skeleton className="h-4 w-24 mb-3" />
      <Skeleton className="h-6 w-32" />
    </div>
  );
}
