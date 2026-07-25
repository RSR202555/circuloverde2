import { getProdutos, insertProduto, updateProduto, deleteProduto } from "@/lib/db";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";

async function checkAuth() {
  const cookieStore = await cookies();
  const session = cookieStore.get("cv_admin_session");
  return !!session;
}

export async function GET() {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const produtos = await getProdutos();
    return NextResponse.json(produtos);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { sku, nome, categoria_id, badge, disponibilidade, imagem, especificacoes, descricao } = body;

    if (!sku || !nome || !categoria_id) {
      return NextResponse.json({ error: "SKU, Nome e Categoria são obrigatórios" }, { status: 400 });
    }

    const result = await insertProduto({
      sku,
      nome,
      categoria_id,
      badge: badge || null,
      disponibilidade: disponibilidade || null,
      imagem: imagem || "",
      especificacoes: especificacoes || [],
      descricao: descricao || ""
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function PUT(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const body = await request.json();
    const { sku, nome, categoria_id, badge, disponibilidade, imagem, especificacoes, descricao } = body;

    if (!sku) {
      return NextResponse.json({ error: "SKU é obrigatório" }, { status: 400 });
    }

    const result = await updateProduto(sku, {
      nome,
      categoria_id,
      badge: badge || null,
      disponibilidade: disponibilidade || null,
      imagem: imagem || "",
      especificacoes: especificacoes || [],
      descricao: descricao || ""
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true, data: result.data });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

export async function DELETE(request: Request) {
  if (!(await checkAuth())) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    const { searchParams } = new URL(request.url);
    const sku = searchParams.get("sku");

    if (!sku) {
      return NextResponse.json({ error: "SKU é obrigatório" }, { status: 400 });
    }

    const result = await deleteProduto(sku);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
