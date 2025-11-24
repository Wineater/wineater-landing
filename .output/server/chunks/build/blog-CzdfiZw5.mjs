import { _ as _export_sfc, u as useHead } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderAttr, ssrInterpolate } from 'vue/server-renderer';
import { H as Header } from './Header-Cdjvx2Ao.mjs';
import { F as Footer } from './Footer-D4rw37_F.mjs';
import '../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'consola/core';
import 'node:fs';
import 'node:url';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'devalue';
import '@unhead/ssr';
import 'unhead';
import '@unhead/shared';
import 'vue-router';

const _sfc_main = {
  __name: "blog",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "Wine Technology Blog | AI Sommelier Insights & Wine Industry News",
      meta: [
        {
          name: "description",
          content: "Stay updated with the latest wine technology trends, AI sommelier innovations, and digital wine recommendations. Expert insights on wine pairing technology and restaurant solutions."
        },
        {
          name: "keywords",
          content: "wine technology blog, AI sommelier news, wine industry trends, digital wine recommendations, wine pairing technology, restaurant wine solutions"
        }
      ]
    });
    const blogPosts = [
      {
        title: "The Future of Wine Retail: How AI is Transforming Customer Experience",
        excerpt: "Discover how artificial intelligence is revolutionizing wine retail, from personalized recommendations to enhanced customer satisfaction. Learn about the latest trends in wine technology.",
        date: "2024-01-15",
        category: "Technology",
        tags: ["AI", "Wine Retail", "Customer Experience", "Technology"],
        slug: "/blog/future-wine-retail-ai-transformation"
      },
      {
        title: "Perfect Wine Pairings: The Science Behind AI Sommelier Recommendations",
        excerpt: "Explore the sophisticated algorithms that power our AI sommelier technology. Learn how machine learning combines with sommelier expertise to create perfect wine and food pairings.",
        date: "2024-01-10",
        category: "Wine Science",
        tags: ["Wine Pairing", "AI Technology", "Sommelier", "Machine Learning"],
        slug: "/blog/science-ai-sommelier-recommendations"
      },
      {
        title: "Bernard Magrez's Vision: Innovation in Wine Technology",
        excerpt: "At 88 years old, Bernard Magrez continues to shape the wine industry through innovative technology. Discover how his vision drives Wineater's AI sommelier development.",
        date: "2024-01-05",
        category: "Industry",
        tags: ["Bernard Magrez", "Innovation", "Wine Industry", "Leadership"],
        slug: "/blog/bernard-magrez-vision-wine-technology"
      },
      {
        title: "Restaurant Wine Sales: How Digital Sommeliers Boost Revenue",
        excerpt: "Learn how restaurants are using AI-powered wine recommendations to increase sales and improve customer satisfaction. Real case studies and implementation strategies.",
        date: "2023-12-28",
        category: "Business",
        tags: ["Restaurant Technology", "Wine Sales", "Revenue Growth", "Customer Satisfaction"],
        slug: "/blog/restaurant-wine-sales-digital-sommeliers"
      },
      {
        title: "Complex Wine Pairings: AI vs Traditional Sommelier Expertise",
        excerpt: "Can AI match the expertise of a traditional sommelier? We explore complex pairing scenarios and how our technology handles sophisticated wine and food combinations.",
        date: "2023-12-20",
        category: "Wine Science",
        tags: ["Wine Pairing", "AI vs Human", "Sommelier Expertise", "Complex Pairings"],
        slug: "/blog/complex-wine-pairings-ai-vs-sommelier"
      },
      {
        title: "E-commerce Integration: Seamlessly Adding AI Wine Recommendations",
        excerpt: "Step-by-step guide to integrating AI wine recommendations into your e-commerce platform. Technical implementation and best practices for wine retailers.",
        date: "2023-12-15",
        category: "Technical",
        tags: ["E-commerce", "Integration", "Technical Guide", "Wine Retail"],
        slug: "/blog/ecommerce-integration-ai-wine-recommendations"
      }
    ];
    const formatDate = (dateString) => {
      const date = new Date(dateString);
      return date.toLocaleDateString("en-US", {
        year: "numeric",
        month: "long",
        day: "numeric"
      });
    };
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "blog-page" }, _attrs))} data-v-59b7773a>`);
      _push(ssrRenderComponent(Header, { "show-links": true }, null, _parent));
      _push(`<main class="blog-main" data-v-59b7773a><section class="blog-hero" data-v-59b7773a><h1 data-v-59b7773a>Wine Technology Blog - AI Sommelier Insights</h1><p data-v-59b7773a>Discover the latest trends in wine technology, AI-powered recommendations, and digital sommelier innovations</p></section><section class="blog-content" data-v-59b7773a><!--[-->`);
      ssrRenderList(blogPosts, (post, index) => {
        _push(`<article class="blog-post" data-v-59b7773a><div class="post-meta" data-v-59b7773a><time${ssrRenderAttr("datetime", post.date)} data-v-59b7773a>${ssrInterpolate(formatDate(post.date))}</time><span class="post-category" data-v-59b7773a>${ssrInterpolate(post.category)}</span></div><h2 data-v-59b7773a><a${ssrRenderAttr("href", post.slug)} data-v-59b7773a>${ssrInterpolate(post.title)}</a></h2><p class="post-excerpt" data-v-59b7773a>${ssrInterpolate(post.excerpt)}</p><div class="post-tags" data-v-59b7773a><!--[-->`);
        ssrRenderList(post.tags, (tag) => {
          _push(`<span class="tag" data-v-59b7773a>${ssrInterpolate(tag)}</span>`);
        });
        _push(`<!--]--></div></article>`);
      });
      _push(`<!--]--></section></main>`);
      _push(ssrRenderComponent(Footer, null, null, _parent));
      _push(`</div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/blog.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const blog = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-59b7773a"]]);

export { blog as default };
//# sourceMappingURL=blog-CzdfiZw5.mjs.map
