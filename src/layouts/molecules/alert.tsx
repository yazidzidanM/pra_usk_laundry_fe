import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";
import { AlertCircleIcon } from "lucide-react";

export default function AlertPayment() {
  return (
    <>
    <Alert variant="destructive">
      <AlertCircleIcon />
      <AlertTitle>The order get start when the payment are complete.</AlertTitle>
      <AlertDescription>
        <p>Please complete the payment first.</p>
        <ul className="list-inside list-disc text-sm">
          <li>Go to my transaction, go to bill </li>
          <li>Click button of pay, and</li>
          <li>Select a payment method whatever you want</li>
        </ul>
      </AlertDescription>
    </Alert>
    </>
  )
}