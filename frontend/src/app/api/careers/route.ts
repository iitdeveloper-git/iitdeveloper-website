import { NextRequest, NextResponse } from 'next/server';
import { EmailService } from '@/lib/services/email-service';
import { z } from 'zod';

const ApplicationSchema = z.object({
  full_name: z.string().min(1, 'Name is required'),
  email: z.string().email('Invalid email address'),
  phone: z.string().optional(),
  position: z.string().min(1, 'Position is required'),
  experience_years: z.string().optional(),
  current_company: z.string().optional(),
  linkedin_url: z.string().url().optional().or(z.literal('')),
  portfolio_url: z.string().url().optional().or(z.literal('')),
  cover_letter: z.string().min(10, 'Please write a short cover letter'),
  // resume_base64 and resume_filename come from client-side FileReader
  resume_filename: z.string().optional(),
  resume_base64: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    const parsed = ApplicationSchema.safeParse(body);

    if (!parsed.success) {
      return NextResponse.json(
        { success: false, error: 'Validation failed', details: parsed.error.errors },
        { status: 400 }
      );
    }

    const d = parsed.data;

    // Build attachment if resume was provided
    const attachments =
      d.resume_base64 && d.resume_filename
        ? [
            {
              filename: d.resume_filename,
              content: d.resume_base64,
              encoding: 'base64' as const,
            },
          ]
        : [];

    // Build HTML for internal notification
    const notificationHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px;">
  <table width="620" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:30px 40px;border-radius:8px 8px 0 0;">
      <h1 style="margin:0;color:#fff;font-size:22px;">🧑‍💼 New Job Application</h1>
    </td></tr>
    <tr><td style="padding:36px 40px;">
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-radius:6px;">
        <tr><td style="padding:20px;">
          <p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>Name:</strong> ${d.full_name}</p>
          <p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>Email:</strong> <a href="mailto:${d.email}" style="color:#6366f1;">${d.email}</a></p>
          ${d.phone ? `<p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>Phone:</strong> ${d.phone}</p>` : ''}
          <p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>Applying For:</strong> ${d.position}</p>
          ${d.experience_years ? `<p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>Experience:</strong> ${d.experience_years} years</p>` : ''}
          ${d.current_company ? `<p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>Current Company:</strong> ${d.current_company}</p>` : ''}
          ${d.linkedin_url ? `<p style="margin:0 0 10px;font-size:15px;color:#111;"><strong>LinkedIn:</strong> <a href="${d.linkedin_url}" style="color:#6366f1;">${d.linkedin_url}</a></p>` : ''}
          ${d.portfolio_url ? `<p style="margin:0;font-size:15px;color:#111;"><strong>Portfolio:</strong> <a href="${d.portfolio_url}" style="color:#6366f1;">${d.portfolio_url}</a></p>` : ''}
        </td></tr>
      </table>
      <h3 style="margin:24px 0 10px;color:#333;font-size:16px;">Cover Letter:</h3>
      <div style="padding:16px 20px;background:#f8f9fa;border-left:4px solid #6366f1;border-radius:6px;">
        <p style="margin:0;font-size:14px;color:#444;line-height:1.7;white-space:pre-wrap;">${d.cover_letter}</p>
      </div>
      ${d.resume_filename ? `<p style="margin:20px 0 0;font-size:14px;color:#666;">📎 Resume attached: <strong>${d.resume_filename}</strong></p>` : '<p style="margin:20px 0 0;font-size:14px;color:#999;">No resume attached.</p>'}
      <div style="margin-top:28px;text-align:center;">
        <a href="mailto:${d.email}?subject=Re: Your Application at IIT Developer – ${d.position}"
           style="display:inline-block;padding:12px 28px;background:linear-gradient(135deg,#6366f1,#8b5cf6);color:#fff;text-decoration:none;border-radius:6px;font-weight:600;">
          Reply to Applicant
        </a>
      </div>
    </td></tr>
    <tr><td style="padding:20px 40px;background:#f8f9fa;border-radius:0 0 8px 8px;text-align:center;">
      <p style="margin:0;font-size:12px;color:#999;">Submitted ${new Date().toLocaleString('en-IN', { dateStyle: 'full', timeStyle: 'short', timeZone: 'Asia/Kolkata' })} IST</p>
    </td></tr>
  </table></td></tr></table>
</body></html>`;

    // Confirmation HTML for applicant
    const confirmationHtml = `
<!DOCTYPE html><html><head><meta charset="utf-8"></head>
<body style="font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',sans-serif;background:#f5f5f5;margin:0;padding:0;">
  <table width="100%" cellpadding="0" cellspacing="0"><tr><td align="center" style="padding:40px 20px;">
  <table width="600" cellpadding="0" cellspacing="0" style="background:#fff;border-radius:8px;box-shadow:0 2px 8px rgba(0,0,0,0.1);">
    <tr><td style="background:linear-gradient(135deg,#6366f1,#8b5cf6);padding:40px;border-radius:8px 8px 0 0;text-align:center;">
      <h1 style="margin:0;color:#fff;font-size:26px;">Application Received! 🎉</h1>
    </td></tr>
    <tr><td style="padding:40px;">
      <p style="margin:0 0 18px;font-size:16px;color:#333;">Hi <strong>${d.full_name}</strong>,</p>
      <p style="margin:0 0 18px;font-size:16px;color:#555;line-height:1.6;">
        Thank you for applying for the <strong>${d.position}</strong> role at IIT Developer. We've received your application and our team will review it carefully.
      </p>
      <p style="margin:0 0 18px;font-size:16px;color:#555;line-height:1.6;">
        If your profile matches what we're looking for, we'll reach out within <strong>5–7 business days</strong> to schedule a conversation.
      </p>
      <table width="100%" cellpadding="0" cellspacing="0" style="background:#f8f9fa;border-radius:6px;margin:24px 0;">
        <tr><td style="padding:20px;">
          <h3 style="margin:0 0 12px;color:#6366f1;font-size:16px;">📋 Application Summary</h3>
          <p style="margin:0 0 8px;font-size:14px;color:#555;"><strong>Position:</strong> ${d.position}</p>
          ${d.experience_years ? `<p style="margin:0 0 8px;font-size:14px;color:#555;"><strong>Experience:</strong> ${d.experience_years} years</p>` : ''}
          ${d.current_company ? `<p style="margin:0;font-size:14px;color:#555;"><strong>Current Company:</strong> ${d.current_company}</p>` : ''}
        </td></tr>
      </table>
      <p style="margin:0;font-size:16px;color:#333;line-height:1.6;">
        Best of luck,<br><strong>The IIT Developer Team</strong>
      </p>
    </td></tr>
    <tr><td style="padding:24px 40px;background:#f8f9fa;border-radius:0 0 8px 8px;text-align:center;">
      <p style="margin:0 0 6px;font-size:14px;color:#666;"><strong>IIT Developer</strong> — Building Tomorrow's Solutions Today</p>
      <p style="margin:0;font-size:12px;color:#999;">📧 info@iitdeveloper.com | 🌐 iitdeveloper.com</p>
    </td></tr>
  </table></td></tr></table>
</body></html>`;

    const salesEmail = process.env.SALES_EMAIL || 'info@iitdeveloper.com';

    // Send both emails concurrently (internal notification + applicant confirmation)
    const [notifResult, confirmResult] = await Promise.all([
      EmailService.sendRaw({
        to: salesEmail,
        replyTo: d.email,
        subject: `🧑‍💼 New Application: ${d.full_name} → ${d.position}`,
        html: notificationHtml,
        attachments,
      }),
      EmailService.sendRaw({
        to: d.email,
        replyTo: salesEmail,
        subject: `We received your application for ${d.position} — IIT Developer`,
        html: confirmationHtml,
      }),
    ]);

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
    });
  } catch (error) {
    console.error('Error processing career application:', error);
    return NextResponse.json(
      { success: false, error: 'Failed to submit application', message: error instanceof Error ? error.message : 'Unknown error' },
      { status: 500 }
    );
  }
}
