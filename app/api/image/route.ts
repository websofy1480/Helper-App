// export const runtime = "nodejs";

// import { connectDB } from "@/lib/connectdb";
// import Image from "@/models/Image";

// export async function GET() {
//   try {
//     await connectDB();

//     const images = await Image.find()
//       .sort({ createdAt: -1 })
//       .select("_id name contentType createdAt");

//     const result = images.map((img) => ({
//       _id: img._id.toString(),
//       name: img.name,
//       contentType: img.contentType,
//       url: `/api/image/${img._id}`, // single image endpoint
//       createdAt: img.createdAt,
//     }));

//     return Response.json(result);
//   } catch (error) {
//     console.error(error);
//     return new Response("Failed to fetch images", { status: 500 });
//   }
// }


import { connectDB } from "@/lib/connectdb";
import Image from "@/models/Image";

export async function GET() {
  try {
    await connectDB();

    const images = await Image.find().sort({ createdAt: -1 });

    if (!images.length) {
      return new Response("No images found", { status: 404 });
    }

    const result = images.map((img) => ({
      _id: img._id.toString(),
      name: img.name,
      contentType: img.contentType,
      imageBase64: `data:${img.contentType};base64,${img.data.toString(
        "base64"
      )}`,
      createdAt: img.createdAt,
    }));

    return Response.json(result);
  } catch (error) {
    console.error(error);
    return new Response("Failed to fetch images", { status: 500 });
  }
}

