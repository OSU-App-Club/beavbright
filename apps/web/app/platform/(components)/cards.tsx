"use client";
import {
  Bird,
  CornerDownLeft,
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
import { Button } from "@ui/components/ui/button";
import { Card } from "@ui/components/ui/card";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";

import {
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@ui/components/ui/dropdown-menu";
import { Separator } from "@ui/components/ui/separator";

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
