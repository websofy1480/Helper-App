import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectdb";

import Category from "@/models/Category";

export async function POST(req: Request) {
  await connectDB();

  const { title } = await req.json();

  const blog = await Category.create({title});

  return NextResponse.json(blog, { status: 201 });
}
