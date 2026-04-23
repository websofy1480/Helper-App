"use client";

import { useState } from "react";

export default function Home() {
  const [messages, setMessages] = useState<any[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", content: input };

    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: input,
        }),
      });

      const data = await res.json();

      const botMessage = {
        role: "assistant",
        content: data.reply,
      };

      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      console.error(err);
    }

    setLoading(false);
  };

  return (
    <div className="h-screen flex flex-col bg-gray-900 text-white">

      {/* Chat Area */}
      <div className="flex-1 overflow-y-auto p-4 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-xl ${msg.role === "user"
              ? "bg-blue-600 ml-auto"
              : "bg-gray-700"
              }`}
          >
            {msg.content}
          </div>
        ))}

        {loading && <p className="text-gray-400">Typing...</p>}
      </div>

      {/* Input */}
      <div className="p-4 border-t border-gray-700 flex gap-2">
        <input
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 p-3 rounded-lg bg-gray-800 outline-none"
          placeholder="Ask anything..."
        />

        <button
          onClick={sendMessage}
          className="bg-blue-600 px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}