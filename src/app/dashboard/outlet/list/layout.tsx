export default function ListLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full h-full overflow-y-hidden">
      
      <main className="w-3/4 h-full overflow-y-auto pr-4">
        {children}
      </main>

      <aside className="w-1/4 h-full border-l p-4">
      </aside>
    </div>
  );
}
