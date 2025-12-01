import { Card } from "@/components/ui/card";

export default function HorizontalCardListSkeleton({ count = 4 }) {
  return (
    <div className="space-y-4">
      {Array.from({ length: count }).map((_, index) => (
        <Card
          key={index}
          className="flex flex-row items-start gap-4 p-4 shadow-sm animate-pulse"
        >
          <div className="h-36 w-36 min-w-36 rounded-lg bg-gray-300 dark:bg-gray-700" />

          <div className="flex flex-col flex-1 space-y-5">
            <div className="h-6 w-1/3 bg-gray-300 rounded dark:bg-gray-700"></div>
            
            <div className="space-y-2">
              <div className="h-5 w-2/3 bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="h-5 w-2/3 bg-gray-300 rounded dark:bg-gray-700"></div> 
              <div className="h-4 w-full bg-gray-300 rounded dark:bg-gray-700"></div>
              <div className="h-5 w-1/2 bg-gray-300 rounded dark:bg-gray-700"></div>
            </div>
          </div>
        </Card>
      ))}
    </div>
  );
}
