-- Make customer_email optional in bookings table
ALTER TABLE bookings ALTER COLUMN customer_email DROP NOT NULL;