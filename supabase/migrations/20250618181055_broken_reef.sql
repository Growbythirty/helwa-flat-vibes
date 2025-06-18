/*
  # Email signups table migration

  1. New Tables
    - `email_signups`
      - `id` (uuid, primary key)
      - `email` (text, unique)
      - `source` (text, not null)
      - `created_at` (timestamp with time zone)
  2. Security
    - Enable RLS on `email_signups` table
    - Add policy for public email signups
    - Add policy for service role to read signups
*/

-- Crear tabla para almacenar los registros de email (solo si no existe)
CREATE TABLE IF NOT EXISTS public.email_signups (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  email TEXT NOT NULL UNIQUE,
  source TEXT NOT NULL, -- 'hero' o 'cta'
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Habilitar Row Level Security
ALTER TABLE public.email_signups ENABLE ROW LEVEL SECURITY;

-- Crear política que permite insertar registros (público) - solo si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'email_signups' 
    AND policyname = 'Anyone can sign up for emails'
  ) THEN
    CREATE POLICY "Anyone can sign up for emails" 
      ON public.email_signups 
      FOR INSERT 
      WITH CHECK (true);
  END IF;
END $$;

-- Crear política que permite leer registros (solo para funciones administrativas) - solo si no existe
DO $$
BEGIN
  IF NOT EXISTS (
    SELECT 1 FROM pg_policies 
    WHERE tablename = 'email_signups' 
    AND policyname = 'Service role can read email signups'
  ) THEN
    CREATE POLICY "Service role can read email signups" 
      ON public.email_signups 
      FOR SELECT 
      USING (auth.role() = 'service_role');
  END IF;
END $$;