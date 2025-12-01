import { AlertCircleIcon, CheckCircle2Icon, PopcornIcon } from "lucide-react"

import {
  Alert,
  AlertDescription,
  AlertTitle,
} from "@/components/ui/alert"

interface AlertProps {
  Title: string,
  Description?: string,
  errors?: string[]
}

export function AlertSuccess({
  Title,
  Description,
}: AlertProps) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <CheckCircle2Icon />
        <AlertTitle>{Title}</AlertTitle>
        <AlertDescription>
          {Description}
        </AlertDescription>
      </Alert>
    </div>
  )
}

export function AlertInfo({
  Title,
}: AlertProps) {
  return (
    <div className="grid w-full max-w-xl items-start gap-4">
      <Alert>
        <PopcornIcon />
        <AlertTitle>
          {Title}
        </AlertTitle>
      </Alert>
    </div>
  )
}

// export function AlertError({
//   Title,
//   Description,
//   errors,
// }: AlertProps) {
//   return (
//     <div className="grid w-full max-w-xl items-start gap-4">
//       <Alert variant="destructive">
//         <AlertCircleIcon />
//         <AlertTitle>{Title}</AlertTitle>
//         <AlertDescription>
//           <p>{Description}</p>
//           <ul className="list-inside list-disc text-sm text-red-500">
//             {Object.values(errors).map((err, i) => (
//               <li key={i}>{err?.message}</li>
//             ))}
//           </ul>
//         </AlertDescription>
//       </Alert>
//     </div>
//   )
// }