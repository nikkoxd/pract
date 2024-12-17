"use client";

import { Group, Subject } from "@prisma/client";
import { useState } from "react";

export default function LessonPicker({ subjects, groups, createLessonAction }: {
  subjects: Subject[],
  groups: Group[],
  createLessonAction: (_subject_id: string, _date: Date, _group_id: string) => void
}) {
  const [subjectId, setSubjectId] = useState<string>(subjects[0].subject_id);
  const [groupId, setGroupid] = useState<string>(groups[0].group_id);
  const [date, setDate] = useState<Date>(new Date());

  return (
    <div className="flex flex-col gap-2 w-72">
      <select value={subjectId} onChange={e => setSubjectId(e.target.value)} className="border-2 bg-white border-gray-200 dark:border-gray-700 rounded-lg p-2 text-black">
        {subjects.map(subject => (
          <option key={subject.subject_id} value={subject.subject_id}>{subject.subject_name}</option>
        ))}
      </select>
      <select value={groupId} onChange={e => setGroupid(e.target.value)} className="border-2 bg-white border-gray-200 dark:border-gray-700 rounded-lg p-2 text-black">
        {groups.map(group => (
          <option key={group.group_id} value={group.group_id}>{group.group_name}</option>
        ))}
      </select>
      <input type="date" value={date.toISOString().slice(0, 10)} onChange={e => setDate(new Date(e.target.value))} className="border-2 p-2 rounded-lg text-black border-gray-300 dark:border-gray-700 border-solid"/>
      <button onClick={() => createLessonAction(subjectId, date, groupId)} className="p-2 bg-blue-600 rounded-lg">Создать занятие</button>
    </div>
  )
}
