// Demo configuration for the landing widget and the audience switcher.

// Store token used by the live demo widget. The lead swaps this for the EUR demo store token.
export const DEMO_CLIENT_TOKEN =
  '3DXHWBzDW19b0zc_jNCN13jvj_7EjSRbU1l0qI14ffH0gIn17pbv5c2ZHYXb0Td_'

// Languages the demo store answers in (its available_languages, or [lang] when null).
// The widget honours ?lang= only for these, so the landing sets the param only when the
// site locale is listed. Current store: Spanish only. Update together with the token.
export const DEMO_STORE_LANGUAGES: readonly string[] = ['en', 'fr', 'es']

export type Audience = 'retail' | 'restaurants'
export const AUDIENCES: readonly Audience[] = ['retail', 'restaurants']
export const DEFAULT_AUDIENCE: Audience = 'retail'
export const AUDIENCE_STORAGE_KEY = 'wineater:audience'

// Example prompts shown as chips, per audience and locale. Keep them short and natural.
export const demoPrompts: Record<Audience, Record<'en' | 'fr', readonly string[]>> = {
  retail: {
    en: [
      'red wine for a steak dinner',
      'crisp white for oysters under 30 euros',
      'a gift for a Burgundy lover',
    ],
    fr: [
      'un vin rouge pour un dîner de steak',
      'un blanc vif pour des huîtres, moins de 30 euros',
      'un cadeau pour un amateur de bourgogne',
    ],
  },
  restaurants: {
    en: [
      'something to go with our lamb dish',
      'a bottle for a table of six that does not cost a fortune',
      'a sparkling wine for a celebration',
    ],
    fr: [
      "un vin pour accompagner notre plat d'agneau",
      'une bouteille pour une table de six qui ne coûte pas une fortune',
      'un vin pétillant pour fêter une occasion',
    ],
  },
}

export function isAudience(value: unknown): value is Audience {
  return value === 'retail' || value === 'restaurants'
}
