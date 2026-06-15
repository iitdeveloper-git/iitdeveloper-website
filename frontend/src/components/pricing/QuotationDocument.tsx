'use client';

import React from 'react';
import { PricingEstimate, LineItem, ServiceCategory } from '@/types/pricing';
import { serviceTemplates } from '@/lib/pricing-config';

// ─── Types ────────────────────────────────────────────────────────────────────

export interface QuotationDocumentProps {
  estimate: PricingEstimate;
  quotationNumber: string;
}

// ─── Company Details ──────────────────────────────────────────────────────────

const COMPANY = {
  name: 'IITDeveloper',
  tagline: 'Engineering Excellence · AI · Innovation',
  email: 'contact@iitdeveloper.com',
  phone: '+91 XXXXX XXXXX',
  website: 'www.iitdeveloper.com',
  address: 'India (Remote Worldwide)',
};

// ─── Category-Specific Terms & Conditions ────────────────────────────────────

const CATEGORY_TERMS: Record<ServiceCategory, string[]> = {
  ecommerce: [
    '50% advance payment required before store development begins.',
    'Remaining 50% due upon store launch and client sign-off.',
    'Custom store design, code, and content are owned by the client upon full payment.',
    'Shopify/platform subscription, theme license, and third-party app fees are the client\'s responsibility.',
    'Payment gateway setup requires client-owned merchant accounts (Stripe, Razorpay, PayPal, etc.).',
    'Marketplace integrations (Amazon, Flipkart) require active client seller accounts.',
    '60-day post-launch support for bug fixes and minor adjustments included.',
  ],
  devops: [
    '50% advance payment required before infrastructure setup begins.',
    'Remaining 50% due upon environment handover, documentation, and client sign-off.',
    'Cloud infrastructure costs (AWS / GCP / Azure) are billed directly to the client\'s own cloud account.',
    'IITDeveloper will require temporary elevated access to configure infrastructure; all access revoked upon delivery.',
    'Infrastructure-as-Code (IaC) scripts, runbooks, and architecture diagrams transfer to client upon full payment.',
    'Post-delivery cloud costs and ongoing management are the client\'s responsibility unless a retainer is agreed.',
    '30-day post-setup support included for configuration questions and minor adjustments.',
  ],
  design: [
    '50% advance payment required before creative work begins.',
    'Up to 2 revision rounds included; additional revisions billed at our standard hourly rate.',
    'Final files delivered in agreed formats (AI, EPS, SVG, PNG, MP4, etc.) upon full payment.',
    'Source files (Figma, Adobe Illustrator / After Effects / Premiere) transferred upon full payment.',
    'Stock images, fonts, and music licensing fees, if required, are billed at actuals.',
    'Client to provide brand guidelines, reference materials, and written feedback within 5 business days of each review.',
    'Unused design concepts and rejected revisions remain the property of IITDeveloper.',
  ],
  crm: [
    '50% advance payment required before Salesforce configuration begins.',
    'Remaining 50% due upon successful User Acceptance Testing (UAT) and client sign-off.',
    'Client must hold a valid Salesforce license; IITDeveloper does not resell or procure licenses.',
    'Data migration requires client-provided clean, formatted data; IITDeveloper does not guarantee source data quality.',
    'All customizations follow Salesforce best practices to ensure long-term maintainability.',
    '30-day post-go-live hypercare support included for critical issues.',
    'All documentation, flow diagrams, and training materials delivered upon project completion.',
  ],
  b2b: [
    'Monthly retainer invoiced at the start of each billing period; payment due within 7 days of invoice.',
    'Minimum engagement: 3 months. 15-day written notice required for early cancellation.',
    'Client to provide Ideal Customer Profile (ICP) brief and value proposition documentation in Week 1.',
    'All campaign messaging and outreach copy require written client approval before launch.',
    'LinkedIn outreach campaigns require access to client\'s Sales Navigator or equivalent account.',
    'Lead quality criteria (title, company size, industry) defined and agreed upon before campaign launch.',
    'Monthly pipeline metrics report delivered by the 5th of each month.',
  ],
  technical: [
    '50% advance payment required before project commencement.',
    'Remaining 50% due upon final delivery and client sign-off.',
    'Full source code ownership transfers to client upon receipt of final payment.',
    '90-day bug-fix warranty included post-delivery (scope limited to original requirements).',
    'Any feature additions or scope changes beyond the agreed spec will be quoted separately.',
    'Project timeline begins from the date advance payment is confirmed.',
    'Hosting, domain, SSL, and third-party API/subscription costs are the client\'s responsibility.',
  ],
  ai: [
    '60% advance payment required before project commencement.',
    'Remaining 40% due upon final model deployment, testing, and client sign-off.',
    'Third-party AI API costs (OpenAI, Anthropic, Google, AWS Bedrock, etc.) billed at actuals + 10% handling fee.',
    'Client data used exclusively for training/fine-tuning the agreed model — never shared with third parties.',
    'Trained model weights and all intellectual property transfer to the client upon full payment.',
    'Ongoing inference and API costs post-delivery are the client\'s sole responsibility.',
    '60-day post-delivery technical support window included for bug fixes and minor tuning.',
    'Model performance benchmarks will be agreed upon prior to project start.',
  ],
  marketing: [
    'Monthly retainer invoiced at the start of each billing period; due within 7 days.',
    'Minimum engagement: 3 months. 15-day written notice required for early cancellation.',
    'Ad spend budgets are managed on behalf of the client and billed at actuals with zero markup.',
    'SEO and organic results depend on search engine algorithms — no specific ranking guarantees.',
    'Monthly KPI and performance report delivered within the first 5 business days of each month.',
    'Client must provide access to required accounts (Google Analytics, Search Console, Meta Business, etc.).',
    'Content, creatives, and copy produced remain property of the client upon full payment.',
  ],
  consulting: [
    'Consulting hours invoiced monthly based on verified time logs shared with the client.',
    'Minimum engagement: 4 hours per session; fractional hours billed in 30-minute increments.',
    'Time-tracked reports and timesheets shared with client for approval before invoicing.',
    'Standard rates apply Mon–Fri, 9 AM–6 PM IST. After-hours and weekend work billed at +50%.',
    'A Non-Disclosure Agreement (NDA) can be executed upon request at no additional cost.',
    'Prepaid retainer hours unused in a given month do not carry forward to the next billing cycle.',
    'Consulting advice is provided in good faith; implementation outcomes depend on client execution.',
  ],
};

