import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";
import { z } from "zod";

const reviewSchema = z.object({
  rating: z.number().min(1).max(5),
  review_text: z.string().trim().min(10, "Review must be at least 10 characters").max(500, "Review must be less than 500 characters")
});

interface ReviewDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  bookingId: string;
  vehicleType: string;
  onSuccess: () => void;
}

export const ReviewDialog = ({ open, onOpenChange, bookingId, vehicleType, onSuccess }: ReviewDialogProps) => {
  const [rating, setRating] = useState(0);
  const [hoverRating, setHoverRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      const validated = reviewSchema.parse({
        rating,
        review_text: reviewText
      });

      const { data: { user } } = await supabase.auth.getUser();
      
      if (!user) {
        toast.error("You must be logged in to submit a review");
        return;
      }

      const { error } = await supabase.from("reviews").insert({
        booking_id: bookingId,
        user_id: user.id,
        rating: validated.rating,
        review_text: validated.review_text,
        status: "pending"
      });

      if (error) throw error;

      toast.success("Review submitted! It will appear after admin approval.");
      onSuccess();
      onOpenChange(false);
      setRating(0);
      setReviewText("");
    } catch (error) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else if (error instanceof Error) {
        if (error.message.includes("unique_booking_review")) {
          toast.error("You've already reviewed this booking");
        } else {
          toast.error("Failed to submit review. Please try again.");
        }
      }
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle className="text-2xl font-black">Rate Your Experience</DialogTitle>
          <DialogDescription>
            How was your {vehicleType} rental experience?
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-3">
            <label className="text-sm font-semibold text-foreground">Your Rating</label>
            <div className="flex gap-2 justify-center py-4">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoverRating(star)}
                  onMouseLeave={() => setHoverRating(0)}
                  className="transition-transform hover:scale-110 active:scale-95"
                >
                  <Star
                    className={`h-10 w-10 ${
                      star <= (hoverRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-center text-sm text-muted-foreground">
                {rating === 1 && "Poor"}
                {rating === 2 && "Fair"}
                {rating === 3 && "Good"}
                {rating === 4 && "Very Good"}
                {rating === 5 && "Excellent"}
              </p>
            )}
          </div>

          <div className="space-y-3">
            <label htmlFor="review_text" className="text-sm font-semibold text-foreground">
              Your Review
            </label>
            <Textarea
              id="review_text"
              placeholder="Tell us about your experience..."
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              rows={5}
              maxLength={500}
              required
              minLength={10}
            />
            <p className="text-xs text-muted-foreground text-right">
              {reviewText.length}/500 characters
            </p>
          </div>

          <Button
            type="submit"
            className="w-full"
            disabled={isSubmitting || rating === 0 || reviewText.length < 10}
          >
            {isSubmitting ? "Submitting..." : "Submit Review"}
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};