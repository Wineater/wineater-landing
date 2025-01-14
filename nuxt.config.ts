export default {
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        // Existing meta tags remain here
        {
          src: 'https://unpkg.com/wineater-bot@latest/dist/wineater-chatbot.umd.js', // Replace this URL with the actual script URL
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
        }
      ],
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=5'},
        {
          hid: 'description',
          name: 'description',
          content: 'Enhance a dining experience with the AI sommelier, ensuring impeccable wine and food pairings impeccable wine and food pairings',
        },
        {
          hid: 'og:title',
          property: 'og:title',
          content: 'Wineater | Wine and food pairing',
        },
        {
          hid: 'og:image',
          property: 'og:image',
          content: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png', // Replace with the URL of your image
        },
        {
          hid: 'twitter:card',
          name: 'twitter:card',
          content: 'summary_large_image', // Twitter card type (use 'summary_large_image' for image cards)
        },
        {
          hid: 'twitter:title',
          name: 'twitter:title',
          content: 'Wineater | Wine and food pairing',
        },
        {
          hid: 'twitter:description',
          name: 'twitter:description',
          content: 'Enhance a dining experience with the AI sommelier, ensuring impeccable wine and food pairings impeccable wine and food pairings',
        },
        {
          hid: 'twitter:image',
          name: 'twitter:image',
          content: 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png', // Replace with the URL of your image
        },
      ],
      title: 'Wineater | Wine and food pairing',
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
}
