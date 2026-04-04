import { connectDB } from "@/lib/connectdb";
import Image from "@/models/Image";

export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();

    const image = await Image.findById(id);

    if (!image) {
      return new Response("Image not found", { status: 404 });
    }

    return new Response(image.data, {
      headers: {
        "Content-Type": image.contentType || "image/jpeg",
        "Cache-Control": "no-store",
      },
    });
  } catch (err) {
    console.error(err);
    return new Response("Server error", { status: 500 });
  }
}
