import { connectDB } from "@/lib/connectdb";
import User from "@/models/User";
import { NextResponse } from "next/server";

/* ================= CREATE USER ================= */
export async function POST(req) {
  try {
    await connectDB();
    const body = await req.json();

    const user = await User.create(body);
    return NextResponse.json(user, { status: 201 });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ================= GET ALL USERS ================= */
export async function GET() {
  try {
    await connectDB();
    const users = await User.find();
    return NextResponse.json(users);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ================= UPDATE USER ================= */
export async function PUT(req) {
  try {
    await connectDB();
    const { id, ...data } = await req.json();

    const updatedUser = await User.findByIdAndUpdate(
      id,
      data,
      { new: true }
    );

    return NextResponse.json(updatedUser);
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}

/* ================= DELETE USER ================= */
export async function DELETE(req) {
  try {
    await connectDB();
    const { id } = await req.json();

    await User.findByIdAndDelete(id);
    return NextResponse.json({ message: "User deleted" });
  } catch (error) {
    return NextResponse.json(
      { error: error.message },
      { status: 500 }
    );
  }
}
