import { connectDB } from "@/lib/connectdb";
import User from "@/models/User";
import bcrypt from "bcryptjs";

export async function POST(req: Request) {
  await connectDB();

  const { name, email, password } = await req.json();

  const existingUser =
    await User.findOne({ email });

  if (existingUser) {
    return Response.json(
      {
        message: "User already exists",
      },
      {
        status: 400,
      }
    );
  }

  const hashedPassword = await bcrypt.hash(password, 12);

  await User.create({
    name,
    email,
    password: hashedPassword,
  });

  return Response.json({
    success: true,
  });
}