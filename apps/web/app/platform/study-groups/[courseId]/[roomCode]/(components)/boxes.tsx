"use client";

import { Textarea } from "@ui/components/ui/textarea";
import {
  Card,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@ui/components/ui/card";
import { Button } from "@ui/components/ui/button";
import { MessaageBoxProps } from "@/app/lib/types";
import {
  selectHMSMessages,
  useHMSStore,
  useHMSActions,
} from "@100mslive/react-sdk";
import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export function ChatBox() {
  const hmsActions = useHMSActions();
  const storeMessages = useHMSStore(selectHMSMessages);
  const { courseId, roomCode } =
    useParams<{ courseId: string; roomCode: string }>();

  useEffect(() => {
    const token = hmsActions.getAuthTokenByRoomCode({ roomCode });
    hmsActions.join({
      userName: "Anonymous",
      authToken: token,
    });
  }, []);

  // TEMP
  const [sender, setSender] = useState<string>("Imgyeong");
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
        <CardTitle>Chats</CardTitle>
        <CardDescription>
          Note: All chats are not permanently stored.
        </CardDescription>
      </CardHeader>
      <div className="flex flex-col gap-1">
        {storeMessages.map((msg, i) => {
          return <MessageBox key={i} sender={sender} message={msg.message} />;
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

export function VideoBox() {
  return <div className="col-span-2 bg-slate-300"></div>;
}

export function MessageBox({ sender, message }: MessaageBoxProps) {
  return (
    <Card className="rounded-sm p-2">
      <CardDescription>{sender}</CardDescription>
      {message}
    </Card>
  );
}
