'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Target, Users, Zap, Heart, Trophy, Rocket, CheckCircle2, Cloud, Code, Lightbulb, TrendingUp, Award, Globe, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

const stats = [
  { value: '2019', label: 'Founded' },
  { value: '50+', label: 'Growth Professionals' },
  { value: '6+', label: 'Years Experience' },
  { value: 'MSME', label: 'Registered 2020' },
];

const values = [
  {
    icon: Lightbulb,
    title: 'Cutting-Edge Technologies',
    description: 'The secret to success is to offer cutting-edge technologies. Always choose the better product with the most effective platform, whether that means using the cloud for scalability, putting DevOps into practice for efficiency, or developing creative digital marketing efforts.',
  },
  {
    icon: Heart,
    title: 'Client-Centric Approach',
    description: 'We are primarily focused on your success. Our solutions are customized after we take the time to comprehend your particular objectives and difficulties. As a valued partner on a quest to achieve exceptional digital transformations, you are more than just a client while working with IIT Developer.',
  },
  {
    icon: Globe,
    title: 'Your End-to-End Solution Provider',
    description: 'At IIT Developer, we deliver complete solutions rather than simply services. We can help you develop a game-changing product, increase your online presence, use DevOps to streamline operations, or take advantage of cloud computing.',
  },
];

const pillars = [
  {
    icon: Target,
    title: 'Our Mission',
    description: 'At IIT Developer, we strive to empower service by providing outstanding solutions that go above and beyond what is expected of us. We are committed to comprehending the particular requirements of each of our clients and using our knowledge to develop meaningful, lasting solutions. Our mission is to be the engine of success for service-oriented businesses via innovation, teamwork, and an unwavering commitment to quality.',
    color: 'primary',
  },
  {
    icon: Rocket,
    title: 'Our Vision',
    description: 'Our goal at IIT Developer is to lead the way in service, creating new benchmarks for creativity, excellence, and client happiness. Our goal is to build a future where cutting-edge technologies help businesses flourish, where creativity is unrestricted, and where our influence is felt all over the world.',
    color: 'secondary',
  },
  {
    icon: TrendingUp,
    title: 'Our Plan',
    description: 'Our three pillars of innovation, cooperation, and growth form the foundation of our strategy plan at IIT Developer. Our dedication lies in cultivating an environment of perpetual innovation, staying ahead of market developments to deliver state-of-the-art solutions.',
    color: 'primary',
  },
  {
    icon: Users,
    title: 'Our Care',
    description: 'In our mentality at IIT Developer, care is more than simply a term. Our staff, our clients, and the communities we serve all come first. Understanding, empathy, and a sincere desire to have a good influence are all part of our dedication to care, which extends beyond providing solutions.',
    color: 'secondary',
  },
];

const whyChoose = [
  {
    icon: Award,
    title: 'Your Growth Partner',
    description: 'We have been the go-to partner for many well-known businesses in a variety of industries thanks to our five years of industry-leading experience and our committed team of over fifty growth professionals.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Marketing Structure',
    description: 'Customized full-funnel marketing and analytics system to guarantee sustained expansion.',
  },
  {
    icon: CheckCircle2,
    title: 'On-Time Delivery',
    description: 'Our in-house project management platform facilitates faster turnaround times and results delivered on schedule.',
  },
  {
    icon: Rocket,
    title: 'We are born to grow',
    description: 'We launched the notion of growth marketing when it was still in its infancy, making us the pioneers of the field. We are among the top full-funnel growth marketers in the field right now.',
  },
];

