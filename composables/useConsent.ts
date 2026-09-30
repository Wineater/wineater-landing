import { startTracker, stopTracker } from '~/utils/tracker'

export type ConsentStatus = 'unknown' | 'accepted' | 'rejected'

const STORAGE_KEY = 'wineater_consent'
const COOKIE_NAME = 'wineater_consent'
const VERSION = 1
const MAX_AGE_MS = 1000 * 60 * 60 * 24 * 182

type Stored = { status: ConsentStatus; ts: number; v: number }

function readStored(): Stored | null {
  let raw: string | null = null
  try {
    raw = localStorage.getItem(STORAGE_KEY)
  } catch {
    raw = null
  }
  if (!raw) {
    const match = document.cookie.match(new RegExp(`(?:^|; )${COOKIE_NAME}=([^;]*)`))
    raw = match ? decodeURIComponent(match[1]) : null
  }
  if (!raw) return null
  try {
    const data = JSON.parse(raw) as Stored
    if (data.v !== VERSION || !['accepted', 'rejected'].includes(data.status)) return null
    if (Date.now() - data.ts > MAX_AGE_MS) return null
    return data
  } catch {
    return null
  }
}

function writeStored(status: ConsentStatus) {
  const value = JSON.stringify({ status, ts: Date.now(), v: VERSION })
  try {
    localStorage.setItem(STORAGE_KEY, value)
  } catch {
    // storage unavailable, the cookie below still keeps the choice
  }
  const maxAge = Math.floor(MAX_AGE_MS / 1000)
  document.cookie = `${COOKIE_NAME}=${encodeURIComponent(value)}; Max-Age=${maxAge}; Path=/; SameSite=Lax${location.protocol === 'https:' ? '; Secure' : ''}`
}

export function useConsent() {
  const status = useState<ConsentStatus>('consent-status', () => 'unknown')
  const isOpen = useState<boolean>('consent-open', () => false)
  const ready = useState<boolean>('consent-ready', () => false)

  function apply(next: ConsentStatus) {
    if (!import.meta.client) return
    const nuxtApp = useNuxtApp() as any
    if (next === 'accepted') {
      nuxtApp.$setConsentMode?.(true)
      nuxtApp.$loadGtm?.()
      startTracker()
    } else {
      nuxtApp.$setConsentMode?.(false)
      stopTracker()
    }
  }

  function init() {
    if (!import.meta.client || ready.value) return
    ready.value = true
    const stored = readStored()
    if (stored) {
      status.value = stored.status
      apply(stored.status)
    } else {
      status.value = 'unknown'
      isOpen.value = true
    }
  }

  function set(next: ConsentStatus) {
    writeStored(next)
    status.value = next
    isOpen.value = false
    apply(next)
  }

  return {
    status,
    isOpen,
    init,
    accept: () => set('accepted'),
    reject: () => set('rejected'),
    reopen: () => {
      isOpen.value = true
    },
    close: () => {
      isOpen.value = false
    }
  }
}
