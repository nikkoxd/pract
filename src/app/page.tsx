import { getServerSession, Session } from "next-auth";
import TableCell from "./components/TableCell";
import TableHeader from "./components/TableHeader";
import Header from "./header";
import prisma from "@/lib/prisma";
import DateInput from "./components/DateInput";
import LessonsList from "./components/LessonsList";
import { redirect } from "next/navigation";

async function getTeacher(session: Session) {
  if (!session.user?.email) return;

  const teacher = await prisma.teacher.findUnique({
    where: {
      email: session.user?.email
    }
  })

  return teacher;
}

async function getLessons(session: Session, date: Date) {
  const teacher = await getTeacher(session);

  if (!teacher) return;

  const lessons = await prisma.lesson.findMany({
    where: {
      teacher_id: teacher.teacher_id,
      date: date,
    },
    include: {
      Subject: {
        select: {
          subject_name: true,
        }
      }
    }
  });

  console.log(date);
  console.log(lessons);

  return lessons;
}

export default async function Home({
  searchParams
}: {
  searchParams?: { [key: string]: string | string[] | undefined }
}) {
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  const selectedDate = await searchParams?.date as string || new Date().toISOString().split('T')[0];

  const lessons = await getLessons(session, new Date(selectedDate));

  return (
    <>
      <Header />
      <main className="container mx-auto grid grid-cols-4 gap-4">
        <section className="bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <h1 className="text-xl font-bold">Занятия</h1>
            <DateInput initialDate={selectedDate} />
          </div>
          <LessonsList lessons={lessons} />
        </section>
        <section className="col-span-3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
          <h1 className="text-2xl font-bold">Базы данных - Б22-191-1</h1>
          <table className="w-full table-auto">
            <thead>
              <tr>
                <TableHeader>ФИО Участника</TableHeader>
                <TableHeader>1</TableHeader>
                <TableHeader>2</TableHeader>
                <TableHeader>3</TableHeader>
              </tr>
            </thead>
            <tbody>
              <tr>
                <TableCell>Иванов Иван Иванович</TableCell>
                <TableCell>+</TableCell>
                <TableCell>+</TableCell>
                <TableCell>+</TableCell>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </>
  );
}
