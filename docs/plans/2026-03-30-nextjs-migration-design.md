# Design: Migração para Next.js — Círculo Verde

## Visão Geral

Migrar o site estático HTML da Círculo Verde para uma aplicação Next.js completa com catálogo digital expandido, formulário de chamado técnico integrado ao Supabase, e painel administrativo protegido.

**Stack:** Next.js 14 (App Router) + Supabase + Vercel
**Data:** 2026-03-30

---

## Arquitetura

### Estrutura de Pastas

```
circulo-verde/
├── app/
│   ├── (site)/
│   │   ├── page.tsx               # Página principal
│   │   ├── catalogo/
│   │   │   └── page.tsx           # Catálogo digital expandido
│   │   └── layout.tsx
│   ├── admin/
│   │   ├── login/page.tsx
│   │   ├── dashboard/page.tsx
│   │   ├── catalogo/page.tsx
│   │   ├── chamados/page.tsx
│   │   └── newsletter/page.tsx
│   └── api/
│       ├── chamados/route.ts
│       └── newsletter/route.ts
├── data/
│   └── catalogo.json
├── public/
│   └── produtos/
├── lib/
│   ├── supabase/
│   │   ├── client.ts
│   │   └── server.ts
│   └── types.ts
└── middleware.ts
```

### Fluxo de Dados

- Site público lê `catalogo.json` diretamente (sem banco)
- Formulário de chamado → API Route `/api/chamados` → Supabase
- Newsletter → API Route `/api/newsletter` → Supabase
- Admin login → Supabase Auth → dashboard lê Supabase via Server Components
- Middleware protege todas as rotas `/admin/*` exceto `/admin/login`

---

## Banco de Dados (Supabase)

### Tabela `chamados`
| campo | tipo | notas |
|---|---|---|
| id | uuid | PK, gerado automaticamente |
| nome_produtor | text | não nulo |
| localidade | text | não nulo |
| tipo | text | "preventiva" ou "emergencial" |
| descricao | text | |
| status | text | default "novo" |
| created_at | timestamptz | default now() |

### Tabela `newsletter`
| campo | tipo | notas |
|---|---|---|
| id | uuid | PK |
| email | text | único, não nulo |
| created_at | timestamptz | default now() |

### Tabela `produto_views`
| campo | tipo | notas |
|---|---|---|
| produto_sku | text | PK |
| views | integer | default 0 |

---

## Catálogo Digital

### Estrutura do `catalogo.json`
```json
{
  "categorias": [
    {
      "id": "string",
      "nome": "string",
      "icone": "material-symbol-name",
      "produtos": [
        {
          "sku": "string",
          "nome": "string",
          "badge": "string",
          "disponibilidade": "string",
          "imagem": "/produtos/arquivo.jpg",
          "especificacoes": ["string"],
          "descricao": "string"
        }
      ]
    }
  ]
}
```

### Categorias Iniciais
1. Moto-redutores
2. Aspersores de Precisão
3. Módulos de Controle 4G
4. Pivôs Centrais

### Funcionalidades da Página `/catalogo`
- Filtro por categoria (sidebar)
- Busca por nome ou SKU
- Grid de cards com imagem, nome, badge, SKU
- Modal de detalhe ao clicar: especificações + botão "Solicitar Cotação"
- Registro de visualização no Supabase (`produto_views`)

---

## Painel Administrativo

### Autenticação
- Login via Supabase Auth (email + senha)
- Middleware Next.js protege `/admin/*`
- Sessão gerenciada via cookies SSR

### Páginas do Admin

**Dashboard** (`/admin/dashboard`)
- Cards com: total de chamados, chamados novos, emails na newsletter, produtos mais vistos
- Lista dos últimos 5 chamados recebidos

**Catálogo** (`/admin/catalogo`)
- Visualização das categorias e produtos do JSON
- Nota: edição do JSON é feita diretamente no arquivo (fora do admin)

**Chamados** (`/admin/chamados`)
- Tabela paginada com todos os chamados
- Filtro por status (novo, em andamento, concluído)
- Ação para mudar status de cada chamado

**Newsletter** (`/admin/newsletter`)
- Tabela com todos os emails cadastrados
- Contagem total
- Exportar como CSV

---

## Design Visual

- Manter o design system existente (cores, tipografia, componentes do DESIGN.md)
- Tailwind CSS (migrar do CDN para instalação local no Next.js)
- Fontes: Plus Jakarta Sans + Inter via `next/font`
- Material Symbols via link tag no layout
- Painel admin: tema escuro baseado nas cores `primary` e `surface` do design system

---

## Decisões Técnicas

- **Server Components** por padrão; `"use client"` apenas onde necessário (formulários, modais, filtros interativos)
- **Server Actions** para envio de formulários (sem API route extra para o form principal)
- **`next/image`** para todas as imagens de produtos (otimização automática)
- **RLS (Row Level Security)** no Supabase: tabelas leitura pública desabilitada exceto para o admin autenticado
- **Variáveis de ambiente:** `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`
