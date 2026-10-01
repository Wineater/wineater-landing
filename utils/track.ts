// Analytics events go to window.dataLayer, but only while the visitor has
// accepted analytics (see plugins/gtm.client.js). Before a choice is made, or
// after a rejection, events are dropped, never queued, so nothing that happened
// before consent is replayed to Google Tag Manager once GTM loads.
//
// Never put personal data in params: no emails, names or free-text queries.
let enabled = false

export function setTrackingEnabled(value: boolean) {
  enabled = value
}

export function track(name: string, params: Record<string, unknown> = {}) {
  if (typeof window === 'undefined' || !enabled) return
  const w = window as unknown as { dataLayer?: Record<string, unknown>[] }
  w.dataLayer = w.dataLayer || []
  w.dataLayer.push({ event: name, ...params })
}
