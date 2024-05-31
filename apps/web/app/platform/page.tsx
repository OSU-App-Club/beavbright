import {
  Access,
  AddCourse,
  Create,
  Search,
  ThreeRecentStudyGroups,
} from "./(components)/cards";
import { getSession } from "@/app/lib/session";
import CookieModal from "@/components/CookieModal";

export default async function Dashboard() {
  const session = await getSession();
  const parsedSession = JSON.parse(JSON.stringify(session));
  const cookiesAccepted = parsedSession.cookiesAccepted || false;
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <div className="w-full h-full">
          <Access />
        </div>
        <Search />
        <div className="flex flex-col w-full h-full">
          <ThreeRecentStudyGroups />
        </div>
        <div className="w-full h-full">
          <AddCourse />
        </div>
        <div className="w-full h-full">
          <Create />
        </div>
      </main>
      {!cookiesAccepted && <CookieModal />}
    </>
  );
}
