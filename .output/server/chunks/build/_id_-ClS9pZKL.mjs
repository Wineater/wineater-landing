import { _ as _export_sfc, u as useRoute } from './server.mjs';
import { useSSRContext, mergeProps, unref } from 'vue';
import { ssrRenderAttrs, ssrRenderAttr, ssrInterpolate, ssrRenderList } from 'vue/server-renderer';
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

const __default__ = {
  name: "SkeletonScreen",
  data() {
    return {
      store: null,
      // Will hold the dynamic title based on the URL parameter
      logoUrl: null,
      // Will hold the dynamic logo URL
      storeKey: null
    };
  }
};
const _sfc_main = /* @__PURE__ */ Object.assign(__default__, {
  __ssrInlineRender: true,
  setup(__props) {
    const logos = {
      Wineater: "https://landing-static.s3.eu-central-1.amazonaws.com/images/logo.svg",
      Telckel: "https://landing-static.s3.eu-central-1.amazonaws.com/images/Telckel.png",
      Climats: "https://landing-static.s3.eu-central-1.amazonaws.com/images/Climats.png",
      Biobio: "https://landing-static.s3.eu-central-1.amazonaws.com/images/Biobio.png",
      Weinpoint: "https://landing-static.s3.eu-central-1.amazonaws.com/images/Weinpoint.png"
    };
    const route = useRoute();
    const store = route.params.id;
    const storeKey = (store || "").toString().charAt(0).toUpperCase() + store.slice(1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "skeleton-wrapper" }, _attrs))} data-v-353085fe><div class="skeleton-header" data-v-353085fe>`);
      if (unref(store)) {
        _push(`<img${ssrRenderAttr("src", unref(store) && logos[storeKey] ? logos[storeKey] : logos.Wineater)} alt="Logo" class="dynamic-logo" data-v-353085fe>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(store)) {
        _push(`<h1 class="h3" data-v-353085fe>${ssrInterpolate(storeKey)}</h1>`);
      } else {
        _push(`<div class="skeleton-logo" data-v-353085fe></div>`);
      }
      if (!unref(store)) {
        _push(`<div class="skeleton-title" data-v-353085fe></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="skeleton-content" data-v-353085fe><div class="skeleton-sidebar" data-v-353085fe><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<div class="skeleton-filter" data-v-353085fe></div>`);
      });
      _push(`<!--]--></div><div class="skeleton-cards" data-v-353085fe><!--[-->`);
      ssrRenderList(9, (n) => {
        _push(`<div class="skeleton-card" data-v-353085fe><div class="skeleton-card-image" data-v-353085fe></div><div class="skeleton-card-text" data-v-353085fe></div><div class="skeleton-card-text" data-v-353085fe></div><div class="skeleton-card-text shorter" data-v-353085fe></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-353085fe"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-ClS9pZKL.mjs.map
