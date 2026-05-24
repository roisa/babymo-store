-- Baby Mo — Supabase schema
-- Run inside the Supabase SQL editor (or via `supabase db reset`).

-- ============ products ============
create table if not exists public.products (
  id           text primary key,
  name         text not null,
  slug         text unique not null,
  category     text not null,
  price        integer not null,
  description  text not null,
  tagline      text,
  images       jsonb not null default '[]'::jsonb,
  stock        integer not null default 0,
  bestseller   boolean default false,
  featured     boolean default false,
  created_at   timestamptz default now()
);
create index if not exists products_category_idx on public.products (category);
create index if not exists products_featured_idx on public.products (featured);

-- ============ orders ============
do $$ begin
  create type order_status as enum (
    'pending_payment',
    'waiting_verification',
    'paid',
    'packed',
    'shipped',
    'completed',
    'cancelled'
  );
exception when duplicate_object then null; end $$;

do $$ begin
  create type payment_status as enum (
    'pending', 'uploaded', 'verified', 'rejected'
  );
exception when duplicate_object then null; end $$;

create table if not exists public.orders (
  order_id        text primary key,
  customer_name   text not null,
  whatsapp        text not null,
  address         text not null,
  city            text not null,
  postal_code     text not null,
  delivery_notes  text,
  items           jsonb not null,
  subtotal        integer not null,
  unique_code     integer not null,
  total_payment   integer not null,
  payment_status  payment_status not null default 'pending',
  order_status    order_status   not null default 'pending_payment',
  created_at      timestamptz not null default now()
);
create index if not exists orders_status_idx       on public.orders (order_status);
create index if not exists orders_created_at_idx   on public.orders (created_at desc);
create index if not exists orders_whatsapp_idx     on public.orders (whatsapp);

-- ============ payments ============
create table if not exists public.payments (
  order_id        text primary key references public.orders(order_id) on delete cascade,
  proof_image     text,
  payment_status  payment_status not null default 'uploaded',
  verified_at     timestamptz
);

-- ============ row-level security ============
alter table public.products enable row level security;
alter table public.orders   enable row level security;
alter table public.payments enable row level security;

-- Public read for products
drop policy if exists "products are readable" on public.products;
create policy "products are readable"
  on public.products for select using (true);

-- Orders / payments: writes must go through service-role (server-side API routes).
-- Allow an authenticated customer to insert their own order:
drop policy if exists "anyone can create an order" on public.orders;
create policy "anyone can create an order"
  on public.orders for insert with check (true);

drop policy if exists "anyone can upload proof" on public.payments;
create policy "anyone can upload proof"
  on public.payments for insert with check (true);

-- Reads/updates restricted to service role (default).

-- ============ storage bucket for payment proofs (optional) ============
-- Run once in Supabase SQL editor:
--   select storage.create_bucket('payment-proofs', public => false);
