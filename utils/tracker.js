import Tracker from '@openreplay/tracker'

const PROJECT_KEY = 'XkscRWp9UTyrXtkhPbQV'

let tracker = null
let starting = null

export function startTracker() {
  if (typeof window === 'undefined') return Promise.resolve(null)
  if (starting) return starting

  if (!tracker) {
    tracker = new Tracker({
      projectKey: PROJECT_KEY,
      respectDoNotTrack: true,
      defaultInputMode: 2,
      obscureTextEmails: true,
      obscureInputEmails: true
    })
  }

  starting = Promise.resolve()
    .then(() => tracker.start())
    .then(() => tracker)
    .catch(() => {
      starting = null
      return null
    })

  return starting
}

export function stopTracker() {
  if (!tracker) return
  try {
    tracker.stop()
  } catch {
    // tracker was not running
  }
  starting = null
}
