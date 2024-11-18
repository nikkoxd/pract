import Link from "next/link"

export default function Login() {
  return (
    <main className="h-screen flex items-center justify-center">
      <section className="bg-gray-800 p-5 rounded-lg">
        <h1 className="text-white text-2xl font-bold">Авторизация</h1>
        <form className="my-4 flex flex-col gap-2">
          <input type="text" placeholder="E-Mail" name="email" className="border-2 border-gray-700 rounded-lg p-2" />
          <input type="password" placeholder="Пароль" name="password" className="border-2 border-gray-700 rounded-lg p-2" />
          <button className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg">Войти</button>
        </form>
        <p className="text-gray-400 text-sm">Забыли пароль? <Link href="#" className="text-blue-500 hover:underline">Восстановить</Link></p>
        <p className="text-gray-400 text-sm">Нет аккаунта? <Link href="register" className="text-blue-500 hover:underline">Зарегистрироваться</Link></p>
      </section >
    </main >
  )
}
