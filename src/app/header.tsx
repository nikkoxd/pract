import Link from "next/link";
import { getServerSession, Session } from "next-auth";
import SignOutButton from "./components/SignOutButton";
import prisma from "@/lib/prisma";

async function getUserName(session: Session) {
  if (!session.user?.email) return;

  const teacher = await prisma.teacher.findUnique({
    where: {
      email: session.user?.email
    }
  })

  if (!teacher) return session.user?.email;
  return teacher.teacher_name;
}

export default async function Header() {
  const session = await getServerSession();

  return (
    <header className="container mx-auto py-4 flex items-center justify-between">
      <Link href="/" className="font-bold">Электронный журнал посещаемости</Link>
      <div className="flex items-center gap-2">
        <p>{getUserName(session!)}</p>
        <SignOutButton />
      </div>
    </header>
  );
}
