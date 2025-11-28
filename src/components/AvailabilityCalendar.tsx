import { useEffect, useState } from "react";
import { supabase } from "@/integrations/supabase/client";
import { format } from "date-fns";
import { Badge } from "@/components/ui/badge";
import { Clock, CheckCircle, XCircle } from "lucide-react";

interface AvailabilityCalendarProps {
  selectedDate: Date | undefined;
  selectedTime: string;
  vehicleType: string;
}

interface BookedSlot {
  booking_time: string;
}

const timeSlots = [
  "09:00", "09:30", "10:00", "10:30", "11:00", "11:30",
  "12:00", "12:30", "13:00", "13:30", "14:00", "14:30",
  "15:00", "15:30", "16:00", "16:30", "17:00", "17:30"
];

export const AvailabilityCalendar = ({ selectedDate, selectedTime, vehicleType }: AvailabilityCalendarProps) => {
  const [bookedSlots, setBookedSlots] = useState<string[]>([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (selectedDate && vehicleType) {
      fetchAvailability();
    }
  }, [selectedDate, vehicleType]);

  // Real-time subscription for booking updates
  useEffect(() => {
    if (!selectedDate || !vehicleType) return;

    const dateStr = format(selectedDate, "yyyy-MM-dd");
    
    const channel = supabase
      .channel('booking-changes')
      .on(
        'postgres_changes',
        {
          event: '*',
          schema: 'public',
          table: 'bookings',
          filter: `booking_date=eq.${dateStr},vehicle_type=eq.${vehicleType}`
        },
        () => {
          // Refetch availability when bookings change
          fetchAvailability();
        }
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
    };
  }, [selectedDate, vehicleType]);

  const fetchAvailability = async () => {
    if (!selectedDate) return;
    
    setLoading(true);
    try {
      const dateStr = format(selectedDate, "yyyy-MM-dd");
      const { data, error } = await supabase
        .from("bookings")
        .select("booking_time")
        .eq("booking_date", dateStr)
        .eq("vehicle_type", vehicleType)
        .in("status", ["pending", "confirmed"]);

      if (error) throw error;
      
      const booked = (data as BookedSlot[]).map(b => b.booking_time);
      setBookedSlots(booked);
    } catch (error) {
      console.error("Error fetching availability:", error);
    } finally {
      setLoading(false);
    }
  };

  if (!selectedDate) {
    return (
      <div className="text-center py-4 text-sm text-muted-foreground">
        <Clock className="h-8 w-8 mx-auto mb-2 opacity-50" />
        Select a date to view availability
      </div>
    );
  }

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h4 className="text-sm font-semibold text-foreground">
          Availability for {format(selectedDate, "MMM dd, yyyy")}
        </h4>
        {loading && <span className="text-xs text-muted-foreground">Loading...</span>}
      </div>
      
      <div className="grid grid-cols-4 gap-2">
        {timeSlots.map((time) => {
          const isBooked = bookedSlots.includes(time);
          const isSelected = selectedTime === time;
          
          return (
            <div
              key={time}
              className={`
                relative px-3 py-2 rounded-lg text-center text-sm font-medium
                transition-all duration-200
                ${isBooked 
                  ? 'bg-red-500/10 text-red-700 dark:text-red-400 cursor-not-allowed' 
                  : isSelected
                  ? 'bg-primary text-primary-foreground'
                  : 'bg-green-500/10 text-green-700 dark:text-green-400'
                }
              `}
            >
              <div className="flex items-center justify-center gap-1">
                {isBooked ? (
                  <XCircle className="h-3 w-3" />
                ) : (
                  <CheckCircle className="h-3 w-3" />
                )}
                <span>{time}</span>
              </div>
            </div>
          );
        })}
      </div>

      <div className="flex gap-4 text-xs text-muted-foreground pt-2">
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-green-500/20"></div>
          <span>Available</span>
        </div>
        <div className="flex items-center gap-1">
          <div className="w-3 h-3 rounded bg-red-500/20"></div>
          <span>Booked</span>
        </div>
      </div>
    </div>
  );
};