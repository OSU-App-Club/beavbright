import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import CourseMaterialsView from "./render";

export default async function CourseMaterialsPage() {
  async function getAllCoursesUserIsIn(userId: string) {
    try {
      const courses = await prisma.course.findMany({
        where: {
          User: {
            some: {
              id: userId,
            },
          },
        },
      });
      return courses;
    } catch (error) {
      throw new Error("Could not get courses");
    }
  }

  async function getMaterials(userId: string) {
    try {
      const courses = await prisma.course.findMany({
        where: {
          User: {
            some: {
              id: userId,
            },
          },
        },
        include: {
          CourseMaterial: true,
        },
      });
      return courses;
    } catch (error) {
      console.log(error);
      throw new Error("Could not get courses with materials");
    }
  }
  const session = await getSession();
  const courses = await getAllCoursesUserIsIn(session?.user?.id as string);
  const materialsCourses = await getMaterials(session?.user?.id as string);
  return (
    <div className="flex flex-col justify-between space-y-2 gap-2 p-4">
      <CourseMaterialsView
        courses={courses}
        materialsCourses={materialsCourses}
      />
    </div>
  );
}
