"use client";

import { useRef, useState, useCallback } from "react";
import Image from "next/image";
import Cropper from "react-easy-crop";

/* ---------------- helpers ---------------- */

const createImage = (url: string): Promise<HTMLImageElement> =>
    new Promise((resolve, reject) => {
        const image = new window.Image();
        image.onload = () => resolve(image);
        image.onerror = reject;
        image.crossOrigin = "anonymous";
        image.src = url;
    });

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const getCroppedImg = async (imageSrc: string, crop: any) => {
    const image = await createImage(imageSrc);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
    if (!ctx) return null;

    canvas.width = crop.width;
    canvas.height = crop.height;

    ctx.drawImage(
        image,
        crop.x,
        crop.y,
        crop.width,
        crop.height,
        0,
        0,
        crop.width,
        crop.height
    );

    return new Promise<Blob | null>((resolve) => {
        canvas.toBlob((blob) => resolve(blob), "image/jpeg");
    });
};

/* ---------------- component ---------------- */

export default function ImageUploader() {
    const fileInputRef = useRef<HTMLInputElement | null>(null);

    const [previews, setPreviews] = useState<string[]>([]);
    const [urls, setUrls] = useState<string[]>([]);
    const [publicIds, setPublicIds] = useState<string[]>([]);

    const [loading, setLoading] = useState(false);
    const [cropMode, setCropMode] = useState(false);
    const [imageSrc, setImageSrc] = useState<string | null>(null);

    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const [croppedAreaPixels, setCroppedAreaPixels] = useState<any>(null);
    const [crop, setCrop] = useState({ x: 0, y: 0 });
    const [zoom, setZoom] = useState(1);

    const [width, setWidth] = useState(300);
    const [height, setHeight] = useState(300);

    const onCropComplete = useCallback(
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        (_: any, croppedPixels: any) => {
            setCroppedAreaPixels(croppedPixels);
        },
        []
    );

    const handleFile = (file: File) => {
        const reader = new FileReader();
        reader.onload = () => {
            setImageSrc(reader.result as string);
            setCropMode(true);
        };
        reader.readAsDataURL(file);
    };

    const handleCropUpload = async () => {
        if (!imageSrc || !croppedAreaPixels) return;
        setLoading(true);

        const croppedBlob = await getCroppedImg(imageSrc, croppedAreaPixels);
        if (!croppedBlob) return;

        const formData = new FormData();
        formData.append("file", croppedBlob, "image.jpg");

        try {
            const res = await fetch("/api/multiple-image-upload", {
                method: "POST",
                body: formData,
            });
            const data = await res.json();

            if (data.secure_url) {
                setPreviews((p) => [...p, data.secure_url]);
                setUrls((u) => [...u, data.secure_url]);
                setPublicIds((id) => [...id, data.public_id]);
                setCropMode(false);
                setImageSrc(null);
                setZoom(1);
                setCrop({ x: 0, y: 0 });
            }
        } catch (err) {
            console.error(err);
            alert("Upload failed");
        } finally {
            setLoading(false);
        }
    };

    const handleRemove = (index: number) => {
        setPreviews((p) => p.filter((_, i) => i !== index));
        setUrls((u) => u.filter((_, i) => i !== index));
        setPublicIds((id) => id.filter((_, i) => i !== index));
    };

    return (
        <div className="flex flex-col gap-6 w-full">

            {/* PREVIEW */}
            <div className="flex flex-wrap gap-4">
                {previews.length ? (
                    previews.map((img, i) => (
                        <div
                            key={i}
                            className="relative w-full md:w-[30%] h-56 border rounded-lg overflow-hidden"
                        >
                            <Image src={img} alt="preview" fill className="object-cover" />
                            <button
                                onClick={() => handleRemove(i)}
                                className="absolute top-2 right-2 bg-white px-2 py-1 rounded"
                            >
                                ✕
                            </button>
                        </div>
                    ))
                ) : (
                    <div className="w-full h-56 flex items-center justify-center border-2 border-dashed text-gray-400">
                        No images uploaded
                    </div>
                )}
            </div>

            {/* CROP */}
            {cropMode && imageSrc && (
                <div className="relative w-full h-80 bg-black rounded">
                    <Cropper
                        image={imageSrc}
                        crop={crop}
                        zoom={zoom}
                        aspect={width / height}
                        onCropChange={setCrop}
                        onCropComplete={onCropComplete}
                        onZoomChange={setZoom}
                    />

                    <div className="absolute bottom-0 w-full bg-white p-3 flex gap-3 justify-center">
                        <input
                            type="number"
                            value={width}
                            onChange={(e) => setWidth(+e.target.value)}
                            className="border w-20"
                        />
                        <input
                            type="number"
                            value={height}
                            onChange={(e) => setHeight(+e.target.value)}
                            className="border w-20"
                        />
                        <button onClick={handleCropUpload}>
                            {loading ? "Uploading..." : "Crop & Upload"}
                        </button>
                    </div>
                </div>
            )}

            {!cropMode && (
                <div
                    onClick={() => fileInputRef.current?.click()}
                    className="border-2 border-dashed p-4 text-center cursor-pointer"
                >
                    Click to upload image
                </div>
            )}

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                hidden
                onChange={(e) => e.target.files && handleFile(e.target.files[0])}
            />
        </div>
    );
}
