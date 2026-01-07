import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.86.0';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

interface SitemapUrl {
  loc: string;
  lastmod: string;
  changefreq: 'always' | 'hourly' | 'daily' | 'weekly' | 'monthly' | 'yearly' | 'never';
  priority: number;
}

// Simple in-memory rate limiting (resets when function cold starts)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();
const RATE_LIMIT = 60; // Max 60 requests per hour per IP (generous for SEO crawlers)
const RATE_LIMIT_WINDOW = 60 * 60 * 1000; // 1 hour in ms

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const record = rateLimitMap.get(ip);
  
  if (!record || now > record.resetTime) {
    rateLimitMap.set(ip, { count: 1, resetTime: now + RATE_LIMIT_WINDOW });
    return true;
  }
  
  if (record.count >= RATE_LIMIT) {
    return false;
  }
  
  record.count++;
  return true;
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Rate limiting check
    const clientIP = req.headers.get("x-forwarded-for")?.split(",")[0]?.trim() || 
                     req.headers.get("x-real-ip") || 
                     "unknown";
    
    if (!checkRateLimit(clientIP)) {
      console.log(`Rate limit exceeded for IP: ${clientIP}`);
      return new Response(
        JSON.stringify({ error: "Too many requests. Please try again later." }),
        {
          status: 429,
          headers: { ...corsHeaders, "Content-Type": "application/json" },
        }
      );
    }

    console.log('Starting sitemap generation...');

    // Initialize Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    // Get base URL from request or use default
    const baseUrl = 'https://okwambirentals.lovable.app';
    const today = new Date().toISOString().split('T')[0];

    // Start building sitemap URLs
    const urls: SitemapUrl[] = [];

    // Add static pages with high priority
    urls.push({
      loc: `${baseUrl}/`,
      lastmod: today,
      changefreq: 'daily',
      priority: 1.0,
    });

    urls.push({
      loc: `${baseUrl}/terms`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5,
    });

    urls.push({
      loc: `${baseUrl}/privacy`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.5,
    });

    urls.push({
      loc: `${baseUrl}/faq`,
      lastmod: today,
      changefreq: 'weekly',
      priority: 0.7,
    });

    urls.push({
      loc: `${baseUrl}/safety`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });

    urls.push({
      loc: `${baseUrl}/requirements`,
      lastmod: today,
      changefreq: 'monthly',
      priority: 0.6,
    });

    // Fetch distinct vehicle types from vehicle_photos
    console.log('Fetching vehicle types...');
    const { data: vehicleData, error: vehicleError } = await supabase
      .from('vehicle_photos')
      .select('vehicle_type, updated_at')
      .order('updated_at', { ascending: false });

    if (vehicleError) {
      console.error('Error fetching vehicles:', vehicleError);
    } else if (vehicleData && vehicleData.length > 0) {
      // Get unique vehicle types with their latest update date
      const vehicleTypes = new Map<string, string>();
      vehicleData.forEach((photo) => {
        const existingDate = vehicleTypes.get(photo.vehicle_type);
        if (!existingDate || new Date(photo.updated_at) > new Date(existingDate)) {
          vehicleTypes.set(photo.vehicle_type, photo.updated_at);
        }
      });

      console.log(`Found ${vehicleTypes.size} unique vehicle types`);

      // Add vehicle pages (assuming they link to #fleet section for now)
      vehicleTypes.forEach((lastmod, vehicleType) => {
        urls.push({
          loc: `${baseUrl}/#fleet`,
          lastmod: lastmod.split('T')[0],
          changefreq: 'weekly',
          priority: 0.9,
        });
      });
    }

    // Fetch approved reviews
    console.log('Fetching approved reviews...');
    const { data: reviewData, error: reviewError } = await supabase
      .from('reviews')
      .select('id, updated_at')
      .eq('status', 'approved')
      .order('updated_at', { ascending: false })
      .limit(50); // Limit to most recent 50 reviews

    if (reviewError) {
      console.error('Error fetching reviews:', reviewError);
    } else if (reviewData && reviewData.length > 0) {
      console.log(`Found ${reviewData.length} approved reviews`);

      // Add reviews section if there are approved reviews
      urls.push({
        loc: `${baseUrl}/#reviews`,
        lastmod: reviewData[0].updated_at.split('T')[0],
        changefreq: 'daily',
        priority: 0.8,
      });
    }

    // Generate XML sitemap
    console.log(`Generating sitemap with ${urls.length} URLs...`);
    const xml = generateSitemapXML(urls);

    console.log('Sitemap generated successfully');

    return new Response(xml, {
      headers: {
        ...corsHeaders,
        'Content-Type': 'application/xml; charset=utf-8',
        'Cache-Control': 'public, max-age=3600', // Cache for 1 hour
      },
    });

  } catch (error) {
    console.error('Error generating sitemap:', error);
    const errorMessage = error instanceof Error ? error.message : 'Unknown error';
    return new Response(
      JSON.stringify({ 
        error: 'Failed to generate sitemap',
        message: errorMessage 
      }),
      {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      }
    );
  }
});

function generateSitemapXML(urls: SitemapUrl[]): string {
  const xmlUrls = urls.map(url => `
  <url>
    <loc>${escapeXml(url.loc)}</loc>
    <lastmod>${url.lastmod}</lastmod>
    <changefreq>${url.changefreq}</changefreq>
    <priority>${url.priority.toFixed(1)}</priority>
  </url>`).join('');

  return `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">${xmlUrls}
</urlset>`;
}

function escapeXml(unsafe: string): string {
  return unsafe.replace(/[<>&'"]/g, (c) => {
    switch (c) {
      case '<': return '&lt;';
      case '>': return '&gt;';
      case '&': return '&amp;';
      case '\'': return '&apos;';
      case '"': return '&quot;';
      default: return c;
    }
  });
}
