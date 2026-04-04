import { connectDB } from "@/lib/connectdb";
import MultipleImage from "@/models/MultipleImage";


export async function GET(
  req: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;

    await connectDB();
    const image = await MultipleImage.findById(id);

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


