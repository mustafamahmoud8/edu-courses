import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const PUBLIC_PATHS = ["/", "/auth/login", "/auth/register"];
const AUTH_PATHS = ["/auth/login", "/auth/register"];

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const userCookie = request.cookies.get("edu_user");
  // We use localStorage for demo — so middleware just redirects root
  // For production, use httpOnly cookies instead

  // If visiting root, redirect to /courses
  if (pathname === "/") {
    return NextResponse.redirect(new URL("/courses", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!_next|api|favicon|images|fonts).*)"],
};
