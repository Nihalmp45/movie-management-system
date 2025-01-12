import { NextResponse } from 'next/server';
import { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  const cookie = request.cookies.get('token')?.value || '';
  const path = request.nextUrl.pathname;

  const publicPaths = ['/login', '/signup','/verifyemail','/'];
  const protectedPaths = ['/profile']; // Include paths that require authentication

  // Public path logic: If logged in, redirect to the home page
  if (publicPaths.includes(path) && cookie) {
    return NextResponse.redirect(new URL('/profile', request.url));
  } 

  // Protected path logic: If not logged in, redirect to login
  if (protectedPaths.some((protectedPath) => path.startsWith(protectedPath)) && !cookie) {
    return NextResponse.redirect(new URL('/login', request.url));
  }

  // Allow the request to proceed if no redirection is required
  return NextResponse.next();
}

// Middleware configuration to match specific routes
export const config = {
  matcher: ['/', '/profile/:path*', '/login', '/signup','/verifyemail'], // Adjust paths as needed
};


//Key Fixes and Changes.
// Use /profile/:path* in the matcher configuration to match all subpaths under /profile.

// Public vs Protected Paths:
// A clearer separation of public and protected paths makes the logic more understandable.
// Used Array.includes() for public paths and some() for dynamic route matching in protected paths.


// Cookie Validation:
// If cookie does not exist for protected paths, redirect to /login.
// matcher Configuration:
