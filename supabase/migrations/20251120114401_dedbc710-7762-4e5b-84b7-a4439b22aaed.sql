-- Создаем таблицу промокодов
CREATE TABLE promo_codes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  code TEXT UNIQUE NOT NULL,
  pre_order_id UUID REFERENCES pre_orders(id) ON DELETE CASCADE,
  discount_percent INTEGER NOT NULL DEFAULT 25,
  is_used BOOLEAN NOT NULL DEFAULT false,
  used_at TIMESTAMP WITH TIME ZONE,
  used_in_order_id UUID REFERENCES pre_orders(id),
  expires_at TIMESTAMP WITH TIME ZONE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Индексы для оптимизации поиска
CREATE INDEX idx_promo_codes_code ON promo_codes(code);
CREATE INDEX idx_promo_codes_used ON promo_codes(is_used, expires_at);
CREATE INDEX idx_promo_codes_pre_order ON promo_codes(pre_order_id);

-- Включаем RLS
ALTER TABLE promo_codes ENABLE ROW LEVEL SECURITY;

-- Политики RLS
CREATE POLICY "Anyone can read promo codes"
  ON promo_codes FOR SELECT
  USING (true);

CREATE POLICY "Service role can insert promo codes"
  ON promo_codes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Service role can update promo codes"
  ON promo_codes FOR UPDATE
  USING (true);

-- Триггер для обновления updated_at
CREATE TRIGGER update_promo_codes_updated_at
  BEFORE UPDATE ON promo_codes
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();