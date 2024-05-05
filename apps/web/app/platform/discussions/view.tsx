"use client";
import { Discussion } from "@/app/lib/types";
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
import { Textarea } from "@ui/components/ui/textarea";
import { cn } from "@ui/lib/utils";
import { FilterIcon, SearchIcon } from "lucide-react";
import { useCallback, useMemo, useState } from "react";

import { createNewDiscussion } from "@/app/lib/actions";
import "@blocknote/core/fonts/inter.css";
import { useCreateBlockNote } from "@blocknote/react";
import "@blocknote/react/style.css";
import "@ui/styles/globals.css";
import { useTheme } from "next-themes";
import { DiscussionCard } from "../(components)/cards";

// TODO: Add optimistic UI updates
export default function View({
  discussions,
  categories,
  session,
}: {
  discussions: Discussion[];
  categories: string[];
  session: any;
}) {
  const editor = useCreateBlockNote();
  const [clientDiscussions, setDiscussions] = useState(discussions);
  const [filter, setFilter] = useState<string[]>([]);
  const [search, setSearch] = useState<string>("");

  const handleFilterChange = useCallback(
    (value: string[]) => {
      setFilter(value);
    },
    [setFilter]
  );

  const filteredDiscussions = useMemo(() => {
    if (filter.length === 0) {
      return discussions;
    }
    return clientDiscussions.filter((discussion) =>
      filter.includes(discussion.category)
    );
  }, [filter]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const searchFilter = (discussion: Discussion) => {
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
  }, [search, filteredDiscussions, clientDiscussions.length]);

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

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      const newDiscussion = await createNewDiscussion({
        title,
        content: contentText,
        category,
        userId: session.userId,
      });
      setDiscussions((prev) => [
        newDiscussion as unknown as Discussion,
        ...prev,
      ]);
    },
    [title, contentText, category]
  );

  return (
    <div>
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
                          : filter.filter((item) => item !== category)
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
                    Share your thoughts, questions, or ideas with the community.
                  </DialogDescription>
                </DialogHeader>
                <form onSubmit={onSubmit}>
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
                          {categories &&
                            categories.map((category, index) => (
                              <SelectItem
                                key={index}
                                value={category ? category : "ALL"}
                              >
                                {category}
                              </SelectItem>
                            ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button type="submit">Post Discussion</Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <div className="mt-4 space-y-4">
          {searchFilteredDiscussions.map((discussion, index) => (
            <DiscussionCard
              key={index}
              discussion={discussion}
              session={session}
              categories={categories}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
