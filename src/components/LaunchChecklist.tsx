import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { AlertTriangle, CheckCircle2, XCircle, ArrowRight, Image, Star, Shield } from 'lucide-react';
import { Badge } from '@/components/ui/badge';

interface ChecklistItem {
  id: string;
  label: string;
  status: 'complete' | 'warning' | 'critical';
  action?: string;
  route?: string;
}

export function LaunchChecklist() {
  const navigate = useNavigate();
  const [checklist, setChecklist] = useState<ChecklistItem[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    checkLaunchReadiness();
  }, []);

  const checkLaunchReadiness = async () => {
    const items: ChecklistItem[] = [];

    try {
      // Check vehicle photos
      const { data: photos } = await supabase
        .from('vehicle_photos')
        .select('vehicle_type');

      const jetskiPhotos = photos?.filter(p => p.vehicle_type === 'jetski').length || 0;
      const atvPhotos = photos?.filter(p => p.vehicle_type === 'atv').length || 0;
      const utvPhotos = photos?.filter(p => p.vehicle_type === 'utv').length || 0;

      items.push({
        id: 'jetski_photos',
        label: `Jet Ski Photos (${jetskiPhotos} uploaded)`,
        status: jetskiPhotos >= 3 ? 'complete' : 'critical',
        action: jetskiPhotos < 3 ? 'Add at least 3 photos' : undefined,
        route: '/vehicle-photos'
      });

      items.push({
        id: 'atv_photos',
        label: `ATV Photos (${atvPhotos} uploaded)`,
        status: atvPhotos >= 3 ? 'complete' : 'critical',
        action: atvPhotos < 3 ? 'Add at least 3 photos' : undefined,
        route: '/vehicle-photos'
      });

      items.push({
        id: 'utv_photos',
        label: `UTV Photos (${utvPhotos} uploaded)`,
        status: utvPhotos >= 3 ? 'complete' : 'critical',
        action: utvPhotos < 3 ? 'Add at least 3 photos' : undefined,
        route: '/vehicle-photos'
      });

      // Check reviews
      const { data: reviews } = await supabase
        .from('reviews')
        .select('id')
        .eq('status', 'approved');

      const reviewCount = reviews?.length || 0;
      items.push({
        id: 'reviews',
        label: `Customer Reviews (${reviewCount} approved)`,
        status: reviewCount >= 3 ? 'complete' : 'warning',
        action: reviewCount < 3 ? 'Consider adding testimonials' : undefined,
        route: '/admin/reviews'
      });

      // Security checks
      items.push({
        id: 'leaked_password',
        label: 'Leaked Password Protection',
        status: 'warning',
        action: 'Enable in Auth Settings',
      });

      items.push({
        id: 'email_confirmation',
        label: 'Email Confirmation',
        status: 'warning',
        action: 'Recommended to enable for production',
      });

      setChecklist(items);
    } catch (error) {
      console.error('Error checking launch readiness:', error);
    } finally {
      setLoading(false);
    }
  };

  const getStatusIcon = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return <CheckCircle2 className="h-5 w-5 text-green-500" />;
      case 'warning':
        return <AlertTriangle className="h-5 w-5 text-yellow-500" />;
      case 'critical':
        return <XCircle className="h-5 w-5 text-destructive" />;
    }
  };

  const getStatusBadge = (status: ChecklistItem['status']) => {
    switch (status) {
      case 'complete':
        return <Badge variant="default" className="bg-green-500">Ready</Badge>;
      case 'warning':
        return <Badge variant="secondary" className="bg-yellow-500">Review</Badge>;
      case 'critical':
        return <Badge variant="destructive">Action Required</Badge>;
    }
  };

  const criticalCount = checklist.filter(i => i.status === 'critical').length;
  const warningCount = checklist.filter(i => i.status === 'warning').length;
  const completeCount = checklist.filter(i => i.status === 'complete').length;

  if (loading) {
    return null;
  }

  // Only show if there are critical or warning items
  if (criticalCount === 0 && warningCount === 0) {
    return null;
  }

  return (
    <Card className="border-yellow-500/50 bg-yellow-50 dark:bg-yellow-950/20">
      <CardHeader>
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Shield className="h-5 w-5 text-yellow-600" />
            <CardTitle className="text-yellow-900 dark:text-yellow-100">
              Pre-Launch Checklist
            </CardTitle>
          </div>
          <div className="flex gap-2">
            <Badge variant="outline" className="bg-green-50">
              {completeCount} Ready
            </Badge>
            {warningCount > 0 && (
              <Badge variant="outline" className="bg-yellow-50">
                {warningCount} Review
              </Badge>
            )}
            {criticalCount > 0 && (
              <Badge variant="destructive">
                {criticalCount} Critical
              </Badge>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-3">
        {criticalCount > 0 && (
          <Alert variant="destructive">
            <AlertTriangle className="h-4 w-4" />
            <AlertTitle>Critical Items Need Attention</AlertTitle>
            <AlertDescription>
              Your website has {criticalCount} critical item(s) that must be addressed before launch.
            </AlertDescription>
          </Alert>
        )}

        <div className="space-y-2">
          {checklist.map((item) => (
            <div
              key={item.id}
              className="flex items-center justify-between p-3 rounded-lg bg-background border"
            >
              <div className="flex items-center gap-3 flex-1">
                {getStatusIcon(item.status)}
                <div className="flex-1">
                  <p className="font-medium text-sm">{item.label}</p>
                  {item.action && (
                    <p className="text-xs text-muted-foreground">{item.action}</p>
                  )}
                </div>
              </div>
              <div className="flex items-center gap-2">
                {getStatusBadge(item.status)}
                {item.route && (
                  <Button
                    size="sm"
                    variant="ghost"
                    onClick={() => navigate(item.route!)}
                  >
                    Fix <ArrowRight className="h-3 w-3 ml-1" />
                  </Button>
                )}
              </div>
            </div>
          ))}
        </div>

        <Alert>
          <Shield className="h-4 w-4" />
          <AlertTitle>Security Settings</AlertTitle>
          <AlertDescription>
            Some security settings should be reviewed in your Cloud backend settings.
            <Button
              variant="link"
              className="p-0 h-auto font-normal ml-1"
              onClick={() => window.open('https://docs.lovable.dev/features/security', '_blank')}
            >
              View Security Docs
            </Button>
          </AlertDescription>
        </Alert>
      </CardContent>
    </Card>
  );
}
