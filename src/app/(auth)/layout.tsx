import { ModeToggle } from "@/components/common/DarkModeToggle"
import { Shirt } from "lucide-react"
import { ReactNode} from "react"
import { Toaster } from "sonner"

type AuthLayoutProps = {
  children: ReactNode
}

export default function AuthLayout({ children }: AuthLayoutProps) {
  return (
    <div className="relative bg-white dark:bg-muted flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
        <Toaster theme="system" position="top-center"/>
      <div className="absolute top-4 right-4">
        <ModeToggle />
      </div>
      <div className="flex w-full max-w-sm flex-col gap-6">
        <div className="flex items-center self-center gap-2 font-medium">
          <div className="bg-teal-500 flex items-center justigy-center p-2 rounded-md">
            <Shirt className="size-4" />
          </div>
          My Laundry
        </div>
        {children}
      </div>
    </div>
  )
};