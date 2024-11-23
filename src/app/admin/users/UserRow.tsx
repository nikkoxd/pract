'use client';

import { $Enums } from '@prisma/client';
import { useState } from 'react';

function UserRow({ user, teachers, updateUserRole, updateUserTeacher }: {
  user: {
    Teacher: {
      teacher_id: string;
      email: string;
      teacher_name: string;
      faculty_id: string
    } | null;
  } & {
    role: $Enums.UserRole;
    id: string;
    email: string;
    password: string;
  },
  teachers: {
    teacher_id: string;
    teacher_name: string;
    faculty_id: string;
    email: string;
  }[],
  updateUserRole: (_id: string, _role: $Enums.UserRole) => Promise<void>,
  updateUserTeacher: (_id: string, _teacherId: string) => Promise<void>
}) {
  const [role, setRole] = useState<$Enums.UserRole>(user.role);
  const [teacherId, setTeacherId] = useState(user.Teacher ? user.Teacher.teacher_id : "none");

  const handleRoleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setRole(e.target.value as $Enums.UserRole);
    updateUserRole(user.id, e.target.value as $Enums.UserRole);
  };

  const handleTeacherChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    setTeacherId(e.target.value);
    updateUserTeacher(user.id, e.target.value);
  };

  return (
    <tr key={user.id}>
      <td className="py-2 px-4 border-b">{user.id}</td>
      <td className="py-2 px-4 border-b">{user.email}</td>
      <td className="py-2 px-4 border-b">
        <select className="bg-transparent" onChange={handleRoleChange} value={role}>
          <option value="ADMIN">Администратор</option>
          <option value="TEACHER">Преподаватель</option>
        </select>
      </td>
      <td className="py-2 px-4 border-b">
        <select className="bg-transparent" onChange={handleTeacherChange} value={teacherId}>
          <option value="none">Нет</option>
          {teachers.map((teacher) => (
            <option key={teacher.teacher_id} value={teacher.teacher_id}>{teacher.teacher_name}</option>
          ))}
        </select>
      </td>
    </tr>
  );
}

export default UserRow;

