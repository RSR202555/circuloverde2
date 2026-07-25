import { createClient as createSupabaseClient } from "@supabase/supabase-js";
import { createClient as createSupabaseServerClient } from "@/lib/supabase/server";
import fs from "fs";
import path from "path";
import { BlogPost } from "./types";

const hasSupabase = 
  process.env.NEXT_PUBLIC_SUPABASE_URL && 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY &&
  !process.env.NEXT_PUBLIC_SUPABASE_URL.includes("xxxx");

const staticSupabase = hasSupabase
  ? createSupabaseClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL!,
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
    )
  : null;

async function getSupabaseClient() {
  if (!hasSupabase) return null;
  try {
    return await createSupabaseServerClient();
  } catch {
    return staticSupabase;
  }
}

const localDbPath = path.join(process.cwd(), "data", "local_db.json");

interface LocalDbSchema {
  chamados: any[];
  categorias: any[];
  produtos: any[];
  posts: BlogPost[];
}

const INITIAL_POSTS: BlogPost[] = [
  {
    id: "post-1",
    slug: "manutencao-preventiva-pivos-centrais-guia-completo",
    titulo: "Manutenção Preventiva de Pivôs Centrais: Guia Completo para Evitar Paradas Inesperadas",
    subtitulo: "Descubra as principais rotinas de inspeção, verificação de painéis elétricos, redutores e conjuntos pneumáticos para otimizar sua safra.",
    conteudo: `
<p class="text-lg leading-relaxed text-on-surface-variant font-body mb-6">A irrigação por pivô central é um dos investimentos mais estratégicos da agricultura de precisão. No entanto, paradas não programadas durante períodos de alta exigência hídrica podem comprometer drasticamente a produtividade das lavouras.</p>

<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">1. Verificação Semanal do Sistema Elétrico e Painel de Comando</h2>
<p class="leading-relaxed text-on-surface-variant font-body mb-4">Antes de ligar o pivô, inspecione as conexões elétricas, reles de proteção e contatores. Sujeira, umidade e oxidação são os maiores inimigos dos painéis de irrigação. Limpe com limpa-contato apropriado e meça a tensão de entrada para evitar quedas de fase durante o ciclo.</p>

<blockquote class="border-l-4 border-emerald-500 pl-4 py-2 my-6 italic text-emerald-950 bg-emerald-50/50 rounded-r-xl font-body">"Prevenir um curto no painel de comando custa menos de 5% do valor do reparo emergencial de um motor queimado em plena safra."</blockquote>

<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">2. Alinhamento dos Lances e Pneus</h2>
<p class="leading-relaxed text-on-surface-variant font-body mb-4">Mantenha a pressão dos pneus dentro das especificações do fabricante (geralmente entre 20 e 28 PSI). Pneus murchos causam torção na estrutura dos lances e desalinham as chaves micro-switch de segurança.</p>

<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">3. Inspeção dos Motoredutores e Caixas de Engrenagem</h2>
<p class="leading-relaxed text-on-surface-variant font-body mb-4">Verifique periodicamente o nível de óleo nos motoredutores das rodas. Troque o lubrificante a cada 1.000 horas de uso ou ao menos uma vez por ano. O óleo degradado acumula umidade por condensação, acelerando o desgaste das engrenagens helicoidais.</p>

<div class="bg-primary/5 p-6 rounded-2xl my-8 border border-primary/10">
  <h3 class="text-lg font-bold text-primary font-headline mb-2">💡 Dica Círculo Verde</h3>
  <p class="text-sm text-on-surface-variant font-body">Nossa equipe técnica disponibiliza suporte emergencial e peças originais para pronta entrega. Em caso de dúvidas sobre o alinhamento do pivô, entre em contato através de nossa central de chamados.</p>
</div>
`,
    capa_url: "https://images.unsplash.com/photo-1595838787766-3d7178a5e3e2?q=80&w=1200&auto=format&fit=crop",
    autor: "Eng. Roberto Silva",
    categoria: "Tecnologia & Pivôs",
    tags: ["Pivô Central", "Manutenção", "Irrigação", "Equipamentos"],
    status: "publicado",
    destaque: true,
    tempo_leitura: "6 min",
    views: 342,
    published_at: new Date(Date.now() - 86400000 * 2).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 3).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 2).toISOString()
  },
  {
    id: "post-2",
    slug: "manejo-inteligente-irrigacao-cultura-soja",
    titulo: "Manejo Inteligente de Irrigação na Cultura da Soja: Maximizando a Eficiência Hídrica",
    subtitulo: "Como o monitoramento de umidade do solo e a lâmina exata de água elevam o rendimento de sacas por hectare.",
    conteudo: `
<p class="text-lg leading-relaxed text-on-surface-variant font-body mb-6">A cultura da soja responde com expressivo aumento de produtividade quando submetida a um manejo hídrico otimizado. O segredo está em atender a demanda evaporativa sem causar estresse hídrico ou encharcamento no sistema radicular.</p>

<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">Fases Críticas de Demanda Hídrica</h2>
<p class="leading-relaxed text-on-surface-variant font-body mb-4">Embora a planta necessite de água durante todo o desenvolvimento, o período de floração (R1/R2) e enchimendo de grãos (R5.1 a R5.5) exige até 7 a 8 mm por dia. Déficits hídricos nestes estádios causam abortamento de flores e redução do peso de 1.000 grãos.</p>

<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">Uso de Tensiômetros e Sensores</h2>
<p class="leading-relaxed text-on-surface-variant font-body mb-4">A instalação de sensores de umidade em diferentes profundidades do perfil do solo (0-20cm e 20-40cm) permite saber com exatidão quando ligar o pivô e qual lâmina aplicar, evitando desperdício de energia elétrica e lixiviação de nutrientes.</p>
`,
    capa_url: "https://images.unsplash.com/photo-1592982537447-7440770cbfc9?q=80&w=1200&auto=format&fit=crop",
    autor: "Dra. Camila Albuquerque",
    categoria: "Agronomia",
    tags: ["Soja", "Manejo Hídrico", "Produtividade", "Solo"],
    status: "publicado",
    destaque: false,
    tempo_leitura: "4 min",
    views: 215,
    published_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 5).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 5).toISOString()
  },
  {
    id: "post-3",
    slug: "diagnostico-falhas-eletricas-paineis-irrigacao",
    titulo: "Diagnóstico de Falhas Elétricas em Painéis de Irrigação: Sinais e Soluções",
    subtitulo: "Identifique problemas comuns de sobrecarga, oscilações de tensão e falhas em contatores antes de queimar o motor.",
    conteudo: `
<p class="text-lg leading-relaxed text-on-surface-variant font-body mb-6">Painéis elétricos expostos ao ambiente fabril ou agrícola sofrem constantes variações térmicas e surtos de tensão provenientes da rede elétrica ou descargas atmosféricas.</p>

<h2 class="text-2xl font-black text-primary font-headline mt-8 mb-4">Sinais Prévia de Falhas</h2>
<ul class="list-disc pl-6 space-y-2 text-on-surface-variant font-body mb-6">
  <li>Aquecimento excessivo nos contatores ou disjuntores motor.</li>
  <li>Zumbido constante vindo da bobina do contator.</li>
  <li>Desarmes frequentes da proteção relé térmico sem motivo aparente.</li>
</ul>

<p class="leading-relaxed text-on-surface-variant font-body mb-4">Se observar qualquer um desses sintomas, solicite uma vistoria técnica imediata antes de forçar o acionamento repetido do sistema.</p>
`,
    capa_url: "https://images.unsplash.com/photo-1617791160505-6f00504e3519?q=80&w=1200&auto=format&fit=crop",
    autor: "Técnico Lucas Mendes",
    categoria: "Manejo de Solo",
    tags: ["Painel Elétrico", "Segurança", "Assistência Técnica"],
    status: "publicado",
    destaque: false,
    tempo_leitura: "5 min",
    views: 189,
    published_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    created_at: new Date(Date.now() - 86400000 * 8).toISOString(),
    updated_at: new Date(Date.now() - 86400000 * 8).toISOString()
  }
];

