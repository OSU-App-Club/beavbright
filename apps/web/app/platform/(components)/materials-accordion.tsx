"use client";

import { deleteMaterial } from "@/app/lib/actions";
import { CourseWithMaterials } from "@/app/lib/types";
import { TrashIcon } from "@radix-ui/react-icons";
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@ui/components/ui/accordion";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { Card } from "@ui/components/ui/card";
import { cn, getVercelBlobFileType } from "@ui/lib/utils";
import { CourseMaterial } from "database";
import Image from "next/image";
import Link from "next/link";
import { useState } from "react";
import { toast } from "sonner";
import LoadingDots from "./loading-dots";

export default function MaterialsAccordion({
  courses,
  setOpen,
  open,
}: {
  courses: CourseWithMaterials[];
  setOpen: (open: string[]) => void;
  open: string[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  if (!courses) return null;
  if (courses.length === 0) {
    return (
      <div>
        No courses found.{" "}
        <Link href="/platform/courses" className="hover:underline text-primary">
          Join a course
        </Link>{" "}
        to get started.
      </div>
    );
  }

  const renderPreview = (material: CourseMaterial) => {
    const mimeType = material.fileLink
      ? getVercelBlobFileType(material.fileLink)
      : null;
    if (!mimeType) return null;
    if (!material) return null;
    if (mimeType.startsWith("image")) {
      return (
        <Image
          layout="responsive"
          src={material.fileLink}
          alt="Preview"
          className="rounded-t-lg max-h-40 w-full object-cover"
        />
      );
    }
    return (
      <iframe
        src={material.fileLink}
        className="rounded-t-lg max-h-40 w-full object-cover"
      />
    );
  };

  const onDownload = async (link: string, title: string) => {
    const res = await fetch(link);
    toast.info("Download started!");
    const blob = await res.blob();
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = title.replace(/\s/g, "-").toLowerCase();
    document.body.appendChild(a);
    a.click();
    window.URL.revokeObjectURL(url);
  };

  return (
    <>
      <Accordion type="multiple" value={open} onValueChange={setOpen}>
        {courses.map((course) => (
          <AccordionItem key={course.id} value={course.id}>
            <div
              className={cn(
                "flex flex-col md:flex-row justify-between items-center gap-8"
              )}
            >
              <AccordionTrigger className="truncate mr-12">
                {course.subject + course.code} - {course.title}
              </AccordionTrigger>
              <Link href={`/platform/course-materials/${course.id}`}>
                See all
              </Link>
            </div>
            <AccordionContent
              className={cn("w-full flex flex-col md:flex-row flex-wrap gap-8")}
            >
              {course.CourseMaterial.slice(0, 3).map((material) => {
                return (
                  <>
                    <Card
                      key={material.id}
                      className="max-w-sm border-primary/30"
                    >
                      {/* TODO: Make this a link where going to this page downloads the item */}
                      <div
                        // href={`/platform/materials/${material.id}`}
                        className="relative"
                      >
                        {renderPreview(material)}
                        <Badge
                          className={cn("absolute top-2 left-0 scale-75 ")}
                        >
                          {getVercelBlobFileType(material.fileLink)}
                        </Badge>
                      </div>
                      <div className="p-5">
                        <a href="#">
                          <h5 className="mb-2 text-xl font-bold tracking-tight">
                            {material.title}
                          </h5>
                        </a>
                        <p className="mb-3 font-normal text-neutral-700 dark:text-neutral-400">
                          {material.description}
                        </p>
                        <div className="flex justify-between">
                          <Button
                            variant={"link"}
                            size={"sm"}
                            onClick={() =>
                              onDownload(material.fileLink, material.title)
                            }
                          >
                            Download
                          </Button>
                          <Button
                            variant={"link"}
                            size={"sm"}
                            onClick={async () => {
                              setLoading(true);
                              const status = await deleteMaterial(
                                material.fileLink,
                                material.id
                              );
                              if (status.success) {
                                toast.success("Material deleted");
                                if (open.includes(course.id)) {
                                  setOpen(
                                    open.filter((id) => id !== course.id)
                                  );
                                }
                              } else {
                                toast.error("Failed to delete material");
                              }
                              setLoading(false);
                            }}
                          >
                            {!loading ? (
                              <TrashIcon />
                            ) : (
                              <LoadingDots color="#DC4405" />
                            )}
                          </Button>
                        </div>
                      </div>
                    </Card>
                  </>
                );
              })}
            </AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </>
  );
}
