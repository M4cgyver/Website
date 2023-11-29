import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { v4 as uuidv4 } from "uuid";

export function middleware(request: NextRequest) {
    const response = NextResponse.next();
 
    response.headers.set('x-url', request.url); 
    response.headers.set("x-pathname", request.nextUrl.pathname);
    response.cookies.set("sessionidx", request.cookies.get("sessionidx")?.value ?? uuidv4());


    return response;
}

/*
 * Match all request paths except for the ones starting with:
 * - api (API routes)
 * - _next/static (static files)
 * - _next/image (image optimization files)
 * - favicon.ico (favicon file)
 */
export const config = {
    matcher: [
        '/((?!api|_next/static|_next/image|favicon.ico).*)',
    ],
}