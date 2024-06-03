import { getUserById } from "@/app/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { Session } from "next-auth";

export default async function UserAvatar({
  session,
}: {
  session: Session | null;
}) {
  if (!session || !session.user?.id) {
    return null;
  }
  const user = await getUserById(session.user?.id);
  if (!user) {
    return null;
  }
  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage src={user.image ?? ""} />
        <AvatarFallback>{user.name}</AvatarFallback>
      </Avatar>
    </div>
  );
}
