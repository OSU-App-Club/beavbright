import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { getSession } from "./app/lib/session";

const unprotectedRoutes = ["/", "/login", "/register"];
const protectedRoutes = [
  "/platform",
  "/platform/study-groups",
  "/platform/discussions",
  "/platform/course-materials",
  "/platform/profile",
];

export default async function middleware(request: NextRequest) {
  const session = await getSession();

  if (request.nextUrl.pathname.startsWith("/platform/discussions/")) {
    const discussionId = request.nextUrl.pathname.split("/").pop();
    return NextResponse.next({
      headers: {
        discussionId,
      },
    });
  }

  if (request.nextUrl.pathname === "/logout") {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return new Response(null, {
      status: 302,
      headers: {
        Location: absoluteURL.toString(),
        "Set-Cookie": `session=; Path=/; HttpOnly; Secure; SameSite=Lax; Expires=Thu, 01 Jan 1970 00:00:00 GMT`,
      },
    });
  }

  if (protectedRoutes.includes(request.nextUrl.pathname)) {
    if (session instanceof Error) {
      const absoluteURL = new URL("/login", request.nextUrl.origin);
      return NextResponse.redirect(absoluteURL.toString());
    }
  }

  if (unprotectedRoutes.includes(request.nextUrl.pathname)) {
    if (!(session instanceof Error)) {
      return NextResponse.next();
    }
  }

  return NextResponse.next();
}
