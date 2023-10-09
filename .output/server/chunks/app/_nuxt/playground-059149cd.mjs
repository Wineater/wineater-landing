import { _ as __nuxt_component_0 } from './Header-1d2a47ca.mjs';
import { defineComponent, useSSRContext, mergeProps } from 'vue';
import { ssrRenderComponent, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc } from '../server.mjs';
import '../../nitro/node-server.mjs';
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
import '@unhead/shared';
import 'vue-router';
import 'is-https';
import '@openreplay/tracker/cjs/index.js';

const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "main-banner" }, _attrs))} data-v-8d8fbc10><div class="main-banner__info" data-v-8d8fbc10><h1 class="h1 main-banner__info-title color-text" data-v-8d8fbc10>Wine and food pairing</h1><div class="main-banner__info-description" data-v-8d8fbc10><p class="p1 color-text" data-v-8d8fbc10>Enhance a dining experience with the AI sommelier, ensuring <span class="color-brand-1" data-v-8d8fbc10>impeccable wine and food pairings</span> every time.</p><div class="main-banner__info-hint" data-v-8d8fbc10></div></div></div><div class="main-banner__img" data-v-8d8fbc10></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/LandingComponents/StartBanner.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const StartBanner = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-8d8fbc10"]]);
const _sfc_main = /* @__PURE__ */ defineComponent({
  __name: "playground",
  __ssrInlineRender: true,
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_Header = __nuxt_component_0;
      _push(`<!--[-->`);
      _push(ssrRenderComponent(_component_Header, { "show-links": true }, null, _parent));
      _push(`<div class="main-page">`);
      _push(ssrRenderComponent(StartBanner, null, null, _parent));
      _push(`</div><!--]-->`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/playground.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};

export { _sfc_main as default };
//# sourceMappingURL=playground-059149cd.mjs.map
