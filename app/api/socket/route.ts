import { NextRequest } from "next/server";
import { getWSServer } from "@/lib/socket";

export async function GET(req: NextRequest) {
  const res: any = new Response("WebSocket ready");

  // @ts-ignore
  if (!global.wss) {
    // @ts-ignore
    global.wss = getWSServer(req.socket?.server);
  }

  return res;
}