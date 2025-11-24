import { d as defineEventHandler, s as setHeader } from '../../runtime.mjs';
import 'node:http';
import 'node:https';
import 'fs';
import 'path';
import 'vue';
import 'consola/core';
import 'node:fs';
import 'node:url';

const sitemap_xml = defineEventHandler(async (event) => {
  const baseUrl = "https://wineater.com";
  const pages = [
    {
      url: "/",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "weekly",
      priority: 1,
      title: "Wineater - AI Sommelier for Perfect Wine & Food Pairings",
      description: "AI-powered wine and food pairing technology for restaurants and wine retailers. Boost sales with our digital sommelier that helps customers find perfect wine matches."
    },
    {
      url: "/fr",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "weekly",
      priority: 0.9,
      title: "Wineater - Sommelier IA pour les Accords Mets et Vins Parfaits",
      description: "Technologie IA d'accords mets et vins pour restaurants et d\xE9taillants de vin. Boostez vos ventes avec notre sommelier num\xE9rique qui aide les clients \xE0 trouver les vins parfaits."
    },
    {
      url: "/demo",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "monthly",
      priority: 0.8,
      title: "Wineater Demo - Try Our AI Sommelier",
      description: "Experience Wineater's AI-powered wine pairing technology. Try our digital sommelier and see how it can boost your wine sales."
    },
    {
      url: "/playground",
      lastmod: (/* @__PURE__ */ new Date()).toISOString(),
      changefreq: "monthly",
      priority: 0.7,
      title: "Wineater Playground - Test Wine Pairing AI",
      description: "Test and explore Wineater's AI wine pairing capabilities. Perfect for restaurants and wine retailers to experience the technology."
    }
  ];
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages.map((page) => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png</image:loc>
      <image:title>${page.title}</image:title>
      <image:caption>${page.description}</image:caption>
    </image:image>
  </url>`).join("\n")}
</urlset>`;
  setHeader(event, "Content-Type", "application/xml");
  setHeader(event, "Cache-Control", "public, max-age=86400");
  return sitemap;
});

export { sitemap_xml as default };
//# sourceMappingURL=sitemap.xml.mjs.map
