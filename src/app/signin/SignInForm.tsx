"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormField from "../components/FormField"
import { signIn } from "next-auth/react"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof FormSchema>

export default function SignInForm() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    const { email, password } = data;

    try {
      const response = await signIn("credentials", {
        email,
        password,
        redirect: false,
      })
      console.log(response);

      if (!response?.error) {
        router.push("/");
        router.refresh();
      }

      if (!response?.ok) {
        throw new Error("Network response was not ok");
      }

      console.log("Sign In Successful", response);
    } catch (error) {
      console.error("Sign In Failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
      <FormField type="email" name="email" placeholder="E-Mail" register={register} error={errors.email} />
      <FormField type="password" name="password" placeholder="Пароль" register={register} error={errors.password} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Войти</button>
    </form>
  )
}
