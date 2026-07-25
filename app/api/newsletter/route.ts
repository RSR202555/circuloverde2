import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { email } = body;

  if (!email || !email.includes("@")) {
    return NextResponse.json({ error: "Email inválido." }, { status: 400 });
  }

  const supabase = await createClient();

  const { error } = await supabase.from("newsletter").insert({ email });

  if (error) {
    if (error.code === "23505") {
      return NextResponse.json(
        { error: "Email já cadastrado." },
        { status: 409 }
      );
    }
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
