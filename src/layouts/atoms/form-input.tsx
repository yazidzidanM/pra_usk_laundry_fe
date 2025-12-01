import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { UseFormRegisterReturn } from "react-hook-form";

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  placeholder?: string;
  register: UseFormRegisterReturn;
}

export function FormInput({ label, type = "text", placeholder, register }: FormInputProps) {
  return (
    <div className="flex flex-col gap-1">
      <Label>{label}</Label>
      <Input
        type={type}
        placeholder={placeholder}
        {...register}
      />
    </div>
  );
}
