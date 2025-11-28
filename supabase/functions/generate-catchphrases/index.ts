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
            content: `Create 8 creative Portuguese catchphrases for OKWAMBI that blend these two elements:

1. The style and power of: "Domina o Mar, Conquista a Areia"
2. The meaning of "Okwambi" = "valente" (brave/valiant)

Company context:
- Adventure vehicle rentals (ATVs, UTVs, jet skis)
- Mussulo Beach, Luanda, Angola
- Target: brave, adventurous thrill-seekers

Requirements:
- SHORT (4-7 words maximum)
- Must incorporate the brave/valiant meaning directly or indirectly
- Action-oriented and powerful like option 4
- Use verbs like domina, conquista, but add the valente/brave element

Examples of the style wanted:
- "Valente no Mar, Forte na Areia"
- "Para Valentes, Só Aventuras"

Return ONLY a numbered list of 8 catchphrases, nothing else.`
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
