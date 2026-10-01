// FAQ content (EN + FR). Single source for the /faq page, the FAQPage JSON-LD and the landing teaser.
// Every answer must be verifiable from the product docs/code; no prices, no statistics, no pilot figures.
// BUY click = click to a product page, never a sale or an order.
// Ids are identical in both locales and are public anchors (/faq#what-is-wineater): do not rename them.

import { pilotProof as p } from './proof'

export interface FaqLink {
  to: string
  hash?: string
  label: string
}

export interface FaqQuestion {
  id: string
  q: string
  a: string
  links?: FaqLink[]
}

export interface FaqCategory {
  id: string
  title: string
  items: FaqQuestion[]
}

export interface FaqContent {
  meta: { title: string, description: string }
  h1: string
  intro: string
  breadcrumbHome: string
  breadcrumbFaq: string
  categories: FaqCategory[]
}

// ISO date shown as "Last updated" and used as dateModified in JSON-LD. Bump when answers change.
export const faqLastUpdated = '2026-09-30'

// Questions shown on the landing teaser, in order.
export const faqTeaserIds = [
  'what-is-wineater',
  'wineater-vs-chatgpt',
  'only-wines-i-sell',
  'how-fast-go-live',
  'how-much-does-it-cost'
]

export const faqEn: FaqContent = {
  meta: {
    title: 'Wineater FAQ: How the AI Sommelier Works, Setup, Data & Trial',
    description: 'Answers about Wineater, the AI sommelier for wine shops, restaurants and bars: how recommendations work, catalog setup, integration, data, measurement and the free trial.'
  },
  h1: 'Wineater FAQ',
  intro: 'Clear answers about how the AI sommelier works, how to add it to a wine shop, restaurant or bar, what data it uses and how to try it.',
  breadcrumbHome: 'Home',
  breadcrumbFaq: 'FAQ',
  categories: [
    {
      id: 'basics',
      title: 'Basics',
      items: [
        {
          id: 'what-is-wineater',
          q: 'What is Wineater?',
          a: `Wineater is an AI sommelier for wine shops, online wine retailers, bars and restaurants. A shopper describes in their own words what they are looking for, for example "something for steak, under 30" or "a Barolo, but cheaper", and Wineater returns four wines from that merchant's own catalog, each with a short explanation of why it fits. A merchant adds it as a website widget, a QR code or an API.`,
          links: [{ to: '/', hash: '#ai-sommelier', label: 'Try the live demo' }]
        },
        {
          id: 'what-do-shoppers-see',
          q: 'What do shoppers see?',
          a: `Shoppers see a search box where they type what they want, then a set of four wine cards from the merchant's catalog. Each card shows the wine, its price and a one- or two-sentence reason it was picked, and links to the product page in the shop. Before any search, the widget shows a starting selection of four wines. Shoppers can then ask for more suggestions or for wines similar to one they like.`,
          links: [{ to: '/', hash: '#ai-sommelier', label: 'See it in the demo' }]
        },
        {
          id: 'best-ai-sommelier-for-wine-shops',
          q: 'What is the best AI sommelier for wine shops?',
          a: `There is no single best choice: it depends on your catalog, your sales channel and the languages you need. Wineater is an AI sommelier built for wine merchants. It recommends four wines from the merchant's own stock, explains each pick, and can be added as a website widget, a QR code or an API. It comes with a 1-month free trial, so you can judge it on your own catalog.`
        },
        {
          id: 'wineater-vs-chatgpt',
          q: 'How is Wineater different from a generic ChatGPT wine bot?',
          a: `A general-purpose chatbot answers from broad knowledge and can name bottles a shop does not sell. Wineater recommends only wines that are in the merchant's own catalog and not marked out of stock, so every suggestion links to something the shopper can buy from that shop. Each wine is also described on five aspects (food pairing, taste, origin, occasion, production), which the request is matched against. General chatbots stay useful for open-ended wine questions; Wineater is narrower by design.`
        },
        {
          id: 'wineater-vs-filters-and-search-bar',
          q: 'How is Wineater different from filters and a search bar?',
          a: `Filters and search bars work best when shoppers already know the vocabulary: grape, region, vintage or price band. With Wineater, the shopper describes a situation instead, such as a dish, an occasion or a wine they already like, and Wineater translates it into taste, origin and price criteria. Filters remain useful for shoppers who know exactly what they want; Wineater is aimed at those who do not.`
        },
        {
          id: 'wineater-vs-vivino',
          q: 'How is Wineater different from Vivino for business?',
          a: `Vivino is a consumer app where people look up and rate wines. Wineater is a B2B tool that a merchant installs on its own website, menu or QR code. It does not run a public marketplace or a ratings community: it recommends only from the catalog of the merchant using it and explains each pick. The two serve different purposes, one helping consumers research wines, the other helping one merchant advise its own customers.`
        }
      ]
    },
    {
      id: 'how-recommendations-work',
      title: 'How recommendations work',
      items: [
        {
          id: 'how-does-wineater-choose-wines',
          q: 'How does Wineater choose wines?',
          a: `Wineater reads the shopper's request, matches it against the merchant's catalog and picks four wines, with a reason for each. It splits the request into food pairing, taste and style, place of origin, occasion and how the wine is made, plus any budget. Every wine in the catalog is described on the same five aspects, so the request is compared aspect by aspect. A language model then selects the four wines and writes the explanations.`
        },
        {
          id: 'what-can-shoppers-ask',
          q: 'What can shoppers ask for?',
          a: `Shoppers can write anything in free text: a dish, a budget, an occasion, a style, a region, a grape or a wine they already like. Examples: "something for steak, under 30" or "a birthday gift for a friend who loves wine geekery". If the shopper names a wine type, most of the four picks are of that type. If they type a wine or producer name that exists in the catalog, those exact matches come first.`
        },
        {
          id: 'can-shoppers-set-a-budget',
          q: 'Can shoppers set a budget?',
          a: `Yes, a budget can be part of the request, in numbers or in words. Wineater turns phrases such as "cheap", "around 30" or "splurge" into a price range and uses it to guide the selection. Treat it as guidance rather than a strict cap: the price is shown on every card, so shoppers can check it before they click.`
        },
        {
          id: 'reference-wines-like-a-barolo-but-cheaper',
          q: 'Can shoppers ask for "a Barolo, but cheaper"?',
          a: `Yes. When a request refers to a known wine or producer, Wineater works out that wine's style and origin and looks for wines with a similar profile in the merchant's catalog. It can combine this with a budget, as in "like Barolo, but cheaper". The results are always wines from the catalog, so they are close in style to the reference, not the reference itself.`
        },
        {
          id: 'only-wines-i-sell',
          q: 'Does Wineater recommend only wines I sell?',
          a: `Yes. Recommendations come only from the catalog of the shop that uses the widget, and the shop is identified by its client token, not by anything the shopper types. Wines marked as out of stock are hidden. Wineater does not draw on the open internet or on other merchants' catalogs when it recommends.`
        },
        {
          id: 'why-four-wines-with-a-reason',
          q: 'Why four wines, and why a reason for each?',
          a: `The widget returns up to four wines per search, so the shopper gets a short list instead of a page of results. The four are chosen to play different roles, for example best match, good value, or an alternative from another region, depending on the request. Each comes with a one- or two-sentence explanation in the shop's language, so the shopper knows why it fits. Fewer than four can appear when the catalog has no more good matches.`
        },
        {
          id: 'show-more-and-similar-wines',
          q: 'Can shoppers see more wines or similar wines?',
          a: `Yes. After the first four, a "show more" action brings the next four best matches for the same request, leaving out wines already shown. On a wine card, shoppers can also ask for similar wines, based on that wine's taste and food-pairing profile and a comparable price range. These extra results use a standard short note rather than an individually written reason.`
        },
        {
          id: 'vague-or-unusual-requests',
          q: 'What happens with vague or unusual requests?',
          a: `Wineater reads whatever the request does say, such as an occasion, a dish, a style or a budget, and the more detail the shopper gives, the tighter the match. If the shopper asks for a wine the shop does not carry, the nearest matches in the catalog are offered instead. If nothing relevant can be returned, the widget shows a "no results" message; it never invents wines that are not in the catalog.`
        },
        {
          id: 'which-languages-are-supported',
          q: 'Which languages does Wineater support?',
          a: `Recommendations and their explanations are written in the language set for each store, and the widget interface has translations in several languages, including English, French, Spanish, German and Portuguese. The language comes from the store's configuration, not from the shopper's request. Wine names stay as they appear in your catalog. Tell us which language you need when you contact us.`
        },
        {
          id: 'can-i-promote-specific-wines',
          q: 'Can I promote specific wines?',
          a: `Yes. A shop can flag selected products as promoted, and promoted products receive a moderate boost in ranking among the candidate wines. They are still weighed against what the shopper asked for, so a promoted wine that does not fit the request is not guaranteed a place in the four picks. To set up promoted products, write to hi@wineater.com.`
        },
        {
          id: 'out-of-stock-wines',
          q: 'How does Wineater handle out-of-stock wines?',
          a: `Wines marked as out of stock are not recommended. If you connect an XML product feed, Wineater checks it once a day and hides wines that are no longer listed, while wines with unknown availability stay visible. Safeguards stop the sync if the feed is empty, has shrunk by half, or would hide more than half of the catalog. Because the sync runs daily, a wine that sells out during the day can still appear until the next run.`
        },
        {
          id: 'vintages',
          q: 'Does Wineater handle vintages?',
          a: `Yes. Each vintage is treated as a separate wine, because the vintage is part of the wine's name in the catalog, so the price and availability shown are those of that specific listing. Shoppers can mention a vintage or how old they want the wine to be in their request, and it is read as part of the request like any other detail.`
        }
      ]
    },
    {
      id: 'wine-shops-and-online-retailers',
      title: 'For wine shops and online retailers',
      items: [
        {
          id: 'how-to-add-the-widget',
          q: 'How do I add the Wineater widget to my website?',
          a: `You add one script tag and a container element to your site, together with your store's token, and the widget appears where you place it. Our team gives you the snippet and sets up your catalog first, so you do not configure the AI yourself. If you would rather not use the widget, you can connect through the API or use a QR code.`
        },
        {
          id: 'catalog-formats',
          q: 'Which catalog formats does Wineater accept?',
          a: `You can share your catalog as a CSV export, as a product feed (Wineater reads XML feeds in the Google Shopping style) or through an API connection. A basic feed with title, brand, price and link is enough to identify wines: Wineater fills in details such as region, grape and type, and your own data always takes priority over what it adds. Your prices, stock and images remain yours.`
        },
        {
          id: 'how-fast-go-live',
          q: 'How fast can I go live?',
          a: `Typically about 1 hour for a QR code, about 1 day for the website widget and about 1 week for an API integration. The Wineater team configures your catalog, usually within 24 hours of receiving it. Actual timing depends on the state of your catalog and on your own website team.`
        },
        {
          id: 'branding-and-theme',
          q: 'Can the widget match my brand?',
          a: `Yes. The widget can be configured with your brand colour, logo and styling, and the Wineater team sets this up for you rather than through a self-service editor. The standard widget carries a "Powered by Wineater" line in its footer. If you need a fully branded experience, the API lets you build the interface yourself.`
        },
        {
          id: 'seo-impact',
          q: 'Does Wineater affect my store\'s SEO?',
          a: `Wineater is not an SEO tool, and we do not claim any effect on search rankings. The widget loads through a script and renders its recommendations in the browser, so they are not part of your page's static HTML. It adds a discovery tool for shoppers who are already on your site and does not change your existing product pages or their URLs.`
        },
        {
          id: 'mobile',
          q: 'Does Wineater work on mobile?',
          a: `Yes. The widget has a mobile layout: on desktop, details appear when a shopper hovers over a wine card, and on mobile, tapping a card opens a detail view. A QR-code experience opens from any smartphone camera, with no app to install.`
        }
      ]
    },
    {
      id: 'restaurants-and-bars',
      title: 'For restaurants and bars',
      items: [
        {
          id: 'qr-code-on-tables',
          q: 'Can guests use Wineater from a QR code at the table?',
          a: `Yes. You print a QR code and place it on tables, menus or near wine shelves. Guests scan it with their phone, describe what they want and get wine suggestions from your list, with no app to install. A QR code is the quickest channel to launch, typically about an hour.`
        },
        {
          id: 'tablet-in-the-dining-room',
          q: 'Does Wineater have a tablet version for the dining room?',
          a: `Yes. Wineater has a tablet version for restaurants and bars where guests choose dishes from the menu and get matching wines from your list. It is a recommendation tool only: it has no cart and no payment. Ask us whether it fits your venue.`
        },
        {
          id: 'restaurant-wine-list-import',
          q: 'How does a restaurant give Wineater its wine list?',
          a: `You send your wine list, for example as a CSV export, and the Wineater team loads it for you. Each wine is matched to a wine record and described on pairing, taste, origin, occasion and production, while your prices and stock stay yours. The widget also has a bar and restaurant mode.`
        },
        {
          id: 'wines-by-the-glass',
          q: 'Can Wineater show wines by the glass?',
          a: `Yes. The widget can label a wine as available by the glass and show a glass price next to it, when that information is included in the wine list data. Tell us which wines you pour by the glass when you send your list.`
        }
      ]
    },
    {
      id: 'integration-and-data',
      title: 'Integration and data',
      items: [
        {
          id: 'api',
          q: 'Does Wineater have an API?',
          a: `Yes. The same API that powers the widget can connect Wineater to your own search or recommendation interface. Requests are authenticated with a store token, which also determines your catalog and language. An API integration typically takes about a week. Write to hi@wineater.com to get access.`
        },
        {
          id: 'white-label',
          q: 'Can Wineater be white label?',
          a: `With the API integration, yes: you build the front end yourself, so nothing from Wineater needs to appear on your site. The standard widget shows a "Powered by Wineater" line and can be styled with your brand colours and logo.`
        },
        {
          id: 'shopper-data',
          q: 'What data does Wineater collect from shoppers?',
          a: `The widget records the text shoppers type and how they interact: searches, results shown, card clicks and BUY clicks, plus basic device details such as screen size and browser language. It sets a random visitor identifier and a session identifier in cookies, and it does not ask shoppers for a name or an email. Because the widget sets cookies on your site, mention it in your own cookie information.`,
          links: [{ to: '/privacy', label: 'Privacy policy' }]
        },
        {
          id: 'merchant-data',
          q: 'What happens to the catalog I send?',
          a: `Your catalog is used to power recommendations for your store. Wine-level information such as descriptions, pairing and terroir is shared across stores that list the same wine, while your price, stock and images stay specific to your store. Searches made on another merchant's widget never return your products.`,
          links: [{ to: '/privacy', label: 'Privacy policy' }]
        },
        {
          id: 'security-and-gdpr',
          q: 'How does Wineater handle security and GDPR?',
          a: `Wineater is operated by BACCHUSTECH OÜ, a company incorporated in Estonia. Search requests require an authentication token, and each store's token limits the service to that store's catalog. The widget asks shoppers for no account details. Our privacy policy explains what we collect, why, and which providers process it. For a data processing agreement or specific hosting questions, write to hi@wineater.com.`,
          links: [{ to: '/privacy', label: 'Privacy policy' }]
        }
      ]
    },
    {
      id: 'results-and-measurement',
      title: 'Results and measurement',
      items: [
        {
          id: 'what-wineater-measures',
          q: 'What does Wineater measure?',
          a: `Wineater records widget sessions, searches, recommendations shown, wine-card interactions (hover, click and details viewed), show-more and similar-wines clicks, and BUY clicks. A dashboard in the Wineater admin panel shows these events per store. The numbers describe what shoppers do inside the widget; they are not a measure of your store's revenue.`
        },
        {
          id: 'what-is-a-buy-click',
          q: 'What is a BUY click?',
          a: `A BUY click is a click on a wine's buy link in the widget, which opens that wine's product page in the shop. It signals purchase interest, but it is not a confirmed purchase: Wineater does not count BUY clicks as sales or orders.`
        },
        {
          id: 'what-did-the-pilot-show',
          q: 'What did the Wineater pilot show?',
          a: `In a one-month retail pilot, ${p.resultsToBuy.value}% of sessions that displayed recommendations (${p.resultsToBuy.n} of ${p.resultsToBuy.of}) ended in a BUY click. ${p.caveat.en} Shoppers sent ${p.requestsPerUser.value} requests each on average, and ${p.fullSetOfFour.value}% of result displays showed a full set of four wines. This is a small sample from a single retailer, so read it as an indication, not a forecast. Source: ${p.source.en}.`
        },
        {
          id: 'connect-buy-clicks-to-orders',
          q: 'How can I connect BUY clicks to orders?',
          a: `Wineater records the click, not the order, and does not receive order data from your shop. A BUY click opens the product URL stored in your catalog, so the usual route is to tag those URLs, for example with UTM parameters, and follow the resulting visits and orders in your own analytics or e-commerce reports. We can discuss this during setup.`
        },
        {
          id: 'what-wineater-does-not-claim',
          q: 'What does Wineater not claim?',
          a: `Wineater does not promise a specific increase in sales, conversion or basket size. Results depend on your catalog, your traffic and where the widget is placed. To see what a trial could measure for your shop, book a 20-minute demo or write to hi@wineater.com.`
        }
      ]
    },
    {
      id: 'pricing-and-trial',
      title: 'Pricing and free trial',
      items: [
        {
          id: 'how-much-does-it-cost',
          q: 'How much does Wineater cost?',
          a: `You can start with a 1-month free trial, no credit card required. After the trial, pricing depends on the size of your catalog and on the channel you choose (widget, QR code or API). Write to hi@wineater.com and we will send you a clear quote.`
        },
        {
          id: 'free-trial-and-after',
          q: 'What happens during and after the free trial?',
          a: `During the month, your catalog and your chosen channel are set up and you can try Wineater with your own wines. No credit card is needed to start. After the month, the price depends on your catalog and channel, and we agree it with you by email. For contract length and cancellation terms, please ask us directly.`
        },
        {
          id: 'who-sets-it-up',
          q: 'Who sets Wineater up?',
          a: `The Wineater team does. You share your wine list or product feed, and we load and describe the wines, configure your store and language, and give you the widget snippet or QR code. You do not train or tune the AI yourself. Your part is adding the snippet to your site or printing the QR code.`
        }
      ]
    }
  ]
}

