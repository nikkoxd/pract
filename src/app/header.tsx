import Link from "next/link";
import { getServerSession } from "next-auth";
import UserInfo from "./components/UserInfo";

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">Электронный журнал посещаемости</Link>
      <UserInfo session={session} />
    </header>
  );
}
