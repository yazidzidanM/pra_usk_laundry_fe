// components/paket/PaketCardSkeleton.tsx

import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export function PaketCardSkeleton() {
  return (
    <Card className="shadow-sm border">
      <CardHeader>
        <Skeleton className="h-2.5 w-20" />
      </CardHeader>

      <CardContent className="space-y-2">
        <Skeleton className="h-2 w-14" />
        <Skeleton className="h-2 w-16" />
        <Skeleton className="h-2 w-12" />
      </CardContent>

      <CardFooter className="flex justify-between">
        <Skeleton className="h-4 w-10" />
        <Skeleton className="h-4 w-10" />
      </CardFooter>
    </Card>
  );
}

export function PaketCardSkeletonList({ count = 8 }: { count?: number }) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
      {Array.from({ length: count }).map((_, i) => (
        <PaketCardSkeleton key={i} />
      ))}
    </div>
  );
}
