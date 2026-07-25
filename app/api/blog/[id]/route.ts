import { NextResponse } from "next/server";
import { getBlogPostById, updateBlogPost, deleteBlogPost } from "@/lib/db";

export async function GET(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  const { id } = await params;
  const post = await getBlogPostById(id);
  if (!post) {
    return NextResponse.json({ error: "Matéria não encontrada." }, { status: 404 });
  }
  return NextResponse.json(post);
}

export async function PUT(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const body = await request.json();
    
    if (body.titulo && !body.slug) {
      body.slug = body.titulo
        .toLowerCase()
        .normalize("NFD")
        .replace(/[\u0300-\u036f]/g, "")
        .replace(/[^a-z0-9]+/g, "-")
        .replace(/(^-|-$)/g, "");
    }

    const res = await updateBlogPost(id, body);
    if (res.success) {
      return NextResponse.json(res.data);
    }
    return NextResponse.json({ error: res.error }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const { id } = await params;
    const res = await deleteBlogPost(id);
    if (res.success) {
      return NextResponse.json({ success: true });
    }
    return NextResponse.json({ error: res.error }, { status: 500 });
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
