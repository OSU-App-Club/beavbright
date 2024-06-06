"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { ReloadIcon } from "@radix-ui/react-icons";
import { Button } from "@ui/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@ui/components/ui/form";
import { Input } from "@ui/components/ui/input";
import { Option } from "@ui/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Course } from "database";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export default function CourseMaterialsForm({
  courses,
  userId,
}: {
  courses: Course[];
  userId: string;
}) {
  const [loading, setLoading] = useState<boolean>(false);
  const [open, setOpen] = useState<boolean>(false);

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  });

  const formSchema = z.object({
    course: z.string().min(1),
    file: z.string().min(1),
    link: z.string().optional(),
  });

  const options: Option[] = courses.map((course) => ({
    label: course.title,
    value: course.id,
    disable: false,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      // TODO: Add Crud
      setOpen(false);
      setLoading(false);
      toast.success("Course created successfully");
      form.reset();
    } catch (error) {
      console.error(error);
      setLoading(false);
      toast.error("Failed to create course");
    }
  }

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger>
        <Button variant="outline" className="text-primary">
          <Plus className="mr-2" />
          Add new course material
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Add Course Material</DialogTitle>
          <DialogDescription>Fill out the fields.</DialogDescription>
        </DialogHeader>
        <div className="grid">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="course"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Course</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={"None"}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a course." />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        <SelectItem value="None" disabled>
                          None
                        </SelectItem>
                        {courses.map((course) => (
                          <SelectItem
                            key={course.id}
                            value={course.id}
                            disabled={false}
                          >
                            {course.title}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="file"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>File</FormLabel>
                    <Input
                      {...field}
                      type="file"
                      placeholder="Select a file..."
                    />
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="link"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Link</FormLabel>
                    <Input {...field} placeholder="Enter a link..." />
                    <FormMessage />
                  </FormItem>
                )}
              />
              {loading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Adding...
                </Button>
              ) : (
                <Button type="submit" className="w-full">
                  Add
                </Button>
              )}
            </form>
          </Form>
        </div>
      </DialogContent>
    </Dialog>
  );
}
