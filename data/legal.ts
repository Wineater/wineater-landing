/*
 * DRAFTING BASE ONLY. The texts below are a first draft built from the data flows found in this
 * repository. They must be reviewed and completed by counsel before anyone relies on them.
 * Every [À COMPLÉTER: ...] marker is a fact the company has not stated in the repository
 * (company identity, retention periods, transfer mechanisms, hosting details) and is rendered
 * visibly on the page until replaced.
 */

export type LegalSection = {
  title: string
  paragraphs?: string[]
  list?: string[]
}

export type LegalDoc = {
  title: string
  description: string
  h1: string
  updated: string
  intro?: string[]
  sections: LegalSection[]
}

export type LegalLocale = 'fr' | 'en'
export type LegalKey = 'legal' | 'privacy' | 'terms'

const PLACEHOLDER = /(\[À COMPLÉTER:[^\]]*\])/g

export function splitPlaceholders(text: string): { text: string; placeholder: boolean }[] {
  return text
    .split(PLACEHOLDER)
    .filter(Boolean)
    .map((part) => ({ text: part, placeholder: part.startsWith('[À COMPLÉTER:') }))
}

const CONTACT = 'hi@wineater.com'

const legalFr: LegalDoc = {
  title: 'Mentions légales - Wineater',
  description: "Mentions légales du site wineater.com : éditeur, directeur de la publication, hébergeur et contact.",
  h1: 'Mentions légales',
  updated: '1 octobre 2026',
  intro: [
    "Conformément à l'article 5 de la directive 2000/31/CE sur le commerce électronique, voici les informations légales relatives au site wineater.com, édité par une société de droit estonien."
  ],
  sections: [
    {
      title: 'Éditeur du site',
      list: [
        'Raison sociale : BACCHUSTECH OÜ (marque : Wineater)',
        'Forme juridique : société à responsabilité limitée de droit estonien (osaühing, OÜ)',
        'Numéro d\'immatriculation au registre du commerce estonien : 17217985',
        'Adresse du siège social : Tornimäe tn 5, Kesklinna linnaosa, Tallinn, Harju maakond, Estonie',
        `E-mail : ${CONTACT}`,
        'E-mail de la société : bacchustech@wineater.com',
        'Téléphone : +33 7 81 01 40 33'
      ]
    },
    {
      title: 'Directeur de la publication',
      paragraphs: ['Aleksei Olkhovoi, membre du directoire (Management Board Member).']
    },
    {
      title: 'Hébergement',
      paragraphs: [
        "Le site est déployé sur la plateforme Vercel (projet Vercel rattaché au site dans le dépôt du code) : Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, États-Unis.",
        "Les données du formulaire d'inscription sont stockées chez Supabase : Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapour 049513. Région d'hébergement du projet : [À COMPLÉTER: région Supabase du projet]."
      ]
    },
    {
      title: 'Propriété intellectuelle',
      paragraphs: [
        "La marque Wineater, le logo, les textes, images, graphismes et le code du site sont protégés par le droit de la propriété intellectuelle. Toute reproduction, représentation ou exploitation, totale ou partielle, sans autorisation écrite préalable est interdite.",
        "Les marques et logos de tiers affichés sur le site appartiennent à leurs propriétaires respectifs."
      ]
    },
    {
      title: 'Données personnelles et cookies',
      paragraphs: [
        "Le traitement des données personnelles et l'usage des cookies et traceurs sont décrits dans la politique de confidentialité, accessible à l'adresse /privacy. Vous pouvez à tout moment modifier votre choix via le lien « Paramètres des cookies » en pied de page."
      ]
    },
    {
      title: 'Consommation d’alcool',
      paragraphs: ["L'abus d'alcool est dangereux pour la santé. À consommer avec modération."]
    },
    {
      title: 'Contact',
      paragraphs: [`Pour toute question relative au site : ${CONTACT}.`]
    }
  ]
}

