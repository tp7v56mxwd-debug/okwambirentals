-- Fix 1: Update bookings cancellation policy with 24-hour time validation
-- Drop existing policy that doesn't have time validation
DROP POLICY IF EXISTS "Users can cancel their own bookings" ON public.bookings;

-- Create new policy with server-side 24-hour cancellation rule enforcement
CREATE POLICY "Users can cancel their own bookings" 
ON public.bookings FOR UPDATE 
USING (
  auth.uid() = user_id 
  AND status = 'pending'
  AND (
    -- Enforce 24-hour cancellation policy at database level
    EXTRACT(EPOCH FROM ((booking_date + booking_time::time) - now())) / 3600 >= 24
  )
)
WITH CHECK (
  auth.uid() = user_id 
  AND status = 'cancelled'
);

-- Fix 2 & 4: Remove permissive payment policies that allow unauthenticated access
-- These policies with "true" conditions allow anyone to create/modify payment records
DROP POLICY IF EXISTS "System can insert payments" ON public.payments;
DROP POLICY IF EXISTS "System can update payments" ON public.payments;

-- Note: Payments should ONLY be created/updated via Edge Functions using service_role key
-- No direct client access to payment write operations for security
-- The SELECT policy for users/admins to view their payments remains in place