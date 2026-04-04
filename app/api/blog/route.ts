import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectdb";
import Blog from "@/models/Blog";

export async function GET(req: Request) {
  await connectDB();
  const blog = await Blog.find().populate("categoryId").lean();

  // get the only title form the category schema
  // const blog = await Blog.find().populate({
  //   path: "categoryId",
  //   select: "title"
  // });

  return NextResponse.json(blog, { status: 200 });
}

export async function POST(req: Request) {
  await connectDB();

  const { title, content, categoryId } = await req.json();

  const blog = await Blog.create({
    title,
    content,
    categoryId
  });

  return NextResponse.json(blog, { status: 201 });
}
