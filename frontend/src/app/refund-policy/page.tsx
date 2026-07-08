'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { BadgeAlert, RotateCcw, AlertTriangle, ShieldAlert, Sparkles } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

export default function RefundPolicyPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto"
          >
            {/* Header */}
            <motion.div variants={fadeInUp} className="text-center mb-16">
              <div className="inline-flex items-center space-x-2 glass border-2 border-primary/30 px-5 py-2.5 rounded-full mb-6 shadow-glow">
                <BadgeAlert className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold tracking-wide text-primary">BILLING POLICY</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Refund and <span className="gradient-text">Cancellation</span>
              </h1>
              <p className="text-muted-foreground/80 font-light">
                Last updated: July 7, 2026. Review our terms for service cancellations and refund eligibility.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div variants={fadeInUp}>
              <Card glass premium className="bg-card/50 backdrop-blur-xl border-white/[0.08]">
                <CardContent className="p-8 sm:p-12 space-y-10">
                  {/* Section 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <ShieldAlert className="w-5 h-5" />
                      <h2 className="text-xl font-bold">1. Project Cancellations</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Clients may request to cancel an ongoing design or development project. To initiate a cancellation, a written request must be submitted directly to your assigned project manager or via email to <a href="mailto:info@iitdeveloper.com" className="text-primary hover:underline">info@iitdeveloper.com</a>.
                    </p>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Upon receipt of a cancellation request, we will immediately cease all work on the project. The client will be billed for all hours incurred or milestones completed up to the date of cancellation.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <RotateCcw className="w-5 h-5" />
                      <h2 className="text-xl font-bold">2. Refund Eligibility</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Because our agency provides custom digital solutions (custom software, website development, UI/UX design, and AI automation), refund eligibility is strictly defined as follows:
                    </p>
                    <ul className="list-disc list-inside pl-4 text-muted-foreground/80 font-light space-y-2 text-sm">
                      <li><strong>Setup / Advance Fees:</strong> Advance deposits or onboarding fees are non-refundable once design or development research has commenced.</li>
                      <li><strong>Completed Milestones:</strong> Any milestone that has been signed off, approved, or delivered is fully non-refundable.</li>
                      <li><strong>Work in Progress:</strong> In the event of project cancellation mid-milestone, a partial refund of the milestone deposit may be granted based on the percentage of work remaining, at our sole discretion.</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <AlertTriangle className="w-5 h-5" />
                      <h2 className="text-xl font-bold">3. Service Subscriptions</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      For recurring maintenance, DevOps hosting, or retainer agreements:
                    </p>
                    <ul className="list-disc list-inside pl-4 text-muted-foreground/80 font-light space-y-2 text-sm">
                      <li>Subscriptions can be cancelled at any time and will take effect at the end of the current billing cycle.</li>
                      <li>We do not offer pro-rated refunds for partial months of service.</li>
                    </ul>
                  </div>

                  {/* Contact */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">4. Billing Inquiries</h2>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      If you have questions about an invoice, charge, or wish to discuss project cancellation settlement options, please contact our billing desk:
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] inline-block">
                      <p className="text-sm font-semibold text-foreground">IITDeveloper Billing & Finance</p>
                      <p className="text-sm text-muted-foreground">Email: <a href="mailto:info@iitdeveloper.com" className="text-primary hover:underline">info@iitdeveloper.com</a></p>
                      <p className="text-sm text-muted-foreground">Phone: +91 73027 55534</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
