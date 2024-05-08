import { getAllDiscussionCategories, getDicussions } from "@/app/lib/actions";
import { getSession } from "@/app/lib/session";
import View from "./view";

export default async function DiscussionsPage() {
  const discussions = await getDicussions();
  const categories = await getAllDiscussionCategories();
  const session = await getSession();
  return (
    <>
      <main className="container mx-auto grid grid-cols-1 w-4/6 gap-8 p-4">
        <div className="space-y-8">
          <View
            discussions={JSON.parse(JSON.stringify(discussions))}
            categories={JSON.parse(JSON.stringify(categories))}
            session={JSON.parse(JSON.stringify(session))}
          />
        </div>
      </main>
    </>
  );
}
