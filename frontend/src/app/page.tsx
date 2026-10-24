// AGENT-CONTEXT: Main landing page for IITDeveloper.
// Uses Framer Motion for animations and Three.js (@react-three/fiber) for the Hero scene.
// Ensure any changes to the 3D canvas are strictly performance-tested.
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Clients from '@/components/sections/Clients';
import TechStack from '@/components/sections/TechStack';
import OpenSourceHighlight from '@/components/sections/OpenSourceHighlight';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';
import './homepage.css';

export default function HomePage() {
  return (
    <main className="relative homepage">
      <Header />
      <div className="homepage-hero" data-home-section="hero">
        <Hero />
      </div>
      <div data-home-section="services">
        <Services />
      </div>
      <div data-home-section="clients">
        <Clients />
      </div>
      <div data-home-section="technology">
        <TechStack />
      </div>
      <div data-home-section="open-source">
        <OpenSourceHighlight />
      </div>
      <div data-home-section="process">
        <Process />
      </div>
      <div data-home-section="testimonials">
        <Testimonials />
      </div>
      <div data-home-section="consultation">
        <CTA />
      </div>
      <Footer />
    </main>
  );
}
