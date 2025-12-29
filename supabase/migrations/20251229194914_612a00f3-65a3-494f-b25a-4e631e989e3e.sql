-- Добавление полей для внутреннего CRM контроля

-- Таблица pre_orders: поля для отслеживания работы с заявками
ALTER TABLE public.pre_orders 
ADD COLUMN crm_stage TEXT DEFAULT 'new';

ALTER TABLE public.pre_orders 
ADD COLUMN internal_comment TEXT;

-- Таблица orders: поля для отслеживания производства
ALTER TABLE public.orders 
ADD COLUMN production_stage TEXT DEFAULT 'in_progress';

ALTER TABLE public.orders 
ADD COLUMN internal_comment TEXT;

-- Комментарии к полям для документации
COMMENT ON COLUMN public.pre_orders.crm_stage IS 'Этап работы с заявкой: new, processing, done';
COMMENT ON COLUMN public.pre_orders.internal_comment IS 'Внутренние заметки менеджера';
COMMENT ON COLUMN public.orders.production_stage IS 'Этап производства: in_progress, created, printed, completed';
COMMENT ON COLUMN public.orders.internal_comment IS 'Внутренние заметки по заказу';