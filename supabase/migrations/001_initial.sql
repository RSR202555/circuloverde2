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
