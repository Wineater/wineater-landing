import { a as buildAssetsURL } from '../routes/renderer.mjs';
import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList, ssrRenderAttr } from 'vue/server-renderer';
import { ref, onUnmounted, mergeProps, watch, resolveComponent, withCtx, createTextVNode, toDisplayString, watchEffect, getCurrentInstance, useSSRContext } from 'vue';
import { _ as _export_sfc, a as useI18n, i as injectHead, r as resolveUnrefHeadInput } from './server.mjs';
import { composableNames } from '@unhead/shared';
import { H as Header, B as Button } from './Header-BhEBevS8.mjs';
import 'vue-bundle-renderer/runtime';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import 'vue-router';

function useHead(input, options = {}) {
  const head = options.head || injectHead();
  if (head) {
    if (!head.ssr)
      return clientUseHead(head, input, options);
    return head.push(input, options);
  }
}
function clientUseHead(head, input, options = {}) {
  const deactivated = ref(false);
  const resolvedInput = ref({});
  watchEffect(() => {
    resolvedInput.value = deactivated.value ? {} : resolveUnrefHeadInput(input);
  });
  const entry = head.push(resolvedInput.value, options);
  watch(resolvedInput, (e) => {
    entry.patch(e);
  });
  getCurrentInstance();
  return entry;
}
const coreComposableNames = [
  "injectHead"
];
({
  "@unhead/vue": [...coreComposableNames, ...composableNames]
});
const _sfc_main$6 = {};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-banner" }, _attrs))} data-v-982a3b2f><div class="main-banner__info" data-v-982a3b2f><h1 class="h1 main-banner__info-title color-text" data-v-982a3b2f>${ssrInterpolate(_ctx.$t("startBanner.WineAndFoodPairing"))}</h1><div class="main-banner__info-description" data-v-982a3b2f><p class="p1 color-text" data-v-982a3b2f>${ssrInterpolate(_ctx.$t("startBanner.title1"))} <span class="color-brand-1" data-v-982a3b2f>${ssrInterpolate(_ctx.$t("startBanner.title2"))}</span> ${ssrInterpolate(_ctx.$t("startBanner.title3"))}</p><div class="main-banner__info-hint" data-v-982a3b2f></div></div></div><div class="main-banner__img" data-v-982a3b2f></div></div>`);
}
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StartBanner.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : undefined;
};
const StartBanner = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-982a3b2f"]]);
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
    const scriptsLoaded = ref(false);
    const headScripts = ref([]);
    const { locale } = useI18n();
    const loadWidgetScripts = () => {
      scriptsLoaded.value = false;
      headScripts.value = [];
      setTimeout(() => {
        headScripts.value = [
          {
            innerHTML: `window.wineaterData = {
          CLIENT_TOKEN: 'TOKEN',
          TYPE: 'widget',
          WIDGET_TYPE: 'store',
          WIDGET_WRAPPER: 'wineater-widget-conteiner'
        };`,
            id: "wineater-config"
          },
          {
            src: "https://unpkg.com/wineater-bot@latest/dist/wineater-chatbot.umd.js",
            type: "module",
            id: "wineater-module"
          }
        ];
        scriptsLoaded.value = true;
        setTimeout(() => {
          const container = (undefined).getElementById("wineater-widget-conteiner");
          if (container && container.childElementCount === 0) {
            showReloadButton.value = true;
          }
        }, 5e3);
      }, 100);
    };
    watch(() => props.visible, (newValue) => {
      if (newValue) {
        loadWidgetScripts();
      }
    }, { immediate: true });
    watch(() => locale.value, () => {
      if (props.visible) {
        const container = (undefined).getElementById("wineater-widget-conteiner");
        if (container) {
          container.innerHTML = "";
        }
        loadWidgetScripts();
      }
    });
    useHead({
      script: headScripts
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["widget-home", { "visible": __props.visible }]
      }, _attrs))} data-v-43f3da79><h2 class="h2 color-brand-6" data-v-43f3da79>${ssrInterpolate(_ctx.$t("WidgetHome.title"))}</h2><div id="wineater-widget-conteiner" data-v-43f3da79></div>`);
      if (showReloadButton.value) {
        _push(`<button class="reload-button" data-v-43f3da79> Reload AI Sommelier Widget </button>`);
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
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : undefined;
};
const WidgetHome = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-43f3da79"]]);
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
      }, _attrs))} data-v-4916f79e><div class="statistic-banner__title h2 color-text" data-v-4916f79e>${ssrInterpolate(_ctx.$t("StatisticBanner.title1"))} <br data-v-4916f79e><span class="color-brand-6" data-v-4916f79e>${ssrInterpolate(_ctx.$t("StatisticBanner.title2"))}</span></div><div class="statistic-banner__grid" data-v-4916f79e><div class="statistic-banner__card" data-v-4916f79e><div class="statistic-banner__label" data-v-4916f79e>every</div><div class="statistic-banner__value" data-v-4916f79e><span class="value-number" data-v-4916f79e>${ssrInterpolate(animatedPercent1.value)}</span><span class="value-suffix" data-v-4916f79e>rd</span></div><div class="statistic-banner__subtitle" data-v-4916f79e>user</div><div class="statistic-banner__description p1" data-v-4916f79e>${ssrInterpolate(_ctx.$t("StatisticBanner.text1"))}</div></div><div class="statistic-banner__card" data-v-4916f79e><div class="statistic-banner__label" data-v-4916f79e>up to</div><div class="statistic-banner__value" data-v-4916f79e><span class="value-number" data-v-4916f79e>${ssrInterpolate(animatedPercent2.value)}</span><span class="value-suffix" data-v-4916f79e>%</span></div><div class="statistic-banner__subtitle" data-v-4916f79e>upsell increase</div><div class="statistic-banner__description p1" data-v-4916f79e>${ssrInterpolate(_ctx.$t("StatisticBanner.text2"))}</div></div><div class="statistic-banner__card" data-v-4916f79e><div class="statistic-banner__label" data-v-4916f79e>more than</div><div class="statistic-banner__value" data-v-4916f79e><span class="value-number" data-v-4916f79e>${ssrInterpolate(animatedPercent3.value)}</span><span class="value-suffix" data-v-4916f79e>%</span></div><div class="statistic-banner__subtitle" data-v-4916f79e>wines</div><div class="statistic-banner__description p1" data-v-4916f79e>${ssrInterpolate(_ctx.$t("StatisticBanner.text3"))}</div></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StatisticBanner.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : undefined;
};
const StatisticBanner = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-4916f79e"]]);
const _sfc_main$3 = {
  components: {
    Button
  },
  props: {
    visible: Boolean
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["how-it-works", {
      "visible": $props.visible,
      "how-it-works--fr": _ctx.$i18n.locale === "fr"
    }]
  }, _attrs))} data-v-6b76953e><h2 class="h2 color-brand-6" data-v-6b76953e>${ssrInterpolate(_ctx.$t("HowItWorks.title"))}</h2></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/HowItWorks.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : undefined;
};
const HowItWorks = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-6b76953e"]]);
const _sfc_main$2 = {
  components: {
    Button
  },
  methods: {
    openDemoPage() {
      (undefined).open("https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf", "_blank");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-bc74106c><div class="footer__content" data-v-bc74106c><div class="footer__texts" data-v-bc74106c><div class="footer__title color-brand-4 decorative-1" data-v-bc74106c>${ssrInterpolate(_ctx.$t("Footer.title"))}</div><div class="footer__text h2 color-brand-4" data-v-bc74106c>${ssrInterpolate(_ctx.$t("Footer.text"))} <div class="footer__text-arrow" data-v-bc74106c></div></div><div class="footer__btn" data-v-bc74106c>`);
  _push(ssrRenderComponent(_component_Button, { onBtnClick: $options.openDemoPage }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("playground.BookDemo"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("playground.BookDemo")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`</div></div><div class="footer__info" data-v-bc74106c><div class="footer__logo" data-v-bc74106c></div><div class="footer__links" data-v-bc74106c><a class="p1 color-brand-4" href="hi@wineater.com" data-v-bc74106c>hi@wineater.com</a><a class="p1 color-brand-4" href="https://linkedin.com/company/wineater" target="_blank" data-v-bc74106c>Linkedin</a></div></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Footer.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : undefined;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-bc74106c"]]);
const _imports_0 = "" + buildAssetsURL("widget_test.DQP5KCrp.png");
const _imports_1 = "" + buildAssetsURL("QR_test.BQeJ754U.png");
const _sfc_main$1 = {
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
  }, _attrs))} data-v-369bbd2f><h2 class="h2 color-brand-6" data-v-369bbd2f>${ssrInterpolate(_ctx.$t("ForWhom.title"))}</h2><div class="for-whom__cards" data-v-369bbd2f><!--[-->`);
  ssrRenderList($data.cards[_ctx.$i18n.locale], (card) => {
    _push(`<div class="for-whom__card" data-v-369bbd2f><div class="for-whom__card-texts" data-v-369bbd2f><div class="for-whom__card-title h3" data-v-369bbd2f>${ssrInterpolate(card.title)}</div><div class="for-whom__card-image" data-v-369bbd2f>`);
    if (card.id === "online") {
      _push(`<img${ssrRenderAttr("src", _imports_0)} alt="Widget screenshot" data-v-369bbd2f>`);
    } else if (card.id === "offline") {
      _push(`<img${ssrRenderAttr("src", _imports_1)} alt="QR code screenshot" data-v-369bbd2f>`);
    } else {
      _push(`<!---->`);
    }
    _push(`</div><div class="for-whom__card-description p1 color-dark-100" data-v-369bbd2f>${ssrInterpolate(card.description)}</div></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/ForWhom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : undefined;
};
const ForWhom = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-369bbd2f"]]);
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
    const isElementInViewport = (element, isVisible) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = (undefined).innerHeight;
      const elementCenterY = (rect.top - windowHeight / 2 + rect.bottom) / 2;
      return elementCenterY >= windowHeight / 3 && elementCenterY <= windowHeight * 2 / 3;
    };
    const updateVisibility = () => {
      const solutions = (undefined).querySelector(".solutions");
      const widgetHome = (undefined).querySelector(".widget-home");
      const algorithmInfo = (undefined).querySelector(".algorithm-info");
      const scienceBehind = (undefined).querySelector(".science-behind");
      const statisticBanner = (undefined).querySelector(".statistic-banner");
      const aboutBanner = (undefined).querySelector(".about-banner");
      const forWhom = (undefined).querySelector(".for-whom");
      const bookDemoBanner = (undefined).querySelector(".book-demo");
      const howItWorks = (undefined).querySelector(".how-it-works");
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
    };
    onUnmounted(() => {
      (undefined).removeEventListener("scroll", updateVisibility);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, { "show-links": true }, null, _parent));
      _push(`<div class="main-page">`);
      _push(ssrRenderComponent(StartBanner, null, null, _parent));
      _push(ssrRenderComponent(WidgetHome, { visible: widgetHomeVisible.value }, null, _parent));
      _push(ssrRenderComponent(ForWhom, { visible: forWhomVisible.value }, null, _parent));
      _push(ssrRenderComponent(StatisticBanner, { visible: statisticBannerVisible.value }, null, _parent));
      _push(ssrRenderComponent(HowItWorks, { visible: howItWorksVisible.value }, null, _parent));
      _push(`</div>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`<!--]-->`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};

export { _sfc_main as default };
//# sourceMappingURL=index-ntv9aK3r.mjs.map
