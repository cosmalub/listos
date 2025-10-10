-- Make design fields nullable since we store images
-- These fields are not needed on the public page, only images are used

ALTER TABLE public.orders 
  ALTER COLUMN back_design_color DROP NOT NULL,
  ALTER COLUMN back_design_message DROP NOT NULL,
  ALTER COLUMN front_design_mode DROP NOT NULL,
  ALTER COLUMN front_design_style DROP NOT NULL,
  ALTER COLUMN front_design_prompt DROP NOT NULL;

