import { CourseCard } from "../(components)/cards";
import CourseForm from "./form";

export default function StudyGroupsPage() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <CourseCard />
        <CourseCard />
        <CourseForm />
      </main>
    </>
  );
}
