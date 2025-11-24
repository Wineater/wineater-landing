import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrRenderClass } from 'vue/server-renderer';
import { H as Header, B as Button } from './Header-Cdjvx2Ao.mjs';
import { ref, onUnmounted, mergeProps, watch, useSSRContext } from 'vue';
import { _ as _export_sfc, b as useI18n } from './server.mjs';
import { F as Footer } from './Footer-D4rw37_F.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'consola/core';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main$6 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-banner" }, _attrs))} data-v-51168dfb><div class="main-banner__info" data-v-51168dfb><h1 id="hero-title" class="h1 main-banner__info-title color-text" data-v-51168dfb>${ssrInterpolate(_ctx.$t("startBanner.WineAndFoodPairing"))}</h1><div class="main-banner__info-description" data-v-51168dfb><p class="p1 color-text" data-v-51168dfb>${ssrInterpolate(_ctx.$t("startBanner.title1"))} <span class="color-brand-1" data-v-51168dfb>${ssrInterpolate(_ctx.$t("startBanner.title2"))}</span> ${ssrInterpolate(_ctx.$t("startBanner.title3"))}</p><div class="main-banner__info-hint" data-v-51168dfb></div></div></div><div class="main-banner__img" role="img" aria-label="Wineater AI Sommelier interface showing wine recommendations and food pairing technology" data-v-51168dfb></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StartBanner.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const StartBanner = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-51168dfb"]]);
const _sfc_main$5 = {
  __name: "WidgetHome",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const showReloadButton = ref(false);
    const mounted = ref(false);
    const { locale } = useI18n();
    const loadWidgetScripts = () => {
      setTimeout(() => {
        const configScript = (void 0).createElement("script");
        configScript.innerHTML = `window.wineaterData = {
      CLIENT_TOKEN: 'TOKEN',
      TYPE: 'widget',
      WIDGET_TYPE: 'store',
      WIDGET_WRAPPER: 'wineater-widget-conteiner'
    };`;
        (void 0).head.appendChild(configScript);
        const moduleScript = (void 0).createElement("script");
        moduleScript.type = "module";
        moduleScript.src = "https://unpkg.com/wineater-bot@latest/dist/wineater-chatbot.umd.js";
        (void 0).head.appendChild(moduleScript);
        setTimeout(() => {
          const container = (void 0).getElementById("wineater-widget-conteiner");
          if (container && container.childElementCount === 0) {
            showReloadButton.value = true;
          }
        }, 5e3);
      }, 100);
    };
    watch(() => props.visible, (newValue) => {
      if (newValue && mounted.value) {
        loadWidgetScripts();
      }
    }, { immediate: true });
    watch(() => locale.value, () => {
      if (props.visible) {
        (void 0).location.reload();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["widget-home", { "visible": __props.visible }]
      }, _attrs))} data-v-f729fa33><h2 id="demo-title" class="h2 color-brand-6" data-v-f729fa33>${ssrInterpolate(_ctx.$t("WidgetHome.title"))}</h2><p class="widget-description" data-v-f729fa33> Experience our AI-powered wine pairing technology. Simply describe your meal or occasion, and our digital sommelier will recommend the perfect wine from your inventory. </p>`);
      if (mounted.value) {
        _push(`<div id="wineater-widget-conteiner" role="application" aria-label="Wineater AI Sommelier Widget - Interactive wine recommendation tool" data-v-f729fa33></div>`);
      } else {
        _push(`<!---->`);
      }
      if (showReloadButton.value) {
        _push(`<button class="reload-button" aria-label="Reload AI Sommelier Widget" data-v-f729fa33> Reload AI Sommelier Widget </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/WidgetHome.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const WidgetHome = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-f729fa33"]]);
