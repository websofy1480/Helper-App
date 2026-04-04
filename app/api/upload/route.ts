import { NextResponse } from "next/server";

import Image from "@/models/Image";
import { connectDB } from "@/lib/connectdb";

export async function POST(req: Request) {
  try {
    await connectDB();

    const formData = await req.formData();
    const file = formData.get("image") as File | null;

    if (!file) {
      return NextResponse.json(
        { error: "No file uploaded" },
        { status: 400 }
      );
    }

    const bytes = await file.arrayBuffer();
    const buffer = Buffer.from(bytes);

    const image = await Image.create({
      name: file.name,
      data: buffer,
      contentType: file.type,
    });

    return NextResponse.json({
      message: "Image uploaded",
      id: image._id,
    });
  } catch (err: any) {
    return NextResponse.json(
      { error: err.message },
      { status: 500 }
    );
  }
}
