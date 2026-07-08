'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Shield, Eye, Database, Share2, Key, Info } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

export default function PrivacyPage() {
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
                <Shield className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold tracking-wide text-primary">PRIVACY CONTROL</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Privacy <span className="gradient-text">Policy</span>
              </h1>
              <p className="text-muted-foreground/80 font-light">
                Last updated: July 7, 2026. Your privacy is paramount. Learn how we handle and protect your data.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div variants={fadeInUp}>
              <Card glass premium className="bg-card/50 backdrop-blur-xl border-white/[0.08]">
                <CardContent className="p-8 sm:p-12 space-y-10">
                  {/* Section 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Eye className="w-5 h-5" />
                      <h2 className="text-xl font-bold">1. Information We Collect</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      We collect information that you voluntarily provide to us when submitting lead generation forms, subscribing to newsletters, or contacting us directly. This information includes:
                    </p>
                    <ul className="list-disc list-inside pl-4 text-muted-foreground/80 font-light space-y-2 text-sm">
                      <li>Personal details: Name, Email address, Phone number, and Company name.</li>
                      <li>Project details: Target budget range, service type selected, and custom project descriptions.</li>
                      <li>Resume and profile links (such as LinkedIn/GitHub) if submitting career applications.</li>
                    </ul>
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Database className="w-5 h-5" />
                      <h2 className="text-xl font-bold">2. How We Use Your Information</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      The information collected is used solely to deliver premium agency services, including:
                    </p>
                    <ul className="list-disc list-inside pl-4 text-muted-foreground/80 font-light space-y-2 text-sm">
                      <li>Responding to client project inquiries and generating custom estimates.</li>
                      <li>Automated email updates regarding service milestones or proposals.</li>
                      <li>Improving website layout and functionality through anonymous user analytics.</li>
                      <li>Evaluating candidates who submit job applications.</li>
                    </ul>
                  </div>

                  {/* Section 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Share2 className="w-5 h-5" />
                      <h2 className="text-xl font-bold">3. Information Sharing and Disclosure</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      We do not sell, trade, or rent your personal identification information to third parties. We may share information with trusted third-party service providers (such as Resend for email delivery or Neon for serverless database hosting) solely to execute operations required for your project.
                    </p>
                  </div>

                  {/* Section 4 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Key className="w-5 h-5" />
                      <h2 className="text-xl font-bold">4. Data Security & Retention</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      We adopt industry-standard data collection, storage, processing practices, and security measures to protect against unauthorized access, alteration, disclosure, or destruction of your personal data. We retain personal information only as long as necessary to fulfill the business transactions agreed upon.
                    </p>
                  </div>

                  {/* Section 5 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Info className="w-5 h-5" />
                      <h2 className="text-xl font-bold">5. GDPR & CCPA Compliance Rights</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Depending on your location, you may have specific rights regarding your personal information, including the right to request access, correction, transfer, or complete erasure of your data. To exercise any of these rights, please email us directly.
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">6. Contact Privacy Officer</h2>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      For any inquiries regarding data protection and our privacy practices, please contact our privacy desk:
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] inline-block">
                      <p className="text-sm font-semibold text-foreground">IITDeveloper Data Protection Officer</p>
                      <p className="text-sm text-muted-foreground">Email: <a href="mailto:info@iitdeveloper.com" className="text-primary hover:underline">info@iitdeveloper.com</a></p>
                      <p className="text-sm text-muted-foreground">Address: Delhi, India</p>
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
