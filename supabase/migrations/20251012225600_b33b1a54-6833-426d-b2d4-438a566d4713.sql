-- Додаємо нові колонки до таблиці orders для контролю доступу
ALTER TABLE orders
  ADD COLUMN IF NOT EXISTS access_token uuid UNIQUE NOT NULL DEFAULT gen_random_uuid(),
  ADD COLUMN IF NOT EXISTS is_paid boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS studio_started_at timestamp with time zone,
  ADD COLUMN IF NOT EXISTS studio_completed boolean NOT NULL DEFAULT false,
  ADD COLUMN IF NOT EXISTS studio_completed_at timestamp with time zone;

-- Додаємо коментарі для зрозумілості
COMMENT ON COLUMN orders.access_token IS 'Унікальний токен для доступу до Studio';
COMMENT ON COLUMN orders.is_paid IS 'Чи оплачено замовлення (встановлюється вручну адміністратором)';
COMMENT ON COLUMN orders.studio_started_at IS 'Коли користувач вперше увійшов до Studio з цим токеном';
COMMENT ON COLUMN orders.studio_completed IS 'Чи завершено створення листівки';
COMMENT ON COLUMN orders.studio_completed_at IS 'Коли завершено створення листівки';

-- Створюємо індекс для швидкого пошуку по токену
CREATE INDEX IF NOT EXISTS idx_orders_access_token ON orders(access_token);

-- Оновлюємо RLS політики
DROP POLICY IF EXISTS "Anyone can insert orders" ON orders;
DROP POLICY IF EXISTS "Anyone can view orders by ID" ON orders;
DROP POLICY IF EXISTS "Service role can update orders" ON orders;

-- Дозволяємо всім створювати нові замовлення
CREATE POLICY "Anyone can insert orders"
  ON orders FOR INSERT
  WITH CHECK (true);

-- Дозволяємо всім читати замовлення (потрібно для перевірки токенів)
CREATE POLICY "Anyone can view orders"
  ON orders FOR SELECT
  USING (true);

-- Дозволяємо edge functions оновлювати замовлення (через service role key)
CREATE POLICY "Service role can update orders"
  ON orders FOR UPDATE
  USING (true)
  WITH CHECK (true);