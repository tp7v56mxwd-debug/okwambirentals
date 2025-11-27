import { MapPin, Phone, Mail, Clock } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTranslation } from 'react-i18next';
import { useIntersectionObserver } from '@/hooks/useIntersectionObserver';

const Location = () => {
  const { t } = useTranslation();
  const { ref, isVisible } = useIntersectionObserver();
  const mapContainer = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const mapboxToken = import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN;
    
    if (!mapboxToken || !mapContainer.current) return;

    import('mapbox-gl').then((mapboxgl) => {
      mapboxgl.default.accessToken = mapboxToken;

      const map = new mapboxgl.default.Map({
        container: mapContainer.current!,
        style: 'mapbox://styles/mapbox/streets-v12',
        center: [13.2894, -8.8383],
        zoom: 12
      });

      new mapboxgl.default.Marker({ color: '#1C2331' })
        .setLngLat([13.2894, -8.8383])
        .setPopup(
          new mapboxgl.default.Popup().setHTML(
            '<div style="font-family: Inter, sans-serif; padding: 4px;"><h3 style="font-weight: 700; margin-bottom: 4px; font-size: 16px;">Okwambi Rentals</h3><p style="color: #666; font-size: 14px;">Mussulo Peninsula, Luanda</p></div>'
          )
        )
        .addTo(map);

      return () => map.remove();
    });
  }, []);

  return (
    <section id="location" className="py-32 relative overflow-hidden bg-gradient-to-b from-muted/20 via-background to-muted/20">
      {/* Background Elements */}
      <div className="absolute top-0 left-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[600px] bg-accent/5 rounded-full blur-3xl" />
      
      <div ref={ref} className={`container mx-auto px-6 lg:px-8 relative transition-all duration-1000 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10'}`}>
        {/* Section Header */}
        <div className="max-w-3xl mx-auto text-center mb-20">
          <div className="inline-flex items-center gap-2 px-4 py-2 bg-primary/5 border border-primary/10 rounded-full mb-6">
            <MapPin className="w-5 h-5 text-primary" strokeWidth={1.5} />
            <span className="text-primary text-sm font-semibold tracking-widest uppercase">{t('location.badge')}</span>
          </div>
          
          <h2 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold mb-6 text-foreground leading-tight">
            {t('location.title1')}
            <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary via-accent to-accent-glow">{t('location.title2')}</span>
          </h2>
          
          <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
            {t('location.description')}
          </p>
        </div>

        <div className="max-w-6xl mx-auto grid lg:grid-cols-2 gap-8">
          {/* Map */}
          <div className="w-full h-[500px] rounded-2xl overflow-hidden shadow-luxury border border-border/50">
            {import.meta.env.VITE_MAPBOX_PUBLIC_TOKEN ? (
              <div ref={mapContainer} className="w-full h-full" />
            ) : (
              <div className="w-full h-full bg-gradient-to-br from-primary/5 to-accent/5 flex items-center justify-center p-8 text-center">
                <div>
                  <div className="w-16 h-16 rounded-xl bg-primary/10 flex items-center justify-center mx-auto mb-4">
                    <MapPin className="w-8 h-8 text-primary" strokeWidth={1.5} />
                  </div>
                  <p className="font-display text-lg font-semibold text-foreground mb-2">
                    {t('location.map')}
                  </p>
                  <p className="text-muted-foreground text-sm">
                    {t('location.mapLocation')}
                  </p>
                </div>
              </div>
            )}
          </div>

          {/* Contact Info Cards */}
          <div className="space-y-6">
            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/20 hover:shadow-premium transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t('location.address.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('location.address.line1')}<br />
                    {t('location.address.line2')}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/20 hover:shadow-premium transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t('location.phone.title')}</h3>
                  <p className="text-muted-foreground">{t('location.phone.number')}</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">{t('location.phone.availability')}</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/20 hover:shadow-premium transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <Mail className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t('location.email.title')}</h3>
                  <p className="text-muted-foreground">{t('location.email.address')}</p>
                  <p className="text-sm text-muted-foreground/70 mt-1">{t('location.email.response')}</p>
                </div>
              </div>
            </div>

            <div className="bg-card/50 backdrop-blur-sm rounded-2xl p-8 border border-border/50 hover:border-primary/20 hover:shadow-premium transition-all">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-primary-light flex items-center justify-center flex-shrink-0">
                  <Clock className="w-6 h-6 text-primary-foreground" strokeWidth={1.5} />
                </div>
                <div>
                  <h3 className="font-display text-lg font-bold text-foreground mb-2">{t('location.hours.title')}</h3>
                  <p className="text-muted-foreground">
                    {t('location.hours.days')}<br />
                    {t('location.hours.time')}
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
