'use client';

import { Metadata } from 'next';
import { motion } from 'framer-motion';
import Header from '@/components/layout/Header';
import { Mail, Phone, MapPin, Clock, MessageCircle, Zap } from 'lucide-react';
import ContactForm from '@/components/forms/ContactForm';
import { Card, CardContent } from '@/components/ui/card';
import { generateSEO } from '@/lib/seo';

// Note: Metadata export removed because 'use client' components cannot export metadata
// Metadata should be added in layout.tsx or a server component wrapper

const contactInfo = [
  {
    icon: Mail,
    title: 'Email Us',
    content: 'info@iitdeveloper.com',
    subtext: 'We reply within 4 hours',
    href: 'mailto:info@iitdeveloper.com',
  },
  {
    icon: Phone,
    title: 'Call Us',
    content: '+91 73027 55534 ',
    subtext: 'Mon-Fri, 9am-6pm IST',
    href: 'tel:+917302755534',
  },
  {
    icon: MessageCircle,
    title: 'Live Chat',
    content: 'Available 24/7',
    subtext: 'Instant responses via AI',
    href: '#chat',
  },
];

const stats = [
  { label: 'Response Time', value: '< 4 hrs', icon: Clock },
  { label: 'Projects Delivered', value: '100+', icon: Zap },
  { label: 'Client Satisfaction', value: '98%', icon: Zap },
];

export default function ContactPage() {
  return (
    <div className="min-h-screen pt-24 pb-24">
      <Header />
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h1 className="text-5xl sm:text-6xl lg:text-7xl font-bold mb-6 tracking-tight">
            Let's Build Something <span className="gradient-text">Epic</span>
          </h1>
          <p className="text-xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
            Have a project in mind? Need a quote? Just want to chat about tech?
            We're all ears. And keyboards.
          </p>
          <p className="text-sm text-muted-foreground/60 italic mt-4">
            💬 No sales pressure. No corporate jargon. Just real humans (and some helpful AI).
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-12 mb-16">
          {/* Contact Form - Spans 2 columns */}
          <motion.div
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2"
          >
            <ContactForm />
          </motion.div>

          {/* Contact Info Sidebar */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="space-y-6"
          >
            {/* Contact Methods */}
            <div className="space-y-4">
              {contactInfo.map((info) => {
                const Icon = info.icon;
                return (
                  <a
                    key={info.title}
                    href={info.href}
                    className="block group"
                  >
                    <Card glass premium className="hover:bg-white/[0.06] transition-all border-white/[0.08] hover:border-white/[0.15]">
                      <CardContent className="p-6">
                        <div className="flex items-start space-x-4">
                          <div className="w-12 h-12 rounded-xl bg-accent-neon/10 flex items-center justify-center group-hover:bg-accent-neon/20 transition-all shadow-glow-sm group-hover:shadow-glow flex-shrink-0">
                            <Icon className="w-6 h-6 text-accent-neon" />
                          </div>
                          <div className="flex-1 min-w-0">
                            <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/80 mb-1">
                              {info.title}
                            </h3>
                            <p className="text-lg font-semibold text-foreground group-hover:text-accent-neon transition-colors">
                              {info.content}
                            </p>
                            <p className="text-xs text-muted-foreground/60 mt-1">
                              {info.subtext}
                            </p>
                          </div>
                        </div>
                      </CardContent>
                    </Card>
                  </a>
                );
              })}
            </div>

            {/* Stats */}
            <Card glass premium>
              <CardContent className="p-6">
                <h3 className="text-lg font-bold mb-4">Why Choose Us?</h3>
                <div className="space-y-4">
                  {stats.map((stat) => {
                    const Icon = stat.icon;
                    return (
                      <div key={stat.label} className="flex items-center justify-between">
                        <div className="flex items-center space-x-3">
                          <Icon className="w-4 h-4 text-accent-neon" />
                          <span className="text-sm text-muted-foreground/80">
                            {stat.label}
                          </span>
                        </div>
                        <span className="text-lg font-bold gradient-text">
                          {stat.value}
                        </span>
                      </div>
                    );
                  })}
                </div>
              </CardContent>
            </Card>

            {/* Quick Note */}
            <Card glass premium className="bg-accent-neon/5">
              <CardContent className="p-6">
                <h3 className="text-sm font-bold uppercase tracking-wider text-accent-neon mb-3">
                  🚀 Fast Track
                </h3>
                <p className="text-sm text-muted-foreground/80 leading-relaxed">
                  Need an instant estimate? Use our{' '}
                  <a
                    href="/estimate"
                    className="text-accent-neon hover:underline font-semibold"
                  >
                    Smart Price Estimator
                  </a>{' '}
                  to get pricing in 60 seconds. No forms, no waiting, no BS.
                </p>
              </CardContent>
            </Card>

            {/* Office Location (Optional) */}
            <Card glass premium>
              <CardContent className="p-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 rounded-xl bg-accent-purple/10 flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-accent-purple" />
                  </div>
                  <div className="flex-1">
                    <h3 className="text-sm font-bold uppercase tracking-wider text-muted-foreground/80 mb-2">
                      Headquarters
                    </h3>
                    <p className="text-sm text-muted-foreground/80 leading-relaxed">
                      Knowledge Park-2 Greater Noida, Utter Pradesh 201310, INDIA
                      <br />
                      Remote-first team
                      <br />
                      <span className="text-xs text-muted-foreground/60 italic">
                        (Working from coffee shops worldwide)
                      </span>
                    </p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </motion.div>
        </div>

        {/* FAQ or Additional Info */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="max-w-3xl mx-auto text-center"
        >
          <Card glass premium>
            <CardContent className="p-8">
              <h3 className="text-2xl font-bold mb-4">What Happens Next?</h3>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-left">
                <div>
                  <div className="text-3xl font-bold text-accent-neon mb-2">01</div>
                  <h4 className="font-semibold mb-2">We Review</h4>
                  <p className="text-sm text-muted-foreground/80">
                    Our team reads your message and understands your needs.
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-neon mb-2">02</div>
                  <h4 className="font-semibold mb-2">We Respond</h4>
                  <p className="text-sm text-muted-foreground/80">
                    You'll hear back from us within 4 hours (usually faster).
                  </p>
                </div>
                <div>
                  <div className="text-3xl font-bold text-accent-neon mb-2">03</div>
                  <h4 className="font-semibold mb-2">We Plan</h4>
                  <p className="text-sm text-muted-foreground/80">
                    Schedule a call, discuss scope, and create a roadmap.
                  </p>
                </div>
              </div>
            </CardContent>
          </Card>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-1/4 left-0 w-96 h-96 bg-accent-neon/5 rounded-full blur-3xl -z-10" />
      <div className="absolute bottom-1/4 right-0 w-96 h-96 bg-accent-purple/5 rounded-full blur-3xl -z-10" />
    </div>
  );
}
