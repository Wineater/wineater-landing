import { createClient } from '@supabase/supabase-js'

// Waitlist for features that are NOT released yet (AI-ready catalog, Shopify app).
// Same channel as trial signups: the public_users table (no schema change). The feature is
// stored in business_name as "[waitlist:<feature>] <business>", so the team can filter on it.
const FEATURES = ['ai-ready-catalog', 'shopify-app']
const MAX_NAME = 120
const MAX_BUSINESS = 160
const MAX_EMAIL = 254

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()
  const body = await readBody(event)

  const name = String(body?.name ?? '').trim()
  const business = String(body?.businessName ?? '').trim()
  const email = String(body?.email ?? '').trim().toLowerCase()
  const feature = String(body?.feature ?? '')

  if (!name || !email) throw createError({ statusCode: 400, message: 'Missing required fields' })
  if (name.length > MAX_NAME || business.length > MAX_BUSINESS || email.length > MAX_EMAIL) {
    throw createError({ statusCode: 400, message: 'Field too long' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) throw createError({ statusCode: 400, message: 'Invalid email address' })
  if (!FEATURES.includes(feature)) throw createError({ statusCode: 400, message: 'Unknown feature' })
  if (body?.gdprConsent !== true) throw createError({ statusCode: 422, message: 'GDPR consent is required' })
  if (!config.supabaseUrl || !config.supabaseServiceKey) {
    throw createError({ statusCode: 503, message: 'Waitlist is not configured' })
  }

  const supabase = createClient(config.supabaseUrl as string, config.supabaseServiceKey as string)
  const { error } = await supabase.from('public_users').insert({
    name,
    email,
    business_name: `[waitlist:${feature}] ${business}`.trim(),
    gdpr_consent: true,
  })

  if (error) {
    console.error('[waitlist] insert error', error)
    throw createError({ statusCode: 500, message: 'Could not save your request' })
  }
  return { success: true }
})
