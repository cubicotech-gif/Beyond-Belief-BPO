import { NextResponse, type NextRequest } from "next/server";
import { ADMIN_COOKIE, SESSION_MAX_AGE, checkPassword, makeSessionToken } from "@/lib/auth";

export async function POST(req: NextRequest) {
  const form = await req.formData();
  const password = String(form.get("password") || "");
  const from = String(form.get("from") || "/admin");

  if (!checkPassword(password)) {
    const url = new URL("/admin/login", req.url);
    url.searchParams.set("error", "invalid");
    if (from) url.searchParams.set("from", from);
    return NextResponse.redirect(url, { status: 303 });
  }

  const res = NextResponse.redirect(new URL(from || "/admin", req.url), { status: 303 });
  res.cookies.set(ADMIN_COOKIE, await makeSessionToken(), {
    httpOnly: true,
    sameSite: "lax",
    secure: process.env.NODE_ENV === "production",
    path: "/",
    maxAge: SESSION_MAX_AGE,
  });
  return res;
}
