import { createClient } from 'https://esm.sh/@supabase/supabase-js@2.39.3';

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type, x-health-secret',
};

interface HealthCheck {
  status: 'healthy' | 'warning' | 'critical';
  timestamp: string;
  checks: {
    database: boolean;
    bookings: boolean;
    vehiclePhotos: boolean;
    rls: boolean;
  };
  errors: string[];
  warnings: string[];
}

Deno.serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    // Verify shared secret for authentication
    const healthSecret = req.headers.get('x-health-secret');
    const expectedSecret = Deno.env.get('HEALTH_MONITOR_SECRET');
    
    // Also allow requests with valid admin JWT
    const authHeader = req.headers.get('authorization');
    let isAuthorized = false;
    
    // Check shared secret first (for pg_cron calls)
    if (expectedSecret && healthSecret === expectedSecret) {
      isAuthorized = true;
      console.log('Authorized via shared secret');
    }
    
    // If no shared secret match, check for admin JWT
    if (!isAuthorized && authHeader) {
      const token = authHeader.replace('Bearer ', '');
      const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
      const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!;
      
      const authClient = createClient(supabaseUrl, supabaseAnonKey, {
        global: { headers: { Authorization: `Bearer ${token}` } }
      });
      
      const { data: { user } } = await authClient.auth.getUser();
      if (user) {
        // Check admin role
        const { data: roleData } = await authClient
          .from('user_roles')
          .select('role')
          .eq('user_id', user.id)
          .eq('role', 'admin')
          .single();
        
        if (roleData) {
          isAuthorized = true;
          console.log(`Authorized via admin JWT: ${user.id}`);
        }
      }
    }
    
    // If still not authorized, reject
    if (!isAuthorized) {
      console.log('Unauthorized health check attempt');
      return new Response(
        JSON.stringify({ error: 'Unauthorized' }),
        { 
          status: 401, 
          headers: { ...corsHeaders, 'Content-Type': 'application/json' } 
        }
      );
    }

    console.log('Starting health check...');
    
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!;
    const supabaseKey = Deno.env.get('SUPABASE_SERVICE_ROLE_KEY')!;
    const supabase = createClient(supabaseUrl, supabaseKey);

    const healthCheck: HealthCheck = {
      status: 'healthy',
      timestamp: new Date().toISOString(),
      checks: {
        database: false,
        bookings: false,
        vehiclePhotos: false,
        rls: false,
      },
      errors: [],
      warnings: [],
    };

    // Check 1: Database connectivity
    try {
      const { error } = await supabase.from('profiles').select('id').limit(1);
      if (error) throw error;
      healthCheck.checks.database = true;
      console.log('✓ Database connectivity check passed');
    } catch (error) {
      healthCheck.checks.database = false;
      const errorMsg = error instanceof Error ? error.message : String(error);
      healthCheck.errors.push(`Database connectivity failed: ${errorMsg}`);
      console.error('✗ Database connectivity check failed:', error);
    }

    // Check 2: Bookings table
    try {
      const { data, error } = await supabase
        .from('bookings')
        .select('id, status, booking_date')
        .limit(1);
      
      if (error) throw error;
      healthCheck.checks.bookings = true;
      console.log('✓ Bookings table check passed');

      // Check for pending bookings older than 7 days
      const sevenDaysAgo = new Date();
      sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);
      
      const { data: oldBookings } = await supabase
        .from('bookings')
        .select('id')
        .eq('status', 'pending')
        .lt('created_at', sevenDaysAgo.toISOString());
      
      if (oldBookings && oldBookings.length > 0) {
        healthCheck.warnings.push(`Found ${oldBookings.length} pending bookings older than 7 days`);
      }
    } catch (error) {
      healthCheck.checks.bookings = false;
      const errorMsg = error instanceof Error ? error.message : String(error);
      healthCheck.errors.push(`Bookings table check failed: ${errorMsg}`);
      console.error('✗ Bookings table check failed:', error);
    }

    // Check 3: Vehicle photos
    try {
      const { data, error } = await supabase
        .from('vehicle_photos')
        .select('id, vehicle_type')
        .limit(1);
      
      if (error) throw error;
      healthCheck.checks.vehiclePhotos = true;
      console.log('✓ Vehicle photos check passed');

      // Check if we have photos for all vehicle types
      const { data: photoCounts } = await supabase
        .from('vehicle_photos')
        .select('vehicle_type');
      
      const vehicleTypes = ['ATV Premium', 'Jet Ski Premium', 'UTV Premium'];
      const existingTypes = new Set(photoCounts?.map(p => p.vehicle_type) || []);
      
      vehicleTypes.forEach(type => {
        if (!existingTypes.has(type)) {
          healthCheck.warnings.push(`No photos found for ${type}`);
        }
      });
    } catch (error) {
      healthCheck.checks.vehiclePhotos = false;
      const errorMsg = error instanceof Error ? error.message : String(error);
      healthCheck.errors.push(`Vehicle photos check failed: ${errorMsg}`);
      console.error('✗ Vehicle photos check failed:', error);
    }

    // Check 4: RLS policies (test with anon key)
    try {
      const anonClient = createClient(
        supabaseUrl,
        Deno.env.get('SUPABASE_ANON_KEY')!
      );
      
      // This should work with RLS (public can view approved reviews)
      const { error: rlsError } = await anonClient
        .from('reviews')
        .select('id')
        .eq('status', 'approved')
        .limit(1);
      
      if (rlsError && rlsError.code !== 'PGRST116') { // PGRST116 is "no rows found" which is ok
        throw rlsError;
      }
      
      healthCheck.checks.rls = true;
      console.log('✓ RLS policies check passed');
    } catch (error) {
      healthCheck.checks.rls = false;
      const errorMsg = error instanceof Error ? error.message : String(error);
      healthCheck.errors.push(`RLS policies check failed: ${errorMsg}`);
      console.error('✗ RLS policies check failed:', error);
    }

    // Determine overall status
    if (healthCheck.errors.length > 0) {
      healthCheck.status = 'critical';
    } else if (healthCheck.warnings.length > 0) {
      healthCheck.status = 'warning';
    }

    // Log summary
    console.log('\n=== Health Check Summary ===');
    console.log(`Status: ${healthCheck.status.toUpperCase()}`);
    console.log(`Errors: ${healthCheck.errors.length}`);
    console.log(`Warnings: ${healthCheck.warnings.length}`);
    
    if (healthCheck.errors.length > 0) {
      console.log('\nErrors:');
      healthCheck.errors.forEach(error => console.log(`  - ${error}`));
    }
    
    if (healthCheck.warnings.length > 0) {
      console.log('\nWarnings:');
      healthCheck.warnings.forEach(warning => console.log(`  - ${warning}`));
    }

    // Save health check to database
    try {
      const { error: insertError } = await supabase
        .from('health_checks')
        .insert({
          status: healthCheck.status,
          checks: healthCheck.checks,
          errors: healthCheck.errors,
          warnings: healthCheck.warnings,
        });
      
      if (insertError) {
        console.error('Failed to save health check:', insertError);
      } else {
        console.log('✓ Health check saved to database');
      }
    } catch (error) {
      console.error('Error saving health check:', error);
    }

    // Send WhatsApp notification if critical
    if (healthCheck.status === 'critical') {
      console.log('\n⚠️  CRITICAL ISSUES DETECTED - Sending admin notification');
      
      const adminNumber = Deno.env.get('ADMIN_WHATSAPP_NUMBER');
      if (adminNumber) {
        try {
          const message = `🚨 *ALERTA CRÍTICO - Okwambi Rentals*\n\n` +
            `⏰ ${new Date().toLocaleString('pt-PT', { timeZone: 'Africa/Luanda' })}\n\n` +
            `*Status:* ${healthCheck.status.toUpperCase()}\n\n` +
            `*Erros Detectados:*\n${healthCheck.errors.map(e => `❌ ${e}`).join('\n')}\n\n` +
            (healthCheck.warnings.length > 0 
              ? `*Avisos:*\n${healthCheck.warnings.map(w => `⚠️ ${w}`).join('\n')}\n\n`
              : '') +
            `Por favor, verifique o sistema imediatamente.`;
          
          const whatsappUrl = `https://wa.me/${adminNumber}?text=${encodeURIComponent(message)}`;
          console.log(`Admin notification prepared: ${whatsappUrl.substring(0, 100)}...`);
          
          // Log notification (in production, you'd actually send this)
          console.log('✓ Admin notification prepared');
        } catch (notifyError) {
          console.error('Failed to prepare notification:', notifyError);
        }
      } else {
        console.log('⚠️ ADMIN_WHATSAPP_NUMBER not configured - skipping notification');
      }
    }

    return new Response(
      JSON.stringify(healthCheck, null, 2),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: healthCheck.status === 'critical' ? 500 : 200
      }
    );

  } catch (error) {
    console.error('Health check failed:', error);
    const errorMsg = error instanceof Error ? error.message : String(error);
    return new Response(
      JSON.stringify({ 
        error: errorMsg,
        status: 'critical',
        timestamp: new Date().toISOString()
      }),
      { 
        headers: { 
          ...corsHeaders, 
          'Content-Type': 'application/json' 
        },
        status: 500 
      }
    );
  }
});
