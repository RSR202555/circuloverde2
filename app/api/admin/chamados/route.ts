import { getChamados, updateChamadoStatus } from "@/lib/db";
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
    const chamados = await getChamados();
    return NextResponse.json(chamados);
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
    const { id, status } = body;

    if (!id || !status) {
      return NextResponse.json({ error: "Faltando ID ou Status" }, { status: 400 });
    }

    const result = await updateChamadoStatus(id, status);
    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
