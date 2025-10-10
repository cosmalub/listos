-- Fix NOT NULL constraints for image URLs
-- These fields should allow NULL initially and be updated after upload

ALTER TABLE public.orders 
  ALTER COLUMN front_image_url DROP NOT NULL,
  ALTER COLUMN back_image_url DROP NOT NULL;

