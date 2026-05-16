import { NextRequest, NextResponse } from "next/server";

const PUBLIC_PATHS = ["/login", "/signup"];

export function proxy(req: NextRequest) {
  const { pathname } = req.nextUrl;

  const session = req.cookies.get("lms_session")?.value;
  const isPublic = PUBLIC_PATHS.some(p => pathname.startsWith(p));

  if (!session && !isPublic) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  if (session && isPublic) {
    try {
      const user = JSON.parse(session).user;
      if (user.role === "borrower") return NextResponse.redirect(new URL("/apply", req.url));
      return NextResponse.redirect(new URL(`/dashboard/${user.role === "admin" ? "sales" : user.role}`, req.url));
    } catch {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"],
};