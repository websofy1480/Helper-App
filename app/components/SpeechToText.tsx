"use client";

import { useState } from "react";
import SpeechRecognition, {
  useSpeechRecognition,
} from "react-speech-recognition";

const languages = {
  en: "en-IN",
  hi: "hi-IN",
  ar: "ar-SA",
};

export default function SpeechRecorder() {
  const [lang, setLang] = useState<"en" | "hi" | "ar">("en");
  const [copied, setCopied] = useState(false);

  const {
    transcript,
    listening,
    resetTranscript,
    browserSupportsSpeechRecognition,
  } = useSpeechRecognition();

  if (!browserSupportsSpeechRecognition) {
    return <p className="text-center mt-10">Browser not supported</p>;
  }

  const start = () => {
    SpeechRecognition.startListening({
      continuous: true,
      language: languages[lang],
    });
  };

  const stop = () => {
    SpeechRecognition.stopListening();
  };

  const copyText = async () => {
    if (!transcript) return;
    await navigator.clipboard.writeText(transcript);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-linear-to-br from-gray-900 via-gray-800 to-black text-white ">
      
      <div className="w-full max-w-2xl backdrop-blur-xl bg-white/10 border border-white/10 rounded-2xl shadow-2xl p-6 space-y-6">

        {/* Header */}
        <h1 className="text-2xl font-semibold text-center tracking-wide">
          🎤 Speech to Text
        </h1>

        {/* Language Selector */}
        <div className="flex justify-center">
          <select
            value={lang}
            onChange={(e) => setLang(e.target.value as any)}
            className="bg-black/40 border border-white/20 px-4 py-2 rounded-lg outline-none"
          >
            <option value="en">English</option>
            <option value="hi">Hindi</option>
            <option value="ar">Arabic</option>
          </select>
        </div>

        {/* Mic Button */}
        <div className="flex justify-center">
          <button
            onClick={listening ? stop : start}
            className={`relative w-20 h-20 rounded-full flex items-center justify-center text-2xl
            transition-all duration-300
            ${listening ? "bg-red-500 scale-110" : "bg-green-500"}`}
          >
            🎤

            {/* Glow Effect */}
            {listening && (
              <span className="absolute inset-0 rounded-full animate-ping bg-red-400 opacity-30"></span>
            )}
          </button>
        </div>

        {/* Transcript Box */}
        <div className="bg-black/40 border border-white/10 rounded-xl p-4 min-h-35 text-gray-200 leading-relaxed">
          {transcript || (
            <span className="text-gray-400">
              Start speaking... your text will appear here
            </span>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap justify-between gap-3">

          {/* Copy */}
          <button
            onClick={copyText}
            className="px-4 py-2 rounded-lg bg-blue-500 hover:bg-blue-600 transition"
          >
            {copied ? "Copied ✅" : "Copy"}
          </button>

          {/* Stop */}
          <button
            onClick={stop}
            className="px-4 py-2 rounded-lg bg-red-500 hover:bg-red-600 transition"
          >
            Stop
          </button>

          {/* Reset */}
          <button
            onClick={resetTranscript}
            className="px-4 py-2 rounded-lg bg-gray-700 hover:bg-gray-600 transition"
          >
            Reset
          </button>
        </div>

        {/* Status */}
        <p className="text-center text-sm text-gray-400">
          {listening ? "🎙️ Listening..." : "🛑 Not Listening"}
        </p>

      </div>
    </div>
  );
}