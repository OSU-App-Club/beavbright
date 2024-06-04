"use client";

import {
  createStudyGroup,
  createCourse,
  createNewDiscussion,
} from "@/app/lib/actions";
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
import { cn } from "@ui/lib/utils";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";

export function JoinCourseDialogButton() {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    subject: z.string().min(2).max(6),
    code: z.number().positive(),
    title: z.string().min(1),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    setLoading(true);
    try {
      await createCourse(values);
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
        <Button variant="outline" className="flex items-center">
          <span className="text-sm">Add Courses</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Create Course</DialogTitle>
          <DialogDescription>Add your course here.</DialogDescription>
        </DialogHeader>
        <div className="grid">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="subject"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Subject</FormLabel>
                    <FormControl>
                      <Input placeholder="ex. CS, MTH..." {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="code"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Code</FormLabel>
                    <FormControl>
                      <Input
                        onChange={(e) => {
                          field.onChange(parseInt(e.target.value));
                        }}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="ex. Introduction to Computer Science"
                        {...field}
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

export function CreateStudyGroupDialogButton({
  users,
  courses,
}: {
  users: { id: string; name: string | null; image: string | null }[];
  courses: {
    id: string;
    subject: string;
    code: number;
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
        <Button variant="outline" className="flex items-center">
          <span className="text-sm">Create Study Groups</span>
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

export function CreateDiscussionDialogButton({
  userId,
  categories,
}: {
  categories: string[];
  userId: string | undefined;
}) {
  const [loading, setLoading] = useState<boolean>(false);

  const formSchema = z.object({
    title: z.string().min(1).max(50),
    content: z.string().min(1),
    category: z.string(),
  });

  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
  });

  async function onSubmit(values: z.infer<typeof formSchema>) {
    if (userId) {
      setLoading(true);
      try {
        const data = {
          title: values.title,
          body: values.content,
          category: values.category,
          userId: userId,
        };
        console.log(data);
        await createNewDiscussion(data);
        setLoading(false);
        toast.success("Discussion created successfully");
        form.reset();
      } catch (error) {
        console.error(error);
        setLoading(false);
        toast.error("Failed to create your discussion");
      }
    } else {
      toast.error("Failed to create your discussion");
    }
  }

  return (
    <Dialog>
      <DialogTrigger asChild>
        <Button variant="outline" className="flex items-center">
          <span className="text-sm">Create Discussions</span>
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-[450px]">
        <DialogHeader>
          <DialogTitle>Start a new discussion</DialogTitle>
          <DialogDescription>
            Share your thoughts, questions, or ideas with the community.
          </DialogDescription>
        </DialogHeader>
        <div className="grid">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
              <FormField
                control={form.control}
                name="title"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Title</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter a title" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="content"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Content</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="What do you wanna discuss?"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select onValueChange={field.onChange} value={field.value}>
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category: string, index: number) => (
                          <SelectItem key={index} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
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
