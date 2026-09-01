import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

const roleRoutes: Record<string, string[]> = {
  ADMIN: ["/admin"],
  DOCTOR: ["/doctor"],
  PATIENT: ["/patient"],
  RECEPTIONIST: ["/receptionist"],
};

export default withAuth(
  function middleware(req) {
    const token = req.nextauth.token;
    const pathname = req.nextUrl.pathname;

    if (!token) {
      const loginUrl = new URL("/login", req.url);
      loginUrl.searchParams.set("callbackUrl", pathname);
      return NextResponse.redirect(loginUrl);
    }

    const userRole = token.role as string;

    for (const [role, routes] of Object.entries(roleRoutes)) {
      for (const route of routes) {
        if (pathname.startsWith(route)) {
          if (userRole !== role) {
            const redirectPath = getRoleHomePath(userRole);
            return NextResponse.redirect(new URL(redirectPath, req.url));
          }
          return NextResponse.next();
        }
      }
    }

    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

function getRoleHomePath(role: string): string {
  switch (role) {
    case "ADMIN":
      return "/admin";
    case "DOCTOR":
      return "/doctor";
    case "PATIENT":
      return "/patient";
    case "RECEPTIONIST":
      return "/receptionist";
    default:
      return "/";
  }
}

export const config = {
  matcher: ["/admin/:path*", "/doctor/:path*", "/patient/:path*", "/receptionist/:path*"],
};
