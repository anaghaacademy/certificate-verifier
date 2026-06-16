import { NextRequest, NextResponse } from "next/server";
import { doc, getDoc } from "firebase/firestore";
import { db } from "@/lib/firebase";

export const runtime = "nodejs";

export async function GET(
  _request: NextRequest,
  context: { params: { id: string } }
) {
  const { id } = context.params;  // 👈 no await here
  const trimmed = id?.trim();

  if (!trimmed) {
    return new NextResponse("Missing ID", { status: 400 });
  }

  const ref = doc(db, "certificates", trimmed);
  const snap = await getDoc(ref);

  if (!snap.exists()) {
    return new NextResponse("Not found", { status: 404 });
  }

  return NextResponse.json(snap.data());
}