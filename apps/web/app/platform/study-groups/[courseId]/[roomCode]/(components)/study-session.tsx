"use client";
import {
  selectIsConnectedToRoom,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Loader } from "lucide-react";
import { Session } from "next-auth";
import { useParams } from "next/navigation";
import { useEffect } from "react";
import { VideoBox } from "./boxes";

export function StudySession({ session }: { session: Session }) {
  const isConnected = useHMSStore(selectIsConnectedToRoom);
  const hmsActions = useHMSActions();
  const { roomCode } = useParams<{ courseId: string; roomCode: string }>();

  useEffect(() => {
    window.onpagehide = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };

    window.onunload = () => {
      if (isConnected) {
        hmsActions.leave();
      }
    };
  }, [isConnected, hmsActions]);

  // TODO: Fix "leave room" bug
  useEffect(() => {
    (async () => {
      const userName = session.user?.name || "Anonymous";
      if (!isConnected && roomCode) {
        const authToken = await hmsActions.getAuthTokenByRoomCode({ roomCode });
        try {
          await hmsActions.join({ userName, authToken });
        } catch (e) {
          throw new Error("Failed to join room");
        }
      }
    })();
  }, [isConnected, hmsActions, roomCode, session.user?.name]);

  return (
    <div className="flex flex-col h-full">
      {isConnected ? (
        <>
          <VideoBox session={session} />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <div className="text-2xl font-medium ">Connecting to room...</div>

          <Loader className="w-8 h-8 ml-2 animate-spin" />
        </div>
      )}
    </div>
  );
}
