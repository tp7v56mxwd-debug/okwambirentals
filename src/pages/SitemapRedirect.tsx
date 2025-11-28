import { useEffect } from 'react';

const SitemapRedirect = () => {
  useEffect(() => {
    // Redirect to the edge function that generates the dynamic sitemap
    const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
    window.location.href = `${supabaseUrl}/functions/v1/generate-sitemap`;
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
        <p className="text-muted-foreground">Generating sitemap...</p>
      </div>
    </div>
  );
};

export default SitemapRedirect;
