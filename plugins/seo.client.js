// Simplified SEO Plugin to avoid server errors
export default defineNuxtPlugin(() => {
  // Only run on client side to avoid SSR issues
  if (process.client) {
    // Add basic structured data for the homepage
    const addBasicStructuredData = () => {
      const existing = document.getElementById('basic-structured-data')
      if (existing) return
      
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.id = 'basic-structured-data'
      script.textContent = JSON.stringify({
        "@context": "https://schema.org",
        "@type": "Organization",
        "name": "Wineater",
        "url": "https://wineater.com",
        "description": "AI-powered wine and food pairing technology for restaurants and wine retailers"
      })
      document.head.appendChild(script)
    }
    
    // Add structured data after page load
    setTimeout(addBasicStructuredData, 100)
  }
})
