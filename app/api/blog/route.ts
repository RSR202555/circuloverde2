import { NextResponse } from "next/server";
import { getBlogPosts, insertBlogPost } from "@/lib/db";

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);
  const status = searchParams.get("status") || undefined;
  const categoria = searchParams.get("categoria") || undefined;
  const apenasDestaque = searchParams.get("destaque") === "true";
  const limit = searchParams.get("limit") ? Number(searchParams.get("limit")) : undefined;

  const posts = await getBlogPosts({ status, categoria, apenasDestaque, limit });
  return NextResponse.json(posts);
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    if (!body.titulo || !body.conteudo) {
      return NextResponse.json({ error: "Título e conteúdo são obrigatórios." }, { status: 400 });
    }

    // Gerar slug caso não informado
    const slug = body.slug || body.titulo
      .toLowerCase()
      .normalize("NFD")
      .replace(/[\u0300-\u036f]/g, "")
      .replace(/[^a-z0-9]+/g, "-")
      .replace(/(^-|-$)/g, "");

    const postData = {
      slug,
      titulo: body.titulo,
      subtitulo: body.subtitulo || "",
      conteudo: body.conteudo,
      capa_url: body.capa_url || "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop",
      autor: body.autor || "Equipe Círculo Verde",
      categoria: body.categoria || "Agronomia",
      tags: body.tags || [],
      status: body.status || "rascunho",
      destaque: body.destaque ?? false,
      tempo_leitura: body.tempo_leitura || "5 min",
      views: 0,
      published_at: body.published_at || new Date().toISOString()
    };

    const res = await insertBlogPost(postData);
    if (res.success) {
      return NextResponse.json(res.data, { status: 201 });
    }
    return NextResponse.json({ error: res.error }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
