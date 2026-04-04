"use client";
import { useState } from "react";

export default function KeywordInput({ onChange } :{onChange : any}) {
  const [keywords, setKeywords] = useState([""]);

  const handleChange = (index: number, value: string) => {
    const updated = [...keywords];
    updated[index] = value;
    setKeywords(updated);
    onChange(updated.filter(k => k.trim() !== ""));
  };

  const addKeyword = () => {
    setKeywords([...keywords, ""]);
  };

  const removeKeyword = (index: number) => {
    const updated = keywords.filter((_, i) => i !== index);
    setKeywords(updated);
    onChange(updated.filter(k => k.trim() !== ""));
  };

  return (
    <div className="space-y-2">
      <label className="font-medium">Keywords</label>

      {keywords.map((keyword, index) => (
        <div key={index} className="flex gap-2">
          <input
            type="text"
            value={keyword}
            onChange={(e) => handleChange(index, e.target.value)}
            placeholder="Enter keyword"
            className="border px-3 py-2 w-full rounded"
          />

          {index === keywords.length - 1 && (
            <button
              type="button"
              onClick={addKeyword}
              className="px-3 cursor-pointer rounded bg-green-500 text-white"
            >
              +
            </button>
          )}

          {keywords.length > 1 && (
            <button
              type="button"
              onClick={() => removeKeyword(index)}
              className="px-3 cursor-pointer rounded bg-red-500 text-white"
            >
              -
            </button>
          )}
        </div>
      ))}
    </div>
  );
}



export function CreateKeyword() {
  const [keywords, setKeywords] = useState<string[]>([]);

  const handleSubmit = async (e:any) => {
    e.preventDefault();

    await fetch("/api/keyword", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        keywords
      }),
    });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 flex justify-center flex-col w-92 ml-16 mt-28">
      <KeywordInput onChange={setKeywords} />

      <button className="bg-black cursor-pointer text-white px-4 py-2 rounded">
        Save Blog
      </button>
    </form>
  );
}
