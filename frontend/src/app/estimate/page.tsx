import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import PricingEstimator from '@/components/pricing/PricingEstimator';
import { generateSEO } from '@/lib/seo';

export const metadata: Metadata = generateSEO({ title: 'Project Estimate', description: 'Build an indicative IITDEVELOPER project range. Final scope and pricing depend on discovery and confirmed requirements.', canonical: '/estimate' });

export default function EstimatePage() {
  return (
    <>
      <Header />
      <PricingEstimator />
      <Footer />
    </>
  );
}
