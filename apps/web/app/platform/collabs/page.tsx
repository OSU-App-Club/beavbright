"use client";

import { ChatBox, VideoBox } from "./(components)/boxes";

export default function CollabPage() {
  return (
    <div className="w-full grid grid-cols-3">
      <VideoBox />
      <ChatBox />
    </div>
  );
}
