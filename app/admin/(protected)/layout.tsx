import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  let authenticated = false;

  // 1. Try Supabase Auth
  try {
    const supabase = await createClient();
    const { data: { user } } = await supabase.auth.getUser();
    if (user) authenticated = true;
  } catch (e) {
    // Supabase variables not set
  }

  // 2. Try Fallback Cookie Auth
  if (!authenticated) {
    const cookieStore = await cookies();
    const session = cookieStore.get("cv_admin_session");
    if (session) authenticated = true;
  }

  if (!authenticated) {
    redirect("/admin/login");
  }

  return (
    <div className="flex min-h-screen bg-background font-body">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
