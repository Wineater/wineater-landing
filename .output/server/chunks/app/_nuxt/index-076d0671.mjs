import { ssrRenderComponent, ssrRenderAttrs, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
import { ref, onUnmounted, useSSRContext, mergeProps, withCtx, createTextVNode, toDisplayString, createVNode, resolveComponent, defineComponent, computed, h } from 'vue';
import { _ as _export_sfc, u as useRouter, n as navigateTo } from '../server.mjs';
import { n as hasProtocol, p as parseURL, y as parseQuery, z as withTrailingSlash, A as withoutTrailingSlash } from '../../nitro/node-server.mjs';
import { H as Header, B as Button } from './Header-ad5c3303.mjs';
import '@unhead/shared';
import 'vue-router';
import 'is-https';
import 'node:http';
import 'node:https';
import 'node:zlib';
import 'node:stream';
import 'node:buffer';
import 'node:util';
import 'node:url';
import 'node:net';
import 'node:fs';
import 'node:path';
import 'fs';
import 'path';

const firstNonUndefined = (...args) => args.find((arg) => arg !== void 0);
const DEFAULT_EXTERNAL_REL_ATTRIBUTE = "noopener noreferrer";
/*! @__NO_SIDE_EFFECTS__ */
// @__NO_SIDE_EFFECTS__
function defineNuxtLink(options) {
  const componentName = options.componentName || "NuxtLink";
  const resolveTrailingSlashBehavior = (to, resolve) => {
    if (!to || options.trailingSlash !== "append" && options.trailingSlash !== "remove") {
      return to;
    }
    const normalizeTrailingSlash = options.trailingSlash === "append" ? withTrailingSlash : withoutTrailingSlash;
    if (typeof to === "string") {
      return normalizeTrailingSlash(to, true);
    }
    const path = "path" in to ? to.path : resolve(to).path;
    return {
      ...to,
      name: void 0,
      // named routes would otherwise always override trailing slash behavior
      path: normalizeTrailingSlash(path, true)
    };
  };
  return /* @__PURE__ */ defineComponent({
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
      const to = computed(() => {
        const path = props.to || props.href || "";
        return resolveTrailingSlashBehavior(path, router.resolve);
      });
      const isExternal = computed(() => {
        if (props.external) {
          return true;
        }
        if (props.target && props.target !== "_self") {
          return true;
        }
        if (typeof to.value === "object") {
          return false;
        }
        return to.value === "" || hasProtocol(to.value, { acceptRelative: true });
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
            routerLinkProps.rel = props.rel;
          }
          return h(
            resolveComponent("RouterLink"),
            routerLinkProps,
            slots.default
          );
        }
        const href = typeof to.value === "object" ? (_a2 = (_a = router.resolve(to.value)) == null ? void 0 : _a.href) != null ? _a2 : null : to.value || null;
        const target = props.target || null;
        const rel = props.noRel ? null : firstNonUndefined(props.rel, options.externalRelAttribute, href ? DEFAULT_EXTERNAL_REL_ATTRIBUTE : "") || null;
        const navigate = () => navigateTo(href, { replace: props.replace });
        if (props.custom) {
          if (!slots.default) {
            return null;
          }
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
                // stub properties for compat with vue-router
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
const __nuxt_component_0 = /* @__PURE__ */ defineNuxtLink({ componentName: "NuxtLink" });
const _sfc_main$8 = {};
function _sfc_ssrRender$5(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-banner" }, _attrs))} data-v-6c741c91><div class="main-banner__info" data-v-6c741c91><h1 class="h1 main-banner__info-title color-text" data-v-6c741c91>${ssrInterpolate(_ctx.$t("startBanner.WineAndFoodPairing"))}</h1><div class="main-banner__info-description" data-v-6c741c91><p class="p1 color-text" data-v-6c741c91>${ssrInterpolate(_ctx.$t("startBanner.title1"))} <span class="color-brand-1" data-v-6c741c91>${ssrInterpolate(_ctx.$t("startBanner.title2"))}</span> ${ssrInterpolate(_ctx.$t("startBanner.title2"))}</p><div class="main-banner__info-hint" data-v-6c741c91></div></div></div><div class="main-banner__img" data-v-6c741c91></div></div>`);
}
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StartBanner.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const StartBanner = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["ssrRender", _sfc_ssrRender$5], ["__scopeId", "data-v-6c741c91"]]);
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
      }, _attrs))} data-v-166fe7a0><div class="science-behind__bottles" data-v-166fe7a0><div class="science-behind__bottles-text" data-v-166fe7a0><h2 class="h2 color-brand-4" data-v-166fe7a0>${ssrInterpolate(_ctx.$t("scienceBehind.title"))}</h2><p class="p1 color-brand-4" data-v-166fe7a0>${ssrInterpolate(_ctx.$t("scienceBehind.text"))}</p></div></div><div class="science-behind__bottle" data-v-166fe7a0></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/ScienceBehind.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const ScienceBehind = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-166fe7a0"]]);
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
  }, _attrs))} data-v-8225fc09></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/HowItWorks.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const HowItWorks = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender$3], ["__scopeId", "data-v-8225fc09"]]);
