import prisma from "@/lib/prisma"

async function getUsers() {
  const users = await prisma.user.findMany({
    include: {
      Teacher: true,
    }
  });

  return users;
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
            <tr key={user.id}>
              <td className="py-2 px-4 border-b">{user.id}</td>
              <td className="py-2 px-4 border-b">{user.email}</td>
              <td className="py-2 px-4 border-b">
                <select className="bg-transparent" value={user.role}>
                  <option value="ADMIN">Администратор</option>
                  <option value="TEACHER">Преподаватель</option>
                </select>
              </td>
              <td className="py-2 px-4 border-b">
                <select className="bg-transparent" value={user.Teacher ? user.Teacher.teacher_id : "none"}>
                  <option value="none">Нет</option>
                  {teachers.map((teacher) => (
                    <option key={teacher.teacher_id} value={teacher.teacher_id}>{teacher.teacher_name}</option>
                  ))}
                </select>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  )
}
