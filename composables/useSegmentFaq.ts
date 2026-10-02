import { faqByLocale, flattenFaq, segmentFaqIds, type FaqQuestion } from '~/data/faq'

// FAQ questions for a segment page, in the active locale (falls back to English).
export const useSegmentFaq = (segment: string) => {
  const { locale } = useI18n()
  return computed<FaqQuestion[]>(() => {
    const content = faqByLocale[locale.value] || faqByLocale.en
    const all = flattenFaq(content)
    return (segmentFaqIds[segment] || []).map(id => all.find(q => q.id === id)).filter(Boolean) as FaqQuestion[]
  })
}
