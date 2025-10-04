-- Create orders table
CREATE TABLE public.orders (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  created_at timestamp with time zone DEFAULT now() NOT NULL,
  updated_at timestamp with time zone DEFAULT now() NOT NULL,
  
  -- Basic data
  lyrics text NOT NULL,
  
  -- Music data
  music_variant_id text,
  music_variant_title text,
  music_variant_description text,
  music_variant_style text,
  music_selected boolean DEFAULT false,
  music_audio_url text,
  
  -- Page data (step 3)
  page_occasion text NOT NULL,
  page_recipient text NOT NULL,
  page_sender text NOT NULL,
  draft_page_url text,
  
  -- Front design data
  front_design_mode text,
  front_design_style text,
  front_design_caption text,
  front_design_prompt text,
  front_image_url text NOT NULL,
  
  -- Back design data
  back_design_color text NOT NULL,
  back_design_message text NOT NULL,
  back_image_url text NOT NULL,
  
  -- QR code
  qr_code_url text,
  
  -- Status and contact
  status text DEFAULT 'pending',
  user_email text,
  user_phone text,
  
  CONSTRAINT orders_status_check CHECK (status IN ('pending', 'approved', 'printing', 'shipped', 'delivered'))
);

-- Trigger for updated_at
CREATE TRIGGER update_orders_updated_at
  BEFORE UPDATE ON public.orders
  FOR EACH ROW
  EXECUTE FUNCTION update_updated_at_column();

-- Enable RLS
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;

-- Anyone can insert orders
CREATE POLICY "Anyone can insert orders"
  ON public.orders FOR INSERT
  TO public
  WITH CHECK (true);

-- Anyone can view their own order by ID (for public song page)
CREATE POLICY "Anyone can view orders by ID"
  ON public.orders FOR SELECT
  TO public
  USING (true);

-- Create storage bucket for postcards
INSERT INTO storage.buckets (id, name, public)
VALUES ('postcards', 'postcards', true);

-- RLS for public access to files
CREATE POLICY "Public can view postcard files"
  ON storage.objects FOR SELECT
  TO public
  USING (bucket_id = 'postcards');

CREATE POLICY "Anyone can upload postcard files"
  ON storage.objects FOR INSERT
  TO public
  WITH CHECK (bucket_id = 'postcards');