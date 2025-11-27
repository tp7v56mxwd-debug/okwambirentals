import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useRef } from "react";

const Location = () => {
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
    
    if (!mapboxToken || !mapContainer.current) return;

    // Dynamically import mapbox-gl only if token exists
    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = mapboxToken;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [13.2894, -8.8383], // Mussulo Peninsula coordinates
        zoom: 12
      });

      // Add marker for rental location
      new mapboxgl.default.Marker({ color: '#2B9ED9' })
        .setLngLat([13.2894, -8.8383])
        .setPopup(
          new mapboxgl.default.Popup().setHTML(
            '<h3 style="font-weight: bold; margin-bottom: 4px;">Okwambi Rentals</h3><p>Mussulo Peninsula, Luanda</p>'
          )
        )
        .addTo(map);

      // Cleanup
      return () => map.remove();
    });
  }, []);

  return (
    <section id="location" className="py-20 bg-gradient-to-br from-muted/20 via-background to-muted/30">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-primary to-accent mb-4">
            <MapPin className="w-8 h-8 text-primary-foreground" />
          </div>
          <h2 className="text-4xl md:text-5xl font-bold mb-4 text-foreground">
            Visit Us at Mussulo
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Located at the stunning Mussulo Peninsula, your adventure starts here.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-start">
          {/* Map */}
          <div className="w-full h-[400px] rounded-lg overflow-hidden shadow-lg border border-border">
            {import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN ? (
              <div ref={mapContainer} className="w-full h-full" />
            ) : (
              <div className="w-full h-full bg-muted flex items-center justify-center p-8 text-center">
                <div>
                  <MapPin className="w-16 h-16 text-muted-foreground mx-auto mb-4" />
                  <p className="text-muted-foreground">
                    Map requires Mapbox token configuration
                  </p>
                  <p className="text-sm text-muted-foreground mt-2">
                    Mussulo Peninsula, Luanda, Angola
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info */}
          <div className="space-y-6">
            <div className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Our Location</h3>
                  <p className="text-muted-foreground">
                    Mussulo Peninsula<br />
                    Luanda, Angola
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Phone</h3>
                  <p className="text-muted-foreground">+244 923 456 789</p>
                  <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Email</h3>
                  <p className="text-muted-foreground">info@okwambi.ao</p>
                  <p className="text-sm text-muted-foreground mt-1">We reply within 24 hours</p>
                </div>
              </div>
            </div>

            <div className="bg-card rounded-lg p-6 shadow-md border border-border hover:shadow-lg transition-shadow">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary" />
                </div>
                <div>
                  <h3 className="font-semibold text-foreground mb-2">Operating Hours</h3>
                  <p className="text-muted-foreground">
                    Monday - Sunday<br />
                    8:00 AM - 6:00 PM
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Location;
