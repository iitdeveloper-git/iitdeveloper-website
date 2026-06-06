import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import Clients from '@/components/sections/Clients';
import TechStack from '@/components/sections/TechStack';
import Process from '@/components/sections/Process';
import Testimonials from '@/components/sections/Testimonials';
import CTA from '@/components/sections/CTA';

export default function HomePage() {
  return (
    <main className="relative">
      <Header />
      <Hero />
      <Services />
      <Clients />
      <TechStack />
      <Process />
      <Testimonials />
      <CTA />
      <Footer />
    </main>
  );
}
