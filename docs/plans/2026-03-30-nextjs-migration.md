# Círculo Verde — Next.js Migration Implementation Plan

> **For Claude:** REQUIRED SUB-SKILL: Use superpowers:executing-plans to implement this plan task-by-task.

**Goal:** Migrar o site HTML estático da Círculo Verde para Next.js 14 com catálogo digital expandido, integração Supabase, e painel administrativo completo.

**Architecture:** App Router com Server Components por padrão. Rotas públicas em `(site)/`, admin protegido por middleware Supabase Auth. Catálogo lido de `data/catalogo.json`, chamados e newsletter salvos no Supabase.

**Tech Stack:** Next.js 14, TypeScript, Tailwind CSS, Supabase (Auth + DB), Vercel

---

### Task 1: Inicializar projeto Next.js

**Files:**
- Create: `package.json`, `tsconfig.json`, `tailwind.config.ts`, `next.config.ts`
- Create: `.env.local.example`

**Step 1: Criar o projeto Next.js**

```bash
cd "d:/RIAN/circulo verde"
npx create-next-app@latest . --typescript --tailwind --app --no-src-dir --import-alias "@/*"
```
Responder às perguntas:
- Would you like to use ESLint? → Yes
- Would you like to use Turbopack? → No

**Step 2: Instalar dependências**

```bash
npm install @supabase/supabase-js @supabase/ssr
npm install @supabase/auth-helpers-nextjs
```

**Step 3: Configurar `.env.local.example`**

```bash
NEXT_PUBLIC_SUPABASE_URL=https://xxxx.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=xxxx
SUPABASE_SERVICE_ROLE_KEY=xxxx
```

Copiar para `.env.local` e preencher com as credenciais reais do Supabase.

**Step 4: Configurar `tailwind.config.ts` com o design system**

Substituir o conteúdo por:

```typescript
import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "error-container": "#ffdad6",
        "surface-container-low": "#f0f5ed",
        "primary-fixed": "#acf4a4",
        "on-secondary-fixed": "#002204",
        "on-primary-fixed": "#002203",
        "surface-container-lowest": "#ffffff",
        "outline-variant": "#c0c9bb",
        "primary-container": "#1b5e20",
        "on-secondary": "#ffffff",
        outline: "#717a6d",
        error: "#ba1a1a",
        "on-tertiary-fixed": "#001d34",
        "on-primary-fixed-variant": "#0c5216",
        "tertiary-fixed": "#cfe5ff",
        "tertiary-fixed-dim": "#99cbff",
        "secondary-fixed-dim": "#6ede70",
        "on-tertiary-container": "#95c9ff",
        "on-surface": "#171d18",
        "primary-fixed-dim": "#91d78a",
        "surface-container": "#eaf0e7",
        "inverse-surface": "#2c322c",
        surface: "#f5fbf2",
        secondary: "#006e1c",
        "surface-dim": "#d6dcd3",
        "on-tertiary-fixed-variant": "#004a78",
        "on-primary": "#ffffff",
        "on-error": "#ffffff",
        "surface-container-high": "#e4eae1",
        "secondary-fixed": "#8afb89",
        "on-primary-container": "#90d689",
        primary: "#00450d",
        "on-surface-variant": "#41493e",
        "on-background": "#171d18",
        "on-tertiary": "#ffffff",
        "surface-tint": "#2a6b2c",
        "surface-container-highest": "#dee4dc",
        "surface-variant": "#dee4dc",
        "inverse-primary": "#91d78a",
        "on-secondary-container": "#00731e",
        "tertiary-container": "#005589",
        "on-error-container": "#93000a",
        tertiary: "#003d65",
        "on-secondary-fixed-variant": "#005313",
        background: "#f5fbf2",
        "secondary-container": "#87f886",
        "surface-bright": "#f5fbf2",
        "inverse-on-surface": "#edf2ea",
      },
      fontFamily: {
        headline: ["var(--font-plus-jakarta)"],
        body: ["var(--font-inter)"],
        label: ["var(--font-inter)"],
      },
      borderRadius: {
        DEFAULT: "0.25rem",
        lg: "0.5rem",
        xl: "0.75rem",
        full: "9999px",
      },
    },
  },
  plugins: [],
};

export default config;
```

**Step 5: Commit**

```bash
git add .
git commit -m "feat: initialize Next.js project with Tailwind design system"
```

---

### Task 2: Configurar clientes Supabase e tipos TypeScript

**Files:**
- Create: `lib/supabase/client.ts`
- Create: `lib/supabase/server.ts`
- Create: `lib/types.ts`
- Create: `middleware.ts`

**Step 1: Criar `lib/supabase/client.ts`**

```typescript
import { createBrowserClient } from "@supabase/ssr";

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
  );
}
```

**Step 2: Criar `lib/supabase/server.ts`**

```typescript
import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export async function createClient() {
  const cookieStore = await cookies();

  return createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return cookieStore.getAll();
        },
        setAll(cookiesToSet) {
          try {
            cookiesToSet.forEach(({ name, value, options }) =>
              cookieStore.set(name, value, options)
            );
          } catch {}
        },
      },
    }
  );
}
```

**Step 3: Criar `lib/types.ts`**

```typescript
export type TipoChamado = "preventiva" | "emergencial";
export type StatusChamado = "novo" | "em_andamento" | "concluido";

export interface Chamado {
  id: string;
  nome_produtor: string;
  localidade: string;
  tipo: TipoChamado;
  descricao: string;
  status: StatusChamado;
  created_at: string;
}

export interface NewsletterEmail {
  id: string;
  email: string;
  created_at: string;
}

export interface ProdutoView {
  produto_sku: string;
  views: number;
}

export interface Produto {
  sku: string;
  nome: string;
  badge: string;
  disponibilidade: string;
  imagem: string;
  especificacoes: string[];
  descricao: string;
}

export interface Categoria {
  id: string;
  nome: string;
  icone: string;
  produtos: Produto[];
}

export interface Catalogo {
  categorias: Categoria[];
}
```

**Step 4: Criar `middleware.ts` (raiz do projeto)**

```typescript
import { createServerClient } from "@supabase/ssr";
import { NextResponse, type NextRequest } from "next/server";

export async function middleware(request: NextRequest) {
  let supabaseResponse = NextResponse.next({ request });

  const supabase = createServerClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL!,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          return request.cookies.getAll();
        },
        setAll(cookiesToSet) {
          cookiesToSet.forEach(({ name, value }) =>
            request.cookies.set(name, value)
          );
          supabaseResponse = NextResponse.next({ request });
          cookiesToSet.forEach(({ name, value, options }) =>
            supabaseResponse.cookies.set(name, value, options)
          );
        },
      },
    }
  );

  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isAdminRoute = request.nextUrl.pathname.startsWith("/admin");
  const isLoginPage = request.nextUrl.pathname === "/admin/login";

  if (isAdminRoute && !isLoginPage && !user) {
    return NextResponse.redirect(new URL("/admin/login", request.url));
  }

  if (isLoginPage && user) {
    return NextResponse.redirect(new URL("/admin/dashboard", request.url));
  }

  return supabaseResponse;
}

export const config = {
  matcher: ["/admin/:path*"],
};
```

**Step 5: Commit**

```bash
git add lib/ middleware.ts
git commit -m "feat: add Supabase clients, TypeScript types, and admin middleware"
```

---

### Task 3: Criar tabelas no Supabase

**Files:**
- Create: `supabase/migrations/001_initial.sql`

**Step 1: Criar arquivo de migration**

```sql
-- Tabela de chamados técnicos
create table public.chamados (
  id uuid default gen_random_uuid() primary key,
  nome_produtor text not null,
  localidade text not null,
  tipo text not null check (tipo in ('preventiva', 'emergencial')),
  descricao text,
  status text not null default 'novo' check (status in ('novo', 'em_andamento', 'concluido')),
  created_at timestamptz default now() not null
);

-- Tabela de newsletter
create table public.newsletter (
  id uuid default gen_random_uuid() primary key,
  email text unique not null,
  created_at timestamptz default now() not null
);

-- Tabela de visualizações de produtos
create table public.produto_views (
  produto_sku text primary key,
  views integer not null default 0
);

-- RLS: habilitar em todas as tabelas
alter table public.chamados enable row level security;
alter table public.newsletter enable row level security;
alter table public.produto_views enable row level security;

-- Políticas: inserção pública (formulários do site)
create policy "Allow public insert on chamados"
  on public.chamados for insert to anon with check (true);

create policy "Allow public insert on newsletter"
  on public.newsletter for insert to anon with check (true);

create policy "Allow public upsert on produto_views"
  on public.produto_views for all to anon using (true) with check (true);

-- Políticas: leitura e escrita completa para autenticados (admin)
create policy "Allow authenticated full access on chamados"
  on public.chamados for all to authenticated using (true) with check (true);

create policy "Allow authenticated full access on newsletter"
  on public.newsletter for all to authenticated using (true) with check (true);

create policy "Allow authenticated full access on produto_views"
  on public.produto_views for all to authenticated using (true) with check (true);
```

