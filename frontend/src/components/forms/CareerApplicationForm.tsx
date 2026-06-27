'use client';

import { useState, useRef } from 'react';
import { motion } from 'framer-motion';
import {
  Send, CheckCircle2, User, Mail, Phone, Building,
  Briefcase, Link2, FileText, Upload, X,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import {
  Select, SelectContent, SelectItem, SelectTrigger, SelectValue,
} from '@/components/ui/select';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import toast from 'react-hot-toast';

const POSITIONS = [
  'Senior Full Stack Developer',
  'AI/ML Engineer',
  'DevOps / Cloud Engineer',
  'UI/UX Designer',
  'Digital Marketing Specialist',
  'SEO Specialist',
  'Business Development Manager',
  'Project Manager',
  'Other / Open Application',
];

const EXPERIENCE_OPTIONS = ['0–1', '1–3', '3–5', '5–8', '8–12', '12+'];

interface FormData {
  full_name: string;
  email: string;
  phone: string;
  position: string;
  experience_years: string;
  current_company: string;
  linkedin_url: string;
  portfolio_url: string;
  cover_letter: string;
}

interface Props {
  /** Pre-select a position (from job card "Apply Now") */
  preselectedPosition?: string;
}

export default function CareerApplicationForm({ preselectedPosition }: Props) {
  const [form, setForm] = useState<FormData>({
    full_name: '',
    email: '',
    phone: '',
    position: preselectedPosition || '',
    experience_years: '',
    current_company: '',
    linkedin_url: '',
    portfolio_url: '',
    cover_letter: '',
  });

  const [resumeFile, setResumeFile] = useState<File | null>(null);
  const [resumeBase64, setResumeBase64] = useState<string>('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm(prev => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSelect = (name: string, value: string) => {
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const maxMB = 5;
    if (file.size > maxMB * 1024 * 1024) {
      toast.error(`Resume must be under ${maxMB} MB`);
      return;
    }
    const allowed = ['application/pdf', 'application/msword',
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document'];
    if (!allowed.includes(file.type)) {
      toast.error('Only PDF or Word documents are accepted');
      return;
    }

    setResumeFile(file);
    const reader = new FileReader();
    reader.onload = () => {
      // Strip the data:…;base64, prefix
      const base64 = (reader.result as string).split(',')[1];
      setResumeBase64(base64);
    };
    reader.readAsDataURL(file);
  };

  const removeResume = () => {
    setResumeFile(null);
    setResumeBase64('');
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.full_name || !form.email || !form.position || !form.cover_letter) {
      toast.error('Please fill in all required fields');
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('/api/careers', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...form,
          resume_filename: resumeFile?.name,
          resume_base64: resumeBase64 || undefined,
        }),
      });

      if (!res.ok) {
        const err = await res.json();
        throw new Error(err.message || 'Submission failed');
      }

      setIsSuccess(true);
      toast.success("Application submitted! We'll review and get back to you soon.");
    } catch (err) {
      console.error(err);
      toast.error('Something went wrong. Please try again or email us directly.');
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSuccess) {
    return (
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="flex flex-col items-center justify-center py-16 text-center"
      >
        <CheckCircle2 className="w-20 h-20 text-primary mb-6" />
        <h3 className="text-3xl font-bold mb-3">Application Received!</h3>
        <p className="text-muted-foreground/80 max-w-md">
          We've received your application and will review it carefully.
          Expect to hear from us within 5–7 business days.
        </p>
      </motion.div>
    );
  }

  return (
    <Card glass premium className="max-w-3xl mx-auto">
      <CardHeader>
        <CardTitle className="text-3xl">Apply Now</CardTitle>
        <CardDescription className="text-base">
          Fill in the form below and attach your resume. We read every application.
        </CardDescription>
      </CardHeader>

      <CardContent>
        <form onSubmit={handleSubmit} className="space-y-6">

          {/* Name + Email */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="full_name" className="flex items-center gap-2">
                <User className="w-4 h-4" /> Full Name *
              </Label>
              <Input id="full_name" name="full_name" placeholder="Jane Doe"
                value={form.full_name} onChange={handleChange} required glass />
            </div>
            <div className="space-y-2">
              <Label htmlFor="email" className="flex items-center gap-2">
                <Mail className="w-4 h-4" /> Email Address *
              </Label>
              <Input id="email" name="email" type="email" placeholder="jane@example.com"
                value={form.email} onChange={handleChange} required glass />
            </div>
          </div>

          {/* Phone + Current Company */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="phone" className="flex items-center gap-2">
                <Phone className="w-4 h-4" /> Phone Number
              </Label>
              <Input id="phone" name="phone" type="tel" placeholder="+91 98765 43210"
                value={form.phone} onChange={handleChange} glass />
            </div>
            <div className="space-y-2">
              <Label htmlFor="current_company" className="flex items-center gap-2">
                <Building className="w-4 h-4" /> Current Company
              </Label>
              <Input id="current_company" name="current_company" placeholder="Acme Corp"
                value={form.current_company} onChange={handleChange} glass />
            </div>
          </div>

          {/* Position + Experience */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="position">Applying For *</Label>
              <Select value={form.position} onValueChange={v => handleSelect('position', v)}>
                <SelectTrigger id="position" glass>
                  <SelectValue placeholder="Select a role" />
                </SelectTrigger>
                <SelectContent>
                  {POSITIONS.map(p => (
                    <SelectItem key={p} value={p}>{p}</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div className="space-y-2">
              <Label htmlFor="experience_years" className="flex items-center gap-2">
                <Briefcase className="w-4 h-4" /> Years of Experience
              </Label>
              <Select value={form.experience_years} onValueChange={v => handleSelect('experience_years', v)}>
                <SelectTrigger id="experience_years" glass>
                  <SelectValue placeholder="Select range" />
                </SelectTrigger>
                <SelectContent>
                  {EXPERIENCE_OPTIONS.map(o => (
                    <SelectItem key={o} value={o}>{o} years</SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>

          {/* LinkedIn + Portfolio */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-2">
              <Label htmlFor="linkedin_url" className="flex items-center gap-2">
                <Link2 className="w-4 h-4" /> LinkedIn Profile
              </Label>
              <Input id="linkedin_url" name="linkedin_url" type="url"
                placeholder="https://linkedin.com/in/your-profile"
                value={form.linkedin_url} onChange={handleChange} glass />
            </div>
            <div className="space-y-2">
              <Label htmlFor="portfolio_url" className="flex items-center gap-2">
                <Link2 className="w-4 h-4" /> Portfolio / GitHub
              </Label>
              <Input id="portfolio_url" name="portfolio_url" type="url"
                placeholder="https://github.com/yourhandle"
                value={form.portfolio_url} onChange={handleChange} glass />
            </div>
          </div>

          {/* Resume Upload */}
          <div className="space-y-2">
            <Label className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Resume / CV
              <span className="text-xs text-muted-foreground/60 font-normal">(PDF or Word, max 5 MB)</span>
            </Label>
            {resumeFile ? (
              <div className="flex items-center gap-3 glass rounded-lg px-4 py-3 border border-primary/20">
                <FileText className="w-5 h-5 text-primary flex-shrink-0" />
                <span className="text-sm flex-1 truncate">{resumeFile.name}</span>
                <button type="button" onClick={removeResume}
                  className="text-muted-foreground/60 hover:text-destructive transition-colors">
                  <X className="w-4 h-4" />
                </button>
              </div>
            ) : (
              <button
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="w-full flex flex-col items-center justify-center gap-2 glass rounded-lg px-4 py-8 border-2 border-dashed border-primary/20 hover:border-primary/40 transition-colors cursor-pointer"
              >
                <Upload className="w-8 h-8 text-primary/60" />
                <span className="text-sm text-muted-foreground/70">Click to upload your resume</span>
                <span className="text-xs text-muted-foreground/40">PDF, DOC, DOCX — up to 5 MB</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept=".pdf,.doc,.docx,application/pdf,application/msword,application/vnd.openxmlformats-officedocument.wordprocessingml.document"
              onChange={handleFileChange}
              className="hidden"
            />
          </div>

          {/* Cover Letter */}
          <div className="space-y-2">
            <Label htmlFor="cover_letter" className="flex items-center gap-2">
              <FileText className="w-4 h-4" /> Cover Letter *
            </Label>
            <Textarea
              id="cover_letter" name="cover_letter"
              placeholder="Tell us why you want to join IIT Developer, what excites you about this role, and what makes you a great fit…"
              value={form.cover_letter} onChange={handleChange}
              required glass rows={6} className="resize-none"
            />
          </div>

          {/* Submit */}
          <Button type="submit" variant="neon" size="lg"
            className="w-full group relative overflow-hidden" disabled={isSubmitting}>
            <span className="absolute inset-0 shimmer opacity-0 group-hover:opacity-100 transition-opacity" />
            <span className="relative flex items-center justify-center">
              {isSubmitting ? (
                <>
                  <div className="animate-spin rounded-full h-5 w-5 border-b-2 border-white mr-2" />
                  Submitting…
                </>
              ) : (
                <>
                  Submit Application
                  <Send className="ml-2 w-5 h-5 group-hover:translate-x-1 transition-transform" />
                </>
              )}
            </span>
          </Button>

          <p className="text-xs text-center text-muted-foreground/60">
            By applying you agree to our{' '}
            <a href="/privacy" className="text-primary hover:underline">Privacy Policy</a>.
            We keep your data confidential.
          </p>
        </form>
      </CardContent>
    </Card>
  );
}