const legalEn: LegalDoc = {
  title: 'Legal notice - Wineater',
  description: 'Legal notice for wineater.com: publisher, publication director, hosting provider and contact.',
  h1: 'Legal notice',
  updated: '1 October 2026',
  intro: [
    'In accordance with Article 5 of Directive 2000/31/EC on electronic commerce, this page sets out the legal information for wineater.com, published by a company incorporated in Estonia. The French version is authoritative.'
  ],
  sections: [
    {
      title: 'Publisher',
      list: [
        'Company name: BACCHUSTECH OÜ (brand: Wineater)',
        'Legal form: private limited company under Estonian law (osaühing, OÜ)',
        'Registration code (Estonian Business Registry): 17217985',
        'Registered office: Tornimäe tn 5, Kesklinna linnaosa, Tallinn, Harju maakond, Estonia',
        `Email: ${CONTACT}`,
        'Company email: bacchustech@wineater.com',
        'Phone: +33 7 81 01 40 33'
      ]
    },
    {
      title: 'Publication director',
      paragraphs: ['Aleksei Olkhovoi, Management Board Member.']
    },
    {
      title: 'Hosting',
      paragraphs: [
        'The site is deployed on the Vercel platform (a Vercel project is linked to the site in the code repository): Vercel Inc., 440 N Barranca Ave #4133, Covina, CA 91723, United States.',
        'Sign-up form data is stored with Supabase: Supabase Pte. Ltd., 65 Chulia Street #38-02/03, OCBC Centre, Singapore 049513. Project hosting region: [À COMPLÉTER: Supabase project region].'
      ]
    },
    {
      title: 'Intellectual property',
      paragraphs: [
        'The Wineater name, logo, texts, images, graphics and the site code are protected by intellectual property law. Any reproduction, representation or use, in whole or in part, without prior written permission is prohibited.',
        'Third-party trademarks and logos shown on the site belong to their respective owners.'
      ]
    },
    {
      title: 'Personal data and cookies',
      paragraphs: [
        'Personal data processing and the use of cookies and trackers are described in the privacy policy at /privacy. You can change your choice at any time with the "Cookie settings" link in the footer.'
      ]
    },
    {
      title: 'Alcohol',
      paragraphs: ['Alcohol abuse is dangerous for your health. Please drink responsibly.']
    },
    {
      title: 'Contact',
      paragraphs: [`For any question about the site: ${CONTACT}.`]
    }
  ]
}