const _sfc_main$3 = {
  components: {
    Button
  },
  methods: {
    openDemoPage() {
      window.open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8", "_blank");
    }
  }
};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-71c17de9><div class="footer__content" data-v-71c17de9><div class="footer__texts" data-v-71c17de9><div class="footer__title color-brand-4 decorative-1" data-v-71c17de9>${ssrInterpolate(_ctx.$t("Footer.title"))}</div><div class="footer__text h2 color-brand-4" data-v-71c17de9>${ssrInterpolate(_ctx.$t("Footer.text"))} <div class="footer__text-arrow" data-v-71c17de9></div></div><div class="footer__btn" data-v-71c17de9>`);
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
  _push(`</div></div><div class="footer__info" data-v-71c17de9><div class="footer__logo" data-v-71c17de9></div><div class="footer__links" data-v-71c17de9><a class="p1 color-brand-4" href="vladimir@wineater.com" data-v-71c17de9>vladimir@wineater.com</a><a class="p1 color-brand-4" href="https://instagram.com/ah_vladimir?igshid=MzRlODBiNWFlZA==" target="_blank" data-v-71c17de9>Instagram</a></div></div></div></div>`);
}
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Footer.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["ssrRender", _sfc_ssrRender$2], ["__scopeId", "data-v-71c17de9"]]);
const _sfc_main$2 = {
  components: {
    Button
  },
  props: {
    visible: Boolean
  },
  methods: {
    openDemoPage() {
      window.open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8", "_blank");
    }
  }
};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({
    class: ["book-demo", { "visible": $props.visible }]
  }, _attrs))} data-v-fa600328><div class="book-demo__title h2" data-v-fa600328>${ssrInterpolate(_ctx.$t("BookDemo.title1"))} <span class="decorative-1 color-brand-1" data-v-fa600328>${ssrInterpolate(_ctx.$t("BookDemo.title2"))}</span></div><div class="book-demo__btn" data-v-fa600328>`);
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
  _push(`<div class="book-demo__arrow" data-v-fa600328></div></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/BookDemoBanner.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const BookDemoBanner = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-fa600328"]]);
const _sfc_main$1 = {
  props: {
    visible: Boolean
  },
  data() {
    return {
      cards: {
        "en": [
          {
            "description": "Upload all wine and food SKUs, the algorithm will analyze your catalog and select combinations and specific SKU.",
            "infographic": "some infographics",
            "title": "Retailers"
          },
          {
            "description": "Upload your menu, the algorithm will analyze the ingredients and help you make a suitable wine list.",
            "infographic": "some infographics",
            "title": "Horeca"
          },
          {
            "description": "some text",
            "infographic": "some infographics",
            "title": "Manufacturers"
          }
        ],
        "fr": [
          {
            "description": "T\xE9l\xE9chargez tous les SKU de vins et de produits alimentaires, l'algorithme analysera votre catalogue et s\xE9lectionnera des combinaisons et des SKU sp\xE9cifiques.",
            "infographic": "quelques infographies",
            "title": "D\xE9taillants"
          },
          {
            "description": "T\xE9l\xE9chargez votre menu, l'algorithme analysera les ingr\xE9dients et vous aidera \xE0 \xE9tablir une liste de vins appropri\xE9e.",
            "infographic": "quelques infographies",
            "title": "Horeca"
          },
          {
            "description": "quelque texte",
            "infographic": "quelques infographies",
            "title": "Fabricants"
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
  }, _attrs))} data-v-5a50f5b7><h2 class="h2 color-brand-6" data-v-5a50f5b7>${ssrInterpolate(_ctx.$t("ForWhom.title"))}</h2><div class="for-whom__cards" data-v-5a50f5b7><!--[-->`);
  ssrRenderList($data.cards[_ctx.$i18n.locale], (card) => {
    _push(`<div class="for-whom__card" data-v-5a50f5b7><div class="for-whom__card-texts" data-v-5a50f5b7><div class="for-whom__card-title h3" data-v-5a50f5b7>${ssrInterpolate(card.title)}</div><div class="for-whom__card-description p1 color-dark-100" data-v-5a50f5b7>${ssrInterpolate(card.description)}</div></div><div class="for-whom__card-infographic decorative-2 color-brand-1" data-v-5a50f5b7>${ssrInterpolate(card.infographic)}</div></div>`);
  });
  _push(`<!--]--></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/ForWhom.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const ForWhom = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-5a50f5b7"]]);
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
      const windowHeight = window.innerHeight;
      const elementCenterY = (rect.top - windowHeight / 2 + rect.bottom) / 2;
      return elementCenterY >= windowHeight / 3 && elementCenterY <= windowHeight * 2 / 3;
    };
    const updateVisibility = () => {
      const algorithmInfo = document.querySelector(".algorithm-info");
      const scienceBehind = document.querySelector(".science-behind");
      const statisticBanner = document.querySelector(".statistic-banner");
      const aboutBanner = document.querySelector(".about-banner");
      const forWhom = document.querySelector(".for-whom");
      const bookDemoBanner = document.querySelector(".book-demo");
      const howItWorks = document.querySelector(".how-it-works");
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
      window.removeEventListener("scroll", updateVisibility);
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
//# sourceMappingURL=index-076d0671.mjs.map