function getLocalDb(): LocalDbSchema {
  if (!fs.existsSync(localDbPath)) {
    const staticCatalogPath = path.join(process.cwd(), "data", "catalogo.json");
    let initialCategorias: any[] = [];
    let initialProdutos: any[] = [];
    
    if (fs.existsSync(staticCatalogPath)) {
      try {
        const staticData = JSON.parse(fs.readFileSync(staticCatalogPath, "utf-8"));
        initialCategorias = (staticData.categorias || []).map((c: any) => ({
          id: c.id,
          nome: c.nome,
          icone: c.icone
        }));
        initialProdutos = (staticData.categorias || []).flatMap((c: any) => 
          (c.produtos || []).map((p: any) => ({
            ...p,
            categoria_id: c.id
          }))
        );
      } catch (e) {
        console.error("Erro ao carregar catalogo.json inicial:", e);
      }
    }

    const initialDb = { 
      chamados: [], 
      categorias: initialCategorias, 
      produtos: initialProdutos,
      posts: INITIAL_POSTS 
    };
    saveLocalDb(initialDb);
    return initialDb;
  }
  
  try {
    const data = JSON.parse(fs.readFileSync(localDbPath, "utf-8"));
    if (!data.posts) {
      data.posts = INITIAL_POSTS;
      saveLocalDb(data);
    }
    return data;
  } catch {
    return { chamados: [], categorias: [], produtos: [], posts: INITIAL_POSTS };
  }
}

