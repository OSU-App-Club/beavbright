"use client";

import { createStudyGroup } from "@/app/lib/actions";
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
import MultipleSelector, { Option } from "@ui/components/ui/multi-select";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Plus } from "lucide-react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function CreateStudyGroupForm({
  users,
  courses,
}: {
  users: { id: string; name: string | null; image: string | null }[];
  courses: {
    id: string;
    subject: string;
    code: string;
    title: string;
    createdAt: Date;
  }[];
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const optionSchema = z.object({
    label: z.string(),
    value: z.string(),
    disable: z.boolean().optional(),
  });

  const formSchema = z.object({
    course: z.string().min(1),
    users: z.array(optionSchema).min(1),
  });

  const options: Option[] = users.map((user) => ({
    label: user.name || "Unknown",
    value: user.id,
    disable: false,
  }));

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createStudyGroup(values);
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
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="text-primary">
          <Plus className="mr-2" />
          Create new study group
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create Study Group</DialogTitle>
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
                          <SelectValue placeholder="Select a a course." />
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
                            // TODO: Disable all courses user is in a study group for.
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
                name="users"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Users</FormLabel>
                    <FormControl>
                      <MultipleSelector
                        {...field}
                        defaultOptions={options}
                        // TODO: Automatically select the current user
                        placeholder={
                          field.value?.length ?? ""
                            ? ""
                            : "Select users... (don't forget to add yourself!)"
                        }
                        emptyIndicator={<p>No Results Found.</p>}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {loading ? (
                <Button disabled className="w-full">
                  <ReloadIcon className="mr-2 h-4 w-4 animate-spin" />
                  Creating...
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
