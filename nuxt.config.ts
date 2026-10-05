import { contentConfig, blogSitemapExclude } from './scripts/content-pipeline/published.mjs'

export default defineNuxtConfig({
  app: {
    head: {
      link: [
        {rel: 'preconnect', href: 'https://czvgkhagwvmknscoerfy.supabase.co', crossorigin: 'anonymous'},
        {rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', href: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Poppins-Medium.woff2'},
        {rel: 'preload', as: 'font', type: 'font/woff2', crossorigin: 'anonymous', href: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Poppins-Regular.woff2'},
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
    '@/assets/styles/colors.scss'
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
      { code: "en", language: "en-US", file: "en.json" },
      { code: "fr", language: "fr-FR", file: "fr.json" },
    ],
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
      gtm: {
        id: 'GTM-NLBPMC7X'
      },
      // Client cabinet sign-up; "" turns the buttons back to the manual-trial form
      selfServeUrl: 'https://app.wineater.com/signup',
    }
  },
})
