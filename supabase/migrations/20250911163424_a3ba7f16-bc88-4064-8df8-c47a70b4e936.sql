-- Create table for storing music generation requests
CREATE TABLE public.music_requests (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  lyrics TEXT NOT NULL,
  style TEXT,
  user_feedback TEXT,
  generated_variants JSONB,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.music_requests ENABLE ROW LEVEL SECURITY;

-- Create policies (making it public for now since no auth is implemented)
CREATE POLICY "Anyone can view music requests" 
ON public.music_requests 
FOR SELECT 
USING (true);

CREATE POLICY "Anyone can create music requests" 
ON public.music_requests 
FOR INSERT 
WITH CHECK (true);

CREATE POLICY "Anyone can update music requests" 
ON public.music_requests 
FOR UPDATE 
USING (true);

-- Create function to update timestamps
CREATE OR REPLACE FUNCTION public.update_updated_at_column()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql SET search_path = public;

-- Create trigger for automatic timestamp updates
CREATE TRIGGER update_music_requests_updated_at
BEFORE UPDATE ON public.music_requests
FOR EACH ROW
EXECUTE FUNCTION public.update_updated_at_column();