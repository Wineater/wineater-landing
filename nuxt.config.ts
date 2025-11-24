export default {
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        // Existing meta tags remain here
        {
          src: 'https://unpkg.com/wineater-bot@3.4.4/dist/wineater-chatbot.mjs', // Replace this URL with the actual script URL
          type: 'module'
        },
        {
          hid: 'wineaterData',
          innerHTML: `
            window.wineaterData = {
              CLIENT_TOKEN: 'HeUw6IXuhvz6tRuXdPEGEbj3SGQ3Q2YtEc1Z8jd41Kg9LtyPb4Epu0to31SYIadG',
              position: 'right-center',
              TYPE: 'widget'
            };
          `,
          type: 'text/javascript'
        },
        {
          hid: 'structured-data',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "SoftwareApplication",
            "name": "Wineater",
            "description": "AI-powered digital sommelier that helps restaurants and wine retailers boost sales by providing perfect wine and food pairings to customers. Advanced wine recommendation technology using machine learning and sommelier expertise.",
            "url": "https://wineater.com",
            "applicationCategory": "BusinessApplication",
            "operatingSystem": "Web",
            "offers": {
              "@type": "Offer",
              "price": "0",
              "priceCurrency": "EUR",
              "description": "Free trial available"
            },
            "creator": {
              "@type": "Organization",
              "name": "Wineater",
              "url": "https://wineater.com",
              "logo": "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg",
              "description": "AI-powered wine and food pairing technology company"
            },
            "featureList": [
              "AI-powered wine recommendations",
              "Food and wine pairing technology",
              "E-commerce platform integration",
              "Real-time inventory analysis",
              "Personalized wine suggestions",
              "Sommelier-level expertise",
              "Machine learning personalization",
              "Multi-language support"
            ],
            "screenshot": "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png",
            "aggregateRating": {
              "@type": "AggregateRating",
              "ratingValue": "4.8",
              "ratingCount": "150",
              "bestRating": "5",
              "worstRating": "1"
            },
            "keywords": "wine pairing, food pairing, AI sommelier, wine technology, restaurant technology, wine retail, digital sommelier, wine recommendations, food and wine matching, wine sales, restaurant solutions, Bernard Magrez, wine AI, sommelier AI"
          })
        },
        {
          hid: 'organization-schema',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Organization",
            "name": "Wineater",
            "url": "https://wineater.com",
            "logo": "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg",
            "description": "AI-powered digital sommelier technology for restaurants and wine retailers. Boost sales with personalized wine recommendations using advanced machine learning and sommelier expertise.",
            "foundingDate": "2023",
            "founder": {
              "@type": "Person",
              "name": "Bernard Magrez"
            },
            "parentOrganization": {
              "@type": "Organization",
              "name": "Bernard Magrez Start-Up Win"
            },
            "sameAs": [
              "https://wineater.com",
              "https://www.linkedin.com/company/wineater",
              "https://twitter.com/wineater"
            ],
            "contactPoint": {
              "@type": "ContactPoint",
              "contactType": "customer service",
              "url": "https://wineater.com"
            },
            "areaServed": {
              "@type": "Country",
              "name": "Worldwide"
            },
            "knowsAbout": [
              "Wine pairing",
              "Food and wine matching",
              "AI technology",
              "Machine learning",
              "Sommelier expertise",
              "Restaurant technology",
              "E-commerce solutions",
              "Wine retail"
            ]
          })
        },
        {
          hid: 'breadcrumb-schema',
          type: 'application/ld+json',
          innerHTML: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "BreadcrumbList",
            "itemListElement": [
              {
                "@type": "ListItem",
                "position": 1,
                "name": "Home",
                "item": "https://wineater.com"
              },
              {
                "@type": "ListItem",
                "position": 2,
                "name": "AI Sommelier",
                "item": "https://wineater.com#ai-sommelier"
              },
              {
                "@type": "ListItem",
                "position": 3,
                "name": "Wine Pairing Technology",
                "item": "https://wineater.com#wine-pairing"
              }
            ]
          })
        }
      ],
      meta: [
        // Viewport and basic meta
        {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
        {name: 'format-detection', content: 'telephone=no'},
        {name: 'theme-color', content: '#8B0000'},
        {name: 'msapplication-TileColor', content: '#8B0000'},
        
        // SEO Meta Tags
        {
          hid: 'description',
          name: 'description',
          content: 'AI-powered wine and food pairing technology for restaurants and wine retailers. Boost sales with our digital sommelier that helps customers find perfect wine matches.',
        },
        {
          hid: 'keywords',
          name: 'keywords',
          content: 'wine pairing, food pairing, AI sommelier, wine technology, restaurant technology, wine retail, digital sommelier, wine recommendations, food and wine matching, wine sales, restaurant solutions',
        },
        {
          hid: 'author',
          name: 'author',
          content: 'Wineater',
        },
        {
          hid: 'robots',
          name: 'robots',
          content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1',
        },
        {
          hid: 'googlebot',
          name: 'googlebot',
          content: 'index, follow',
        },
        
        // Open Graph Meta Tags
        {
          hid: 'og:type',
          property: 'og:type',
          content: 'website',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Wineater - AI Sommelier for Perfect Wine & Food Pairings',
        },
        {
          hid: 'og:description',
          property: 'og:description',
          content: 'Revolutionary AI technology that helps restaurants and wine retailers boost sales by providing perfect wine and food pairings to customers.',
        },
        {
          hid: 'og:url',
          property: 'og:url',
          content: 'https://wineater.com',
        },
        {
          hid: 'og:site_name',
          property: 'og:site_name',
          content: 'Wineater',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png',
        },
        {
          hid: 'og:image:width',
          property: 'og:image:width',
          content: '1200',
        },
        {
          hid: 'og:image:height',
          property: 'og:image:height',
          content: '630',
        },
        {
          hid: 'og:image:alt',
          property: 'og:image:alt',
          content: 'Wineater AI Sommelier - Perfect Wine and Food Pairings',
        },
        {
          hid: 'og:locale',
          property: 'og:locale',
          content: 'en_US',
        },
        
        // Twitter Card Meta Tags
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image',
        },
        {
          hid: 'twitter:site',
          name: 'twitter:site',
          content: '@wineater',
        },
        {
          hid: 'twitter:creator',
          name: 'twitter:creator',
          content: '@wineater',
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Wineater - AI Sommelier for Perfect Wine & Food Pairings',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Revolutionary AI technology that helps restaurants and wine retailers boost sales by providing perfect wine and food pairings to customers.',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png',
        },
        {
          hid: 'twitter:image:alt',
          name: 'twitter:image:alt',
          content: 'Wineater AI Sommelier - Perfect Wine and Food Pairings',
        },
        
        // Additional SEO Meta Tags
        {
          hid: 'canonical',
          rel: 'canonical',
          href: 'https://wineater.com',
        },
        {
          hid: 'alternate',
          rel: 'alternate',
          hreflang: 'en',
          href: 'https://wineater.com',
        },
        {
          hid: 'alternate-fr',
          rel: 'alternate',
          hreflang: 'fr',
          href: 'https://wineater.com/fr',
        },
        {
          hid: 'alternate-x-default',
          rel: 'alternate',
          hreflang: 'x-default',
          href: 'https://wineater.com',
        },
      ],
      title: 'Wineater - AI Sommelier for Perfect Wine & Food Pairings',
      titleTemplate: '%s | Wineater',
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
    '@nuxtjs/sitemap',
    '@nuxtjs/robots',
    '@nuxtjs/seo',
  ],
  i18n: {
    /* module options */
    lazy: true,
    seo: true,
    langDir: "locales",
    strategy: "prefix_except_default",
    locales: [
      {
        code: "en",
        file: "en.json",
      },
      {
        code: "fr",
        file: "fr.json",
      },
    ],
    defaultLocale: "en",
  },
  
  // SEO Configuration
  site: {
    url: 'https://wineater.com',
    name: 'Wineater - AI Sommelier for Perfect Wine & Food Pairings',
    description: 'AI-powered wine and food pairing technology for restaurants and wine retailers. Boost sales with our digital sommelier that helps customers find perfect wine matches.',
    defaultLocale: 'en'
  },
  
  // Sitemap configuration
  sitemap: {
    hostname: 'https://wineater.com',
    gzip: true,
    routes: [
      '/',
      '/fr',
      '/demo',
      '/playground'
    ]
  },
  
  // Robots configuration
  robots: {
    UserAgent: '*',
    Allow: '/',
    Disallow: ['/admin', '/api'],
    Sitemap: 'https://wineater.com/sitemap.xml'
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
    public: {
      gtm: {
        id: 'GTM-NLBPMC7X'
      }
    }
  },
}
