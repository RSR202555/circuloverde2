import { getCategorias } from "@/lib/db";
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
    const categorias = await getCategorias();
    return NextResponse.json(categorias);
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
