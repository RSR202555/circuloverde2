import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({
    request: {
      headers: request.headers,
    },
  });

  const hasSupabase = 
    process.env.NEXT_PUBLIC_SUPABASE_URL && 
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
    !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("xxxx");

  let user = null;

  if (hasSupabase) {
    try {
      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            getAll() {
              return request.cookies.getAll();
            },
            setAll(cookiesToSet) {
              cookiesToSet.forEach(({ name, value }) =>
                request.cookies.set(name, value)
              );
              supabaseResponse = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              cookiesToSet.forEach(({ name, value, options }) =>
                supabaseResponse.cookies.set(name, value, options)
              );
            },
          },
        }
      );

      const { data } = await supabase.auth.getUser();
      user = data?.user || null;
    } catch (e) {
      console.error("Middleware Supabase auth error:", e);
    }
  }

  const sessionCookie = request.cookies.get("cv_admin_session");
  const hasSession = !!sessionCookie;
  const isAuthenticated = !!user || hasSession;

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";
  const isCadastroPage = request.nextUrl.pathname === "/admin/cadastro";

  if (isAdminRoute && !isLoginPage && !isCadastroPage && !isAuthenticated) {
    const response = NextResponse.redirect(new URL("/admin/login", request.url));
    for (const cookie of supabaseResponse.cookies.getAll()) {
      response.cookies.set(cookie.name, cookie.value, cookie);
    }
    return response;
  }

  if (isLoginPage && isAuthenticated) {
    const response = NextResponse.redirect(new URL("/admin/dashboard", request.url));
    for (const cookie of supabaseResponse.cookies.getAll()) {
      response.cookies.set(cookie.name, cookie.value, cookie);
    }
    return response;
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
