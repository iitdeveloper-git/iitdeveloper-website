'use client';

import { motion } from 'framer-motion';
import { Code, Bot, ShoppingBag, TrendingUp, Palette, Workflow, ArrowRight } from 'lucide-react';
import Link from 'next/link';
import { fadeInUp } from '@/lib/animations/variants';

// Only 6 flagship services on the home page — one per major category.
// Full list lives at /services.
const services = [
  {
    icon: Code,
    title: 'Website & App Development',
    description: 'Custom web and mobile apps built with modern frameworks. Fast, scalable, and conversion-focused.',
    tagline: '💻 We turn caffeine into code. Actually tested on real users.',
    category: 'Build',
    categoryColor: 'primary',
    href: '/services/website-development',
  },
  {
    icon: Bot,
    title: 'AI Agents',
    description: 'Intelligent agents that automate your workflows. Available 24/7, never need coffee breaks.',
    tagline: '🤖 Your new employee. Doesn\'t complain. Doesn\'t take vacations.',
    category: 'AI',
    categoryColor: 'secondary',
    href: '/services/ai-agents',
  },
  {
    icon: Workflow,
    title: 'AI Workflows',
    description: 'Custom LLM integrations and automation systems. MCP protocols and intelligent pipelines.',
    tagline: '🧠 Teaching AI to do your job. But don\'t worry, you\'re still needed.',
    category: 'AI',
    categoryColor: 'secondary',
    href: '/services/ai-workflows',
  },
  {
    icon: ShoppingBag,
    title: 'Shopify Store',
    description: 'Custom Shopify stores built to convert. Theme design, payment setup, app integrations, and full launch support.',
    tagline: '🛍️ Your store live in weeks. Designed to sell from day one.',
    category: 'Commerce',
    categoryColor: 'primary',
    href: '/services/shopify-store',
  },
  {
    icon: TrendingUp,
    title: 'Performance Marketing',
    description: 'Data-driven campaigns that convert. PPC, social ads, and conversion optimization.',
    tagline: '📈 Stop burning money. Start burning competitors.',
    category: 'Grow',
    categoryColor: 'secondary',
    href: '/services/marketing',
  },
  {
    icon: Palette,
    title: 'Graphic Design',
    description: 'Visual identity, motion graphics, and multimedia design. Posters, banners, videos, and After Effects.',
    tagline: '🎨 Design so good, your competitors will think you hired someone expensive.',
    category: 'Design',
    categoryColor: 'secondary',
    href: '/services/graphic-design',
  },
];

