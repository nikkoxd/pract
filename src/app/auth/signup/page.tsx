import Link from "next/link"

export default function SignUp() {
  return (
    <main className="h-screen flex items-center justify-center">
      <section className="bg-gray-800 p-5 rounded-lg">
        <h1 className="text-white text-2xl font-bold">Регистрация</h1>
        <form className="my-4 flex flex-col gap-2">
          <input type="text" placeholder="E-Mail" name="email" className="border-2 border-gray-700 rounded-lg p-2" />
          <input type="password" placeholder="Пароль" name="password" className="border-2 border-gray-700 rounded-lg p-2" />
          <input type="password" placeholder="Повторите пароль" name="password-confirmation" className="border-2 border-gray-700 rounded-lg p-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Зарегистрироваться</button>
        </form>
        <p className="text-gray-400 text-sm">Уже есть аккаунт? <Link href="login" className="text-blue-500 hover:underline">Войти</Link></p>
      </section >
    </main >
  )
}
