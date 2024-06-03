import prisma from "@/app/lib/prisma";
import { Suspense } from "react";
import { CourseCard } from "../(components)/cards";
import CourseForm from "./form";

async function getCourses() {
  try {
    const courses = await prisma.course.findMany();
    return courses;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get courses");
  }
}

export default async function StudyGroupsPage() {
  const courses = await getCourses();
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <Suspense fallback={<div>Loading...</div>}>
          {courses.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </Suspense>

        <CourseForm />
      </main>
    </>
  );
}
