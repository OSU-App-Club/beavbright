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

import {
  createChildReply,
  createNewDiscussion,
  createNewReply,
  deleteDiscussionReply,
} from "@/app/lib/actions";
import { Icons } from "@/components/icons";
import "@blocknote/core/fonts/inter.css";
import "@blocknote/react/style.css";
import "@ui/styles/globals.css";
import { AnimatePresence } from "framer-motion";
import {
  DiscussionCard,
  DiscussionOpener,
  DiscussionReplyList,
} from "../(components)/cards";

export default function View({
  discussions,
  categories,
  session,
}: {
  discussions: Discussion[];
  categories: string[];
  session: any;
}) {
  const [open, setOpen] = useState(false);
  const [loading, setLoading] = useState(false);
  const [title, setTitle] = useState<string>("");
  const [search, setSearch] = useState<string>("");
  const [filter, setFilter] = useState<string[]>([]);
  const [category, setCategory] = useState<string>("");
  const [error, setError] = useState<string | null>(null);
  const [contentText, setContentText] = useState<string>("");
  const [clientDiscussions, setDiscussions] = useState(discussions);

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
  }, [filter, discussions, clientDiscussions]);

  const handleSearchChange = (value: string) => {
    setSearch(value);
  };

  const searchFilter = (discussion: Discussion) => {
    if (search === "") {
      return true;
    }
    return (
      discussion.title.toLowerCase().includes(search.toLowerCase()) ||
      discussion.body.toLowerCase().includes(search.toLowerCase())
    );
  };

  const searchFilteredDiscussions = useMemo(() => {
    return filteredDiscussions.filter(searchFilter);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search, filteredDiscussions]);

  const handleTitleChange = useCallback((value: string) => {
    setTitle(value);
  }, []);

  const handleCategoryChange = useCallback((value: string) => {
    setCategory(value);
  }, []);

  const onSubmit = useCallback(
    async (e: React.FormEvent<HTMLFormElement>) => {
      setLoading(true);
      e.preventDefault();
      if (title === "" || contentText === "" || category === "") {
        setError("Please fill out all fields!");
        setLoading(false);
        setTimeout(() => {
          setError(null);
        }, 4000);
        return;
      }
      const newDiscussion = await createNewDiscussion({
        title,
        body: contentText,
        category,
        userId: session.userId,
      });
      setDiscussions((prev) => [newDiscussion, ...prev]);
      setTitle("");
      setContentText("");
      setCategory("");
      setOpen(false);
      setLoading(false);
    },
    [title, contentText, category, session.userId]
  );

  // For when we integrate BlockNoteView into the discussion form
  //   const currTheme = {
  //     [`data-theme-${theme}`]: true,
  //   };
  //   const handleContentTextChange = useCallback(() => {
  //     setContentText(JSON.stringify(editor.document));
  //   }, [editor.document]);
  //   const { theme } = useTheme();
  //   const editor = useCreateBlockNote();

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
                {categories.map((category: string, index: number) => (
                  <DropdownMenuCheckboxItem
                    key={index}
                    checked={filter.includes(category)}
                    onCheckedChange={(checked: boolean) => {
                      handleFilterChange(
                        checked
                          ? [...filter, category]
                          : filter.filter((item: string) => item !== category)
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
            <Dialog open={open} onOpenChange={setOpen}>
              <DialogTrigger asChild>
                <Button size="sm" variant="outline">
                  Start a Discussion
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[500px]">
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
                          {categories.map((category: string, index: number) => (
                            <SelectItem key={index} value={category}>
                              {category}
                            </SelectItem>
                          ))}
                        </SelectContent>
                      </Select>
                    </div>
                  </div>
                  <DialogFooter>
                    <Button
                      type="submit"
                      disabled={loading}
                      variant={error ? "destructive" : "default"}
                    >
                      {loading ? (
                        <div className="flex items-center justify-center gap-2">
                          <Icons.spinner className="w-6 h-6 animate-spin" />
                          <p>Creating Discussion...</p>
                        </div>
                      ) : (
                        <>
                          {error ? (
                            <div className="text-sm text-center">{error}</div>
                          ) : (
                            <>Start Discussion</>
                          )}
                        </>
                      )}
                    </Button>
                  </DialogFooter>
                </form>
              </DialogContent>
            </Dialog>
          </div>
        </div>
        <ul className="mt-4 space-y-4">
          {/* https://github.com/framer/motion/issues/1850#issuecomment-1876786414  */}
          <AnimatePresence initial={false} mode="popLayout">
            {searchFilteredDiscussions.map((discussion: Discussion) => (
              <DiscussionCard
                key={discussion.id}
                discussion={discussion}
                session={session}
                categories={categories}
              />
            ))}
          </AnimatePresence>
        </ul>
      </section>
    </div>
  );
}

export function DiscussionView({
  discussionDetails,
  session,
  replies,
}: {
  discussionDetails: Discussion;
  session: any;
  replies: any[];
}) {
  const [clientReplies, setReplies] = useState(replies);
  const onDeleteReply = useCallback(async (id: string) => {
    await deleteDiscussionReply(id);
    setReplies((replies) => replies.filter((reply) => reply.id !== id));
  }, []);

  const onAddReply = useCallback(
    async (reply: string, replyId?: string) => {
      if (!reply) return;
      if (!replyId) {
        const newReply = await createNewReply({
          posterId: session.userId,
          discussionId: discussionDetails.id,
          body: reply,
        });
        setReplies((replies) => [...replies, newReply]);
      } else {
        const newReply = await createChildReply({
          posterId: session.userId,
          discussionId: discussionDetails.id,
          body: reply,
          replyId,
        });
        setReplies((replies) => [...replies, newReply]);
      }
    },
    [discussionDetails.id, session.userId]
  );
  return (
    <section>
      <DiscussionOpener
        session={session}
        discussion={JSON.parse(JSON.stringify(discussionDetails))}
        onAddReply={onAddReply}
      />
      <div className="mt-8 space-y-4">
        <DiscussionReplyList
          replies={JSON.parse(JSON.stringify(clientReplies))}
          onDeleteReply={onDeleteReply}
          onAddReply={onAddReply}
          discussionId={discussionDetails.id}
          session={session}
        />
      </div>
    </section>
  );
}