const GENERAL_TERMS = [
  'This quotation is valid for 30 days from the date of issue. Prices are subject to revision after expiry.',
  'All prices are in USD unless explicitly stated otherwise.',
  'Applicable taxes (GST, VAT, withholding tax) will be levied per jurisdictional requirements.',
  'IITDeveloper reserves the right to assign qualified team members while maintaining delivery quality and timelines.',
  'All deliverables and communication will be in English unless otherwise agreed in writing.',
  'Either party may terminate the engagement with 15-day written notice; work completed to date will be billed.',
  'Disputes shall be governed by the laws of India or a mutually agreed jurisdiction.',
  'This document is confidential and intended solely for the named recipient.',
];

// ─── Category Display Labels ──────────────────────────────────────────────────

const CATEGORY_LABEL: Record<ServiceCategory, string> = {
  technical: 'Development & Engineering',
  ai: 'AI & Machine Learning',
  ecommerce: 'Ecommerce Development',
  devops: 'DevOps & Cloud Infrastructure',
  marketing: 'Marketing & Analytics',
  design: 'Graphic Design & Branding',
  crm: 'Salesforce & CRM Solutions',
  b2b: 'B2B Lead Generation & Promotion',
  consulting: 'Consulting & Support',
};

// ─── Helpers ──────────────────────────────────────────────────────────────────

