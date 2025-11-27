import Navigation from "@/components/Navigation";
import Hero from "@/components/Hero";
import About from "@/components/About";
import Properties from "@/components/Properties";
import Testimonials from "@/components/Testimonials";
import Location from "@/components/Location";
import Contact from "@/components/Contact";
import Footer from "@/components/Footer";
import WhatsAppButton from "@/components/WhatsAppButton";
import BackToTop from "@/components/BackToTop";
import ScrollProgress from "@/components/ScrollProgress";
import SkipToContent from "@/components/SkipToContent";

const Index = () => {
  return (
    <>
      <SkipToContent />
      <ScrollProgress />
      <main id="main-content" className="min-h-screen">
        <Navigation />
        <Hero />
        <About />
        <Properties />
        <Testimonials />
        <Location />
        <Contact />
        <Footer />
        <WhatsAppButton />
        <BackToTop />
      </main>
    </>
  );
};

export default Index;