**Step 2: Executar no Supabase**

Ir em **Supabase Dashboard → SQL Editor** e executar o SQL acima.

**Step 3: Criar usuário admin**

No Supabase Dashboard → **Authentication → Users → Add User**:
- Email: seu email de admin
- Password: senha segura
- Email confirmed: ✓

**Step 4: Commit**

```bash
git add supabase/
git commit -m "feat: add Supabase SQL migration for chamados, newsletter, produto_views"
```

---

### Task 4: Criar `data/catalogo.json`

**Files:**
- Create: `data/catalogo.json`

**Step 1: Criar o arquivo JSON com produtos iniciais**

```json
{
  "categorias": [
    {
      "id": "motores",
      "nome": "Moto-redutores",
      "icone": "settings",
      "produtos": [
        {
          "sku": "K-992-01",
          "nome": "Moto-redutor High-Torque",
          "badge": "KREBS Original",
          "disponibilidade": "Pronta Entrega",
          "imagem": "/produtos/motoredutor.jpg",
          "especificacoes": [
            "Vedação IP66 Industrial",
            "Rolamentos Blindados",
            "Proteção Térmica Integrada"
          ],
          "descricao": "Motor de alta performance desenvolvido para operar em condições severas do campo brasileiro. Engenharia alemã com adaptação tropical."
        }
      ]
    },
    {
      "id": "aspersores",
      "nome": "Aspersores de Precisão",
      "icone": "opacity",
      "produtos": [
        {
          "sku": "IW-044",
          "nome": "Aspersor i-Wob Precision",
          "badge": "Componente i-Wob",
          "disponibilidade": "Alta Performance",
          "imagem": "/produtos/aspersor.jpg",
          "especificacoes": [
            "Gotas Ultra-uniformes",
            "Redução de Deriva pelo Vento",
            "Baixa Intensidade de Aplicação"
          ],
          "descricao": "Tecnologia i-Wob para distribuição uniforme de água. Reduz deriva pelo vento e otimiza o aproveitamento hídrico."
        }
      ]
    },
    {
      "id": "controle",
      "nome": "Módulos de Controle",
      "icone": "developer_board",
      "produtos": [
        {
          "sku": "SM-LORA-X",
          "nome": "Módulo de Controle 4G/LoRa",
          "badge": "Smart Tech",
          "disponibilidade": "Tecnologia LoRa",
          "imagem": "/produtos/modulo-controle.jpg",
          "especificacoes": [
            "Gestão via Smartphone",
            "Alertas de Pressão em Real-time",
            "Backup de Dados em Nuvem"
          ],
          "descricao": "Módulo de controle inteligente com conectividade 4G e LoRa para monitoramento remoto do pivô central."
        }
      ]
    },
    {
      "id": "pivos",
      "nome": "Pivôs Centrais",
      "icone": "360",
      "produtos": [
        {
          "sku": "K-PC-2500",
          "nome": "KREBS Pivot Central 2500",
          "badge": "KREBS Original",
          "disponibilidade": "Sob Encomenda",
          "imagem": "/produtos/pivo-central.jpg",
          "especificacoes": [
            "Aço Galvanizado a Fogo",
            "Controle Rede 4G / LoRa Smart",
            "Alcance até 1.000m de raio",
            "Garantia estrutural 10 anos"
          ],
          "descricao": "Sistema de pivô central de alto desempenho. Engenharia alemã adaptada à realidade tropical brasileira, garantindo uniformidade hídrica total."
        }
      ]
    }
  ]
}
```

**Step 2: Criar pasta para imagens de produtos**

```bash
mkdir -p "public/produtos"
```

Adicionar as imagens dos produtos na pasta `public/produtos/` com os nomes referenciados no JSON.

**Step 3: Commit**

```bash
git add data/catalogo.json public/produtos/
git commit -m "feat: add initial catalog JSON and products image folder"
```

---

### Task 5: Layout raiz e componentes globais

**Files:**
- Modify: `app/layout.tsx`
- Create: `app/(site)/layout.tsx`
- Create: `app/globals.css`

**Step 1: Atualizar `app/layout.tsx`**

```typescript
import type { Metadata } from "next";
import { Plus_Jakarta_Sans, Inter } from "next/font/google";
import "./globals.css";

const plusJakarta = Plus_Jakarta_Sans({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-plus-jakarta",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
});

export const metadata: Metadata = {
  title: "Produtos e Serviços | Círculo Verde",
  description:
    "Soluções avançadas em irrigação de precisão. Tecnologia KREBS a serviço da produtividade.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR" className="light">
      <head>
        <link
          href="https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@20..48,100..700,0..1,-50..200&display=swap"
          rel="stylesheet"
        />
      </head>
      <body
        className={`${plusJakarta.variable} ${inter.variable} bg-background font-body text-on-surface`}
      >
        {children}
      </body>
    </html>
  );
}
```

**Step 2: Atualizar `app/globals.css`**

```css
@tailwind base;
@tailwind components;
@tailwind utilities;

@layer base {
  .material-symbols-outlined {
    font-variation-settings: 'FILL' 0, 'wght' 400, 'GRAD' 0, 'opsz' 24;
  }
}

@layer utilities {
  .glass-effect {
    backdrop-filter: blur(20px);
    -webkit-backdrop-filter: blur(20px);
  }

  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }

  .floating-label-group {
    position: relative;
  }

  .floating-label-group input:focus ~ label,
  .floating-label-group input:not(:placeholder-shown) ~ label,
  .floating-label-group textarea:focus ~ label,
  .floating-label-group textarea:not(:placeholder-shown) ~ label {
    top: -0.5rem;
    left: 0.75rem;
    font-size: 0.65rem;
    color: #1b5e20;
    background-color: white;
    padding: 0 0.25rem;
  }

  .floating-label-group label {
    position: absolute;
    top: 0.85rem;
    left: 1rem;
    transition: all 0.2s ease-out;
    pointer-events: none;
  }

  .pulse-primary {
    box-shadow: 0 0 0 0 rgba(27, 94, 32, 0.4);
    animation: pulse-ring 2s infinite;
  }
}

@keyframes pulse-ring {
  0% { box-shadow: 0 0 0 0 rgba(27, 94, 32, 0.4); }
  70% { box-shadow: 0 0 0 10px rgba(27, 94, 32, 0); }
  100% { box-shadow: 0 0 0 0 rgba(27, 94, 32, 0); }
}
```

**Step 3: Criar `app/(site)/layout.tsx`**

```typescript
export default function SiteLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
```

**Step 4: Commit**

```bash
git add app/
git commit -m "feat: configure root layout with fonts, globals CSS, and site layout group"
```

---

### Task 6: Componentes reutilizáveis — Navbar e Footer

**Files:**
- Create: `components/Navbar.tsx`
- Create: `components/Footer.tsx`

**Step 1: Criar `components/Navbar.tsx`**

```typescript
import Link from "next/link";

export default function Navbar() {
  return (
    <nav className="fixed top-0 w-full z-50 bg-white/70 backdrop-blur-xl shadow-sm">
      <div className="flex justify-between items-center px-8 py-4 max-w-7xl mx-auto">
        <Link
          href="/"
          className="text-2xl font-black text-emerald-900 tracking-tighter font-headline"
        >
          Círculo Verde
        </Link>
        <div className="hidden md:flex items-center space-x-8">
          <Link
            href="/"
            className="text-emerald-900/70 hover:text-emerald-900 transition-all duration-300 font-body"
          >
            Início
          </Link>
          <Link
            href="/#produtos"
            className="text-emerald-700 font-bold border-b-2 border-emerald-500 pb-1 font-body"
          >
            Produtos
          </Link>
          <Link
            href="#"
            className="text-emerald-900/70 hover:text-emerald-900 transition-all duration-300 font-body"
          >
            Dicas
          </Link>
          <Link
            href="#"
            className="text-emerald-900/70 hover:text-emerald-900 transition-all duration-300 font-body"
          >
            Sobre Nós
          </Link>
        </div>
        <div className="flex items-center gap-4">
          <span className="hidden lg:flex items-center gap-2 text-xs font-bold text-primary/60 bg-primary/5 px-3 py-1.5 rounded-full border border-primary/10">
            <span className="material-symbols-outlined text-[14px]">verified</span>
            Trusted by 5000+ Farmers
          </span>
          <button className="bg-primary text-on-primary px-6 py-2.5 rounded-xl font-body font-bold text-sm hover:opacity-90 transition-all active:scale-95 shadow-sm">
            Fale Conosco
          </button>
        </div>
      </div>
    </nav>
  );
}
```

