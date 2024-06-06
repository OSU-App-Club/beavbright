import View from "./view";
import { getSession } from "@/app/lib/session";

export default async function Profile() {
  const session = await getSession();

  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <View session={JSON.parse(JSON.stringify(session))} />
      </main>
    </>
  );
}
