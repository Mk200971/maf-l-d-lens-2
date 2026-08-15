import { NextRequest, NextResponse } from 'next/server';

// Timing-safe comparison to prevent timing attacks
function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) {
    return false;
  }
  
  let result = 0;
  for (let i = 0; i < a.length; i++) {
    result |= a.charCodeAt(i) ^ b.charCodeAt(i);
  }
  return result === 0;
}

export function middleware(request: NextRequest) {
  const dashboardUser = process.env.DASHBOARD_USER;
  const dashboardPassword = process.env.DASHBOARD_PASSWORD;
  const isProduction = process.env.NODE_ENV === 'production';

  // Fail closed in production if credentials are not configured
  if (isProduction && (!dashboardUser || !dashboardPassword)) {
    console.error('[middleware] DASHBOARD_USER or DASHBOARD_PASSWORD not set in production. Blocking access.');
    return new NextResponse('Not configured', { status: 503 });
  }

  // Allow through if not configured (local dev convenience)
  if (!dashboardUser || !dashboardPassword) {
    return NextResponse.next();
  }

  const authHeader = request.headers.get('authorization');

  if (!authHeader || !authHeader.startsWith('Basic ')) {
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="MAF L&D Lens"',
      },
    });
  }

  try {
    const base64Credentials = authHeader.slice('Basic '.length);
    const credentials = Buffer.from(base64Credentials, 'base64').toString('utf-8');
    const [username, password] = credentials.split(':');

    // Use timing-safe comparison
    const userMatch = timingSafeEqual(username || '', dashboardUser);
    const passMatch = timingSafeEqual(password || '', dashboardPassword);

    if (!userMatch || !passMatch) {
      return new NextResponse('Unauthorized', {
        status: 401,
        headers: {
          'WWW-Authenticate': 'Basic realm="MAF L&D Lens"',
        },
      });
    }

    return NextResponse.next();
  } catch (error) {
    console.error('[middleware] Auth parsing error:', error);
    return new NextResponse('Unauthorized', {
      status: 401,
      headers: {
        'WWW-Authenticate': 'Basic realm="MAF L&D Lens"',
      },
    });
  }
}

export const config = {
  matcher: ['/((?!_next/static|_next/image|favicon.ico|icon|apple-icon).*)'],
};
