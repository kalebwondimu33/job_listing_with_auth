import { NextRequest, NextResponse } from "next/server";

export function middleware(request: NextRequest) {
  const sessionToken = request.cookies.get("next-auth.session-token")?.value;
  const hireHubToken = request.cookies.get("hireHubToken")?.value;
  const url = request.nextUrl;

  const isAuthPage = url.pathname.startsWith("/auth");

  const excludedPaths = [
    "/images/",
    "/_next/static/",
    "/_next/image/",
    "/favicon.ico",
  ];

  if (excludedPaths.some((path) => url.pathname.startsWith(path))) {
    return NextResponse.next();
  }

  const isAuthenticated = sessionToken && hireHubToken;

  if (!isAuthenticated && !isAuthPage) {
    return NextResponse.redirect(new URL("/auth/SignIn", request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico|auth).*)"],
};