const privacyFr: LegalDoc = {
  title: 'Politique de confidentialité - Wineater',
  description: "Politique de confidentialité de wineater.com : données collectées, finalités, bases légales, durées de conservation, destinataires, transferts et droits RGPD.",
  h1: 'Politique de confidentialité',
  updated: '1 octobre 2026',
  intro: [
    "Cette politique explique comment Wineater traite vos données personnelles lorsque vous utilisez le site wineater.com, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés."
  ],
  sections: [
    {
      title: '1. Responsable du traitement',
      paragraphs: [
        "Le responsable du traitement est BACCHUSTECH OÜ (société de droit estonien, code d'immatriculation 17217985, marque Wineater), dont le siège est situé Tornimäe tn 5, Kesklinna linnaosa, Tallinn, Harju maakond, Estonie (voir les mentions légales).",
        `Contact pour toute question relative aux données personnelles : ${CONTACT}.`
      ]
    },
    {
      title: '2. Données collectées, finalités et bases légales',
      list: [
        "Formulaire d'inscription à l'essai (nom, nom de l'établissement, adresse e-mail, fichier de carte ou de catalogue facultatif, case de consentement RGPD). Finalité : créer et configurer votre compte d'essai, vous contacter à ce sujet. Base légale : votre consentement (case à cocher) et, pour la suite de la relation, les mesures précontractuelles prises à votre demande. Vous pouvez retirer votre consentement à tout moment.",
        "Démonstration du sommelier IA sur le site (texte que vous saisissez pour décrire un repas ou une envie). Finalité : vous fournir des recommandations de vins. Base légale : exécution de la fonction que vous demandez (intérêt légitime de fournir le service demandé). Ne saisissez pas de données personnelles dans ce champ.",
        "Prise de rendez-vous de démonstration via un formulaire HubSpot (les informations que vous saisissez dans le formulaire, par exemple vos coordonnées professionnelles). Finalité : organiser la démonstration et le suivi commercial. Base légale : mesures précontractuelles à votre demande / intérêt légitime de prospection B2B.",
        "Statistiques d'audience via Google Tag Manager et Google Analytics 4 (pages vues et actions sur le site, sans publicité ciblée). Finalité : mesurer la fréquentation et l'efficacité du site. Base légale : votre consentement, donné via le bandeau cookies.",
        "Journaux techniques des serveurs et de l'hébergeur (adresse IP, date, pages demandées). Finalité : sécurité et bon fonctionnement du site. Base légale : intérêt légitime.",
        `Courriers électroniques envoyés à ${CONTACT}. Finalité : répondre à votre demande. Base légale : intérêt légitime ou mesures précontractuelles.`
      ]
    },
    {
      title: '3. Cookies et traceurs',
      paragraphs: [
        "Aucun traceur d'audience n'est chargé avant votre choix. Si vous cliquez sur « Refuser » ou ne répondez pas, Google Tag Manager n'est pas chargé. Les signaux de consentement Google (Consent Mode) sont positionnés sur « refusé » par défaut."
      ],
      list: [
        "Mémorisation de votre choix (stockage local du navigateur et cookie « wineater_consent ») : strictement nécessaire, exempté de consentement. Durée : 6 mois, après quoi le bandeau vous est proposé à nouveau.",
        "Google Tag Manager / Google Analytics (déposés uniquement après acceptation) : mesure d'audience. Cookies « _ga » et « _ga_* » (propres au site) ; durée de vie : 13 mois.",
        "Vous pouvez modifier votre choix à tout moment avec le lien « Paramètres des cookies » en pied de page. Refuser est aussi simple qu'accepter."
      ]
    },
    {
      title: '4. Destinataires et sous-traitants',
      paragraphs: ["Vos données sont accessibles aux personnes habilitées de Wineater et aux prestataires suivants, agissant en qualité de sous-traitants ou de tiers selon le cas :"],
      list: [
        "Vercel Inc. (hébergement du site et de l'API) ;",
        "Supabase Pte. Ltd. (base de données et stockage des fichiers transmis via le formulaire d'inscription) ;",
        "Google (Tag Manager, et Analytics le cas échéant ; modèles d'IA Gemini utilisés par l'API du sommelier pour analyser le texte saisi dans la démonstration) ;",
        "OpenAI (calcul d'empreintes vectorielles du texte saisi dans la démonstration) ;",
        "HubSpot (HubSpot Ireland Limited pour l'Espace économique européen ; formulaire de prise de rendez-vous de démonstration, serveur « eu1 ») ;",
        "Hébergeurs de ressources externes chargées par votre navigateur : Supabase Storage (images, polices), unpkg (script du widget), et des sites tiers pour certains logos partenaires et presse. Votre navigateur leur transmet votre adresse IP lors du chargement ;",
      ]
    },
    {
      title: '5. Transferts hors de l’Union européenne',
      paragraphs: [
        "Certains prestataires cités ci-dessus (notamment Google, OpenAI, Vercel, Supabase, HubSpot) peuvent traiter des données hors de l'Union européenne, en particulier aux États-Unis. Ces transferts sont encadrés par les mécanismes prévus par le RGPD : décision d'adéquation (notamment le cadre Data Privacy Framework pour les prestataires américains certifiés) ou clauses contractuelles types."
      ]
    },
    {
      title: '6. Durées de conservation',
      list: [
        "Données du formulaire d'inscription et fichier transmis : 12 mois à compter du dernier contact.",
        "Échanges par e-mail : 12 mois.",
        "Texte saisi dans la démonstration : 12 mois.",
        "Données de mesure d'audience : 14 mois au maximum (durée maximale proposée par Google Analytics 4).",
        "Preuve de votre choix de cookies : 6 mois."
      ]
    },
    {
      title: '7. Vos droits',
      paragraphs: [
        "Vous disposez des droits d'accès, de rectification, d'effacement, de limitation, d'opposition et de portabilité, ainsi que du droit de retirer votre consentement à tout moment (sans remettre en cause la légalité du traitement antérieur) et de définir des directives sur le sort de vos données après votre décès.",
        `Pour exercer ces droits, écrivez à ${CONTACT}. Nous pouvons vous demander un justificatif d'identité en cas de doute. Nous répondons dans un délai d'un mois.`
      ]
    },
    {
      title: '8. Réclamation auprès d\'une autorité de contrôle',
      paragraphs: [
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de l'autorité de contrôle de votre pays de résidence ou de travail, ou auprès de l'autorité estonienne compétente pour notre établissement, l'Inspection estonienne de la protection des données (Andmekaitse Inspektsioon, www.aki.ee). En France, il s'agit de la CNIL (www.cnil.fr)."
      ]
    },
    {
      title: '9. Sécurité',
      paragraphs: [
        "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (connexions chiffrées HTTPS, accès restreints aux données)."
      ]
    },
    {
      title: '10. Modifications',
      paragraphs: ["Nous pouvons modifier cette politique. La date de dernière mise à jour figure en haut de page ; en cas de changement important sur les cookies, votre choix vous sera redemandé."]
    }
  ]
}

