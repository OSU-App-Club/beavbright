import UserAvatar from "../avatar";
import prisma from "../lib/prisma";
import { getSession } from "../lib/session";

const Access = dynamic(
  () => import("@/app/platform/(components)/cards").then((mod) => mod.Access),
  { ssr: false }
);
const Schedule = dynamic(
  () => import("@/app/platform/(components)/cards").then((mod) => mod.Schedule),
  { ssr: false }
);

import dynamic from "next/dynamic";
import { CourseCard, Search } from "./(components)/cards";

async function getThreeRecentCourses() {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    const courses = await prisma.course.findMany({
      where: { User: { some: { id: session.user?.id } } },
      include: {
        User: true,
      },
    });
    if (courses.length <= 3) {
      return courses;
    }
    return courses.slice(0, 2);
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get three recent courses");
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

export default async function Dashboard() {
  const session = await getSession();
  if (!session) {
    return null;
  }
  const allCourses = await getAllCourses();
  const users = await getAllUsers();
  const recentThreeCourses = await getThreeRecentCourses();
  return (
    <>
      <main className="flex flex-col items-center gap-3 md:gap-5 justify-center pb-10">
        <div className="flex flex-col items-center justify-center">
          <div className="md:hidden">
            <UserAvatar session={session} />
          </div>
          <div className="text-sm md:text-xl pt-2 select-none">
            Welcome, {session.user?.name}!
          </div>
        </div>
        <Search />
        <div className="max-md:px-3">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
            <Access
              users={users}
              courses={allCourses}
              userId={session.user?.id}
            />
          </div>
          <div className="mt-7">
            <h2 className="text-lg font-semibold mb-2">Your Schedule</h2>
            <Schedule />
          </div>
          <div className="max-md:px-3 mt-7">
            <h2 className="text-lg font-semibold mb-2">Recently Study Rooms</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
              {recentThreeCourses.map((course) => {
                return (
                  <CourseCard
                    key={course.id}
                    course={course}
                    display="in"
                    students={course.User.length}
                  />
                );
              })}
              {recentThreeCourses.length == 0 && (
                <div>You are not in any study groups yet.</div>
              )}
            </div>
          </div>
        </div>
      </main>
    </>
  );
}
