"use client";

import { useEffect, useState } from 'react';
import { $Enums } from "@prisma/client";
import TableCell from "./TableCell";
import TableHeader from "./TableHeader";
import Papa from "papaparse";
import * as XLSX from "xlsx";

export default function StudentsTable({ lesson, attendances, selectedDate, updateAttendanceStatusAction }: {
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
  })[] | undefined,
  selectedDate: string,
  updateAttendanceStatusAction: (_attendanceId: string, _newStatus: string) => Promise<void>
}) {
  const [attendanceData, setAttendanceData] = useState(attendances);

  useEffect(() => {
    setAttendanceData(attendances);
  }, [attendances]);

  const uniqueStudents = [...new Set(attendanceData?.map(attendance => attendance.student.student_id))]
    .map(studentId => {
      const attendance = attendanceData?.find(attendance => attendance.student.student_id === studentId);
      return attendance ? attendance.student : null;
    })
    .filter(student => student !== null); // Filter out null values

  const uniqueLessons = [...new Set(attendanceData?.map(attendance => attendance.lesson.lesson_id))]
    .map(lessonId => {
      const attendance = attendanceData?.find(attendance => attendance.lesson.lesson_id === lessonId);
      return attendance ? attendance.lesson : null;
    })
    .filter(lesson => lesson !== null); // Filter out null values

  const header = lesson ? `${lesson.Subject.subject_name} - ${lesson.Group.group_name}` : "Занятие не выбрано";

  const handleAttendanceChange = async (newStatus: string, attendanceId: string) => {
    // Update the local state
    setAttendanceData(prevData =>
      prevData?.map(attendance =>
        attendance.attendance_id === attendanceId
          ? { ...attendance, attendance_status: newStatus as $Enums.AttendanceStatus }
          : attendance
      )
    );

    // Update the database
    await updateAttendanceStatusAction(attendanceId, newStatus);
  };

  const exportToCSV = () => {
    const attendanceStatusMap = {
      PRESENT: "Присутствует",
      ABSENT: "Отсутствует",
      LATE: "Опоздал",
      "Нет данных": "Нет данных"
    };

    const csvData = uniqueStudents.map(student => {
      const row = [student.student_name];
      uniqueLessons.forEach(lesson => {
        const attendance = attendanceData.find(
          att => att.student.student_id === student.student_id && att.lesson.lesson_id === lesson.lesson_id
        );
        const status = attendance ? attendance.attendance_status : "Нет данных";
        row.push(attendanceStatusMap[status]);
      });
      const presentCount = attendanceData.filter(att => att.student.student_id === student.student_id && att.attendance_status === "PRESENT").length;
      const absentCount = attendanceData.filter(att => att.student.student_id === student.student_id && att.attendance_status === "ABSENT").length;
      const lateCount = attendanceData.filter(att => att.student.student_id === student.student_id && att.attendance_status === "LATE").length;
      row.push(presentCount.toString(), absentCount.toString(), lateCount.toString());
      return row;
    });

    const headers = ["ФИО студента", ...uniqueLessons.map(lesson => lesson.date.toISOString().split('T')[0]), "Присутствует", "Отсутствует", "Опоздал"];
    const rows = [headers, ...csvData];

    const csv = rows.map(row => row.map(cell => `"${cell}"`).join(';')).join('\n');

    const bom = "\uFEFF";
    const csvWithBOM = bom + csv;

    const csvBlob = new Blob([csvWithBOM], { type: 'text/csv;charset=utf-8;' });
    const link = document.createElement('a');
    link.href = URL.createObjectURL(csvBlob);
    link.setAttribute('download', 'attendance.csv');
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  const exportToXLSX = () => {
    const attendanceStatusMap = {
      PRESENT: "Присутствует",
      ABSENT: "Отсутствует",
      LATE: "Опоздал",
      "Нет данных": "Нет данных"
    };

    const wsData = [
      ["ФИО студента", ...uniqueLessons.map(lesson => lesson.date.toISOString().split('T')[0]), "Присутствует", "Отсутствует", "Опоздал"],
      ...uniqueStudents.map(student => {
        const row = [student.student_name];
        uniqueLessons.forEach(lesson => {
          const attendance = attendanceData.find(
            att => att.student.student_id === student.student_id && att.lesson.lesson_id === lesson.lesson_id
          );
          const status = attendance ? attendance.attendance_status : "Нет данных";
          row.push(attendanceStatusMap[status]);
        });
        const presentCount = attendanceData.filter(att => att.student.student_id === student.student_id && att.attendance_status === "PRESENT").length;
        const absentCount = attendanceData.filter(att => att.student.student_id === student.student_id && att.attendance_status === "ABSENT").length;
        const lateCount = attendanceData.filter(att => att.student.student_id === student.student_id && att.attendance_status === "LATE").length;
        row.push(presentCount.toString(), absentCount.toString(), lateCount.toString());
        return row;
      })
    ];

    const wb = XLSX.utils.book_new();
    const ws = XLSX.utils.aoa_to_sheet(wsData);
    XLSX.utils.book_append_sheet(wb, ws, 'Attendance');
    XLSX.writeFile(wb, 'attendance.xlsx');
  };


  return (
    <section className="col-span-3 bg-gray-100 dark:bg-gray-800 p-5 rounded-lg">
      <h1 className="text-2xl font-bold">{header}</h1>
      {attendanceData ?
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
                  const attendance = attendanceData.find(
                    (att) => att.student.student_id === student.student_id && att.lesson.lesson_id === lesson.lesson_id
                  );
                  return (
                    <TableCell
                      key={lesson.lesson_id}
                      status={attendance ? attendance.attendance_status : undefined}
                      isCurrentDate={lesson.date.toISOString().split('T')[0] === selectedDate}
                      onChange={handleAttendanceChange}
                      attendanceId={attendance ? attendance.attendance_id : undefined}
                    >
                      {attendance ? attendance.attendance_status : "Нет данных"}
                    </TableCell>
                  );
                })}
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-4">
          <button onClick={exportToCSV} className="bg-blue-500 text-white px-4 py-2 rounded mr-2">Загрузить в CSV</button>
          <button onClick={exportToXLSX} className="bg-green-500 text-white px-4 py-2 rounded">Загрузить в XLSX</button>
        </div>
        :
        <p>Нет данных</p>
      }
    </section>
  );
}

