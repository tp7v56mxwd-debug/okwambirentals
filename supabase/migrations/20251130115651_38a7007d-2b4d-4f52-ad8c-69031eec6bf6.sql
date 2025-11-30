-- Ensure RLS is enabled
ALTER TABLE bookings ENABLE ROW LEVEL SECURITY;

-- Drop all existing INSERT policies to avoid conflicts
DROP POLICY IF EXISTS "Anyone can create bookings" ON bookings;
DROP POLICY IF EXISTS "Authenticated users can create bookings" ON bookings;

-- Create a comprehensive policy that allows both authenticated and anonymous users to insert
CREATE POLICY "Public can create bookings"
ON bookings
FOR INSERT
TO public, anon, authenticated
WITH CHECK (true);