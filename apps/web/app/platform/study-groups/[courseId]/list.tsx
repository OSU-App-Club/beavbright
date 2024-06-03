"use client";
import { useCallback, useMemo, useState } from "react";
import { RoomCard } from "../../(components)/cards";
import RoomForm from "./form";

type RoomCode = {
  id: string;
  createdAt: Date;
  code: string;
  roomId: string;
  role: string;
  enabled: boolean;
};

export type PrismaRoom = {
  id: string;
  createdAt: Date;
  name: string;
  description: string;
  courseId: string;
  creatorId: string;
  hmsId: string;
  hmsCode: RoomCode[];
};

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
