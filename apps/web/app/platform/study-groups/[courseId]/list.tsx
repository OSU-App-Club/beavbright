"use client";
import { PrismaRoom } from "@/app/lib/types";
import { useCallback, useState } from "react";
import { RoomCard } from "../../(components)/cards";
import RoomForm from "./form";

export default function ListRooms({
  serverRooms,
}: {
  serverRooms: PrismaRoom[];
}) {
  const [rooms, setRooms] = useState<PrismaRoom[]>(serverRooms);

  const addNewRoom = useCallback((room: PrismaRoom) => {
    setRooms((rooms) => [...rooms, room]);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {rooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
      <RoomForm onAdd={addNewRoom} />
    </div>
  );
}
