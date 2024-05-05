"use client";

import { getUserById } from "@/app/lib/actions";
import { Avatar, AvatarFallback, AvatarImage } from "@ui/components/ui/avatar";
import { useEffect, useState } from "react";

export default function UserAvatar({ session }: { session: any }) {
  const [user, setUser] = useState<any | null>(null);
  useEffect(() => {
    const user = getUserById(session.userId);
    setUser(user);
  });

  if (!user) {
    return null;
  }

  return (
    <div>
      <Avatar className="h-8 w-8">
        <AvatarImage
          alt={user.firstName + " " + user.lastName}
          src={user.avatar}
        />
        <AvatarFallback>
          {user.firstName.charAt(0).toUpperCase() +
            user.lastName.charAt(0).toUpperCase()}
        </AvatarFallback>
      </Avatar>
    </div>
  );
}
