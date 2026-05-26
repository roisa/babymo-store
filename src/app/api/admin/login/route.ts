import { NextResponse } from "next/server";
import {
  ADMIN_COOKIE_NAME,
  adminPasscodeMatches,
  mintToken,
} from "@/lib/admin-auth";
import { clientIp, rateLimit } from "@/lib/rate-limit";

export async function POST(req: Request) {
  // Stop brute-force: 8 attempts per IP per minute.
  const limited = rateLimit(`admin-login:${clientIp(req)}`, {
    max: 8,
    windowMs: 60_000,
  });
  if (!limited.ok) {
    return NextResponse.json(
      { ok: false, error: "Too many attempts" },
      {
        status: 429,
        headers: { "Retry-After": String(limited.retryAfterSec) },
      },
    );
  }

  const body = await req.json().catch(() => null);
  const passcode = body?.passcode;
  if (typeof passcode !== "string" || !adminPasscodeMatches(passcode)) {
    return NextResponse.json(
      { ok: false, error: "Invalid passcode" },
      { status: 401 },
    );
  }

  const token = mintToken();
  const res = NextResponse.json({ ok: true });
  res.cookies.set(ADMIN_COOKIE_NAME, token.value, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: token.maxAge,
  });
  return res;
}
