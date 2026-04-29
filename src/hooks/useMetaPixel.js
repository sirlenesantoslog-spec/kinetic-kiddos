/**
 * trackEvent — dispara eventos para o Meta Pixel de forma segura.
 * O Pixel já é inicializado no index.html (PageView automático).
 *
 * Uso:
 *   import { trackEvent } from '../hooks/useMetaPixel'
 *   trackEvent('InitiateCheckout')
 *   trackEvent('Lead')
 */
export function trackEvent(eventName, params = {}) {
  if (typeof window !== 'undefined' && window.fbq) {
    window.fbq('track', eventName, params)
  }
}
