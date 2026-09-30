import { createClient } from '@supabase/supabase-js'

const BUCKET = 'menus_raw'
const MAX_FILE_BYTES = 10 * 1024 * 1024
const MAX_NAME = 120
const MAX_BUSINESS = 160
const MAX_EMAIL = 254
const ALLOWED_TYPES: Record<string, string[]> = {
  pdf: ['application/pdf'],
  csv: ['text/csv', 'application/csv', 'application/vnd.ms-excel', 'text/plain'],
  xlsx: ['application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'],
  xls: ['application/vnd.ms-excel'],
  png: ['image/png'],
  jpg: ['image/jpeg'],
  jpeg: ['image/jpeg'],
}

export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig()

  const supabase = createClient(
    config.supabaseUrl as string,
    config.supabaseServiceKey as string,
  )

  // ── Parse multipart form (file upload) or JSON ──────────────────────────
  const contentType = getHeader(event, 'content-type') ?? ''
  let name = ''
  let businessName = ''
  let email = ''
  let gdprConsent = false
  let menuFilePath: string | null = null

  if (contentType.includes('multipart/form-data')) {
    const form = await readMultipartFormData(event)
    if (!form) throw createError({ statusCode: 400, message: 'Invalid form data' })

    for (const field of form) {
      const key = field.name ?? ''
      if (key === 'name') name = field.data.toString()
      else if (key === 'businessName') businessName = field.data.toString()
      else if (key === 'email') email = field.data.toString()
      else if (key === 'gdprConsent') gdprConsent = field.data.toString() === 'true'
      else if (key === 'menu' && field.filename && field.data.length > 0) {
        if (field.data.length > MAX_FILE_BYTES) {
          throw createError({ statusCode: 413, message: 'File too large (max 10 MB)' })
        }
        const ext = (field.filename.split('.').pop() ?? '').toLowerCase()
        const allowedMimes = ALLOWED_TYPES[ext]
        const mime = (field.type ?? '').toLowerCase()
        if (!allowedMimes || (mime && mime !== 'application/octet-stream' && !allowedMimes.includes(mime))) {
          throw createError({ statusCode: 415, message: 'Unsupported file type' })
        }
        const safeName = `${Date.now()}_${email.replace(/[^a-z0-9]/gi, '_').slice(0, 80)}.${ext}`
        const filePath = `uploads/${safeName}`

        const { error: uploadError } = await supabase.storage
          .from(BUCKET)
          .upload(filePath, field.data, {
            contentType: field.type ?? 'application/octet-stream',
            upsert: false,
          })

        if (uploadError) {
          console.error('[register] menu upload error', uploadError)
          throw createError({ statusCode: 500, message: 'Menu upload failed' })
        }

        menuFilePath = filePath
      }
    }
  } else {
    const body = await readBody(event)
    name = body?.name ?? ''
    businessName = body?.businessName ?? ''
    email = body?.email ?? ''
    gdprConsent = body?.gdprConsent === true
  }

  // ── Validate ─────────────────────────────────────────────────────────────
  if (!name.trim() || !businessName.trim() || !email.trim()) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }
  if (name.length > MAX_NAME || businessName.length > MAX_BUSINESS || email.length > MAX_EMAIL) {
    throw createError({ statusCode: 400, message: 'Field too long' })
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    throw createError({ statusCode: 400, message: 'Invalid email address' })
  }
  if (!gdprConsent) {
    throw createError({ statusCode: 422, message: 'GDPR consent is required' })
  }

  // ── Insert into public_users ─────────────────────────────────────────────
  const { data, error: insertError } = await supabase
    .from('public_users')
    .insert({
      name: name.trim(),
      email: email.trim().toLowerCase(),
      business_name: businessName.trim(),
      menu_file_path: menuFilePath,
      gdpr_consent: gdprConsent,
    })
    .select('id')
    .single()

  if (insertError) {
    console.error('[register] insert error', insertError)
    throw createError({ statusCode: 500, message: 'Registration failed' })
  }

  return { success: true, id: data.id }
})
