import { GoogleGenAI } from '@google/genai'
import { has, models, limits, type LlmRole } from './config'
import { logRun, priceUsd } from './runs'
import { estimateTokens } from './text'

export interface LlmCall {
  stage: string
  /** plan = clustering, research and claim extraction; draft = article writing */
  role: LlmRole
  system: string
  user: string
  maxTokens: number
  /** JSON schema: Gemini returns valid JSON matching it (structured output) */
  schema?: Record<string, unknown>
  /** Google Search grounding; source URLs come from grounding metadata */
  grounding?: boolean
  dryRun?: boolean
  label?: string
}

export interface GroundingSource {
  /** resolved page URL (falls back to the redirect URL when it cannot be resolved) */
  url: string
  title: string
}

export interface LlmResult {
  text: string
  sources: GroundingSource[]
  /** grounded text segments with the indices (into `sources`) of the pages that support them */
  supports: { text: string; sourceIndices: number[] }[]
  searchQueries: string[]
  inputTokens: number
  outputTokens: number
  searches: number
  costUsd: number
}

let spent = 0
let spentTokens = 0
export const spentUsd = () => spent
/** True when the run hit the USD cap, or the token cap (used when prices are not configured). */
export const budgetExhausted = () => spent >= limits.maxUsdPerRun || spentTokens >= limits.maxTokensPerRun

let client: GoogleGenAI | null = null
function getClient(): GoogleGenAI {
  if (!has('GEMINI_API_KEY')) throw new Error('GEMINI_API_KEY is not set (see scripts/content-pipeline/.env.example)')
  client ||= new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY })
  return client
}

const sleep = (ms: number) => new Promise((r) => setTimeout(r, ms))

/** Grounding returns vertexaisearch redirect links. Follow them to get the real page URL. */
export async function resolveRedirect(uri: string): Promise<string> {
  if (!/vertexaisearch\.cloud\.google\.com|grounding-api-redirect/.test(uri)) return uri
  try {
    const ctl = new AbortController()
    const t = setTimeout(() => ctl.abort(), 10000)
    const res = await fetch(uri, { redirect: 'follow', signal: ctl.signal, headers: { 'user-agent': 'Mozilla/5.0 (compatible; WineaterContentBot/1.0)' } })
    clearTimeout(t)
    res.body?.cancel().catch(() => {})
    return res.url || uri
  } catch {
    return uri
  }
}

export async function callLlm(call: LlmCall): Promise<LlmResult> {
  const model = models[call.role]()
  if (call.dryRun) {
    const inTok = estimateTokens(call.system + call.user)
    console.log(`\n----- DRY RUN [${call.stage}${call.label ? ` ${call.label}` : ''}] model=${model} ~${inTok} input tokens, max output ${call.maxTokens}${call.grounding ? ', google search grounding' : ''}${call.schema ? ', structured output' : ''}`)
    console.log('--- system ---\n' + call.system.slice(0, 1800) + (call.system.length > 1800 ? '\n[...truncated]' : ''))
    console.log('--- user ---\n' + call.user.slice(0, 2500) + (call.user.length > 2500 ? '\n[...truncated]' : ''))
    return { text: '', sources: [], supports: [], searchQueries: [], inputTokens: inTok, outputTokens: 0, searches: 0, costUsd: priceUsd(call.role, inTok, call.maxTokens / 2) }
  }

  const ai = getClient()
  const config: Record<string, unknown> = { systemInstruction: call.system, maxOutputTokens: call.maxTokens, temperature: call.role === 'draft' ? 0.7 : 0.3 }
  if (call.grounding) config.tools = [{ googleSearch: {} }]
  if (call.schema) {
    config.responseMimeType = 'application/json'
    config.responseJsonSchema = call.schema
  }

  let res: Awaited<ReturnType<typeof ai.models.generateContent>> | undefined
  let lastErr: unknown
  for (let attempt = 0; attempt < 4; attempt++) {
    try {
      res = await ai.models.generateContent({ model, contents: call.user, config })
      break
    } catch (e) {
      lastErr = e
      const msg = String((e as Error).message || e)
      const retriable = /\b(429|500|502|503|504)\b|UNAVAILABLE|overloaded|RESOURCE_EXHAUSTED/i.test(msg)
      if (!retriable || attempt === 3) break
      await sleep(4000 * 2 ** attempt)
    }
  }
  if (!res) throw new Error(`Gemini call failed (${model}): ${String((lastErr as Error)?.message || lastErr).slice(0, 300)}`)

  const cand = res.candidates?.[0]
  if (cand?.finishReason && cand.finishReason !== 'STOP' && cand.finishReason !== 'MAX_TOKENS') {
    throw new Error(`Gemini stopped with finishReason=${cand.finishReason} (${model})`)
  }
  const text = (cand?.content?.parts || []).filter((p) => !(p as { thought?: boolean }).thought).map((p) => p.text || '').join('')
  if (cand?.finishReason === 'MAX_TOKENS' && !text.trim()) throw new Error(`Gemini hit maxOutputTokens with no text (${model}); raise maxTokens`)

  const gm = cand?.groundingMetadata
  const rawChunks = (gm?.groundingChunks || []).map((c) => ({ uri: c.web?.uri || '', title: c.web?.title || '' })).filter((c) => c.uri)
  const sources: GroundingSource[] = []
  for (const c of rawChunks) sources.push({ url: await resolveRedirect(c.uri), title: c.title })
  const supports = (gm?.groundingSupports || []).map((g) => ({ text: g.segment?.text || '', sourceIndices: g.groundingChunkIndices || [] })).filter((g) => g.text && g.sourceIndices.length)
  const searchQueries = gm?.webSearchQueries || []
  const searches = searchQueries.length

  const u = res.usageMetadata
  const inputTokens = (u?.promptTokenCount || 0) + (u?.toolUsePromptTokenCount || 0)
  const outputTokens = (u?.candidatesTokenCount || 0) + (u?.thoughtsTokenCount || 0)
  const costUsd = priceUsd(call.role, inputTokens, outputTokens, searches)
  spent += costUsd
  spentTokens += inputTokens + outputTokens
  logRun({ stage: call.stage, label: call.label, model, inputTokens, outputTokens, thoughtsTokens: u?.thoughtsTokenCount || 0, searches, costUsd: Number(costUsd.toFixed(4)), finishReason: cand?.finishReason })
  return { text, sources, supports, searchQueries, inputTokens, outputTokens, searches, costUsd }
}
