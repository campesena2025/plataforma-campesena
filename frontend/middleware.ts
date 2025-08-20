import { withAuth } from 'next-auth/middleware';
import { NextResponse } from 'next/server';
import type { NextRequestWithAuth } from 'next-auth/middleware';

export default withAuth(
  function middleware(request: NextRequestWithAuth) {
    return NextResponse.next();
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token,
    },
  }
);

export const config = {
  matcher: [
    // Rutas que requieren autenticación
    '/profile/:path*',
    '/dashboard/:path*',
    // Excluye las rutas públicas
    '/((?!api|_next/static|_next/image|favicon.ico|login|register).*)',
  ],
};
