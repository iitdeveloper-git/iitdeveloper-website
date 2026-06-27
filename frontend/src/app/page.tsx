// AGENT-CONTEXT: Main landing page for IITDeveloper.
// Uses Framer Motion for animations and Three.js (@react-three/fiber) for the Hero scene.
// Ensure any changes to the 3D canvas are strictly performance-tested.
import PageShell from '@/components/layout/PageShell';
import Hero from '@/components/sections/Hero';
import Services from '@/components/sections/Services';
import TechStack from '@/components/sections/TechStack';
import Process from '@/components/sections/Process';
import CTA from '@/components/sections/CTA';
import Trust from '@/components/sections/Trust';
import SelectedWork from '@/components/sections/SelectedWork';
import InsightsPreview from '@/components/sections/InsightsPreview';

export default function HomePage() {
  return (
    <PageShell>
      <Hero />
      <Trust />
      <Services />
      <SelectedWork />
      <TechStack />
      <Process />
      <InsightsPreview />
      <CTA />
    </PageShell>
  );
}
