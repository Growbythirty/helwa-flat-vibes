/*
  # Fix RLS policy for email signups

  1. Security Changes
    - Add policy to allow anonymous users to insert email signups
    - This enables public email signup forms to work properly
    - Maintains existing service role read access

  2. Changes Made
    - Add "Allow anonymous email signups" policy for INSERT operations
    - Policy allows anon role to insert with basic email validation
*/

-- Drop the existing restrictive INSERT policy
DROP POLICY IF EXISTS "Anyone can sign up for emails" ON email_signups;

-- Create a new policy that allows anonymous users to insert email signups
CREATE POLICY "Allow anonymous email signups"
  ON email_signups
  FOR INSERT
  TO anon
  WITH CHECK (
    email IS NOT NULL 
    AND email != '' 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND source IS NOT NULL
    AND source != ''
  );

-- Also allow authenticated users to insert email signups
CREATE POLICY "Allow authenticated email signups"
  ON email_signups
  FOR INSERT
  TO authenticated
  WITH CHECK (
    email IS NOT NULL 
    AND email != '' 
    AND email ~* '^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$'
    AND source IS NOT NULL
    AND source != ''
  );