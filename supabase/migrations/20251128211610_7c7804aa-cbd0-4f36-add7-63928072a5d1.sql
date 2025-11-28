-- Create storage bucket for vehicle photos
INSERT INTO storage.buckets (id, name, public)
VALUES ('vehicle-photos', 'vehicle-photos', true);

-- Create vehicle_photos table
CREATE TABLE public.vehicle_photos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  vehicle_type TEXT NOT NULL,
  image_url TEXT NOT NULL,
  display_order INTEGER NOT NULL DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE NOT NULL DEFAULT now()
);

-- Enable RLS
ALTER TABLE public.vehicle_photos ENABLE ROW LEVEL SECURITY;

-- Public can view all photos
CREATE POLICY "Anyone can view vehicle photos"
ON public.vehicle_photos
FOR SELECT
USING (true);

-- Only admins can insert photos
CREATE POLICY "Admins can insert vehicle photos"
ON public.vehicle_photos
FOR INSERT
WITH CHECK (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can update photos
CREATE POLICY "Admins can update vehicle photos"
ON public.vehicle_photos
FOR UPDATE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Only admins can delete photos
CREATE POLICY "Admins can delete vehicle photos"
ON public.vehicle_photos
FOR DELETE
USING (has_role(auth.uid(), 'admin'::app_role));

-- Create storage policies for vehicle photos
CREATE POLICY "Anyone can view vehicle photos in storage"
ON storage.objects
FOR SELECT
USING (bucket_id = 'vehicle-photos');

CREATE POLICY "Admins can upload vehicle photos"
ON storage.objects
FOR INSERT
WITH CHECK (
  bucket_id = 'vehicle-photos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can update vehicle photos"
ON storage.objects
FOR UPDATE
USING (
  bucket_id = 'vehicle-photos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

CREATE POLICY "Admins can delete vehicle photos"
ON storage.objects
FOR DELETE
USING (
  bucket_id = 'vehicle-photos' 
  AND has_role(auth.uid(), 'admin'::app_role)
);

-- Add trigger for updated_at
CREATE TRIGGER update_vehicle_photos_updated_at
BEFORE UPDATE ON public.vehicle_photos
FOR EACH ROW
EXECUTE FUNCTION public.update_bookings_updated_at();