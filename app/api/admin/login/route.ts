import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password } = await request.json();

    const hasSupabase = 
      process.env.NEXT_PUBLIC_SUPABASE_URL && 
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (hasSupabase && !process.env.NEXT_PUBLIC_SUPABASE_URL?.includes("xxxx")) {
      const supabase = await createSupabaseServerClient();

      const { error } = await supabase.auth.signInWithPassword({
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      const response = NextResponse.json({ success: true });
      response.cookies.set("cv_admin_session", "supabase_authenticated", {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        sameSite: "strict",
        maxAge: 60 * 60 * 24, // 1 day
        path: "/",
      });
      return response;
    } else {
      // Local JSON Fallback Credentials
      if (email === "admin@circuloverde.com" && password === "admin123") {
        const response = NextResponse.json({ success: true });
        response.cookies.set("cv_admin_session", "local_authenticated", {
          httpOnly: true,
          secure: process.env.NODE_ENV === "production",
          sameSite: "strict",
          maxAge: 60 * 60 * 24, // 1 day
          path: "/",
        });
        return response;
      }
      return NextResponse.json({ error: "E-mail ou senha incorretos." }, { status: 401 });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
