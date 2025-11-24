import { _ as _export_sfc, u as useHead } from './server.mjs';
import { mergeProps, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrInterpolate } from 'vue/server-renderer';
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
  __name: "faq",
  __ssrInlineRender: true,
  setup(__props) {
    useHead({
      title: "FAQ - Wineater AI Sommelier | Wine Pairing Technology",
      meta: [
        {
          name: "description",
          content: "Frequently asked questions about Wineater AI sommelier technology. Learn how our wine pairing AI works, pricing, integration, and more."
        },
        {
          name: "keywords",
          content: "wine AI FAQ, sommelier AI questions, wine pairing technology FAQ, digital sommelier help, wine recommendation AI"
        }
      ]
    });
    const faqs = [
      {
        question: "What is Wineater and how does it work?",
        answer: [
          "Wineater is an AI-powered digital sommelier that helps restaurants and wine retailers boost sales by providing perfect wine and food pairings to customers.",
          "Our technology combines sommelier expertise, machine learning, and consumer behavior analysis to recommend wines that match customer preferences and meal choices.",
          "Simply integrate our widget into your website, and customers can describe their meal or occasion to get personalized wine recommendations from your inventory."
        ]
      },
      {
        question: "How accurate are Wineater's wine recommendations?",
        answer: [
          "Wineater's recommendations are based on extensive sommelier expertise, hundreds of wine books, and advanced machine learning algorithms.",
          "Our AI analyzes consumer trends, wine characteristics, and food pairing principles to provide highly accurate suggestions.",
          "The system continuously learns from user behavior to improve recommendation quality over time."
        ]
      },
      {
        question: "Can Wineater handle complex wine pairing requests?",
        answer: [
          "Yes! Wineater excels at complex requests. For example, it can recommend a refreshing white from Languedoc for a heatwave day, or a Cr\xE9mant de Loire for a first meeting between students.",
          "The AI can suggest sophisticated pairings like Chablis Grand Cru Valmur with lobster, demonstrating its ability to handle nuanced wine and food combinations.",
          "Our technology goes beyond simple pairings to consider mood, occasion, budget, and personal preferences."
        ]
      },
      {
        question: "How do I integrate Wineater into my website?",
        answer: [
          "Integration is simple and requires minimal technical knowledge. We provide a widget that can be easily embedded into your existing e-commerce platform.",
          "Our team offers full integration support and can work with your development team to ensure seamless implementation.",
          "The widget works with most major e-commerce platforms and can be customized to match your brand's design."
        ]
      },
      {
        question: "What types of businesses can benefit from Wineater?",
        answer: [
          "Wine retailers and online wine stores can significantly boost sales by helping customers make confident wine choices.",
          "Restaurants can improve their wine sales by offering personalized recommendations that complement their menu items.",
          "Wine distributors and wholesalers can use our technology to help their clients make better purchasing decisions."
        ]
      },
      {
        question: "Is Wineater associated with Bernard Magrez?",
        answer: [
          "Yes, Wineater is part of the Bernard Magrez Start-Up Win ecosystem, benefiting from the expertise and reputation of one of the wine industry's most respected figures.",
          "Bernard Magrez, at 88 years old, continues to innovate in the wine industry, and Wineater represents his vision for the future of wine technology.",
          "This association brings decades of wine expertise and industry credibility to our AI technology."
        ]
      },
      {
        question: "How does Wineater compare to other wine recommendation apps?",
        answer: [
          "Wineater stands out through its advanced AI technology that combines sommelier expertise with machine learning.",
          "Unlike basic recommendation apps, Wineater explores consumer trends, analyzes extensive wine databases, and provides sophisticated pairing suggestions.",
          "Our technology is specifically designed for business use, helping retailers and restaurants increase sales rather than just providing consumer recommendations."
        ]
      },
      {
        question: "What is the pricing for Wineater?",
        answer: [
          "We offer flexible pricing plans tailored to your business size and needs. Contact us for a personalized quote.",
          "We provide free trials so you can experience the technology before committing to a plan.",
          "Our pricing is designed to provide a strong ROI through increased wine sales and customer satisfaction."
        ]
      }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "faq-page" }, _attrs))} data-v-5c6f5d2a>`);
      _push(ssrRenderComponent(Header, { "show-links": true }, null, _parent));
      _push(`<main class="faq-main" data-v-5c6f5d2a><section class="faq-hero" data-v-5c6f5d2a><h1 data-v-5c6f5d2a>Frequently Asked Questions - Wineater AI Sommelier</h1><p data-v-5c6f5d2a>Everything you need to know about our AI-powered wine pairing technology</p></section><section class="faq-content" data-v-5c6f5d2a><!--[-->`);
      ssrRenderList(faqs, (faq2, index) => {
        _push(`<div class="faq-item" data-v-5c6f5d2a><h2 data-v-5c6f5d2a>${ssrInterpolate(faq2.question)}</h2><div class="faq-answer" data-v-5c6f5d2a><!--[-->`);
        ssrRenderList(faq2.answer, (paragraph, pIndex) => {
          _push(`<p data-v-5c6f5d2a>${ssrInterpolate(paragraph)}</p>`);
        });
        _push(`<!--]--></div></div>`);
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/faq.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const faq = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-5c6f5d2a"]]);

export { faq as default };
//# sourceMappingURL=faq-BYMHeRlV.mjs.map
