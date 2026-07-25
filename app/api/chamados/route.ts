import { insertChamado } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { nome_produtor, localidade, telefone, tipo, descricao } = body;

    if (!nome_produtor || !localidade || !telefone || !tipo) {
      return NextResponse.json(
        { error: "Campos obrigatórios não preenchidos." },
        { status: 400 }
      );
    }

    const result = await insertChamado({
      nome_produtor,
      localidade,
      telefone,
      tipo,
      descricao
    });

    if (!result.success) {
      return NextResponse.json({ error: result.error }, { status: 500 });
    }

    return NextResponse.json({ success: true }, { status: 201 });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}
