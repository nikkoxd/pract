import { PrismaClient } from '@prisma/client';

// const prismaClientSingleton = () => {
//   return new PrismaClient();
// }

// declare const globalThis: {
//   prismaGlobal: ReturnType<typeof prismaClientSingleton>;
// } & typeof global;

const prisma = new PrismaClient().$extends({
  query: {
    lesson: {
      async create({ args, query }) {
        const createdLesson = await query(args);

        const students = await prisma.student.findMany({
          where: {
            group_id: args.data.group_id,
          }
        })

        students.forEach(async (student) => {
          await prisma.attendance.create({
            data: {
              student: {
                connect: {
                  student_id: student.student_id,
                }
              },
              lesson: {
                connect: {
                  lesson_id: createdLesson.lesson_id,
                }
              },
              attendance_status: "PRESENT",
            }
          })
        })

        return createdLesson;
      }
    }
  }
})

export default prisma;

// if (process.env.NODE_ENV !== 'production') globalThis.prismaGlobal = prisma;
