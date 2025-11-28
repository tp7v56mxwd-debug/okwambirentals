import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent } from "@/components/ui/card";
import { Star, Quote } from "lucide-react";
import { format } from "date-fns";

interface Review {
  id: string;
  rating: number;
  review_text: string;
  created_at: string;
  bookings: {
    customer_name: string;
    vehicle_type: string;
  };
}

export const Reviews = () => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchReviews();
  }, []);

  const fetchReviews = async () => {
    try {
      const { data, error } = await supabase
        .from("reviews")
        .select(`
          id,
          rating,
          review_text,
          created_at,
          bookings (
            customer_name,
            vehicle_type
          )
        `)
        .eq("status", "approved")
        .order("created_at", { ascending: false })
        .limit(6);

      if (error) {
        console.error("Failed to load reviews:", error);
        setReviews([]);
        return;
      }
      
      setReviews(data || []);
    } catch (error) {
      console.error("Unexpected error loading reviews:", error);
      setReviews([]);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {[1, 2, 3].map((i) => (
              <Card key={i} className="animate-pulse">
                <CardContent className="pt-6 space-y-4">
                  <div className="h-4 bg-muted rounded w-3/4" />
                  <div className="h-20 bg-muted rounded" />
                  <div className="h-4 bg-muted rounded w-1/2" />
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (reviews.length === 0) {
    return (
      <section className="section-padding bg-background">
        <div className="container mx-auto px-6 lg:px-12">
          <Card className="max-w-2xl mx-auto border-dashed">
            <CardContent className="pt-12 pb-12 text-center">
              <Star className="h-8 w-8 text-foreground mx-auto mb-4" />
              <h3 className="text-xl font-semibold text-foreground mb-2">
                No Reviews Yet
              </h3>
              <p className="text-sm text-muted-foreground max-w-md mx-auto">
                Be the first to share your experience!
              </p>
            </CardContent>
          </Card>
        </div>
      </section>
    );
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section id="testimonials" className="section-padding bg-background border-t border-border">
      <div className="container mx-auto px-6 lg:px-12">
        <div className="mb-12 max-w-3xl">
          <h2 className="font-display text-3xl md:text-4xl font-semibold text-foreground mb-3">
            Customer Reviews
          </h2>
          <div className="flex items-center gap-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-4 w-4 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-sm text-muted-foreground">
              {averageRating.toFixed(1)} · {reviews.length} reviews
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl">
          {reviews.map((review) => (
            <Card key={review.id} className="border border-border hover:border-foreground/20 transition-colors">
              <CardContent className="pt-6">
                <div className="flex mb-3">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      className={`h-4 w-4 ${
                        star <= review.rating
                          ? "fill-yellow-400 text-yellow-400"
                          : "text-gray-300"
                      }`}
                    />
                  ))}
                </div>
                <p className="text-foreground text-sm leading-relaxed mb-4">
                  "{review.review_text}"
                </p>
                <div className="border-t border-border pt-3">
                  <p className="font-medium text-sm text-foreground">
                    {review.bookings.customer_name}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {review.bookings.vehicle_type} · {format(new Date(review.created_at), "MMM yyyy")}
                  </p>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
};