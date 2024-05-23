import { ChatBox, VideoBox } from "./boxes";

export default function StudySessionPage() {
  return (
    <div className="w-full grid grid-cols-3">
      <VideoBox />
      <ChatBox />
    </div>
  );
}
