"use client";
import {
  DiscussionCardProps,
  DiscussionOpenerProps,
  DiscussionReply,
  RoomCardProps,
  SessionObject,
} from "@/app/lib/types";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Badge } from "@ui/components/ui/badge";
import { Button } from "@ui/components/ui/button";
import { format } from "date-fns";

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
import { AnimatePresence, motion } from "framer-motion";
import { useParams, useRouter } from "next/navigation";

import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@ui/styles/globals.css";
import {
  Bird,
  CameraIcon,
  CornerDownLeft,
  EyeIcon,
  MessageCircleIcon,
  Mic,
  MoreVertical,
  Paperclip,
  Rabbit,
  Reply,
  Trash,
  UserIcon,
} from "lucide-react";

import {
  ChatBubbleIcon,
  ChevronDownIcon,
  CircleIcon,
  DotFilledIcon,
  EnterIcon,
  PlusIcon,
} from "@radix-ui/react-icons";

import {
  deleteDiscussison,
  editDiscussion,
  viewDiscussionPost,
} from "@/app/lib/actions";
import { Blockquote } from "@ui/components/ui/blockquote";
import { CardDescription, CardTitle } from "@ui/components/ui/card";
import {
  Drawer,
  DrawerClose,
  DrawerContent,
  DrawerDescription,
  DrawerFooter,
  DrawerHeader,
  DrawerTitle,
  DrawerTrigger,
} from "@ui/components/ui/drawer";
import { DropdownMenuItem } from "@ui/components/ui/dropdown-menu";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { cn } from "@ui/lib/utils";
import { useState } from "react";

import { Icons } from "@/components/icons";
import { Textarea } from "@ui/components/ui/textarea";
import { Course } from "database";
import { ClockIcon } from "lucide-react";
import Link from "next/link";

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
          {/* <CourseCard />
          <CourseCard /> */}
        </div>
      </Card>
    </div>
  );
}

export function CourseCard({ course }: { course: Course }) {
  return (
    <Card>
      <CardHeader className="grid grid-cols-[1fr_110px] items-start gap-4 space-y-0">
        <div className="space-y-1">
          <CardTitle>
            {course.subject} {course.code}
          </CardTitle>
          <CardDescription>{course.title}</CardDescription>
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
        <div className="flex space-x-4 text-sm text-muted-foreground mb-4">
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
        <div className="flex flex-row space-x-3">
          <Link
            href={`/platform//study-groups/${course.id}`}
            className="w-full"
          >
            <Button className="w-full">Enter</Button>
          </Link>
          <Button className="w-full">Leave</Button>
        </div>
      </CardContent>
    </Card>
  );
}

export function RoomCard({ room }: RoomCardProps) {
  const router = useRouter();
  const { courseId } = useParams<{ courseId: string }>();
  if (!room.codes) return null;
  return (
    <main>
      <Card>
        <CardHeader>
          <div className="flex justify-between items-center w-full">
            <div className="flex gap-2">
              <CameraIcon className="w-5 h-5" />
              <ChatBubbleIcon className="w-5 h-5" />
              <Mic className="w-5 h-5" />
            </div>
            <Badge
              variant={room.enabled ? "outline" : "destructive"}
              className="text-xs"
            >
              {room.enabled ? "Active" : "Offline"}
            </Badge>
          </div>
          <CardTitle className="text-2xl truncate">{room.name}</CardTitle>
          <CardDescription>{room.description}</CardDescription>
          <div className="flex flex-row mt-4 gap-2">
            {room.codes?.map((code) => (
              <Button
                key={code.code}
                variant="outline"
                onClick={() =>
                  router.push(`/platform/study-groups/${courseId}/${code.code}`)
                }
              >
                <EnterIcon className="w-4 h-4 mr-2" />
                {code.role}
              </Button>
            ))}
          </div>
        </CardHeader>
      </Card>
    </main>
  );
}

