"use client";

import { $Enums } from "@prisma/client";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";

export default function StudentsTable({ lesson, attendances, selectedDate }: {
  lesson: ({
    Group: {
      group_name: string | null;
    };
    Subject: {
      subject_name: string;
    };
  } & {
    teacher_id: string;
    lesson_id: string;
    subject_id: string;
    date: Date;
    group_id: string;
  }) | null,
  attendances: ({
    lesson: {
      lesson_id: string;
      subject_id: string;
      date: Date;
      teacher_id: string;
    };
    student: {
      student_id: string;
      student_name: string;
      group_id: string;
    };
  } & {
    attendance_id: string;
    student_id: string;
    lesson_id: string;
    attendance_status: $Enums.AttendanceStatus;
    comment: string | null;
  })[],
  selectedDate: string
}) {
  const uniqueStudents = [...new Set(attendances.map(attendance => attendance.student.student_id))]
    .map(studentId => {
      const attendance = attendances.find(attendance => attendance.student.student_id === studentId);
      return attendance ? attendance.student : null;
    })
    .filter(student => student !== null); // Filter out null values

  const uniqueLessons = [...new Set(attendances.map(attendance => attendance.lesson.lesson_id))]
    .map(lessonId => {
      const attendance = attendances.find(attendance => attendance.lesson.lesson_id === lessonId);
      return attendance ? attendance.lesson : null;
    })
    .filter(lesson => lesson !== null); // Filter out null values

  const header = lesson ? `${lesson.Subject.subject_name} - ${lesson.Group.group_name}` : "Занятие не выбрано";

  return (
    <section className="col-span-3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
      <h1 className="text-2xl font-bold">{header}</h1>
      <table className="w-full table-auto">
        <thead>
          <tr>
            <TableHeader>ФИО Студента</TableHeader>
            {uniqueLessons.map((lesson, _) => (
              <TableHeader key={lesson.lesson_id} isCurrentDate={lesson.date.toISOString().split('T')[0] === selectedDate}>{lesson.date.getDate()}</TableHeader>
            ))}
          </tr>
        </thead>
        <tbody>
          {uniqueStudents.map((student) => (
            <tr key={student.student_id}>
              <TableCell>{student.student_name}</TableCell>
              {uniqueLessons.map((lesson) => {
                const attendance = attendances.find(
                  (att) => att.student.student_id === student.student_id && att.lesson.lesson_id === lesson.lesson_id
                );
                return (
                  <TableCell key={lesson.lesson_id} status={attendance ? attendance.attendance_status : undefined} isCurrentDate={lesson.date.toISOString().split('T')[0] === selectedDate}>
                    {attendance ? attendance.attendance_status : "Нет данных"}
                  </TableCell>
                );
              })}
            </tr>
          ))}
        </tbody>
      </table>
    </section>
  )
}