function saveLocalDb(data: LocalDbSchema) {
  const dir = path.dirname(localDbPath);
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
  }
  fs.writeFileSync(localDbPath, JSON.stringify(data, null, 2), "utf-8");
}

export async function getChamados() {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("chamados")
      .select("*")
      .order("created_at", { ascending: false });
    if (!error) return data || [];
  }
  return getLocalDb().chamados.sort((a, b) => 
    new Date(b.created_at || 0).getTime() - new Date(a.created_at || 0).getTime()
  );
}

export async function insertChamado(chamado: {
  nome_produtor: string;
  localidade: string;
  telefone: string;
  tipo: string;
  descricao?: string;
}) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("chamados")
      .insert(chamado)
      .select();
    if (!error) return { success: true, data };
    return { success: false, error: error.message };
  }
  
  const db = getLocalDb();
  const newChamado = {
    id: Math.random().toString(36).substring(2, 9),
    ...chamado,
    status: "novo",
    created_at: new Date().toISOString()
  };
  db.chamados.push(newChamado);
  saveLocalDb(db);
  return { success: true, data: [newChamado] };
}

export async function updateChamadoStatus(id: string, status: string) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { error } = await supabase
      .from("chamados")
      .update({ status })
      .eq("id", id);
    if (!error) return { success: true };
    return { success: false, error: error.message };
  }
  
  const db = getLocalDb();
  const idx = db.chamados.findIndex(c => c.id === id);
  if (idx !== -1) {
    db.chamados[idx].status = status;
    saveLocalDb(db);
    return { success: true };
  }
  return { success: false, error: "Chamado não encontrado" };
}

export async function getCategorias() {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("categorias").select("*");
    if (!error) return data || [];
  }
  return getLocalDb().categorias;
}

export async function getProdutos() {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("produtos").select("*");
    if (!error) return data || [];
  }
  return getLocalDb().produtos;
}

export async function insertProduto(produto: any) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("produtos").insert(produto).select();
    if (!error) return { success: true, data };
    return { success: false, error: error.message };
  }
  
  const db = getLocalDb();
  db.produtos.push(produto);
  saveLocalDb(db);
  return { success: true, data: [produto] };
}

export async function updateProduto(sku: string, updates: any) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase.from("produtos").update(updates).eq("sku", sku).select();
    if (!error) return { success: true, data };
    return { success: false, error: error.message };
  }
  
  const db = getLocalDb();
  const idx = db.produtos.findIndex(p => p.sku === sku);
  if (idx !== -1) {
    db.produtos[idx] = { ...db.produtos[idx], ...updates };
    saveLocalDb(db);
    return { success: true, data: [db.produtos[idx]] };
  }
  return { success: false, error: "Produto não encontrado" };
}

export async function deleteProduto(sku: string) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("produtos").delete().eq("sku", sku);
    if (!error) return { success: true };
    return { success: false, error: error.message };
  }
  
  const db = getLocalDb();
  const filtered = db.produtos.filter(p => p.sku !== sku);
  if (filtered.length !== db.produtos.length) {
    db.produtos = filtered;
    saveLocalDb(db);
    return { success: true };
  }
  return { success: false, error: "Produto não encontrado" };
}

