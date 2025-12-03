import { Skeleton } from "@/components/ui/skeleton";

export function FiltersSkeleton() {
  return (
    <div className="flex gap-4">
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
      <Skeleton className="h-10 w-32" />
    </div>
  );
}