**Step 2: Criar `components/Footer.tsx`**

```typescript
import Link from "next/link";
import NewsletterForm from "./NewsletterForm";

export default function Footer() {
  return (
    <footer className="bg-emerald-950 text-emerald-50">
      <div className="grid grid-cols-1 md:grid-cols-4 gap-12 px-8 py-20 max-w-7xl mx-auto">
        <div className="col-span-1">
          <Link
            href="/"
            className="text-2xl font-black text-emerald-50 mb-8 block tracking-tighter font-headline"
          >
            Círculo Verde
          </Link>
          <p className="text-emerald-200/60 text-sm leading-relaxed mb-8">
            Soluções avançadas para irrigação de precisão. Tecnologia KREBS a
            serviço da produtividade e sustentabilidade no campo brasileiro.
          </p>
          <div className="flex gap-4">
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">public</span>
            </a>
            <a
              href="#"
              className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center hover:bg-primary transition-colors"
            >
              <span className="material-symbols-outlined text-sm">share</span>
            </a>
          </div>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-8">
            Soluções
          </div>
          <ul className="space-y-4">
            <li>
              <Link
                href="/catalogo?categoria=pivos"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Pivôs Centrais
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo?categoria=controle"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Automação Smart
              </Link>
            </li>
            <li>
              <Link
                href="/catalogo"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Catálogo Completo
              </Link>
            </li>
            <li>
              <Link
                href="#chamado"
                className="text-emerald-200/60 text-sm hover:text-emerald-400 transition-colors"
              >
                Consultoria Técnica
              </Link>
            </li>
          </ul>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-8">
            Sede Operacional
          </div>
          <p className="text-emerald-200/60 text-sm leading-relaxed">
            Av. Agroindustrial, 2500
            <br />
            Distrito Industrial - Rio Verde, GO
            <br />
            CEP: 75900-000
            <br />
            <br />
            <span className="text-emerald-400 font-bold">
              contato@circuloverde.com.br
            </span>
          </p>
        </div>
        <div>
          <div className="text-xs uppercase tracking-widest font-bold text-emerald-400 mb-8">
            Newsletter Técnica
          </div>
          <p className="text-xs text-emerald-200/40 mb-4 leading-relaxed">
            Receba atualizações sobre novas tecnologias de irrigação.
          </p>
          <NewsletterForm />
        </div>
      </div>
      <div className="border-t border-white/5 px-8 py-6 max-w-7xl mx-auto">
        <p className="text-emerald-200/30 text-xs text-center">
          © {new Date().getFullYear()} Círculo Verde. Todos os direitos reservados.
        </p>
      </div>
    </footer>
  );
}
```

**Step 3: Commit**

```bash
git add components/
git commit -m "feat: add Navbar and Footer components"
```

---

### Task 7: API Routes — Chamados e Newsletter

**Files:**
- Create: `app/api/chamados/route.ts`
- Create: `app/api/newsletter/route.ts`

**Step 1: Criar `app/api/chamados/route.ts`**

```typescript
import { createClient } from "@/lib/supabase/server";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  const body = await request.json();
  const { nome_produtor, localidade, tipo, descricao } = body;

  if (!nome_produtor || !localidade || !tipo) {
    return NextResponse.json(
      { error: "Campos obrigatórios não preenchidos." },
      { status: 400 }
    );
  }

  const supabase = await createClient();

  const { error } = await supabase.from("chamados").insert({
    nome_produtor,
    localidade,
    tipo,
    descricao,
  });

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true }, { status: 201 });
}
```

**Step 2: Criar `app/api/newsletter/route.ts`**

```typescript
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
```

**Step 3: Commit**

```bash
git add app/api/
git commit -m "feat: add API routes for chamados and newsletter"
```

---

### Task 8: Componentes de formulário (Client Components)

**Files:**
- Create: `components/ChamadoForm.tsx`
- Create: `components/NewsletterForm.tsx`

**Step 1: Criar `components/ChamadoForm.tsx`**

```typescript
"use client";

import { useState } from "react";

type TipoChamado = "preventiva" | "emergencial";

export default function ChamadoForm() {
  const [tipo, setTipo] = useState<TipoChamado>("preventiva");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const formData = new FormData(e.currentTarget);
    const payload = {
      nome_produtor: formData.get("nome_produtor") as string,
      localidade: formData.get("localidade") as string,
      tipo,
      descricao: formData.get("descricao") as string,
    };

    const res = await fetch("/api/chamados", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(payload),
    });

    setLoading(false);

    if (res.ok) {
      setSuccess(true);
      (e.target as HTMLFormElement).reset();
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao enviar. Tente novamente.");
    }
  }

  if (success) {
    return (
      <div className="bg-white p-12 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,34,3,0.12)] border border-outline-variant/5 flex flex-col items-center justify-center gap-6 min-h-[400px]">
        <span className="material-symbols-outlined text-secondary text-6xl" style={{ fontVariationSettings: "'FILL' 1" }}>
          check_circle
        </span>
        <h3 className="text-2xl font-headline font-bold text-primary">Solicitação Enviada!</h3>
        <p className="text-on-surface-variant text-center">
          Nossa equipe entrará em contato em até{" "}
          <span className="text-secondary font-bold">15 minutos</span>.
        </p>
        <button
          onClick={() => setSuccess(false)}
          className="text-primary font-bold text-sm underline"
        >
          Enviar outro chamado
        </button>
      </div>
    );
  }

  return (
    <div className="bg-white p-12 rounded-3xl shadow-[0_32px_64px_-16px_rgba(0,34,3,0.12)] border border-outline-variant/5">
      <div className="flex items-center justify-between mb-10">
        <h2 className="text-3xl font-headline font-bold text-primary">
          Chamado Técnico
        </h2>
        <div className="flex gap-2">
          <div className="w-8 h-1.5 rounded-full bg-primary"></div>
          <div className="w-8 h-1.5 rounded-full bg-surface-container-highest"></div>
          <div className="w-8 h-1.5 rounded-full bg-surface-container-highest"></div>
        </div>
      </div>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="floating-label-group">
            <input
              name="nome_produtor"
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors"
              id="name"
              placeholder=" "
              type="text"
              required
            />
            <label className="text-sm font-medium text-on-surface-variant" htmlFor="name">
              Nome do Produtor
            </label>
          </div>
          <div className="floating-label-group">
            <input
              name="localidade"
              className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors"
              id="farm"
              placeholder=" "
              type="text"
              required
            />
            <label className="text-sm font-medium text-on-surface-variant" htmlFor="farm">
              Localidade / Fazenda
            </label>
          </div>
        </div>
        <div className="space-y-2">
          <label className="text-xs font-bold text-primary uppercase tracking-widest ml-1">
            Tipo de Chamado
          </label>
          <div className="grid grid-cols-2 gap-3">
            <button
              type="button"
              onClick={() => setTipo("preventiva")}
              className={`border-2 text-xs font-bold py-3 rounded-xl transition-colors ${
                tipo === "preventiva"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-surface-container-highest text-on-surface-variant hover:border-primary/50"
              }`}
            >
              Preventiva
            </button>
            <button
              type="button"
              onClick={() => setTipo("emergencial")}
              className={`border-2 text-xs font-bold py-3 rounded-xl transition-colors ${
                tipo === "emergencial"
                  ? "border-primary bg-primary/5 text-primary"
                  : "border-surface-container-highest text-on-surface-variant hover:border-primary/50"
              }`}
            >
              Emergencial
            </button>
          </div>
        </div>
        <div className="floating-label-group">
          <textarea
            name="descricao"
            className="w-full bg-transparent border-b-2 border-surface-container-highest focus:border-primary focus:ring-0 text-sm py-3 px-1 transition-colors resize-none"
            id="message"
            placeholder=" "
            rows={3}
          />
          <label className="text-sm font-medium text-on-surface-variant" htmlFor="message">
            Descrição da Ocorrência
          </label>
        </div>
        {error && (
          <p className="text-error text-sm text-center">{error}</p>
        )}
        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary text-on-primary py-5 rounded-2xl font-bold text-base hover:shadow-2xl transition-all active:scale-[0.98] pulse-primary flex items-center justify-center gap-3 disabled:opacity-60"
        >
          <span className="material-symbols-outlined">bolt</span>
          {loading ? "Enviando..." : "Enviar Solicitação Urgente"}
        </button>
        <p className="text-center text-[10px] text-on-surface-variant font-medium">
          Tempo médio de resposta:{" "}
          <span className="text-secondary">15 minutos</span>
        </p>
      </form>
    </div>
  );
}
```

**Step 2: Criar `components/NewsletterForm.tsx`**

