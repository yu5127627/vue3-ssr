"use strict";
Object.defineProperties(exports, { __esModule: { value: true }, [Symbol.toStringTag]: { value: "Module" } });
var node_path = require("node:path");
var serverRenderer = require("vue/server-renderer");
var vue = require("vue");
var vueRouter = require("vue-router");
var pinia = require("pinia");
var axios = require("axios");
function _interopDefaultLegacy(e) {
  return e && typeof e === "object" && "default" in e ? e : { "default": e };
}
var axios__default = /* @__PURE__ */ _interopDefaultLegacy(axios);
var App_vue_vue_type_style_index_0_lang = /* @__PURE__ */ (() => "\n* {\n  margin: 0;\n  padding: 0;\n}\n")();
var _export_sfc = (sfc, props) => {
  const target = sfc.__vccOpts || sfc;
  for (const [key, val] of props) {
    target[key] = val;
  }
  return target;
};
const _sfc_main$2 = {};
function _sfc_ssrRender$2(_ctx, _push, _parent, _attrs) {
  const _component_router_view = vue.resolveComponent("router-view");
  _push(serverRenderer.ssrRenderComponent(_component_router_view, _attrs, {
    default: vue.withCtx(({ Component }, _push2, _parent2, _scopeId) => {
      if (_push2) {
        serverRenderer.ssrRenderSuspense(_push2, {
          default: () => {
            _push2(`<div${_scopeId}>`);
            serverRenderer.ssrRenderVNode(_push2, vue.createVNode(vue.resolveDynamicComponent(Component), null, null), _parent2, _scopeId);
            _push2(`</div>`);
          },
          _: 2
        });
      } else {
        return [
          (vue.openBlock(), vue.createBlock(vue.Suspense, null, {
            default: vue.withCtx(() => [
              vue.createVNode("div", null, [
                (vue.openBlock(), vue.createBlock(vue.resolveDynamicComponent(Component)))
              ])
            ]),
            _: 2
          }, 1024))
        ];
      }
    }),
    _: 1
  }, _parent));
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/App.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
var App = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$2]]);
const pages = { "./pages/api.vue": () => Promise.resolve().then(function() {
  return api$1;
}), "./pages/home.vue": () => Promise.resolve().then(function() {
  return home$1;
}) };
const routes = Object.keys(pages).map((path) => {
  const name = path.match(/\.\/pages(.*)\.vue$/)[1].toLowerCase();
  return {
    path: name,
    component: pages[path]
  };
});
function createRouter() {
  return vueRouter.createRouter({
    history: vueRouter.createMemoryHistory("/ssr/"),
    routes
  });
}
const store = pinia.createPinia();
function setupStore(app) {
  app.use(store);
}
function createApp() {
  const app = vue.createSSRApp(App);
  const router = createRouter();
  setupStore(app);
  app.use(router);
  return { app, router, store };
}
async function render(url, manifest) {
  const { app, router, store: store2 } = createApp();
  router.push(url);
  await router.isReady();
  const ctx = {};
  const html = await serverRenderer.renderToString(app, ctx);
  const preloadLinks = renderPreloadLinks(ctx.modules, manifest);
  return [html, preloadLinks, store2];
}
function renderPreloadLinks(modules, manifest) {
  let links = "";
  const seen = /* @__PURE__ */ new Set();
  modules.forEach((id) => {
    const files = manifest[id];
    if (files) {
      files.forEach((file) => {
        if (!seen.has(file)) {
          seen.add(file);
          const filename = node_path.basename(file);
          if (manifest[filename]) {
            for (const depFile of manifest[filename]) {
              links += renderPreloadLink(depFile);
              seen.add(depFile);
            }
          }
          links += renderPreloadLink(file);
        }
      });
    }
  });
  return links;
}
function renderPreloadLink(file) {
  if (file.endsWith(".js")) {
    return `<link rel="modulepreload" crossorigin href="${file}">`;
  } else if (file.endsWith(".css")) {
    return `<link rel="stylesheet" href="${file}">`;
  } else if (file.endsWith(".woff")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff" crossorigin>`;
  } else if (file.endsWith(".woff2")) {
    return ` <link rel="preload" href="${file}" as="font" type="font/woff2" crossorigin>`;
  } else if (file.endsWith(".gif")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/gif">`;
  } else if (file.endsWith(".jpg") || file.endsWith(".jpeg")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/jpeg">`;
  } else if (file.endsWith(".png")) {
    return ` <link rel="preload" href="${file}" as="image" type="image/png">`;
  } else {
    return "";
  }
}
const useCacheStore = pinia.defineStore("cache", () => {
  let yiyan = vue.reactive({
    data: null
  });
  return {
    yiyan
  };
});
var api_vue_vue_type_style_index_0_scoped_true_lang = /* @__PURE__ */ (() => ".page[data-v-32c67814] {\n  background-color: antiquewhite;\n  padding: 20px 50px;\n}\n.page .h5[data-v-32c67814] {\n  font-size: 50px;\n  color: red;\n}\n")();
const _sfc_main$1 = vue.defineComponent({
  name: "Api",
  setup() {
    const cacheStore = useCacheStore();
    let yiyan = vue.reactive({
      data: {}
    });
    let count = vue.ref(0);
    vue.onServerPrefetch(async () => {
      const { data } = await axios__default["default"].get("https://v1.hitokoto.cn/");
      yiyan.data = data;
      cacheStore.yiyan.data = data;
    });
    vue.onMounted(() => {
      yiyan.data = cacheStore.yiyan.data;
    });
    const handleClick = () => {
      count.value += 1;
    };
    return {
      handleClick,
      yiyan,
      count
    };
  }
});
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(vue.mergeProps({ class: "page" }, _attrs))} data-v-32c67814><h1 data-v-32c67814>API</h1><h1 data-v-32c67814>\u6211\u662F\u670D\u52A1\u7AEF\u8D70\u63A5\u53E3\u7684\u6E32\u67D3\u9875\u9762</h1><div data-v-32c67814>${serverRenderer.ssrInterpolate(_ctx.yiyan.data)}</div><br data-v-32c67814><br data-v-32c67814><div data-v-32c67814><button data-v-32c67814>\u70B9\u51FB\u6D4B\u8BD5</button><h5 class="h5" data-v-32c67814>${serverRenderer.ssrInterpolate(_ctx.count)}</h5><strong style="${serverRenderer.ssrRenderStyle({ "color": "#999" })}" data-v-32c67814>\u56E0\u4E3A\u5728\u67D0\u4E9B\u60C5\u51B5\u4E0B\uFF0C\u6C34\u5408\u5F02\u5E38\u4F1A\u5F71\u54CD\u4E8B\u4EF6\u89E6\u53D1\u3002</strong></div></div>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/api.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
var api = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-32c67814"]]);
var api$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": api
}, Symbol.toStringTag, { value: "Module" }));
const _sfc_main = vue.defineComponent({
  name: "Welcome",
  setup() {
    return {};
  }
});
function _sfc_ssrRender(_ctx, _push, _parent, _attrs, $props, $setup, $data, $options) {
  _push(`<div${serverRenderer.ssrRenderAttrs(_attrs)}><h1>home</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1><h1>\u6211\u662F\u666E\u901A\u7684\u670D\u52A1\u7AEF\u6E32\u67D3\u9875\u9762</h1></div>`);
}
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = vue.useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("src/pages/home.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
var home = /* @__PURE__ */ _export_sfc(_sfc_main, [["ssrRender", _sfc_ssrRender]]);
var home$1 = /* @__PURE__ */ Object.freeze(/* @__PURE__ */ Object.defineProperty({
  __proto__: null,
  "default": home
}, Symbol.toStringTag, { value: "Module" }));
exports.render = render;
