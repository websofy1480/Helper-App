// import { connectDB } from "@/lib/connectdb";
// import MultipleImage from "@/models/MultipleImage";
// import { NextResponse } from "next/server";

// export async function POST(req: Request) {
//   try {
//     await connectDB();
//     const formData = await req.formData();
//     const file = formData.get("file") as File | null;

//     if (!file) {
//       return NextResponse.json(
//         { error: "No file uploaded" },
//         { status: 400 }
//       );
//     }

//     const bytes = await file.arrayBuffer();
//     const buffer = Buffer.from(bytes);

//     const image = await MultipleImage.create({
//       name: file.name,
//       data: buffer,
//       contentType: file.type,
//     });

//     return NextResponse.json({
//       message: "Image uploaded",
//       public_id: image._id,
//       secure_url : `/api/multiple-image-upload/${image._id}`
//     });
//   } catch (err: any) {
//     return NextResponse.json(
//       { error: err.message },
//       { status: 500 }
//     );
//   }
// }


import { connectDB } from "@/lib/connectdb";
import MultipleImage from "@/models/MultipleImage";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();
    const formData = await req.formData();
    const file = formData.get("file") as File | null;

    if (!file) {
      return NextResponse.json({ error: "No file" }, { status: 400 });
    }

    const buffer = Buffer.from(await file.arrayBuffer());

    const image = await MultipleImage.create({
      name: file.name,
      data: buffer,
      contentType: file.type,
    });

    return NextResponse.json({
      message: "Uploaded",
      public_id: image._id,
      secure_url: `/api/multiple-image-upload/${image._id}`,
    });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
