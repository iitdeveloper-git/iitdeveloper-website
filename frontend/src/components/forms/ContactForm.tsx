'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { Send, CheckCircle2, AlertCircle, Mail, Phone, MessageSquare, Building, User } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import toast from 'react-hot-toast';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  company: string;
  service: string;
  budget: string;
  message: string;
}

const services = [
  'Website Development',
  'App Development',
  'DevOps & Cloud',
  'Salesforce Solutions',
  'AI Agents',
  'AI Workflows',
  'Performance Marketing',
  'SEO & SMM',
  'Not Sure Yet',
];

const budgets = [
  'Under $5K',
  '$5K - $10K',
  '$10K - $25K',
  '$25K - $50K',
  '$50K - $100K',
  '$100K+',
  'Let\'s Discuss',
];

export default function ContactForm() {
  const [formData, setFormData] = useState<ContactFormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    budget: '',
    message: '',
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSelectChange = (name: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    try {
      // Validate required fields
      if (!formData.name || !formData.email || !formData.message) {
        toast.error('Please fill in all required fields');
        setIsSubmitting(false);
        return;
      }

      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(formData.email)) {
        toast.error('Please enter a valid email address');
        setIsSubmitting(false);
        return;
      }

      // Prepare lead data
      const leadData = {
        name: formData.name,
        email: formData.email,
        phone: formData.phone || null,
        company: formData.company || null,
        source: 'contact_form',
        message: formData.message,
        metadata: {
          service_interest: formData.service || 'Not specified',
          budget_range: formData.budget || 'Not specified',
          form_type: 'contact',
          submitted_at: new Date().toISOString(),
        },
      };

      // Submit to API
      const response = await fetch('/api/leads', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(leadData),
      });

      if (!response.ok) {
        throw new Error('Failed to submit form');
      }

      const result = await response.json();

      // Success!
      setIsSuccess(true);
      toast.success('Message sent! We\'ll get back to you within 24 hours.');

      // Reset form after 3 seconds
      setTimeout(() => {
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          budget: '',
          message: '',
        });
        setIsSuccess(false);
      }, 3000);
    } catch (error) {
      console.error('Form submission error:', error);
      toast.error('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <Card glass premium className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Get In Touch</CardTitle>
        <CardDescription className="text-base">
          Tell us about your project. We promise to reply faster than your last agency did.
          <span className="block text-xs text-muted-foreground/60 mt-2 italic">
            ⚡ Average response time: 4 hours. Not 4 days.
          </span>
        </CardDescription>
      </CardHeader>
      <CardContent>
        {isSuccess ? (
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            className="flex flex-col items-center justify-center py-12 text-center"
          >
            <CheckCircle2 className="w-20 h-20 text-primary mb-6" />
            <h3 className="text-2xl font-bold mb-3">Message Received!</h3>
            <p className="text-muted-foreground/80 max-w-md">
              We've received your message and will get back to you within 24 hours.
              Check your email for confirmation.
            </p>
          </motion.div>
        ) : (
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Name & Email */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="name" className="flex items-center space-x-2">
                  <User className="w-4 h-4" />
                  <span>Full Name *</span>
                </Label>
                <Input
                  id="name"
                  name="name"
                  type="text"
                  placeholder="John Doe"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  glass
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="email" className="flex items-center space-x-2">
                  <Mail className="w-4 h-4" />
                  <span>Email Address *</span>
                </Label>
                <Input
                  id="email"
                  name="email"
                  type="email"
                  placeholder="john@company.com"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  glass
                />
              </div>
            </div>

            {/* Phone & Company */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="phone" className="flex items-center space-x-2">
                  <Phone className="w-4 h-4" />
                  <span>Phone Number</span>
                </Label>
                <Input
                  id="phone"
                  name="phone"
                  type="tel"
                  placeholder="+1 (555) 000-0000"
                  value={formData.phone}
                  onChange={handleChange}
                  glass
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="company" className="flex items-center space-x-2">
                  <Building className="w-4 h-4" />
                  <span>Company Name</span>
                </Label>
                <Input
                  id="company"
                  name="company"
                  type="text"
                  placeholder="Acme Inc."
                  value={formData.company}
                  onChange={handleChange}
                  glass
                />
              </div>
            </div>

            {/* Service & Budget */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="service">Service Interest</Label>
                <Select
                  value={formData.service}
                  onValueChange={(value) => handleSelectChange('service', value)}
                >
                  <SelectTrigger id="service" glass>
                    <SelectValue placeholder="Select a service" />
                  </SelectTrigger>
                  <SelectContent>
                    {services.map((service) => (
                      <SelectItem key={service} value={service}>
                        {service}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="budget">Budget Range</Label>
                <Select
                  value={formData.budget}
                  onValueChange={(value) => handleSelectChange('budget', value)}
                >
                  <SelectTrigger id="budget" glass>
                    <SelectValue placeholder="Select budget range" />
                  </SelectTrigger>
                  <SelectContent>
                    {budgets.map((budget) => (
                      <SelectItem key={budget} value={budget}>
                        {budget}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Message */}
            <div className="space-y-2">
              <Label htmlFor="message" className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4" />
                <span>Tell Us About Your Project *</span>
              </Label>
              <Textarea
                id="message"
                name="message"
                placeholder="What are you looking to build? What's the timeline? Any specific requirements?"
                value={formData.message}
                onChange={handleChange}
                required
                glass
                rows={6}
                className="resize-none"
              />
              <p className="text-xs text-muted-foreground/60">
                The more details, the better. We won't judge if you use bullet points.
              </p>
            </div>

            {/* Submit Button */}
            <Button
              type="submit"
              variant="neon"
              size="lg"
              className="w-full group relative overflow-hidden"
              disabled={isSubmitting}
            >
              <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
              <span className="relative flex items-center justify-center">
                {isSubmitting ? (
                  <>
                    <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                    Sending...
                  </>
                ) : (
                  <>
                    Send Message
                    <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                  </>
                )}
              </span>
            </Button>

            <p className="text-xs text-center text-muted-foreground/60">
              By submitting this form, you agree to our{' '}
              <a href="/privacy" className="text-primary hover:underline">
                Privacy Policy
              </a>
              . We respect your inbox.
            </p>
          </form>
        )}
      </CardContent>
    </Card>
  );
}
