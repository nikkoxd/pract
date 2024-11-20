"use client"

import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import { z } from "zod"
import FormField from "../components/FormField"
import { useRouter } from "next/navigation"

const FormSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
})

type FormData = z.infer<typeof FormSchema>

export default function SignUp() {
  const router = useRouter();

  const { register, handleSubmit, formState: { errors } } = useForm({
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
      router.push("/signin");
      router.refresh();
    } catch (error) {
      console.error("Registration Failed:", error);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="my-4 flex flex-col gap-2">
      <FormField type="email" name="email" placeholder="E-Mail" register={register} error={errors.email} />
      <FormField type="password" name="password" placeholder="Пароль" register={register} error={errors.password} />
      <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Зарегистрироваться</button>
    </form>
  )
}
