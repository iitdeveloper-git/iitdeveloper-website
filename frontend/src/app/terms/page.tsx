'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { FileText, Shield, Gavel, Scale, AlertCircle, HelpCircle } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

export default function TermsPage() {
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
                <FileText className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold tracking-wide text-primary">LEGAL DOCUMENTS</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Terms and <span className="gradient-text">Conditions</span>
              </h1>
              <p className="text-muted-foreground/80 font-light">
                Last updated: July 7, 2026. Please read these terms carefully before using our services.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div variants={fadeInUp}>
              <Card glass premium className="bg-card/50 backdrop-blur-xl border-white/[0.08]">
                <CardContent className="p-8 sm:p-12 space-y-10">
                  {/* Section 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Shield className="w-5 h-5" />
                      <h2 className="text-xl font-bold">1. Agreement to Terms</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      By accessing or using the services provided by IITDeveloper ("we," "us," or "our"), you agree to be bound by these Terms and Conditions. If you do not agree with any part of these terms, you must not access or use our services.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Scale className="w-5 h-5" />
                      <h2 className="text-xl font-bold">2. Intellectual Property Rights</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Unless otherwise stated, all materials, code, designs, graphics, and intellectual property developed by us during the provision of services remain our property until full payment is received. Upon complete payment, the client is granted a non-exclusive, perpetual, worldwide license to use the developed software/materials for their designated business purposes.
                    </p>
                  </div>

                  {/* Section 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Gavel className="w-5 h-5" />
                      <h2 className="text-xl font-bold">3. User Responsibilities & Acceptable Use</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      You agree not to use our developed applications or website services for any unlawful purpose, to distribute malicious software, or to violate any third-party intellectual property or privacy rights. You are solely responsible for securing and maintaining any database access credentials or server details shared during project collaboration.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <AlertCircle className="w-5 h-5" />
                      <h2 className="text-xl font-bold">4. Limitation of Liability</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      To the maximum extent permitted by law, IITDeveloper shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, resulting from your use or inability to use our services, server downtimes, database failures, or third-party API deprecations.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <HelpCircle className="w-5 h-5" />
                      <h2 className="text-xl font-bold">5. Governing Law</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      These Terms and Conditions shall be governed by and construed in accordance with the laws of India, without regard to its conflict of law provisions. Any legal action or proceeding arising under these terms shall be subject to the exclusive jurisdiction of the courts located in Delhi, India.
                    </p>
                  </div>

                  {/* Section 6 */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">6. Contact Information</h2>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      If you have any questions or concerns regarding these Terms and Conditions, please contact us at:
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] inline-block">
                      <p className="text-sm font-semibold text-foreground">IITDeveloper Legal Team</p>
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
