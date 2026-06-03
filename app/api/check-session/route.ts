import { connectDB } from "@/lib/connectdb";
import Session from "@/models/Session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    await connectDB();
  const { tabId } = await req.json();

  const cookieStore = await cookies();

  const sessionId =
    cookieStore.get("sessionId")?.value;

  const session =
    await Session.findOne({
      sessionId,
    });

  if (!session) {
    return Response.json(
      {},
      { status: 401 }
    );
  }

  if (session.tabId !== tabId) {
    return Response.json(
      {},
      { status: 401 }
    );
  }

  return Response.json({
    success: true,
  });
}