import { NextResponse } from "next/server";
import { connectDB } from "@/lib/connectdb";

import Category from "@/models/Category";
import Keyword from "@/models/Keyword";

export async function POST(req: Request) {
  await connectDB();

  const { keywords } = await req.json();

  const keywordData = await Keyword.create({keywords});

  return NextResponse.json(keywordData, { status: 201 });
}
