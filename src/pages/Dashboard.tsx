import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/hooks/useAuth';
import { supabase } from '@/integrations/supabase/client';
import { useBookingNotifications } from '@/hooks/useBookingNotifications';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle } from '@/components/ui/alert-dialog';
import { Loader2, Calendar, Clock, Car, Mail, Phone, MessageSquare, XCircle, AlertTriangle } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { useTranslation } from 'react-i18next';
import { format, differenceInHours, parseISO } from 'date-fns';

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
  created_at: string;
}

const Dashboard = () => {
  const { user, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const { toast } = useToast();
  const { t } = useTranslation();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [loading, setLoading] = useState(true);
  const [cancellingId, setCancellingId] = useState<string | null>(null);
  const [showCancelDialog, setShowCancelDialog] = useState(false);
  const [selectedBooking, setSelectedBooking] = useState<Booking | null>(null);
  
  // Enable push notifications for booking updates
  useBookingNotifications(user?.id);

  useEffect(() => {
    if (!authLoading && !user) {
      navigate('/auth');
      return;
    }

    if (user) {
      fetchBookings();
    }
  }, [user, authLoading, navigate]);

  const fetchBookings = async () => {
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('*')
        .eq('user_id', user?.id)
        .order('booking_date', { ascending: false });

      if (error) throw error;

      setBookings(data || []);
    } catch (error) {
      console.error('Error fetching bookings:', error);
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to load your bookings. Please try again.',
      });
    } finally {
      setLoading(false);
    }
  };

  const canCancelBooking = (booking: Booking): { canCancel: boolean; reason?: string } => {
    if (booking.status !== 'pending') {
      return { canCancel: false, reason: 'Only pending bookings can be cancelled' };
    }

    // Parse booking date and time to create a full datetime
    const bookingDateTime = parseISO(`${booking.booking_date}T${booking.booking_time}`);
    const hoursUntilBooking = differenceInHours(bookingDateTime, new Date());

    if (hoursUntilBooking < 24) {
      return { 
        canCancel: false, 
        reason: 'Free cancellation is only available up to 24 hours before the booking time' 
      };
    }

    return { canCancel: true };
  };

  const handleCancelClick = (booking: Booking) => {
    const { canCancel, reason } = canCancelBooking(booking);
    
    if (!canCancel) {
      toast({
        variant: 'destructive',
        title: 'Cannot Cancel',
        description: reason,
      });
      return;
    }

    setSelectedBooking(booking);
    setShowCancelDialog(true);
  };

  const handleCancelConfirm = async () => {
    if (!selectedBooking) return;

    setCancellingId(selectedBooking.id);
    
    try {
      const { error } = await supabase
        .from('bookings')
        .update({ status: 'cancelled' })
        .eq('id', selectedBooking.id)
        .eq('user_id', user?.id);

      if (error) throw error;

      // Update local state
      setBookings(bookings.map(b => 
        b.id === selectedBooking.id ? { ...b, status: 'cancelled' } : b
      ));

      toast({
        title: 'Booking Cancelled',
        description: 'Your booking has been successfully cancelled.',
      });
    } catch (error) {
      console.error('Error cancelling booking:', error);
      toast({
        variant: 'destructive',
        title: 'Cancellation Failed',
        description: 'Failed to cancel booking. Please try again.',
      });
    } finally {
      setCancellingId(null);
      setShowCancelDialog(false);
      setSelectedBooking(null);
    }
  };

  const getStatusBadge = (status: string) => {
    const variants: Record<string, 'default' | 'secondary' | 'destructive' | 'outline'> = {
      pending: 'secondary',
      confirmed: 'default',
      cancelled: 'destructive',
      completed: 'outline',
    };

    return (
      <Badge variant={variants[status] || 'default'}>
        {status.charAt(0).toUpperCase() + status.slice(1)}
      </Badge>
    );
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-background">
        <div className="flex flex-col items-center gap-4">
          <Loader2 className="h-12 w-12 animate-spin text-primary" />
          <p className="text-sm text-muted-foreground animate-pulse">Loading your bookings...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-b from-background to-secondary/20">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-24">
        <div className="max-w-7xl mx-auto space-y-8">
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">
            <div>
              <h1 className="text-4xl font-bold mb-2">My Bookings</h1>
              <p className="text-muted-foreground">
                View and manage your adventure bookings
              </p>
            </div>
            <Button onClick={() => navigate('/vehicle-photos')} variant="outline">
              Manage Vehicle Photos
            </Button>
          </div>

          {bookings.length === 0 ? (
            <Card>
              <CardContent className="py-12 text-center">
                <Calendar className="h-12 w-12 mx-auto mb-4 text-muted-foreground" />
                <h3 className="text-lg font-semibold mb-2">No bookings yet</h3>
                <p className="text-muted-foreground mb-4">
                  Start your adventure by booking a vehicle!
                </p>
                <button
                  onClick={() => navigate('/')}
                  className="px-6 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
                >
                  Browse Vehicles
                </button>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-4">
              {bookings.map((booking) => (
                <Card key={booking.id}>
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex-1">
                        <CardTitle className="flex items-center gap-2">
                          <Car className="h-5 w-5" />
                          {booking.vehicle_type}
                        </CardTitle>
                        <CardDescription>
                          Booking ID: {booking.id.slice(0, 8)}
                        </CardDescription>
                      </div>
                      <div className="flex items-center gap-2">
                        {getStatusBadge(booking.status)}
                        {booking.status === 'pending' && (
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => handleCancelClick(booking)}
                            disabled={cancellingId === booking.id}
                            className="text-destructive hover:text-destructive hover:bg-destructive/10"
                          >
                            {cancellingId === booking.id ? (
                              <Loader2 className="h-4 w-4 animate-spin" />
                            ) : (
                              <XCircle className="h-4 w-4" />
                            )}
                          </Button>
                        )}
                      </div>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="grid md:grid-cols-2 gap-6">
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Calendar className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Date:</span>
                          <span>{format(new Date(booking.booking_date), 'PPP')}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Time:</span>
                          <span>{booking.booking_time}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Clock className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Duration:</span>
                          <span>{booking.duration} minutes</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex items-center gap-2 text-sm">
                          <Mail className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Email:</span>
                          <span className="truncate">{booking.customer_email}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <Phone className="h-4 w-4 text-muted-foreground" />
                          <span className="font-medium">Phone:</span>
                          <span>{booking.customer_phone}</span>
                        </div>
                        <div className="flex items-center gap-2 text-sm">
                          <span className="font-medium">Total:</span>
                          <span className="text-lg font-bold text-primary">{booking.total_price}</span>
                        </div>
                      </div>
                    </div>

                    {booking.special_requests && (
                      <div className="mt-4 pt-4 border-t">
                        <div className="flex items-start gap-2 text-sm">
                          <MessageSquare className="h-4 w-4 text-muted-foreground mt-0.5" />
                          <div>
                            <span className="font-medium">Special Requests:</span>
                            <p className="text-muted-foreground mt-1">{booking.special_requests}</p>
                          </div>
                        </div>
                      </div>
                    )}
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />

      {/* Cancellation Confirmation Dialog */}
      <AlertDialog open={showCancelDialog} onOpenChange={setShowCancelDialog}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle className="flex items-center gap-2">
              <AlertTriangle className="h-5 w-5 text-destructive" />
              Cancel Booking?
            </AlertDialogTitle>
            <AlertDialogDescription className="space-y-2">
              <p>Are you sure you want to cancel this booking?</p>
              {selectedBooking && (
                <div className="mt-4 p-4 bg-muted rounded-lg space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="font-medium">Vehicle:</span>
                    <span>{selectedBooking.vehicle_type}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Date:</span>
                    <span>{format(new Date(selectedBooking.booking_date), 'PPP')}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="font-medium">Time:</span>
                    <span>{selectedBooking.booking_time}</span>
                  </div>
                </div>
              )}
              <p className="text-xs text-muted-foreground mt-4">
                This action cannot be undone. You'll receive a confirmation email once the cancellation is processed.
              </p>
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Keep Booking</AlertDialogCancel>
            <AlertDialogAction
              onClick={handleCancelConfirm}
              className="bg-destructive text-destructive-foreground hover:bg-destructive/90"
            >
              Yes, Cancel Booking
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default Dashboard;