import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: "You are a creative marketing copywriter specializing in Portuguese language catchphrases."
          },
          {
            role: "user",
            content: `Create 10 creative and memorable Portuguese catchphrases for OKWAMBI, an adventure vehicle rental company (ATVs, UTVs, jet skis) located at Mussulo Beach in Luanda, Angola.

Key points:
- "Okwambi" means "valente" (brave/valiant) in Portuguese
- The company offers thrilling beach and water adventures
- Target audience: adventurous people seeking excitement
- Location: Beautiful Mussulo Peninsula, Luanda

Requirements:
- Each catchphrase should be SHORT (3-7 words maximum)
- Must be in Portuguese
- Should evoke bravery, adventure, freedom, or excitement
- Should be memorable and catchy
- Mix different styles: some bold, some poetic, some action-oriented

Return ONLY a numbered list of 10 catchphrases, nothing else.`
          }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI gateway error:", response.status, errorText);
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    const catchphrases = data.choices[0].message.content;

    return new Response(
      JSON.stringify({ catchphrases }),
      {
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  } catch (error) {
    console.error("Error generating catchphrases:", error);
    return new Response(
      JSON.stringify({ error: error instanceof Error ? error.message : "Unknown error" }),
      {
        status: 500,
        headers: { ...corsHeaders, "Content-Type": "application/json" },
      }
    );
  }
});
