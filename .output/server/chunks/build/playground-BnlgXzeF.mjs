import { B as Button, H as Header } from './Header-Bm4u3b9L.mjs';
import { useSSRContext, resolveComponent, withCtx, createTextVNode, toDisplayString, computed, toValue, reactive, mergeProps, ref, shallowRef, toRef, getCurrentInstance, onServerPrefetch, unref } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, i as fetchDefaults, e as asyncDataDefaults, k as useRequestFetch, f as useNuxtApp, g as createError } from './server.mjs';
import { B as hash } from '../runtime.mjs';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'node:fs';
import 'node:url';

const isDefer = (dedupe) => dedupe === "defer" || dedupe === false;
function useAsyncData(...args) {
  var _a2, _b2, _c, _d, _e, _f, _g, _h, _i;
  var _b;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, _handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof _handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  const nuxtApp = useNuxtApp();
  const handler = _handler ;
  const getDefault = () => null;
  const getDefaultCachedData = () => nuxtApp.isHydrating ? nuxtApp.payload.data[key] : nuxtApp.static.data[key];
  options.server = (_a2 = options.server) != null ? _a2 : true;
  options.default = (_b2 = options.default) != null ? _b2 : getDefault;
  options.getCachedData = (_c = options.getCachedData) != null ? _c : getDefaultCachedData;
  options.lazy = (_d = options.lazy) != null ? _d : false;
  options.immediate = (_e = options.immediate) != null ? _e : true;
  options.deep = (_f = options.deep) != null ? _f : asyncDataDefaults.deep;
  options.dedupe = (_g = options.dedupe) != null ? _g : "cancel";
  const hasCachedData = () => options.getCachedData(key, nuxtApp) != null;
  if (!nuxtApp._asyncData[key] || !options.immediate) {
    (_h = (_b = nuxtApp.payload._errors)[key]) != null ? _h : _b[key] = null;
    const _ref = options.deep ? ref : shallowRef;
    nuxtApp._asyncData[key] = {
      data: _ref((_i = options.getCachedData(key, nuxtApp)) != null ? _i : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxtApp.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxtApp._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    var _a3;
    if (nuxtApp._asyncDataPromises[key]) {
      if (isDefer((_a3 = opts.dedupe) != null ? _a3 : options.dedupe)) {
        return nuxtApp._asyncDataPromises[key];
      }
      nuxtApp._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxtApp.isHydrating && opts._initial !== false) && hasCachedData()) {
      return Promise.resolve(options.getCachedData(key, nuxtApp));
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxtApp));
        } catch (err) {
          reject(err);
        }
      }
    ).then(async (_result) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = await options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      nuxtApp.payload.data[key] = result;
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxtApp._asyncDataPromises[key];
      }
      asyncData.error.value = createError(error);
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      delete nuxtApp._asyncDataPromises[key];
    });
    nuxtApp._asyncDataPromises[key] = promise;
    return nuxtApp._asyncDataPromises[key];
  };
  asyncData.clear = () => clearNuxtDataByKey(nuxtApp, key);
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxtApp.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxtApp.hook("app:created", async () => {
        await promise;
      });
    }
  }
  const asyncDataPromise = Promise.resolve(nuxtApp._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function clearNuxtDataByKey(nuxtApp, key) {
  if (key in nuxtApp.payload.data) {
    nuxtApp.payload.data[key] = void 0;
  }
  if (key in nuxtApp.payload._errors) {
    nuxtApp.payload._errors[key] = null;
  }
  if (nuxtApp._asyncData[key]) {
    nuxtApp._asyncData[key].data.value = void 0;
    nuxtApp._asyncData[key].error.value = null;
    nuxtApp._asyncData[key].pending.value = false;
    nuxtApp._asyncData[key].status.value = "idle";
  }
  if (key in nuxtApp._asyncDataPromises) {
    nuxtApp._asyncDataPromises[key].cancelled = true;
    nuxtApp._asyncDataPromises[key] = void 0;
  }
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => toValue(request));
  const _key = opts.key || hash([autoKey, typeof _request.value === "string" ? _request.value : "", ...generateOptionSegments(opts)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && (_request.value[0] === "/" && _request.value[1] === "/")) {
    throw new Error('[nuxt] [useFetch] the request URL must not start with "//".');
  }
  const {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    watch,
    immediate,
    getCachedData,
    deep,
    dedupe,
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
    ...fetchDefaults,
    ...fetchOptions,
    cache: typeof opts.cache === "boolean" ? void 0 : opts.cache
  });
  const _asyncDataOptions = {
    server,
    lazy,
    default: defaultFn,
    transform,
    pick: pick2,
    immediate,
    getCachedData,
    deep,
    dedupe,
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a;
    (_a = controller == null ? void 0 : controller.abort) == null ? void 0 : _a.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const timeoutLength = toValue(opts.timeout);
    if (timeoutLength) {
      setTimeout(() => controller.abort(), timeoutLength);
    }
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch) {
      const isLocalFetch = typeof _request.value === "string" && _request.value[0] === "/" && (!toValue(opts.baseURL) || toValue(opts.baseURL)[0] === "/");
      if (isLocalFetch) {
        _$fetch = useRequestFetch();
      }
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
}
function generateOptionSegments(opts) {
  var _a;
  const segments = [
    ((_a = toValue(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET",
    toValue(opts.baseURL)
  ];
  for (const _obj of [opts.params || opts.query]) {
    const obj = toValue(_obj);
    if (!obj) {
      continue;
    }
    const unwrapped = {};
    for (const [key, value] of Object.entries(obj)) {
      unwrapped[toValue(key)] = toValue(value);
    }
    segments.push(unwrapped);
  }
  return segments;
}
const _sfc_main$1 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "lds-ripple" }, _attrs))} data-v-aa6ba8e6><div data-v-aa6ba8e6></div><div data-v-aa6ba8e6></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/Buttons/Preloader.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const Preloader = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-aa6ba8e6"]]);
const baseApiUrl = "https://api.wineater.com/";
async function fetchRecommendations(dish, store) {
  console.log(dish, store);
  try {
    const response = await useFetch(`${baseApiUrl}dish/recommendations`, {
      method: "POST",
      body: {
        text: dish,
        store
      }
    }, "$zVUsFkll1w");
    return response.data;
  } catch (error) {
    console.error("Error fetching data from API:", error);
    throw error;
  }
}
const _sfc_main = {
  components: { Preloader, Button, Header },
  data() {
    return {
      selectedLanguage: this.$i18n.locale,
      supportedLocales: this.$i18n.locales,
      searchQuery: "",
      results: [],
      loading: false
    };
  },
  created() {
  },
  methods: {
    searchChange(event) {
      this.searchQuery = event.target.value;
    },
    openLink(link) {
      (void 0).open(link, "_blank");
    },
    async handleInput() {
      if (!this.loading) {
        this.loading = true;
        try {
          const store = this.$route.query["store"];
          const apiData = await fetchRecommendations(this.searchQuery, store);
          this.results = apiData;
          this.loading = false;
        } catch (error) {
          console.error("Error in handleInput:", error);
        }
      }
    },
    clearResults() {
      this.results = [];
    }
  },
  mounted() {
    setTimeout(() => {
      this.$refs.searchInput.focus();
    }, 100);
  }
};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  const _component_Header = resolveComponent("Header");
  const _component_Button = resolveComponent("Button");
  const _component_Preloader = resolveComponent("Preloader");
  _push(`<!--[-->`);
  _push(ssrRenderComponent(_component_Header, { "show-links": false }, null, _parent));
  _push(`<div class="playground"><h2 class="h2 playground__title">${ssrInterpolate(_ctx.$t("playground.WineaterFind"))} <span class="playground__title-circle">${_ctx.$t("playground.perfectWine") + "<br/>"}</span> ${ssrInterpolate(_ctx.$t("playground.forYour"))} <span class="playground__title-underline">${_ctx.$t("playground.perfectDinner")}</span></h2><p class="p1 playground__description">${ssrInterpolate(_ctx.$t("playground.BeSureToProvideDetails"))}</p><div class="playground__input"><div class="playground__input-icon"></div><input type="text"${ssrRenderAttr("placeholder", _ctx.$t("playground.WhatDoYouWannaEat"))}>`);
  _push(ssrRenderComponent(_component_Button, {
    onClick: $options.handleInput,
    disabled: !$data.searchQuery,
    class: "playground__input-btn"
  }, {
    default: withCtx((_, _push2, _parent2, _scopeId) => {
      if (_push2) {
        _push2(`${ssrInterpolate(_ctx.$t("playground.FindAMatch"))}`);
      } else {
        return [
          createTextVNode(toDisplayString(_ctx.$t("playground.FindAMatch")), 1)
        ];
      }
    }),
    _: 1
  }, _parent));
  _push(`<div class="playground__input-btn--mobile"><div class="playground__input-btn-icon"></div></div></div>`);
  if ($data.loading) {
    _push(ssrRenderComponent(_component_Preloader, null, null, _parent));
  } else {
    _push(`<!---->`);
  }
  if ($data.results.length && !$data.loading) {
    _push(`<div class="playground__cards"><!--[-->`);
    ssrRenderList($data.results.slice(0, 3), (card, cardIndex) => {
      _push(`<div class="playground__card-wrapper"><div class="playground__card"><div class="playground__card-title h3">${ssrInterpolate(card.Title)}</div><div class="playground__card-info"><div class="playground__card-info-header"><p class="p1">${ssrInterpolate(_ctx.$t("playground.Region"))}</p><p class="p2">${ssrInterpolate(card.Region)}</p></div><div class="playground__card-info-grape"><p class="p1">${ssrInterpolate(_ctx.$t("playground.Grape"))}</p><p class="p2"><!--[-->`);
      ssrRenderList(card.Grape.split(","), (grape) => {
        _push(`<p>${ssrInterpolate(grape)}</p>`);
      });
      _push(`<!--]--></p></div><div class="playground__card-img" style="${ssrRenderStyle({ "background-image": "url(" + card.Image + ")" })}"></div>`);
      _push(ssrRenderComponent(_component_Button, {
        onClick: ($event) => $options.openLink(card.Url),
        class: "playground__card-btn"
      }, {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`${ssrInterpolate(_ctx.$t("playground.Buy"))}`);
          } else {
            return [
              createTextVNode(toDisplayString(_ctx.$t("playground.Buy")), 1)
            ];
          }
        }),
        _: 2
      }, _parent));
      _push(`</div></div></div>`);
    });
    _push(`<!--]--></div>`);
  } else {
    _push(`<!---->`);
  }
  _push(`</div><!--]-->`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/playground.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const playground = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);

export { playground as default };
//# sourceMappingURL=playground-BnlgXzeF.mjs.map
