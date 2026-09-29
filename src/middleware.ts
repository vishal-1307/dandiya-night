import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Protected admin page routes (excluding login page itself)
  const isProtectedAdminPage = 
    pathname.startsWith('/admin/') && pathname !== '/admin';

  if (isProtectedAdminPage) {
    const sessionCookie = request.cookies.get('adminSession')?.value;
    const authHeader = request.headers.get('authorization');

    if (!sessionCookie && (!authHeader || !authHeader.startsWith('Bearer '))) {
      // Redirect unauthorized users immediately to organizer login
      const loginUrl = new URL('/admin', request.url);
      loginUrl.searchParams.set('redirect', pathname);
      return NextResponse.redirect(loginUrl);
    }
  }

  // Security Headers for all responses
  const response = NextResponse.next();
  response.headers.set('X-Frame-Options', 'DENY');
  response.headers.set('X-Content-Type-Options', 'nosniff');
  response.headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');
  response.headers.set('Permissions-Policy', 'camera=(), microphone=(), geolocation=()');

  return response;
}

export const config = {
  matcher: [
    '/admin/:path*',
    '/api/admin/:path*',
    '/((?!_next/static|_next/image|favicon.ico|images).*)',
  ],
};