const intervalError = "[nuxt] `setInterval` should not be used on the server. Consider wrapping it with an `onNuxtReady`, `onBeforeMount` or `onMounted` lifecycle hook, or ensure you only call it in the browser by checking `false`.";
const setInterval = () => {
  console.error(intervalError);
};
const _sfc_main$4 = {
  __name: "StatisticBanner",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const props = __props;
    const animatedPercent1 = ref(0);
    const animatedPercent2 = ref(0);
    const animatedPercent3 = ref(0);
    watch(() => props.visible, (newVal) => {
      if (newVal) {
        animateNumbers();
      } else {
        resetNumbers();
      }
    });
    const animateNumbers = () => {
      setInterval();
    };
    const resetNumbers = () => {
      animatedPercent1.value = 0;
      animatedPercent2.value = 0;
      animatedPercent3.value = 0;
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["statistic-banner", { "visible": __props.visible }]
      }, _attrs))} data-v-8cfb1543><div class="statistic-banner__title h2 color-text" data-v-8cfb1543>${ssrInterpolate(_ctx.$t("StatisticBanner.title1"))} <br data-v-8cfb1543><span class="color-brand-6" data-v-8cfb1543>${ssrInterpolate(_ctx.$t("StatisticBanner.title2"))}</span></div><div class="statistic-banner__grid" data-v-8cfb1543><div class="statistic-banner__card" data-v-8cfb1543><div class="statistic-banner__label" data-v-8cfb1543>every</div><div class="statistic-banner__value" data-v-8cfb1543><span class="value-number" data-v-8cfb1543>${ssrInterpolate(animatedPercent1.value)}</span><span class="value-suffix" data-v-8cfb1543>rd</span></div><div class="statistic-banner__subtitle" data-v-8cfb1543>user</div><div class="statistic-banner__description p1" data-v-8cfb1543>${ssrInterpolate(_ctx.$t("StatisticBanner.text1"))}</div></div><div class="statistic-banner__card" data-v-8cfb1543><div class="statistic-banner__label" data-v-8cfb1543>up to</div><div class="statistic-banner__value" data-v-8cfb1543><span class="value-number" data-v-8cfb1543>${ssrInterpolate(animatedPercent2.value)}</span><span class="value-suffix" data-v-8cfb1543>%</span></div><div class="statistic-banner__subtitle" data-v-8cfb1543>upsell increase</div><div class="statistic-banner__description p1" data-v-8cfb1543>${ssrInterpolate(_ctx.$t("StatisticBanner.text2"))}</div></div><div class="statistic-banner__card" data-v-8cfb1543><div class="statistic-banner__label" data-v-8cfb1543>more than</div><div class="statistic-banner__value" data-v-8cfb1543><span class="value-number" data-v-8cfb1543>${ssrInterpolate(animatedPercent3.value)}</span><span class="value-suffix" data-v-8cfb1543>%</span></div><div class="statistic-banner__subtitle" data-v-8cfb1543>wines</div><div class="statistic-banner__description p1" data-v-8cfb1543>${ssrInterpolate(_ctx.$t("StatisticBanner.text3"))}</div></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StatisticBanner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const StatisticBanner = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-8cfb1543"]]);
const _sfc_main$3 = {
  components: {
    Button
  },
  props: {
    visible: Boolean
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<!--[--><h2 class="h2 color-brand-6" data-v-09c809f4>${ssrInterpolate(_ctx.$t("HowItWorks.title"))}</h2><div class="${ssrRenderClass([{
    "visible": $props.visible,
    "how-it-works--fr": _ctx.$i18n.locale === "fr"
  }, "how-it-works"])}" data-v-09c809f4></div><!--]-->`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/HowItWorks.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const HowItWorks = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-09c809f4"]]);