export const faqFr: FaqContent = {
  meta: {
    title: 'FAQ Wineater : fonctionnement du sommelier IA, mise en place, données et essai',
    description: 'Réponses sur Wineater, le sommelier IA pour cavistes, restaurants et bars : fonctionnement des recommandations, catalogue, intégration, données, mesure et essai gratuit.'
  },
  h1: 'FAQ Wineater',
  intro: 'Des réponses claires sur le fonctionnement du sommelier IA, son ajout à une boutique, un restaurant ou un bar, les données utilisées et l’essai gratuit.',
  breadcrumbHome: 'Accueil',
  breadcrumbFaq: 'FAQ',
  categories: [
    {
      id: 'basics',
      title: 'Les bases',
      items: [
        {
          id: 'what-is-wineater',
          q: 'Qu’est-ce que Wineater ?',
          a: `Wineater est un sommelier IA pour les cavistes, les sites de vente de vin en ligne, les bars et les restaurants. Le client décrit avec ses mots ce qu’il cherche, par exemple « quelque chose pour un steak, moins de 30 » ou « un Barolo, mais moins cher », et Wineater renvoie quatre vins du catalogue du commerçant, chacun avec une courte explication de son choix. Il s’ajoute à un site sous forme de widget, de QR code ou d’API.`,
          links: [{ to: '/', hash: '#ai-sommelier', label: 'Essayer la démo en direct' }]
        },
        {
          id: 'what-do-shoppers-see',
          q: 'Que voient les clients ?',
          a: `Les clients voient une barre de recherche où ils écrivent ce qu’ils veulent, puis quatre fiches de vins issues du catalogue du commerçant. Chaque fiche affiche le vin, son prix et une ou deux phrases expliquant le choix, et renvoie vers la fiche produit de la boutique. Avant toute recherche, le widget montre une sélection de départ de quatre vins. Les clients peuvent ensuite demander d’autres suggestions ou des vins similaires à celui qui leur plaît.`,
          links: [{ to: '/', hash: '#ai-sommelier', label: 'Voir la démo' }]
        },
        {
          id: 'best-ai-sommelier-for-wine-shops',
          q: 'Quel est le meilleur sommelier IA pour les cavistes ?',
          a: `Il n’existe pas de meilleur choix universel : tout dépend de votre catalogue, de votre canal de vente et des langues nécessaires. Wineater est un sommelier IA conçu pour les professionnels du vin. Il recommande quatre vins tirés du stock du commerçant, explique chaque choix et s’ajoute sous forme de widget, de QR code ou d’API. Il est proposé avec un mois d’essai gratuit, pour l’évaluer sur votre propre catalogue.`
        },
        {
          id: 'wineater-vs-chatgpt',
          q: 'En quoi Wineater diffère-t-il d’un chatbot ChatGPT généraliste sur le vin ?',
          a: `Un chatbot généraliste répond à partir de connaissances très larges et peut citer des bouteilles qu’une boutique ne vend pas. Wineater ne recommande que des vins présents dans le catalogue du commerçant et non signalés en rupture : chaque suggestion renvoie donc à un produit que le client peut acheter dans cette boutique. Chaque vin est aussi décrit sur cinq axes (accord mets-vins, goût, origine, occasion, élaboration), auxquels la demande est comparée. Les chatbots généralistes restent utiles pour des questions ouvertes ; Wineater est volontairement plus ciblé.`
        },
        {
          id: 'wineater-vs-filters-and-search-bar',
          q: 'En quoi Wineater diffère-t-il des filtres et de la barre de recherche ?',
          a: `Les filtres et la barre de recherche fonctionnent surtout quand le client connaît déjà le vocabulaire : cépage, région, millésime ou fourchette de prix. Avec Wineater, il décrit plutôt une situation, comme un plat, une occasion ou un vin qu’il aime déjà, et Wineater la traduit en critères de goût, d’origine et de prix. Les filtres restent utiles pour ceux qui savent exactement ce qu’ils veulent ; Wineater s’adresse à ceux qui ne le savent pas.`
        },
        {
          id: 'wineater-vs-vivino',
          q: 'En quoi Wineater diffère-t-il de Vivino pour les professionnels ?',
          a: `Vivino est une application grand public où l’on recherche et note des vins. Wineater est un outil B2B qu’un commerçant installe sur son propre site, sa carte ou son QR code. Il n’exploite ni place de marché publique ni communauté de notes : il recommande uniquement à partir du catalogue du commerçant qui l’utilise et explique chaque choix. Les deux répondent à des besoins différents : l’un aide les particuliers à s’informer, l’autre aide un commerçant à conseiller ses propres clients.`
        }
      ]
    },
    {
      id: 'how-recommendations-work',
      title: 'Comment fonctionnent les recommandations',
      items: [
        {
          id: 'how-does-wineater-choose-wines',
          q: 'Comment Wineater choisit-il les vins ?',
          a: `Wineater lit la demande du client, la compare au catalogue du commerçant et choisit quatre vins, avec une raison pour chacun. Il décompose la demande en accord mets-vins, goût et style, origine, occasion et mode d’élaboration, plus le budget éventuel. Chaque vin du catalogue est décrit sur ces cinq mêmes axes : la demande est donc comparée axe par axe. Un modèle de langage sélectionne ensuite les quatre vins et rédige les explications.`
        },
        {
          id: 'what-can-shoppers-ask',
          q: 'Que peuvent demander les clients ?',
          a: `Les clients peuvent écrire librement : un plat, un budget, une occasion, un style, une région, un cépage ou un vin qu’ils aiment déjà. Exemples : « quelque chose pour un steak, moins de 30 » ou « un cadeau d’anniversaire pour un ami passionné de vin ». Si le client cite un type de vin, la plupart des quatre choix sont de ce type. S’il tape le nom d’un vin ou d’un producteur présent au catalogue, ces correspondances exactes passent en premier.`
        },
        {
          id: 'can-shoppers-set-a-budget',
          q: 'Les clients peuvent-ils indiquer un budget ?',
          a: `Oui, le budget peut faire partie de la demande, en chiffres ou en mots. Wineater transforme des expressions comme « pas cher », « autour de 30 » ou « on se fait plaisir » en fourchette de prix et s’en sert pour guider la sélection. Il s’agit d’un repère plutôt que d’un plafond strict : le prix est affiché sur chaque fiche, le client peut donc le vérifier avant de cliquer.`
        },
        {
          id: 'reference-wines-like-a-barolo-but-cheaper',
          q: 'Peut-on demander « un Barolo, mais moins cher » ?',
          a: `Oui. Quand la demande renvoie à un vin ou un producteur connu, Wineater détermine son style et son origine, puis cherche dans le catalogue du commerçant des vins au profil proche. Il peut combiner cela avec un budget, comme dans « un vin comme un Barolo, mais moins cher ». Les résultats viennent toujours du catalogue : ils sont proches de la référence par le style, sans être la référence elle-même.`
        },
        {
          id: 'only-wines-i-sell',
          q: 'Wineater ne recommande-t-il que les vins que je vends ?',
          a: `Oui. Les recommandations viennent uniquement du catalogue de la boutique qui utilise le widget, et la boutique est identifiée par son jeton client, pas par ce que tape le client. Les vins signalés en rupture sont masqués. Wineater ne puise ni dans internet ni dans les catalogues d’autres commerçants pour recommander.`
        },
        {
          id: 'why-four-wines-with-a-reason',
          q: 'Pourquoi quatre vins, et pourquoi une raison pour chacun ?',
          a: `Le widget renvoie jusqu’à quatre vins par recherche : le client obtient une courte liste plutôt qu’une page de résultats. Les quatre choix jouent des rôles différents, par exemple meilleure correspondance, bon rapport qualité-prix ou alternative d’une autre région, selon la demande. Chacun est accompagné d’une ou deux phrases dans la langue de la boutique, pour que le client comprenne pourquoi il convient. Il peut y en avoir moins de quatre si le catalogue n’offre pas d’autres bonnes correspondances.`
        },
        {
          id: 'show-more-and-similar-wines',
          q: 'Peut-on voir d’autres vins ou des vins similaires ?',
          a: `Oui. Après les quatre premiers, l’action « voir plus » propose les quatre meilleures correspondances suivantes pour la même demande, sans répéter les vins déjà montrés. Sur une fiche, le client peut aussi demander des vins similaires, selon le profil de goût et d’accords du vin et une gamme de prix comparable. Ces résultats supplémentaires s’accompagnent d’une courte mention standard plutôt que d’une raison rédigée pour chaque vin.`
        },
        {
          id: 'vague-or-unusual-requests',
          q: 'Que se passe-t-il avec une demande vague ou inhabituelle ?',
          a: `Wineater exploite ce que la demande indique, comme une occasion, un plat, un style ou un budget : plus le client donne de détails, plus la sélection est précise. Si le client demande un vin que la boutique ne vend pas, les correspondances les plus proches du catalogue sont proposées. Si rien de pertinent ne ressort, le widget affiche un message « aucun résultat » ; il n’invente jamais de vins absents du catalogue.`
        },
        {
          id: 'which-languages-are-supported',
          q: 'Quelles langues Wineater prend-il en charge ?',
          a: `Les recommandations et leurs explications sont rédigées dans la langue définie pour chaque boutique, et l’interface du widget est traduite en plusieurs langues, dont l’anglais, le français, l’espagnol, l’allemand et le portugais. La langue vient de la configuration de la boutique, pas de la demande du client. Les noms des vins restent ceux de votre catalogue. Indiquez-nous la langue souhaitée en nous contactant.`
        },
        {
          id: 'can-i-promote-specific-wines',
          q: 'Puis-je mettre certains vins en avant ?',
          a: `Oui. Une boutique peut marquer des produits comme mis en avant, et ceux-ci reçoivent un coup de pouce modéré dans le classement des vins candidats. Ils restent comparés à la demande du client : un vin mis en avant qui ne correspond pas n’est pas assuré d’apparaître parmi les quatre choix. Pour activer cette option, écrivez à hi@wineater.com.`
        },
        {
          id: 'out-of-stock-wines',
          q: 'Comment Wineater gère-t-il les vins en rupture de stock ?',
          a: `Les vins signalés en rupture ne sont pas recommandés. Si vous connectez un flux produits XML, Wineater le consulte une fois par jour et masque les vins qui n’y figurent plus, tandis que les vins dont la disponibilité est inconnue restent visibles. Des garde-fous interrompent la synchronisation si le flux est vide, a diminué de moitié ou masquerait plus de la moitié du catalogue. La synchronisation étant quotidienne, un vin épuisé en cours de journée peut encore apparaître jusqu’au passage suivant.`
        },
        {
          id: 'vintages',
          q: 'Wineater gère-t-il les millésimes ?',
          a: `Oui. Chaque millésime est traité comme un vin distinct, car le millésime fait partie du nom du vin dans le catalogue : le prix et la disponibilité affichés sont ceux de cette référence précise. Le client peut mentionner un millésime ou l’âge souhaité du vin dans sa demande, qui est lu comme n’importe quel autre détail.`
        }
      ]
    },
    {
      id: 'wine-shops-and-online-retailers',
      title: 'Pour les cavistes et sites de vente en ligne',
      items: [
        {
          id: 'how-to-add-the-widget',
          q: 'Comment ajouter le widget Wineater à mon site ?',
          a: `Vous ajoutez une balise script et un conteneur à votre site, avec le jeton de votre boutique, et le widget apparaît à l’endroit choisi. Notre équipe vous fournit le code et configure d’abord votre catalogue : vous n’avez pas à paramétrer l’IA. Si vous préférez ne pas utiliser le widget, vous pouvez passer par l’API ou par un QR code.`
        },
        {
          id: 'catalog-formats',
          q: 'Quels formats de catalogue Wineater accepte-t-il ?',
          a: `Vous pouvez fournir votre catalogue sous forme d’export CSV, de flux produits (Wineater lit les flux XML de type Google Shopping) ou via une connexion API. Un flux simple avec titre, marque, prix et lien suffit pour identifier les vins : Wineater complète les informations comme la région, le cépage et le type, et vos propres données priment toujours sur ce qu’il ajoute. Vos prix, votre stock et vos images restent les vôtres.`
        },
        {
          id: 'how-fast-go-live',
          q: 'En combien de temps puis-je être en ligne ?',
          a: `En général, environ 1 heure pour un QR code, environ 1 jour pour le widget sur votre site et environ 1 semaine pour une intégration API. L’équipe Wineater configure votre catalogue, le plus souvent dans les 24 heures suivant sa réception. Le délai réel dépend de l’état de votre catalogue et de votre équipe web.`
        },
        {
          id: 'branding-and-theme',
          q: 'Le widget peut-il reprendre mon identité visuelle ?',
          a: `Oui. Le widget peut être configuré avec votre couleur de marque, votre logo et votre style, et l’équipe Wineater s’en charge pour vous plutôt que via un éditeur en libre-service. Le widget standard affiche la mention « Propulsé par Wineater » en bas. Si vous voulez une expérience entièrement à vos couleurs, l’API vous permet de construire l’interface vous-même.`
        },
        {
          id: 'seo-impact',
          q: 'Wineater a-t-il un effet sur le référencement (SEO) de ma boutique ?',
          a: `Wineater n’est pas un outil SEO, et nous n’annonçons aucun effet sur le classement dans les moteurs de recherche. Le widget se charge via un script et affiche ses recommandations dans le navigateur : elles ne font pas partie du HTML statique de votre page. Il ajoute un outil de découverte pour les clients déjà présents sur votre site et ne modifie ni vos fiches produits ni leurs URL.`
        },
        {
          id: 'mobile',
          q: 'Wineater fonctionne-t-il sur mobile ?',
          a: `Oui. Le widget dispose d’une mise en page mobile : sur ordinateur, les détails s’affichent au survol d’une fiche, et sur mobile, un appui ouvre une vue détaillée. Un QR code s’ouvre depuis l’appareil photo de n’importe quel smartphone, sans application à installer.`
        }
      ]
    },
    {
      id: 'restaurants-and-bars',
      title: 'Pour les restaurants et les bars',
      items: [
        {
          id: 'qr-code-on-tables',
          q: 'Les clients peuvent-ils utiliser Wineater via un QR code à table ?',
          a: `Oui. Vous imprimez un QR code et le placez sur les tables, les cartes ou près des rayons. Les clients le scannent avec leur téléphone, décrivent ce qu’ils souhaitent et reçoivent des suggestions issues de votre carte, sans application à installer. Le QR code est le canal le plus rapide à lancer, en général environ une heure.`
        },
        {
          id: 'tablet-in-the-dining-room',
          q: 'Existe-t-il une version tablette pour la salle ?',
          a: `Oui. Wineater propose une version tablette pour les restaurants et les bars : les clients choisissent des plats dans la carte et reçoivent les vins de votre sélection qui s’y accordent. C’est uniquement un outil de recommandation, sans panier ni paiement. Demandez-nous si elle convient à votre établissement.`
        },
        {
          id: 'restaurant-wine-list-import',
          q: 'Comment un restaurant transmet-il sa carte des vins à Wineater ?',
          a: `Vous envoyez votre carte des vins, par exemple sous forme d’export CSV, et l’équipe Wineater la charge pour vous. Chaque vin est associé à une fiche vin et décrit sur les accords, le goût, l’origine, l’occasion et l’élaboration, tandis que vos prix et votre stock restent les vôtres. Le widget propose aussi un mode bar et restaurant.`
        },
        {
          id: 'wines-by-the-glass',
          q: 'Wineater peut-il afficher les vins au verre ?',
          a: `Oui. Le widget peut indiquer qu’un vin est servi au verre et afficher un prix au verre à côté, lorsque cette information figure dans les données de la carte. Précisez-nous quels vins vous servez au verre en nous envoyant votre carte.`
        }
      ]
    },
    {
      id: 'integration-and-data',
      title: 'Intégration et données',
      items: [
        {
          id: 'api',
          q: 'Wineater dispose-t-il d’une API ?',
          a: `Oui. La même API que celle du widget permet de relier Wineater à votre propre moteur de recherche ou de recommandation. Les requêtes sont authentifiées par un jeton de boutique, qui détermine aussi votre catalogue et votre langue. Une intégration API prend en général environ une semaine. Écrivez à hi@wineater.com pour y accéder.`
        },
        {
          id: 'white-label',
          q: 'Wineater peut-il être en marque blanche ?',
          a: `Avec l’intégration API, oui : vous construisez vous-même l’interface, et rien de Wineater n’a besoin d’apparaître sur votre site. Le widget standard affiche la mention « Propulsé par Wineater » et peut être personnalisé avec vos couleurs et votre logo.`
        },
        {
          id: 'shopper-data',
          q: 'Quelles données Wineater collecte-t-il auprès des clients ?',
          a: `Le widget enregistre le texte saisi par les clients et leurs interactions : recherches, résultats affichés, clics sur les fiches et clics BUY, ainsi que des informations techniques de base comme la taille d’écran et la langue du navigateur. Il dépose dans des cookies un identifiant de visiteur aléatoire et un identifiant de session, et ne demande ni nom ni e-mail. Comme le widget dépose des cookies sur votre site, mentionnez-le dans votre propre information sur les cookies.`,
          links: [{ to: '/privacy', label: 'Politique de confidentialité' }]
        },
        {
          id: 'merchant-data',
          q: 'Que devient le catalogue que je vous envoie ?',
          a: `Votre catalogue sert à alimenter les recommandations de votre boutique. Les informations propres au vin, comme les descriptions, les accords et le terroir, sont partagées entre les boutiques qui référencent le même vin, tandis que votre prix, votre stock et vos images restent propres à votre boutique. Les recherches faites sur le widget d’un autre commerçant ne renvoient jamais vos produits.`,
          links: [{ to: '/privacy', label: 'Politique de confidentialité' }]
        },
        {
          id: 'security-and-gdpr',
          q: 'Comment Wineater gère-t-il la sécurité et le RGPD ?',
          a: `Wineater est exploité par BACCHUSTECH OÜ, une société de droit estonien. Les requêtes de recherche exigent un jeton d’authentification, et le jeton de chaque boutique limite le service au catalogue de cette boutique. Le widget ne demande aucune donnée de compte aux clients. Notre politique de confidentialité explique ce que nous collectons, pourquoi, et quels prestataires traitent les données. Pour un accord de traitement des données ou une question d’hébergement précise, écrivez à hi@wineater.com.`,
          links: [{ to: '/privacy', label: 'Politique de confidentialité' }]
        }
      ]
    },
    {
      id: 'results-and-measurement',
      title: 'Résultats et mesure',
      items: [
        {
          id: 'what-wineater-measures',
          q: 'Que mesure Wineater ?',
          a: `Wineater enregistre les sessions du widget, les recherches, les recommandations affichées, les interactions avec les fiches (survol, clic et détails consultés), les clics sur « voir plus » et sur les vins similaires, ainsi que les clics BUY. Un tableau de bord de l’interface d’administration Wineater présente ces événements par boutique. Ces chiffres décrivent ce que font les clients dans le widget ; ils ne mesurent pas le chiffre d’affaires de votre boutique.`
        },
        {
          id: 'what-is-a-buy-click',
          q: 'Qu’est-ce qu’un clic BUY ?',
          a: `Un clic BUY est un clic sur le lien d’achat d’un vin dans le widget, qui ouvre la fiche produit de ce vin dans la boutique. Il témoigne d’un intérêt d’achat, mais ce n’est pas un achat confirmé : Wineater ne compte pas les clics BUY comme des ventes ou des commandes.`
        },
        {
          id: 'what-did-the-pilot-show',
          q: 'Qu’a montré le pilote Wineater ?',
          a: `Lors d’un pilote d’un mois chez un caviste, ${String(p.resultsToBuy.value).replace('.', ',')} % des sessions ayant affiché des recommandations (${p.resultsToBuy.n} sur ${p.resultsToBuy.of}) se sont terminées par un clic BUY. ${p.caveat.fr} Les clients ont envoyé en moyenne ${String(p.requestsPerUser.value).replace('.', ',')} demandes chacun, et ${String(p.fullSetOfFour.value).replace('.', ',')} % des affichages de résultats montraient un jeu complet de quatre vins. L’échantillon est petit et provient d’un seul commerçant : à lire comme une indication, pas comme une prévision. Source : ${p.source.fr}.`
        },
        {
          id: 'connect-buy-clicks-to-orders',
          q: 'Comment relier les clics BUY aux commandes ?',
          a: `Wineater enregistre le clic, pas la commande, et ne reçoit pas les données de commande de votre boutique. Un clic BUY ouvre l’URL produit enregistrée dans votre catalogue : la méthode habituelle consiste à baliser ces URL, par exemple avec des paramètres UTM, puis à suivre les visites et les commandes correspondantes dans vos outils d’analyse ou d’e-commerce. Nous pouvons en parler lors de la mise en place.`
        },
        {
          id: 'what-wineater-does-not-claim',
          q: 'Qu’est-ce que Wineater n’affirme pas ?',
          a: `Wineater ne promet aucune hausse précise des ventes, de la conversion ou du panier moyen. Les résultats dépendent de votre catalogue, de votre trafic et de l’emplacement du widget. Pour voir ce qu’un essai pourrait mesurer dans votre boutique, réservez une démo de 20 minutes ou écrivez à hi@wineater.com.`
        }
      ]
    },
    {
      id: 'pricing-and-trial',
      title: 'Tarifs et essai gratuit',
      items: [
        {
          id: 'how-much-does-it-cost',
          q: 'Combien coûte Wineater ?',
          a: `Vous pouvez commencer par un mois d’essai gratuit, sans carte bancaire. Après l’essai, le tarif dépend de la taille de votre catalogue et du canal choisi (widget, QR code ou API). Écrivez à hi@wineater.com et nous vous enverrons un devis clair.`
        },
        {
          id: 'free-trial-and-after',
          q: 'Que se passe-t-il pendant et après l’essai gratuit ?',
          a: `Pendant le mois, votre catalogue et le canal choisi sont mis en place et vous pouvez essayer Wineater avec vos propres vins. Aucune carte bancaire n’est nécessaire pour commencer. Ensuite, le tarif dépend de votre catalogue et de votre canal, et nous le convenons avec vous par e-mail. Pour la durée d’engagement et les conditions de résiliation, merci de nous poser directement la question.`
        },
        {
          id: 'who-sets-it-up',
          q: 'Qui met Wineater en place ?',
          a: `C’est l’équipe Wineater. Vous nous transmettez votre carte des vins ou votre flux produits, et nous chargeons et décrivons les vins, configurons votre boutique et votre langue, puis vous remettons le code du widget ou le QR code. Vous n’avez ni à entraîner ni à régler l’IA. De votre côté, il suffit d’ajouter le code à votre site ou d’imprimer le QR code.`
        }
      ]
    }
  ]
}

export const faqByLocale: Record<string, FaqContent> = { en: faqEn, fr: faqFr }

export function flattenFaq(content: FaqContent): FaqQuestion[] {
  return content.categories.flatMap(category => category.items)
}
