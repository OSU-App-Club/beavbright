"use client";

import { ChatBox, VideoBox } from "./(components)/boxes";
import { useHMSStore, selectIsConnectedToRoom } from "@100mslive/react-sdk";

export default function session() {
  const isConnected = useHMSStore(selectIsConnectedToRoom);

  return (
    <div className="w-full grid grid-cols-3">
      <VideoBox />
      <ChatBox />
    </div>
  );
}
