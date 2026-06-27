'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Rocket, Code, Heart, Zap, Globe, Users, TrendingUp, Sparkles, ArrowRight, CheckCircle2, Coffee, Laptop, Clock, MapPin } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

const benefits = [
  {
    icon: Laptop,
    title: 'Remote First',
    description: 'Work from anywhere in the world. We believe in results, not hours at a desk.',
  },
  {
    icon: TrendingUp,
    title: 'Growth & Learning',
    description: 'Annual learning budget, conference tickets, and mentorship programs.',
  },
  {
    icon: Heart,
    title: 'Health & Wellness',
    description: 'Comprehensive health coverage, mental health support, and wellness stipend.',
  },
  {
    icon: Clock,
    title: 'Flexible Hours',
    description: 'Work when you\'re most productive. We trust you to manage your time.',
  },
  {
    icon: Coffee,
    title: 'Unlimited PTO',
    description: 'Take time off when you need it. We encourage work-life balance.',
  },
  {
    icon: Rocket,
    title: 'Equity & Bonuses',
    description: 'Share in our success with equity options and performance bonuses.',
  },
];

const openPositions = [
  {
    title: 'Senior Full Stack Developer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build scalable web applications with Next.js, TypeScript, and Node.js. Work on exciting projects for global clients.',
    requirements: ['5+ years experience', 'Next.js/React expert', 'Node.js & TypeScript', 'Cloud experience (AWS/GCP)'],
    color: 'primary',
  },
  {
    title: 'AI/ML Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Design and implement AI agents and workflows. Work with GPT-4, LangChain, and cutting-edge AI technologies.',
    requirements: ['3+ years ML experience', 'Python & LLM APIs', 'LangChain or similar', 'Production AI systems'],
    color: 'secondary',
  },
  {
    title: 'DevOps Engineer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Engineering',
    description: 'Build and maintain cloud infrastructure. Kubernetes, CI/CD, and automation are your playground.',
    requirements: ['4+ years DevOps', 'Kubernetes expert', 'AWS or GCP', 'Terraform/IaC'],
    color: 'primary',
  },
  {
    title: 'Growth Marketing Manager',
    location: 'Remote',
    type: 'Full-time',
    department: 'Marketing',
    description: 'Drive growth through SEO, content, and performance marketing. Data-driven decision maker with creative flair.',
    requirements: ['3+ years growth marketing', 'SEO & analytics expert', 'Content strategy', 'Conversion optimization'],
    color: 'secondary',
  },
  {
    title: 'UI/UX Designer',
    location: 'Remote',
    type: 'Full-time',
    department: 'Design',
    description: 'Create beautiful, functional designs. From wireframes to prototypes to pixel-perfect implementations.',
    requirements: ['3+ years design', 'Figma expert', 'Design systems', 'User research'],
    color: 'primary',
  },
  {
    title: 'Salesforce Developer',
    location: 'Remote',
    type: 'Contract',
    department: 'Engineering',
    description: 'Build custom Salesforce solutions for enterprise clients. Apex, Lightning, and integrations.',
    requirements: ['Salesforce certified', 'Apex & Lightning', '3+ implementations', 'Integration experience'],
    color: 'secondary',
  },
];

const values = [
  {
    icon: Code,
    title: 'Quality First',
    description: 'We write clean, maintainable code that stands the test of time.',
  },
  {
    icon: Users,
    title: 'Team Over Ego',
    description: 'Collaboration beats individual brilliance. We win together.',
  },
  {
    icon: Zap,
    title: 'Move Fast',
    description: 'Bias for action. Ship fast, learn faster, iterate constantly.',
  },
  {
    icon: Globe,
    title: 'Remote & Global',
    description: 'Diverse perspectives make better products. We hire globally.',
  },
];

