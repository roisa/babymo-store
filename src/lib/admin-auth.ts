import { createHmac, timingSafeEqual } from "node:crypto";

/**
 * Tiny server-side admin auth.
 *
 * On a correct passcode POST, we mint a signed cookie that contains an
 * expiry timestamp + HMAC. No real auth backend yet, but this gets us
 * three important properties the old client-only flow didn't have:
 *
 *   1. The passcode is read from a server-only env var (ADMIN_PASSCODE),
 *      so it no longer leaks into the browser JS bundle.
 *   2. The cookie is HttpOnly + Secure (in prod) + SameSite=Lax, so the
 *      JS can't read it and CSRF risk is contained.
 *   3. The cookie value is an HMAC of the expiry, signed with
 *      ADMIN_SECRET. Tampering with the expiry invalidates the token.
 *
 * Upgrade path: swap mintToken/verifyToken for Supabase Auth (or a real
 * JWT lib) — the API routes that consume `isAdmin(req)` stay unchanged.
 */

const PASSCODE = process.env.ADMIN_PASSCODE;
const SECRET =
  process.env.ADMIN_SECRET ||
  PASSCODE || // fallback if SECRET isn't set; not ideal, but better than nothing
  "babymo-dev-secret-replace-on-prod";

const COOKIE_NAME = "babymo-admin";
const TWELVE_HOURS = 12 * 60 * 60;

export function adminPasscodeMatches(passcode: string): boolean {
  if (!PASSCODE || typeof passcode !== "string") return false;
  if (passcode.length !== PASSCODE.length) return false;
  // constant-time compare so timing attacks can't reveal the passcode
  try {
    return timingSafeEqual(Buffer.from(passcode), Buffer.from(PASSCODE));
  } catch {
    return false;
  }
}

function sign(data: string): string {
  return createHmac("sha256", SECRET).update(data).digest("hex");
}

export function mintToken(maxAgeSec = TWELVE_HOURS): {
  value: string;
  maxAge: number;
} {
  const exp = Math.floor(Date.now() / 1000) + maxAgeSec;
  return { value: `${exp}.${sign(String(exp))}`, maxAge: maxAgeSec };
}

export function verifyToken(token: string | undefined | null): boolean {
  if (!token) return false;
  const [exp, sig] = token.split(".");
  if (!exp || !sig) return false;
  const expNum = parseInt(exp, 10);
  if (Number.isNaN(expNum) || Math.floor(Date.now() / 1000) > expNum) {
    return false;
  }
  const expected = sign(String(expNum));
  try {
    return timingSafeEqual(Buffer.from(expected), Buffer.from(sig));
  } catch {
    return false;
  }
}

export function readAdminCookie(req: Request): string | undefined {
  const header = req.headers.get("cookie") || "";
  for (const part of header.split(";")) {
    const [k, ...rest] = part.trim().split("=");
    if (k === COOKIE_NAME) return rest.join("=");
  }
  return undefined;
}

export function isAdmin(req: Request): boolean {
  return verifyToken(readAdminCookie(req));
}

export const ADMIN_COOKIE_NAME = COOKIE_NAME;
