"use client";
import { useTheme } from "next-themes";
import { useAccessibility } from "../context/AccessibilityContext";
import { useEffect, useState } from "react";

export default function TopBar() {
  const { setFontSize, fontSize } = useAccessibility();
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  if (!mounted) return null;

  return (
    <div className="w-full bg-gray-500 text-white flex justify-between items-center px-4 py-2">

      {/* Font Controls */}
      <div className="flex gap-2">
        <button  onClick={() => setFontSize(15)} className="w-14 border-2 rounded-2xl cursor-pointer">A-</button>
        <button  onClick={() => setFontSize(14)} className="w-14 border-2 rounded-2xl cursor-pointer">A--</button>
        <button  onClick={() => setFontSize(16)} className="w-14 border-2 rounded-2xl cursor-pointer">A</button>
        <button  onClick={() => setFontSize(18)} className="w-14 border-2 rounded-2xl cursor-pointer">A+</button>
        <button  onClick={() => setFontSize(20)} className="w-14 border-2 rounded-2xl cursor-pointer">A++</button>
      </div>
      {/* Theme Controls */}
      <div className="flex gap-2">
        {/* <button
          onClick={() => setTheme("default")}
          className="px-3 py-1 bg-blue-600 rounded">
          Default
        </button>
        <button onClick={() => setTheme("dark")}
          className="px-3 py-1 bg-black rounded">
          Dark
        </button>
        <button
          onClick={() => setTheme("high-contrast")}
          className="px-3 py-1 bg-yellow-500 text-black rounded">
          High Contrast
        </button> */}

        <button className="w-20 border-2 rounded-2xl cursor-pointer" onClick={() => setTheme("light")}>Light</button>
        <button className="w-20 border-2 rounded-2xl cursor-pointer" onClick={() => setTheme("dark")}>Dark</button>
        <button className="w-20 border-2 rounded-2xl cursor-pointer" onClick={() => setTheme("blue")}>Blue</button>
        <button className="w-20 border-2 rounded-2xl cursor-pointer" onClick={() => setTheme("green")}>Green</button>
        <button className="w-20 border-2 rounded-2xl cursor-pointer" onClick={() => setTheme("purple")}>Purple</button>
      </div>
    </div>
  );
}
