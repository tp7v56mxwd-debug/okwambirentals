import { useState } from 'react';
import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { Calendar } from '@/components/ui/calendar';
import { Popover, PopoverContent, PopoverTrigger } from '@/components/ui/popover';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { CalendarIcon, Loader2 } from 'lucide-react';
import { format } from 'date-fns';
import { supabase } from '@/integrations/supabase/client';
import { toast } from 'sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';

const checkoutSchema = z.object({
  customerName: z.string()
    .trim()
    .min(2, 'Name must be at least 2 characters')
    .max(100, 'Name must be less than 100 characters'),
  customerPhone: z.string()
    .trim()
    .min(9, 'Please enter a valid phone number')
    .max(20, 'Phone number is too long'),
  specialRequests: z.string()
    .max(1000, 'Special requests must be less than 1000 characters')
    .optional(),
});

type CheckoutForm = z.infer<typeof checkoutSchema>;

interface BookingDetails {
  date?: Date;
  time?: string;
}

const Checkout = () => {
  const { items, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();
  const [bookingDetails, setBookingDetails] = useState<Record<string, BookingDetails>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<CheckoutForm>({
    resolver: zodResolver(checkoutSchema),
  });

  const timeSlots = [
    '08:00', '08:30', '09:00', '09:30', '10:00', '10:30',
    '11:00', '11:30', '12:00', '12:30', '13:00', '13:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30', '17:00'
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('pt-AO')} Kz`;
  };

  const updateBookingDetail = (itemId: string, field: keyof BookingDetails, value: any) => {
    setBookingDetails(prev => ({
      ...prev,
      [itemId]: {
        ...prev[itemId],
        [field]: value,
      },
    }));
  };

  const onSubmit = async (data: CheckoutForm) => {
    // Validate all items have date and time
    const missingDetails = items.some(item => !bookingDetails[item.id]?.date || !bookingDetails[item.id]?.time);
    if (missingDetails) {
      toast.error('Please select date and time for all vehicles');
      return;
    }

    setIsSubmitting(true);

    try {
      const bookingPromises = items.map(async (item) => {
        const details = bookingDetails[item.id];
        const totalItemPrice = item.basePricePerHalfHour * (item.duration / 30) * item.quantity;

        // Create booking for each quantity
        const quantityPromises = Array.from({ length: item.quantity }, async (_, index) => {
          const { data: booking, error: bookingError } = await supabase
            .from('bookings')
            .insert({
              customer_name: data.customerName,
              customer_email: null,
              customer_phone: data.customerPhone,
              booking_date: format(details.date!, 'yyyy-MM-dd'),
              booking_time: details.time!,
              duration: item.duration,
              vehicle_type: item.vehicleName,
              total_price: (item.basePricePerHalfHour * (item.duration / 30)).toString(),
              special_requests: data.specialRequests || null,
              status: 'pending',
            })
            .select()
            .single();

          if (bookingError) throw bookingError;

          // Notify admin
          try {
            await supabase.functions.invoke('notify-admin-booking', {
              body: {
                bookingId: booking.id,
                customerName: data.customerName,
                customerPhone: data.customerPhone,
                vehicleType: item.vehicleName,
                bookingDate: format(details.date!, 'yyyy-MM-dd'),
                bookingTime: details.time!,
                duration: item.duration,
                totalPrice: (item.basePricePerHalfHour * (item.duration / 30)).toString(),
              },
            });
          } catch (notifyError) {
            console.error('Admin notification error:', notifyError);
          }

          return booking;
        });

        return Promise.all(quantityPromises);
      });

      const results = await Promise.all(bookingPromises);
      const allBookings = results.flat();

      // Generate WhatsApp confirmation message
      const phoneNumber = "244951000925";
      const bookingsText = items.map((item, index) => {
        const details = bookingDetails[item.id];
        return `\n${index + 1}. ${item.vehicleName}\n   📅 ${format(details.date!, 'dd/MM/yyyy')} às ${details.time}\n   ⏱️ ${item.duration} minutos\n   💰 ${(item.basePricePerHalfHour * (item.duration / 30)).toLocaleString('pt-AO')} Kz`;
      }).join('\n');

      const message = `🎉 *Reserva Confirmada - Okwambi Rentals*\n\n` +
        `Olá ${data.customerName}!\n\n` +
        `Sua reserva foi realizada com sucesso:\n` +
        `${bookingsText}\n\n` +
        `💵 *Total: ${totalPrice.toLocaleString('pt-AO')} Kz*\n\n` +
        `📞 Telefone: ${data.customerPhone}\n` +
        (data.specialRequests ? `📝 Observações: ${data.specialRequests}\n\n` : '\n') +
        `📍 Local: Praia do Mussulo, Luanda\n\n` +
        `Entraremos em contato em breve para confirmar todos os detalhes.\n\n` +
        `Obrigado por escolher Okwambi Rentals! 🏖️`;

      const whatsappUrl = `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
      
      // Show success message
      toast.success(`🎉 ${allBookings.length} Reserva(s) Confirmada(s)! Abrindo WhatsApp...`, {
        duration: 5000,
      });
      
      clearCart();
      
      // Open WhatsApp with confirmation message after a brief delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
      }, 500);
      
      // Navigate after showing the message
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      console.error('Booking error:', error);
      toast.error(error.message || 'Failed to create bookings');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    navigate('/cart');
    return null;
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
                Checkout
              </h1>
              <p className="text-muted-foreground">
                Complete your booking details for all vehicles
              </p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="grid lg:grid-cols-3 gap-8">
                {/* Left Column - Customer Details & Vehicle Schedule */}
                <div className="lg:col-span-2 space-y-6">
                  {/* Customer Information */}
                  <Card className="p-6">
                    <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                      Customer Information
                    </h2>
                    <div className="space-y-4">
                      <div>
                        <Label htmlFor="customerName">Full Name *</Label>
                        <Input
                          id="customerName"
                          {...register('customerName')}
                          placeholder="John Doe"
                        />
                        {errors.customerName && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.customerName.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="customerPhone">Phone Number *</Label>
                        <Input
                          id="customerPhone"
                          {...register('customerPhone')}
                          placeholder="+244 900 000 000"
                        />
                        {errors.customerPhone && (
                          <p className="text-sm text-destructive mt-1">
                            {errors.customerPhone.message}
                          </p>
                        )}
                      </div>
                      <div>
                        <Label htmlFor="specialRequests">Special Requests</Label>
                        <Textarea
                          id="specialRequests"
                          {...register('specialRequests')}
                          placeholder="Any special requirements or preferences..."
                          rows={3}
                        />
                      </div>
                    </div>
                  </Card>

                  {/* Vehicle Scheduling */}
                  <div className="space-y-4">
                    <h2 className="font-display text-xl font-semibold text-foreground">
                      Schedule Your Vehicles
                    </h2>
                    {items.map((item) => (
                      <Card key={item.id} className="p-6">
                        <div className="mb-4">
                          <h3 className="font-display text-lg font-semibold text-foreground">
                            {item.vehicleName}
                          </h3>
                          <div className="text-sm text-muted-foreground mt-1">
                            {item.quantity}x • {item.duration} minutes
                          </div>
                        </div>

                        <div className="grid sm:grid-cols-2 gap-4">
                          <div>
                            <Label>Date *</Label>
                            <Popover>
                              <PopoverTrigger asChild>
                                <Button
                                  variant="outline"
                                  className="w-full justify-start text-left font-normal"
                                >
                                  <CalendarIcon className="mr-2 h-4 w-4" />
                                  {bookingDetails[item.id]?.date
                                    ? format(bookingDetails[item.id].date!, 'PPP')
                                    : 'Pick a date'}
                                </Button>
                              </PopoverTrigger>
                              <PopoverContent className="w-auto p-0" align="start">
                                <Calendar
                                  mode="single"
                                  selected={bookingDetails[item.id]?.date}
                                  onSelect={(date) => updateBookingDetail(item.id, 'date', date)}
                                  disabled={(date) => date < new Date()}
                                  initialFocus
                                />
                              </PopoverContent>
                            </Popover>
                          </div>

                          <div>
                            <Label>Time *</Label>
                            <Select
                              value={bookingDetails[item.id]?.time || ''}
                              onValueChange={(value) => updateBookingDetail(item.id, 'time', value)}
                            >
                              <SelectTrigger>
                                <SelectValue placeholder="Select time" />
                              </SelectTrigger>
                              <SelectContent>
                                {timeSlots.map((slot) => (
                                  <SelectItem key={slot} value={slot}>
                                    {slot}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>
                        </div>
                      </Card>
                    ))}
                  </div>
                </div>

                {/* Right Column - Order Summary */}
                <div className="lg:col-span-1">
                  <Card className="p-6 sticky top-32">
                    <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                      Order Summary
                    </h2>

                    <div className="space-y-4 mb-6">
                      {items.map((item) => (
                        <div key={item.id} className="pb-4 border-b border-border">
                          <div className="flex justify-between mb-1">
                            <span className="text-sm font-medium text-foreground">
                              {item.vehicleName}
                            </span>
                            <span className="text-sm font-semibold text-foreground">
                              {formatPrice(
                                item.basePricePerHalfHour * (item.duration / 30) * item.quantity
                              )}
                            </span>
                          </div>
                          <div className="text-xs text-muted-foreground">
                            {item.quantity}x • {item.duration} min each
                          </div>
                        </div>
                      ))}

                      <div className="pt-4 border-t border-border">
                        <div className="flex justify-between items-center">
                          <span className="text-base font-semibold text-foreground">
                            Total
                          </span>
                          <span className="text-2xl font-bold text-foreground">
                            {formatPrice(totalPrice)}
                          </span>
                        </div>
                      </div>
                    </div>

                    <Button
                      type="submit"
                      className="w-full"
                      size="lg"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Processing...
                        </>
                      ) : (
                        `Complete Booking (${items.reduce((sum, item) => sum + item.quantity, 0)} vehicles)`
                      )}
                    </Button>

                    <Button
                      type="button"
                      variant="outline"
                      onClick={() => navigate('/cart')}
                      className="w-full mt-3"
                      disabled={isSubmitting}
                    >
                      Back to Cart
                    </Button>
                  </Card>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Checkout;