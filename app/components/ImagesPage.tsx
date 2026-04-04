"use client";

import { useEffect, useState } from "react";

type ImageType = {
  _id: string;
  name: string;
  contentType: string;
  imageBase64: string;
  createdAt: string;
};

export default function ImagesPage() {
  const [images, setImages] = useState<ImageType[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchImages = async () => {
      try {
        const res = await fetch("/api/image");

        if (!res.ok) {
          throw new Error("Failed to load images");
        }

        const data = await res.json();
        setImages(data);
      } catch (err) {
        setError("Error loading images");
      } finally {
        setLoading(false);
      }
    };

    fetchImages();
  }, []);

  if (loading) {
    return (
      <div className="flex justify-center items-center">
        <p className="text-lg font-semibold">Loading images...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div className="p-6">
      <h1 className="text-2xl text-gray-500 font-bold mb-6">All Images</h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
        {images.map((img) => (
          <div
            key={img._id}
            className="rounded-lg border shadow hover:shadow-lg transition"
          >
            <img
              src={img.imageBase64}
              alt={img.imageBase64}
              className="w-full h-48 object-cover rounded-t-lg"
            />

            <div className="p-3">
              <p className="text-sm text-gray-500 font-medium truncate">{img.name}</p>
              <p className="text-xs text-gray-500">
                {new Date(img.createdAt).toLocaleString()}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
