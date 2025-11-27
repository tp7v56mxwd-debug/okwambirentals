import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers":
    "authorization, x-client-info, apikey, content-type",
};

interface BookingEmailRequest {
  customerName: string;
  customerEmail: string;
  vehicleType: string;
  bookingDate: string;
  bookingTime: string;
  duration: number;
  totalPrice: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const RESEND_API_KEY = Deno.env.get("RESEND_API_KEY");
    
    if (!RESEND_API_KEY) {
      console.error("RESEND_API_KEY is not configured");
      return new Response(
        JSON.stringify({ 
          error: "Email service not configured. Please contact support." 
        }),
        {
          status: 500,
          headers: { "Content-Type": "application/json", ...corsHeaders },
        }
      );
    }

    const { 
      customerName, 
      customerEmail, 
      vehicleType, 
      bookingDate, 
      bookingTime, 
      duration,
      totalPrice 
    }: BookingEmailRequest = await req.json();

    // Send email using Resend
    const emailResponse = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${RESEND_API_KEY}`,
      },
      body: JSON.stringify({
        from: "Okwambi Rentals <onboarding@resend.dev>",
        to: [customerEmail],
        subject: "Booking Confirmation - Okwambi Rentals",
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
                .footer { text-align: center; padding: 20px; color: #666; font-size: 14px; }
                .button { background: #2B9ED9; color: white; padding: 12px 24px; text-decoration: none; border-radius: 6px; display: inline-block; margin: 20px 0; }
              </style>
            </head>
            <body>
              <div class="container">
                <div class="header">
                  <h1>🏍️ Booking Confirmed!</h1>
                </div>
                <div class="content">
                  <p>Hi ${customerName},</p>
                  <p>Thank you for choosing Okwambi Rentals! Your booking has been confirmed.</p>
                  
                  <div class="booking-details">
                    <h2 style="color: #2B9ED9; margin-top: 0;">Booking Details</h2>
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
                      <span style="font-weight: bold; color: #F5A623;">${totalPrice} AOA</span>
                    </div>
                  </div>
                  
                  <p><strong>What to bring:</strong></p>
                  <ul>
                    <li>Valid driver's license (held for at least 2 years)</li>
                    <li>Government-issued ID or passport</li>
                    <li>Credit card for security deposit</li>
                  </ul>
                  
                  <p><strong>Location:</strong><br>
                  Mussulo Peninsula, Luanda, Angola</p>
                  
                  <p>Please arrive 15 minutes before your scheduled time. If you need to make any changes or have questions, contact us at +244 923 456 789.</p>
                  
                  <center>
                    <a href="https://wa.me/244923456789" class="button">Contact Us on WhatsApp</a>
                  </center>
                  
                  <p style="margin-top: 30px;">Get ready for an unforgettable adventure!</p>
                  <p><strong>Be Fearless,</strong><br>The Okwambi Rentals Team</p>
                </div>
                <div class="footer">
                  <p>&copy; ${new Date().getFullYear()} Okwambi Rentals. All rights reserved.</p>
                  <p>Mussulo Peninsula, Luanda, Angola</p>
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
      throw new Error(`Failed to send email: ${error}`);
    }

    const emailData = await emailResponse.json();
    console.log("Email sent successfully:", emailData);

    return new Response(JSON.stringify({ success: true, data: emailData }), {
      status: 200,
      headers: {
        "Content-Type": "application/json",
        ...corsHeaders,
      },
    });
  } catch (error: any) {
    console.error("Error in send-booking-confirmation function:", error);
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
