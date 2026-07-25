import { createClient } from "@supabase/supabase-js";
import { NextResponse } from "next/server";
import catalogoData from "@/data/catalogo.json";
import { seedLocalDb } from "@/lib/db";

export async function GET(request: Request) {
  // Simple auth check via query param to prevent random execution
  const { searchParams } = new URL(request.url);
  const secret = searchParams.get("secret");
  
  if (secret !== "semente_verde") {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY || process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!supabaseUrl || !supabaseKey || supabaseUrl.includes("xxxx")) {
    const categorias = catalogoData.categorias.map(c => ({ id: c.id, nome: c.nome, icone: c.icone }));
    const produtos = catalogoData.categorias.flatMap(c => c.produtos.map(p => ({ ...p, categoria_id: c.id })));
    await seedLocalDb({ categorias, produtos });
    return NextResponse.json({ success: true, message: "Banco de dados local (JSON) populado com sucesso!" });
  }

  const supabase = createClient(supabaseUrl, supabaseKey, {
    auth: { persistSession: false }
  });

  try {
    // 1. Insert Categories
    for (const cat of catalogoData.categorias) {
      const { error: catError } = await supabase
        .from("categorias")
        .upsert({
          id: cat.id,
          nome: cat.nome,
          icone: cat.icone
        });

      if (catError) {
        throw new Error(`Erro na categoria ${cat.nome}: ${catError.message}`);
      }

      // 2. Insert Products
      for (const prod of cat.produtos) {
        const { error: prodError } = await supabase
          .from("produtos")
          .upsert({
            sku: prod.sku,
            nome: prod.nome,
            badge: prod.badge || null,
            disponibilidade: prod.disponibilidade || null,
            imagem: prod.imagem || null,
            especificacoes: prod.especificacoes || [],
            descricao: prod.descricao || null,
            categoria_id: cat.id
          });

        if (prodError) {
          throw new Error(`Erro no produto ${prod.nome}: ${prodError.message}`);
        }
      }
    }

    return NextResponse.json({ success: true, message: "Banco de dados populado com sucesso!" });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
