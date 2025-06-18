
-- Crear tabla para almacenar los registros de email
CREATE TABLE public.email_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL, -- 'hero' o 'cta'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

-- Crear política que permite insertar registros (público)
CREATE POLICY "Anyone can sign up for emails" 
  ON public.email_signups 
  FOR INSERT 
  WITH CHECK (true);

-- Crear política que permite leer registros (solo para funciones administrativas)
CREATE POLICY "Service role can read email signups" 
  ON public.email_signups 
  FOR SELECT 
  USING (auth.role() = 'service_role');
