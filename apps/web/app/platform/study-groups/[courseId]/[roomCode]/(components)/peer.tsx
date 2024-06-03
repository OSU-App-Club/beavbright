"use client";
import { HMSPeer, useVideo } from "@100mslive/react-sdk";

export function Peer({ peer }: { peer: HMSPeer }) {
  const { videoRef } = useVideo({
    trackId: peer.videoTrack,
  });
  return (
    <>
      <div className="relative group overflow-hidden rounded-lg w-full max-h-full mx-auto">
        <video
          ref={videoRef}
          autoPlay
          muted
          playsInline
          //   TODO: Figure out how to mirror the video
          className={`w-full h-full object-contain ${
            peer.isLocal ? "transform scale-x-[-1]" : "transform scale-x-[-1]"
          }`}
        />
        <div className="absolute inset-0 bg-black/50 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
          <div className="text-white text-lg font-medium">
            {peer.name} {peer.isLocal ? "(You)" : ""}
          </div>
        </div>
      </div>
    </>
  );
}