export default function Services() {
  return (
    <section className="py-24 lg:py-32 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 -z-10">
        <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-primary/5 rounded-full blur-3xl" />
        <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-secondary/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-block mb-6"
          >
            <span className="glass px-6 py-2.5 rounded-full text-sm font-semibold tracking-wide border-2 border-secondary/30 text-secondary shadow-glow-yellow">
              WHAT WE DO
            </span>
          </motion.div>
          <h2 className="text-4xl sm:text-5xl lg:text-7xl font-bold mb-6 tracking-tight leading-[1.1]">
            <span className="text-secondary drop-shadow-[0_0_20px_rgba(255,214,98,0.3)]">Services</span> That <br className="hidden sm:block" />
            <span className="gradient-text">Actually Work</span>
          </h2>
          <p className="text-xl sm:text-2xl text-muted-foreground/80 max-w-3xl mx-auto leading-relaxed font-light">
            We automate things… including your headaches. Full-stack development, AI solutions, and marketing that scales.
          </p>
        </motion.div>

        {/* Services Grid - New Design */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-16">
          {services.map((service, index) => {
            const Icon = service.icon;
            const isCategoryPrimary = service.categoryColor === 'primary';
            
            return (
              <motion.div
                key={service.title}
                variants={fadeInUp}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true }}
                transition={{ delay: index * 0.08 }}
              >
                <Link href={service.href} className="block h-full group">
                  <motion.div
                    whileHover={{ y: -12, scale: 1.02 }}
                    transition={{ duration: 0.3, ease: "easeOut" }}
                    className="relative h-full glass dark-surface rounded-2xl p-8 border-2 border-transparent hover:border-secondary/40 transition-all duration-300 hover:shadow-glow-yellow-lg overflow-hidden"
                  >
                    {/* Animated Background Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-br from-primary/5 via-transparent to-secondary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    
                    {/* Top Border Accent */}
                    <div className={`absolute top-0 left-0 right-0 h-1 ${isCategoryPrimary ? 'bg-gradient-to-r from-primary via-primary to-transparent' : 'bg-gradient-to-r from-secondary via-secondary to-transparent'} opacity-60 group-hover:opacity-100 transition-opacity`} />

                    {/* Category Badge */}
                    <div className="flex items-center justify-between mb-6">
                      <span className={`text-xs font-bold tracking-wider uppercase ${isCategoryPrimary ? 'text-primary' : 'text-secondary'} opacity-70 group-hover:opacity-100 transition-opacity`}>
                        {service.category}
                      </span>
                      <ArrowRight className={`w-4 h-4 ${isCategoryPrimary ? 'text-primary' : 'text-secondary'} opacity-0 group-hover:opacity-100 transform translate-x-0 group-hover:translate-x-1 transition-all duration-300`} />
                    </div>

                    {/* Icon with animated background */}
                    <motion.div
                      whileHover={{ rotate: 5, scale: 1.1 }}
                      transition={{ duration: 0.3 }}
                      className="relative inline-block mb-6"
                    >
                      <div className={`absolute inset-0 ${isCategoryPrimary ? 'bg-primary' : 'bg-secondary'} rounded-2xl blur-xl opacity-20 group-hover:opacity-40 transition-opacity`} />
                      <div className={`relative w-16 h-16 rounded-2xl ${isCategoryPrimary ? 'bg-primary/10 border-2 border-primary/20' : 'bg-secondary/10 border-2 border-secondary/30'} flex items-center justify-center group-hover:border-opacity-60 transition-all`}>
                        <Icon className={`w-8 h-8 ${isCategoryPrimary ? 'text-primary' : 'text-secondary'}`} />
                      </div>
                    </motion.div>

                    {/* Content */}
                    <div className="relative z-10">
                      <h3 className="text-xl font-bold mb-3 text-foreground group-hover:text-foreground transition-colors">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground/80 text-sm mb-4 leading-relaxed">
                        {service.description}
                      </p>
                      <div className="pt-4 border-t border-white/5">
                        <p className="text-xs text-secondary/80 italic font-medium">
                          {service.tagline}
                        </p>
                      </div>
                    </div>

                    {/* Corner decoration */}
                    <div className={`absolute bottom-0 right-0 w-24 h-24 ${isCategoryPrimary ? 'bg-primary' : 'bg-secondary'} rounded-tl-full opacity-[0.03] group-hover:opacity-[0.08] transition-opacity`} />
                  </motion.div>
                </Link>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom CTA with Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.6, duration: 0.5 }}
          className="relative"
        >
          <div className="glass-strong rounded-3xl p-10 lg:p-12 border-2 border-secondary/20 shadow-glow-yellow">
            <div className="flex flex-col lg:flex-row items-center justify-between gap-8">
              <div className="text-center lg:text-left">
                <h3 className="text-2xl lg:text-3xl font-bold mb-3">
                  We offer 12 services in total.
                </h3>
                <p className="text-muted-foreground/80 text-lg">
                  From DevOps to Salesforce, B2B to SEO — explore everything we do.
                </p>
              </div>
              <div className="flex flex-col sm:flex-row items-center gap-4">
                <Link href="/services">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl bg-secondary text-secondary-foreground font-bold text-lg shadow-glow-yellow-lg hover:shadow-glow-yellow transition-all group"
                  >
                    <span className="flex items-center">
                      View All 12 Services
                      <ArrowRight className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                    </span>
                  </motion.button>
                </Link>
                <Link href="/contact">
                  <motion.button
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                    className="px-8 py-4 rounded-xl glass border-2 border-primary/30 hover:border-primary/50 text-foreground font-semibold text-lg hover:shadow-glow transition-all"
                  >
                    Book a Call
                  </motion.button>
                </Link>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
