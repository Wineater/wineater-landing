<template>
  <div class="blog-page">
    <Header :show-links="true"/>
    
    <main class="blog-main">
      <section class="blog-hero">
        <h1>Wine Technology Blog - AI Sommelier Insights</h1>
        <p>Discover the latest trends in wine technology, AI-powered recommendations, and digital sommelier innovations</p>
      </section>

      <section class="blog-content">
        <article class="blog-post" v-for="(post, index) in blogPosts" :key="index">
          <div class="post-meta">
            <time :datetime="post.date">{{ formatDate(post.date) }}</time>
            <span class="post-category">{{ post.category }}</span>
          </div>
          <h2><a :href="post.slug">{{ post.title }}</a></h2>
          <p class="post-excerpt">{{ post.excerpt }}</p>
          <div class="post-tags">
            <span v-for="tag in post.tags" :key="tag" class="tag">{{ tag }}</span>
          </div>
        </article>
      </section>
    </main>

    <Footer/>
  </div>
</template>

<script setup>
import Header from "~/components/LandingComponents/Header.vue"
import Footer from "~/components/LandingComponents/Footer.vue"

// SEO Meta
useHead({
  title: 'Wine Technology Blog | AI Sommelier Insights & Wine Industry News',
  meta: [
    {
      name: 'description',
      content: 'Stay updated with the latest wine technology trends, AI sommelier innovations, and digital wine recommendations. Expert insights on wine pairing technology and restaurant solutions.'
    },
    {
      name: 'keywords',
      content: 'wine technology blog, AI sommelier news, wine industry trends, digital wine recommendations, wine pairing technology, restaurant wine solutions'
    }
  ]
})

// Blog posts data
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
]

// Format date for display
const formatDate = (dateString) => {
  const date = new Date(dateString)
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'long', 
    day: 'numeric' 
  })
}

// Add blog structured data
onMounted(() => {
  const blogData = {
    "@context": "https://schema.org",
    "@type": "Blog",
    "name": "Wineater Technology Blog",
    "description": "Latest insights on wine technology, AI sommelier innovations, and digital wine recommendations",
    "url": "https://wineater.com/blog",
    "publisher": {
      "@type": "Organization",
      "name": "Wineater",
      "url": "https://wineater.com",
      "logo": "https://czvgkhagwvmknscoerfy.supabase.co/storage/v1/object/public/static-media/logo.svg"
    },
    "blogPost": blogPosts.map(post => ({
      "@type": "BlogPosting",
      "headline": post.title,
      "description": post.excerpt,
      "datePublished": post.date,
      "author": {
        "@type": "Organization",
        "name": "Wineater Team"
      },
      "url": `https://wineater.com${post.slug}`,
      "keywords": post.tags.join(", ")
    }))
  }
  
  const { $seo } = useNuxtApp()
  if ($seo) {
    $seo.addStructuredData(blogData)
  }
})
</script>

<style scoped lang="scss">
.blog-page {
  min-height: 100vh;
  background: #fff;
}

.blog-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.blog-hero {
  text-align: center;
  margin-bottom: 60px;
  
  h1 {
    font-size: 2.5rem;
    color: #333;
    margin-bottom: 20px;
    font-weight: 700;
  }
  
  p {
    font-size: 1.2rem;
    color: #666;
    max-width: 600px;
    margin: 0 auto;
  }
}

.blog-content {
  display: grid;
  gap: 40px;
}

.blog-post {
  padding: 30px;
  background: #f9f9f9;
  border-radius: 8px;
  border-left: 4px solid #8B0000;
  transition: transform 0.2s ease, box-shadow 0.2s ease;
  
  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 4px 12px rgba(0,0,0,0.1);
  }
  
  .post-meta {
    display: flex;
    gap: 20px;
    margin-bottom: 15px;
    font-size: 0.9rem;
    color: #666;
    
    time {
      font-weight: 500;
    }
    
    .post-category {
      background: #8B0000;
      color: white;
      padding: 4px 12px;
      border-radius: 12px;
      font-size: 0.8rem;
    }
  }
  
  h2 {
    margin-bottom: 15px;
    
    a {
      color: #333;
      text-decoration: none;
      font-size: 1.5rem;
      font-weight: 600;
      
      &:hover {
        color: #8B0000;
      }
    }
  }
  
  .post-excerpt {
    color: #555;
    line-height: 1.6;
    margin-bottom: 20px;
  }
  
  .post-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 8px;
    
    .tag {
      background: #e9ecef;
      color: #495057;
      padding: 4px 8px;
      border-radius: 4px;
      font-size: 0.8rem;
    }
  }
}

@media (max-width: 768px) {
  .blog-main {
    padding: 40px 16px;
  }
  
  .blog-hero h1 {
    font-size: 2rem;
  }
  
  .blog-post {
    padding: 20px;
    
    h2 a {
      font-size: 1.3rem;
    }
  }
}
</style>
