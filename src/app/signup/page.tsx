import Link from "next/link"
import SignUpForm from "./SignUpForm"
import { getServerSession } from "next-auth";
import { redirect } from "next/navigation";

export default async function SignUp() {
  const session = await getServerSession();

  if (session) {
    redirect("/")
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
        <h1 className="dark:text-white text-2xl font-bold">Регистрация</h1>
        <SignUpForm />
        <p className="text-gray-400 text-sm">Уже есть аккаунт? <Link href="signin" className="text-blue-500 hover:underline">Войти</Link></p>
      </section >
    </main >
  )
}
