"use client";

import { MessaageBoxProps } from "@/app/lib/types";
import {
  HMSPeer,
  selectHMSMessages,
  selectIsLocalAudioEnabled,
  selectIsLocalVideoEnabled,
  selectPeers,
  useHMSActions,
  useHMSStore,
} from "@100mslive/react-sdk";
import { Button } from "@ui/components/ui/button";
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@ui/components/ui/card";
import { Textarea } from "@ui/components/ui/textarea";
import {
  CameraIcon,
  CameraOffIcon,
  MessageCircleIcon,
  MicIcon,
  MicOffIcon,
} from "lucide-react";
import { useEffect, useState } from "react";

import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@ui/components/ui/tooltip";
import { Session } from "next-auth";
import { useParams, useRouter } from "next/navigation";
import { Peer } from "./peer";

export function ChatBox({ session }: { session: Session }) {
  const hmsActions = useHMSActions();
  const storeMessages = useHMSStore(selectHMSMessages);
  const [input, setInput] = useState<string>("");

  const sendChat = () => {
    if (input.length > 0) {
      hmsActions.sendBroadcastMessage(input);
      setInput("");
    }
  };

  const onChangeHandler: React.ChangeEventHandler<HTMLTextAreaElement> = (
    event
  ) => {
    setInput(event.target.value);
  };

  return (
    <Card className="col-span-1 p-3">
      <CardHeader>
        <CardTitle>Chat</CardTitle>
        <CardDescription>
          Note: Chat messages are not permanently stored.
        </CardDescription>
      </CardHeader>
      <div className="flex flex-col gap-1">
        {storeMessages.map((msg, i) => {
          return (
            <MessageBox
              key={i}
              sender={msg.senderName ?? "Anonmyous"}
              message={msg.message}
            />
          );
        })}
      </div>
      <div className="flex space-x-2 items-center">
        <Textarea
          className="resize-none mt-4"
          placeholder="Type your message here."
          value={input}
          onChange={onChangeHandler}
        />
        <Button onClick={sendChat}>Send</Button>
      </div>
    </Card>
  );
}

export function VideoBox({ session }: { session: Session }) {
  const peers = useHMSStore(selectPeers);
  const router = useRouter();
  const hmsActions = useHMSActions();
  const audioOn = useHMSStore(selectIsLocalAudioEnabled);
  const videoOn = useHMSStore(selectIsLocalVideoEnabled);
  const [audioState, setAudioState] = useState(audioOn);
  const [cameraState, setCameraState] = useState(videoOn);
  const { courseId } = useParams<{ courseId: string; roomCode: string }>();
  const [showChat, setShowChat] = useState(false);

  const toggleMute = () => {
    setAudioState(!audioState);
    hmsActions.setLocalAudioEnabled(audioState);
  };

  const toggleCamera = () => {
    setCameraState(!cameraState);
    hmsActions.setLocalVideoEnabled(cameraState);
  };

  const toggleChat = () => {
    setShowChat(!showChat);
  };

  async function leaveCall() {
    try {
      await hmsActions.leave();
      router.push(`/platform/study-groups/${courseId}`);
      router.refresh();
    } catch (e) {
      throw new Error("Failed to leave room");
    }
  }

  useEffect(() => {
    window.addEventListener("beforeunload", () => hmsActions.leave());
    window.addEventListener("onunload", () => hmsActions.leave());
  }, [hmsActions]);

  return (
    <>
      <div className="flex flex-col h-full">
        <div className="grid place-items-center auto-cols-fr md:grid-cols-3 gap-4 h-full">
          {peers.map((peer: HMSPeer) => (
            <Peer key={peer.id} peer={peer} />
          ))}
        </div>
        <TooltipProvider>
          <div className="py-4 px-6 flex items-center justify-between bg-muted relative bottom-0 left-0 w-full">
            <div className="flex items-center gap-4">
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={toggleMute}
                  >
                    {audioState ? (
                      <MicOffIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <MicIcon className="w-6 h-6" />
                    )}
                    <span className="sr-only">
                      {audioState ? "Mute" : "Unmute"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{audioState ? "Unmute" : "Mute"}</p>
                </TooltipContent>
              </Tooltip>
              <Tooltip>
                <TooltipTrigger>
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-white"
                    onClick={toggleCamera}
                  >
                    {cameraState ? (
                      <CameraOffIcon className="w-6 h-6 text-red-500" />
                    ) : (
                      <CameraIcon className="w-6 h-6" />
                    )}
                    <span className="sr-only">
                      {cameraState ? "Turn on Camera" : "Turn off Camera"}
                    </span>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{cameraState ? "Enable Camera" : "Disable Camera"}</p>
                </TooltipContent>
              </Tooltip>
              <Button
                variant="ghost"
                size="icon"
                className="text-white"
                onClick={toggleChat}
              >
                <MessageCircleIcon className="w-6 h-6" />
                <span className="sr-only">Chat</span>
              </Button>
            </div>
            <Button
              variant="destructive"
              className="bg-red-500 hover:bg-red-600 text-white"
              onClick={leaveCall}
            >
              End Call
            </Button>
          </div>
        </TooltipProvider>

        {showChat && (
          <div className="flex-grow">
            <ChatBox session={session} />
          </div>
        )}
      </div>
    </>
  );
}

export function MessageBox({ sender, message }: MessaageBoxProps) {
  return (
    <Card className="rounded-sm p-2">
      <CardDescription>{sender}</CardDescription>
      {message}
    </Card>
  );
}
