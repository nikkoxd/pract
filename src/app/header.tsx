import Link from "next/link";
import { getServerSession } from "next-auth";
import SignOutButton from "./components/SignOutButton";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">Электронный журнал посещаемости</Link>
      <div className="flex items-center gap-2">
        <p>{session?.user?.email}</p>
        <SignOutButton />
      </div>
    </header>
  );
}
