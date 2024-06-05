"use client";
import { CourseWithMaterials } from "@/app/lib/types";
import { Separator } from "@ui/components/ui/separator";
import { Course } from "database";
import dynamic from "next/dynamic";
import { Suspense, useState } from "react";

// TODO: Can we avoid hydration errors without this?
const MaterialsAccordion = dynamic(
  () => import("@/app/platform/(components)/materials-accordion"),
  { ssr: false }
);
const MaterialsDialog = dynamic(
  () => import("@/app/platform/(components)/materials-dialog"),
  { ssr: false }
);

export default function CourseMaterialsView({
  courses,
  materialsCourses,
}: {
  courses: Course[];
  materialsCourses: CourseWithMaterials[];
}) {
  const [open, setOpen] = useState<string[]>([]);
  return (
    <>
      <div className="flex justify-between items-center">
        <h1 className="text-xl md:text-3xl font-bold">Course Materials</h1>
        <Suspense fallback={<div>Loading...</div>}>
          <MaterialsDialog courses={courses} setOpen={setOpen} open={open} />
        </Suspense>
      </div>
      <Separator />
      <div className="space-y-8">
        <Suspense fallback={<div>Loading...</div>}>
          <MaterialsAccordion
            courses={materialsCourses}
            setOpen={setOpen}
            open={open}
          />
        </Suspense>
      </div>
    </>
  );
}
