-- Physical product format: classic QR A6 postcard vs foldable A4 sound card.
-- Existing rows default to 'qr' so the current studio path stays unchanged.

ALTER TABLE public.pre_orders
  ADD COLUMN IF NOT EXISTS product_format text NOT NULL DEFAULT 'qr';

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS product_format text NOT NULL DEFAULT 'qr';

ALTER TABLE public.orders
  ADD COLUMN IF NOT EXISTS inside_left_image_url text,
  ADD COLUMN IF NOT EXISTS inside_right_image_url text,
  ADD COLUMN IF NOT EXISTS outer_back_image_url text,
  ADD COLUMN IF NOT EXISTS print_sheet_image_url text;

COMMENT ON COLUMN public.pre_orders.product_format IS 'Physical card format: qr (A6 postcard with QR) or sound (foldable A4 card with speaker module)';
COMMENT ON COLUMN public.orders.product_format IS 'Physical card format: qr or sound. Copied from pre_orders at save-order.';
COMMENT ON COLUMN public.orders.inside_left_image_url IS 'Sound card: inside-left face (cover art without caption). Null for QR orders.';
COMMENT ON COLUMN public.orders.inside_right_image_url IS 'Sound card: inside-right face (color + personal text, no QR). Null for QR orders.';
COMMENT ON COLUMN public.orders.outer_back_image_url IS 'Sound card: outer-back branding face. Null for QR orders.';
COMMENT ON COLUMN public.orders.print_sheet_image_url IS 'Sound card: A4 landscape 300 DPI print die for ops. Never shown to customers.';
