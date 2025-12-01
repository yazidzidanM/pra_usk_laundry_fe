import { getUserFromCookie } from "@/stores/auth-store";
import History from "./_components/history";
import AlertPayment from "@/layouts/molecules/alert";

export default async function HistoryPage() {
  const user = await getUserFromCookie()
  return (
    <div className="relative h-full w-full">
      <History user={user} />

      <div className="absolute bottom-3 right-3">
        <div className="group relative">
          <div className="bg-red-500 w-10 h-10 rounded-full flex items-center justify-center text-white shadow-lg cursor-pointer">
            !
          </div>

          <div className="absolute bottom-full right-0 mb-2 w-96 opacity-0 group-hover:opacity-100 pointer-events-none group-hover:pointer-events-auto transition-all duration-300 z-50">
            <AlertPayment />
          </div>
        </div>
      </div>
    </div>
  );

}
