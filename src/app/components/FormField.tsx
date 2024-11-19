import { FieldError, UseFormRegister } from "react-hook-form"

export default function FormField(
  {
    type,
    name,
    placeholder,
    register,
    error
  }: {
    type: string,
    name: string,
    placeholder: string,
    register: UseFormRegister<any>,
    error: FieldError | undefined
  }
) {
  return (
    <>
      <input {...register(name)} type={type} placeholder={placeholder} className="border-2 border-gray-200 dark:border-gray-700 rounded-lg p-2 text-black" />
      {error && <p className="text-red-500">{error.message}</p>}
    </>
  )
}
