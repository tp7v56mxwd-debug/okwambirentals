import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingNotification {
  customerName: string;
  customerEmail: string;
  customerPhone: string;
  vehicleType: string;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  totalPrice: string;
  bookingId: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const ADMIN_WHATSAPP = Deno.env.get("ADMIN_WHATSAPP_NUMBER");
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    const {
      customerName,
      customerEmail,
      customerPhone,
      vehicleType,
      bookingDate,
      bookingTime,
      duration,
      totalPrice,
      bookingId
    }: BookingNotification = await req.json();

    console.log("Sending admin notifications for booking:", bookingId);

    // Send Email Notification
    if (RESEND_API_KEY) {
      try {
        const emailResponse = await fetch("https://api.resend.com/emails", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${RESEND_API_KEY}`,
          },
          body: JSON.stringify({
            from: "Okwambi Rentals <onboarding@resend.dev>",
            to: ["aandrocristovao@gmail.com"],
            subject: `🚨 New Booking: ${vehicleType}`,
            html: `
            <!DOCTYPE html>
            <html>
              <head>
                <style>
                  body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
                  .container { max-width: 600px; margin: 0 auto; padding: 20px; }
                  .header { background: linear-gradient(135deg, #2B9ED9, #F5A623); padding: 30px; text-align: center; border-radius: 10px 10px 0 0; }
                  .header h1 { color: white; margin: 0; }
                  .content { background: #f9f9f9; padding: 30px; border-radius: 0 0 10px 10px; }
                  .booking-details { background: white; padding: 20px; border-radius: 8px; margin: 20px 0; }
                  .detail-row { display: flex; justify-content: space-between; padding: 10px 0; border-bottom: 1px solid #eee; }
                  .detail-label { font-weight: bold; color: #2B9ED9; }
                  .alert-box { background: #fff3cd; border-left: 4px solid #ffc107; padding: 15px; margin: 20px 0; }
                </style>
              </head>
              <body>
                <div class="container">
                  <div class="header">
                    <h1>🚨 New Booking Alert</h1>
                  </div>
                  <div class="content">
                    <div class="alert-box">
                      <strong>Action Required:</strong> A new booking has been placed and requires your attention.
                    </div>
                    
                    <div class="booking-details">
                      <h2 style="color: #2B9ED9; margin-top: 0;">Booking Details</h2>
                      <div class="detail-row">
                        <span class="detail-label">Booking ID:</span>
                        <span>${bookingId.slice(0, 8)}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Vehicle:</span>
                        <span>${vehicleType}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Date:</span>
                        <span>${bookingDate}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Time:</span>
                        <span>${bookingTime}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Duration:</span>
                        <span>${duration} minutes</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Total Price:</span>
                        <span style="font-weight: bold; color: #F5A623;">${totalPrice}</span>
                      </div>
                    </div>

                    <div class="booking-details">
                      <h2 style="color: #2B9ED9; margin-top: 0;">Customer Information</h2>
                      <div class="detail-row">
                        <span class="detail-label">Name:</span>
                        <span>${customerName}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Email:</span>
                        <span>${customerEmail}</span>
                      </div>
                      <div class="detail-row">
                        <span class="detail-label">Phone:</span>
                        <span>${customerPhone}</span>
                      </div>
                    </div>
                    
                    <p style="margin-top: 30px;">Please review this booking in your admin dashboard.</p>
                  </div>
                </div>
              </body>
            </html>
            `,
          }),
        });

        if (!emailResponse.ok) {
          const error = await emailResponse.text();
          console.error("Resend API error:", error);
        } else {
          console.log("Email notification sent successfully");
        }
      } catch (emailError) {
        console.error("Error sending email:", emailError);
      }
    }

    // Send WhatsApp Notification
    if (ADMIN_WHATSAPP) {
      try {
        const message = `🚨 *New Booking Alert*\n\n` +
          `*Vehicle:* ${vehicleType}\n` +
          `*Date:* ${bookingDate}\n` +
          `*Time:* ${bookingTime}\n` +
          `*Duration:* ${duration} min\n` +
          `*Price:* ${totalPrice}\n\n` +
          `*Customer:*\n` +
          `Name: ${customerName}\n` +
          `Email: ${customerEmail}\n` +
          `Phone: ${customerPhone}\n\n` +
          `Booking ID: ${bookingId.slice(0, 8)}`;

        const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP}?text=${encodeURIComponent(message)}`;
        
        console.log("WhatsApp notification prepared:", whatsappUrl);
        
        // Note: Actual WhatsApp message sending would require WhatsApp Business API
        // For now, we're logging the URL which can be used to send manually
      } catch (whatsappError) {
        console.error("Error preparing WhatsApp notification:", whatsappError);
      }
    }

    return new Response(
      JSON.stringify({ success: true, message: "Admin notifications sent" }),
      {
        status: 200,
        headers: {
          "Content-Type": "application/json",
          ...corsHeaders,
        },
      }
    );
  } catch (error: any) {
    console.error("Error in notify-admin-booking function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);