/* =========================================================================
   FUNÇÕES DO BLOG
   ========================================================================= */

export async function getBlogPosts(options?: { 
  status?: string; 
  categoria?: string; 
  apenasDestaque?: boolean; 
  limit?: number;
}) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    let query = supabase.from("blog_posts").select("*").order("published_at", { ascending: false });
    if (options?.status) {
      query = query.eq("status", options.status);
    }
    if (options?.categoria && options.categoria !== "Todas") {
      query = query.eq("categoria", options.categoria);
    }
    if (options?.apenasDestaque) {
      query = query.eq("destaque", true);
    }
    if (options?.limit) {
      query = query.limit(options.limit);
    }
    const { data, error } = await query;
    if (!error && data) return data as BlogPost[];
  }

  let posts = getLocalDb().posts || [];
  
  if (options?.status) {
    posts = posts.filter(p => p.status === options.status);
  }
  if (options?.categoria && options.categoria !== "Todas") {
    posts = posts.filter(p => p.categoria === options.categoria);
  }
  if (options?.apenasDestaque) {
    posts = posts.filter(p => p.destaque === true);
  }

  posts.sort((a, b) => new Date(b.published_at || 0).getTime() - new Date(a.published_at || 0).getTime());

  if (options?.limit) {
    posts = posts.slice(0, options.limit);
  }

  return posts;
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | null> {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("slug", slug)
      .single();
    if (!error && data) return data as BlogPost;
  }

  const posts = getLocalDb().posts || [];
  return posts.find(p => p.slug === slug) || null;
}

export async function getBlogPostById(id: string): Promise<BlogPost | null> {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .select("*")
      .eq("id", id)
      .single();
    if (!error && data) return data as BlogPost;
  }

  const posts = getLocalDb().posts || [];
  return posts.find(p => p.id === id) || null;
}

export async function insertBlogPost(post: Omit<BlogPost, "id" | "created_at" | "updated_at">) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .insert(post)
      .select();
    if (!error && data) return { success: true, data: data[0] };
    return { success: false, error: error.message };
  }

  const db = getLocalDb();
  const now = new Date().toISOString();
  const newPost: BlogPost = {
    id: "post-" + Math.random().toString(36).substring(2, 9),
    ...post,
    created_at: now,
    updated_at: now,
    published_at: post.published_at || now,
    views: post.views || 0
  };
  
  db.posts.push(newPost);
  saveLocalDb(db);
  return { success: true, data: newPost };
}

export async function updateBlogPost(id: string, updates: Partial<BlogPost>) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { data, error } = await supabase
      .from("blog_posts")
      .update({ ...updates, updated_at: new Date().toISOString() })
      .eq("id", id)
      .select();
    if (!error && data) return { success: true, data: data[0] };
    return { success: false, error: error.message };
  }

  const db = getLocalDb();
  const idx = db.posts.findIndex(p => p.id === id);
  if (idx !== -1) {
    db.posts[idx] = {
      ...db.posts[idx],
      ...updates,
      updated_at: new Date().toISOString()
    };
    saveLocalDb(db);
    return { success: true, data: db.posts[idx] };
  }
  return { success: false, error: "Matéria não encontrada" };
}

export async function deleteBlogPost(id: string) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    const { error } = await supabase.from("blog_posts").delete().eq("id", id);
    if (!error) return { success: true };
    return { success: false, error: error.message };
  }

  const db = getLocalDb();
  const initialLength = db.posts.length;
  db.posts = db.posts.filter(p => p.id !== id);
  if (db.posts.length !== initialLength) {
    saveLocalDb(db);
    return { success: true };
  }
  return { success: false, error: "Matéria não encontrada" };
}

export async function incrementBlogPostViews(id: string) {
  const supabase = await getSupabaseClient();
  if (supabase) {
    try {
      await supabase.rpc("increment_post_views", { post_id: id });
    } catch {
      // Fallback update
    }
  }

  const db = getLocalDb();
  const post = db.posts.find(p => p.id === id);
  if (post) {
    post.views = (post.views || 0) + 1;
    saveLocalDb(db);
  }
}

export async function seedLocalDb(data: { categorias: any[], produtos: any[] }) {
  const db = getLocalDb();
  db.categorias = data.categorias;
  db.produtos = data.produtos;
  saveLocalDb(db);
}
