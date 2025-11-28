import { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { CheckCircle2, Calendar, Clock, Car, Mail, Phone, MapPin, Home } from 'lucide-react';
import { format } from 'date-fns';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import LoadingSpinner from '@/components/LoadingSpinner';

interface Booking {
  id: string;
  booking_date: string;
  booking_time: string;
  vehicle_type: string;
  duration: number;
  total_price: string;
  status: string;
  customer_name: string;
  customer_email: string;
  customer_phone: string;
  special_requests: string | null;
}

const BookingConfirmation = () => {
  const { id: bookingId } = useParams();
  const navigate = useNavigate();
  const [booking, setBooking] = useState<Booking | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    if (!bookingId) {
      setError('No booking ID provided');
      setLoading(false);
      return;
    }

    fetchBooking();
  }, [bookingId]);

  const fetchBooking = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('id', bookingId)
        .single();

      if (error) throw error;
      setBooking(data);
    } catch (error) {
      console.error('Error fetching booking:', error);
      setError('Failed to load booking details');
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  if (error || !booking) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <main className="container mx-auto px-4 py-24">
          <Card className="max-w-2xl mx-auto">
            <CardContent className="py-12 text-center">
              <h2 className="text-2xl font-bold text-destructive mb-4">Booking Not Found</h2>
              <p className="text-muted-foreground mb-6">{error || 'Unable to find booking details'}</p>
              <Button onClick={() => navigate('/')}>Return Home</Button>
            </CardContent>
          </Card>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted/20">
      <Navigation />
      
      <main className="container mx-auto px-4 py-24">
        <div className="max-w-3xl mx-auto space-y-8">
          {/* Success Header */}
          <div className="text-center space-y-4">
            <div className="flex justify-center">
              <div className="p-4 bg-green-100 dark:bg-green-900/20 rounded-full">
                <CheckCircle2 className="h-16 w-16 text-green-600 dark:text-green-400" />
              </div>
            </div>
            <h1 className="text-4xl font-bold text-foreground">Booking Confirmed!</h1>
            <p className="text-lg text-muted-foreground">
              Your adventure at Mussulo Peninsula is all set
            </p>
          </div>

          {/* Booking Details Card */}
          <Card>
            <CardHeader className="bg-gradient-to-r from-primary/5 to-accent/5">
              <CardTitle className="text-2xl">Booking Details</CardTitle>
              <CardDescription>
                Booking ID: <span className="font-mono font-semibold">{booking.id.slice(0, 8).toUpperCase()}</span>
              </CardDescription>
            </CardHeader>
            <CardContent className="pt-6 space-y-6">
              {/* Status Badge */}
              <div className="flex items-center gap-3">
                <span className="text-sm font-semibold text-muted-foreground">Status:</span>
                <Badge variant="secondary" className="text-base">
                  {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
                </Badge>
              </div>

              {/* Vehicle Details */}
              <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                <Car className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">{booking.vehicle_type}</p>
                  <p className="text-sm text-muted-foreground">{booking.duration} minutes rental</p>
                </div>
              </div>

              {/* Date & Time */}
              <div className="grid md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Calendar className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Date</p>
                    <p className="font-semibold text-foreground">
                      {format(new Date(booking.booking_date), 'MMMM d, yyyy')}
                    </p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-4 bg-muted/30 rounded-lg">
                  <Clock className="h-5 w-5 text-primary mt-0.5" />
                  <div>
                    <p className="text-sm text-muted-foreground">Time</p>
                    <p className="font-semibold text-foreground">{booking.booking_time}</p>
                  </div>
                </div>
              </div>

              {/* Customer Info */}
              <div className="space-y-3 pt-4 border-t border-border">
                <h3 className="font-semibold text-foreground">Contact Information</h3>
                <div className="flex items-center gap-3 text-sm">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{booking.customer_email}</span>
                </div>
                <div className="flex items-center gap-3 text-sm">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-foreground">{booking.customer_phone}</span>
                </div>
              </div>

              {/* Location */}
              <div className="flex items-start gap-3 p-4 bg-primary/5 rounded-lg border border-primary/20">
                <MapPin className="h-5 w-5 text-primary mt-0.5" />
                <div>
                  <p className="font-semibold text-foreground">Pickup Location</p>
                  <p className="text-sm text-muted-foreground">Mussulo Peninsula, Luanda, Angola</p>
                </div>
              </div>

              {/* Special Requests */}
              {booking.special_requests && (
                <div className="pt-4 border-t border-border">
                  <p className="text-sm font-semibold text-muted-foreground mb-2">Special Requests:</p>
                  <p className="text-sm text-foreground">{booking.special_requests}</p>
                </div>
              )}

              {/* Total Price */}
              <div className="pt-4 border-t border-border">
                <div className="flex justify-between items-center">
                  <span className="text-lg font-semibold text-foreground">Total Amount</span>
                  <span className="text-2xl font-bold text-primary">{booking.total_price}</span>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Confirmation Email Notice */}
          <Card className="bg-blue-50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-800">
            <CardContent className="pt-6">
              <div className="flex gap-3">
                <Mail className="h-5 w-5 text-blue-600 dark:text-blue-400 mt-0.5" />
                <div>
                  <p className="font-semibold text-blue-900 dark:text-blue-100 mb-1">
                    Confirmation Email Sent
                  </p>
                  <p className="text-sm text-blue-700 dark:text-blue-300">
                    We've sent a confirmation email to <strong>{booking.customer_email}</strong> with all your booking details.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-4">
            <Button onClick={() => navigate('/')} variant="outline" size="lg">
              <Home className="h-4 w-4 mr-2" />
              Return Home
            </Button>
            <Button onClick={() => navigate('/my-bookings')} size="lg">
              View My Bookings
            </Button>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default BookingConfirmation;