const privacyEn: LegalDoc = {
  title: 'Privacy policy - Wineater',
  description: 'Privacy policy for wineater.com: data collected, purposes, legal bases, retention, recipients, transfers and GDPR rights.',
  h1: 'Privacy policy',
  updated: '1 October 2026',
  intro: [
    'This policy explains how Wineater processes your personal data when you use wineater.com, in accordance with Regulation (EU) 2016/679 (GDPR) and the French Data Protection Act. The French version is authoritative.'
  ],
  sections: [
    {
      title: '1. Data controller',
      paragraphs: [
        'The data controller is BACCHUSTECH OÜ (a company incorporated in Estonia, registration code 17217985, brand Wineater), with registered office at Tornimäe tn 5, Kesklinna linnaosa, Tallinn, Harju maakond, Estonia (see the legal notice).',
        `Contact for any personal data question: ${CONTACT}.`
      ]
    },
    {
      title: '2. Data collected, purposes and legal bases',
      list: [
        'Trial sign-up form (name, business name, email address, optional menu or catalogue file, GDPR consent checkbox). Purpose: create and configure your trial account and contact you about it. Legal basis: your consent (checkbox) and, for the ensuing relationship, pre-contractual steps taken at your request. You can withdraw consent at any time.',
        'AI sommelier demo on the site (the text you type to describe a meal or a wish). Purpose: give you wine recommendations. Legal basis: providing the feature you request (legitimate interest). Do not enter personal data in this field.',
        'Demo booking through a HubSpot form (the information you enter in the form, for example your business contact details). Purpose: organise the demo and sales follow-up. Legal basis: pre-contractual steps at your request / legitimate interest in B2B prospecting.',
        'Audience statistics through Google Tag Manager and Google Analytics 4 (page views and actions on the site, no targeted advertising). Purpose: measure traffic and site effectiveness. Legal basis: your consent, given through the cookie banner.',
        'Technical server and hosting logs (IP address, date, pages requested). Purpose: security and proper operation of the site. Legal basis: legitimate interest.',
        `Emails sent to ${CONTACT}. Purpose: answer your request. Legal basis: legitimate interest or pre-contractual steps.`
      ]
    },
    {
      title: '3. Cookies and trackers',
      paragraphs: [
        'No audience tracker is loaded before you make a choice. If you click "Reject" or do not answer, Google Tag Manager is not loaded. Google consent signals (Consent Mode) are set to "denied" by default.'
      ],
      list: [
        'Remembering your choice (browser local storage and the "wineater_consent" cookie): strictly necessary, exempt from consent. Duration: 6 months, after which the banner is shown again.',
        'Google Tag Manager / Google Analytics (set only after you accept): audience measurement. First-party cookies "_ga" and "_ga_*"; lifetime: 13 months.',
        'You can change your choice at any time with the "Cookie settings" link in the footer. Rejecting is as easy as accepting.'
      ]
    },
    {
      title: '4. Recipients and processors',
      paragraphs: ['Your data can be accessed by authorised Wineater staff and by the following providers, acting as processors or third parties as the case may be:'],
      list: [
        'Vercel Inc. (hosting of the site and API);',
        'Supabase Pte. Ltd. (database and storage of files sent through the sign-up form);',
        'Google (Tag Manager, and Analytics where applicable; Gemini AI models used by the sommelier API to analyse the text typed in the demo);',
        'OpenAI (computing vector embeddings of the text typed in the demo);',
        'HubSpot (HubSpot Ireland Limited for the European Economic Area; demo booking form, "eu1" server);',
        'Hosts of external resources loaded by your browser: Supabase Storage (images, fonts), unpkg (widget script), and third-party sites for some partner and press logos. Your browser sends them your IP address when loading these resources;',
      ]
    },
    {
      title: '5. Transfers outside the European Union',
      paragraphs: [
        'Some of the providers listed above (notably Google, OpenAI, Vercel, Supabase, HubSpot) may process data outside the European Union, in particular in the United States. These transfers rely on the mechanisms provided by the GDPR: an adequacy decision (notably the Data Privacy Framework for certified US providers) or standard contractual clauses.'
      ]
    },
    {
      title: '6. Retention periods',
      list: [
        'Sign-up form data and uploaded file: 12 months from the last contact.',
        'Email exchanges: 12 months.',
        'Text typed in the demo: 12 months.',
        'Audience measurement data: up to 14 months (the longest period offered by Google Analytics 4).',
        'Proof of your cookie choice: 6 months.'
      ]
    },
    {
      title: '7. Your rights',
      paragraphs: [
        'You have the rights of access, rectification, erasure, restriction, objection and portability, the right to withdraw your consent at any time (without affecting the lawfulness of earlier processing) and the right to give instructions on what happens to your data after your death.',
        `To exercise these rights, write to ${CONTACT}. We may ask for proof of identity if in doubt. We reply within one month.`
      ]
    },
    {
      title: '8. Complaint to a supervisory authority',
      paragraphs: [
        'If you believe your rights are not respected, you can lodge a complaint with the supervisory authority of your country of residence or work, or with the Estonian authority competent for our establishment, the Estonian Data Protection Inspectorate (Andmekaitse Inspektsioon, www.aki.ee). In France this is the CNIL (www.cnil.fr).'
      ]
    },
    {
      title: '9. Security',
      paragraphs: [
        'We apply appropriate technical and organisational measures (encrypted HTTPS connections, restricted access to data).'
      ]
    },
    {
      title: '10. Changes',
      paragraphs: ['We may update this policy. The date of the last update is at the top of the page; if cookie practices change significantly, your choice will be requested again.']
    }
  ]
}

