// Google Analytics 4 Configuration
// Replace with your actual GA4 Measurement ID

export const GA_MEASUREMENT_ID = 'G-9TLYQ0R185';
export const GA_API_SECRET = 'your-api-secret'; // Optional: for server-side validation

/**
 * Track an event with GA4
 */
export function trackEvent(eventName: string, params?: Record<string, unknown>): void {
  if (typeof window !== 'undefined' && window.gtag) {
    window.gtag('event', eventName, params);
  }
}

/**
 * Track dp_generated event
 */
export function trackDpGenerated(data: {
  designId: string;
  designName: string;
  hasBgRemoved?: boolean;
  userName?: string;
}): void {
  trackEvent('dp_generated', {
    design_id: data.designId,
    design_name: data.designName,
    has_bg_removed: data.hasBgRemoved,
    user_name: data.userName || '',
  });
}

/**
 * Track design_selected event
 */
export function trackDesignSelected(designId: string, designName: string): void {
  trackEvent('design_selected', {
    design_id: designId,
    design_name: designName,
  });
}

/**
 * Track bg_toggle event
 */
export function trackBgToggle(action: 'enabled' | 'disabled'): void {
  trackEvent('bg_toggle', {
    action,
  });
}

// Extend Window interface for TypeScript
declare global {
  interface Window {
    gtag: (...args: unknown[]) => void;
  }
}
