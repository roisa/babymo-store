import { NextResponse } from "next/server";
import { isAdmin } from "@/lib/admin-auth";

export async function GET(req: Request) {
  if (!isAdmin(req)) {
    return NextResponse.json({ ok: false }, { status: 401 });
  }
  return NextResponse.json({ ok: true });
}
