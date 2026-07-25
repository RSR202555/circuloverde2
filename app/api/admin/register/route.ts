import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const { email, password, secret } = await request.json();

    if (secret !== "CV-Admin-Secret-9F8A2B7C") {
      return NextResponse.json({ error: "Código de segurança (secret) inválido." }, { status: 401 });
    }

    if (!email || !password) {
      return NextResponse.json({ error: "E-mail e senha são obrigatórios." }, { status: 400 });
    }

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

    if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("xxxx")) {
      return NextResponse.json({ 
        error: "Supabase não está configurado localmente. Por favor, adicione suas credenciais reais no arquivo .env.local primeiro." 
      }, { status: 500 });
    }

    const supabase = createClient(supabaseUrl, supabaseKey, {
      auth: { persistSession: false }
    });

    const isServiceRole = !!process.env.SUPABASE_SERVICE_ROLE_KEY && !process.env.SUPABASE_SERVICE_ROLE_KEY.includes("xxxx");

    if (isServiceRole) {
      // Create user and auto-confirm using admin API (bypasses email validation)
      const { data, error } = await supabase.auth.admin.createUser({
        email,
        password,
        email_confirm: true
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Usuário administrador criado e confirmado com sucesso!",
        user: data.user 
      });
    } else {
      // Standard sign-up
      const { data, error } = await supabase.auth.signUp({
        email,
        password,
      });

      if (error) {
        return NextResponse.json({ error: error.message }, { status: 400 });
      }

      return NextResponse.json({ 
        success: true, 
        message: "Sign-up enviado! Verifique sua caixa de e-mail para confirmação (ou ative auto-confirm no dashboard do Supabase).",
        user: data.user 
      });
    }
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
