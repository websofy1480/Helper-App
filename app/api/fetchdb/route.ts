import clientPromise from "@/lib/dbConnect";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest) {
    try {
        const client = await clientPromise;
        const db = client.db();

        console.log("Connected DB:", db.databaseName);
        const data = await db.listCollections().toArray(); 
        return NextResponse.json({ data }, { status: 200 });
    } catch (err) {
        console.error(err);
        return NextResponse.json({ error: "Failed to fetch data" }, { status: 500 });
    }
}
