'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';
import { ExternalLink, TrendingUp, Clock, Sparkles, Star, Globe, ArrowRight, Bot, Code, Smartphone } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

const stats = [
  { value: '100+', label: 'Projects Delivered' },
  { value: '98%', label: 'Client Satisfaction' },
  { value: '4.9★', label: 'Average Rating' },
  { value: '100%', label: 'On-Time Delivery' },
  //{ value: '₹10Cr+', label: 'Revenue Generated' },
];

// Featured real-world projects with interactive case studies
const featuredProjects = [
  {
    title: 'BiteBreak — Smart Cafeteria System',
    client: 'Corporate Cafeterias',
    category: 'Mobile & Kitchen System',
    description: 'A multi-role cafeteria ordering and kitchen management platform with real-time ticket queues, nutritional tracking, and store analytics. Interactive live prototype available.',
    url: '/case-studies/bitebreak',
    displayUrl: 'Launch Live Prototype →',
    icon: Smartphone,
    isInternal: true,
    metrics: [
      { label: 'Role Workspaces', value: '3 Roles', change: 'Synced' },
      { label: 'Queue Sync', value: '<100ms', change: 'Real-time' },
      { label: 'Throughput', value: '3x Faster', change: '+200%' },
    ],
    tech: ['Next.js', 'Python', 'Docker', 'SQLite', 'Tailwind CSS', 'Framer Motion'],
    timeline: '4 weeks',
    color: 'primary',
    year: '2026',
  },
  {
    title: 'PulsarIP — Intellectual Property Platform',
    client: 'PulsarIP Legal',
    category: 'Legaltech Platform',
    description: 'An intellectual property and corporate legal services portal with digital trademark & patent filing workflows, legal consultancy booking, and automated compliance tracking.',
    url: 'https://pulsarip.com',
    displayUrl: 'pulsarip.com',
    icon: Globe,
    metrics: [
      { label: 'Practice Areas', value: '12+', change: 'Full Scope' },
      { label: 'Registration Flow', value: '100% Digital', change: 'Online' },
      { label: 'Page Performance', value: '96/100', change: '+40%' },
    ],
    tech: ['Next.js', 'React', 'Tailwind CSS', 'TypeScript', 'SEO / Schema.org'],
    timeline: '6 weeks',
    color: 'secondary',
    year: '2025',
  },
  {
    title: 'IITDeveloper Website',
    client: 'IITDeveloper',
    category: 'Web App',
    description: 'Our own flagship website — built to showcase the power of modern Next.js, Tailwind CSS, and Three.js. Fast, animated, and conversion-optimized.',
    url: 'https://iitdeveloper.com',
    displayUrl: 'iitdeveloper.com',
    icon: Globe,
    metrics: [
      { label: 'Page Speed', value: '98/100', change: '+35%' },
      { label: 'Load Time', value: '0.9s', change: '-60%' },
      { label: 'Conversions', value: '+85%', change: '+85%' },
    ],
    tech: ['Next.js', 'Tailwind CSS', 'Three.js', 'TypeScript', 'Framer Motion'],
    timeline: '8 weeks',
    color: 'primary',
    year: '2026',
  },
];

const testimonials = [
  {
    quote: "Our online visibility was completely changed by IIT DEVELOPER thanks to their excellent software development, web and UI/UX design, and digital marketing techniques. Our dependable partner for all our tech needs, their team's skill and inventiveness are evident.",
    author: "Devendra Kumar",
    role: "CTO",
    company: "Educare",
  },
  {
    quote: "We have had an outstanding experience working with IIT DEVELOPER. Their exact software development, innovative web and UI/UX design, and digital marketing methods have continuously surpassed our expectations. They are our first choice in technology partners.",
    author: "Kshitij Chauhan",
    role: "Manager",
    company: "NIIT",
  },
  {
    quote: "IIT DEVELOPER is amazing! Our online game is strong because of their digital marketing methods. Like tech geniuses, the software development team just gets things. The UI/UX and web design teams are another story altogether. Our website has never looked better!",
    author: "Nishant",
    role: "Product Manager",
    company: "Tech Solutions",
  },
];

