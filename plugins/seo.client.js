// SEO Plugin for dynamic meta tag management
export default defineNuxtPlugin(() => {
  // Function to update meta tags dynamically
  const updateSEOMeta = (options = {}) => {
    const {
      title = 'Wineater - AI Sommelier for Perfect Wine & Food Pairings',
      description = 'AI-powered wine and food pairing technology for restaurants and wine retailers. Boost sales with our digital sommelier that helps customers find perfect wine matches.',
      keywords = 'wine pairing, food pairing, AI sommelier, wine technology, restaurant technology, wine retail, digital sommelier, wine recommendations, food and wine matching, wine sales, restaurant solutions',
      image = 'https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/Wineater-social_preview.png',
      url = 'https://wineater.com',
      type = 'website'
    } = options

    // Update document title
    if (process.client) {
      document.title = title
      
      // Update meta description
      let metaDesc = document.querySelector('meta[name="description"]')
      if (metaDesc) {
        metaDesc.setAttribute('content', description)
      } else {
        metaDesc = document.createElement('meta')
        metaDesc.setAttribute('name', 'description')
        metaDesc.setAttribute('content', description)
        document.head.appendChild(metaDesc)
      }

      // Update meta keywords
      let metaKeywords = document.querySelector('meta[name="keywords"]')
      if (metaKeywords) {
        metaKeywords.setAttribute('content', keywords)
      } else {
        metaKeywords = document.createElement('meta')
        metaKeywords.setAttribute('name', 'keywords')
        metaKeywords.setAttribute('content', keywords)
        document.head.appendChild(metaKeywords)
      }

      // Update Open Graph tags
      const ogTags = [
        { property: 'og:title', content: title },
        { property: 'og:description', content: description },
        { property: 'og:image', content: image },
        { property: 'og:url', content: url },
        { property: 'og:type', content: type }
      ]

      ogTags.forEach(tag => {
        let ogTag = document.querySelector(`meta[property="${tag.property}"]`)
        if (ogTag) {
          ogTag.setAttribute('content', tag.content)
        } else {
          ogTag = document.createElement('meta')
          ogTag.setAttribute('property', tag.property)
          ogTag.setAttribute('content', tag.content)
          document.head.appendChild(ogTag)
        }
      })

      // Update Twitter Card tags
      const twitterTags = [
        { name: 'twitter:title', content: title },
        { name: 'twitter:description', content: description },
        { name: 'twitter:image', content: image }
      ]

      twitterTags.forEach(tag => {
        let twitterTag = document.querySelector(`meta[name="${tag.name}"]`)
        if (twitterTag) {
          twitterTag.setAttribute('content', tag.content)
        } else {
          twitterTag = document.createElement('meta')
          twitterTag.setAttribute('name', tag.name)
          twitterTag.setAttribute('content', tag.content)
          document.head.appendChild(twitterTag)
        }
      })
    }
  }

  // Function to add structured data
  const addStructuredData = (data) => {
    if (process.client) {
      const script = document.createElement('script')
      script.type = 'application/ld+json'
      script.textContent = JSON.stringify(data)
      script.id = 'dynamic-structured-data'
      
      // Remove existing dynamic structured data
      const existing = document.getElementById('dynamic-structured-data')
      if (existing) {
        existing.remove()
      }
      
      document.head.appendChild(script)
    }
  }

  // Function to track page views for SEO
  const trackPageView = (pageName) => {
    if (process.client && window.gtag) {
      window.gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_name: pageName
      })
    }
  }

  // Function to add breadcrumb structured data
  const addBreadcrumbData = (breadcrumbs) => {
    const breadcrumbData = {
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      "itemListElement": breadcrumbs.map((item, index) => ({
        "@type": "ListItem",
        "position": index + 1,
        "name": item.name,
        "item": item.url
      }))
    }
    addStructuredData(breadcrumbData)
  }

  // Function to add FAQ structured data
  const addFAQData = (faqs) => {
    const faqData = {
      "@context": "https://schema.org",
      "@type": "FAQPage",
      "mainEntity": faqs.map(faq => ({
        "@type": "Question",
        "name": faq.question,
        "acceptedAnswer": {
          "@type": "Answer",
          "text": faq.answer
        }
      }))
    }
    addStructuredData(faqData)
  }

  // Function to add product structured data
  const addProductData = (product) => {
    const productData = {
      "@context": "https://schema.org",
      "@type": "SoftwareApplication",
      "name": product.name,
      "description": product.description,
      "url": product.url,
      "applicationCategory": "BusinessApplication",
      "operatingSystem": "Web",
      "offers": {
        "@type": "Offer",
        "price": product.price || "0",
        "priceCurrency": product.currency || "EUR"
      },
      "aggregateRating": product.rating ? {
        "@type": "AggregateRating",
        "ratingValue": product.rating.value,
        "ratingCount": product.rating.count
      } : undefined
    }
    addStructuredData(productData)
  }

  // Provide SEO utilities to the app
  return {
    provide: {
      seo: {
        updateMeta: updateSEOMeta,
        addStructuredData,
        trackPageView,
        addBreadcrumbData,
        addFAQData,
        addProductData
      }
    }
  }
})
