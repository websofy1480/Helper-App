import { cookies } from "next/headers";
import Session from "@/models/Session";
import User from "@/models/User";
import { connectDB } from "@/lib/connectdb";

export async function getCurrentUserSession() {
  await connectDB();

  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get("sessionId")?.value;

  if (!sessionId) {
    return null;
  }

  const session = await Session.findOne({
    sessionId,
  });

  if (!session) {
    return null;
  }

  const user = await User.findById(
    session.userId
  ).select("-password");

  if (!user) {
    return null;
  }

  return {
    session,
    user,
  };
}