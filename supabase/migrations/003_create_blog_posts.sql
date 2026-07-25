-- Migration 003: Criar tabela de matérias do blog (blog_posts)

CREATE TABLE IF NOT EXISTS public.blog_posts (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    slug TEXT UNIQUE NOT NULL,
    titulo TEXT NOT NULL,
    subtitulo TEXT NOT NULL DEFAULT '',
    conteudo TEXT NOT NULL,
    capa_url TEXT NOT NULL DEFAULT '',
    autor TEXT NOT NULL DEFAULT 'Equipe Círculo Verde',
    categoria TEXT NOT NULL DEFAULT 'Agronomia',
    tags TEXT[] DEFAULT '{}',
    status TEXT NOT NULL DEFAULT 'rascunho' CHECK (status IN ('rascunho', 'publicado')),
    destaque BOOLEAN NOT NULL DEFAULT false,
    tempo_leitura TEXT NOT NULL DEFAULT '5 min',
    views INTEGER NOT NULL DEFAULT 0,
    published_at TIMESTAMPTZ DEFAULT NOW(),
    created_at TIMESTAMPTZ DEFAULT NOW(),
    updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- Índices para otimização de busca
CREATE INDEX IF NOT EXISTS idx_blog_posts_slug ON public.blog_posts(slug);
CREATE INDEX IF NOT EXISTS idx_blog_posts_status ON public.blog_posts(status);
CREATE INDEX IF NOT EXISTS idx_blog_posts_categoria ON public.blog_posts(categoria);
CREATE INDEX IF NOT EXISTS idx_blog_posts_destaque ON public.blog_posts(destaque);
CREATE INDEX IF NOT EXISTS idx_blog_posts_published_at ON public.blog_posts(published_at DESC);

-- Habilitar RLS (Row Level Security)
ALTER TABLE public.blog_posts ENABLE ROW LEVEL SECURITY;

-- Política de leitura pública (qualquer um pode ler matérias publicadas)
CREATE POLICY "Leitura pública de matérias publicadas" 
ON public.blog_posts FOR SELECT 
USING (status = 'publicado' OR auth.role() = 'authenticated');

-- Política de gerenciamento para administradores autenticados
CREATE POLICY "Escrita irrestrita para usuários autenticados" 
ON public.blog_posts FOR ALL 
USING (auth.role() = 'authenticated')
WITH CHECK (auth.role() = 'authenticated');