```typescript
"use client";

import { useState } from "react";

export default function NewsletterForm() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [done, setDone] = useState(false);
  const [error, setError] = useState("");

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const res = await fetch("/api/newsletter", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email }),
    });

    setLoading(false);

    if (res.ok) {
      setDone(true);
    } else {
      const data = await res.json();
      setError(data.error || "Erro ao cadastrar.");
    }
  }

  if (done) {
    return (
      <p className="text-emerald-400 text-sm font-bold">
        ✓ Cadastrado com sucesso!
      </p>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <div className="flex gap-2">
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          className="bg-white/5 border-none rounded-xl text-xs w-full focus:ring-1 focus:ring-emerald-400 py-3 px-4 text-emerald-50 placeholder:text-emerald-200/40"
          placeholder="Seu e-mail corporativo"
          required
        />
        <button
          type="submit"
          disabled={loading}
          className="bg-emerald-400 text-emerald-950 px-4 rounded-xl hover:bg-emerald-300 transition-colors flex items-center justify-center disabled:opacity-60"
        >
          <span className="material-symbols-outlined text-sm">send</span>
        </button>
      </div>
      {error && <p className="text-red-400 text-xs mt-2">{error}</p>}
    </form>
  );
}
```

**Step 3: Commit**

```bash
git add components/
git commit -m "feat: add ChamadoForm and NewsletterForm client components with API integration"
```

---

### Task 9: Página principal `app/(site)/page.tsx`

**Files:**
- Create: `app/(site)/page.tsx`
- Delete: (manter code.html como referência por enquanto)

**Step 1: Criar `app/(site)/page.tsx`**

Migrar o HTML de `code.html` para JSX React. A página é um Server Component. Substituir:
- `class` → `className`
- `<img>` → `<Image>` do `next/image` (ou manter `<img>` com `alt` para externas)
- Seção de chamado técnico: usar `<ChamadoForm />`
- Botão "Ver Catálogo Digital": usar `<Link href="/catalogo">`
- Footer: usar `<Footer />`
- Navbar: usar `<Navbar />`

```typescript
import Link from "next/link";
import Image from "next/image";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ChamadoForm from "@/components/ChamadoForm";

export default function HomePage() {
  return (
    <>
      <Navbar />
      <main className="pt-24 pb-20">
        {/* Hero */}
        <header className="max-w-7xl mx-auto px-8 mb-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div>
              <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-6">
                <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
                Tecnologia KREBS
              </span>
              <h1 className="text-5xl lg:text-7xl font-headline font-extrabold text-primary tracking-tight leading-tight mb-6">
                Inteligência em <br />
                <span className="text-secondary">Irrigação.</span>
              </h1>
              <p className="text-lg text-on-surface-variant max-w-md leading-relaxed mb-8">
                Elevando a produtividade do agronegócio com engenharia de
                precisão e suporte técnico ininterrupto.
              </p>
              <div className="flex items-center gap-6">
                <div className="text-sm font-semibold text-primary">
                  Aprovado por líderes do setor
                </div>
              </div>
            </div>
            <div className="relative group">
              <div className="aspect-[4/3] rounded-3xl overflow-hidden shadow-2xl relative">
                <img
                  className="w-full h-full object-cover transition-transform duration-1000 group-hover:scale-110"
                  src="https://lh3.googleusercontent.com/aida-public/AB6AXuCvgLwmP_h7RmYjYCWz65fi1T7BwdZrm0MnirFZbKW3Xl5yARg0WSNFSq7N7lLHlBVIa8tMMTiyHRxko5pbgfPrlmJMDBXlR1G3_fAOpTBKKhCqpIugk-gyOw_hvb9qxi4Xh-47ZWX06YTdS0BQkjAr3qxFg2ZnXNf7zUWxl2hXuBr7lQ2oy_f8mGOz9Yt0Wi1U4unWrhrfx3qpXF2fRKr1ys_uXvlFwPMGRba6N6YqO8OW4CpEkmLKMyLKF9qWwq6qLZ6IAK-5ywc"
                  alt="Vista aérea de sistema de irrigação por pivô central"
                />
                <div className="absolute inset-0 bg-gradient-to-tr from-primary/40 to-transparent"></div>
              </div>
              <div className="absolute -top-6 -right-6 glass-effect bg-white/80 p-5 rounded-2xl shadow-xl border border-white/50 animate-bounce duration-[3000ms]">
                <div className="flex flex-col items-center gap-1">
                  <span
                    className="material-symbols-outlined text-secondary text-3xl"
                    style={{ fontVariationSettings: "'FILL' 1" }}
                  >
                    workspace_premium
                  </span>
                  <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">
                    Excellence
                  </span>
                  <span className="text-[9px] font-bold text-on-surface-variant">
                    Award 2024
                  </span>
                </div>
              </div>
              <div className="absolute -bottom-8 -left-8 glass-effect bg-white/70 p-8 rounded-2xl shadow-2xl max-w-xs border border-white/40">
                <div className="flex items-center gap-4 mb-3">
                  <div className="w-10 h-10 rounded-full bg-secondary/10 flex items-center justify-center">
                    <span
                      className="material-symbols-outlined text-secondary"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      precision_manufacturing
                    </span>
                  </div>
                  <span className="text-sm font-bold text-primary font-headline uppercase tracking-tighter">
                    Performance Monitorada
                  </span>
                </div>
                <p className="text-xs text-on-surface-variant leading-relaxed">
                  Sensores integrados KREBS permitem monitoramento 24/7 de vazão
                  e pressão em tempo real.
                </p>
              </div>
            </div>
          </div>
        </header>

        {/* Seção Pivôs KREBS */}
        <section id="produtos" className="bg-surface-container-low py-24 mb-24 relative overflow-hidden">
          <div className="absolute top-0 right-0 w-1/3 h-full bg-primary/5 -skew-x-12 transform origin-top translate-x-32"></div>
          <div className="max-w-7xl mx-auto px-8 relative z-10">
            <div className="max-w-3xl mb-16">
              <h2 className="text-4xl font-headline font-extrabold text-primary mb-6">
                Venda de Pivôs KREBS
              </h2>
              <p className="text-on-surface-variant text-lg leading-relaxed">
                Referência mundial em durabilidade e precisão. Nossos sistemas
                são projetados para resistir às condições mais severas do campo
                brasileiro com o menor custo operacional do mercado.
              </p>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
              <div className="lg:col-span-7 bg-white rounded-3xl overflow-hidden shadow-xl border border-outline-variant/10 group">
                <div className="relative h-96 overflow-hidden">
                  <img
                    alt="KREBS Pivot Central"
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    src="https://lh3.googleusercontent.com/aida-public/AB6AXuBozTSxcm7P-hpUqPsrl0sHimnI5ZMOIV1NTfyl90x__5ypRAZTUQl0fs50Hbm2AkzQONlrLO1HTjZq-VW30_7E_gLgEpLQqd2giX8p-G2HUk0xqxoEILUSMuskp5HTB16YZ5ZtNE8bQfIYL1RimuMGsy3HbatUUTacmNYUlXMsFdjN1kuOFtwnrnfILbJXJov7c6SuWQMRM5aHuNpOVUNFlXEkjrIOD-ivlOUySNygyZXw7wUDxJQddnmx-3ZVbDZzbkr9cAJqgKs"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-transparent"></div>
                  <div className="absolute bottom-8 left-8 right-8">
                    <h3 className="text-3xl font-bold text-white mb-2">
                      KREBS Pivot Central
                    </h3>
                    <p className="text-white/80 text-sm max-w-lg">
                      Engenharia alemã adaptada à realidade tropical brasileira,
                      garantindo uniformidade hídrica total.
                    </p>
                  </div>
                </div>
                <div className="p-8 grid grid-cols-1 md:grid-cols-3 gap-6 bg-surface-container-lowest">
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Material</div>
                    <div className="text-sm font-bold text-primary">Aço Galvanizado a Fogo</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Controle</div>
                    <div className="text-sm font-bold text-primary">Rede 4G / LoRa Smart</div>
                  </div>
                  <div className="space-y-1">
                    <div className="text-[10px] font-bold text-secondary uppercase tracking-widest">Alcance</div>
                    <div className="text-sm font-bold text-primary">Até 1.000m de raio</div>
                  </div>
                </div>
                <div className="px-8 pb-8 flex flex-wrap gap-4">
                  <button className="bg-primary text-on-primary px-6 py-3 rounded-xl font-bold text-sm hover:opacity-90 transition-all flex items-center gap-2">
                    <span className="material-symbols-outlined text-sm">download</span>
                    Download Technical Datasheet (PDF)
                  </button>
                  <button className="border-2 border-primary text-primary px-6 py-3 rounded-xl font-bold text-sm hover:bg-primary/5 transition-all">
                    Solicitar Orçamento
                  </button>
                </div>
              </div>
              <div className="lg:col-span-5 flex flex-col gap-6">
                <div className="bg-primary p-8 rounded-3xl shadow-lg relative overflow-hidden">
                  <div className="text-on-primary/60 text-[10px] font-bold tracking-[0.2em] uppercase mb-4">Garantia KREBS</div>
                  <div className="text-5xl font-black text-secondary-container mb-4">10 Anos</div>
                  <p className="text-on-primary/70 text-sm leading-relaxed mb-6">Cobertura estrutural líder do setor contra corrosão e fadiga de material.</p>
                  <div className="flex items-center gap-2 text-on-primary text-xs font-bold">
                    <span className="material-symbols-outlined text-secondary-container">shield</span>
                    Certificação de Qualidade ISO 9001
                  </div>
                </div>
                <div className="bg-white p-8 rounded-3xl shadow-sm border border-outline-variant/10 flex-1">
                  <h4 className="text-lg font-bold text-primary mb-6 flex items-center gap-2">
                    <span className="material-symbols-outlined text-secondary">insights</span>
                    Vantagem Competitiva
                  </h4>
                  <div className="space-y-5">
                    {[
                      { label: "Economia de Energia", value: "+22%", pct: "85%" },
                      { label: "Eficiência Hídrica", value: "+18%", pct: "92%" },
                      { label: "Vida Útil Estimada", value: "25+ Anos", pct: "98%" },
                    ].map((item) => (
                      <div key={item.label}>
                        <div className="flex items-center justify-between mb-1">
                          <span className="text-sm font-medium text-on-surface-variant">{item.label}</span>
                          <span className="text-xs font-bold text-secondary">{item.value}</span>
                        </div>
                        <div className="w-full h-1.5 bg-surface-container rounded-full overflow-hidden">
                          <div className="h-full bg-secondary rounded-full" style={{ width: item.pct }}></div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Seção Chamado Técnico */}
        <section id="chamado" className="max-w-7xl mx-auto px-8 mb-32">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-start">
            <div className="order-2 lg:order-1">
              <ChamadoForm />
            </div>
            <div className="order-1 lg:order-2 space-y-10 lg:sticky lg:top-32">
              <div className="space-y-6">
                <h2 className="text-5xl font-headline font-extrabold text-primary leading-tight">
                  Suporte que não para.
                </h2>
                <p className="text-on-surface-variant text-xl leading-relaxed">
                  Entendemos que no agronegócio o tempo é o recurso mais valioso.
                  Nossa equipe móvel está posicionada estrategicamente para
                  atender sua fazenda em tempo recorde.
                </p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                <div className="p-8 bg-white rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>speed</span>
                  </div>
                  <div className="font-bold text-primary text-lg mb-2">Atendimento 24h</div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Plantão técnico especializado para emergências 7 dias por semana.
                  </p>
                </div>
                <div className="p-8 bg-white rounded-3xl border border-outline-variant/10 shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-14 h-14 rounded-2xl bg-secondary/10 flex items-center justify-center text-secondary mb-6">
                    <span className="material-symbols-outlined text-3xl" style={{ fontVariationSettings: "'FILL' 1" }}>local_shipping</span>
                  </div>
                  <div className="font-bold text-primary text-lg mb-2">Logística Ágil</div>
                  <p className="text-sm text-on-surface-variant leading-relaxed">
                    Frota própria rastreada com laboratórios móveis para reparos em campo.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Peças de Reposição */}
        <section className="max-w-7xl mx-auto px-8 mb-32">
          <div className="flex flex-col md:flex-row justify-between items-end mb-16 gap-8">
            <div className="max-w-2xl">
              <h2 className="text-4xl font-headline font-extrabold text-primary mb-4">
                Peças de Reposição
              </h2>
              <p className="text-on-surface-variant text-lg">
                Catálogo completo de componentes originais testados sob rigorosos
                padrões de qualidade.
              </p>
            </div>
            <Link
              href="/catalogo"
              className="group flex items-center gap-3 text-primary font-bold hover:text-secondary transition-colors"
            >
              Ver Catálogo Digital
              <span className="w-10 h-10 rounded-full border-2 border-primary flex items-center justify-center group-hover:bg-primary group-hover:text-white transition-all">
                <span className="material-symbols-outlined text-sm">arrow_forward</span>
              </span>
            </Link>
          </div>
          {/* Preview 3 produtos */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              { sku: "K-992-01", nome: "Moto-redutor High-Torque", badge: "KREBS Original", icone: "settings" },
              { sku: "IW-044", nome: "Aspersores de Precisão", badge: "Componente i-Wob", icone: "opacity" },
              { sku: "SM-LORA-X", nome: "Módulos de Controle 4G", badge: "Smart Tech", icone: "developer_board" },
            ].map((produto) => (
              <div
                key={produto.sku}
                className="group relative bg-white rounded-3xl border border-outline-variant/10 overflow-hidden hover:shadow-2xl transition-all duration-500 p-8"
              >
                <div className="flex justify-between items-start mb-6">
                  <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
                    {produto.badge}
                  </span>
                  <span className="text-on-surface-variant text-[10px] font-medium">SKU: {produto.sku}</span>
                </div>
                <h3 className="text-xl font-bold text-primary mb-4">{produto.nome}</h3>
                <div className="relative h-56 w-full mb-6 flex items-center justify-center bg-surface-container-low rounded-2xl overflow-hidden">
                  <span className="material-symbols-outlined text-primary/20 text-9xl group-hover:scale-110 transition-transform duration-700">
                    {produto.icone}
                  </span>
                </div>
                <Link
                  href={`/catalogo`}
                  className="w-full block text-center bg-primary/5 text-primary font-bold py-3 rounded-xl text-sm hover:bg-primary hover:text-white transition-all"
                >
                  Ver no Catálogo
                </Link>
              </div>
            ))}
          </div>
        </section>

        {/* Stats Pulse */}
        <section className="max-w-7xl mx-auto px-8 mb-24">
          <div className="bg-primary p-16 rounded-3xl relative overflow-hidden flex flex-col md:flex-row items-center justify-around gap-12 text-center shadow-2xl">
            {[
              { valor: "1.2k+", label: "Pivôs Ativos" },
              { valor: "98%", label: "Uptime Sistêmico" },
              { valor: "24/7", label: "Rede de Monitoramento" },
            ].map((stat, i) => (
              <div key={i} className="relative z-10">
                <div className="flex justify-center items-center gap-3 mb-3">
                  <div className="w-3 h-3 rounded-full bg-secondary-fixed animate-ping"></div>
                  <div className="text-5xl font-headline font-black text-on-tertiary">{stat.valor}</div>
                </div>
                <div className="text-[10px] font-black text-secondary-container uppercase tracking-[0.3em]">{stat.label}</div>
              </div>
            ))}
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
```

