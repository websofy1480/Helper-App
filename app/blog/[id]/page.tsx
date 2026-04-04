import { notFound } from "next/navigation";

import Blog from "@/models/Blog";
import mongoose from "mongoose";
import { connectDB } from "@/lib/connectdb";

export default async function BlogDetails({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  // ✅ unwrap params (NEW IN NEXT 16)
  const { id } = await params;

  await connectDB();

  if (!mongoose.Types.ObjectId.isValid(id)) {
    notFound();
  }

  const blog = await Blog.findById(id).lean();

  if (!blog) {
    notFound();
  }

  return (
    <div>
      <h1>{blog.title}</h1>
      <div
        className="jodit-content"
        dangerouslySetInnerHTML={{ __html: blog.content }}
      />
    </div>
  );
}
