export default {
  app: {
    head: {
      htmlAttrs: {
        lang: 'en'
      },
      script: [
        // Existing meta tags remain here
        {
          src: 'https://unpkg.com/wineater-bot@1.1.3/dist/wineater-chatbot.umd.js', // Replace this URL with the actual script URL
          type: 'text/javascript',
          async: true, // Optional: only if the script supports or requires asynchronous loading
        },
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
          content: 'https://landing-static.s3.eu-central-1.amazonaws.com/images/Wineater-social_preview.png', // Replace with the URL of your image
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
          content: 'https://landing-static.s3.eu-central-1.amazonaws.com/images/Wineater-social_preview.png', // Replace with the URL of your image
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
