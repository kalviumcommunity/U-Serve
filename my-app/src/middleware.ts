// src/middleware.ts
import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
    const token = request.cookies.get('token'); // Assuming the token is stored in cookies
    

    // Allowed paths
    const allowedPaths = ['/auth/login', '/auth/signup'];

    // Check if the request is for a static file (CSS, JS, images, SVGs, etc.)
    const isStaticFile =
        request.nextUrl.pathname.startsWith('/_next/') || // Next.js internal files
        request.nextUrl.pathname.startsWith('/static/') || // Static assets
        request.nextUrl.pathname.endsWith('.css') || // CSS files
        request.nextUrl.pathname.endsWith('.js') || // JS files
        request.nextUrl.pathname.endsWith('.svg') || // SVG files
        request.nextUrl.pathname.endsWith('.png') || // PNG images
        request.nextUrl.pathname.endsWith('.jpg') || // JPG images
        request.nextUrl.pathname.endsWith('.jpeg') || // JPEG images
        request.nextUrl.pathname.endsWith('.gif'); // GIF images

    if (!token && !allowedPaths.includes(request.nextUrl.pathname) && !isStaticFile) {
        // Redirect to login if token is not present and not on allowed paths
        return NextResponse.redirect(new URL('/auth/login', request.url));
    }

    return NextResponse.next();
}

// Specify the paths to apply the middleware to
export const config = {
    matcher: ['/((?!_next|api|static|favicon.ico|public|.*\\..*).*)'], // Exclude Next.js specific routes and public assets
};
