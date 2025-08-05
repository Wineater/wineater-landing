import { _ as _export_sfc, u as useRoute } from './server.mjs';
import { mergeProps, unref, useSSRContext } from 'vue';
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
      Wineater: "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg",
      Telckel: "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Telckel.png",
      Climats: "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Climats.png",
      Biobio: "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Biobio.png",
      Weinpoint: "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Weinpoint.png"
    };
    const route = useRoute();
    const store = route.params.id;
    const storeKey = (store || "").toString().charAt(0).toUpperCase() + store.slice(1);
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "skeleton-wrapper" }, _attrs))} data-v-d2624ca0><div class="skeleton-header" data-v-d2624ca0>`);
      if (unref(store)) {
        _push(`<img${ssrRenderAttr("src", unref(store) && logos[storeKey] ? logos[storeKey] : logos.Wineater)} alt="Logo" class="dynamic-logo" data-v-d2624ca0>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(store)) {
        _push(`<h1 class="h3" data-v-d2624ca0>${ssrInterpolate(storeKey)}</h1>`);
      } else {
        _push(`<div class="skeleton-logo" data-v-d2624ca0></div>`);
      }
      if (!unref(store)) {
        _push(`<div class="skeleton-title" data-v-d2624ca0></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="skeleton-content" data-v-d2624ca0><div class="skeleton-sidebar" data-v-d2624ca0><!--[-->`);
      ssrRenderList(10, (n) => {
        _push(`<div class="skeleton-filter" data-v-d2624ca0></div>`);
      });
      _push(`<!--]--></div><div class="skeleton-cards" data-v-d2624ca0><!--[-->`);
      ssrRenderList(9, (n) => {
        _push(`<div class="skeleton-card" data-v-d2624ca0><div class="skeleton-card-image" data-v-d2624ca0></div><div class="skeleton-card-text" data-v-d2624ca0></div><div class="skeleton-card-text" data-v-d2624ca0></div><div class="skeleton-card-text shorter" data-v-d2624ca0></div></div>`);
      });
      _push(`<!--]--></div></div></div>`);
    };
  }
});
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/demo/[id].vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : undefined;
};
const _id_ = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-d2624ca0"]]);

export { _id_ as default };
//# sourceMappingURL=_id_-B5sn0DGa.mjs.map
