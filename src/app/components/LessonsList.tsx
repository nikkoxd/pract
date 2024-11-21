"use client";

import { useRouter, useSearchParams } from "next/navigation";

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
  const router = useRouter();
  const searchParams = useSearchParams();
  const length = lessons?.length;

  function handleClick(lesson_id: string) {
    if (searchParams.get("lesson")) return;

    let newSearchParams = "?";
    for (const [key, value] of searchParams) {
      newSearchParams += `${key}=${value}&`;
    }
    newSearchParams += `lesson=${lesson_id}`;
    router.push(newSearchParams);
  }

  return (
    <ul className="list-decimal list-inside">
      {length ? lessons.map((lesson) => (
        <li key={lesson.lesson_id} className="list-inside list-disc">
          <button onClick={() => handleClick(lesson.lesson_id)} className="text-blue-500 hover:underline">{lesson.Subject.subject_name}</button>
        </li>
      )) : <p>Сегодня занятий нет</p>}
    </ul>
  )
}
