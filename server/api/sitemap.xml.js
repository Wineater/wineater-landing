export default defineEventHandler(async (event) => {
  const baseUrl = 'https://wineater.com'
  
  // Define all pages with their SEO data
  const pages = [
    {
      url: '/',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 1.0,
      title: 'Wineater - AI Sommelier for Perfect Wine & Food Pairings',
      description: 'AI-powered wine and food pairing technology for restaurants and wine retailers. Boost sales with our digital sommelier that helps customers find perfect wine matches.'
    },
    {
      url: '/fr',
      lastmod: new Date().toISOString(),
      changefreq: 'weekly',
      priority: 0.9,
      title: 'Wineater - Sommelier IA pour les Accords Mets et Vins Parfaits',
      description: 'Technologie IA d\'accords mets et vins pour restaurants et détaillants de vin. Boostez vos ventes avec notre sommelier numérique qui aide les clients à trouver les vins parfaits.'
    },
    {
      url: '/demo',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.8,
      title: 'Wineater Demo - Try Our AI Sommelier',
      description: 'Experience Wineater\'s AI-powered wine pairing technology. Try our digital sommelier and see how it can boost your wine sales.'
    },
    {
      url: '/playground',
      lastmod: new Date().toISOString(),
      changefreq: 'monthly',
      priority: 0.7,
      title: 'Wineater Playground - Test Wine Pairing AI',
      description: 'Test and explore Wineater\'s AI wine pairing capabilities. Perfect for restaurants and wine retailers to experience the technology.'
    }
  ]

  // Generate XML sitemap
  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:image="http://www.google.com/schemas/sitemap-image/1.1"
        xmlns:news="http://www.google.com/schemas/sitemap-news/0.9">
${pages.map(page => `  <url>
    <loc>${baseUrl}${page.url}</loc>
    <lastmod>${page.lastmod}</lastmod>
    <changefreq>${page.changefreq}</changefreq>
    <priority>${page.priority}</priority>
    <image:image>
      <image:loc>https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png</image:loc>
      <image:title>${page.title}</image:title>
      <image:caption>${page.description}</image:caption>
    </image:image>
  </url>`).join('\n')}
</urlset>`

  // Set proper headers
  setHeader(event, 'Content-Type', 'application/xml')
  setHeader(event, 'Cache-Control', 'public, max-age=86400') // Cache for 24 hours
  
  return sitemap
})
