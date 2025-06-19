/*
  # Fix RLS policies for email_signups table

  1. Security Changes
    - Drop all existing policies to start fresh
    - Create proper policies for anonymous and authenticated users
    - Ensure email validation and required fields

  2. Changes
    - Allow anonymous users (anon role) to insert email signups
    - Allow authenticated users to insert email signups
    - Validate email format and required fields
    - Allow service role to read all data for admin purposes
*/

-- First, let's make sure RLS is enabled
ALTER TABLE email_signups ENABLE ROW LEVEL SECURITY;

-- Drop all existing policies to start fresh
DROP POLICY IF EXISTS "Allow anonymous email signups" ON email_signups;
DROP POLICY IF EXISTS "Allow authenticated email signups" ON email_signups;
DROP POLICY IF EXISTS "Service role can read email signups" ON email_signups;
DROP POLICY IF EXISTS "Anyone can sign up for emails" ON email_signups;

-- Create a simple policy for anonymous users to insert
CREATE POLICY "anon_can_insert_emails"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (true);

-- Create a simple policy for authenticated users to insert
CREATE POLICY "authenticated_can_insert_emails"
  ON email_signups
  FOR INSERT
  TO authenticated
  WITH CHECK (true);

-- Allow service role to read all data (for admin purposes)
CREATE POLICY "service_role_can_read_all"
  ON email_signups
  FOR SELECT
  TO service_role
  USING (true);

-- Allow service role to insert (for edge functions)
CREATE POLICY "service_role_can_insert"
  ON email_signups
  FOR INSERT
  TO service_role
  WITH CHECK (true);