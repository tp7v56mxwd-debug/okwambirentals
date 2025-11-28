import { useEffect, useRef } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useToast } from "@/hooks/use-toast";

export const useBookingNotifications = (userId: string | undefined) => {
  const { toast } = useToast();
  const previousBookingsRef = useRef<Map<string, string>>(new Map());

  useEffect(() => {
    if (!userId) return;

    // Request notification permission
    const requestPermission = async () => {
      if ("Notification" in window && Notification.permission === "default") {
        await Notification.requestPermission();
      }
    };
    requestPermission();

    // Fetch initial booking states
    const initializeBookings = async () => {
      const { data } = await supabase
        .from("bookings")
        .select("id, status")
        .eq("user_id", userId);

      if (data) {
        data.forEach((booking) => {
          previousBookingsRef.current.set(booking.id, booking.status);
        });
      }
    };
    initializeBookings();

    // Subscribe to booking changes
    const channel = supabase
      .channel("user-booking-notifications")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          schema: "public",
          table: "bookings",
          filter: `user_id=eq.${userId}`,
        },
        (payload: any) => {
          const bookingId = payload.new.id;
          const newStatus = payload.new.status;
          const previousStatus = previousBookingsRef.current.get(bookingId);

          // Only notify on confirmed or cancelled status changes
          if (
            previousStatus &&
            previousStatus !== newStatus &&
            (newStatus === "confirmed" || newStatus === "cancelled")
          ) {
            const message =
              newStatus === "confirmed"
                ? `Your booking for ${payload.new.vehicle_type} has been confirmed!`
                : `Your booking for ${payload.new.vehicle_type} has been cancelled.`;

            // Show browser notification
            if ("Notification" in window && Notification.permission === "granted") {
              new Notification("Booking Update", {
                body: message,
                icon: "/favicon.ico",
                badge: "/favicon.ico",
              });
            }

            // Show toast notification as fallback
            toast({
              title: "Booking Update",
              description: message,
              variant: newStatus === "confirmed" ? "default" : "destructive",
            });
          }

          // Update the reference
          previousBookingsRef.current.set(bookingId, newStatus);
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [userId, toast]);
};
