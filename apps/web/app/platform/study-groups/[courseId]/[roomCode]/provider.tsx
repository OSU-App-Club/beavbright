"use client";
import { HMSRoomProvider } from "@100mslive/react-sdk";
export default function HmsWrapper({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <HMSRoomProvider>{children}</HMSRoomProvider>
    </>
  );
}
