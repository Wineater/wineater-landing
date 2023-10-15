import { useSSRContext, resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, ref, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderStyle, ssrInterpolate, ssrRenderComponent, ssrRenderSlot } from 'vue/server-renderer';
import { _ as _export_sfc, d as useI18n } from '../server.mjs';

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
const _sfc_main = {
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
  computed: {
    getLogo() {
      return this.$route.query["store"] ? this.logos[this.$route.query["store"]] : this.logos.Wineater;
    }
  },
  methods: {
    openDemoPage() {
      window.open("https://share-eu1.hsforms.com/1UgO6pMx2T76UXxvPdYCRpw2degs8", "_blank");
    },
    openMainPage() {
      this.$router.go("/");
    },
    scrollToBlock(block) {
      const element = document.querySelector(block);
      window.scrollTo({
        top: element.offsetTop - 200,
        behavior: "smooth"
      });
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_LangSwitcher = resolveComponent("LangSwitcher");
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "header" }, _attrs))} data-v-d2d886a3><div class="${ssrRenderClass([{ "header__logo--wineater": $props.logo === "Wineater" }, "header__logo"])}" style="${ssrRenderStyle({ "background-image": `url(${$options.getLogo})` })}" data-v-d2d886a3></div>`);
  if ($props.showLinks) {
    _push(`<div class="header__links" data-v-d2d886a3><div class="header__link p1 color-text" data-v-d2d886a3>${ssrInterpolate(_ctx.$t("Header.About"))}</div><div class="header__link p1 color-text" data-v-d2d886a3>${ssrInterpolate(_ctx.$t("Header.TryMe"))}</div><div class="header__link p1 color-text" data-v-d2d886a3>${ssrInterpolate(_ctx.$t("Header.ForWhom"))}</div><div class="header__link p1 color-text" data-v-d2d886a3>${ssrInterpolate(_ctx.$t("Header.HowItWorks"))}</div></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`<div class="header__right-container" data-v-d2d886a3><div class="header__btns" data-v-d2d886a3>`);
  _push(ssrRenderComponent(_component_LangSwitcher, null, null, _parent));
  _push(`<div class="header__btn" data-v-d2d886a3>`);
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
  _push(`</div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Header.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Header = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-d2d886a3"]]);

export { Button as B, Header as H };
//# sourceMappingURL=Header-ad5c3303.mjs.map
