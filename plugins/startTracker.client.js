import { stopTracker } from '../utils/tracker'

export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.hook('app:mounted', () => {
    useConsent().init()
  })

  return {
    provide: {
      startTracking: () => useConsent().init(),
      stopTracking: stopTracker
    }
  }
})
