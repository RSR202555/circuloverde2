import { getBlogPosts } from "@/lib/db";
import Link from "next/link";
import BlogClientView from "./BlogClientView";

export const metadata = {
  title: "Notícias & Matérias Agrícolas | Círculo Verde Irrigação",
  description: "Artigos técnicos, orientações de manejo hídrico, manutenção preventiva de pivôs centrais e inovações em agricultura de precisão.",
};

export default async function BlogIndexPage() {
  // Apenas matérias publicadas para os visitantes
  const posts = await getBlogPosts({ status: "publicado" });
  
  return <BlogClientView initialPosts={posts} />;
}
