import { getServerSession, Session } from "next-auth";
import Header from "./components/Header";
import prisma from "@/lib/prisma";
import DateInput from "./components/DateInput";
import LessonsList from "./components/LessonsList";
import { redirect } from "next/navigation";
import StudentsTable from "./components/StudentsTable";
import { $Enums } from "@prisma/client";

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
      },
      Group: {
        select: {
          group_name: true,
        }
      }
    }
  });

  return lessons;
}

async function getLessonFromParams(searchParams: { [key: string]: string | string[] | undefined } | undefined) {
  const lessonId = searchParams?.lesson as string;

  if (!lessonId) return null;

  const lesson = await prisma.lesson.findUnique({
    where: {
      lesson_id: lessonId,
    },
    include: {
      Subject: {
        select: {
          subject_name: true,
        }
      },
      Group: {
        select: {
          group_name: true,
        }
      }
    }
  });

  return lesson;
}

async function getAttendancesForGroup(groupId: string) {
  const startOfMonth = new Date();
  startOfMonth.setDate(1);
  startOfMonth.setHours(0, 0, 0, 0);

  const endOfMonth = new Date();
  endOfMonth.setMonth(endOfMonth.getMonth() + 1);
  endOfMonth.setDate(0);
  endOfMonth.setHours(23, 59, 59, 999);

  const attendances = await prisma.attendance.findMany({
    where: {
      student: {
        group_id: groupId,
      },
      lesson: {
        date: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
    },
    include: {
      student: true,
      lesson: true,
    },
  });

  return attendances;
}

async function updateAttendanceStatusAction(attendanceId: string, newStatus: string) {
  "use server";

  await prisma.attendance.update({
    where: { attendance_id: attendanceId },
    data: { attendance_status: newStatus as $Enums.AttendanceStatus },
  });
}

export default async function Home(
  props: {
    searchParams?: Promise<{ [key: string]: string | string[] | undefined }>
  }
) {
  const searchParams = await props.searchParams;
  const session = await getServerSession();

  if (!session) {
    redirect("/signin");
  }

  const selectedDate = searchParams?.date as string || new Date().toISOString().split('T')[0];

  const lessons = await getLessons(session, new Date(selectedDate));
  const lesson = await getLessonFromParams(searchParams);
  const attendances = await getAttendancesForGroup(searchParams?.group as string);

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
        <StudentsTable
          lesson={lesson}
          attendances={attendances}
          selectedDate={selectedDate}
          updateAttendanceStatusAction={updateAttendanceStatusAction}
        />
      </main>
    </>
  );
}
