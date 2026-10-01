// Google Tag Manager with Google Consent Mode v2.
//
// - The consent "default" (everything denied) is the very first dataLayer
//   command, set when the app starts and before any GTM code exists.
// - The GTM script is loaded only after the visitor accepts analytics
//   (stricter than Consent Mode requires).
// - Accepting grants analytics_storage only. The site runs no ads, so
//   ad_storage, ad_user_data and ad_personalization always stay denied.
// - Rejecting or withdrawing sets everything back to denied. If GTM was already
//   loaded it stays in the page until reload, but its tags are blocked by
//   consent. GA cookies (_ga, _ga_*) are removed on withdrawal.
const GTM_ID = 'GTM-NLBPMC7X'

let loaded = false

function gtag() {
  // Consent Mode needs the real `arguments` object, not an array.
  window.dataLayer.push(arguments)
}

function loadGtm() {
  if (loaded || typeof document === 'undefined') return
  loaded = true

  window.dataLayer = window.dataLayer || []
  const alreadyStarted = window.dataLayer.some((item) => item && item['gtm.start'])
  if (!alreadyStarted) {
    window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })
  }

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  const noscript = document.createElement('noscript')
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
  document.body.appendChild(noscript)
}

function clearGaCookies() {
  const names = document.cookie
    .split('; ')
    .map((c) => c.split('=')[0])
    .filter((n) => n === '_ga' || n.startsWith('_ga_'))
  const parts = location.hostname.split('.')
  const domains = ['']
  for (let i = 0; i < parts.length - 1; i++) domains.push(`; domain=.${parts.slice(i).join('.')}`)
  names.forEach((n) => {
    domains.forEach((d) => {
      document.cookie = `${n}=; Max-Age=0; Path=/${d}`
    })
  })
}

function setConsentMode(granted) {
  window.dataLayer = window.dataLayer || []
  gtag('consent', 'update', {
    analytics_storage: granted ? 'granted' : 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied'
  })
  setTrackingEnabled(!!granted)
  if (!granted) clearGaCookies()
}

export default defineNuxtPlugin((nuxtApp) => {
  window.dataLayer = window.dataLayer || []
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    functionality_storage: 'denied',
    personalization_storage: 'denied',
    security_storage: 'granted',
    wait_for_update: 500
  })

  // Read the stored consent choice (or show the banner) once the app is mounted.
  nuxtApp.hook('app:mounted', () => {
    useConsent().init()
  })

  return {
    provide: {
      loadGtm,
      setConsentMode
    }
  }
})
