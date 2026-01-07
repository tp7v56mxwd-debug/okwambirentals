-- Add CHECK constraints to bookings table for server-side validation
-- These constraints enforce data integrity at the database level

-- Customer name: minimum 2 characters, maximum 100 characters
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_customer_name_length 
CHECK (char_length(customer_name) >= 2 AND char_length(customer_name) <= 100);

-- Customer phone: minimum 9 characters, maximum 20 characters (to allow international formats)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_customer_phone_length 
CHECK (char_length(customer_phone) >= 9 AND char_length(customer_phone) <= 20);

-- Special requests: maximum 1000 characters (null is allowed)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_special_requests_length 
CHECK (special_requests IS NULL OR char_length(special_requests) <= 1000);

-- Vehicle type: maximum 50 characters and not empty
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_vehicle_type_length 
CHECK (char_length(vehicle_type) >= 1 AND char_length(vehicle_type) <= 50);

-- Duration: must be positive and reasonable (between 30 and 480 minutes / 8 hours max)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_duration_range 
CHECK (duration >= 30 AND duration <= 480);

-- Booking time: must match HH:MM format
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_time_format 
CHECK (booking_time ~ '^([01]?[0-9]|2[0-3]):[0-5][0-9]$');

-- Total price: must not be empty (allow various formats for legacy data)
ALTER TABLE public.bookings
ADD CONSTRAINT bookings_total_price_not_empty 
CHECK (char_length(total_price) >= 1 AND char_length(total_price) <= 50);