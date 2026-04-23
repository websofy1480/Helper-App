"use client";

import { useEffect, useRef } from "react";

const servers = {
  iceServers: [{ urls: "stun:stun.l.google.com:19302" }],
};

export default function VideoPage() {
  const localVideo = useRef<HTMLVideoElement>(null);
  const remoteVideo = useRef<HTMLVideoElement>(null);
  const peerRef = useRef<RTCPeerConnection | null>(null);
  const wsRef = useRef<WebSocket | null>(null);

  const iceQueue = useRef<RTCIceCandidateInit[]>([]);

  useEffect(() => {
    const init = async () => {
      // start WS server
      await fetch("/api/socket");

      const ws = new WebSocket("ws://localhost:3000");
      wsRef.current = ws;

      ws.onopen = () => {
        console.log("✅ WS connected");
      };

      ws.onmessage = async (msg) => {
        const data = JSON.parse(msg.data);

        if (data.type === "offer") {
          await handleOffer(data.offer);
        }

        if (data.type === "answer") {
          await handleAnswer(data.answer);
        }

        if (data.type === "ice") {
          await handleICE(data.candidate);
        }
      };

      await start();

      // first user creates offer after delay
      setTimeout(() => {
        createOffer();
      }, 1000);
    };

    init();
  }, []);

  const send = (data: any) => {
    wsRef.current?.send(JSON.stringify(data));
  };

  const start = async () => {
    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
      audio: true,
    });

    if (localVideo.current) {
      localVideo.current.srcObject = stream;
    }

    const peer = new RTCPeerConnection(servers);
    peerRef.current = peer;

    peer.ontrack = (e) => {
      console.log("🎥 TRACK RECEIVED");
      if (remoteVideo.current) {
        remoteVideo.current.srcObject = e.streams[0];
      }
    };

    peer.onicecandidate = (e) => {
      if (e.candidate) {
        send({ type: "ice", candidate: e.candidate });
      }
    };

    stream.getTracks().forEach((track) => {
      peer.addTrack(track, stream);
    });
  };

  const createOffer = async () => {
    const peer = peerRef.current!;
    const offer = await peer.createOffer();
    await peer.setLocalDescription(offer);

    send({ type: "offer", offer });
  };

  const handleOffer = async (offer: RTCSessionDescriptionInit) => {
    const peer = peerRef.current!;

    await peer.setRemoteDescription(offer);

    const answer = await peer.createAnswer();
    await peer.setLocalDescription(answer);

    send({ type: "answer", answer });
  };

  const handleAnswer = async (answer: RTCSessionDescriptionInit) => {
    await peerRef.current!.setRemoteDescription(answer);
  };

  const handleICE = async (candidate: RTCIceCandidateInit) => {
    const peer = peerRef.current!;

    if (peer.remoteDescription) {
      await peer.addIceCandidate(candidate);
    } else {
      iceQueue.current.push(candidate);
    }
  };

  return (
    <div className="flex gap-4 p-10">
      <video ref={localVideo} autoPlay muted className="w-1/2 bg-black" />
      <video ref={remoteVideo} autoPlay muted className="w-1/2 bg-black" />
    </div>
  );
}