export async function middleware(request) {
    const token = await getToken({
      req: request
    });
  
    // redirect user without access to login
    if (token?.token && Date.now() / 1000 < token?.accessTokenExpires) {
      return NextResponse.redirect("/login");
    }
  
    // redirect user without admin access to login
    if (!token?.isAdmin) {
      return NextResponse.redirect("/login");
    }
  
    return NextResponse.next();
  }