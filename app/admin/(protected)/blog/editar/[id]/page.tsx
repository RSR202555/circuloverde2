import { getBlogPostById } from "@/lib/db";
import BlogForm from "@/components/admin/BlogForm";
import { notFound } from "next/navigation";

export default async function AdminEditarBlogPage({
  params
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const post = await getBlogPostById(id);

  if (!post) {
    notFound();
  }

  return <BlogForm initialData={post} isEdit={true} />;
}
