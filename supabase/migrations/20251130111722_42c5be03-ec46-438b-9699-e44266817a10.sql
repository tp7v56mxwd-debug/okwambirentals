-- Add payment fields to bookings table
ALTER TABLE public.bookings 
ADD COLUMN IF NOT EXISTS payment_method TEXT,
ADD COLUMN IF NOT EXISTS payment_status TEXT DEFAULT 'pending',
ADD COLUMN IF NOT EXISTS payment_reference TEXT,
ADD COLUMN IF NOT EXISTS payment_provider TEXT,
ADD COLUMN IF NOT EXISTS payment_mobile TEXT,
ADD COLUMN IF NOT EXISTS payment_callback_data JSONB;

-- Create payments table for detailed payment tracking
CREATE TABLE IF NOT EXISTS public.payments (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  booking_id UUID REFERENCES public.bookings(id) ON DELETE CASCADE,
  payment_method TEXT NOT NULL,
  payment_provider TEXT NOT NULL,
  amount TEXT NOT NULL,
  currency TEXT DEFAULT 'AOA',
  status TEXT DEFAULT 'pending',
  provider_transaction_id TEXT,
  provider_reference TEXT,
  customer_mobile TEXT,
  callback_data JSONB,
  error_message TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  completed_at TIMESTAMP WITH TIME ZONE
);

-- Enable RLS on payments table
ALTER TABLE public.payments ENABLE ROW LEVEL SECURITY;

-- Create policies for payments table
CREATE POLICY "Users can view their own payments"
ON public.payments
FOR SELECT
USING (
  booking_id IN (
    SELECT id FROM public.bookings WHERE user_id = auth.uid()
  )
  OR
  auth.uid() IN (SELECT user_id FROM public.user_roles WHERE role = 'admin')
);

CREATE POLICY "System can insert payments"
ON public.payments
FOR INSERT
WITH CHECK (true);

CREATE POLICY "System can update payments"
ON public.payments
FOR UPDATE
USING (true);

-- Create index for faster lookups
CREATE INDEX IF NOT EXISTS idx_payments_booking_id ON public.payments(booking_id);
CREATE INDEX IF NOT EXISTS idx_payments_provider_reference ON public.payments(provider_reference);
CREATE INDEX IF NOT EXISTS idx_payments_status ON public.payments(status);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_payments_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

CREATE TRIGGER update_payments_updated_at_trigger
BEFORE UPDATE ON public.payments
FOR EACH ROW
EXECUTE FUNCTION update_payments_updated_at();