export default function OurWorkPage() {
  return (
    <main className="min-h-screen bg-background relative overflow-hidden">
      <Header />
      {/* Background Effects */}
      <div className="fixed inset-0 -z-10">
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/3 left-0 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] bg-primary/3 rounded-full blur-3xl" />
      </div>

      {/* Hero Section */}
      <section className="pt-32 pb-20 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            variants={staggerContainer}
            initial="hidden"
            animate="visible"
            className="max-w-4xl mx-auto text-center"
          >
            <motion.div 
              variants={staggerItem} 
              className="inline-flex items-center space-x-2 glass border-2 border-secondary/30 px-5 py-2.5 rounded-full mb-8 shadow-glow-yellow"
            >
              <Sparkles className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold tracking-wide text-secondary">PORTFOLIO & CASE STUDIES</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
            >
              Work That
              <br />
              <span className="text-secondary drop-shadow-[0_0_30px_rgba(139,224,186,0.4)]">Speaks</span>{' '}
              <span className="gradient-text">For Itself</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl sm:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light mb-12"
            >
              Selected work across websites, AI solutions, ecommerce, mobile apps, cloud infrastructure, and growth campaigns, built to perform in the real world.
            </motion.p>

            {/* Stats */}
            <motion.div
              variants={staggerItem}
              className="grid grid-cols-2 lg:grid-cols-4 gap-6 max-w-3xl mx-auto"
            >
              {stats.map((stat) => (
                <motion.div
                  key={stat.label}
                  whileHover={{ scale: 1.05 }}
                  className="glass rounded-2xl p-6 border-2 border-secondary/20 hover:border-secondary/40 transition-all shadow-glow-yellow"
                >
                  <div className="text-3xl font-bold text-secondary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Featured Projects / Case Studies */}
      <section className="pb-24 relative">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="mb-6"
          >
            <div className="flex items-center gap-3 mb-8">
              <Star className="w-5 h-5 text-secondary fill-secondary" />
              <h2 className="text-2xl font-bold text-secondary">Featured Case Studies</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-16">
              {featuredProjects.map((project, index) => {
                const Icon = project.icon;
                const isPrimary = project.color === 'primary';
                return (
                  <motion.div
                    key={project.title}
                    variants={fadeInUp}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.15 }}
                    className="h-full"
                  >
                    <motion.div
                      whileHover={{ y: -8, scale: 1.01 }}
                      transition={{ duration: 0.3, ease: 'easeOut' }}
                      className="relative group glass-strong rounded-3xl overflow-hidden border-2 border-secondary/30 hover:border-secondary/60 hover:shadow-glow-yellow-lg transition-all duration-300 h-full flex flex-col"
                    >
                      {/* Top color band */}
                      <div className="h-2 w-full bg-gradient-to-r from-secondary via-secondary/80 to-transparent" />

                      <div className="p-8 lg:p-10 flex flex-col flex-1">
                        {/* Header row */}
                        <div className="flex items-start justify-between mb-6">
                          <div className="flex items-center gap-4">
                            <motion.div
                              whileHover={{ rotate: 10, scale: 1.1 }}
                              className={`relative w-16 h-16 rounded-2xl ${
                                isPrimary 
                                  ? 'bg-primary/10 border-2 border-primary/30' 
                                  : 'bg-secondary/10 border-2 border-secondary/30'
                              } flex items-center justify-center`}
                            >
                              <div className={`absolute inset-0 ${
                                isPrimary ? 'bg-primary' : 'bg-secondary'
                              } rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                              <Icon className={`relative w-8 h-8 ${
                                isPrimary ? 'text-primary' : 'text-secondary'
                              }`} />
                            </motion.div>
                            <div>
                              <span className="text-xs font-bold tracking-wider uppercase text-secondary">
                                {project.category}
                              </span>
                              <h3 className="text-2xl font-bold text-foreground">{project.title}</h3>
                              <p className="text-xs text-muted-foreground">{project.client}</p>
                            </div>
                          </div>
                          <span className="text-xs text-muted-foreground font-mono">{project.year}</span>
                        </div>

                        <p className="text-muted-foreground/80 text-base leading-relaxed mb-6 flex-grow">
                          {project.description}
                        </p>

                        {/* Metrics */}
                        <div className="grid grid-cols-3 gap-4 mb-6">
                          {project.metrics.map((metric, idx) => (
                            <div key={idx} className="text-center glass rounded-xl p-3 border border-white/5">
                              <div className="text-2xl font-bold text-secondary">
                                {metric.value}
                              </div>
                              <div className="text-xs text-muted-foreground mt-1">{metric.label}</div>
                            </div>
                          ))}
                        </div>

                        {/* Tech Stack */}
                        <div className="mb-6">
                          <p className="text-sm text-muted-foreground mb-2">Tech Stack:</p>
                          <div className="flex flex-wrap gap-2">
                            {project.tech.map((tech, idx) => (
                              <span
                                key={idx}
                                className="text-xs px-3 py-1.5 rounded-full font-medium bg-secondary/10 text-secondary border border-secondary/20"
                              >
                                {tech}
                              </span>
                            ))}
                          </div>
                        </div>

                        {/* Timeline */}
                        <div className="flex items-center gap-2 text-sm text-muted-foreground mb-6">
                          <Clock className="w-4 h-4" />
                          <span>Timeline: {project.timeline}</span>
                        </div>

                        {/* URL */}
                        {project.isInternal ? (
                          <Link
                            href={project.url}
                            className="mt-auto inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 group/btn bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg"
                          >
                            <Smartphone className="w-4 h-4" />
                            {project.displayUrl}
                            <ArrowRight className="w-4 h-4 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
                          </Link>
                        ) : (
                          <a
                            href={project.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="mt-auto inline-flex items-center gap-3 px-6 py-3 rounded-xl font-bold text-base transition-all duration-300 group/btn bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg"
                          >
                            <Globe className="w-4 h-4" />
                            {project.displayUrl}
                            <ExternalLink className="w-4 h-4 opacity-70 group-hover/btn:opacity-100 group-hover/btn:translate-x-0.5 transition-all" />
                          </a>
                        )}
                      </div>

                      {/* Corner decoration */}
                      <div className="absolute bottom-0 right-0 w-32 h-32 bg-secondary rounded-tl-full opacity-[0.04] group-hover:opacity-[0.08] transition-opacity" />
                    </motion.div>
                  </motion.div>
                );
              })}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 lg:py-28 bg-surface-dark relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4 tracking-tight">
              What Clients <span className="gradient-text">Say</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Don't just take our word for it. Here's what our clients have to say.
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {testimonials.map((testimonial, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
                whileHover={{ y: -5 }}
              >
                <Card glass premium className="dark-surface border-white/[0.08] h-full hover:border-primary/30 transition-all">
                  <CardContent className="pt-6">
                    <p className="text-muted-foreground/90 mb-6 leading-relaxed">
                      "{testimonial.quote}"
                    </p>
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-secondary flex items-center justify-center text-primary-foreground font-bold text-lg">
                        {testimonial.author.charAt(0)}
                      </div>
                      <div>
                        <p className="font-semibold text-foreground">{testimonial.author}</p>
                        <p className="text-sm text-muted-foreground">
                          {testimonial.role}, {testimonial.company}
                        </p>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Bottom CTA */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <div className="glass-strong rounded-3xl p-10 lg:p-14 text-center border-2 border-secondary/25 shadow-glow-yellow-lg relative overflow-hidden">
              <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-transparent to-primary/8 -z-10" />
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

              <motion.div
                animate={{ rotate: [0, 5, -5, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
                className="inline-block mb-6"
              >
                <Sparkles className="w-10 h-10 text-secondary drop-shadow-[0_0_15px_rgba(139,224,186,0.6)]" />
              </motion.div>

              <h2 className="text-3xl lg:text-5xl font-bold mb-5 tracking-tight">
                Want Something Built{' '}
                <span className="text-secondary drop-shadow-[0_0_20px_rgba(139,224,186,0.4)]">Like This?</span>
              </h2>
              <p className="text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
                Every project above started with a conversation. Let's start yours — get an instant estimate or book a free call.
              </p>
              <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg shadow-glow-yellow-lg hover:shadow-glow-yellow transition-all group"
                  >
                    <span className="flex items-center gap-2">
                      Get In Touch
                      <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.97 }}
                    className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg shadow-glow-yellow-lg hover:shadow-glow-yellow transition-all"
                  >
                    Book a Free Call
                  </motion.button>
                </Link>
              </div>
            </div>
          </motion.div>
        </div>
      </section>
      <Footer />
    </main>
  );
}
