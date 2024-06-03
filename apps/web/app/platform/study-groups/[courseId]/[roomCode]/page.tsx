import { getSession } from "@/app/lib/session";
import { StudySession } from "./(components)/study-session";

export default async function StudySessionPage() {
  const session = await getSession();
  if (!session) throw new Error("Session not found");
  return (
    <>
      <StudySession session={session} />
    </>
  );
}
