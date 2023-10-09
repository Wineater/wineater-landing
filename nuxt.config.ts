// https://nuxt.com/docs/api/configuration/nuxt-config
export default {
  app: {
    head: {
      meta: [
        {name: 'viewport', content: 'width=device-width, initial-scale=1, maximum-scale=1'}
      ],
      title: 'Wineater',
    }
  },
  css: [
    '@/assets/styles/main.scss',
    '@/assets/styles/colors.scss'
  ],
  modules: [
    '@nuxtjs/i18n',
  ],
  i18n: {
    /* module options */
    lazy: true,
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
