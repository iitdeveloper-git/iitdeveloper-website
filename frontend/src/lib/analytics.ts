export type AnalyticsEvent =
  | 'page_view'
  | 'cta_click'
  | 'booking_click'
  | 'contact_form_start'
  | 'contact_form_submit'
  | 'contact_form_error'
  | 'estimate_start'
  | 'estimate_complete'
  | 'service_view'
  | 'case_study_view'
  | 'insight_view'
  | 'outbound_project_click';

export function track(event: AnalyticsEvent, properties: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || process.env.NEXT_PUBLIC_ENABLE_ANALYTICS !== 'true') return;
  const payload = { event, ...properties };
  window.dispatchEvent(new CustomEvent('iitdeveloper:analytics', { detail: payload }));
  const dataLayer = (window as typeof window & { dataLayer?: Record<string, unknown>[] }).dataLayer;
  dataLayer?.push(payload);
}

