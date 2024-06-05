"use client";
import { PrismaRoom } from "@/app/lib/types";
import { EnterIcon } from "@radix-ui/react-icons";
import { buttonVariants } from "@ui/components/ui/button";
import { cn } from "@ui/lib/utils";
import Link from "next/link";
import { useCallback, useState } from "react";
import { RoomCard } from "../../(components)/cards";
import RoomForm from "./form";

export default function ListRooms({
  serverRooms,
  courseName,
}: {
  serverRooms: PrismaRoom[];
  courseName: string;
}) {
  const [rooms, setRooms] = useState<PrismaRoom[]>(serverRooms);

  const addNewRoom = useCallback((room: PrismaRoom) => {
    setRooms((rooms) => [...rooms, room]);
  }, []);

  return (
    <div className="flex flex-col justify-between space-y-2 gap-2 p-4">
      <div className="flex items-center justify-between">
        <h1 className="text-3xl font-bold">{courseName} Study Rooms</h1>
        <Link
          href="/platform/study-groups"
          className={cn(buttonVariants({ variant: "link" }))}
        >
          <EnterIcon className="mr-2" />
          Go back
        </Link>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {rooms.map((room) => (
          <RoomCard key={room.id} room={room} />
        ))}
        <RoomForm onAdd={addNewRoom} />
      </div>
    </div>
  );
}
