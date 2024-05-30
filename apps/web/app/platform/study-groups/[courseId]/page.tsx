"use client";
import { RoomCard } from "../../(components)/cards";

export default function RoomPage() {
  return (
    <>
      <main className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        <RoomCard />
      </main>
    </>
  );
}
