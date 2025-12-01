export function UserTransactionSkeleton() {
  return (
    <div className="p-4 border rounded-md animate-pulse space-y-4">
      <div className="h-5 bg-muted rounded w-2/3"></div>
      <div className="h-4 bg-muted rounded w-1/3"></div>
      <div className="h-4 bg-muted rounded w-1/2"></div>
      <div className="h-10 bg-muted rounded"></div>
    </div>
  );
}
