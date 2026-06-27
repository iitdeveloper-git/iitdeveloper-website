import { Metadata } from 'next';
import Header from '@/components/layout/Header';
import PricingEstimator from '@/components/pricing/PricingEstimator';

export const metadata: Metadata = {
  title: 'Project Estimator | IITDeveloper',
  description:
    'Get an instant estimate for your project. Configure services, select features, and receive a detailed quote in minutes.',
  openGraph: {
    title: 'Project Estimator | IITDeveloper',
    description:
      'Get an instant estimate for your project. Configure services, select features, and receive a detailed quote in minutes.',
  },
};

export default function EstimatePage() {
  return (
    <>
      <Header />
      <PricingEstimator />
    </>
  );
}
