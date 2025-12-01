export function AdminTransactionSkeleton() {
  return (
    <div className="animate-pulse border rounded p-4 space-y-4">
      <div className="h-6 w-40 bg-muted rounded"></div>

      {Array.from({ length: 4 }).map((_, i) => (
        <div key={i} className="grid grid-cols-6 gap-4">
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-4 bg-muted rounded"></div>
          <div className="h-8 bg-muted rounded"></div>
        </div>
      ))}
    </div>
  );
}
