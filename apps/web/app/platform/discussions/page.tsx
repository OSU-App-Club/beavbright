"use client";
import { categories, discussions } from "@/lib/constants";
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
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@ui/components/ui/dialog";
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
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@ui/components/ui/select";
import { Separator } from "@ui/components/ui/separator";
import { Textarea } from "@ui/components/ui/textarea";
import { cn } from "@ui/lib/utils";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { useCallback, useMemo, useState } from "react";

import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "@ui/styles/globals.css";
import { useTheme } from "next-themes";

export default function DiscussionsPage() {
  const [filter, setFilter] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");
  const editor = useCreateBlockNote();

  const handleFilterChange = useCallback(
    (value: string[]) => {
      setFilter(value);
    },
    [setFilter],
  );

  const filteredDiscussions = useMemo(() => {
    if (filter.length === 0) {
      return discussions;
    }
    return discussions.filter((discussion) =>
      filter.includes(discussion.category),
    );
  }, [filter]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const searchFilter = (discussion: DiscussionCardProps) => {
    if (search === "") {
      return true;
    }
    return (
      discussion.title.toLowerCase().includes(search.toLowerCase()) ||
      discussion.content.toLowerCase().includes(search.toLowerCase())
    );
  };

  const searchFilteredDiscussions = useMemo(() => {
    return filteredDiscussions.filter(searchFilter);
  }, [search, filteredDiscussions]);

  const { theme } = useTheme();
  const currTheme = {
    [`data-theme-${theme}`]: true,
  };

  const [title, setTitle] = useState<string>("");
  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const [category, setCategory] = useState<string>("");

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const [contentText, setContentText] = useState<string>("");
  const handleContentTextChange = useCallback(() => {
    setContentText(JSON.stringify(editor.document));
  }, [editor.document]);

  const [newDiscussions, setNewDiscussions] = useState<DiscussionCardProps[]>(
    [],
  );

  const addNewDiscussion = useCallback(
    (discussion: DiscussionCardProps) => {
      setNewDiscussions((prev) => [discussion, ...prev]);
    },
    [setNewDiscussions],
  );

  const createDiscussion = useCallback(async () => {
    addNewDiscussion({
      title,
      content: contentText,
      category,
      replies: 0,
      views: 0,
      poster: {
        name: "John Doe",
        avatar: "https://randomuser.me/api/portraits",
      },
    });
  }, [title, contentText, category, addNewDiscussion]);

  const handleSubmit = useCallback(async () => {
    await createDiscussion();
  }, [createDiscussion]);

  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4">
        <div className="space-y-8">
          <section>
            <div className="flex flex-col gap-4 md:flex-row md:items-center md:justify-between">
              <h2 className="text-2xl font-bold">Discussions</h2>
              <div className="flex items-center gap-2">
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <Button size="sm" variant="outline">
                      <FilterIcon className="h-4 w-4 mr-2" />
                      Filter by Category
                    </Button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent align="end" className="w-48">
                    <DropdownMenuLabel>Filter by Category</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    {categories.map((category, index) => (
                      <DropdownMenuCheckboxItem
                        key={index}
                        checked={filter.includes(category)}
                        onCheckedChange={(checked) => {
                          handleFilterChange(
                            checked
                              ? [...filter, category]
                              : filter.filter((item) => item !== category),
                          );
                        }}
                      >
                        {category}
                      </DropdownMenuCheckboxItem>
                    ))}
                  </DropdownMenuContent>
                </DropdownMenu>
                <div className="relative">
                  <SearchIcon className="absolute left-3 top-3 h-4 w-4" />
                  <Input
                    className="w-full  shadow-none appearance-none pl-8 pr-4 py-2 text-sm rounded-md"
                    placeholder="Search discussions..."
                    type="search"
                    value={search}
                    onChange={(e) => handleSearchChange(e.target.value)}
                  />
                </div>
                <Dialog>
                  <DialogTrigger asChild>
                    <Button size="sm" variant="outline">
                      Start a Discussion
                    </Button>
                  </DialogTrigger>
                  <DialogContent className="sm:max-w-[600px]">
                    <DialogHeader>
                      <DialogTitle>Start a New Discussion</DialogTitle>
                      <DialogDescription>
                        Share your thoughts, questions, or ideas with the
                        community.
                      </DialogDescription>
                    </DialogHeader>
                    <div className="grid gap-4 py-4">
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="title">
                          Title
                        </Label>
                        <Input
                          className="col-span-3"
                          id="title"
                          placeholder="Enter a title"
                          value={title}
                          onChange={(e) => handleTitleChange(e.target.value)}
                        />
                      </div>
                      <div className="grid grid-cols-4 items-start gap-4">
                        <Label className="text-right" htmlFor="content">
                          Content
                        </Label>
                        <div className="col-span-3 border-[1px] rounded-md focus:ring focus:ring-ring active:ring active:ring-ring">
                          {/*
                            For integrating BlockNoteView into the discussion form, we should use this:
                          <BlockNoteView
                            className="max-h-[200px] overflow-y-auto p-2 rounded-md"
                            {...currTheme}
                            editor={editor}
                            onChange={handleContentTextChange}
                          /> */}
                          <Textarea
                            className="w-full p-2 rounded-md"
                            placeholder="Enter content"
                            value={contentText}
                            onChange={(e) => setContentText(e.target.value)}
                          />
                        </div>
                      </div>
                      <div className="grid grid-cols-4 items-center gap-4">
                        <Label className="text-right" htmlFor="category">
                          Category
                        </Label>
                        <Select
                          value={category}
                          onValueChange={handleCategoryChange}
                        >
                          <SelectTrigger className={cn("w-max")}>
                            <SelectValue
                              className="w-max"
                              placeholder="Select a category"
                            />
                          </SelectTrigger>
                          <SelectContent>
                            {categories.map((category, index) => (
                              <SelectItem key={index} value={category}>
                                {category}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                    </div>
                    <DialogFooter>
                      <Button type="submit" onClick={handleSubmit}>
                        Post Discussion
                      </Button>
                    </DialogFooter>
                  </DialogContent>
                </Dialog>
              </div>
            </div>
            <div className="mt-4 space-y-4" />
            {newDiscussions.map((discussion, index) => (
              <DiscussionCard key={index} {...discussion} />
            ))}
            <div className="mt-4 space-y-4">
              {searchFilteredDiscussions.map((discussion, index) => (
                <DiscussionCard key={index} {...discussion} />
              ))}
            </div>
          </section>
        </div>
      </main>
    </>
  );
}

function DiscussionCard({
  title,
  content,
  category,
  replies,
  views,
  poster,
}: DiscussionCardProps) {
  const router = useRouter();

  return (
    <Card
      className={cn("hover:brightness-125 hover:cursor-pointer")}
      onClick={() => router.push("/platform/discussions/1")}
    >
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage alt={poster.name} src={poster.avatar} />
            {/* initials */}
            <AvatarFallback>
              {poster.name.charAt(0) + poster.name.split(" ")[1].charAt(0)}
            </AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{poster.name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {category}
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
        <h3 className="text-lg font-medium">{title}</h3>
        <p className="mt-2 text-gray-500 dark:text-gray-400">{content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MessageCircleIcon className="h-4 w-4" />
          <span>{replies} replies</span>
          <Separator className="h-4" orientation="vertical" />
          <EyeIcon className="h-4 w-4" />
          <span>{views} views</span>
        </div>
      </CardFooter>
    </Card>
  );
}

function BookIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" />
    </svg>
  );
}

function EyeIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M2 12s3-7 10-7 10 7 10 7-3 7-10 7-10-7-10-7Z" />
      <circle cx="12" cy="12" r="3" />
    </svg>
  );
}

function MessageCircleIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="m3 21 1.9-5.7a8.5 8.5 0 1 1 3.8 3.8z" />
    </svg>
  );
}

function UserIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M19 21v-2a4 4 0 0 0-4-4H9a4 4 0 0 0-4 4v2" />
      <circle cx="12" cy="7" r="4" />
    </svg>
  );
}

function UsersIcon(props) {
  return (
    <svg
      {...props}
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
      <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" />
      <circle cx="9" cy="7" r="4" />
      <path d="M22 21v-2a4 4 0 0 0-3-3.87" />
      <path d="M16 3.13a4 4 0 0 1 0 7.75" />
    </svg>
  );
}
