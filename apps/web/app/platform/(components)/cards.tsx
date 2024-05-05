"use client";
import { DiscussionCardProps } from "@/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { Separator } from "@ui/components/ui/separator";
import { cn } from "@ui/lib/utils";
import { useRouter } from "next/navigation";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@ui/styles/globals.css";
import {
  Bird,
  CornerDownLeft,
  EyeIcon,
  MessageCircleIcon,
  Mic,
  Paperclip,
  Rabbit,
  UserIcon,
} from "lucide-react";

import {
  ChevronDownIcon,
  CircleIcon,
  DotFilledIcon,
  EnterIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

import { CardDescription, CardTitle } from "@ui/components/ui/card";
import { DropdownMenuItem } from "@ui/components/ui/dropdown-menu";

export function Access() {
  return (
    <div>
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Quick Access</h2>
        <div className="grid gap-2 mt-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <Bird className="w-5 h-5" />
            <span>View Courses</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Rabbit className="w-5 h-5" />
            <span>View Study Groups</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            <span>View Discussions</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function Create() {
  return (
    <div>
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Create</h2>
        <div className="grid gap-2 mt-2">
          <Button variant="ghost" className="flex items-center gap-2">
            <Paperclip className="w-5 h-5" />
            <span>Create Course</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <CornerDownLeft className="w-5 h-5" />
            <span>Create Study Group</span>
          </Button>
          <Button variant="ghost" className="flex items-center gap-2">
            <Mic className="w-5 h-5" />
            <span>Create Discussion</span>
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function Search() {
  return (
    <div>
      <Card className=" rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Search</h2>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="search">Search</Label>
          <Input id="search" type="text" placeholder="Search" />
        </div>
      </Card>
    </div>
  );
}

export function ThreeRecentStudyGroups() {
  return (
    <div>
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Recently Active Study Groups</h2>
        <div className="grid mt-2">
          <Button
            variant="ghost"
            className="flex w-full justify-between items-center group"
          >
            <div className="flex items-center transition-all duration-1000">
              <DotFilledIcon className="w-5 h-5 text-blue-500" />
              <span className="group-hover:hidden">CS 161 Study Group</span>
              <span className="group-hover:opacity-100 opacity-0">
                Join CS 161 Study Group
              </span>
            </div>
            <EnterIcon className="w-5 h-5 text-primary/0 group-hover:text-primary/100" />
          </Button>
          <Button
            variant="ghost"
            className="flex w-full justify-between items-center group"
          >
            <div className="flex items-center transition-all duration-1000">
              <DotFilledIcon className="w-5 h-5 text-red-500" />
              <span className="group-hover:hidden">MTH 251 Study Group</span>
              <span className="group-hover:opacity-100 opacity-0">
                Join MTH 251 Study Group
              </span>
            </div>
            <EnterIcon className="w-5 h-5 text-primary/0 group-hover:text-primary/100" />
          </Button>
          <Button
            variant="ghost"
            className="flex w-full justify-between items-center group"
          >
            <div className="flex items-center">
              <DotFilledIcon className="w-5 h-5 text-green-500" />
              <span className="group-hover:hidden">WR 121 Writing Group</span>
              <span className="group-hover:opacity-100 opacity-0">
                Join WR 121 Writing Group
              </span>
            </div>
            <EnterIcon className="w-5 h-5 text-primary/0 group-hover:text-primary/100" />
          </Button>
        </div>
      </Card>
    </div>
  );
}

export function AddCourse() {
  return (
    <div>
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Add Course</h2>
        <div className="grid gap-2 mt-2">
          <Label htmlFor="course">Course Name</Label>
          <Input id="course" type="text" placeholder="Course Name" />
          <Label htmlFor="course-code">Course Code</Label>
          <Input id="course-code" type="text" placeholder="Course Code" />
          <Button variant="outline">Add Course</Button>
        </div>
      </Card>
    </div>
  );
}

export function YourCourses() {
  return (
    <div>
      <Card className="rounded-lg shadow-md p-4">
        <h2 className="text-lg font-semibold">Your Courses</h2>
        <div className="grid gap-2 mt-2">
          <CourseCard />
          <CourseCard />
        </div>
      </Card>
    </div>
  );
}

function CourseCard() {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>CS 161</CardTitle>
          <CardDescription>Introduction to Computer Science</CardDescription>
        </div>
        <div className="flex items-center space-x-1 rounded-md bg-secondary text-secondary-foreground">
          <Button variant="secondary" className="px-3 shadow-none">
            Options
          </Button>
          <Separator orientation="vertical" className="h-[20px]" />
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="secondary" className="px-2 shadow-none">
                <ChevronDownIcon className="h-4 w-4 text-secondary-foreground" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              alignOffset={-5}
              className="w-[200px]"
              forceMount
            >
              <DropdownMenuLabel>Suggested Lists</DropdownMenuLabel>
              <DropdownMenuSeparator />
              <DropdownMenuCheckboxItem checked>
                Future Ideas
              </DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>My Stack</DropdownMenuCheckboxItem>
              <DropdownMenuCheckboxItem>Inspiration</DropdownMenuCheckboxItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem>
                <PlusIcon className="mr-2 h-4 w-4" /> Create List
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </CardHeader>
      <CardContent>
        <div className="flex space-x-4 text-sm text-muted-foreground">
          <div className="flex items-center">
            <CircleIcon className="mr-1 h-3 w-3 fill-sky-400 text-sky-400" />
            Computer Science
          </div>
          <div className="flex items-center">
            <UserIcon className="mr-1 h-3 w-3" />
            120 Students
          </div>
          <div>Spring 2022</div>
        </div>
      </CardContent>
    </Card>
  );
}

export function DiscussionCard({ discussion }: DiscussionCardProps) {
  const router = useRouter();
  const name = discussion.poster.firstName + " " + discussion.poster.lastName;
  return (
    <Card
      className={cn("hover:brightness-125 hover:cursor-pointer")}
      onClick={() => router.push(`/platform/discussions/${discussion.id}`)}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage alt={name} src={discussion.poster.avatar} />
            {/* initials */}
            <AvatarFallback>
              {name.charAt(0) + name.split(" ")[1].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {discussion.category}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        {/*
        For integrating BlockNoteView into each discussion card, we should use this:
        <BlockNoteView
          editor={editor}
          data-theme-dark
          aria-readonly="true"
          defaultValue={content}
          className="-mx-8"
          editable={false}
          contentEditable={false}
        /> */}
        <h3 className="text-lg font-medium">{discussion.title}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">
          {discussion.content}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MessageCircleIcon className="h-4 w-4" />
          <span>{discussion.replies} replies</span>
          <Separator className="h-4" orientation="vertical" />
          <EyeIcon className="h-4 w-4" />
          <span>{discussion.views} views</span>
        </div>
      </CardFooter>
    </Card>
  );
}
