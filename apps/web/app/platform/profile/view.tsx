"use client";

import { Icons } from "@/components/icons";
import { Button } from "@ui/components/ui/button";
import { Input } from "@ui/components/ui/input";
import { Label } from "@ui/components/ui/label";
import { getUserById } from "@/app/lib/actions";
import { useEffect, useState } from "react";

function Name({ user }: { user: any }) {
  return (
    <>
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Name</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="flex flex-col">
          <Label htmlFor="first-name" className="mb-2">
            First Name
          </Label>
          <Input
            id="first-name"
            type="text"
            placeholder={user.firstName}
            defaultValue={user.firstName}
          />
        </div>
        <div className="flex flex-col">
          <Label htmlFor="last-name" className="mb-2">
            Last Name
          </Label>
          <Input
            id="last-name"
            type="text"
            placeholder={user.lastName}
            defaultValue={user.lastName}
          />
        </div>
      </div>
      <div className="flex justify-end mt-4">
        <Button>Update Name</Button>
      </div>
    </>
  );
}

function Password() {
  return (
    <div className="mt-6">
      <h2 className="text-lg font-semibold mb-4 border-b pb-2">Password</h2>
      <div className="flex flex-col">
        <Label htmlFor="old-password" className="mb-2">
          Old Password
        </Label>
        <Input id="old-password" type="password" />
      </div>
      <div className="flex flex-col mt-4">
        <Label htmlFor="new-password" className="mb-2">
          New Password
        </Label>
        <Input id="new-password" type="password" />
      </div>
      <div className="flex flex-col mt-4">
        <Label htmlFor="confirm-new-password" className="mb-2">
          Confirm New Password
        </Label>
        <Input id="confirm-new-password" type="password" />
      </div>
      <div className="flex justify-end mt-4">
        <Button>Update Password</Button>
      </div>
    </div>
  );
}

export default function View({ session }: { session: any }) {
  const [user, setUser] = useState<any | null>(null);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    async function fetchUser() {
      setLoading(true);
      const userData = await getUserById(session.userId);
      setUser(userData);
      console.log(userData);
      setLoading(false);
    }

    fetchUser();
  }, [session.userId]);

  if (loading) {
    return (
      <div className="flex items-center justify-center gap-2">
        <Icons.spinner className="w-6 h-6 animate-spin" />
        <p>Loading...</p>
      </div>
    );
  }

  if (!user) {
    return null;
  }

  return (
    <div>
      <Name user={user} />
      <Password />
    </div>
  );
}
