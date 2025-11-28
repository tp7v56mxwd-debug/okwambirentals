import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Label } from '@/components/ui/label';
import { Search, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

export const BookingTracker = () => {
  const { ref, isVisible } = useIntersectionObserver();
  const navigate = useNavigate();
  const [searchValue, setSearchValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!searchValue.trim()) {
      toast.error('Please enter a booking ID or email');
      return;
    }

    setIsLoading(true);

    try {
      // Check if input is an email or booking ID
      const isEmail = searchValue.includes('@');
      
      let query = supabase.from('bookings').select('*');
      
      if (isEmail) {
        query = query.eq('customer_email', searchValue.trim());
      } else {
        // Search by booking ID (case-insensitive partial match)
        query = query.ilike('id', `${searchValue.trim()}%`);
      }

      const { data, error } = await query.limit(1).maybeSingle();

      if (error) {
        console.error('Error searching for booking:', error);
        toast.error('Failed to search for booking');
        return;
      }

      if (!data) {
        toast.error('No booking found with that information');
        return;
      }

      // Redirect to confirmation page
      navigate(`/booking/${data.id}`);
    } catch (error) {
      console.error('Error searching for booking:', error);
      toast.error('Failed to search for booking');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <section 
      id="track-booking" 
      ref={ref}
      className={`py-20 bg-gradient-to-b from-muted/30 to-background transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}
    >
      <div className="container mx-auto px-6 lg:px-8">
        <Card className="max-w-2xl mx-auto border-2 shadow-lg">
          <CardHeader className="text-center">
            <CardTitle className="text-3xl font-bold mb-2">Track Your Booking</CardTitle>
            <CardDescription className="text-base">
              Enter your booking ID or email to view your reservation details
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSearch} className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="search" className="text-sm font-semibold">
                  Booking ID or Email Address
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="search"
                    type="text"
                    placeholder="e.g., ABC123 or your@email.com"
                    value={searchValue}
                    onChange={(e) => setSearchValue(e.target.value)}
                    className="flex-1"
                    disabled={isLoading}
                  />
                  <Button type="submit" size="lg" disabled={isLoading}>
                    {isLoading ? (
                      <>
                        <Loader2 className="h-4 w-4 mr-2 animate-spin" />
                        Searching...
                      </>
                    ) : (
                      <>
                        <Search className="h-4 w-4 mr-2" />
                        Track
                      </>
                    )}
                  </Button>
                </div>
              </div>
              <p className="text-xs text-muted-foreground text-center">
                You can find your booking ID in the confirmation email we sent you
              </p>
            </form>
          </CardContent>
        </Card>
      </div>
    </section>
  );
};
