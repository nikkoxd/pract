"use client"

import Link from "next/link"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof FormSchema>

export default function SignUp() {
  const { register, handleSubmit, watch, formState: { errors } } = useForm({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      email: "",
      password: "",
    },
  })

  const onSubmit = async (data: FormData) => {
    console.log("Submitting form", data);

    const { email, password } = data;

    try {
      const response = await fetch("/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
      if (!response.ok) {
        throw new Error("Network response was not ok");
      }
      // Process response here
      console.log("Registration Successful", response);
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  return (
    <main className="h-screen flex items-center justify-center">
      <section className="bg-gray-800 p-5 rounded-lg">
        <h1 className="text-white text-2xl font-bold">Регистрация</h1>
        <form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
          <input {...register("email")} type="text" placeholder="E-Mail" className="border-2 border-gray-700 rounded-lg p-2 text-black" />
          {errors.email && <p className="text-red-500">{errors.email.message}</p>}
          <input {...register("password")} type="password" placeholder="Пароль" className="border-2 border-gray-700 rounded-lg p-2 text-black" />
          {errors.password && <p className="text-red-500">{errors.password.message}</p>}
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Зарегистрироваться</button>
        </form>
        <p className="text-gray-400 text-sm">Уже есть аккаунт? <Link href="login" className="text-blue-500 hover:underline">Войти</Link></p>
      </section >
    </main >
  )
}
