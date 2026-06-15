'use client';

import { motion } from 'framer-motion';
import Link from 'next/link';
import Header from '@/components/layout/Header';
import { Github, Linkedin, Twitter, MapPin, Code, Palette, TrendingUp, Sparkles, Users, Globe, Rocket, Heart } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { fadeInUp, staggerContainer, staggerItem } from '@/lib/animations/variants';

const teamMembers = [
  {
    name: 'Ravikant Yadav',
    role: 'Founder & Software Developer',
    location: 'India',
    bio: 'Visionary founder driving innovation through technology. Expertise in full-stack development and building scalable solutions.',
    avatar: 'RY',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
    gradient: 'from-primary to-secondary',
  },
  {
    name: 'Nikhil Goyal',
    role: 'Co-Founder & DevSecOps Engineer',
    location: 'India',
    bio: 'Security-focused DevOps expert ensuring robust infrastructure and secure deployments. Passionate about automation and best practices.',
    avatar: 'NG',
    social: {
      linkedin: 'https://www.linkedin.com/in/nikhil-goyal-6576261a9',
      github: 'https://github.com/cyberRuptor',
      twitter: '#',
    },
    gradient: 'from-secondary to-primary',
  },
  {
    name: 'Sushma Sharma',
    role: 'Co-Founder & Product Design Manager',
    location: 'India',
    bio: 'Design leader crafting exceptional user experiences. Blends creativity with strategic product thinking to deliver beautiful, functional designs.',
    avatar: 'SS',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
    gradient: 'from-pink-500 to-purple-500',
  },
  {
    name: 'Mukul Maheshwari',
    role: 'Co-Founder & DevOps Engineer',
    location: 'India',
    bio: 'DevOps specialist streamlining deployment pipelines and infrastructure management. Making complex systems simple and reliable.',
    avatar: 'MM',
    social: {
      linkedin: '#',
      github: '#',
      twitter: '#',
    },
    gradient: 'from-blue-500 to-cyan-500',
  },
];

const stats = [
  { value: '4', label: 'Team Members' },
  { value: '1', label: 'Country' },
  { value: '6+', label: 'Years Combined Experience' },
  { value: '100%', label: 'Remote' },
];

const culture = [
  {
    icon: Code,
    title: 'Engineering Excellence',
    description: 'We write clean, maintainable code and follow best practices. Code reviews, testing, and documentation are non-negotiable.',
  },
  {
    icon: Users,
    title: 'Collaborative Culture',
    description: 'We believe in pair programming, knowledge sharing, and lifting each other up. No room for egos here.',
  },
  {
    icon: Globe,
    title: 'Remote & Async',
    description: 'Work from anywhere, anytime. We communicate asynchronously and document everything for transparency.',
  },
  {
    icon: Rocket,
    title: 'Ship Fast, Learn Faster',
    description: 'We favor iteration over perfection. Launch, measure, learn, and improve continuously.',
  },
  {
    icon: Heart,
    title: 'Work-Life Balance',
    description: 'Sustainable pace over crunch time. We support mental health, time off, and healthy boundaries.',
  },
  {
    icon: TrendingUp,
    title: 'Growth Mindset',
    description: 'Every team member gets a learning budget, conference tickets, and time to explore new technologies.',
  },
];