const termsFr: LegalDoc = {
  title: "Conditions d'utilisation - Wineater",
  description: "Conditions d'utilisation du site wineater.com et de la démonstration du sommelier IA.",
  h1: "Conditions d'utilisation du site",
  updated: '1 octobre 2026',
  intro: [
    "Ces conditions régissent l'accès et l'utilisation du site wineater.com (le « Site »), édité par BACCHUSTECH OÜ sous la marque Wineater (voir les mentions légales). En utilisant le Site, vous les acceptez. Elles ne remplacent pas le contrat applicable à l'offre commerciale Wineater, qui fait l'objet de documents distincts."
  ],
  sections: [
    {
      title: '1. Objet du Site',
      paragraphs: [
        "Le Site présente Wineater, un service de sommelier virtuel fondé sur l'intelligence artificielle destiné aux cavistes, restaurants et e-commerçants du vin, et propose une démonstration en ligne, un formulaire d'inscription à un essai et un accès à la prise de rendez-vous."
      ]
    },
    {
      title: '2. Démonstration et recommandations',
      paragraphs: [
        "Les recommandations de vins de la démonstration sont générées automatiquement à partir du texte que vous saisissez et d'un catalogue de démonstration. Elles sont fournies à titre indicatif, peuvent contenir des erreurs ou ne plus correspondre aux stocks, prix ou millésimes disponibles, et ne constituent pas une offre de vente.",
        "Ne saisissez pas de données personnelles ou confidentielles dans la démonstration."
      ]
    },
    {
      title: '3. Utilisation acceptable',
      paragraphs: ["Vous vous engagez à ne pas :"],
      list: [
        "perturber le fonctionnement du Site ou tenter d'accéder à des parties non publiques ;",
        "extraire massivement le contenu ou les recommandations (scraping) ou utiliser des moyens automatisés d'interrogation de la démonstration ;",
        "utiliser le Site à des fins illicites ou en violation de droits de tiers ;",
        "transmettre via le formulaire d'inscription des fichiers contenant des logiciels malveillants ou des données dont vous n'avez pas le droit de disposer."
      ]
    },
    {
      title: '4. Propriété intellectuelle',
      paragraphs: [
        "Le Site, sa marque, son code, ses textes et ses visuels sont la propriété de Wineater ou de ses concédants. Aucun droit n'est cédé par la simple consultation du Site. Les marques de tiers appartiennent à leurs propriétaires.",
        "Les fichiers que vous transmettez (par exemple une carte des vins) restent votre propriété ; vous nous autorisez à les utiliser uniquement pour configurer votre essai et vous contacter à ce sujet."
      ]
    },
    {
      title: '5. Responsabilité',
      paragraphs: [
        "Le Site est fourni « en l'état ». Wineater s'efforce d'en assurer la disponibilité et l'exactitude mais n'y est pas garanti, et ne peut être tenu responsable des interruptions, des erreurs de contenu ou des dommages indirects résultant de l'utilisation du Site, dans les limites autorisées par la loi. Ces limitations ne s'appliquent pas en cas de faute lourde ou dolosive, ni à l'égard des droits que la loi ne permet pas d'exclure.",
        "L'abus d'alcool est dangereux pour la santé. À consommer avec modération. Le Site s'adresse à des personnes majeures."
      ]
    },
    {
      title: '6. Liens et services tiers',
      paragraphs: [
        "Le Site peut contenir des liens vers des sites tiers (par exemple le formulaire HubSpot de prise de rendez-vous, LinkedIn). Wineater n'est pas responsable de leur contenu ni de leurs pratiques de confidentialité."
      ]
    },
    {
      title: '7. Données personnelles et cookies',
      paragraphs: ["Le traitement des données est décrit dans la politique de confidentialité (/privacy)."]
    },
    {
      title: '8. Modification des conditions',
      paragraphs: ["Wineater peut modifier ces conditions à tout moment ; la version en ligne à la date de votre consultation s'applique."]
    },
    {
      title: '9. Droit applicable et litiges',
      paragraphs: [
        "[À COMPLÉTER: droit applicable et juridiction compétente, à valider par le conseil juridique]",
        `Pour toute question : ${CONTACT}.`
      ]
    }
  ]
}

