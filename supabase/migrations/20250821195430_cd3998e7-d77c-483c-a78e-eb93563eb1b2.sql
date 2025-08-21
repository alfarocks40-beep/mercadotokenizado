-- Fix security vulnerability: Prevent public access to email addresses
-- Add SELECT policy that denies public access to newsletter emails

CREATE POLICY "Only authenticated admins can view newsletter subscriptions"
ON public.newsletter_subscriptions
FOR SELECT
TO authenticated
USING (false); -- Deny access until proper admin role system is implemented

-- Note: This policy will need to be updated when authentication and admin roles are implemented
-- Example for future implementation:
-- USING (public.has_role(auth.uid(), 'admin'));