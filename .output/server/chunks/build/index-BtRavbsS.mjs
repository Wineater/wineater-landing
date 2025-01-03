import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ref, onUnmounted, useSSRContext, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, resolveComponent, defineComponent, computed, h } from 'vue';
import { _ as _export_sfc, a as useRouter, h as hasProtocol, j as joinURL, p as parseURL, b as parseQuery, n as nuxtLinkDefaults, c as useRuntimeConfig, d as navigateTo, w as withTrailingSlash, e as withoutTrailingSlash } from './server.mjs';
import { H as Header, B as Button } from './Header-CcjQdAgV.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  function resolveTrailingSlashBehavior(to, resolve) {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    if (typeof to === "string") {
      return applyTrailingSlashBehavior(to, options.trailingSlash);
    }
    const path = "path" in to && to.path !== void 0 ? to.path : resolve(to).path;
    const resolvedPath = {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: applyTrailingSlashBehavior(path, options.trailingSlash)
    };
    return resolvedPath;
  }
  return defineComponent({
    name: componentName,
    props: {
      // Routing
      to: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      href: {
        type: [String, Object],
        default: void 0,
        required: false
      },
      // Attributes
      target: {
        type: String,
        default: void 0,
        required: false
      },
      rel: {
        type: String,
        default: void 0,
        required: false
      },
      noRel: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Prefetching
      prefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      noPrefetch: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Styling
      activeClass: {
        type: String,
        default: void 0,
        required: false
      },
      exactActiveClass: {
        type: String,
        default: void 0,
        required: false
      },
      prefetchedClass: {
        type: String,
        default: void 0,
        required: false
      },
      // Vue Router's `<RouterLink>` additional props
      replace: {
        type: Boolean,
        default: void 0,
        required: false
      },
      ariaCurrentValue: {
        type: String,
        default: void 0,
        required: false
      },
      // Edge cases handling
      external: {
        type: Boolean,
        default: void 0,
        required: false
      },
      // Slot API
      custom: {
        type: Boolean,
        default: void 0,
        required: false
      }
    },
    setup(props, { slots }) {
      const router = useRouter();
      const config = useRuntimeConfig();
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isAbsoluteUrl = computed(() => typeof to.value === "string" && hasProtocol(to.value, { acceptRelative: true }));
      const hasTarget = computed(() => props.target && props.target !== "_self");
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (hasTarget.value) {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || isAbsoluteUrl.value;
      });
      const prefetched = ref(false);
      const el = void 0;
      const elRef = void 0;
      return () => {
        var _a2;
        var _a, _b;
        if (!isExternal.value) {
          const routerLinkProps = {
            ref: elRef,
            to: to.value,
            activeClass: props.activeClass || options.activeClass,
            exactActiveClass: props.exactActiveClass || options.exactActiveClass,
            replace: props.replace,
            ariaCurrentValue: props.ariaCurrentValue,
            custom: props.custom
          };
          if (!props.custom) {
            if (prefetched.value) {
              routerLinkProps.class = props.prefetchedClass || options.prefetchedClass;
            }
            routerLinkProps.rel = props.rel || void 0;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_a2 = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _a2 : null : to.value && !props.external && !isAbsoluteUrl.value ? resolveTrailingSlashBehavior(joinURL(config.app.baseURL, to.value), router.resolve) : to.value || null;
        const target = props.target || null;
        const rel = firstNonUndefined(
          // converts `""` to `null` to prevent the attribute from being added as empty (`rel=""`)
          props.noRel ? "" : props.rel,
          options.externalRelAttribute,
          /*
          * A fallback rel of `noopener noreferrer` is applied for external links or links that open in a new tab.
          * This solves a reverse tabnapping security flaw in browsers pre-2021 as well as improving privacy.
          */
          isAbsoluteUrl.value || hasTarget.value ? "noopener noreferrer" : ""
        ) || null;
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
          const navigate = () => navigateTo(href, { replace: props.replace, external: props.external });
          return slots.default({
            href,
            navigate,
            get route() {
              if (!href) {
                return void 0;
              }
              const url = parseURL(href);
              return {
                path: url.pathname,
                fullPath: url.pathname,
                get query() {
                  return parseQuery(url.search);
                },
                hash: url.hash,
                params: {},
                name: void 0,
                matched: [],
                redirectedFrom: void 0,
                meta: {},
                href
              };
            },
            rel,
            target,
            isExternal: isExternal.value,
            isActive: false,
            isExactActive: false
          });
        }
        return h("a", { ref: el, href, rel, target }, (_b = slots.default) == null ? void 0 : _b.call(slots));
      };
    }
  });
}
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink(nuxtLinkDefaults);
function applyTrailingSlashBehavior(to, trailingSlash) {
  const normalizeFn = trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
  const hasProtocolDifferentFromHttp = hasProtocol(to) && !to.startsWith("http");
  if (hasProtocolDifferentFromHttp) {
    return to;
  }
  return normalizeFn(to, true);
}
const _sfc_main$8 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-banner" }, _attrs))} data-v-982a3b2f><div class="main-banner__info" data-v-982a3b2f><h1 class="h1 main-banner__info-title color-text" data-v-982a3b2f>${ssrInterpolate(_ctx.$t("startBanner.WineAndFoodPairing"))}</h1><div class="main-banner__info-description" data-v-982a3b2f><p class="p1 color-text" data-v-982a3b2f>${ssrInterpolate(_ctx.$t("startBanner.title1"))} <span class="color-brand-1" data-v-982a3b2f>${ssrInterpolate(_ctx.$t("startBanner.title2"))}</span> ${ssrInterpolate(_ctx.$t("startBanner.title3"))}</p><div class="main-banner__info-hint" data-v-982a3b2f></div></div></div><div class="main-banner__img" data-v-982a3b2f></div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StartBanner.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const StartBanner = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-982a3b2f"]]);
const _sfc_main$7 = {
  __name: "AlgorithmInfo",
  __ssrInlineRender: true,
  props: {
    visible: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0;
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["algorithm-info", { "visible": __props.visible }]
      }, _attrs))} data-v-c8b6d4bd><h2 class="h2 color-text algorithm-info__text" data-v-c8b6d4bd>${ssrInterpolate(_ctx.$t("algorithm.title1"))} <span class="color-brand-6" data-v-c8b6d4bd>${ssrInterpolate(_ctx.$t("algorithm.title2"))}</span> ${ssrInterpolate(_ctx.$t("algorithm.title3"))}</h2>`);
      _push(ssrRenderComponent(_component_NuxtLink, { to: "/playground" }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(ssrRenderComponent(Button, { class: "algorithm-info__btn" }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(_ctx.$t("playground.FindAMatch"))}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(_ctx.$t("playground.FindAMatch")), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
          } else {
            return [
              createVNode(Button, { class: "algorithm-info__btn" }, {
                default: withCtx(() => [
                  createTextVNode(toDisplayString(_ctx.$t("playground.FindAMatch")), 1)
                ]),
                _: 1
              })
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/AlgorithmInfo.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const AlgorithmInfo = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-c8b6d4bd"]]);
const _sfc_main$6 = {
  __name: "ScienceBehind",
  __ssrInlineRender: true,
  props: {
    visible: Boolean
  },
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["science-behind", { "visible": __props.visible }]
      }, _attrs))} data-v-18dd91b3><div class="science-behind__bottles" data-v-18dd91b3><div class="science-behind__bottles-text" data-v-18dd91b3><h2 class="h2 color-brand-4" data-v-18dd91b3>${ssrInterpolate(_ctx.$t("scienceBehind.title"))}</h2><p class="p1 color-brand-4" data-v-18dd91b3>${ssrInterpolate(_ctx.$t("scienceBehind.text"))}</p></div></div><div class="science-behind__bottle" data-v-18dd91b3></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/ScienceBehind.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ScienceBehind = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-18dd91b3"]]);
const _sfc_main$5 = {
  props: {
    visible: Boolean
  },
  data() {
    return {
      animatedPercent1: 0,
      animatedPercent2: 0
    };
  },
  watch: {
    visible(newVal) {
      if (newVal) {
        this.animatePercents();
      } else {
        this.animatedPercent1 = 0;
        this.animatedPercent2 = 0;
      }
    }
  },
  methods: {
    animatePercents() {
      const targetPercent1 = 66;
      const targetPercent2 = 72;
      const duration = 700;
      const interval = duration / (targetPercent1 - this.animatedPercent1);
      const updatePercentages = () => {
        if (this.animatedPercent1 < targetPercent1) {
          this.animatedPercent1 += 1;
        }
        if (this.animatedPercent2 < targetPercent2) {
          this.animatedPercent2 += 1;
        }
        if (this.animatedPercent1 < targetPercent1 || this.animatedPercent2 < targetPercent2) {
          setTimeout(updatePercentages, interval);
        }
      };
      updatePercentages();
    }
  }
};
function _sfc_ssrRender$4(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["statistic-banner", { "visible": $props.visible }]
  }, _attrs))} data-v-ea9ff99f><div class="statistic-banner__title h2 color-text" data-v-ea9ff99f>${ssrInterpolate(_ctx.$t("StatisticBanner.title1"))} <br data-v-ea9ff99f><span class="color-brand-6" data-v-ea9ff99f>${ssrInterpolate(_ctx.$t("StatisticBanner.title2"))}</span></div><div class="statistic-banner__descriptions" data-v-ea9ff99f><div class="statistic-banner__description statistic-banner__description--left" data-v-ea9ff99f><span class="statistic-banner__description-percent h2 color-text" data-v-ea9ff99f><span data-v-ea9ff99f>${ssrInterpolate($data.animatedPercent1)}</span>%</span><span class="statistic-banner__description-text p1 color-dark-100" data-v-ea9ff99f>${ssrInterpolate(_ctx.$t("StatisticBanner.text1"))}</span></div><div class="statistic-banner__description statistic-banner__description--right" data-v-ea9ff99f><span class="statistic-banner__description-percent h2 color-text" data-v-ea9ff99f><span data-v-ea9ff99f>${ssrInterpolate($data.animatedPercent2)}</span>%</span><span class="statistic-banner__description-text p1 color-dark-100" data-v-ea9ff99f>${ssrInterpolate(_ctx.$t("StatisticBanner.text2"))}</span></div></div></div>`);
}
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StatisticBanner.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const StatisticBanner = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["ssrRender", _sfc_ssrRender$4], ["__scopeId", "data-v-ea9ff99f"]]);
const _sfc_main$4 = {
  components: {
    Button
  },
  props: {
    visible: Boolean
  }
};
function _sfc_ssrRender$3(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["how-it-works", {
      "visible": $props.visible,
      "how-it-works--fr": _ctx.$i18n.locale === "fr"
    }]
  }, _attrs))} data-v-35788c43></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/HowItWorks.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HowItWorks = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-35788c43"]]);
