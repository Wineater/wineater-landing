import { _ as _export_sfc, u as useRoute, m as useI18n, d as navigateTo } from './server.mjs';
import { useSSRContext, ref, mergeProps, unref, withCtx, createTextVNode, toDisplayString } from 'vue';
import { ssrRenderAttrs, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';

const _sfc_main$2 = {
  __name: "Button",
  __ssrInlineRender: true,
  props: {
    bgColor: {
      type: String,
      required: false,
      default: "black"
    },
    disabled: {
      type: Boolean
    }
  },
  setup(__props) {
    const props = __props;
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: `button button--${props.bgColor} ${props.disabled ? "button--disabled" : ""}`
      }, _attrs))} data-v-159576da><span class="p1" data-v-159576da>`);
      ssrRenderSlot(_ctx.$slots, "default", {}, null, _push, _parent);
      _push(`</span></div>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Buttons/Button.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const Button = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-159576da"]]);
const _sfc_main$1 = {
  __name: "LangSwitcher",
  __ssrInlineRender: true,
  setup(__props) {
    const { locales, locale, setLocale } = useI18n();
    let localeValue = locale.value;
    let currentLanguage = ref(localeValue);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({
        class: ["switcher", { "switcher--active": unref(currentLanguage) === "en" }]
      }, _attrs))}><span class="p1">FR</span><span class="p1">EN</span></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Buttons/LangSwitcher.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const LangSwitcher = _sfc_main$1;
const __default__ = {
  components: {
    Button,
    LangSwitcher
  },
  props: {
    showLinks: {
      type: Boolean
    },
    logo: {
      type: String,
      default: "Wineater"
    }
  },
  data: () => {
    return {
      logos: {
        Wineater: "https://landing-static.s3.eu-central-1.amazonaws.com/images/logo.svg",
        Telckel: "https://landing-static.s3.eu-central-1.amazonaws.com/images/Telckel.png",
        Climats: "https://landing-static.s3.eu-central-1.amazonaws.com/images/Climats.png"
      }
    };
  },
  methods: {
    openDemoPage() {
      (void 0).open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8", "_blank");
    },
    openMainPage() {
      navigateTo("/");
    },
    scrollToBlock(block) {
      const element = (void 0).querySelector(block);
      (void 0).scrollTo({
        top: element.offsetTop - 200,
        behavior: "smooth"
      });
    }
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __name: "Header",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const store = ref(route.query.store ? route.query.store : "");
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-43ac04ed><div class="header__logo" style="${ssrRenderStyle({ "background-image": `url(${unref(store) && _ctx.logos[unref(store)] ? _ctx.logos[unref(store)] : _ctx.logos.Wineater})` })}" data-v-43ac04ed></div>`);
      if (__props.showLinks) {
        _push(`<div class="header__links" data-v-43ac04ed><div class="header__link p1 color-text" data-v-43ac04ed>${ssrInterpolate(_ctx.$t("Header.TryMe"))}</div><div class="header__link p1 color-text" data-v-43ac04ed>${ssrInterpolate(_ctx.$t("Header.HowItWorks"))}</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="header__right-container" data-v-43ac04ed><div class="header__btns" data-v-43ac04ed>`);
      _push(ssrRenderComponent(LangSwitcher, null, null, _parent));
      _push(`<div class="header__btn" data-v-43ac04ed>`);
      _push(ssrRenderComponent(Button, { onBtnClick: _ctx.openDemoPage }, {
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
      _push(`</div></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-43ac04ed"]]);

export { Button as B, Header as H };
//# sourceMappingURL=Header-D2jD33gm.mjs.map
