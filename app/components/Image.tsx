"use client";
import { useState } from "react";

export default function UploadPage() {
  const [file, setFile] = useState<File | null>(null);

  const uploadImage = async () => {
    if (!file) return;

    const formData = new FormData();
    formData.append("image", file);

    const res = await fetch("/api/upload", {
      method: "POST",
      body: formData,
    });

    const data = await res.json();
    alert("Uploaded ID: " + data.id);
  };

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="p-6 rounded shadow w-96">
        <input
          type="file"
          accept="image/*"
          onChange={(e) => setFile(e.target.files?.[0] || null)}
          className="bg-amber-300"
        />
        
        <button
          onClick={uploadImage}
          className="mt-4 w-full bg-blue-600 py-2 rounded"
        >
          Upload
        </button>
      </div>
    </div>
  );
}