const _sfc_main$3 = {
  components: {
    Button
  },
  methods: {
    openDemoPage() {
      (void 0).open("https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf", "_blank");
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-7415dcf8><div class="footer__content" data-v-7415dcf8><div class="footer__texts" data-v-7415dcf8><div class="footer__title color-brand-4 decorative-1" data-v-7415dcf8>${ssrInterpolate(_ctx.$t("Footer.title"))}</div><div class="footer__text h2 color-brand-4" data-v-7415dcf8>${ssrInterpolate(_ctx.$t("Footer.text"))} <div class="footer__text-arrow" data-v-7415dcf8></div></div><div class="footer__btn" data-v-7415dcf8>`);
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
  _push(`</div></div><div class="footer__info" data-v-7415dcf8><div class="footer__logo" data-v-7415dcf8></div><div class="footer__links" data-v-7415dcf8><a class="p1 color-brand-4" href="hi@wineater.com" data-v-7415dcf8>hi@wineater.com</a><a class="p1 color-brand-4" href="https://instagram.com/ah_vladimir?igshid=MzRlODBiNWFlZA==" target="_blank" data-v-7415dcf8>Instagram</a></div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-7415dcf8"]]);
const _sfc_main$2 = {
  components: {
    Button
  },
  props: {
    visible: Boolean
  },
  methods: {
    openDemoPage() {
      (void 0).open("https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf", "_blank");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["book-demo", { "visible": $props.visible }]
  }, _attrs))} data-v-dc4624e2><div class="book-demo__title h2" data-v-dc4624e2>${ssrInterpolate(_ctx.$t("BookDemo.title1"))} <span class="decorative-1 color-brand-1" data-v-dc4624e2>${ssrInterpolate(_ctx.$t("BookDemo.title2"))}</span></div><div class="book-demo__btn" data-v-dc4624e2>`);
  _push(ssrRenderComponent(_component_Button, { onClick: $options.openDemoPage }, {
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
  _push(`<div class="book-demo__arrow" data-v-dc4624e2></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/BookDemoBanner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BookDemoBanner = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-dc4624e2"]]);
const _sfc_main$1 = {
  props: {
    visible: Boolean
  },
  data() {
    return {
      cards: {
        "en": [
          {
            "description": "Consumers are more likely to purchase wine when they are confident that the recommended bottle complements their meal",
            "title": "Increase in the Number of Orders"
          },
          {
            "description": "Our algorithm includes the most profitable products, naturally leading to a higher average spend per purchase and boosting overall sales",
            "title": "Average Check Growth "
          },
          {
            "description": "By offering a unique value proposition, we make it convenient for users to choose wines, encouraging repeat visits and purchases",
            "title": "Higher User Return Rate"
          }
        ],
        "fr": [
          {
            "description": "Les consommateurs sont plus susceptibles d'acheter du vin lorsqu'ils sont convaincus que la bouteille recommand\xE9e compl\xE8te leur repas",
            "title": "Augmentation du nombre de commandes"
          },
          {
            "description": "Notre algorithme inclut les produits les plus rentables, ce qui conduit naturellement \xE0 une d\xE9pense moyenne par achat plus \xE9lev\xE9e et \xE0 une augmentation globale des ventes",
            "title": "Croissance du panier moyen"
          },
          {
            "description": "En offrant une proposition de valeur unique, nous facilitons le choix des vins pour les utilisateurs, les incitant \xE0 revenir et \xE0 acheter \xE0 nouveau",
            "title": "Taux de retour utilisateur plus \xE9lev\xE9"
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
  }, _attrs))} data-v-f5a02d73><h2 class="h2 color-brand-6" data-v-f5a02d73>${ssrInterpolate(_ctx.$t("ForWhom.title"))}</h2><div class="for-whom__cards" data-v-f5a02d73><!--[-->`);
  ssrRenderList($data.cards[_ctx.$i18n.locale], (card) => {
    _push(`<div class="for-whom__card" data-v-f5a02d73><div class="for-whom__card-texts" data-v-f5a02d73><div class="for-whom__card-title h3" data-v-f5a02d73>${ssrInterpolate(card.title)}</div><div class="for-whom__card-description p1 color-dark-100" data-v-f5a02d73>${ssrInterpolate(card.description)}</div></div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/ForWhom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ForWhom = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-f5a02d73"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const algorithmInfoVisible = ref(false);
    const scienceBehindVisible = ref(false);
    const statisticBannerVisible = ref(false);
    const aboutBannerVisible = ref(false);
    const forWhomVisible = ref(false);
    const bookDemoBannerVisible = ref(false);
    const howItWorksVisible = ref(false);
    const isElementInViewport = (element, isVisible) => {
      const rect = element.getBoundingClientRect();
      const windowHeight = (void 0).innerHeight;
      const elementCenterY = (rect.top - windowHeight / 2 + rect.bottom) / 2;
      return elementCenterY >= windowHeight / 3 && elementCenterY <= windowHeight * 2 / 3;
    };
    const updateVisibility = () => {
      const algorithmInfo = (void 0).querySelector(".algorithm-info");
      const scienceBehind = (void 0).querySelector(".science-behind");
      const statisticBanner = (void 0).querySelector(".statistic-banner");
      const aboutBanner = (void 0).querySelector(".about-banner");
      const forWhom = (void 0).querySelector(".for-whom");
      const bookDemoBanner = (void 0).querySelector(".book-demo");
      const howItWorks = (void 0).querySelector(".how-it-works");
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
      (void 0).removeEventListener("scroll", updateVisibility);
    });
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<!--[-->`);
      _push(ssrRenderComponent(Header, { "show-links": true }, null, _parent));
      _push(`<div class="main-page">`);
      _push(ssrRenderComponent(StartBanner, null, null, _parent));
      _push(ssrRenderComponent(AlgorithmInfo, { visible: algorithmInfoVisible.value }, null, _parent));
      _push(ssrRenderComponent(ScienceBehind, { visible: scienceBehindVisible.value }, null, _parent));
      _push(ssrRenderComponent(StatisticBanner, { visible: statisticBannerVisible.value }, null, _parent));
      _push(ssrRenderComponent(ForWhom, { visible: forWhomVisible.value }, null, _parent));
      _push(ssrRenderComponent(BookDemoBanner, { visible: bookDemoBannerVisible.value }, null, _parent));
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
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=index-BtRavbsS.mjs.map
