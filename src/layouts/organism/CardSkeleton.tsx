import { Card, CardContent, CardHeader } from "@/components/ui/card";

export const CardSkeleton = () => {
  return (
    <Card className="w-full max-w-md mx-auto mb-6 shadow-sm animate-pulse">
      
      <CardHeader className="flex flex-col gap-3">
        <div className="h-5 w-24 bg-gray-300 dark:bg-neutral-700 rounded-full"></div>

        <div className="space-y-1">
          <div className="h-5 w-32 bg-gray-300 dark:bg-neutral-700 rounded"></div>
          <div className="h-4 w-40 bg-gray-200 dark:bg-neutral-800 rounded"></div>
        </div>
      </CardHeader>

      <CardContent className="space-y-5">

        <div className="grid grid-cols-2 gap-y-3 text-sm">

          {Array.from({ length: 10 }).map((_, i) => (
            <div key={i} className="flex flex-col gap-1">
              <div className="h-3 w-20 bg-gray-300 dark:bg-neutral-700 rounded"></div>
              <div className="h-4 w-full bg-gray-200 dark:bg-neutral-800 rounded"></div>
            </div>
          ))}

        </div>

        <div className="h-10 w-full bg-gray-300 dark:bg-neutral-700 rounded-lg"></div>

      </CardContent>
    </Card>
  );
};
