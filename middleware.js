import { getToken } from 'next-auth/jwt'
import { NextResponse } from 'next/server'

export async function middleware(request) {
  const session = await getToken({
    req: request,
    secret: process.env.NEXTAUTH_SECRET,
  })

  if (session) {
    if (
      (request.nextUrl.pathname.startsWith('/auth/') ||
        request.nextUrl.pathname.startsWith('/admin/superadmin')) &&
      session.user.userDetail.role_id != 1
    ) {
      return NextResponse.redirect(new URL('/admin/member', request.url))
    }

    if (
      (request.nextUrl.pathname.startsWith('/auth/') ||
        request.nextUrl.pathname.startsWith('/admin/member')) &&
      session.user.userDetail.role_id != 2
    ) {
      return NextResponse.redirect(new URL('/admin/superadmin', request.url))
    }

    if (
      request.nextUrl.pathname.startsWith('/auth') ||
      (request.nextUrl.pathname.startsWith('/verify/email') &&
        session.user.userDetail?.email_verified_at !== null)
    ) {
      return NextResponse.redirect(new URL('/verify/email', request.url))
    }
  }
}

// export const config = {
//   matcher: ['/admin/:path*'],
// }
