import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <div>
        <Link href="/" className="font-bold">Электронный журнал посещаемости</Link>
      </div>
      <div className="flex items-center gap-2">
        <p>Иванов Иван Иванович</p>
        <Link href="/signin" className="text-blue-500 hover:underline">Выйти</Link>
      </div>
    </header>
  );
}
