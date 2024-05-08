import { getDiscussionDetails, getDiscussionReplies } from "@/app/lib/actions";
import { getSession } from "@/app/lib/session";
import { SlashIcon } from "@radix-ui/react-icons";
import {
  Breadcrumb,
  BreadcrumbItem,
  BreadcrumbLink,
  BreadcrumbList,
} from "@ui/components/ui/breadcrumb";
import { ArrowBigLeftDash } from "lucide-react";
import { headers } from "next/headers";
import Link from "next/link";
import { DiscussionView } from "../view";

export default async function Component() {
  const headersObj = headers();
  const discussionDetails = await getDiscussionDetails(
    headersObj.get("discussionId")
  );
  const session = await getSession();
  const replies = await getDiscussionReplies(headersObj.get("discussionId"));

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
        <div className="container mx-auto grid grid-cols-1 w-4/6 gap-8 p-8">
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
          <DiscussionView
            discussionDetails={discussionDetails}
            session={session}
            replies={JSON.parse(JSON.stringify(replies))}
          />
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