**Step 2: Verificar no browser**

```bash
npm run dev
```

Acessar `http://localhost:3000` e verificar que a página principal renderiza corretamente.

**Step 3: Commit**

```bash
git add app/
git commit -m "feat: migrate main page from HTML to Next.js with functional form and catalog link"
```

---

### Task 10: Página do Catálogo Digital

**Files:**
- Create: `app/(site)/catalogo/page.tsx`
- Create: `components/CatalogoProdutoModal.tsx`
- Create: `components/CatalogoGrid.tsx`

**Step 1: Criar `components/CatalogoGrid.tsx` (Client Component — para filtros interativos)**

```typescript
"use client";

import { useState } from "react";
import Image from "next/image";
import { Catalogo, Produto, Categoria } from "@/lib/types";
import CatalogoProdutoModal from "./CatalogoProdutoModal";

interface Props {
  catalogo: Catalogo;
  categoriaInicial?: string;
}

export default function CatalogoGrid({ catalogo, categoriaInicial }: Props) {
  const [categoriaAtiva, setCategoriaAtiva] = useState(
    categoriaInicial || "todos"
  );
  const [busca, setBusca] = useState("");
  const [produtoSelecionado, setProdutoSelecionado] = useState<Produto | null>(null);

  const todasCategorias: Categoria[] = catalogo.categorias;

  const produtosFiltrados = todasCategorias
    .filter((c) => categoriaAtiva === "todos" || c.id === categoriaAtiva)
    .flatMap((c) =>
      c.produtos.map((p) => ({ ...p, categoriaNome: c.nome }))
    )
    .filter(
      (p) =>
        p.nome.toLowerCase().includes(busca.toLowerCase()) ||
        p.sku.toLowerCase().includes(busca.toLowerCase())
    );

  return (
    <>
      <div className="flex flex-col lg:flex-row gap-10">
        {/* Sidebar */}
        <aside className="w-full lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl p-6 border border-outline-variant/10 shadow-sm sticky top-28">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              Categorias
            </h3>
            <ul className="space-y-1">
              <li>
                <button
                  onClick={() => setCategoriaAtiva("todos")}
                  className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
                    categoriaAtiva === "todos"
                      ? "bg-primary text-on-primary"
                      : "text-on-surface-variant hover:bg-surface-container-low"
                  }`}
                >
                  Todos os produtos
                </button>
              </li>
              {todasCategorias.map((cat) => (
                <li key={cat.id}>
                  <button
                    onClick={() => setCategoriaAtiva(cat.id)}
                    className={`w-full text-left px-4 py-3 rounded-xl text-sm font-medium transition-colors flex items-center gap-3 ${
                      categoriaAtiva === cat.id
                        ? "bg-primary text-on-primary"
                        : "text-on-surface-variant hover:bg-surface-container-low"
                    }`}
                  >
                    <span className="material-symbols-outlined text-[18px]">
                      {cat.icone}
                    </span>
                    {cat.nome}
                  </button>
                </li>
              ))}
            </ul>
          </div>
        </aside>

        {/* Main */}
        <div className="flex-1">
          {/* Search */}
          <div className="relative mb-8">
            <span className="material-symbols-outlined absolute left-4 top-1/2 -translate-y-1/2 text-on-surface-variant text-[20px]">
              search
            </span>
            <input
              type="text"
              value={busca}
              onChange={(e) => setBusca(e.target.value)}
              placeholder="Buscar por nome ou SKU..."
              className="w-full pl-12 pr-4 py-4 rounded-2xl bg-white border border-outline-variant/20 focus:border-primary focus:ring-0 text-sm"
            />
          </div>

          {/* Count */}
          <p className="text-sm text-on-surface-variant mb-6">
            <span className="font-bold text-primary">{produtosFiltrados.length}</span> produto(s) encontrado(s)
          </p>

          {/* Grid */}
          {produtosFiltrados.length === 0 ? (
            <div className="text-center py-24 text-on-surface-variant">
              <span className="material-symbols-outlined text-6xl mb-4 block">inventory_2</span>
              <p className="font-medium">Nenhum produto encontrado.</p>
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
              {produtosFiltrados.map((produto) => (
                <button
                  key={produto.sku}
                  onClick={() => setProdutoSelecionado(produto)}
                  className="group text-left bg-white rounded-3xl border border-outline-variant/10 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-1"
                >
                  <div className="relative h-48 bg-surface-container-low flex items-center justify-center overflow-hidden">
                    {produto.imagem ? (
                      <img
                        src={produto.imagem}
                        alt={produto.nome}
                        className="max-w-[80%] max-h-[80%] object-contain group-hover:scale-105 transition-transform duration-500"
                      />
                    ) : (
                      <span className="material-symbols-outlined text-primary/20 text-8xl">
                        inventory_2
                      </span>
                    )}
                  </div>
                  <div className="p-6">
                    <div className="flex justify-between items-start mb-3">
                      <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-2 py-0.5 rounded-full">
                        {produto.badge}
                      </span>
                      <span className="text-[10px] text-on-surface-variant">
                        {produto.sku}
                      </span>
                    </div>
                    <h3 className="font-bold text-primary mb-2">{produto.nome}</h3>
                    <p className="text-xs text-on-surface-variant line-clamp-2 mb-4">
                      {produto.descricao}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-bold text-secondary">
                        {produto.disponibilidade}
                      </span>
                      <span className="text-xs text-primary font-bold flex items-center gap-1">
                        Ver detalhes
                        <span className="material-symbols-outlined text-[14px]">arrow_forward</span>
                      </span>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>
      </div>

      {produtoSelecionado && (
        <CatalogoProdutoModal
          produto={produtoSelecionado}
          onClose={() => setProdutoSelecionado(null)}
        />
      )}
    </>
  );
}
```

**Step 2: Criar `components/CatalogoProdutoModal.tsx`**

```typescript
"use client";

import { useEffect } from "react";
import { Produto } from "@/lib/types";

interface Props {
  produto: Produto;
  onClose: () => void;
}

export default function CatalogoProdutoModal({ produto, onClose }: Props) {
  useEffect(() => {
    const handleKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    document.addEventListener("keydown", handleKey);
    document.body.style.overflow = "hidden";
    return () => {
      document.removeEventListener("keydown", handleKey);
      document.body.style.overflow = "";
    };
  }, [onClose]);

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
      <div
        className="relative bg-white rounded-3xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        <div className="relative h-64 bg-surface-container-low flex items-center justify-center rounded-t-3xl overflow-hidden">
          {produto.imagem ? (
            <img
              src={produto.imagem}
              alt={produto.nome}
              className="max-w-[70%] max-h-[70%] object-contain"
            />
          ) : (
            <span className="material-symbols-outlined text-primary/20 text-9xl">
              inventory_2
            </span>
          )}
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-10 h-10 rounded-full bg-white/80 flex items-center justify-center hover:bg-white transition-colors"
          >
            <span className="material-symbols-outlined">close</span>
          </button>
        </div>
        <div className="p-8">
          <div className="flex justify-between items-start mb-4">
            <span className="text-[10px] font-black text-secondary uppercase tracking-widest bg-secondary/10 px-3 py-1 rounded-full">
              {produto.badge}
            </span>
            <span className="text-xs text-on-surface-variant">SKU: {produto.sku}</span>
          </div>
          <h2 className="text-2xl font-headline font-bold text-primary mb-3">
            {produto.nome}
          </h2>
          <p className="text-on-surface-variant leading-relaxed mb-8">
            {produto.descricao}
          </p>
          <div className="mb-8">
            <h3 className="text-xs font-bold text-primary uppercase tracking-widest mb-4">
              Especificações
            </h3>
            <ul className="space-y-3">
              {produto.especificacoes.map((spec) => (
                <li key={spec} className="flex items-center gap-3 text-sm text-on-surface-variant">
                  <span className="material-symbols-outlined text-secondary text-[18px]" style={{ fontVariationSettings: "'FILL' 1" }}>
                    check_circle
                  </span>
                  {spec}
                </li>
              ))}
            </ul>
          </div>
          <div className="flex gap-4">
            <button className="flex-1 bg-primary text-on-primary py-4 rounded-2xl font-bold hover:opacity-90 transition-all">
              Solicitar Cotação
            </button>
            <button
              onClick={onClose}
              className="px-6 border-2 border-outline-variant rounded-2xl font-bold text-on-surface-variant hover:border-primary hover:text-primary transition-all"
            >
              Fechar
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
```

**Step 3: Criar `app/(site)/catalogo/page.tsx`**

```typescript
import { Suspense } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import CatalogoGrid from "@/components/CatalogoGrid";
import catalogoData from "@/data/catalogo.json";
import { Catalogo } from "@/lib/types";

export const metadata = {
  title: "Catálogo Digital | Círculo Verde",
  description: "Catálogo completo de produtos e peças de reposição KREBS.",
};

interface Props {
  searchParams: Promise<{ categoria?: string }>;
}

export default async function CatalogoPage({ searchParams }: Props) {
  const params = await searchParams;
  const catalogo = catalogoData as Catalogo;

  return (
    <>
      <Navbar />
      <main className="pt-28 pb-20">
        <div className="max-w-7xl mx-auto px-8">
          <div className="mb-12">
            <span className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-secondary-container text-on-secondary-container text-xs font-bold tracking-widest uppercase mb-4">
              <span className="w-2 h-2 rounded-full bg-secondary animate-pulse"></span>
              Catálogo Digital
            </span>
            <h1 className="text-4xl lg:text-5xl font-headline font-extrabold text-primary mb-4">
              Peças & Produtos KREBS
            </h1>
            <p className="text-on-surface-variant text-lg max-w-2xl">
              Componentes originais testados sob rigorosos padrões de qualidade.
              Clique em qualquer produto para ver especificações completas.
            </p>
          </div>
          <Suspense fallback={<div className="text-center py-24">Carregando...</div>}>
            <CatalogoGrid
              catalogo={catalogo}
              categoriaInicial={params.categoria}
            />
          </Suspense>
        </div>
      </main>
      <Footer />
    </>
  );
}
```

**Step 4: Verificar no browser**

Acessar `http://localhost:3000/catalogo` e verificar filtros, busca e modal funcionando.

**Step 5: Commit**

```bash
git add app/ components/
git commit -m "feat: add digital catalog page with category filters, search, and product modal"
```

---

### Task 11: Admin — Login e Layout

**Files:**
- Create: `app/admin/layout.tsx`
- Create: `app/admin/login/page.tsx`
- Create: `components/admin/AdminSidebar.tsx`

**Step 1: Criar `app/admin/layout.tsx`**

```typescript
import { createClient } from "@/lib/supabase/server";
import { redirect } from "next/navigation";
import AdminSidebar from "@/components/admin/AdminSidebar";

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  // Middleware já protege, mas dupla verificação
  if (!user) redirect("/admin/login");

  return (
    <div className="flex min-h-screen bg-gray-950">
      <AdminSidebar />
      <main className="flex-1 ml-64 p-8">{children}</main>
    </div>
  );
}
```

**Step 2: Criar `app/admin/login/page.tsx`**

```typescript
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

export default function AdminLoginPage() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    setLoading(true);
    setError("");

    const supabase = createClient();
    const { error } = await supabase.auth.signInWithPassword({ email, password });

    setLoading(false);

    if (error) {
      setError("Email ou senha incorretos.");
    } else {
      router.push("/admin/dashboard");
      router.refresh();
    }
  }

  return (
    <div className="min-h-screen bg-gray-950 flex items-center justify-center p-4">
      <div className="bg-gray-900 rounded-3xl p-10 w-full max-w-md border border-gray-800">
        <div className="mb-8 text-center">
          <h1 className="text-2xl font-black text-white tracking-tighter">Círculo Verde</h1>
          <p className="text-gray-400 text-sm mt-1">Painel Administrativo</p>
        </div>
        <form onSubmit={handleSubmit} className="space-y-4">
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500"
            required
          />
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Senha"
            className="w-full bg-gray-800 border-none rounded-xl py-4 px-4 text-white text-sm focus:ring-1 focus:ring-emerald-500"
            required
          />
          {error && <p className="text-red-400 text-sm">{error}</p>}
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-emerald-600 text-white py-4 rounded-xl font-bold hover:bg-emerald-500 transition-colors disabled:opacity-60"
          >
            {loading ? "Entrando..." : "Entrar"}
          </button>
        </form>
      </div>
    </div>
  );
}
```

**Step 3: Criar `components/admin/AdminSidebar.tsx`**

```typescript
"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";

const navItems = [
  { href: "/admin/dashboard", label: "Dashboard", icon: "dashboard" },
  { href: "/admin/chamados", label: "Chamados", icon: "support_agent" },
  { href: "/admin/catalogo", label: "Catálogo", icon: "inventory_2" },
  { href: "/admin/newsletter", label: "Newsletter", icon: "mail" },
];

export default function AdminSidebar() {
  const pathname = usePathname();
  const router = useRouter();

  async function handleLogout() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/admin/login");
  }

  return (
    <aside className="fixed top-0 left-0 h-full w-64 bg-gray-900 border-r border-gray-800 flex flex-col p-6">
      <div className="mb-10">
        <span className="text-xl font-black text-white tracking-tighter">Círculo Verde</span>
        <p className="text-gray-500 text-xs mt-0.5">Admin</p>
      </div>
      <nav className="flex-1 space-y-1">
        {navItems.map((item) => (
          <Link
            key={item.href}
            href={item.href}
            className={`flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium transition-colors ${
              pathname === item.href
                ? "bg-emerald-600 text-white"
                : "text-gray-400 hover:bg-gray-800 hover:text-white"
            }`}
          >
            <span className="material-symbols-outlined text-[20px]">{item.icon}</span>
            {item.label}
          </Link>
        ))}
      </nav>
      <button
        onClick={handleLogout}
        className="flex items-center gap-3 px-4 py-3 rounded-xl text-sm font-medium text-gray-400 hover:bg-gray-800 hover:text-white transition-colors"
      >
        <span className="material-symbols-outlined text-[20px]">logout</span>
        Sair
      </button>
    </aside>
  );
}
```

**Step 4: Commit**

```bash
git add app/admin/ components/admin/
git commit -m "feat: add admin login page, layout, and sidebar navigation"
```

---

### Task 12: Admin — Dashboard

**Files:**
- Create: `app/admin/dashboard/page.tsx`

**Step 1: Criar `app/admin/dashboard/page.tsx`**

```typescript
import { createClient } from "@/lib/supabase/server";

export default async function DashboardPage() {
  const supabase = await createClient();

  const [
    { count: totalChamados },
    { count: novosChamados },
    { count: totalEmails },
    { data: ultimosChamados },
    { data: topProdutos },
  ] = await Promise.all([
    supabase.from("chamados").select("*", { count: "exact", head: true }),
    supabase.from("chamados").select("*", { count: "exact", head: true }).eq("status", "novo"),
    supabase.from("newsletter").select("*", { count: "exact", head: true }),
    supabase.from("chamados").select("*").order("created_at", { ascending: false }).limit(5),
    supabase.from("produto_views").select("*").order("views", { ascending: false }).limit(5),
  ]);

  const stats = [
    { label: "Total de Chamados", value: totalChamados ?? 0, icon: "support_agent", color: "bg-emerald-600" },
    { label: "Chamados Novos", value: novosChamados ?? 0, icon: "notifications_active", color: "bg-amber-600" },
    { label: "Emails Newsletter", value: totalEmails ?? 0, icon: "mail", color: "bg-blue-600" },
  ];

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Dashboard</h1>
      <p className="text-gray-400 mb-8">Visão geral da plataforma</p>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-10">
        {stats.map((stat) => (
          <div key={stat.label} className="bg-gray-900 rounded-2xl p-6 border border-gray-800">
            <div className={`w-12 h-12 ${stat.color} rounded-xl flex items-center justify-center mb-4`}>
              <span className="material-symbols-outlined text-white">{stat.icon}</span>
            </div>
            <div className="text-3xl font-black text-white mb-1">{stat.value}</div>
            <div className="text-gray-400 text-sm">{stat.label}</div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Últimos chamados */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-white font-bold mb-4">Últimos Chamados</h2>
          {ultimosChamados && ultimosChamados.length > 0 ? (
            <div className="space-y-3">
              {ultimosChamados.map((chamado: any) => (
                <div key={chamado.id} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                  <div>
                    <p className="text-white text-sm font-medium">{chamado.nome_produtor}</p>
                    <p className="text-gray-400 text-xs">{chamado.localidade}</p>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                    chamado.status === "novo" ? "bg-amber-600/20 text-amber-400" :
                    chamado.status === "em_andamento" ? "bg-blue-600/20 text-blue-400" :
                    "bg-emerald-600/20 text-emerald-400"
                  }`}>
                    {chamado.status.replace("_", " ")}
                  </span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Nenhum chamado ainda.</p>
          )}
        </div>

        {/* Produtos mais vistos */}
        <div className="bg-gray-900 rounded-2xl border border-gray-800 p-6">
          <h2 className="text-white font-bold mb-4">Produtos Mais Vistos</h2>
          {topProdutos && topProdutos.length > 0 ? (
            <div className="space-y-3">
              {topProdutos.map((p: any) => (
                <div key={p.produto_sku} className="flex items-center justify-between py-3 border-b border-gray-800 last:border-0">
                  <span className="text-white text-sm font-medium">{p.produto_sku}</span>
                  <span className="text-emerald-400 text-sm font-bold">{p.views} views</span>
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-500 text-sm">Nenhuma visualização ainda.</p>
          )}
        </div>
      </div>
    </div>
  );
}
```

**Step 2: Commit**

```bash
git add app/admin/dashboard/
git commit -m "feat: add admin dashboard with stats and recent activity"
```

---

### Task 13: Admin — Chamados

**Files:**
- Create: `app/admin/chamados/page.tsx`
- Create: `app/admin/chamados/AtualizarStatusButton.tsx`

**Step 1: Criar `app/admin/chamados/AtualizarStatusButton.tsx`**

```typescript
"use client";

import { useState } from "react";
import { createClient } from "@/lib/supabase/client";
import { useRouter } from "next/navigation";
import { StatusChamado } from "@/lib/types";

interface Props {
  chamadoId: string;
  statusAtual: StatusChamado;
}

const statusOptions: StatusChamado[] = ["novo", "em_andamento", "concluido"];

export default function AtualizarStatusButton({ chamadoId, statusAtual }: Props) {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleChange(novoStatus: StatusChamado) {
    setLoading(true);
    const supabase = createClient();
    await supabase
      .from("chamados")
      .update({ status: novoStatus })
      .eq("id", chamadoId);
    setLoading(false);
    router.refresh();
  }

  return (
    <select
      value={statusAtual}
      onChange={(e) => handleChange(e.target.value as StatusChamado)}
      disabled={loading}
      className="bg-gray-800 text-white text-xs rounded-lg px-3 py-2 border border-gray-700 focus:border-emerald-500 focus:ring-0"
    >
      {statusOptions.map((s) => (
        <option key={s} value={s}>
          {s.replace("_", " ")}
        </option>
      ))}
    </select>
  );
}
```

**Step 2: Criar `app/admin/chamados/page.tsx`**

```typescript
import { createClient } from "@/lib/supabase/server";
import { Chamado } from "@/lib/types";
import AtualizarStatusButton from "./AtualizarStatusButton";

export default async function ChamadosPage() {
  const supabase = await createClient();
  const { data: chamados } = await supabase
    .from("chamados")
    .select("*")
    .order("created_at", { ascending: false });

  const statusColor: Record<string, string> = {
    novo: "bg-amber-600/20 text-amber-400",
    em_andamento: "bg-blue-600/20 text-blue-400",
    concluido: "bg-emerald-600/20 text-emerald-400",
  };

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Chamados Técnicos</h1>
      <p className="text-gray-400 mb-8">{chamados?.length ?? 0} chamado(s) no total</p>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Produtor</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Localidade</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Tipo</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Data</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {chamados && chamados.length > 0 ? (
              chamados.map((chamado: Chamado) => (
                <tr key={chamado.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                  <td className="px-6 py-4">
                    <p className="text-white font-medium">{chamado.nome_produtor}</p>
                    {chamado.descricao && (
                      <p className="text-gray-500 text-xs mt-0.5 line-clamp-1">{chamado.descricao}</p>
                    )}
                  </td>
                  <td className="px-6 py-4 text-gray-300">{chamado.localidade}</td>
                  <td className="px-6 py-4">
                    <span className={`text-xs px-2 py-1 rounded-full font-bold ${
                      chamado.tipo === "emergencial"
                        ? "bg-red-600/20 text-red-400"
                        : "bg-blue-600/20 text-blue-400"
                    }`}>
                      {chamado.tipo}
                    </span>
                  </td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(chamado.created_at).toLocaleDateString("pt-BR")}
                  </td>
                  <td className="px-6 py-4">
                    <AtualizarStatusButton
                      chamadoId={chamado.id}
                      statusAtual={chamado.status}
                    />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={5} className="text-center py-12 text-gray-500">
                  Nenhum chamado recebido ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add app/admin/chamados/
git commit -m "feat: add admin chamados page with status management"
```

---

### Task 14: Admin — Catálogo e Newsletter

**Files:**
- Create: `app/admin/catalogo/page.tsx`
- Create: `app/admin/newsletter/page.tsx`

**Step 1: Criar `app/admin/catalogo/page.tsx`**

```typescript
import catalogoData from "@/data/catalogo.json";
import { Catalogo } from "@/lib/types";
import { createClient } from "@/lib/supabase/server";

export default async function AdminCatalogoPage() {
  const supabase = await createClient();
  const catalogo = catalogoData as Catalogo;

  const { data: views } = await supabase
    .from("produto_views")
    .select("*");

  const viewsMap = Object.fromEntries(
    (views ?? []).map((v) => [v.produto_sku, v.views])
  );

  const todosProdutos = catalogo.categorias.flatMap((cat) =>
    cat.produtos.map((p) => ({ ...p, categoria: cat.nome }))
  );

  return (
    <div>
      <h1 className="text-3xl font-black text-white mb-2">Catálogo de Produtos</h1>
      <p className="text-gray-400 mb-8">{todosProdutos.length} produto(s) em {catalogo.categorias.length} categorias</p>

      <div className="bg-gray-800/50 rounded-xl p-4 border border-gray-700 mb-8">
        <p className="text-amber-400 text-sm flex items-center gap-2">
          <span className="material-symbols-outlined text-[18px]">info</span>
          Para adicionar ou editar produtos, edite o arquivo <code className="bg-gray-800 px-2 py-0.5 rounded text-emerald-400">data/catalogo.json</code> e faça um novo deploy.
        </p>
      </div>

      {catalogo.categorias.map((cat) => (
        <div key={cat.id} className="mb-8">
          <h2 className="text-white font-bold text-lg mb-4 flex items-center gap-2">
            <span className="material-symbols-outlined text-emerald-500">{cat.icone}</span>
            {cat.nome}
          </h2>
          <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
            <table className="w-full text-sm">
              <thead>
                <tr className="border-b border-gray-800">
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Produto</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">SKU</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Disponibilidade</th>
                  <th className="text-left px-6 py-3 text-gray-400 font-medium">Views</th>
                </tr>
              </thead>
              <tbody>
                {cat.produtos.map((produto) => (
                  <tr key={produto.sku} className="border-b border-gray-800 last:border-0">
                    <td className="px-6 py-4 text-white font-medium">{produto.nome}</td>
                    <td className="px-6 py-4 text-gray-400 font-mono text-xs">{produto.sku}</td>
                    <td className="px-6 py-4">
                      <span className="text-xs bg-emerald-600/20 text-emerald-400 px-2 py-1 rounded-full">
                        {produto.disponibilidade}
                      </span>
                    </td>
                    <td className="px-6 py-4 text-gray-300">{viewsMap[produto.sku] ?? 0}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      ))}
    </div>
  );
}
```

**Step 2: Criar `app/admin/newsletter/page.tsx`**

```typescript
import { createClient } from "@/lib/supabase/server";
import { NewsletterEmail } from "@/lib/types";

export default async function NewsletterPage() {
  const supabase = await createClient();
  const { data: emails } = await supabase
    .from("newsletter")
    .select("*")
    .order("created_at", { ascending: false });

  const csvContent = emails
    ? ["email,data_cadastro", ...emails.map((e: NewsletterEmail) => `${e.email},${e.created_at}`)].join("\n")
    : "";

  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <div>
          <h1 className="text-3xl font-black text-white mb-2">Newsletter</h1>
          <p className="text-gray-400">{emails?.length ?? 0} email(s) cadastrado(s)</p>
        </div>
        <a
          href={`data:text/csv;charset=utf-8,${encodeURIComponent(csvContent)}`}
          download="newsletter.csv"
          className="flex items-center gap-2 bg-emerald-600 text-white px-4 py-3 rounded-xl text-sm font-bold hover:bg-emerald-500 transition-colors"
        >
          <span className="material-symbols-outlined text-[18px]">download</span>
          Exportar CSV
        </a>
      </div>

      <div className="bg-gray-900 rounded-2xl border border-gray-800 overflow-hidden">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b border-gray-800">
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Email</th>
              <th className="text-left px-6 py-4 text-gray-400 font-medium">Data de Cadastro</th>
            </tr>
          </thead>
          <tbody>
            {emails && emails.length > 0 ? (
              emails.map((email: NewsletterEmail) => (
                <tr key={email.id} className="border-b border-gray-800 last:border-0 hover:bg-gray-800/50">
                  <td className="px-6 py-4 text-white">{email.email}</td>
                  <td className="px-6 py-4 text-gray-400 text-xs">
                    {new Date(email.created_at).toLocaleDateString("pt-BR", {
                      day: "2-digit",
                      month: "2-digit",
                      year: "numeric",
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={2} className="text-center py-12 text-gray-500">
                  Nenhum email cadastrado ainda.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
```

**Step 3: Commit**

```bash
git add app/admin/
git commit -m "feat: add admin catalog viewer and newsletter page with CSV export"
```

---

### Task 15: Configuração final para deploy na Vercel

**Files:**
- Create: `next.config.ts`
- Create: `.env.local.example`
- Update: `.gitignore`

**Step 1: Atualizar `next.config.ts`**

```typescript
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "lh3.googleusercontent.com",
      },
    ],
  },
};

export default nextConfig;
```

**Step 2: Verificar `.gitignore` inclui `.env.local`**

```bash
grep ".env.local" .gitignore
```

Se não aparecer, adicionar manualmente ao `.gitignore`.

**Step 3: Rodar build de verificação**

```bash
npm run build
```

Corrigir quaisquer erros de TypeScript ou build.

**Step 4: Deploy na Vercel**

```bash
npx vercel
```

Ou via GitHub: conectar o repositório no dashboard da Vercel e adicionar as variáveis de ambiente:
- `NEXT_PUBLIC_SUPABASE_URL`
- `NEXT_PUBLIC_SUPABASE_ANON_KEY`
- `SUPABASE_SERVICE_ROLE_KEY`

**Step 5: Commit final**

```bash
git add .
git commit -m "feat: finalize Next.js migration — catalog, admin panel, Supabase integration"
```

---

## Resumo de Rotas

| Rota | Tipo | Descrição |
|---|---|---|
| `/` | Public | Página principal |
| `/catalogo` | Public | Catálogo digital expandido |
| `/catalogo?categoria=pivos` | Public | Catálogo filtrado |
| `/api/chamados` | API | POST — salva chamado no Supabase |
| `/api/newsletter` | API | POST — cadastra email no Supabase |
| `/admin/login` | Public | Login do admin |
| `/admin/dashboard` | Protected | Visão geral e estatísticas |
| `/admin/chamados` | Protected | Gestão de chamados técnicos |
| `/admin/catalogo` | Protected | Visualização do catálogo |
| `/admin/newsletter` | Protected | Emails e exportação CSV |

## Checklist de Variáveis de Ambiente

- [ ] `NEXT_PUBLIC_SUPABASE_URL` — URL do projeto Supabase
- [ ] `NEXT_PUBLIC_SUPABASE_ANON_KEY` — chave anon pública
- [ ] `SUPABASE_SERVICE_ROLE_KEY` — chave service role (apenas server-side)
