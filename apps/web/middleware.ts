import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

const protectedRoutes = ["/platform"];
const unprotectedRoutes = ["/", "/login", "/register"];

import { getSession, updateSession } from "./lib/session";

export default async function middleware(request: NextRequest) {
  const session = await getSession(request);

  await updateSession(request);

  const isProtectedRoute = protectedRoutes.some((prefix) =>
    request.nextUrl.pathname.startsWith(prefix)
  );

  if (!session && isProtectedRoute) {
    const absoluteURL = new URL("/", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  if (session && unprotectedRoutes.includes(request.nextUrl.pathname)) {
    const absoluteURL = new URL("/platform", request.nextUrl.origin);
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}
