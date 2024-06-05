import { getSession } from "@/app/lib/session";
import prisma from "@/app/lib/prisma";
import View from "./view";

export default async function DiscussionsPage() {
  const session = await getSession();

  if (!session) return <div>Unauthorized</div>;

  const discussions = await prisma.discussion.findMany({
    include: {
      poster: true,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const categories = await prisma.discussion.findMany({
    select: {
      category: true,
    },
  });

  const defaultCategories = [
    "General",
    "Computer Science",
    "Study Groups",
    "Math",
    "Physics",
    "Biology",
    "Chemistry",
    "Business",
    "Engineering",
    "Health",
    "Humanities",
    "Social Sciences",
    "Events",
  ];

  const uniqueCategories = Array.from(
    new Set(categories.map((category) => category.category))
  ).filter((category) => category !== "");

  const allCategories = [...defaultCategories, ...uniqueCategories];

  return (
    <>
      <main className="container mx-auto grid grid-cols-1 w-full gap-8 p-4">
        <div className="space-y-8">
          <View
            discussions={JSON.parse(JSON.stringify(discussions))}
            categories={JSON.parse(JSON.stringify(allCategories))}
            session={JSON.parse(JSON.stringify(session))}
          />
        </div>
      </main>
    </>
  );
}
