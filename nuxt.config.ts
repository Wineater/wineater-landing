import { contentConfig, blogSitemapExclude, showDrafts } from './scripts/content-pipeline/published.mjs'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {rel: 'preconnect', href: 'https://czvgkhagwvmknscoerfy.supabase.co', crossorigin: 'anonymous'},
        // No font preload: measured on mobile Lighthouse it made the hero image and the first paint wait for
        // 100 KB of fonts (pricing 86 -> 92). font-display: swap and the size-adjusted fallback keep CLS near 0.
      ],
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
        {name: 'format-detection', content: 'telephone=no'},
        {name: 'theme-color', content: '#7E27ED'},
        {name: 'msapplication-TileColor', content: '#7E27ED'},
        {name: 'author', content: 'Wineater'},
        {property: 'og:type', content: 'website'},
        {property: 'og:site_name', content: 'Wineater'},
        {
          property: 'og:image',
          content: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png',
        },
        {property: 'og:image:width', content: '1200'},
        {property: 'og:image:height', content: '630'},
        {property: 'og:image:alt', content: 'Wineater AI sommelier for wine shops and restaurants'},
        {name: 'twitter:card', content: 'summary_large_image'},
        {
          name: 'twitter:image',
          content: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png',
        },
        {name: 'twitter:image:alt', content: 'Wineater AI sommelier for wine shops and restaurants'},
      ],
      titleTemplate: '%s',
    }
  },
  css: [
    '@/assets/styles/main.scss',
    '@/assets/styles/colors.scss',
    '@/assets/styles/solutions.scss'
  ],
  plugins: [
    { src: '~/plugins/gtm.client.js', ssr: false },
  ],
  modules: [
    '@nuxtjs/i18n',
    '@nuxtjs/seo',
    '@nuxt/content',
  ],
  content: contentConfig(),
  i18n: {
    strategy: "prefix_except_default",
    defaultLocale: "en",
    locales: [
      { code: "en", language: "en-US", files: ["en.json", "en/site.json", "en/solutions.json"] },
      { code: "fr", language: "fr-FR", files: ["fr.json", "fr/site.json", "fr/solutions.json"] },
      // Spanish exists only for the Distributors page (see defineI18nRoute in the other pages).
      { code: "es", language: "es-ES", files: ["es/site.json"] },
    ],
    customRoutes: 'config',
    pages: {
      'solutions/restaurants': { en: '/solutions/restaurants', fr: '/solutions/restaurants', es: false },
      'solutions/online-stores': { en: '/solutions/online-stores', fr: '/solutions/boutiques-en-ligne', es: false },
      'solutions/retail': { en: '/solutions/retail', fr: '/solutions/magasins', es: false },
      'solutions/distributors': { en: '/solutions/distributors', fr: '/solutions/distributeurs', es: '/soluciones/distribuidores' },
      pricing: { en: '/pricing', fr: '/tarifs', es: false },
      faq: { es: false },
      legal: { es: false },
      privacy: { es: false },
      terms: { es: false },
      playground: { es: false },
      index: { es: false },
      'blog/index': { es: false },
      'blog/[...slug]': { es: false },
      'demo/[id]': { es: false },
    },
    langDir: "./locales",
    baseUrl: 'https://wineater.com',
    detectBrowserLanguage: false,
  },
  
  // SEO Configuration
  site: {
    url: 'https://wineater.com',
    name: 'Wineater',
    defaultLocale: 'en'
  },

  sitemap: {
    exclude: ['/demo/**', '/playground', '/api/**', ...blogSitemapExclude()],
  },

  robots: {
    disallow: ['/demo/', '/playground', '/api/', '/admin/'],
    groups: [
      { userAgent: ['GPTBot', 'ClaudeBot', 'PerplexityBot'], allow: ['/'], disallow: ['/demo/', '/playground', '/api/', '/admin/'] },
    ],
  },

  // Performance optimizations for Core Web Vitals
  nitro: {
    compressPublicAssets: true,
    minify: true
  },
  
  // Image optimization
  image: {
    quality: 80,
    format: ['webp', 'avif', 'jpeg'],
    screens: {
      xs: 320,
      sm: 640,
      md: 768,
      lg: 1024,
      xl: 1280,
      xxl: 1536,
    }
  },
  
  // Build optimizations
  build: {
    analyze: false,
    extractCSS: true
  },
  
  // Runtime config for performance
  runtimeConfig: {
    // Private — only available server-side
    supabaseUrl: '',
    supabaseServiceKey: '',
    public: {
      // The founder note shows a visible placeholder everywhere except production.
      showPlaceholders: process.env.VERCEL_ENV !== 'production',
      // Unpublished blog drafts (marked "Draft, not published") are visible on Preview only.
      showDrafts: showDrafts(),
      gtm: {
        id: 'GTM-NLBPMC7X'
      },
      // Client cabinet sign-up; "" turns every "Try it free" back to the manual-trial form
      selfServeUrl: 'https://app.wineater.com/signup',
    }
  },
})
