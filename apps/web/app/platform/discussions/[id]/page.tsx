import { getDiscussionDetails } from "@/app/lib/actions";
import { replies } from "@/app/lib/constants";
import { SlashIcon } from "@radix-ui/react-icons";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Blockquote } from "@ui/components/ui/blockquote";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@ui/components/ui/breadcrumb";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@ui/components/ui/card";
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
import { Separator } from "@ui/components/ui/separator";
import { Textarea } from "@ui/components/ui/textarea";
import {
  ArrowBigLeftDash,
  ClockIcon,
  EyeIcon,
  MessageCircleIcon,
} from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import {
  DiscussionOpenerProps,
  DiscussionReplyProps,
} from "../../../lib/types";

export default async function Component() {
  const headersObj = headers();
  const discussionDetails = await getDiscussionDetails(
    headersObj.get("discussionId")
  );

  const breadcrumbs = [
    { href: "/platform", label: "Home" },
    { href: "/platform/discussions", label: "Discussions" },
    {
      href: `/platform/discussions/${discussionDetails.id}`,
      label: discussionDetails.title,
    },
  ];
  return (
    <>
      <div>
        <div className="container mx-auto grid grid-cols-1 gap-8 p-4">
          <div className="flex justify-between items-center gap-4">
            <AutoBreadcrumb links={breadcrumbs} />
            <nav>
              <Link
                className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400"
                href="/platform/discussions"
              >
                <ArrowBigLeftDash className="h-5 w-5" />
                Back
              </Link>
            </nav>
          </div>
          <section>
            <DiscussionOpener
              name={
                discussionDetails.poster.firstName +
                " " +
                discussionDetails.poster.lastName
              }
              avatar={discussionDetails.poster.avatar}
              content={discussionDetails.content}
              category={discussionDetails.category}
              replies={discussionDetails.replies}
              views={discussionDetails.views}
            />
            <div className="mt-8 space-y-4">
              {replies.map((reply, index) => (
                <DiscussionReply key={index} {...reply} />
              ))}
            </div>
          </section>
        </div>
      </div>
    </>
  );
}

interface AutoBreadcrumbProps {
  links: { href: string; label: string }[];
  separator?: React.ReactNode;
}

function AutoBreadcrumb({
  links,
  separator = <SlashIcon className="size-3" />,
}: AutoBreadcrumbProps) {
  return (
    <Breadcrumb>
      <BreadcrumbList>
        {links.map((link, index) => (
          <>
            <BreadcrumbItem key={index}>
              <BreadcrumbLink asChild>
                <Link href={link.href}>{link.label}</Link>
              </BreadcrumbLink>
            </BreadcrumbItem>
            {index !== links.length - 1 && (
              <BreadcrumbItem>
                <BreadcrumbLink asChild>{separator}</BreadcrumbLink>
              </BreadcrumbItem>
            )}
          </>
        ))}
      </BreadcrumbList>
    </Breadcrumb>
  );
}

export const DiscussionOpener: React.FC<DiscussionOpenerProps> = ({
  name,
  avatar,
  content,
  category,
  replies,
  views,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage alt={name} src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
            <div className="text-sm text-gray-500 dark:text-gray-400">
              {category}
            </div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h1 className="text-3xl font-bold">{content}</h1>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <MessageCircleIcon className="h-4 w-4" />
          <span>{replies} replies</span>
          <Separator className="h-4" orientation="vertical" />
          <EyeIcon className="h-4 w-4" />
          <span>{views} views</span>
          <Drawer>
            <DrawerTrigger asChild>
              <Button variant="outline">Reply</Button>
            </DrawerTrigger>
            <DrawerContent>
              <DrawerHeader>
                <DrawerTitle>Reply to discussion</DrawerTitle>
                <DrawerDescription>
                  Share your thoughts and advice with the community.
                </DrawerDescription>
              </DrawerHeader>
              <div className="grid gap-4 py-4">
                <Textarea
                  className="p-4 min-h-[200px]"
                  placeholder="Type your reply here..."
                />
              </div>
              <DrawerFooter>
                <Button type="submit">Submit</Button>
                <DrawerClose asChild>
                  <Button variant="outline">Cancel</Button>
                </DrawerClose>
              </DrawerFooter>
            </DrawerContent>
          </Drawer>
        </div>
      </CardFooter>
    </Card>
  );
};

export const DiscussionReply: React.FC<DiscussionReplyProps> = ({
  name,
  avatar,
  origin,
  content,
  date,
}) => {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center gap-2">
          <Avatar className="h-8 w-8">
            <AvatarImage alt={name} src={avatar} />
            <AvatarFallback>{name[0]}</AvatarFallback>
          </Avatar>
          <div>
            <div className="font-medium">{name}</div>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <Blockquote>{origin}</Blockquote>
        <p className="text-gray-500 dark:text-gray-400">{content}</p>
      </CardContent>
      <CardFooter>
        <div className="flex items-center gap-2 text-sm text-gray-500 dark:text-gray-400">
          <ClockIcon className="h-4 w-4" />
          <span>{date}</span>
        </div>
      </CardFooter>
    </Card>
  );
};
