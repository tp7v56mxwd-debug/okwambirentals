import { useCart } from '@/contexts/CartContext';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Minus, Plus, Trash2, ShoppingBag } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { useTranslation } from 'react-i18next';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const Cart = () => {
  const { t } = useTranslation();
  const { items, removeFromCart, updateQuantity, updateDuration, totalPrice, clearCart } = useCart();
  const navigate = useNavigate();

  const durationOptions = [
    { value: 30, label: '30 min', multiplier: 1 },
    { value: 60, label: '1 hora', multiplier: 2 },
    { value: 90, label: '1.5 horas', multiplier: 3 },
    { value: 120, label: '2 horas', multiplier: 4 },
  ];

  const formatPrice = (price: number) => {
    return `${price.toLocaleString('pt-AO')} Kz`;
  };

  const handleCheckout = () => {
    navigate('/checkout');
  };

  if (items.length === 0) {
    return (
      <>
        <Navigation />
        <div className="min-h-screen pt-32 pb-20 bg-background">
          <div className="container mx-auto px-6 lg:px-12">
            <div className="max-w-2xl mx-auto text-center">
              <ShoppingBag className="w-24 h-24 mx-auto text-muted-foreground/30 mb-6" />
              <h1 className="font-display text-3xl font-semibold mb-4 text-foreground">
                Your Cart is Empty
              </h1>
              <p className="text-muted-foreground mb-8">
                Add some amazing vehicles to your cart and start your adventure!
              </p>
              <Button 
                onClick={() => {
                  navigate('/');
                  setTimeout(() => {
                    const fleetElement = document.getElementById('fleet');
                    if (fleetElement) {
                      fleetElement.scrollIntoView({ behavior: 'smooth' });
                    }
                  }, 100);
                }} 
                size="lg"
              >
                Browse Vehicles
              </Button>
            </div>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen pt-32 pb-20 bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="max-w-5xl mx-auto">
            <div className="mb-12">
              <h1 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
                Shopping Cart
              </h1>
              <p className="text-muted-foreground">
                Review your selection and proceed to checkout
              </p>
            </div>

            <div className="grid lg:grid-cols-3 gap-8">
              {/* Cart Items */}
              <div className="lg:col-span-2 space-y-4">
                {items.map((item) => (
                  <Card key={item.id} className="p-6">
                    <div className="flex flex-col sm:flex-row gap-6">
                      <div className="flex-1">
                        <div className="flex items-start justify-between mb-4">
                          <div>
                            <h3 className="font-display text-xl font-semibold text-foreground mb-1">
                              {item.vehicleName}
                            </h3>
                            <p className="text-sm text-muted-foreground">
                              Base: {item.vehiclePrice}
                            </p>
                          </div>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeFromCart(item.id)}
                            className="text-destructive hover:text-destructive"
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>

                        <div className="space-y-4">
                          {/* Duration Selector */}
                          <div>
                            <label className="text-sm font-medium mb-2 block text-foreground">
                              Duration
                            </label>
                            <Select
                              value={item.duration.toString()}
                              onValueChange={(value) => updateDuration(item.id, parseInt(value))}
                            >
                              <SelectTrigger className="w-full sm:w-48">
                                <SelectValue />
                              </SelectTrigger>
                              <SelectContent>
                                {durationOptions.map((option) => (
                                  <SelectItem key={option.value} value={option.value.toString()}>
                                    {option.label}
                                  </SelectItem>
                                ))}
                              </SelectContent>
                            </Select>
                          </div>

                          {/* Quantity Controls */}
                          <div>
                            <label className="text-sm font-medium mb-2 block text-foreground">
                              Quantity
                            </label>
                            <div className="flex items-center gap-3">
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                disabled={item.quantity <= 1}
                              >
                                <Minus className="h-4 w-4" />
                              </Button>
                              <span className="text-lg font-semibold w-12 text-center">
                                {item.quantity}
                              </span>
                              <Button
                                variant="outline"
                                size="sm"
                                onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              >
                                <Plus className="h-4 w-4" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      </div>

                      {/* Item Total */}
                      <div className="sm:text-right">
                        <div className="text-sm text-muted-foreground mb-1">Subtotal</div>
                        <div className="text-2xl font-semibold text-foreground">
                          {formatPrice(
                            item.basePricePerHalfHour * (item.duration / 30) * item.quantity
                          )}
                        </div>
                      </div>
                    </div>
                  </Card>
                ))}

                <Button
                  variant="outline"
                  onClick={clearCart}
                  className="w-full text-destructive hover:text-destructive"
                >
                  Clear Cart
                </Button>
              </div>

              {/* Order Summary */}
              <div className="lg:col-span-1">
                <Card className="p-6 sticky top-32">
                  <h2 className="font-display text-xl font-semibold mb-6 text-foreground">
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Items</span>
                      <span className="font-medium text-foreground">
                        {items.reduce((sum, item) => sum + item.quantity, 0)}
                      </span>
                    </div>
                    <div className="border-t border-border pt-4">
                      <div className="flex justify-between mb-2">
                        <span className="text-base font-semibold text-foreground">Total</span>
                        <span className="text-2xl font-bold text-foreground">
                          {formatPrice(totalPrice)}
                        </span>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={handleCheckout}
                    className="w-full"
                    size="lg"
                  >
                    Proceed to Checkout
                  </Button>

                  <Button
                    variant="outline"
                    onClick={() => {
                      navigate('/');
                      setTimeout(() => {
                        const fleetElement = document.getElementById('fleet');
                        if (fleetElement) {
                          fleetElement.scrollIntoView({ behavior: 'smooth' });
                        }
                      }, 100);
                    }}
                    className="w-full mt-3"
                  >
                    Continue Shopping
                  </Button>

                  <div className="mt-6 pt-6 border-t border-border">
                    <p className="text-xs text-muted-foreground">
                      Secure checkout powered by OKWAMBI. Your booking details will be confirmed after payment.
                    </p>
                  </div>
                </Card>
              </div>
            </div>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Cart;