export default function CareersPage() {
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
              <Rocket className="w-4 h-4 text-secondary" />
              <span className="text-sm font-semibold tracking-wide text-secondary">WE'RE HIRING</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
            >
              Build The
              <br />
              <span className="text-secondary drop-shadow-[0_0_30px_rgba(255,214,98,0.4)]">Future</span>{' '}
              <span className="gradient-text">With Us</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl sm:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light mb-12"
            >
              Join a team of world-class developers, designers, and marketers building products that matter.
            </motion.p>

            <motion.div variants={staggerItem} className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <a href="#positions">
                <Button size="lg" className="shadow-glow hover:shadow-glow-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  View Open Positions
                </Button>
              </a>
              <Link href="/team">
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:shadow-glow">
                  Meet The Team
                </Button>
              </Link>
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Values Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Values</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              What drives us every day and shapes how we work
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <motion.div
                  key={value.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full glass border-white/10 hover:border-primary/40 transition-all">
                    <CardContent className="pt-6 text-center">
                      <div className="w-16 h-16 mx-auto mb-4 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                        <Icon className="w-8 h-8 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-2">{value.title}</h3>
                      <p className="text-muted-foreground/80 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-surface-dark relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-secondary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Join <span className="text-secondary">IITDeveloper</span>?
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              We invest in our people because they're our greatest asset
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <motion.div
                  key={benefit.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full glass-strong border-white/10 hover:border-secondary/40 hover:shadow-glow-yellow transition-all">
                    <CardContent className="pt-6">
                      <div className="flex items-start gap-4">
                        <div className="w-12 h-12 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center flex-shrink-0">
                          <Icon className="w-6 h-6 text-secondary" />
                        </div>
                        <div>
                          <h3 className="text-lg font-bold mb-2">{benefit.title}</h3>
                          <p className="text-muted-foreground/80 text-sm leading-relaxed">
                            {benefit.description}
                          </p>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Open Positions Section */}
      <section id="positions" className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Open <span className="gradient-text">Positions</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Find your next role and help us build amazing products
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 max-w-6xl mx-auto">
            {openPositions.map((position, index) => {
              const isPrimary = position.color === 'primary';
              return (
                <motion.div
                  key={position.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full glass-strong border-2 ${
                    isPrimary 
                      ? 'border-primary/20 hover:border-primary/40 hover:shadow-glow' 
                      : 'border-secondary/20 hover:border-secondary/40 hover:shadow-glow-yellow'
                  } transition-all group`}>
                    <CardHeader>
                      <div className="flex items-start justify-between mb-2">
                        <div>
                          <CardTitle className="text-2xl mb-2">{position.title}</CardTitle>
                          <div className="flex flex-wrap gap-2 mb-3">
                            <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                              isPrimary 
                                ? 'bg-primary/10 text-primary border border-primary/20' 
                                : 'bg-secondary/10 text-secondary border border-secondary/20'
                            }`}>
                              {position.department}
                            </span>
                            <span className="text-xs px-3 py-1 rounded-full bg-white/5 text-muted-foreground border border-white/10">
                              {position.type}
                            </span>
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground/70">
                        <MapPin className="w-4 h-4" />
                        <span>{position.location}</span>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardDescription className="text-base mb-4 leading-relaxed">
                        {position.description}
                      </CardDescription>
                      
                      <div className="mb-6">
                        <p className="text-sm font-semibold mb-3 text-foreground/90">Key Requirements:</p>
                        <ul className="space-y-2">
                          {position.requirements.map((req, idx) => (
                            <li key={idx} className="flex items-start gap-2 text-sm text-muted-foreground/80">
                              <CheckCircle2 className={`w-4 h-4 flex-shrink-0 mt-0.5 ${
                                isPrimary ? 'text-primary' : 'text-secondary'
                              }`} />
                              <span>{req}</span>
                            </li>
                          ))}
                        </ul>
                      </div>

                      <Link href="/contact">
                        <Button 
                          className={`w-full group/btn ${
                            isPrimary 
                              ? 'bg-primary hover:bg-primary/90 shadow-glow hover:shadow-glow-lg' 
                              : 'bg-secondary text-secondary-foreground hover:bg-secondary/90 shadow-glow-yellow hover:shadow-glow-yellow-lg'
                          }`}
                        >
                          Apply Now
                          <ArrowRight className="w-4 h-4 ml-2 group-hover/btn:translate-x-1 transition-transform" />
                        </Button>
                      </Link>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 lg:p-14 text-center border-2 border-primary/25 shadow-glow relative overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 -z-10" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-10 h-10 text-primary drop-shadow-[0_0_15px_rgba(99,102,241,0.6)]" />
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold mb-5 tracking-tight">
              Don't See Your{' '}
              <span className="text-primary drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">Perfect Role?</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We're always looking for exceptional talent. Send us your resume and let's talk about creating a role for you.
            </p>
            <Link href="/contact">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.97 }}
                className="px-8 py-4 rounded-xl bg-primary text-white font-bold text-lg shadow-glow hover:shadow-glow-lg transition-all group"
              >
                <span className="flex items-center gap-2">
                  Get In Touch
                  <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </span>
              </motion.button>
            </Link>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
