<template>
  <div class="faq-page">
    <Header :show-links="true"/>
    
    <main class="faq-main">
      <section class="faq-hero">
        <h1>Frequently Asked Questions - Wineater AI Sommelier</h1>
        <p>Everything you need to know about our AI-powered wine pairing technology</p>
      </section>

      <section class="faq-content">
        <div class="faq-item" v-for="(faq, index) in faqs" :key="index">
          <h2>{{ faq.question }}</h2>
          <div class="faq-answer">
            <p v-for="(paragraph, pIndex) in faq.answer" :key="pIndex">{{ paragraph }}</p>
          </div>
        </div>
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
  title: 'FAQ - Wineater AI Sommelier | Wine Pairing Technology',
  meta: [
    {
      name: 'description',
      content: 'Frequently asked questions about Wineater AI sommelier technology. Learn how our wine pairing AI works, pricing, integration, and more.'
    },
    {
      name: 'keywords',
      content: 'wine AI FAQ, sommelier AI questions, wine pairing technology FAQ, digital sommelier help, wine recommendation AI'
    }
  ]
})

// FAQ Data with structured data
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
      "Yes! Wineater excels at complex requests. For example, it can recommend a refreshing white from Languedoc for a heatwave day, or a Crémant de Loire for a first meeting between students.",
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
]

// Add FAQ structured data
onMounted(() => {
  const { $seo } = useNuxtApp()
  if ($seo) {
    $seo.addFAQData(faqs)
  }
})
</script>

<style scoped lang="scss">
.faq-page {
  min-height: 100vh;
  background: #fff;
}

.faq-main {
  max-width: 1200px;
  margin: 0 auto;
  padding: 80px 20px;
}

.faq-hero {
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

.faq-content {
  .faq-item {
    margin-bottom: 40px;
    padding: 30px;
    background: #f9f9f9;
    border-radius: 8px;
    border-left: 4px solid #8B0000;
    
    h2 {
      font-size: 1.5rem;
      color: #333;
      margin-bottom: 20px;
      font-weight: 600;
    }
    
    .faq-answer {
      p {
        font-size: 1rem;
        line-height: 1.6;
        color: #555;
        margin-bottom: 15px;
        
        &:last-child {
          margin-bottom: 0;
        }
      }
    }
  }
}

@media (max-width: 768px) {
  .faq-main {
    padding: 40px 16px;
  }
  
  .faq-hero h1 {
    font-size: 2rem;
  }
  
  .faq-content .faq-item {
    padding: 20px;
    
    h2 {
      font-size: 1.3rem;
    }
  }
}
</style>
