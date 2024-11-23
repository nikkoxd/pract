import prisma from "@/lib/prisma"
import UserRow from "./UserRow";
import { $Enums } from "@prisma/client";

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      Teacher: true,
    }
  });

  return users;
}

async function updateUserRole(id: string, role: $Enums.UserRole) {
  "use server";

  try {
    await prisma.user.update({
      where: { id },
      data: { role },
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function updateUserTeacher(id: string, teacherId: string) {
  "use server";

  try {
    await prisma.user.update({
      where: { id },
      data: { Teacher: { connect: { teacher_id: teacherId } } },
    });
  } catch (error) {
    console.error("Error updating user:", error);
  }
}

async function getTeachers() {
  const teachers = await prisma.teacher.findMany();

  return teachers;
}

export default async function AdminUsers() {
  const users = await getUsers();
  const teachers = await getTeachers();

  return (
    <>
      <h1 className="text-xl font-bold">Пользователи</h1>
      <table className="min-w-full">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-left">ID</th>
            <th className="py-2 px-4 border-b text-left">Email</th>
            <th className="py-2 px-4 border-b text-left">Роль</th>
            <th className="py-2 px-4 border-b text-left">Преподаватель</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <UserRow
              key={user.id}
              user={user}
              teachers={teachers}
              updateUserRole={updateUserRole}
              updateUserTeacher={updateUserTeacher}
            />
          ))}
        </tbody>
      </table>
    </>
  )
}
