-- Drop the restrictive insert policy
DROP POLICY IF EXISTS "Authenticated users can create bookings" ON bookings;

-- Create a more permissive policy that allows anyone to create bookings
CREATE POLICY "Anyone can create bookings"
ON bookings
FOR INSERT
WITH CHECK (true);