import { getServerSession, Session } from "next-auth";
import Header from "../components/Header";
import prisma from "@/lib/prisma";
import { $Enums } from "@prisma/client";
import { redirect } from "next/navigation";
import Link from "next/link";

async function getUser(session: Session) {
  if (!session.user?.email) return;

  const user = await prisma.user.findUnique({
    where: {
      email: session.user?.email
    }
  })

  return user;
}

async function checkAdmin(session: Session) {
  const user = await getUser(session);
  if (!user) return false;

  return user.role === $Enums.UserRole.ADMIN;
}

export default async function AdminLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  if (!await checkAdmin(session)) {
    redirect("/");
  }

  return (
    <>
      <Header />
      <main className="container mx-auto grid grid-cols-4 gap-4">
        <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
          <h1 className="text-xl font-bold">Модели</h1>
          <ul className="list-disc list-inside ml-4">
            <li><Link href="/admin/users/" className="text-blue-500 hover:underline">Пользователи</Link></li>
            <li><Link href="/admin/attendances/" className="text-blue-500 hover:underline">Посещения</Link></li>
            <li><Link href="/admin/faculties/" className="text-blue-500 hover:underline">Факультеты</Link></li>
            <li><Link href="/admin/groups/" className="text-blue-500 hover:underline">Группы</Link></li>
            <li><Link href="/admin/lessons/" className="text-blue-500 hover:underline">Занятия</Link></li>
            <li><Link href="/admin/students/" className="text-blue-500 hover:underline">Студенты</Link></li>
            <li><Link href="/admin/subjects/" className="text-blue-500 hover:underline">Предметы</Link></li>
            <li><Link href="/admin/teachers/" className="text-blue-500 hover:underline">Преподаватели</Link></li>
          </ul>
        </section>
        <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg col-span-3">
          {children}
        </section>
      </main >
    </>
  )
}
