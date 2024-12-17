import prisma from "@/lib/prisma"
import LessonPicker from "./LessonPicker";

export default async function AdminPage() {
  async function getSubjects() {
    const subjects = await prisma.subject.findMany();

    return subjects;
  }

  async function getGroups() {
    const groups = await prisma.group.findMany();

    return groups;
  }

  async function createLessonAction(subject_id: string, date: Date, group_id: string) {
    "use server";

    const subject = await prisma.subject.findUnique({
      where: {
        subject_id: subject_id,
      }
    })

    const result = await prisma.lesson.create({
      data: {
        subject_id: subject_id,
        date: date,
        teacher_id: subject?.teacher_id as string,
        group_id: group_id,
      }
    })


    console.log(result);

    return result;
  }

  return (
    <div className="container mx-auto my-10">
      <LessonPicker
        subjects={await getSubjects()}
        groups={await getGroups()}
        createLessonAction={createLessonAction}
      />
    </div>
  )
}