const termsEn: LegalDoc = {
  title: 'Terms of use - Wineater',
  description: 'Terms of use for wineater.com and the AI sommelier demo.',
  h1: 'Website terms of use',
  updated: '1 October 2026',
  intro: [
    'These terms govern access to and use of wineater.com (the "Site"), published by BACCHUSTECH OÜ under the Wineater brand (see the legal notice). By using the Site you accept them. They do not replace the contract that applies to the Wineater commercial offer, which is covered by separate documents. The French version is authoritative.'
  ],
  sections: [
    {
      title: '1. Purpose of the Site',
      paragraphs: [
        'The Site presents Wineater, an AI-based virtual sommelier for wine shops, restaurants and online wine sellers, and offers an online demo, a trial sign-up form and access to demo booking.'
      ]
    },
    {
      title: '2. Demo and recommendations',
      paragraphs: [
        'Wine recommendations in the demo are generated automatically from the text you type and a demo catalogue. They are indicative, may contain errors or no longer match available stock, prices or vintages, and are not an offer for sale.',
        'Do not enter personal or confidential data in the demo.'
      ]
    },
    {
      title: '3. Acceptable use',
      paragraphs: ['You agree not to:'],
      list: [
        'disrupt the operation of the Site or try to access non-public areas;',
        'mass-extract content or recommendations (scraping) or query the demo by automated means;',
        'use the Site for unlawful purposes or in breach of third-party rights;',
        'upload through the sign-up form files containing malware or data you have no right to share.'
      ]
    },
    {
      title: '4. Intellectual property',
      paragraphs: [
        'The Site, its brand, code, texts and visuals belong to Wineater or its licensors. Browsing the Site grants no rights. Third-party trademarks belong to their owners.',
        'Files you send (for example a wine list) remain yours; you allow us to use them only to set up your trial and contact you about it.'
      ]
    },
    {
      title: '5. Liability',
      paragraphs: [
        'The Site is provided "as is". Wineater strives to keep it available and accurate but does not guarantee this, and is not liable for interruptions, content errors or indirect damage resulting from use of the Site, to the extent permitted by law. These limits do not apply in cases of gross negligence or wilful misconduct, or to rights that cannot lawfully be excluded.',
        'Alcohol abuse is dangerous for your health. Please drink responsibly. The Site is intended for adults.'
      ]
    },
    {
      title: '6. Third-party links and services',
      paragraphs: [
        'The Site may link to third-party sites (for example the HubSpot demo booking form, LinkedIn). Wineater is not responsible for their content or privacy practices.'
      ]
    },
    {
      title: '7. Personal data and cookies',
      paragraphs: ['Data processing is described in the privacy policy (/privacy).']
    },
    {
      title: '8. Changes to the terms',
      paragraphs: ['Wineater may change these terms at any time; the online version on the date you visit applies.']
    },
    {
      title: '9. Governing law and disputes',
      paragraphs: [
        '[À COMPLÉTER: governing law and competent jurisdiction, to be confirmed by legal counsel]',
        `For any question: ${CONTACT}.`
      ]
    }
  ]
}

export const legalDocs: Record<LegalKey, Record<LegalLocale, LegalDoc>> = {
  legal: { fr: legalFr, en: legalEn },
  privacy: { fr: privacyFr, en: privacyEn },
  terms: { fr: termsFr, en: termsEn }
}
