const GTM_ID = 'GTM-NLBPMC7X'

let loaded = false

function gtag() {
  window.dataLayer.push(arguments)
}

function loadGtm() {
  if (loaded || typeof document === 'undefined') return
  loaded = true

  window.dataLayer = window.dataLayer || []
  window.dataLayer.push({ 'gtm.start': new Date().getTime(), event: 'gtm.js' })

  const script = document.createElement('script')
  script.async = true
  script.src = `https://www.googletagmanager.com/gtm.js?id=${GTM_ID}`
  document.head.appendChild(script)

  const noscript = document.createElement('noscript')
  noscript.innerHTML = `<iframe src="https://www.googletagmanager.com/ns.html?id=${GTM_ID}" height="0" width="0" style="display:none;visibility:hidden"></iframe>`
  document.body.appendChild(noscript)
}

function setConsentMode(granted) {
  window.dataLayer = window.dataLayer || []
  const value = granted ? 'granted' : 'denied'
  gtag('consent', 'update', {
    analytics_storage: value,
    ad_storage: value,
    ad_user_data: value,
    ad_personalization: value
  })
}

export default defineNuxtPlugin(() => {
  window.dataLayer = window.dataLayer || []
  gtag('consent', 'default', {
    analytics_storage: 'denied',
    ad_storage: 'denied',
    ad_user_data: 'denied',
    ad_personalization: 'denied',
    wait_for_update: 500
  })

  return {
    provide: {
      loadGtm,
      setConsentMode
    }
  }
})
