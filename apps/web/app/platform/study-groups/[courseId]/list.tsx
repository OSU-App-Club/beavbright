"use client";
import { HmsRoom } from "@/app/lib/types";
import { useCallback, useMemo, useState } from "react";
import { RoomCard } from "../../(components)/cards";
import RoomForm from "./form";

export default function ListRooms({ serverRooms }: { serverRooms: HmsRoom[] }) {
  const [rooms, setRooms] = useState<HmsRoom[]>(serverRooms);

  const activeRooms = useMemo(
    () => rooms.filter((room) => room.enabled),
    [rooms]
  );

  const addNewRoom = useCallback((room: HmsRoom) => {
    setRooms((rooms) => [...rooms, room]);
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {activeRooms.map((room) => (
        <RoomCard key={room.id} room={room} />
      ))}
      <RoomForm onAdd={addNewRoom} />
    </div>
  );
}
