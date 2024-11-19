import Link from "next/link"
import { getServerSession } from "next-auth"
import SignInForm from "./SignInForm"
import { redirect } from "next/navigation";

export default async function SignIn() {
  const session = await getServerSession();

  if (session) {
    redirect("/")
  }

  return (
    <main className="h-screen flex items-center justify-center">
      <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
        <h1 className="dark:text-white text-2xl font-bold">Вход</h1>
        <SignInForm />
        <p className="text-gray-400 text-sm">Нет аккаунта? <Link href="signup" className="text-blue-500 hover:underline">Зарегистрироваться</Link></p>
      </section >
    </main >
  )
}
