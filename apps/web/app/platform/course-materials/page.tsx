import {
  getCourses,
  getCourse,
  getAllCourses,
  createCourse,
} from "@/app/lib/actions";

export default async function CourseMaterialPage() {
  return (
    <>
      <main className="container mx-auto grid grid-cols-1 w-4/6 gap-8 p-4">
        <div className="space-y-8">
          <div>Course</div>
        </div>
      </main>
    </>
  );
}
