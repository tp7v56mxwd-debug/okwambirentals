-- Drop the overly permissive SELECT policy that exposes all customer data
DROP POLICY IF EXISTS "Anyone can view bookings with their email" ON public.bookings;

-- The INSERT policy remains to allow booking creation through the form
-- Bookings are now only accessible through admin tools, not publicly readable