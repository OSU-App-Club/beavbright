"use client";
import { createNewCourseMaterial, uploadFile } from "@/app/lib/actions";
import { VirtualizedCombobox } from "@/components/virtualized-combo";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import {
  Form,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Textarea } from "@ui/components/ui/textarea";
import { cn, getMimeType } from "@ui/lib/utils";
import { Course } from "database";
import { PlusIcon } from "lucide-react";
import Image from "next/image";
import { ChangeEvent, useCallback, useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import LoadingDots from "./loading-dots";

export default function MaterialsDialog({
  courses,
  setOpen,
  open,
}: {
  courses: Course[];
  setOpen: (open: string[]) => void;
  open: string[];
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [openDialog, setOpenDialog] = useState(false);
  const [data, setData] = useState<{
    previewImage: string | null;
  }>({
    previewImage: null,
  });
  const [file, setFile] = useState<File | null>(null);
  const [dragActive, setDragActive] = useState(false);
  const onChangePreview = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0];
      if (file) {
        if (file.size / 1024 / 1024 > 50) {
          toast.error("File size too big (max 50MB)");
        } else {
          setFile(file);
          const reader = new FileReader();
          reader.onload = (e) => {
            setData((prev) => ({
              ...prev,
              previewImage: e.target?.result as string,
            }));
          };
          reader.readAsDataURL(file);
        }
      }
    },
    [setData]
  );

  const materialUploadSchema = z.object({
    course: z.string().min(1, "You must select a course"),
    file:
      typeof window === "undefined"
        ? z.any()
        : z
            .instanceof(FileList)
            .refine((file) => file?.length == 1, "File is required."),
    description: z.string().min(1, "You must provide a description"),
    title: z.string().min(1, "You must provide a title"),
  });

  const form = useForm<z.infer<typeof materialUploadSchema>>({
    resolver: zodResolver(materialUploadSchema),
  });

  const fileRef = form.register("file");

  const virtualizedCourses = courses.map((course) => ({
    value: course.id,
    label: `${course.subject}${course.code} - ${course.title}`,
  }));

  const renderPreview = (preview: string | null) => {
    const mimeType = preview ? getMimeType(preview) : null;
    if (!mimeType) return null;
    if (!preview) return null;
    if (mimeType.includes("image")) {
      return (
        <Image
          layout="responsive"
          src={preview}
          alt="Preview"
          className="h-full w-full object-contain rounded-md"
        />
      );
    }
    return (
      <iframe src={preview} className="h-full w-full object-cover rounded-md" />
    );
  };

  async function onSubmit(values: z.infer<typeof materialUploadSchema>) {
    setLoading(true);
    const formData = new FormData();
    formData.append("file", file as Blob);
    try {
      const response = await uploadFile(formData);
      await createNewCourseMaterial({
        courseId: values.course,
        fileLink: response.url,
        description: values.description,
        title: values.title,
      });
      setOpen([...open, values.course]);
      setLoading(false);
      toast.success("Course material created successfully");
      setOpenDialog(false);
      form.reset();
      setData({ previewImage: null });
      setFile(null);
    } catch (error) {
      setLoading(false);
      toast.error("Failed to create course material");
    }
  }

  // TODO: Allow multiple files?
  const onDrop = useCallback((e: any) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);
    const file = e.dataTransfer.files && e.dataTransfer.files[0];
    if (file) {
      if (file.size / 1024 / 1024 > 50) {
        toast.error("File size too big (max 50MB)");
      } else {
        setFile(file);
        const reader = new FileReader();
        reader.onload = (e) => {
          setData((prev) => ({
            ...prev,
            previewImage: e.target?.result as string,
          }));
        };
        reader.readAsDataURL(file);
      }
    }
  }, []);

  return (
    <>
      <Dialog open={openDialog} onOpenChange={setOpenDialog}>
        <DialogTrigger asChild>
          <Button variant="outline" className="text-primary">
            <PlusIcon className="mr-2 h-4 w-4" />
            New Material
          </Button>
        </DialogTrigger>
        <DialogContent className="max-w-3xl">
          <DialogHeader>
            <DialogTitle>Upload New Course Material</DialogTitle>
            <DialogDescription>
              Submit a new course material to share with your classmates.
            </DialogDescription>
          </DialogHeader>
          <div>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(onSubmit)}
                className="grid grid-cols-1 md:grid-cols-2 gap-8"
              >
                <div>
                  <FormField
                    control={form.control}
                    name="file"
                    render={({ field }) => (
                      <FormItem>
                        <div>
                          <FormLabel>File</FormLabel>
                          <p className="text-sm italic mb-3">
                            Accepted formats: PDF, PNG, JPEG, GIF, SVG
                          </p>
                          <label
                            htmlFor="file-upload"
                            className="group relative flex h-52 cursor-pointer flex-col items-center justify-center rounded-md"
                          >
                            <div
                              className="absolute z-[5] h-full w-full rounded-md border border-dotted border-primary/50 shadow-sm transition-all hover:border-primary/100 hover:bg-primary/10"
                              onDragOver={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(true);
                              }}
                              onDragEnter={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(true);
                              }}
                              onDragLeave={(e) => {
                                e.preventDefault();
                                e.stopPropagation();
                                setDragActive(false);
                              }}
                              onDrop={onDrop}
                            />
                            <div
                              className={`${
                                dragActive ? "border-2 border-black" : ""
                              } absolute z-[3] flex h-full w-full flex-col items-center justify-center rounded-md px-10 transition-all ${
                                data.previewImage
                                  ? "bg-bacground/80 opacity-0 hover:opacity-100 hover:backdrop-blur-md"
                                  : "bg-background opacity-100 hover:bg-background/50"
                              }`}
                            >
                              <svg
                                className={`${
                                  dragActive ? "scale-110" : "scale-100"
                                } h-7 w-7 text-primary transition-all duration-75 group-hover:scale-110 group-active:scale-95`}
                                xmlns="http://www.w3.org/2000/svg"
                                width="24"
                                height="24"
                                viewBox="0 0 24 24"
                                fill="none"
                                stroke="currentColor"
                                strokeWidth="2"
                                strokeLinecap="round"
                                strokeLinejoin="round"
                              >
                                <path d="M4 14.899A7 7 0 1 1 15.71 8h1.79a4.5 4.5 0 0 1 2.5 8.242"></path>
                                <path d="M12 12v9"></path>
                                <path d="m16 16-4-4-4 4"></path>
                              </svg>
                              <p className="mt-2 text-center text-sm">
                                Drag and drop or click to upload.
                              </p>
                              <p className="mt-2 text-center text-xs">
                                Max file size: 50MB
                              </p>
                              <span className="sr-only">Photo upload</span>
                            </div>
                            {renderPreview(data.previewImage)}
                          </label>
                          <div className="mt-1 flex rounded-md shadow-sm">
                            <Input
                              id="file-upload"
                              type="file"
                              accept="image/*,application/pdf,application/vnd.openxmlformats-officedocument.wordprocessingml.document,application/msword"
                              className="sr-only"
                              {...fileRef}
                              onChange={onChangePreview}
                            />
                          </div>
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <div className="space-y-2">
                  <FormField
                    control={form.control}
                    name="course"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Course</FormLabel>
                        <div className={cn("min-w-full")}>
                          {/* TODO: Allow people to add materials for courses they're not in? */}
                          {courses.length === 0 ? (
                            <p>
                              You must join a course to submit material for it.
                            </p>
                          ) : (
                            <VirtualizedCombobox
                              options={virtualizedCourses}
                              searchPlaceholder="Select a course..."
                              callback={({
                                value,
                              }: {
                                value: string;
                                label: string;
                              }) => {
                                form.setValue("course", value);
                              }}
                            />
                          )}
                        </div>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Title</FormLabel>
                        <Input
                          {...field}
                          className="w-full p-2 border rounded-md"
                          placeholder="Enter a title for the material"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={form.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Item Description</FormLabel>
                        <Textarea
                          {...field}
                          className="w-full p-2 border rounded-md"
                          placeholder="Describe the material you're sharing"
                        />
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                </div>
                <DialogFooter className={cn("col-span-2 transition-all")}>
                  {loading ? (
                    <Button disabled variant={"outline"} className="w-full">
                      <LoadingDots color="#DC4405" />
                    </Button>
                  ) : (
                    <Button
                      variant="default"
                      className="w-full"
                      disabled={
                        !file || !data.previewImage || !form.formState.isValid
                      }
                    >
                      Upload Material
                    </Button>
                  )}
                </DialogFooter>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}
