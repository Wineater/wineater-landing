// Founder note on the home page. The owner supplied the attribution (name, WSET3, winemaker and CTO)
// and asked for the quote to be written from his direction (2026-10-04). Text lives in i18n (founder.*).
// No photo yet: when one arrives, put it in public/ and set `photo`. Until the owner approves the
// wording, keep `approved` false to fall back to the preview-only placeholder.
export const founderNote = {
  approved: true,
  photo: null as string | null,
} as const
