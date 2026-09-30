import { paths } from './config'
import { listArticles } from './article'
import { readJson } from './io'
import { buildRoutes, type Policy, type QaContext } from './qa'

export function loadPolicy(): Policy {
  return readJson<Policy>(paths.policy, { phrases: [], patterns: [] })
}

export function loadContext(): QaContext {
  const articles = listArticles()
  const existing = articles.map((a) => ({ slug: a.data.slug, locale: a.data.locale, body: a.body }))
  return { existing, routes: buildRoutes(existing), policy: loadPolicy() }
}