export default function AboutPage() {
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
              className="inline-flex items-center space-x-2 glass border-2 border-primary/30 px-5 py-2.5 rounded-full mb-8 shadow-glow"
            >
              <Sparkles className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold tracking-wide text-primary">ABOUT IIT DEVELOPER</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
            >
              Building The
              <br />
              <span className="gradient-text">Future</span>{' '}
              <span className="text-primary drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">Together</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl sm:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light mb-12"
            >
              Here at IIT Developer, innovative ideas and state-of-the-art technology come together. 
              We pool the intellect of our graduates to produce cutting-edge solutions that advance companies into the future.
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
                  className="glass rounded-2xl p-6 border-2 border-primary/20 hover:border-primary/40 transition-all shadow-glow"
                >
                  <div className="text-3xl font-bold text-primary mb-1">{stat.value}</div>
                  <div className="text-sm text-muted-foreground/70">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Company Intro */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto">
            <Card className="glass-strong border-2 border-primary/20 shadow-glow">
              <CardContent className="pt-8 pb-8 px-8 lg:px-12">
                <p className="text-xl text-muted-foreground/90 leading-relaxed text-center">
                  <strong className="text-foreground">IIT Developer</strong> is a service and product-based company dedicated to 
                  delivering fast and technology-rich solutions to our clients. Our values drive everything we do, 
                  guiding our problem-solving approaches and inspiring new ideas. <strong className="text-primary">Established in 2019</strong> and 
                  officially <strong className="text-secondary">registered as an MSME in 2020</strong>, we've been on a journey of growth and innovation.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-surface-dark relative">
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-primary/5 to-transparent -z-10" />
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Why Choose <span className="gradient-text">IIT Developer</span>?
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Our commitment to excellence and innovation sets us apart
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto mb-16">
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
                  <Card className="h-full glass-strong border-white/10 hover:border-primary/40 hover:shadow-glow transition-all">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mb-4 rounded-xl bg-primary/10 border-2 border-primary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-primary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{value.title}</h3>
                      <p className="text-muted-foreground/80 text-sm leading-relaxed">
                        {value.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-6xl mx-auto">
            {whyChoose.map((item, index) => {
              const Icon = item.icon;
              return (
                <motion.div
                  key={item.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="h-full glass border-white/10 hover:border-secondary/40 hover:shadow-glow-yellow transition-all">
                    <CardContent className="pt-6 text-center">
                      <div className="w-12 h-12 mx-auto mb-4 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center">
                        <Icon className="w-6 h-6 text-secondary" />
                      </div>
                      <h3 className="text-lg font-bold mb-2">{item.title}</h3>
                      <p className="text-muted-foreground/80 text-sm leading-relaxed">
                        {item.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Mission, Vision, Plan, Care */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="text-secondary">Foundation</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              The pillars that define who we are and where we're going
            </p>
          </motion.div>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 max-w-6xl mx-auto">
            {pillars.map((pillar, index) => {
              const Icon = pillar.icon;
              const isPrimary = pillar.color === 'primary';
              return (
                <motion.div
                  key={pillar.title}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                >
                  <Card className={`h-full glass-strong border-2 ${
                    isPrimary 
                      ? 'border-primary/20 hover:border-primary/40 hover:shadow-glow' 
                      : 'border-secondary/20 hover:border-secondary/40 hover:shadow-glow-yellow'
                  } transition-all`}>
                    <CardHeader>
                      <div className={`w-16 h-16 mb-4 rounded-2xl ${
                        isPrimary ? 'bg-primary/10 border-2 border-primary/20' : 'bg-secondary/10 border-2 border-secondary/20'
                      } flex items-center justify-center`}>
                        <Icon className={`w-8 h-8 ${isPrimary ? 'text-primary' : 'text-secondary'}`} />
                      </div>
                      <CardTitle className="text-2xl">{pillar.title}</CardTitle>
                    </CardHeader>
                    <CardContent>
                      <p className="text-muted-foreground/80 leading-relaxed">
                        {pillar.description}
                      </p>
                    </CardContent>
                  </Card>
                </motion.div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-surface-dark">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 lg:p-14 text-center border-2 border-primary/25 shadow-glow relative overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-primary/8 via-transparent to-secondary/8 -z-10" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            <h2 className="text-3xl lg:text-5xl font-bold mb-5 tracking-tight">
              Ready to <span className="text-primary drop-shadow-[0_0_20px_rgba(99,102,241,0.4)]">Work Together?</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              Let's transform your ideas into reality. Get in touch with us today and start your digital transformation journey.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/contact">
                <Button size="lg" className="shadow-glow hover:shadow-glow-lg bg-primary text-white hover:bg-primary/90">
                  Get Started
                </Button>
              </Link>
              <Link href="/team">
                <Button size="lg" variant="outline" className="border-secondary/30 hover:border-secondary/60 hover:shadow-glow-yellow">
                  Meet The Team
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
