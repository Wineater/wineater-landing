import { B as Button } from './Header-Cdjvx2Ao.mjs';
import { resolveComponent, mergeProps, withCtx, createTextVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrInterpolate, ssrRenderComponent } from 'vue/server-renderer';
import { _ as _export_sfc } from './server.mjs';

const _sfc_main = {
  components: {
    Button
  },
  methods: {
    openDemoPage() {
      (void 0).open("https://share-eu1.hsforms.com/1kziM_bz_TDqsB5emVJbReA2ehswf", "_blank");
    }
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Button = resolveComponent("Button");
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "footer" }, _attrs))} data-v-499da2ef><div class="footer__content" data-v-499da2ef><div class="footer__texts" data-v-499da2ef><div class="footer__title color-brand-4 decorative-1" data-v-499da2ef>${ssrInterpolate(_ctx.$t("Footer.title"))}</div><div class="footer__text h2 color-brand-4" data-v-499da2ef>${ssrInterpolate(_ctx.$t("Footer.text"))} <div class="footer__text-arrow" data-v-499da2ef></div></div><div class="footer__btn" data-v-499da2ef>`);
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
  _push(`</div></div><div class="footer__info" data-v-499da2ef><div class="footer__logo" data-v-499da2ef></div><div class="footer__links" data-v-499da2ef><a class="p1 color-brand-4" href="mailto:hi@wineater.com" data-v-499da2ef>hi@wineater.com</a><a class="p1 color-brand-4" href="tel:334563278" data-v-499da2ef>+33 7 81 01 40 33</a><a class="p1 color-brand-4" href="https://linkedin.com/company/wineater" target="_blank" data-v-499da2ef>Linkedin</a></div></div></div></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/Footer.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const Footer = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-499da2ef"]]);

export { Footer as F };
//# sourceMappingURL=Footer-D4rw37_F.mjs.map
