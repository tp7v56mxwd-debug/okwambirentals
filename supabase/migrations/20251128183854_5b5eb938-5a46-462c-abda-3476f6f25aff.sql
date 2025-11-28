-- Add user_id column to bookings table to link bookings to authenticated users
ALTER TABLE public.bookings 
ADD COLUMN user_id uuid REFERENCES auth.users(id) ON DELETE SET NULL;

-- Create index for better query performance
CREATE INDEX idx_bookings_user_id ON public.bookings(user_id);

-- Add RLS policy for users to view their own bookings
CREATE POLICY "Users can view their own bookings" 
ON public.bookings 
FOR SELECT 
USING (auth.uid() = user_id);

-- Update the insert policy to automatically set user_id for authenticated users
DROP POLICY IF EXISTS "Anyone can create bookings" ON public.bookings;

CREATE POLICY "Authenticated users can create bookings" 
ON public.bookings 
FOR INSERT 
WITH CHECK (
  -- Allow authenticated users to create bookings with their own user_id
  (auth.uid() = user_id) OR 
  -- Allow anonymous bookings (for public booking form)
  (auth.uid() IS NULL AND user_id IS NULL)
);