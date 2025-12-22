import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// Frame prompts for each occasion
const OCCASION_PROMPTS: Record<string, string> = {
  birthday: `Create a minimalist decorative photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant golden/champagne colored border lines (2-3px)
- Subtle decorative curved flourishes in all four corners
- Small scattered confetti dots or tiny stars in corners (birthday theme)
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Very minimalist and elegant, not overwhelming
- Soft subtle glow or shadow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio (like A6 postcard)
- Clean vector-like crisp appearance
- High quality suitable for overlay
- The frame should enhance photos, not distract
- Background: transparent
- Colors: gold (#D4AF37), champagne (#F7E7CE), white

Do NOT include any photo inside - only the frame overlay itself.`,

  love: `Create a minimalist romantic photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant rose gold/pink colored border lines (2-3px)
- Subtle heart shapes or small roses in corners
- Delicate curved flourishes connecting corners
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Romantic but minimalist and elegant
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: rose gold (#B76E79), soft pink (#FFB6C1), white

Do NOT include any photo inside - only the frame overlay itself.`,

  thanks: `Create a minimalist gratitude-themed photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant sage green and gold colored border lines (2-3px)
- Subtle leaf or floral elements in corners
- Delicate curved flourishes
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Warm and appreciative feeling, minimalist
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: sage green (#9CAF88), gold (#D4AF37), white

Do NOT include any photo inside - only the frame overlay itself.`,

  apology: `Create a minimalist gentle photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant soft blue and silver colored border lines (2-3px)
- Subtle delicate flower petals or soft clouds in corners
- Gentle curved flourishes
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Soft, gentle, sincere feeling
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: soft blue (#B0C4DE), silver (#C0C0C0), white

Do NOT include any photo inside - only the frame overlay itself.`,

  congratulations: `Create a minimalist celebratory photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant gold and champagne colored border lines (2-3px)
- Subtle laurel leaves or stars in corners
- Elegant curved flourishes
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Celebratory but classy and minimalist
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: gold (#FFD700), champagne (#F7E7CE), white

Do NOT include any photo inside - only the frame overlay itself.`,

  friendship: `Create a minimalist friendship-themed photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant warm coral and teal colored border lines (2-3px)
- Subtle playful geometric shapes or abstract elements in corners
- Fun but elegant curved flourishes
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Warm and friendly feeling, minimalist
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: coral (#FF7F7F), teal (#008080), white

Do NOT include any photo inside - only the frame overlay itself.`,

  holiday: `Create a minimalist festive photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant red and gold colored border lines (2-3px)
- Subtle festive elements like small snowflakes or stars in corners
- Elegant curved flourishes
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Festive but classy and minimalist
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: festive red (#C41E3A), gold (#FFD700), white

Do NOT include any photo inside - only the frame overlay itself.`,

  other: `Create a minimalist elegant photo frame overlay PNG with transparent center.

Style requirements:
- Thin elegant gold colored border lines (2-3px)
- Subtle classic curved flourishes in all four corners
- Simple but refined decorative elements
- White/cream colored padding area around edges (15-20px margin)
- Center must be completely transparent for photo placement
- Universal elegant style, very minimalist
- Soft subtle glow on decorative elements

Technical requirements:
- Vertical orientation, 2:3 aspect ratio
- Clean vector-like crisp appearance
- High quality suitable for overlay
- Colors: gold (#D4AF37), white

Do NOT include any photo inside - only the frame overlay itself.`,
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { occasion = "birthday" } = await req.json();
    
    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY is not configured");
    }

    const prompt = OCCASION_PROMPTS[occasion] || OCCASION_PROMPTS.other;
    
    console.log(`Generating frame for occasion: ${occasion}`);
    console.log(`Using prompt: ${prompt.substring(0, 100)}...`);

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        Authorization: `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Lovable AI error:", response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: "Rate limit exceeded. Please try again later." }),
          { status: 429, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: "Payment required. Please add credits." }),
          { status: 402, headers: { ...corsHeaders, "Content-Type": "application/json" } }
        );
      }
      
      throw new Error(`AI gateway error: ${response.status}`);
    }

    const data = await response.json();
    console.log("Lovable AI response received");

    // Extract the generated image
    const imageUrl = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;
    const textResponse = data.choices?.[0]?.message?.content;

    if (!imageUrl) {
      console.error("No image in response:", JSON.stringify(data));
      throw new Error("No image was generated");
    }

    console.log(`Frame generated successfully for ${occasion}`);

    return new Response(
      JSON.stringify({
        success: true,
        occasion,
        imageUrl,
        message: textResponse || "Frame generated successfully",
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error) {
    console.error("Error generating frame:", error);
    return new Response(
      JSON.stringify({ 
        error: error instanceof Error ? error.message : "Unknown error",
        success: false 
      }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
