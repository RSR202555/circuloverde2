import { getCategorias, getBlogPosts } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    // Ping database tables to keep Supabase active 24/7
    await getCategorias();
    await getBlogPosts({ limit: 1 });

    return NextResponse.json({
      success: true,
      status: "Supabase mantido ativo com sucesso",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
