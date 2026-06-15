'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { Card, CardContent } from '@/components/ui/card';
import { Star } from 'lucide-react';
import { fadeInUp } from '@/lib/animations/variants';

const testimonials = [
  {
    name: 'Devendra Kumar',
    role: 'CTO, Educare',
    content: 'Our online visibility was completely changed by IIT DEVELOPER thanks to their excellent software development, web and UI/UX design, and digital marketing techniques. Our dependable partner for all our tech needs, their team\'s skill and inventiveness are evident.',
    rating: 5,
    avatar: 'DK',
    image: '/testimonials-devendra.png',
  },
  {
    name: 'Kshitij Chauhan',
    role: 'Manager, NIIT',
    content: 'We have had an outstanding experience working with IIT DEVELOPER. Their exact software development, innovative web and UI/UX design, and digital marketing methods have continuously surpassed our expectations. They are our first choice in technology partners.',
    rating: 5,
    avatar: 'KC',
    image: '/testimonials-kshitij.png',
  },
  {
    name: 'Nishant',
    role: 'Product Manager',
    content: 'IIT DEVELOPER is amazing! Our online game is strong because of their digital marketing methods. Like tech geniuses, the software development team just gets things. The UI/UX and web design teams are another story altogether. Our website has never looked better!',
    rating: 5,
    avatar: 'NS',
    image: '/testimonials-nishant.png',
  },
];

export default function Testimonials() {
  return (
    <section className="py-24 lg:py-32 bg-white/[0.02] relative">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <h2 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 tracking-tight">
            Don't Take Our <span className="text-secondary">Word</span> For It
          </h2>
          <p className="text-xl text-muted-foreground/80 max-w-2xl mx-auto leading-relaxed font-light">
            Real results from real clients. No fluff, just facts.
          </p>
        </motion.div>

        {/* Testimonials Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 max-w-7xl mx-auto">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.name}
              variants={fadeInUp}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              whileHover={{ y: -5, scale: 1.02, transition: { duration: 0.2 } }}
            >
              <Card glass premium className="h-full border-l-4 border-l-secondary/50 hover:border-l-secondary border-primary/10 hover:border-primary/20 transition-all hover:shadow-glow-yellow">
                <CardContent className="p-8">
                {/* Stars */}
                <div className="flex items-center space-x-1 mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <Star
                      key={i}
                      className="w-5 h-5 fill-secondary text-secondary drop-shadow-[0_0_6px_rgba(255,214,98,0.4)]"
                    />
                  ))}
                </div>

                {/* Content */}
                  <p className="text-muted-foreground/80 mb-6 text-base leading-relaxed">
                  "{testimonial.content}"
                </p>

                {/* Author */}
                <div className="flex items-center space-x-3">
                  {testimonial.image ? (
                    <div className="w-12 h-12 rounded-full overflow-hidden border-2 border-secondary/40 shadow-glow-yellow">
                      <Image
                        src={testimonial.image}
                        alt={testimonial.name}
                        width={48}
                        height={48}
                        className="w-full h-full object-cover"
                      />
                    </div>
                  ) : (
                    <div className="w-12 h-12 rounded-full bg-secondary/20 border-2 border-secondary/40 flex items-center justify-center font-bold text-secondary text-sm shadow-glow-yellow">
                      {testimonial.avatar}
                    </div>
                  )}
                  <div>
                    <div className="font-semibold text-sm">
                      {testimonial.name}
                    </div>
                    <div className="text-xs text-muted-foreground">
                      {testimonial.role}
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
            </motion.div>
          ))}
        </div>

        {/* Stats Bar */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5, duration: 0.5 }}
          className="mt-16 max-w-4xl mx-auto"
        >
          <div className="glass glass-hover rounded-2xl p-10 shadow-premium border-primary/10">
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 text-center">
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold gradient-text mb-2">4.9/5</div>
                <div className="text-sm text-muted-foreground/80 font-medium">Client Rating</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold gradient-text mb-2">98%</div>
                <div className="text-sm text-muted-foreground/80 font-medium">Retention Rate</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold gradient-text mb-2">2.5x</div>
                <div className="text-sm text-muted-foreground/80 font-medium">Avg ROI</div>
              </motion.div>
              <motion.div
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
              >
                <div className="text-4xl font-bold gradient-text mb-2">500+</div>
                <div className="text-sm text-muted-foreground/80 font-medium">Projects</div>
              </motion.div>
            </div>
          </div>
        </motion.div>
      </div>

      {/* Background decoration */}
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-accent/5 rounded-full blur-3xl -z-10" />
    </section>
  );
}