function describeConfig(item: LineItem): string[] {
  const template = serviceTemplates.find((s) => s.id === item.serviceId);
  if (!template) return [];

  const lines: string[] = [];

  template.options.forEach((option) => {
    const val = item.configuration[option.id];
    if (val === undefined || val === null || val === '' || val === false) return;

    if (option.type === 'select') {
      const found = option.options?.find((o) => o.value === val);
      if (found) lines.push(`${option.label}: ${found.label}`);
    } else if (option.type === 'multiselect' && Array.isArray(val) && val.length > 0) {
      const labels = val
        .map((v) => option.options?.find((o) => o.value === v)?.label)
        .filter(Boolean);
      if (labels.length > 0) lines.push(`${option.label}: ${labels.join(', ')}`);
    } else if (option.type === 'number' && typeof val === 'number' && val > 0) {
      lines.push(`${option.label}: ${val}`);
    } else if (option.type === 'checkbox' && val === true) {
      lines.push(option.label);
    }
  });

  return lines;
}

function getCategories(estimate: PricingEstimate): ServiceCategory[] {
  const cats = new Set<ServiceCategory>();
  estimate.lineItems.forEach((item) => {
    const tpl = serviceTemplates.find((s) => s.id === item.serviceId);
    if (tpl) cats.add(tpl.category);
  });
  return Array.from(cats);
}

function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    maximumFractionDigits: 0,
  }).format(amount);
}

function formatDate(date: Date | string): string {
  return new Date(date).toLocaleDateString('en-US', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });
}

