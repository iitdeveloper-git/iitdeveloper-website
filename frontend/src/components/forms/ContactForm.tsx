'use client';

import { useRef, useState } from 'react';
import Link from 'next/link';
import { CheckCircle2, AlertCircle } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { servicePillars } from '@/content/site';
import { track } from '@/lib/analytics';

type Status = 'idle' | 'submitting' | 'success' | 'error';

const fieldClass = 'w-full rounded-xl border-2 border-white/[0.08] bg-white/[0.03] px-4 py-3 text-foreground focus:border-secondary/50 focus:outline-none focus:ring-2 focus:ring-secondary/30';

export default function ContactForm() {
  const [status, setStatus] = useState<Status>('idle');
  const [error, setError] = useState('');
  const started = useRef(false);

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (status === 'submitting') return;
    setStatus('submitting');
    track('contact_form_submit');
    setError('');
    const form = event.currentTarget;
    const payload = Object.fromEntries(new FormData(form).entries());
    const params = new URLSearchParams(window.location.search);
    Object.assign(payload, {
      source_url: window.location.href,
      landing_page: sessionStorage.getItem('landing_page') || window.location.pathname,
      referrer: document.referrer,
      utm_source: params.get('utm_source') || '',
      utm_medium: params.get('utm_medium') || '',
      utm_campaign: params.get('utm_campaign') || '',
      utm_term: params.get('utm_term') || '',
      utm_content: params.get('utm_content') || '',
    });
    try {
      const response = await fetch('/api/leads', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(payload) });
      const body = await response.json();
      if (!response.ok) throw new Error(body.error || 'Unable to submit your enquiry.');
      setStatus('success');
      form.reset();
    } catch (submissionError) {
      setStatus('error');
      track('contact_form_error', { message: submissionError instanceof Error ? submissionError.message : 'unknown' });
      setError(submissionError instanceof Error ? submissionError.message : 'Unable to submit your enquiry.');
    }
  }

  if (status === 'success') return <div className="glass rounded-2xl border border-secondary/30 p-10 text-center" role="status"><CheckCircle2 className="mx-auto h-14 w-14 text-secondary" /><h2 className="mt-5 text-3xl font-bold">Enquiry received</h2><p className="mt-3 text-muted-foreground">We have recorded your project details and sent an acknowledgement email when email delivery is configured.</p></div>;

  return (
    <form onSubmit={handleSubmit} onFocus={() => { if (!started.current) { started.current = true; track('contact_form_start'); } }} className="glass rounded-2xl border border-white/10 p-6 sm:p-8" noValidate>
      <div className="grid gap-6 sm:grid-cols-2">
        <Field label="Full name" name="name" required />
        <Field label="Work email" name="email" type="email" required />
        <Field label="Phone or WhatsApp" name="phone" type="tel" />
        <Field label="Company" name="company" required />
        <Field label="Website" name="website" type="url" />
        <div><Label htmlFor="service_interest">Service needed *</Label><select id="service_interest" name="service_interest" required className={`${fieldClass} mt-2`} defaultValue=""><option value="" disabled>Select a service</option>{servicePillars.map((service) => <option key={service.slug} value={service.title}>{service.title}</option>)}<option>Not sure yet</option></select></div>
        <div><Label htmlFor="budget_range">Budget range *</Label><select id="budget_range" name="budget_range" required className={`${fieldClass} mt-2`} defaultValue=""><option value="" disabled>Select a range</option><option>Under ₹1 lakh</option><option>₹1–3 lakh</option><option>₹3–7 lakh</option><option>₹7–15 lakh</option><option>₹15 lakh+</option><option>Need help defining budget</option></select></div>
        <div><Label htmlFor="timeline">Desired timeline *</Label><select id="timeline" name="timeline" required className={`${fieldClass} mt-2`} defaultValue=""><option value="" disabled>Select a timeline</option><option>Within 1 month</option><option>1–3 months</option><option>3–6 months</option><option>6+ months</option><option>Exploring options</option></select></div>
      </div>
      <div className="mt-6"><Label htmlFor="message">Project description *</Label><Textarea id="message" name="message" required minLength={30} rows={7} className="mt-2" aria-describedby="message-help" /><p id="message-help" className="mt-2 text-xs text-muted-foreground">Include the objective, users, current system, constraints, and desired outcome.</p></div>
      <div className="absolute left-[-9999px]" aria-hidden="true"><Label htmlFor="website_confirm">Leave this field empty</Label><Input id="website_confirm" name="website_confirm" tabIndex={-1} autoComplete="off" /></div>
      <label className="mt-6 flex items-start gap-3 text-sm text-muted-foreground"><input type="checkbox" name="consent" value="true" required className="mt-1 h-4 w-4 accent-[#FFD662]" /><span>I agree that IITDEVELOPER may use this information to respond to my enquiry. See the <Link href="/privacy" className="text-secondary hover:underline">Privacy Policy</Link>.</span></label>
      {status === 'error' && <div className="mt-5 flex gap-2 rounded-xl border border-red-500/30 bg-red-500/10 p-4 text-sm text-red-200" role="alert"><AlertCircle className="h-5 w-5 shrink-0" />{error}</div>}
      <Button type="submit" variant="neon" size="lg" className="mt-7 w-full" disabled={status === 'submitting'}>{status === 'submitting' ? 'Submitting…' : 'Submit project enquiry'}</Button>
    </form>
  );
}

function Field({ label, name, type = 'text', required = false }: { label: string; name: string; type?: string; required?: boolean }) {
  return <div><Label htmlFor={name}>{label}{required ? ' *' : ''}</Label><Input id={name} name={name} type={type} required={required} className="mt-2" /></div>;
}