export function DiscussionCard({
  discussion,
  session,
  categories,
}: DiscussionCardProps) {
  const router = useRouter();
  const [isEditing, setisEditing] = useState(false);
  const [newContent, setNewContent] = useState(discussion.body);
  const [loading, setLoading] = useState(false);
  const [newTitle, setNewTitle] = useState(discussion.title);
  const [error, setError] = useState<string | null>(null);
  const [newCategory, setNewCategory] = useState(discussion.category);
  const name = discussion.poster.firstName + " " + discussion.poster.lastName;
  const onSubmitTrash = async () => {
    await deleteDiscussison(discussion.id);
  };

  const onSubmitEdit = async () => {
    if (!newContent || !newTitle || !newCategory) {
      setError("Please fill in all fields.");
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    }
    await editDiscussion(discussion.id, {
      title: newTitle,
      body: newContent,
      category: newCategory,
    });
    setisEditing(false);
    setLoading(false);
    setError(null);
  };

  const onViewDiscussion = async () => {
    await viewDiscussionPost(discussion.id);
    router.push(`/platform/discussions/${discussion.id}`);
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    await onSubmitEdit();
  };

  return (
    <motion.li
      layout="position"
      style={{ listStyleType: "none" }}
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      key={discussion.id}
    >
      <Card>
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
            <div className="ml-auto flex items-center gap-2">
              <Button
                size="sm"
                variant="outline"
                className="h-8 gap-1"
                onClick={onViewDiscussion}
              >
                <EyeIcon className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  View Post
                </span>
              </Button>
              {discussion.poster.id === session.userId && (
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="icon" variant="outline" className="h-8 w-8">
                      <MoreVertical className="h-3.5 w-3.5" />
                      <span className="sr-only">More</span>
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end">
                    <DropdownMenuItem
                      onClick={() => {
                        setisEditing(true);
                      }}
                    >
                      Edit
                    </DropdownMenuItem>
                    <DropdownMenuItem>Anonoymize</DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={onSubmitTrash}>
                      Trash
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              )}
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
          {isEditing ? (
            <form className="flex flex-col gap-4 w-64" onSubmit={handleSubmit}>
              <Label htmlFor="category">Category</Label>
              <Select value={newCategory} onValueChange={setNewCategory}>
                <SelectTrigger className={cn("w-max")}>
                  <SelectValue
                    className="w-max"
                    placeholder="Select a category"
                  />
                </SelectTrigger>
                <SelectContent>
                  {Array.from(new Set(categories)).map((category, index) => (
                    <SelectItem key={index} value={category}>
                      {category}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Label htmlFor="title">Title</Label>
              <Input
                name="title"
                value={newTitle}
                onChange={(e) => setNewTitle(e.target.value)}
              />
              <Label htmlFor="body">Body</Label>
              <Textarea
                name="body"
                value={newContent}
                onChange={(e) => setNewContent(e.target.value)}
                className="p-4 min-h-[200px]"
              />
              <div className="flex flex-row gap-2">
                <Button
                  type="submit"
                  className="w-full"
                  disabled={loading}
                  variant={error ? "destructive" : "default"}
                >
                  {loading ? (
                    <div className="flex items-center justify-center gap-2">
                      <Icons.spinner className="w-6 h-6 animate-spin" />
                      <p>Loading...</p>
                    </div>
                  ) : (
                    <>
                      {error ? (
                        <div className="text-sm text-center">{error}</div>
                      ) : (
                        <>Save</>
                      )}
                    </>
                  )}
                </Button>
                <Button
                  variant="outline"
                  type="button"
                  className="w-20"
                  onClick={() => setisEditing(false)}
                >
                  Cancel
                </Button>
              </div>
            </form>
          ) : (
            <>
              <h1 className="text-lg font-semibold">{discussion.title}</h1>
              <pre className="font-sans break-words mt-4 truncate text-ellipsis overflow-hidden max-h-[150px]">
                {discussion.body}
              </pre>
            </>
          )}
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
    </motion.li>
  );
}

export const DiscussionReplyList: React.FC<{
  replies: DiscussionReply[];
  discussionId: string;
  session: SessionObject;
  onAddReply: (reply: string, replyId?: string) => void;
  onDeleteReply: (id: string) => void;
}> = ({ replies, onDeleteReply, session, onAddReply }) => {
  // https://github.com/framer/motion/issues/1850#issuecomment-1876786414
  return (
    <ul className="space-y-4">
      <AnimatePresence initial={false} mode="popLayout">
        {replies.map((reply) => (
          <DiscussionReplyCard
            key={reply.id}
            {...reply}
            session={session}
            onAddReply={onAddReply}
            onDeleteReply={onDeleteReply}
          />
        ))}
      </AnimatePresence>
    </ul>
  );
};

export const DiscussionOpener: React.FC<DiscussionOpenerProps> = ({
  discussion,
  onAddReply,
}) => {
  const { firstName, lastName, avatar } = discussion.poster;
  const {
    body: content,
    category,
    replies,
    views,
    id: discussionId,
    title,
  } = discussion;
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);
  const [reply, setReply] = useState<string>("");
  const [open, setOpen] = useState<boolean>(false);
  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (reply === "") {
      setError("Please fill in all fields.");
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    } else {
      onAddReply && onAddReply(reply);
      setLoading(false);
      setOpen(false);
      setReply("");
    }
  };
  return (
    <Card id={`reply-${discussionId}`}>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage
              alt={firstName + " " + lastName + "'s image"}
              src={avatar}
            />
            <AvatarFallback>{firstName[0] + lastName[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{firstName + " " + lastName}</div>
            <div className="text-sm mt-2 text-gray-500 dark:text-gray-400">
              {category}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-xl font-semibold">{title}</h1>
        <p className="text-lg font-sans mt-4 text-muted-foreground/95">
          {content}
        </p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MessageCircleIcon className="h-4 w-4" />
          <span>{replies} replies</span>
          <Separator className="h-4" orientation="vertical" />
          <EyeIcon className="h-4 w-4" />
          <span>{views} views</span>
          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button variant="outline">Reply</Button>
            </DrawerTrigger>
            <DrawerContent className="w-1/2 mx-auto p-4">
              <DrawerHeader>
                <DrawerTitle>Reply to discussion</DrawerTitle>
                <DrawerDescription>
                  Share your thoughts and advice with the community.
                </DrawerDescription>
              </DrawerHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4 mx-6">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    className="p-4 min-h-[200px]"
                    placeholder="Type your reply here..."
                    name="content"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>
                <DrawerFooter>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant={error ? "destructive" : "default"}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icons.spinner className="w-6 h-6 animate-spin" />
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <>
                        {error ? (
                          <div className="text-sm text-center">{error}</div>
                        ) : (
                          <>Submit</>
                        )}
                      </>
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </div>
      </CardFooter>
    </Card>
  );
};

export const DiscussionReplyCard: React.FC<DiscussionReply> = ({
  id,
  body: content,
  createdAt,
  poster,
  discussion,
  onDeleteReply,
  onAddReply,
  session,
}) => {
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [reply, setReply] = useState("");
  const [open, setOpen] = useState(false);
  const { firstName, lastName, avatar } = poster;

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    if (reply === "") {
      setError("Please fill in all fields.");
      setLoading(false);
      setTimeout(() => {
        setError(null);
      }, 4000);
      return;
    } else {
      onAddReply && onAddReply(reply, id);
      setLoading(false);
      setOpen(false);
      setReply("");
    }
  };

  return (
    <motion.li
      style={{ listStyleType: "none" }}
      layout="position"
      initial={{ scale: 0.9, opacity: 0, y: 50 }}
      animate={{ scale: 1, opacity: 1, y: 0 }}
      exit={{ scale: 0.9, opacity: 0, y: 50 }}
      transition={{ type: "spring", stiffness: 300, damping: 30 }}
      key={id}
    >
      <Card>
        <CardHeader>
          <div className="flex items-center gap-2">
            <Avatar className="h-8 w-8">
              <AvatarImage
                alt={firstName + " " + lastName + "'s image"}
                src={avatar}
              />
              <AvatarFallback>{firstName[0] + lastName[0]}</AvatarFallback>
            </Avatar>
            <div>
              <div className="font-medium">{firstName + " " + lastName}</div>
            </div>
            {poster.id === session.userId && (
              <div className="ml-auto flex items-center gap-2">
                <Button
                  size="sm"
                  variant="outline"
                  className="h-8 gap-1"
                  onClick={() => onDeleteReply && onDeleteReply(id)}
                >
                  <Trash className="h-3.5 w-3.5" />
                  <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                    Delete Reply
                  </span>
                </Button>
              </div>
            )}
          </div>
        </CardHeader>
        <CardContent>
          <Blockquote>
            <div className="space-y-2">
              <Link
                className="hover:underline not-italic list-none text-xs"
                href={`/platform/discussions/${discussion.id}#reply-${id}`}
              >
                {format(createdAt, "'On' MMMM dd, yyyy 'at' h:mm a")}{" "}
                {poster.firstName}
                {poster.lastName} wrote:
              </Link>
              <h2 className="text-lg font-semibold -translate-y-1 text-muted-foreground/90">
                {discussion.title}
              </h2>
              <p className="text-base font-sans whitespace-pre-wrap">
                {discussion.body}
              </p>
            </div>
          </Blockquote>
          <p className="mt-2">{content}</p>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
            <ClockIcon className="h-4 w-4" />
            <span>
              {format(createdAt.toLocaleString(), "MMMM dd, yyyy h:mm a")}
            </span>
          </div>

          <Drawer open={open} onOpenChange={setOpen}>
            <DrawerTrigger asChild>
              <Button
                size="sm"
                variant="outline"
                className="ml-auto h-8 gap-1"
                onClick={() => onAddReply && onAddReply(reply, id)}
              >
                <Reply className="h-3.5 w-3.5" />
                <span className="lg:sr-only xl:not-sr-only xl:whitespace-nowrap">
                  Reply
                </span>
              </Button>
            </DrawerTrigger>
            <DrawerContent className="w-1/2 mx-auto p-4">
              <DrawerHeader>
                <DrawerTitle>Reply to discussion</DrawerTitle>
                <DrawerDescription>
                  Share your thoughts and advice with the community.
                </DrawerDescription>
              </DrawerHeader>
              <form onSubmit={handleSubmit}>
                <div className="grid gap-4 py-4 mx-6">
                  <Label htmlFor="content">Content</Label>
                  <Textarea
                    className="p-4 min-h-[200px]"
                    placeholder="Type your reply here..."
                    name="content"
                    value={reply}
                    onChange={(e) => setReply(e.target.value)}
                  />
                </div>
                <DrawerFooter>
                  <Button
                    type="submit"
                    disabled={loading}
                    variant={error ? "destructive" : "default"}
                  >
                    {loading ? (
                      <div className="flex items-center justify-center gap-2">
                        <Icons.spinner className="w-6 h-6 animate-spin" />
                        <p>Loading...</p>
                      </div>
                    ) : (
                      <>
                        {error ? (
                          <div className="text-sm text-center">{error}</div>
                        ) : (
                          <>Submit</>
                        )}
                      </>
                    )}
                  </Button>
                  <DrawerClose asChild>
                    <Button variant="outline">Cancel</Button>
                  </DrawerClose>
                </DrawerFooter>
              </form>
            </DrawerContent>
          </Drawer>
        </CardFooter>
      </Card>
    </motion.li>
  );
};
