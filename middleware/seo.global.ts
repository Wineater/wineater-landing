// Global SEO middleware for technical SEO optimizations
export default defineNuxtRouteMiddleware((to) => {
  // Set canonical URL
  const baseUrl = 'https://wineater.com'
  const canonicalUrl = `${baseUrl}${to.path}`
  
  // Set hreflang for internationalization
  const hreflangTags = [
    { hreflang: 'en', href: `${baseUrl}${to.path}` },
    { hreflang: 'fr', href: `${baseUrl}/fr${to.path}` },
    { hreflang: 'x-default', href: `${baseUrl}${to.path}` }
  ]
  
  // Add technical SEO meta tags
  useHead({
    link: [
      { rel: 'canonical', href: canonicalUrl },
      ...hreflangTags.map(tag => ({ rel: 'alternate', hreflang: tag.hreflang, href: tag.href }))
    ],
    meta: [
      // Prevent indexing of admin and API routes
      ...(to.path.startsWith('/admin') || to.path.startsWith('/api') ? [
        { name: 'robots', content: 'noindex, nofollow' }
      ] : [
        { name: 'robots', content: 'index, follow, max-image-preview:large, max-snippet:-1, max-video-preview:-1' }
      ]),
      
      // Additional technical SEO
      { name: 'referrer', content: 'strict-origin-when-cross-origin' },
      { name: 'format-detection', content: 'telephone=no' },
      { name: 'theme-color', content: '#8B0000' },
      { name: 'msapplication-TileColor', content: '#8B0000' },
      { name: 'msapplication-config', content: '/browserconfig.xml' }
    ]
  })
  
  // Add page-specific structured data
  if (process.client) {
    const { $seo } = useNuxtApp()
    if ($seo) {
      // Add breadcrumb data for all pages
      const breadcrumbs = generateBreadcrumbs(to.path)
      $seo.addBreadcrumbData(breadcrumbs)
      
      // Add page-specific structured data
      addPageSpecificStructuredData(to.path, $seo)
    }
  }
})

// Generate breadcrumbs based on current path
function generateBreadcrumbs(path: string) {
  const segments = path.split('/').filter(Boolean)
  const breadcrumbs = [
    { name: 'Home', url: 'https://wineater.com' }
  ]
  
  let currentPath = ''
  segments.forEach((segment, index) => {
    currentPath += `/${segment}`
    const name = segment.charAt(0).toUpperCase() + segment.slice(1).replace(/-/g, ' ')
    breadcrumbs.push({
      name: name,
      url: `https://wineater.com${currentPath}`
    })
  })
  
  return breadcrumbs
}

// Add page-specific structured data
function addPageSpecificStructuredData(path: string, seo: any) {
  const baseUrl = 'https://wineater.com'
  
  switch (path) {
    case '/':
      // Homepage structured data
      seo.addStructuredData({
        "@context": "https://schema.org",
        "@type": "WebSite",
        "name": "Wineater",
        "url": baseUrl,
        "description": "AI-powered wine and food pairing technology for restaurants and wine retailers",
        "potentialAction": {
          "@type": "SearchAction",
          "target": `${baseUrl}/search?q={search_term_string}`,
          "query-input": "required name=search_term_string"
        }
      })
      break
      
    case '/demo':
      // Demo page structured data
      seo.addStructuredData({
        "@context": "https://schema.org",
        "@type": "SoftwareApplication",
        "name": "Wineater Demo",
        "description": "Try Wineater's AI sommelier technology",
        "url": `${baseUrl}/demo`,
        "applicationCategory": "BusinessApplication",
        "operatingSystem": "Web"
      })
      break
      
    case '/playground':
      // Playground structured data
      seo.addStructuredData({
        "@context": "https://schema.org",
        "@type": "WebPage",
        "name": "Wineater Playground",
        "description": "Test and explore Wineater's AI wine pairing capabilities",
        "url": `${baseUrl}/playground`
      })
      break
      
    case '/faq':
      // FAQ page structured data is handled in the page component
      break
      
    case '/blog':
      // Blog structured data is handled in the page component
      break
  }
}
