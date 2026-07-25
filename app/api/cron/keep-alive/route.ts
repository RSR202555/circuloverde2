import { getCategorias } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  // Validate authorization header using CRON_SECRET if configured on Vercel
  const authHeader = request.headers.get("authorization");
  if (process.env.CRON_SECRET && authHeader !== `Bearer ${process.env.CRON_SECRET}`) {
    return NextResponse.json({ error: "Não autorizado" }, { status: 401 });
  }

  try {
    // Ping database by fetching categories
    await getCategorias();
    return NextResponse.json({
      success: true,
      message: "Database pinged successfully",
      timestamp: new Date().toISOString()
    });
  } catch (err: any) {
    return NextResponse.json({ success: false, error: err.message }, { status: 500 });
  }
}
