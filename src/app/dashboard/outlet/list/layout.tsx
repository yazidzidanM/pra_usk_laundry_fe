export default function ListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-y-hidden">
      
      <main className="w-full xl:w-3/4 h-full overflow-y-auto xl:pr-4">
        {children}
      </main>

      <aside className="w-0 xl:w-1/4 h-full border-l xl:p-4">
      </aside>
    </div>
  );
}
