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

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="text-center py-8">Loading reviews...</div>;
  }

  if (reviews.length === 0) {
    return null;
  }

  const averageRating = reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length;

  return (
    <section className="py-20 bg-gradient-to-br from-background via-background/95 to-primary/5">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-black text-foreground mb-4">
            What Our Customers Say
          </h2>
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="flex">
              {[1, 2, 3, 4, 5].map((star) => (
                <Star
                  key={star}
                  className={`h-6 w-6 ${
                    star <= Math.round(averageRating)
                      ? "fill-yellow-400 text-yellow-400"
                      : "text-gray-300"
                  }`}
                />
              ))}
            </div>
            <span className="text-xl font-bold text-foreground">
              {averageRating.toFixed(1)} out of 5
            </span>
          </div>
          <p className="text-muted-foreground">Based on {reviews.length} verified reviews</p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {reviews.map((review) => (
            <Card key={review.id} className="hover:shadow-lg transition-shadow">
              <CardContent className="pt-6">
                <div className="flex items-start gap-4 mb-4">
                  <Quote className="h-8 w-8 text-primary/20 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="flex mb-2">
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
                    <p className="text-foreground leading-relaxed mb-4">
                      "{review.review_text}"
                    </p>
                  </div>
                </div>
                <div className="border-t border-border/30 pt-4">
                  <p className="font-semibold text-foreground">
                    {review.bookings.customer_name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {review.bookings.vehicle_type} • {format(new Date(review.created_at), "MMM yyyy")}
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