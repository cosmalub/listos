-- 1. Створюємо таблицю pre_orders (передзамовлення)
create table public.pre_orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Контактні дані
  user_email text,
  user_phone text,
  
  -- Дані доставки
  city text,
  nova_poshta text,
  comment text,
  contact_type text,
  
  -- Оплата і доступ
  access_token uuid not null default gen_random_uuid() unique,
  is_paid boolean not null default false,
  
  -- Статус
  status text default 'pending'
);

-- 2. Переносимо дані з orders в pre_orders
insert into public.pre_orders (id, created_at, updated_at, user_email, user_phone, access_token, is_paid, status)
select 
  id,
  created_at,
  updated_at,
  user_email,
  user_phone,
  access_token,
  is_paid,
  case 
    when studio_completed then 'completed'
    when studio_started_at is not null then 'studio_started'
    when is_paid then 'paid'
    else 'pending'
  end as status
from public.orders
where user_email is not null or user_phone is not null;

-- 3. Створюємо бекап старої таблиці orders
create table public.orders_backup as select * from public.orders;

-- 4. Видаляємо стару таблицю orders
drop table public.orders;

-- 5. Створюємо нову таблицю orders (тільки для завершених листівок)
create table public.orders (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  
  -- Зв'язок з передзамовленням
  pre_order_id uuid not null references public.pre_orders(id) on delete cascade,
  
  -- Музика
  lyrics text not null,
  music_variant_id text,
  music_variant_title text,
  music_variant_description text,
  music_variant_style text,
  music_selected boolean default false,
  music_audio_url text,
  
  -- Сторінка
  page_occasion text not null,
  page_recipient text not null,
  page_sender text not null,
  draft_page_url text,
  
  -- Дизайн передньої сторони
  front_design_mode text,
  front_design_style text,
  front_design_caption text,
  front_design_prompt text,
  front_image_url text,
  
  -- Дизайн задньої сторони
  back_design_color text,
  back_design_message text,
  back_image_url text,
  
  -- QR код
  qr_code_url text,
  
  -- Статус студії
  studio_started_at timestamptz,
  studio_completed boolean not null default false,
  studio_completed_at timestamptz
);

-- 6. Переносимо завершені замовлення зі студії в нову таблицю orders
insert into public.orders (
  id, created_at, updated_at, pre_order_id,
  lyrics, music_variant_id, music_variant_title, music_variant_description,
  music_variant_style, music_selected, music_audio_url,
  page_occasion, page_recipient, page_sender, draft_page_url,
  front_design_mode, front_design_style, front_design_caption, front_design_prompt,
  front_image_url, back_design_color, back_design_message, back_image_url,
  qr_code_url, studio_started_at, studio_completed, studio_completed_at
)
select 
  gen_random_uuid(),
  ob.created_at,
  ob.updated_at,
  ob.id as pre_order_id,
  ob.lyrics,
  ob.music_variant_id,
  ob.music_variant_title,
  ob.music_variant_description,
  ob.music_variant_style,
  ob.music_selected,
  ob.music_audio_url,
  ob.page_occasion,
  ob.page_recipient,
  ob.page_sender,
  ob.draft_page_url,
  ob.front_design_mode,
  ob.front_design_style,
  ob.front_design_caption,
  ob.front_design_prompt,
  ob.front_image_url,
  ob.back_design_color,
  ob.back_design_message,
  ob.back_image_url,
  ob.qr_code_url,
  ob.studio_started_at,
  ob.studio_completed,
  ob.studio_completed_at
from public.orders_backup ob
where ob.studio_completed = true 
  and ob.lyrics is not null 
  and ob.lyrics != '';

-- 7. Налаштування RLS для pre_orders
alter table public.pre_orders enable row level security;

create policy "Anyone can insert pre_orders"
  on public.pre_orders for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can view pre_orders"
  on public.pre_orders for select
  to anon, authenticated
  using (true);

create policy "Service role can update pre_orders"
  on public.pre_orders for update
  to service_role
  using (true)
  with check (true);

-- 8. Налаштування RLS для orders
alter table public.orders enable row level security;

create policy "Anyone can insert orders"
  on public.orders for insert
  to anon, authenticated
  with check (true);

create policy "Anyone can view orders"
  on public.orders for select
  to anon, authenticated
  using (true);

create policy "Service role can update orders"
  on public.orders for update
  to service_role
  using (true)
  with check (true);

-- 9. Тригери для автоматичного оновлення updated_at
create trigger on_pre_order_updated
  before update on public.pre_orders
  for each row
  execute function public.update_updated_at_column();

create trigger on_order_updated
  before update on public.orders
  for each row
  execute function public.update_updated_at_column();