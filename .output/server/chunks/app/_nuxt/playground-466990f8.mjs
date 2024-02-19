import { B as Button, H as Header } from './Header-45297ae1.mjs';
import { useSSRContext, resolveComponent, withCtx, createTextVNode, toDisplayString, computed, unref, reactive, mergeProps, ref, toRef, getCurrentInstance, onServerPrefetch } from 'vue';
import { ssrRenderComponent, ssrInterpolate, ssrRenderAttr, ssrRenderList, ssrRenderStyle, ssrRenderAttrs } from 'vue/server-renderer';
import { _ as _export_sfc, b as useRequestFetch, a as useNuxtApp, c as createError } from '../server.mjs';
import { B as hash } from '../../nitro/node-server.mjs';
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

const getDefault = () => null;
function useAsyncData(...args) {
  var _a, _b, _c, _d, _e;
  const autoKey = typeof args[args.length - 1] === "string" ? args.pop() : void 0;
  if (typeof args[0] !== "string") {
    args.unshift(autoKey);
  }
  let [key, handler, options = {}] = args;
  if (typeof key !== "string") {
    throw new TypeError("[nuxt] [asyncData] key must be a string.");
  }
  if (typeof handler !== "function") {
    throw new TypeError("[nuxt] [asyncData] handler must be a function.");
  }
  options.server = (_a = options.server) != null ? _a : true;
  options.default = (_b = options.default) != null ? _b : getDefault;
  options.lazy = (_c = options.lazy) != null ? _c : false;
  options.immediate = (_d = options.immediate) != null ? _d : true;
  const nuxt = useNuxtApp();
  const getCachedData = () => nuxt.isHydrating ? nuxt.payload.data[key] : nuxt.static.data[key];
  const hasCachedData = () => getCachedData() !== void 0;
  if (!nuxt._asyncData[key] || !options.immediate) {
    nuxt._asyncData[key] = {
      data: ref((_e = getCachedData()) != null ? _e : options.default()),
      pending: ref(!hasCachedData()),
      error: toRef(nuxt.payload._errors, key),
      status: ref("idle")
    };
  }
  const asyncData = { ...nuxt._asyncData[key] };
  asyncData.refresh = asyncData.execute = (opts = {}) => {
    if (nuxt._asyncDataPromises[key]) {
      if (opts.dedupe === false) {
        return nuxt._asyncDataPromises[key];
      }
      nuxt._asyncDataPromises[key].cancelled = true;
    }
    if ((opts._initial || nuxt.isHydrating && opts._initial !== false) && hasCachedData()) {
      return getCachedData();
    }
    asyncData.pending.value = true;
    asyncData.status.value = "pending";
    const promise = new Promise(
      (resolve, reject) => {
        try {
          resolve(handler(nuxt));
        } catch (err) {
          reject(err);
        }
      }
    ).then((_result) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      let result = _result;
      if (options.transform) {
        result = options.transform(_result);
      }
      if (options.pick) {
        result = pick(result, options.pick);
      }
      asyncData.data.value = result;
      asyncData.error.value = null;
      asyncData.status.value = "success";
    }).catch((error) => {
      if (promise.cancelled) {
        return nuxt._asyncDataPromises[key];
      }
      asyncData.error.value = error;
      asyncData.data.value = unref(options.default());
      asyncData.status.value = "error";
    }).finally(() => {
      if (promise.cancelled) {
        return;
      }
      asyncData.pending.value = false;
      nuxt.payload.data[key] = asyncData.data.value;
      if (asyncData.error.value) {
        nuxt.payload._errors[key] = createError(asyncData.error.value);
      }
      delete nuxt._asyncDataPromises[key];
    });
    nuxt._asyncDataPromises[key] = promise;
    return nuxt._asyncDataPromises[key];
  };
  const initialFetch = () => asyncData.refresh({ _initial: true });
  const fetchOnServer = options.server !== false && nuxt.payload.serverRendered;
  if (fetchOnServer && options.immediate) {
    const promise = initialFetch();
    if (getCurrentInstance()) {
      onServerPrefetch(() => promise);
    } else {
      nuxt.hook("app:created", () => promise);
    }
  }
  const asyncDataPromise = Promise.resolve(nuxt._asyncDataPromises[key]).then(() => asyncData);
  Object.assign(asyncDataPromise, asyncData);
  return asyncDataPromise;
}
function pick(obj, keys) {
  const newObj = {};
  for (const key of keys) {
    newObj[key] = obj[key];
  }
  return newObj;
}
function useFetch(request, arg1, arg2) {
  var _a;
  const [opts = {}, autoKey] = typeof arg1 === "string" ? [{}, arg1] : [arg1, arg2];
  const _request = computed(() => {
    let r = request;
    if (typeof r === "function") {
      r = r();
    }
    return unref(r);
  });
  const _key = opts.key || hash([autoKey, ((_a = unref(opts.method)) == null ? void 0 : _a.toUpperCase()) || "GET", unref(opts.baseURL), typeof _request.value === "string" ? _request.value : "", unref(opts.params || opts.query)]);
  if (!_key || typeof _key !== "string") {
    throw new TypeError("[nuxt] [useFetch] key must be a string: " + _key);
  }
  if (!request) {
    throw new Error("[nuxt] [useFetch] request is missing.");
  }
  const key = _key === autoKey ? "$f" + _key : _key;
  if (!opts.baseURL && typeof _request.value === "string" && _request.value.startsWith("//")) {
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
    ...fetchOptions
  } = opts;
  const _fetchOptions = reactive({
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
    watch: watch === false ? [] : [_fetchOptions, _request, ...watch || []]
  };
  let controller;
  const asyncData = useAsyncData(key, () => {
    var _a2;
    (_a2 = controller == null ? void 0 : controller.abort) == null ? void 0 : _a2.call(controller);
    controller = typeof AbortController !== "undefined" ? new AbortController() : {};
    const isLocalFetch = typeof _request.value === "string" && _request.value.startsWith("/");
    let _$fetch = opts.$fetch || globalThis.$fetch;
    if (!opts.$fetch && isLocalFetch) {
      _$fetch = useRequestFetch();
    }
    return _$fetch(_request.value, { signal: controller.signal, ..._fetchOptions });
  }, _asyncDataOptions);
  return asyncData;
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
      window.open(link, "_blank");
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
//# sourceMappingURL=playground-466990f8.mjs.map
