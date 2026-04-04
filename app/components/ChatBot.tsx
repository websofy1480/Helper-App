"use client";
import { useState } from "react";

export default function ChatBot() {
  const [message, setMessage] = useState("");
  const [reply, setReply] = useState("");

  async function sendMessage() {
    const res = await fetch("/api/chat", {
      method: "POST",
      body: JSON.stringify({ message }),
    });
    const data = await res.json();
    setReply(data.reply);
  }

  return (
    <div className="fixed bottom-5 right-5 bg-white shadow-lg p-4 rounded-xl w-80">
      <textarea
        className="w-full border p-2 rounded"
        value={message}
        onChange={(e) => setMessage(e.target.value)}
      />
      <button
        onClick={sendMessage}
        className="bg-yellow-200  px-4 py-2 mt-2 rounded"
      >
        Send
      </button>
      <p className="mt-2">{reply}</p>
    </div>
  );
}
