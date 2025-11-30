-- Create health_checks table to store monitoring history
CREATE TABLE IF NOT EXISTS public.health_checks (
  id UUID NOT NULL DEFAULT gen_random_uuid() PRIMARY KEY,
  status TEXT NOT NULL CHECK (status IN ('healthy', 'warning', 'critical')),
  checks JSONB NOT NULL DEFAULT '{}'::jsonb,
  errors TEXT[] DEFAULT ARRAY[]::TEXT[],
  warnings TEXT[] DEFAULT ARRAY[]::TEXT[],
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.health_checks ENABLE ROW LEVEL SECURITY;

-- Only admins can view health checks
CREATE POLICY "Admins can view health checks"
  ON public.health_checks
  FOR SELECT
  USING (has_role(auth.uid(), 'admin'::app_role));

-- System can insert health checks (for edge function)
CREATE POLICY "System can insert health checks"
  ON public.health_checks
  FOR INSERT
  WITH CHECK (true);

-- Create index for faster queries
CREATE INDEX idx_health_checks_created_at ON public.health_checks(created_at DESC);
CREATE INDEX idx_health_checks_status ON public.health_checks(status);

-- Enable pg_cron and pg_net extensions for scheduled tasks
CREATE EXTENSION IF NOT EXISTS pg_cron;
CREATE EXTENSION IF NOT EXISTS pg_net;

-- Schedule health monitor to run every hour
SELECT cron.schedule(
  'health-monitor-hourly',
  '0 * * * *', -- Every hour at minute 0
  $$
  SELECT
    net.http_post(
        url:='https://pvcbdlkdwwuejxsrugrv.supabase.co/functions/v1/health-monitor',
        headers:='{"Content-Type": "application/json", "Authorization": "Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InB2Y2JkbGtkd3d1ZWp4c3J1Z3J2Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjQyNTQyNTEsImV4cCI6MjA3OTgzMDI1MX0.UHnBgX4M34WfDnYHoiVHuJ90830RbApntXb_bBqToHU"}'::jsonb,
        body:=concat('{"timestamp": "', now(), '"}')::jsonb
    ) as request_id;
  $$
);