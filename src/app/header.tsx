import Link from "next/link";

export default function Header() {
  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">Электронный журнал посещаемости</Link>
    </header>
  );
}
