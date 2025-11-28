-- Add RLS policy for users to cancel their own bookings
CREATE POLICY "Users can cancel their own bookings" 
ON public.bookings 
FOR UPDATE 
USING (auth.uid() = user_id AND status = 'pending')
WITH CHECK (
  auth.uid() = user_id AND 
  status = 'cancelled' AND
  -- Only allow status change to cancelled
  (SELECT status FROM public.bookings WHERE id = bookings.id) = 'pending'
);