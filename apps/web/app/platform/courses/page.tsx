import prisma from "@/app/lib/prisma";
import { getSession } from "@/app/lib/session";
import { EnterIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@ui/components/ui/button";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { CourseCard } from "../(components)/cards";
import { JoinCourseForm } from "../study-groups/form";

async function getAllCourses() {
  const session = await getSession();
  if (!session) throw new Error("No session found.");
  try {
    const courses = await prisma.course.findMany({
      include: {
        User: true,
      },
    });
    return { courses, userId: session.user?.id };
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get courses");
  }
}

export default async function AllCoursesPage() {
  const { courses: allCourses, userId } = await getAllCourses();
  return (
    <>
      <div className="flex flex-col justify-between space-y-2 gap-2 p-4">
        <div className="flex items-center justify-between">
          <div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger>
                  <Link
                    href="/platform/study-groups"
                    className={cn(
                      buttonVariants({
                        variant: "link",
                      })
                    )}
                  >
                    <EnterIcon className="mr-2" />
                    Your Study Groups
                  </Link>
                </TooltipTrigger>
                <TooltipContent>Go back</TooltipContent>
              </Tooltip>
            </TooltipProvider>
            <h1 className="text-3xl font-bold">All Courses</h1>
          </div>
          <JoinCourseForm />
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {allCourses.map((course) => (
            <CourseCard
              key={course.id}
              course={course}
              display={
                course.User.some((user) => user.id === userId) ? "in" : "out"
              }
              students={course.User.length}
            />
          ))}
        </div>
      </div>
    </>
  );
}
