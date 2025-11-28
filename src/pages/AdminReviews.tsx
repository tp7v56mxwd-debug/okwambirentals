import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/hooks/useAuth";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Star, Check, X, ArrowLeft } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";
import LoadingSpinner from "@/components/LoadingSpinner";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";

interface Review {
  id: string;
  rating: number;
  review_text: string;
  status: string;
  created_at: string;
  bookings: {
    customer_name: string;
    customer_email: string;
    vehicle_type: string;
    booking_date: string;
  };
}

const AdminReviews = () => {
  const { user, isAdmin, loading: authLoading } = useAuth();
  const navigate = useNavigate();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<"all" | "pending" | "approved" | "rejected">("pending");

  useEffect(() => {
    if (!authLoading && (!user || !isAdmin)) {
      toast.error("Admin access required");
      navigate("/");
    }
  }, [user, isAdmin, authLoading, navigate]);

  useEffect(() => {
    if (user && isAdmin) {
      fetchReviews();
    }
  }, [user, isAdmin, filter]);

  const fetchReviews = async () => {
    try {
      let query = supabase
        .from("reviews")
        .select(`
          id,
          rating,
          review_text,
          status,
          created_at,
          bookings (
            customer_name,
            customer_email,
            vehicle_type,
            booking_date
          )
        `)
        .order("created_at", { ascending: false });

      if (filter !== "all") {
        query = query.eq("status", filter);
      }

      const { data, error } = await query;

      if (error) throw error;
      setReviews(data || []);
    } catch (error) {
      console.error("Error fetching reviews:", error);
      toast.error("Failed to load reviews");
    } finally {
      setLoading(false);
    }
  };

  const updateReviewStatus = async (reviewId: string, status: "approved" | "rejected") => {
    try {
      const { error } = await supabase
        .from("reviews")
        .update({ status })
        .eq("id", reviewId);

      if (error) throw error;

      toast.success(`Review ${status} successfully`);
      fetchReviews();
    } catch (error) {
      console.error("Error updating review:", error);
      toast.error("Failed to update review");
    }
  };

  if (authLoading || loading) {
    return (
      <div className="min-h-screen bg-background">
        <Navigation />
        <LoadingSpinner />
      </div>
    );
  }

  const getStatusColor = (status: string) => {
    switch (status) {
      case "approved":
        return "bg-green-500/10 text-green-700 dark:text-green-400";
      case "pending":
        return "bg-yellow-500/10 text-yellow-700 dark:text-yellow-400";
      case "rejected":
        return "bg-red-500/10 text-red-700 dark:text-red-400";
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation />
      
      <main className="container mx-auto px-4 py-8 mt-20">
        <div className="max-w-6xl mx-auto">
          <div className="flex items-center gap-4 mb-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => navigate("/admin")}
              className="rounded-full"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <div>
              <h1 className="text-4xl font-black text-foreground mb-2">Review Moderation</h1>
              <p className="text-muted-foreground">Approve or reject customer reviews</p>
            </div>
          </div>

          <div className="flex gap-2 mb-6">
            {["all", "pending", "approved", "rejected"].map((status) => (
              <Button
                key={status}
                variant={filter === status ? "default" : "outline"}
                onClick={() => setFilter(status as typeof filter)}
                className="capitalize"
              >
                {status}
              </Button>
            ))}
          </div>

          {reviews.length === 0 ? (
            <Card>
              <CardContent className="py-16">
                <div className="text-center">
                  <Star className="h-16 w-16 text-muted-foreground mx-auto mb-4" />
                  <h3 className="text-xl font-bold text-foreground mb-2">No {filter} reviews</h3>
                  <p className="text-muted-foreground">
                    {filter === "pending" 
                      ? "All reviews have been moderated!" 
                      : `No ${filter} reviews found.`}
                  </p>
                </div>
              </CardContent>
            </Card>
          ) : (
            <div className="space-y-6">
              {reviews.map((review) => (
                <Card key={review.id}>
                  <CardHeader>
                    <div className="flex justify-between items-start">
                      <div>
                        <CardTitle className="text-xl mb-2">{review.bookings.customer_name}</CardTitle>
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <span>{review.bookings.vehicle_type}</span>
                          <span>•</span>
                          <span>{format(new Date(review.bookings.booking_date), "MMM dd, yyyy")}</span>
                        </div>
                      </div>
                      <Badge className={getStatusColor(review.status)}>
                        {review.status.toUpperCase()}
                      </Badge>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <div className="space-y-4">
                      <div className="flex gap-1">
                        {[1, 2, 3, 4, 5].map((star) => (
                          <Star
                            key={star}
                            className={`h-5 w-5 ${
                              star <= review.rating
                                ? "fill-yellow-400 text-yellow-400"
                                : "text-gray-300"
                            }`}
                          />
                        ))}
                      </div>
                      
                      <p className="text-foreground leading-relaxed">"{review.review_text}"</p>
                      
                      <div className="pt-4 border-t border-border/30">
                        <p className="text-sm text-muted-foreground">
                          Submitted on {format(new Date(review.created_at), "MMM dd, yyyy 'at' h:mm a")}
                        </p>
                      </div>

                      {review.status === "pending" && (
                        <div className="flex gap-2 pt-4">
                          <Button
                            onClick={() => updateReviewStatus(review.id, "approved")}
                            className="flex-1"
                          >
                            <Check className="h-4 w-4 mr-2" />
                            Approve
                          </Button>
                          <Button
                            onClick={() => updateReviewStatus(review.id, "rejected")}
                            variant="destructive"
                            className="flex-1"
                          >
                            <X className="h-4 w-4 mr-2" />
                            Reject
                          </Button>
                        </div>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
          )}
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default AdminReviews;