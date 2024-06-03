import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { Suspense } from "react";
import { CourseCard } from "../(components)/cards";
import { CreateStudyGroupForm } from "./form";

async function getTheirCourses() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");
  try {
    const courses = await prisma.course.findMany({
      where: { User: { some: { id: session.user?.id } } },
      include: {
        User: true,
      },
    });
    return courses;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get courses");
  }
}

async function getAllCourses() {
  try {
    const courses = await prisma.course.findMany({
      include: {
        User: true,
      },
    });

    return courses;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get courses");
  }
}

async function getAllUsers() {
  try {
    const users = await prisma.user.findMany({
      select: { id: true, name: true, image: true },
    });
    return users;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get users");
  }
}

export default async function StudyGroupsPage() {
  const userCourses = await getTheirCourses();
  const allCourses = await getAllCourses();
  const users = await getAllUsers();
  const notInCourses = allCourses.filter(
    (course) => !userCourses.some((userCourse) => userCourse.id === course.id)
  );
  return (
    <>
      <div className="flex flex-col justify-between space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">Your Study Groups</h1>
          <CreateStudyGroupForm users={users} courses={allCourses} />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {userCourses.length === 0 && (
            <div className="p-2">You are not in any study groups yet.</div>
          )}
          <Suspense fallback={<div>Loading...</div>}>
            {userCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                display="in"
                students={course.User.length}
              />
            ))}
          </Suspense>
        </div>
      </div>
      <div className="flex flex-col justify-between space-y-2 p-4">
        <div className="flex items-center justify-between">
          <h1 className="text-3xl font-bold">All Courses</h1>
          <Link
            href="/platform/courses"
            className={cn(
              buttonVariants({
                variant: "link",
              })
            )}
          >
            View All Courses
          </Link>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          <Suspense fallback={<div>Loading...</div>}>
            {notInCourses.map((course) => (
              <CourseCard
                key={course.id}
                course={course}
                display="out"
                students={course.User.length}
              />
            ))}
          </Suspense>
        </div>
      </div>
    </>
  );
}
