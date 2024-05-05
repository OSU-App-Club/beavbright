import { getAllDiscussionCategories, getDicussions } from "@/lib/actions";
import { getSession } from "@/lib/session";
import { Discussion } from "@/lib/types";
import View from "./view";

export const dyanmic = "force-dynamic";

export default async function DiscussionsPage() {
  const discussions = await getDicussions();
  const categories = await getAllDiscussionCategories();
  const session = await getSession();
  return (
    <>
      <main className="container mx-auto grid grid-cols-1 gap-8 p-4">
        <div className="space-y-8">
          <View
            discussions={
              JSON.parse(JSON.stringify(discussions)) as Discussion[]
            }
            categories={JSON.parse(JSON.stringify(categories)) as string[]}
            session={session}
          />
        </div>
      </main>
    </>
  );
}