export default function TeamPage() {
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
              <Users className="w-4 h-4 text-primary" />
              <span className="text-sm font-semibold tracking-wide text-primary">MEET THE TEAM</span>
            </motion.div>

            <motion.h1
              variants={staggerItem}
              className="text-5xl sm:text-6xl lg:text-8xl font-bold mb-8 leading-[1.1] tracking-tighter"
            >
              The People
              <br />
              <span className="gradient-text">Behind</span>{' '}
              <span className="text-primary drop-shadow-[0_0_30px_rgba(99,102,241,0.4)]">The Magic</span>
            </motion.h1>

            <motion.p
              variants={staggerItem}
              className="text-xl sm:text-2xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light mb-12"
            >
              A globally distributed team of engineers, designers, and marketers united by one mission: 
              building exceptional digital products.
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

      {/* Team Members Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="text-4xl sm:text-5xl font-bold mb-4">
              Our <span className="gradient-text">Team</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              Talented individuals from around the world working together
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-5xl mx-auto">
            {teamMembers.map((member, index) => (
              <motion.div
                key={member.name}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: index * 0.1 }}
              >
                <motion.div
                  whileHover={{ y: -8 }}
                  className="h-full"
                >
                  <Card className="h-full glass-strong border-2 border-white/10 hover:border-primary/40 hover:shadow-glow transition-all group">
                    <CardContent className="pt-6">
                      {/* Avatar */}
                      <div className="relative mb-6">
                        <div className={`w-32 h-32 mx-auto rounded-2xl bg-gradient-to-br ${member.gradient} flex items-center justify-center text-white text-3xl font-bold shadow-lg group-hover:scale-105 transition-transform`}>
                          {member.avatar}
                        </div>
                        <div className="absolute -bottom-3 left-1/2 -translate-x-1/2">
                          <div className="flex items-center gap-2 px-3 py-1 rounded-full glass border border-white/20 text-xs text-muted-foreground">
                            <MapPin className="w-3 h-3" />
                            <span>{member.location}</span>
                          </div>
                        </div>
                      </div>

                      {/* Info */}
                      <div className="text-center mb-4 mt-6">
                        <h3 className="text-2xl font-bold mb-1">{member.name}</h3>
                        <p className="text-primary font-semibold">{member.role}</p>
                      </div>

                      <p className="text-muted-foreground/80 text-sm leading-relaxed mb-6 text-center">
                        {member.bio}
                      </p>

                      {/* Social Links */}
                      <div className="flex items-center justify-center gap-3">
                        {member.social.linkedin && (
                          <a
                            href={member.social.linkedin}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-lg glass border border-white/10 hover:border-primary/40 flex items-center justify-center transition-all hover:scale-110"
                          >
                            <Linkedin className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.github && (
                          <a
                            href={member.social.github}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-lg glass border border-white/10 hover:border-primary/40 flex items-center justify-center transition-all hover:scale-110"
                          >
                            <Github className="w-4 h-4" />
                          </a>
                        )}
                        {member.social.twitter && (
                          <a
                            href={member.social.twitter}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="w-10 h-10 rounded-lg glass border border-white/10 hover:border-primary/40 flex items-center justify-center transition-all hover:scale-110"
                          >
                            <Twitter className="w-4 h-4" />
                          </a>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Culture Section */}
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
              Our <span className="text-secondary">Culture</span>
            </h2>
            <p className="text-lg text-muted-foreground/80 max-w-2xl mx-auto">
              How we work, what we value, and what makes us different
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {culture.map((item, index) => {
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
                  <Card className="h-full glass-strong border-white/10 hover:border-secondary/40 hover:shadow-glow-yellow transition-all">
                    <CardContent className="pt-6">
                      <div className="w-14 h-14 mb-4 rounded-xl bg-secondary/10 border-2 border-secondary/20 flex items-center justify-center">
                        <Icon className="w-7 h-7 text-secondary" />
                      </div>
                      <h3 className="text-xl font-bold mb-3">{item.title}</h3>
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

      {/* CTA Section */}
      <section className="py-20">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="glass-strong rounded-3xl p-10 lg:p-14 text-center border-2 border-secondary/25 shadow-glow-yellow-lg relative overflow-hidden max-w-4xl mx-auto"
          >
            <div className="absolute inset-0 bg-gradient-to-br from-secondary/8 via-transparent to-primary/8 -z-10" />
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-primary via-secondary to-primary" />

            <motion.div
              animate={{ rotate: [0, 5, -5, 0] }}
              transition={{ duration: 4, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-block mb-6"
            >
              <Sparkles className="w-10 h-10 text-secondary drop-shadow-[0_0_15px_rgba(255,214,98,0.6)]" />
            </motion.div>

            <h2 className="text-3xl lg:text-5xl font-bold mb-5 tracking-tight">
              Want To{' '}
              <span className="text-secondary drop-shadow-[0_0_20px_rgba(255,214,98,0.4)]">Join Us?</span>
            </h2>
            <p className="text-xl text-muted-foreground/80 mb-10 max-w-2xl mx-auto font-light leading-relaxed">
              We're always looking for exceptional talent. Check out our open positions and become part of something amazing.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link href="/careers">
                <Button size="lg" className="shadow-glow-yellow hover:shadow-glow-yellow-lg bg-secondary text-secondary-foreground hover:bg-secondary/90">
                  View Open Positions
                </Button>
              </Link>
              <Link href="/contact">
                <Button size="lg" variant="outline" className="border-primary/30 hover:border-primary/60 hover:shadow-glow">
                  Get In Touch
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>
    </main>
  );
}
