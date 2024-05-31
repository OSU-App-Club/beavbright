import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";

// const unprotectedRoutes = ["/", "/login", "/register"];
// const protectedRoutes = [
//   "/platform",
//   "/platform/study-groups",
//   "/platform/discussions",
//   "/platform/course-materials",
//   "/platform/profile",
// ];

// TODO: Follow up on this: https://github.com/prisma/prisma/issues/21310
// TLDR; Prisma does not work on the vercel edge network, which the middleware runs on
export default async function middleware(request: NextRequest) {
  //   const session: Session | null = await getSession();
  return NextResponse.next();
}
