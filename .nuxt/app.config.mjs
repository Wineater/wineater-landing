
import { updateAppConfig } from '#app'
<<<<<<< HEAD
import { defuFn } from '/Users/cdmx/Desktop/development/wineater-landing/node_modules/defu/dist/defu.mjs'
=======
import { defuFn } from '/Users/alexolkhovoi/Desktop/Development/Wineater/wineater-landing/node_modules/defu/dist/defu.mjs'
>>>>>>> 15f3b1fa96acc30d35cda59722a891aac702a652

const inlineConfig = {
  "nuxt": {}
}

// Vite - webpack is handled directly in #app/config
if (import.meta.hot) {
  import.meta.hot.accept((newModule) => {
    updateAppConfig(newModule.default)
  })
}



export default /* #__PURE__ */ defuFn(inlineConfig)
