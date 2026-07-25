-- Adicionar coluna de telefone nos chamados técnicos
alter table public.chamados add column if not exists telefone text;

-- Criar tabela de categorias
create table public.categorias (
  id text primary key,
  nome text not null,
  icone text,
  created_at timestamptz default now() not null
);

-- Criar tabela de produtos (peças)
create table public.produtos (
  sku text primary key,
  nome text not null,
  badge text,
  disponibilidade text,
  imagem text,
  especificacoes text[] default '{}'::text[] not null,
  descricao text,
  categoria_id text references public.categorias(id) on delete cascade,
  created_at timestamptz default now() not null
);

-- RLS: Habilitar Row Level Security nas novas tabelas
alter table public.categorias enable row level security;
alter table public.produtos enable row level security;

-- Políticas para Categorias
create policy "Allow public read on categorias"
  on public.categorias for select using (true);

create policy "Allow authenticated full access on categorias"
  on public.categorias for all to authenticated using (true) with check (true);

-- Políticas para Produtos
create policy "Allow public read on produtos"
  on public.produtos for select using (true);

create policy "Allow authenticated full access on produtos"
  on public.produtos for all to authenticated using (true) with check (true);
