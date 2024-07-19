// export { auth as middleware } from "@/auth";

import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { auth } from "@/auth";

const protectedRoutes = ["/middleware"];

export default async function middleware(request: NextRequest) {
  const session = await auth();

  const isProtected = protectedRoutes.some(
    (route) => request.nextUrl.pathname.startsWith(route) //pathname返回的是路径部分
  );

  if (!session && isProtected) {
    const absoluteURL = new URL("/", request.nextUrl.origin); //origin返回url  比如localhost
    return NextResponse.redirect(absoluteURL.toString());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|favicon.ico).*)"], //配置中间件应用到的路径  除了api  _next/static _next/image 和favicon.ico其他都走这个middle
};