function getValidUntilDate(estimate: PricingEstimate): string {
  if (estimate.validUntil) return formatDate(estimate.validUntil);
  const d = new Date(estimate.createdAt);
  d.setDate(d.getDate() + 30);
  return formatDate(d);
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function QuotationDocument({ estimate, quotationNumber }: QuotationDocumentProps) {
  const subtotal =
    estimate.subtotal ??
    estimate.lineItems.reduce((s, i) => s + i.totalPrice, 0);

  const discountAmt = estimate.discount
    ? estimate.discount.type === 'percentage'
      ? (subtotal * estimate.discount.value) / 100
      : estimate.discount.value
    : 0;

  const taxAmt = estimate.tax?.amount ?? 0;
  const total = estimate.total ?? subtotal - discountAmt + taxAmt;

  const issueDate = formatDate(estimate.createdAt);
  const validUntil = getValidUntilDate(estimate);
  const categories = getCategories(estimate);

  const hasMonthlyService = estimate.lineItems.some(
    (item) => item.unit === 'month' || item.unit === 'hour'
  );

  // Suggested payment schedule amounts
  const advanceAmount = hasMonthlyService ? total : total * 0.5;
  const milestoneAmount = hasMonthlyService ? 0 : total * 0.25;
  const finalAmount = hasMonthlyService ? 0 : total * 0.25;

  return (
    <div
      id="quotation-document"
      className="bg-white text-gray-900 text-sm leading-relaxed max-w-4xl mx-auto print:max-w-full"
      style={{ fontFamily: 'Inter, system-ui, sans-serif' }}
    >
      {/* ─── Page Header ──────────────────────────────────────────────────── */}
      <div className="border-b-4 border-blue-600 pb-6 mb-8 flex justify-between items-start">
        <div>
          <h1 className="text-3xl font-black text-blue-700 tracking-tight">{COMPANY.name}</h1>
          <p className="text-xs text-gray-500 mt-1 italic">{COMPANY.tagline}</p>
          <div className="mt-3 space-y-0.5 text-xs text-gray-500">
            <p>{COMPANY.email}</p>
            <p>{COMPANY.phone}</p>
            <p>{COMPANY.website}</p>
            <p>{COMPANY.address}</p>
          </div>
        </div>

        <div className="text-right shrink-0">
          <div className="bg-blue-600 text-white px-6 py-2 rounded-lg mb-3 inline-block">
            <p className="text-xl font-black tracking-[0.2em]">QUOTATION</p>
          </div>
          <p className="text-xs text-gray-400 mb-0.5">Quotation No.</p>
          <p className="font-mono text-lg font-bold text-blue-700">{quotationNumber}</p>
          <div className="mt-3 text-xs text-gray-600 space-y-1.5">
            <div className="flex justify-between gap-8">
              <span className="text-gray-400">Issued:</span>
              <span className="font-medium">{issueDate}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-400">Valid Until:</span>
              <span className="font-medium text-orange-600">{validUntil}</span>
            </div>
            <div className="flex justify-between gap-8">
              <span className="text-gray-400">Status:</span>
              <span
                className={`font-semibold capitalize ${
                  estimate.status === 'approved'
                    ? 'text-green-600'
                    : estimate.status === 'sent'
                    ? 'text-blue-600'
                    : estimate.status === 'rejected'
                    ? 'text-red-500'
                    : 'text-yellow-600'
                }`}
              >
                {estimate.status}
              </span>
            </div>
          </div>
        </div>
      </div>

      {/* ─── Parties ──────────────────────────────────────────────────────── */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">From</p>
          <div className="bg-blue-50 border border-blue-100 rounded-xl p-4">
            <p className="font-bold text-blue-800 text-base">{COMPANY.name}</p>
            <p className="text-xs text-gray-500 mt-0.5">Technology & Digital Services Provider</p>
            <div className="mt-2 space-y-0.5 text-xs text-gray-500">
              <p>{COMPANY.email}</p>
              <p>{COMPANY.website}</p>
            </div>
          </div>
        </div>

        <div>
          <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-2">
            Quoted To
          </p>
          {estimate.customerInfo ? (
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-4">
              <p className="font-bold text-gray-800 text-base">{estimate.customerInfo.name}</p>
              {estimate.customerInfo.company && (
                <p className="text-xs text-gray-500 mt-0.5">{estimate.customerInfo.company}</p>
              )}
              <div className="mt-2 space-y-0.5 text-xs text-gray-500">
                <p>{estimate.customerInfo.email}</p>
              </div>
            </div>
          ) : (
            <div className="border-2 border-dashed border-gray-200 rounded-xl p-4 flex items-center justify-center h-[84px]">
              <p className="text-xs text-gray-400 text-center">
                Client details will appear here
                <br />
                after sending the quotation
              </p>
            </div>
          )}
        </div>
      </div>

      {/* ─── Services Table ───────────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Scope of Work &amp; Services
        </p>
        <div className="overflow-hidden rounded-xl border border-gray-200">
          <table className="w-full border-collapse text-xs">
            <thead>
              <tr className="bg-blue-600 text-white">
                <th className="py-3 px-3 text-center w-8 font-semibold">#</th>
                <th className="py-3 px-4 text-left font-semibold">Service</th>
                <th className="py-3 px-4 text-left font-semibold">Configuration &amp; Scope</th>
                <th className="py-3 px-3 text-center w-14 font-semibold">Qty</th>
                <th className="py-3 px-4 text-right w-28 font-semibold">Unit Price</th>
                <th className="py-3 px-4 text-right w-28 font-semibold">Total</th>
              </tr>
            </thead>
            <tbody>
              {estimate.lineItems.map((item, idx) => {
                const configLines = describeConfig(item);
                const template = serviceTemplates.find((s) => s.id === item.serviceId);
                const isEven = idx % 2 === 0;

                return (
                  <tr
                    key={item.id}
                    className={`border-t border-gray-100 ${isEven ? 'bg-white' : 'bg-gray-50/60'}`}
                  >
                    <td className="py-3 px-3 text-gray-400 text-center font-mono">{idx + 1}</td>
                    <td className="py-3 px-4">
                      <p className="font-semibold text-gray-800">{item.serviceName}</p>
                      {template && (
                        <p className="text-gray-400 text-xs mt-0.5">
                          {CATEGORY_LABEL[template.category]} · {template.estimatedDuration}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-4">
                      {configLines.length > 0 ? (
                        <ul className="space-y-0.5">
                          {configLines.map((line, i) => (
                            <li key={i} className="text-gray-600 flex gap-1.5">
                              <span className="text-blue-400 shrink-0 mt-px">›</span>
                              <span>{line}</span>
                            </li>
                          ))}
                        </ul>
                      ) : (
                        <span className="text-gray-400 italic">Standard configuration</span>
                      )}
                      {item.notes && (
                        <p className="text-gray-400 italic mt-1 text-xs border-t border-gray-100 pt-1">
                          Note: {item.notes}
                        </p>
                      )}
                    </td>
                    <td className="py-3 px-3 text-center text-gray-700">
                      <span className="font-semibold">{item.quantity}</span>
                      {item.unit !== 'project' && (
                        <span className="text-gray-400 text-xs block">{item.unit}</span>
                      )}
                    </td>
                    <td className="py-3 px-4 text-right font-mono text-gray-600">
                      {formatCurrency(item.basePrice)}
                    </td>
                    <td className="py-3 px-4 text-right font-mono font-bold text-gray-900">
                      {formatCurrency(item.totalPrice)}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>

      {/* ─── Totals Summary ───────────────────────────────────────────────── */}
      <div className="flex justify-end mb-8">
        <div className="w-80 space-y-1">
          <div className="flex justify-between text-xs text-gray-600 py-2 border-b border-gray-100">
            <span>Subtotal</span>
            <span className="font-mono font-semibold">{formatCurrency(subtotal)}</span>
          </div>

          {discountAmt > 0 && (
            <div className="flex justify-between text-xs py-2 border-b border-gray-100 text-green-600">
              <span>
                Discount
                {estimate.discount?.type === 'percentage'
                  ? ` (${estimate.discount.value}%)`
                  : ''}
                {estimate.discount?.reason ? ` — ${estimate.discount.reason}` : ''}
              </span>
              <span className="font-mono font-semibold">−{formatCurrency(discountAmt)}</span>
            </div>
          )}

          {taxAmt > 0 && (
            <div className="flex justify-between text-xs text-gray-600 py-2 border-b border-gray-100">
              <span>
                Tax
                {estimate.tax?.rate ? ` (${estimate.tax.rate}%)` : ''}
              </span>
              <span className="font-mono">{formatCurrency(taxAmt)}</span>
            </div>
          )}

          <div className="flex justify-between bg-blue-600 text-white px-5 py-3.5 rounded-xl mt-2">
            <span className="font-bold text-sm">Grand Total</span>
            <span className="font-mono font-black text-xl">{formatCurrency(total)}</span>
          </div>

          {hasMonthlyService && (
            <p className="text-xs text-orange-600 text-right pt-1">
              ✦ Monthly recurring services billed per period
            </p>
          )}
        </div>
      </div>

      {/* ─── Payment Schedule ─────────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-3">
          Suggested Payment Schedule
        </p>

        {!hasMonthlyService ? (
          <div className="grid grid-cols-3 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  1
                </span>
                <p className="font-bold text-blue-800 text-sm">Advance</p>
              </div>
              <p className="font-mono font-black text-blue-700 text-lg">
                {formatCurrency(advanceAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">50% · Due on contract signing</p>
            </div>

            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center font-bold">
                  2
                </span>
                <p className="font-bold text-gray-700 text-sm">Milestone</p>
              </div>
              <p className="font-mono font-black text-gray-700 text-lg">
                {formatCurrency(milestoneAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">25% · Due at mid-project review</p>
            </div>

            <div className="bg-green-50 rounded-xl p-4 border border-green-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-green-600 text-white text-xs flex items-center justify-center font-bold">
                  3
                </span>
                <p className="font-bold text-green-700 text-sm">Final</p>
              </div>
              <p className="font-mono font-black text-green-700 text-lg">
                {formatCurrency(finalAmount)}
              </p>
              <p className="text-xs text-gray-500 mt-1">25% · Due on final delivery</p>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-2 gap-3">
            <div className="bg-blue-50 rounded-xl p-4 border border-blue-100">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-blue-600 text-white text-xs flex items-center justify-center font-bold">
                  M
                </span>
                <p className="font-bold text-blue-800 text-sm">Monthly Retainer</p>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                Invoiced at the start of each billing period. Payment due within 7 days of invoice.
              </p>
            </div>
            <div className="bg-gray-50 rounded-xl p-4 border border-gray-200">
              <div className="flex items-center gap-2 mb-2">
                <span className="w-6 h-6 rounded-full bg-gray-400 text-white text-xs flex items-center justify-center font-bold">
                  S
                </span>
                <p className="font-bold text-gray-700 text-sm">One-Time Setup Fee</p>
              </div>
              <p className="text-xs text-gray-600 mt-1">
                If applicable, billed upfront on service commencement.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* ─── Terms & Conditions ───────────────────────────────────────────── */}
      <div className="mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-4">
          Terms &amp; Conditions
        </p>

        <div className="space-y-5">
          {categories.map((cat) => (
            <div key={cat}>
              <p className="text-xs font-bold text-blue-700 mb-2 flex items-center gap-2">
                <span className="w-1.5 h-1.5 rounded-full bg-blue-500 inline-block" />
                {CATEGORY_LABEL[cat]}
              </p>
              <ul className="space-y-1 ml-3.5">
                {CATEGORY_TERMS[cat].map((term, i) => (
                  <li key={i} className="flex gap-2 text-xs text-gray-600">
                    <span className="text-blue-300 shrink-0 font-mono">{i + 1}.</span>
                    <span>{term}</span>
                  </li>
                ))}
              </ul>
            </div>
          ))}

          <div>
            <p className="text-xs font-bold text-gray-500 mb-2 flex items-center gap-2">
              <span className="w-1.5 h-1.5 rounded-full bg-gray-400 inline-block" />
              General
            </p>
            <ul className="space-y-1 ml-3.5">
              {GENERAL_TERMS.map((term, i) => (
                <li key={i} className="flex gap-2 text-xs text-gray-600">
                  <span className="text-gray-300 shrink-0 font-mono">{i + 1}.</span>
                  <span>{term}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>

      {/* ─── Acceptance & Signatures ──────────────────────────────────────── */}
      <div className="border-t-2 border-gray-100 pt-8 mb-8">
        <p className="text-xs font-bold uppercase tracking-widest text-gray-400 mb-6">
          Acceptance &amp; Authorization
        </p>
        <p className="text-xs text-gray-500 mb-8 max-w-xl">
          By signing below, both parties agree to the scope of work, pricing, and terms outlined in
          this quotation. This document becomes a binding agreement upon signature.
        </p>

        <div className="grid grid-cols-2 gap-16">
          <div>
            <p className="text-xs text-gray-400 mb-8">Authorized by (Service Provider)</p>
            <div className="border-b-2 border-gray-200 mb-3 h-12" />
            <p className="text-sm font-bold text-gray-800">{COMPANY.name}</p>
            <p className="text-xs text-gray-500">Authorized Signatory</p>
            <p className="text-xs text-gray-400 mt-1">{COMPANY.email}</p>
            <p className="text-xs text-gray-400 mt-4">Date: ______________________</p>
          </div>

          <div>
            <p className="text-xs text-gray-400 mb-8">Accepted by (Client)</p>
            <div className="border-b-2 border-gray-200 mb-3 h-12" />
            <p className="text-sm font-bold text-gray-800">
              {estimate.customerInfo?.name || '______________________________'}
            </p>
            <p className="text-xs text-gray-500">
              {estimate.customerInfo?.company || 'Company / Organization'}
            </p>
            <p className="text-xs text-gray-400 mt-1">
              {estimate.customerInfo?.email || 'Email: ______________________'}
            </p>
            <p className="text-xs text-gray-400 mt-4">Date: ______________________</p>
          </div>
        </div>
      </div>

      {/* ─── Footer ───────────────────────────────────────────────────────── */}
      <div className="border-t border-gray-100 pt-4 text-center text-xs text-gray-400 space-y-1">
        <p>
          Generated by <span className="font-semibold text-blue-600">{COMPANY.name}</span> ·{' '}
          {COMPANY.website} · Ref:{' '}
          <span className="font-mono">{quotationNumber}</span>
        </p>
        <p>Confidential — For the intended recipient only. Not valid after {validUntil}.</p>
      </div>
    </div>
  );
}
