'use client';

import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { Card, CardContent } from '@/components/ui/card';
import { Info, Shield, HelpCircle, Eye, Settings, List } from 'lucide-react';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

export default function CookiesPage() {
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
                <Info className="w-4 h-4 text-primary" />
                <span className="text-sm font-semibold tracking-wide text-primary">COOKIE INFO</span>
              </div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
                Cookie <span className="gradient-text">Policy</span>
              </h1>
              <p className="text-muted-foreground/80 font-light">
                Last updated: July 7, 2026. This policy explains what cookies are and how we use them on our website.
              </p>
            </motion.div>

            {/* Content Card */}
            <motion.div variants={fadeInUp}>
              <Card glass premium className="bg-card/50 backdrop-blur-xl border-white/[0.08]">
                <CardContent className="p-8 sm:p-12 space-y-10">
                  {/* Section 1 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <HelpCircle className="w-5 h-5" />
                      <h2 className="text-xl font-bold">1. What are Cookies?</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Cookies are small text files stored on your computer or mobile device when you visit a website. They are widely used to make websites work or run more efficiently, as well as to provide reporting information and assist with site personalization.
                    </p>
                  </div>

                  {/* Section 2 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Eye className="w-5 h-5" />
                      <h2 className="text-xl font-bold">2. How We Use Cookies</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      We use cookies to enhance your browsing experience, remember your form input state during multi-step estimates, analyze web traffic, and keep our services secure.
                    </p>
                  </div>

                  {/* Section 3 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <List className="w-5 h-5" />
                      <h2 className="text-xl font-bold">3. Types of Cookies We Use</h2>
                    </div>
                    <div className="space-y-4 pl-2">
                      <div>
                        <h3 className="font-bold text-foreground text-base mb-1">Essential Cookies</h3>
                        <p className="text-muted-foreground/80 font-light text-sm">
                          These cookies are necessary for the website to function properly. They enable core features such as security, network management, and page accessibility (e.g., preserving form inputs).
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base mb-1">Performance & Analytics Cookies</h3>
                        <p className="text-muted-foreground/80 font-light text-sm">
                          These cookies collect anonymous information about how visitors interact with our website, such as page views and link clicks. We use this data to find and fix bugs and improve performance.
                        </p>
                      </div>
                      <div>
                        <h3 className="font-bold text-foreground text-base mb-1">Functional & Preference Cookies</h3>
                        <p className="text-muted-foreground/80 font-light text-sm">
                          These cookies allow the site to remember choices you make (such as UI theme settings or specific project selections) to provide a more personalized experience.
                        </p>
                      </div>
                    </div>
                  </div>

                  {/* Section 4 */}
                  <div className="space-y-4">
                    <div className="flex items-center space-x-3 text-secondary">
                      <Settings className="w-5 h-5" />
                      <h2 className="text-xl font-bold">4. Controlling Cookies</h2>
                    </div>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      Most web browsers allow you to control cookies through their settings preferences. You can configure your browser to block all cookies, accept only certain cookies, or delete cookies upon closing the browser. Please note that disabling essential cookies may impact your ability to use specific interactive features of our website (such as the Project Estimator).
                    </p>
                  </div>

                  {/* Contact */}
                  <div className="space-y-4">
                    <h2 className="text-xl font-bold text-foreground">5. Contact Us</h2>
                    <p className="text-muted-foreground/90 font-light leading-relaxed">
                      If you have questions about our use of cookies or other tracking technologies, please reach out to us:
                    </p>
                    <div className="mt-4 p-4 rounded-xl bg-white/[0.02] border border-white/[0.05] inline-block">
                      <p className="text-sm font-semibold text-foreground">IITDeveloper Technical Team</p>
                      <p className="text-sm text-muted-foreground">Email: <a href="mailto:info@iitdeveloper.com" className="text-primary hover:underline">info@iitdeveloper.com</a></p>
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