const _imports_0 = "" + buildAssetsURL("widget_test.DQP5KCrp.png");
const _imports_1 = "" + buildAssetsURL("offline_retailers.DRfgyUxm.jpg");
const _sfc_main$2 = {
  props: {
    visible: Boolean
  },
  data() {
    return {
      cards: {
        "en": [
          {
            "id": "online",
            "title": "Online Wine Retailers",
            "description": "Increase conversion rates with an AI-powered wine pairing widget that seamlessly embeds into your website. Customers are more likely to purchase wine when they are confident that the recommended wine complements their meal."
          },
          {
            "id": "offline",
            "title": "Offline Wine Stores",
            "description": "Enhance in-store experience with QR code-based access to our wine pairing AI. Strategically placed near wine sections, it helps customers make informed choices without requiring dedicated sommelier staff."
          }
        ],
        "fr": [
          {
            "id": "online",
            "title": "D\xE9taillants de Vin en Ligne",
            "description": "Augmentez les taux de conversion avec un widget d'accords mets-vins propuls\xE9 par IA qui s'int\xE8gre parfaitement \xE0 votre site web. Les clients sont plus susceptibles d'acheter du vin lorsqu'ils sont convaincus que le vin recommand\xE9 compl\xE8te leur repas."
          },
          {
            "id": "offline",
            "title": "Magasins de Vin Physiques",
            "description": "Am\xE9liorez l'exp\xE9rience en magasin avec un acc\xE8s \xE0 notre IA d'accords mets-vins via code QR. Plac\xE9 strat\xE9giquement pr\xE8s des sections de vin, il aide les clients \xE0 faire des choix \xE9clair\xE9s sans n\xE9cessiter de personnel sommelier d\xE9di\xE9."
          }
        ]
      }
    };
  },
  watch: {},
  created() {
  },
  methods: {}
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["for-whom", { "visible": $props.visible }]
  }, _attrs))} data-v-cf8863ed><h2 class="h2 color-brand-6" data-v-cf8863ed>${ssrInterpolate(_ctx.$t("ForWhom.title"))}</h2><div class="for-whom__cards" data-v-cf8863ed><!--[-->`);
  ssrRenderList($data.cards[_ctx.$i18n.locale], (card) => {
    _push(`<div class="for-whom__card" data-v-cf8863ed><div class="for-whom__card-texts" data-v-cf8863ed><div class="for-whom__card-title h3" data-v-cf8863ed>${ssrInterpolate(card.title)}</div><div class="for-whom__card-image" data-v-cf8863ed>`);
    if (card.id === "online") {
      _push(`<img${ssrRenderAttr("src", _imports_0)} alt="Widget screenshot" data-v-cf8863ed>`);
    } else if (card.id === "offline") {
      _push(`<img${ssrRenderAttr("src", _imports_1)} alt="QR code screenshot" data-v-cf8863ed>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="for-whom__card-description p1 color-dark-100" data-v-cf8863ed>${ssrInterpolate(card.description)}</div></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/ForWhom.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const ForWhom = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-cf8863ed"]]);
const _sfc_main$1 = {
  __name: "Partners",
  __ssrInlineRender: true,
  props: {
    visible: {
      type: Boolean,
      default: false
    }
  },
  setup(__props) {
    const partners = [
      {
        id: 1,
        name: "Bernard Magrez Start-Up Win",
        logo: "https://bmstartupwin.com/wp-content/uploads/2023/06/LOGO-NOIR-.png",
        url: "https://bmstartupwin.com/en/startups/wineater/"
      },
      {
        id: 2,
        name: "La French Tech Bordeaux",
        logo: "https://annuaire.frenchtechbordeaux.com/rails/active_storage/blobs/redirect/eyJfcmFpbHMiOnsiZGF0YSI6IjI2YzViNTRmLWE1NTctNGI3Yi04YTE4LTY0OWYxYTVlZjI0MyIsInB1ciI6ImJsb2JfaWQifX0=--3ec8d92adf4699ae40492eb006456907b6b83218/Logo_FT_Bordeaux_FondBlanc.png",
        url: "https://annuaire.frenchtechbordeaux.com/organisations/wineater"
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["partners", { "visible": __props.visible }]
      }, _attrs))} data-v-bf2efcd7><h2 class="h2 color-brand-6 partners__title" data-v-bf2efcd7>${ssrInterpolate(_ctx.$t("Partners.title"))}</h2><div class="partners__grid" data-v-bf2efcd7><!--[-->`);
      ssrRenderList(partners, (partner) => {
        _push(`<a${ssrRenderAttr("href", partner.url)} target="_blank" class="partners__item" data-v-bf2efcd7><img${ssrRenderAttr("src", partner.logo)}${ssrRenderAttr("alt", partner.name)} class="partners__logo" data-v-bf2efcd7></a>`);
      });
      _push(`<!--]--></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Partners.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Partners = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-bf2efcd7"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const solutionsVisible = ref(false);
    const widgetHomeVisible = ref(false);
    const algorithmInfoVisible = ref(false);
    const scienceBehindVisible = ref(false);
    const statisticBannerVisible = ref(false);
    const aboutBannerVisible = ref(false);
    const forWhomVisible = ref(false);
    const bookDemoBannerVisible = ref(false);
    const howItWorksVisible = ref(false);
    const partnersVisible = ref(false);
    const isElementInViewport = (element, isVisible) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = (void 0).innerHeight;
      const elementCenterY = (rect.top - windowHeight / 2 + rect.bottom) / 2;
      return elementCenterY >= windowHeight / 3 && elementCenterY <= windowHeight * 2 / 3;
    };
    const updateVisibility = () => {
      const solutions = (void 0).querySelector(".solutions");
      const widgetHome = (void 0).querySelector(".widget-home");
      const algorithmInfo = (void 0).querySelector(".algorithm-info");
      const scienceBehind = (void 0).querySelector(".science-behind");
      const statisticBanner = (void 0).querySelector(".statistic-banner");
      const aboutBanner = (void 0).querySelector(".about-banner");
      const forWhom = (void 0).querySelector(".for-whom");
      const bookDemoBanner = (void 0).querySelector(".book-demo");
      const howItWorks = (void 0).querySelector(".how-it-works");
      const partners = (void 0).querySelector(".partners");
      if (solutions)
        solutionsVisible.value = solutionsVisible.value ? true : isElementInViewport(solutions);
      if (widgetHome)
        widgetHomeVisible.value = widgetHomeVisible.value ? true : isElementInViewport(widgetHome);
      if (algorithmInfo)
        algorithmInfoVisible.value = algorithmInfoVisible.value ? true : isElementInViewport(algorithmInfo);
      if (scienceBehind)
        scienceBehindVisible.value = scienceBehindVisible.value ? true : isElementInViewport(scienceBehind);
      if (statisticBanner)
        statisticBannerVisible.value = statisticBannerVisible.value ? true : isElementInViewport(statisticBanner);
      if (aboutBanner)
        aboutBannerVisible.value = aboutBannerVisible.value ? true : isElementInViewport(aboutBanner);
      if (forWhom)
        forWhomVisible.value = forWhomVisible.value ? true : isElementInViewport(forWhom);
      if (bookDemoBanner)
        bookDemoBannerVisible.value = bookDemoBannerVisible.value ? true : isElementInViewport(bookDemoBanner);
      if (howItWorks)
        howItWorksVisible.value = howItWorksVisible.value ? true : isElementInViewport(howItWorks);
      if (partners)
        partnersVisible.value = partnersVisible.value ? true : isElementInViewport(partners);
    };
    onUnmounted(() => {
      (void 0).removeEventListener("scroll", updateVisibility);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, { "show-links": true }, null, _parent));
      _push(`<main class="main-page" role="main"><section aria-labelledby="hero-title">`);
      _push(ssrRenderComponent(StartBanner, null, null, _parent));
      _push(`</section><section aria-labelledby="demo-title" id="ai-sommelier">`);
      _push(ssrRenderComponent(WidgetHome, { visible: widgetHomeVisible.value }, null, _parent));
      _push(`</section><section aria-labelledby="benefits-title" id="for-whom">`);
      _push(ssrRenderComponent(ForWhom, { visible: forWhomVisible.value }, null, _parent));
      _push(`</section><section aria-labelledby="stats-title" id="statistics">`);
      _push(ssrRenderComponent(StatisticBanner, { visible: statisticBannerVisible.value }, null, _parent));
      _push(`</section><section aria-labelledby="how-it-works-title" id="how-it-works">`);
      _push(ssrRenderComponent(HowItWorks, { visible: howItWorksVisible.value }, null, _parent));
      _push(`</section><section aria-labelledby="partners-title" id="partners">`);
      _push(ssrRenderComponent(Partners, { visible: partnersVisible.value }, null, _parent));
      _push(`</section></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-Dzuhg28i.mjs.map
