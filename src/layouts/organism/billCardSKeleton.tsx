import { Card, CardContent, CardHeader } from "@/components/ui/card"

export function BillCardSkeleton() {
  return (
    <Card className="w-full max-w-md mx-auto mb-4 border border-neutral-700 bg-neutral-900 animate-pulse">

      <CardHeader className="pb-3">
        <div className="h-5 w-24 bg-neutral-700 rounded mb-2"></div>
        <div className="h-4 w-40 bg-neutral-700 rounded"></div>
      </CardHeader>

      <CardContent className="space-y-4">
        <div className="h-4 bg-neutral-700 rounded w-1/3"></div>
        <div className="h-4 bg-neutral-700 rounded w-2/3"></div>

        <div className="h-4 bg-neutral-700 rounded w-1/2 mt-4"></div>
        <div className="h-6 bg-neutral-700 rounded w-full"></div>
      </CardContent>

    </Card>
  );
}
