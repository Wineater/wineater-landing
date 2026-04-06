export default defineEventHandler(async (event) => {
  const body = await readBody(event)

  const { name, businessName, email } = body

  if (!name || !businessName || !email) {
    throw createError({ statusCode: 400, message: 'Missing required fields' })
  }

  // TODO: connect to CRM / email provider / database
  console.log('[Wineater signup]', { name, businessName, email, timestamp: new Date().toISOString() })

  return { success: true }
})
