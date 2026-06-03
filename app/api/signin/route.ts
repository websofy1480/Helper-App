import bcrypt from "bcryptjs";
import { v4 as uuid } from "uuid";
import { cookies } from "next/headers";
import User from "@/models/User";
import Session from "@/models/Session";
import { connectDB } from "@/lib/connectdb";

export async function POST(req: Request) {
  await connectDB();

  const { email, password, tabId } = await req.json();

  const user = await User.findOne({ email });

  if (!user) {
    return Response.json(
      { message: "Invalid Credentials" },
      { status: 401 }
    );
  }

  const valid = await bcrypt.compare(password, user.password);

  if (!valid) {
    return Response.json(
      { message: "Invalid Password" },
      { status: 401 }
    );
  }

  const sessionId = uuid();

  await Session.deleteMany({userId: user._id,});

  await Session.create({
    userId: user._id,
    sessionId,
    tabId,
    expiresAt: new Date(
      Date.now() +
      7 * 24 * 60 * 60 * 1000
    ),
  });
  
  user.activeSessionId = sessionId;

  await user.save();

  const cookieStore = await cookies();

  cookieStore.set(
    "sessionId",
    sessionId,
    {
      httpOnly: true,
      secure:
        process.env.NODE_ENV ===
        "production",
      sameSite: "strict",
      path: "/",
      maxAge:
        7 * 24 * 60 * 60,
    }
  );
 
  return Response.json({
    success: true,
  });
}