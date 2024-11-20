"use client";

import Link from "next/link";

export default function LessonsList({ lessons }: {
  lessons: {
    Subject: {
      subject_name: string;
    },
    teacher_id: string;
    lesson_id: string;
    subject_id: string;
    date: Date;
  }[] | undefined
}) {
  return (
    <ul className="list-decimal list-inside">
      {lessons ? lessons.map((lesson) => (
        <li key={lesson.lesson_id} className="list-inside list-disc">
          <Link href={`/lesson/${lesson.lesson_id}`} className="text-blue-500 hover:underline">{lesson.Subject.subject_name}</Link>
        </li>
      )) : <p>Сегодня занятий нет</p>}
    </ul>
  )
}
