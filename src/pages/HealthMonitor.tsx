import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { supabase } from "@/integrations/supabase/client";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { CheckCircle, XCircle, AlertTriangle, RefreshCw } from "lucide-react";
import { format } from "date-fns";
import { toast } from "sonner";

interface HealthCheck {
  id: string;
  status: 'healthy' | 'warning' | 'critical';
  checks: {
    database: boolean;
    bookings: boolean;
    vehiclePhotos: boolean;
    rls: boolean;
  };
  errors: string[];
  warnings: string[];
  created_at: string;
}

const HealthMonitor = () => {
  const navigate = useNavigate();
  const [healthChecks, setHealthChecks] = useState<HealthCheck[]>([]);
  const [loading, setLoading] = useState(true);
  const [runningCheck, setRunningCheck] = useState(false);

  useEffect(() => {
    checkAdminAccess();
    fetchHealthChecks();
  }, []);

  const checkAdminAccess = async () => {
    const { data: { user } } = await supabase.auth.getUser();
    
    if (!user) {
      toast.error("Please login to access this page");
      navigate("/auth");
      return;
    }

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .eq("role", "admin")
      .single();

    if (!roleData) {
      toast.error("Admin access required");
      navigate("/");
    }
  };

  const fetchHealthChecks = async () => {
    try {
      const { data, error } = await supabase
        .from("health_checks")
        .select("*")
        .order("created_at", { ascending: false })
        .limit(20);

      if (error) throw error;
      setHealthChecks((data || []) as HealthCheck[]);
    } catch (error) {
      console.error("Error fetching health checks:", error);
      toast.error("Failed to load health checks");
    } finally {
      setLoading(false);
    }
  };

  const runHealthCheck = async () => {
    setRunningCheck(true);
    try {
      const { data, error } = await supabase.functions.invoke("health-monitor");
      
      if (error) throw error;
      
      toast.success("Health check completed");
      fetchHealthChecks(); // Refresh the list
    } catch (error) {
      console.error("Error running health check:", error);
      toast.error("Failed to run health check");
    } finally {
      setRunningCheck(false);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'healthy':
        return <Badge className="bg-green-500"><CheckCircle className="w-3 h-3 mr-1" /> Healthy</Badge>;
      case 'warning':
        return <Badge className="bg-yellow-500"><AlertTriangle className="w-3 h-3 mr-1" /> Warning</Badge>;
      case 'critical':
        return <Badge className="bg-red-500"><XCircle className="w-3 h-3 mr-1" /> Critical</Badge>;
      default:
        return <Badge>{status}</Badge>;
    }
  };

  const getCheckIcon = (passed: boolean) => {
    return passed 
      ? <CheckCircle className="w-4 h-4 text-green-500" />
      : <XCircle className="w-4 h-4 text-red-500" />;
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p>Loading...</p>
      </div>
    );
  }

  const latestCheck = healthChecks[0];

  return (
    <>
      <Navigation />
      <main className="container mx-auto py-8 px-4 mt-20">
        <div className="max-w-6xl mx-auto space-y-6">
          <div className="flex justify-between items-center">
            <h1 className="text-3xl font-bold">System Health Monitor</h1>
            <Button onClick={runHealthCheck} disabled={runningCheck}>
              <RefreshCw className={`w-4 h-4 mr-2 ${runningCheck ? 'animate-spin' : ''}`} />
              Run Check Now
            </Button>
          </div>

          {latestCheck && (
            <Card>
              <CardHeader>
                <div className="flex justify-between items-center">
                  <CardTitle>Latest Status</CardTitle>
                  {getStatusBadge(latestCheck.status)}
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <div className="flex items-center gap-2">
                    {getCheckIcon(latestCheck.checks.database)}
                    <span>Database</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCheckIcon(latestCheck.checks.bookings)}
                    <span>Bookings</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCheckIcon(latestCheck.checks.vehiclePhotos)}
                    <span>Vehicle Photos</span>
                  </div>
                  <div className="flex items-center gap-2">
                    {getCheckIcon(latestCheck.checks.rls)}
                    <span>RLS Policies</span>
                  </div>
                </div>

                {latestCheck.errors.length > 0 && (
                  <Alert variant="destructive">
                    <AlertDescription>
                      <strong>Errors:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {latestCheck.errors.map((error, i) => (
                          <li key={i}>{error}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                {latestCheck.warnings.length > 0 && (
                  <Alert>
                    <AlertDescription>
                      <strong>Warnings:</strong>
                      <ul className="list-disc list-inside mt-2">
                        {latestCheck.warnings.map((warning, i) => (
                          <li key={i}>{warning}</li>
                        ))}
                      </ul>
                    </AlertDescription>
                  </Alert>
                )}

                <p className="text-sm text-muted-foreground">
                  Last checked: {format(new Date(latestCheck.created_at), "PPpp")}
                </p>
              </CardContent>
            </Card>
          )}

          <Card>
            <CardHeader>
              <CardTitle>Check History</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="space-y-2">
                {healthChecks.map((check) => (
                  <div 
                    key={check.id} 
                    className="flex justify-between items-center p-3 border rounded-lg hover:bg-muted/50"
                  >
                    <div className="flex items-center gap-4">
                      {getStatusBadge(check.status)}
                      <span className="text-sm text-muted-foreground">
                        {format(new Date(check.created_at), "PPpp")}
                      </span>
                    </div>
                    <div className="flex gap-2">
                      {Object.entries(check.checks).map(([key, value]) => (
                        <div key={key} title={key}>
                          {value ? (
                            <CheckCircle className="w-4 h-4 text-green-500" />
                          ) : (
                            <XCircle className="w-4 h-4 text-red-500" />
                          )}
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>

              {healthChecks.length === 0 && (
                <p className="text-center text-muted-foreground py-8">
                  No health checks recorded yet. Click "Run Check Now" to start monitoring.
                </p>
              )}
            </CardContent>
          </Card>

          <Alert>
            <AlertDescription>
              <strong>Automatic Monitoring:</strong> O sistema executa verificações de saúde automaticamente a cada hora. 
              Em caso de problemas críticos, uma notificação será enviada via WhatsApp.
            </AlertDescription>
          </Alert>
        </div>
      </main>
      <Footer />
    </>
  );
};

export default HealthMonitor;
