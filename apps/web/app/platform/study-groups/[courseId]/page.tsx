import { getSession } from "@/app/lib/session";
import { ListRoomsResponse } from "@/app/lib/types";
import axios from "axios";
import ListRooms from "./list";

async function getRooms(courseId: string) {
  const session = await getSession();
  if (!session) throw new Error("Unauthorized");

  try {
    const response = await axios.get(
      "https://api.100ms.live/v2/rooms?enabled=true",
      {
        headers: {
          Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
        },
      }
    );
    const rooms = response.data as ListRoomsResponse;
    if (!rooms.data) {
      return [];
    }
    const codes = await Promise.all(
      rooms.data.map(async (room) => {
        const response = await axios.post(
          `https://api.100ms.live/v2/room-codes/room/${room.id}`,
          {},
          {
            headers: {
              Authorization: `Bearer ${process.env.HMS_MANAGEMENT_TOKEN}`,
            },
          }
        );
        return response.data.data;
      })
    );
    const roomsWithCodes = rooms.data.map((room, index) => {
      return {
        ...room,
        codes: codes[index],
      };
    });
    return roomsWithCodes;
  } catch (error) {
    console.error(error);
    throw new Error("Failed to get rooms");
  }
}

export default async function RoomPage({
  params,
}: {
  params: { courseId: string };
}) {
  const rooms = await getRooms(params.courseId);
  return (
    <>
      <main>
        <ListRooms serverRooms={rooms} />
      </main>
    </>
  );
}
