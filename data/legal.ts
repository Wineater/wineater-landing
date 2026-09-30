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
  updated: '[À COMPLÉTER: date de dernière mise à jour]',
  intro: [
    "Conformément à l'article 6 de la loi n° 2004-575 du 21 juin 2004 pour la confiance dans l'économie numérique (LCEN), voici les informations légales relatives au site wineater.com."
  ],
  sections: [
    {
      title: 'Éditeur du site',
      list: [
        'Raison sociale : [À COMPLÉTER: raison sociale]',
        'Forme juridique : [À COMPLÉTER: forme juridique]',
        'Capital social : [À COMPLÉTER: montant du capital]',
        'SIREN / RCS : [À COMPLÉTER: numéro SIREN et ville du RCS]',
        'Numéro de TVA intracommunautaire : [À COMPLÉTER: numéro de TVA]',
        'Adresse du siège social : [À COMPLÉTER: adresse du siège, Bordeaux]',
        `E-mail : ${CONTACT}`,
        'Téléphone : [À COMPLÉTER: numéro de téléphone à publier]'
      ]
    },
    {
      title: 'Directeur de la publication',
      paragraphs: ['[À COMPLÉTER: nom et qualité du directeur de la publication]']
    },
    {
      title: 'Hébergement',
      paragraphs: [
        "Le site est déployé sur la plateforme Vercel (projet Vercel rattaché au site dans le dépôt du code) : Vercel Inc., [À COMPLÉTER: vérifier la raison sociale et l'adresse postale de l'hébergeur].",
        "Les données du formulaire d'inscription sont stockées chez Supabase : [À COMPLÉTER: raison sociale, adresse et région d'hébergement de la base Supabase]."
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
  updated: '[À COMPLÉTER: date of last update]',
  intro: [
    'In accordance with Article 6 of French Law No. 2004-575 of 21 June 2004 on confidence in the digital economy (LCEN), this page sets out the legal information for wineater.com. The French version is authoritative.'
  ],
  sections: [
    {
      title: 'Publisher',
      list: [
        'Company name: [À COMPLÉTER: company name]',
        'Legal form: [À COMPLÉTER: legal form]',
        'Share capital: [À COMPLÉTER: share capital amount]',
        'SIREN / RCS: [À COMPLÉTER: SIREN number and RCS city]',
        'VAT number: [À COMPLÉTER: VAT number]',
        'Registered office: [À COMPLÉTER: registered office address, Bordeaux]',
        `Email: ${CONTACT}`,
        'Phone: [À COMPLÉTER: phone number to publish]'
      ]
    },
    {
      title: 'Publication director',
      paragraphs: ['[À COMPLÉTER: name and capacity of the publication director]']
    },
    {
      title: 'Hosting',
      paragraphs: [
        'The site is deployed on the Vercel platform (a Vercel project is linked to the site in the code repository): Vercel Inc., [À COMPLÉTER: verify the hosting provider legal name and postal address].',
        'Sign-up form data is stored with Supabase: [À COMPLÉTER: legal name, address and hosting region of the Supabase database].'
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
  updated: '[À COMPLÉTER: date de dernière mise à jour]',
  intro: [
    "Cette politique explique comment Wineater traite vos données personnelles lorsque vous utilisez le site wineater.com, conformément au Règlement (UE) 2016/679 (RGPD) et à la loi Informatique et Libertés."
  ],
  sections: [
    {
      title: '1. Responsable du traitement',
      paragraphs: [
        "Le responsable du traitement est [À COMPLÉTER: raison sociale et forme juridique], dont le siège est situé [À COMPLÉTER: adresse du siège, Bordeaux] (voir les mentions légales).",
        `Contact pour toute question relative aux données personnelles : ${CONTACT}. [À COMPLÉTER: délégué à la protection des données, s'il a été désigné]`
      ]
    },
    {
      title: '2. Données collectées, finalités et bases légales',
      list: [
        "Formulaire d'inscription à l'essai (nom, nom de l'établissement, adresse e-mail, fichier de carte ou de catalogue facultatif, case de consentement RGPD). Finalité : créer et configurer votre compte d'essai, vous contacter à ce sujet. Base légale : votre consentement (case à cocher) et, pour la suite de la relation, les mesures précontractuelles prises à votre demande. Vous pouvez retirer votre consentement à tout moment.",
        "Démonstration du sommelier IA sur le site (texte que vous saisissez pour décrire un repas ou une envie). Finalité : vous fournir des recommandations de vins. Base légale : exécution de la fonction que vous demandez (intérêt légitime de fournir le service demandé). Ne saisissez pas de données personnelles dans ce champ.",
        "Prise de rendez-vous de démonstration via un formulaire HubSpot (les champs sont définis dans ce formulaire : [À COMPLÉTER: liste des champs du formulaire HubSpot]). Finalité : organiser la démonstration et le suivi commercial. Base légale : mesures précontractuelles à votre demande / intérêt légitime de prospection B2B.",
        "Statistiques d'audience via Google Tag Manager et les balises qu'il déclenche ([À COMPLÉTER: lister les balises actives dans le conteneur GTM-NLBPMC7X, par exemple Google Analytics 4]). Finalité : mesurer la fréquentation et l'efficacité du site. Base légale : votre consentement, donné via le bandeau cookies.",
        "Enregistrement de sessions via OpenReplay (pages visitées, mouvements de souris, clics, défilement, informations techniques du navigateur ; le contenu saisi dans les champs de formulaire est masqué). Finalité : comprendre les difficultés d'usage et améliorer le site. Base légale : votre consentement, donné via le bandeau cookies.",
        "Journaux techniques des serveurs et de l'hébergeur (adresse IP, date, pages demandées). Finalité : sécurité et bon fonctionnement du site. Base légale : intérêt légitime.",
        `Courriers électroniques envoyés à ${CONTACT}. Finalité : répondre à votre demande. Base légale : intérêt légitime ou mesures précontractuelles.`
      ]
    },
    {
      title: '3. Cookies et traceurs',
      paragraphs: [
        "Aucun traceur d'audience ni d'enregistrement de session n'est chargé avant votre choix. Si vous cliquez sur « Refuser » ou ne répondez pas, Google Tag Manager et OpenReplay ne sont pas chargés. Les signaux de consentement Google (Consent Mode) sont positionnés sur « refusé » par défaut."
      ],
      list: [
        "Mémorisation de votre choix (stockage local du navigateur et cookie « wineater_consent ») : strictement nécessaire, exempté de consentement. Durée : 6 mois, après quoi le bandeau vous est proposé à nouveau.",
        "Google Tag Manager / Google Analytics (déposés uniquement après acceptation) : mesure d'audience. Durée de vie des cookies : [À COMPLÉTER: durée configurée, 13 mois maximum recommandés par la CNIL].",
        "OpenReplay (uniquement après acceptation) : enregistrement de sessions. Identifiants de session stockés dans le navigateur : [À COMPLÉTER: durée].",
        "Vous pouvez modifier votre choix à tout moment avec le lien « Paramètres des cookies » en pied de page. Refuser est aussi simple qu'accepter."
      ]
    },
    {
      title: '4. Destinataires et sous-traitants',
      paragraphs: ["Vos données sont accessibles aux personnes habilitées de Wineater et aux prestataires suivants, agissant en qualité de sous-traitants ou de tiers selon le cas :"],
      list: [
        "Vercel (hébergement du site et de l'API) ;",
        "Supabase (base de données et stockage des fichiers transmis via le formulaire d'inscription) ;",
        "Google (Tag Manager, et Analytics le cas échéant ; modèles d'IA Gemini utilisés par l'API du sommelier pour analyser le texte saisi dans la démonstration) ;",
        "OpenAI (calcul d'empreintes vectorielles du texte saisi dans la démonstration) ;",
        "OpenReplay (enregistrement de sessions) : [À COMPLÉTER: version cloud ou hébergement propre, pays d'hébergement] ;",
        "HubSpot (formulaire de prise de rendez-vous de démonstration, serveur « eu1 ») ;",
        "Hébergeurs de ressources externes chargées par votre navigateur : Supabase Storage (images, polices), unpkg (script du widget), et des sites tiers pour certains logos partenaires et presse. Votre navigateur leur transmet votre adresse IP lors du chargement ;",
        "[À COMPLÉTER: autres prestataires (messagerie, CRM, outils d'envoi d'e-mails)]."
      ]
    },
    {
      title: '5. Transferts hors de l’Union européenne',
      paragraphs: [
        "Certains prestataires cités ci-dessus (notamment Google, OpenAI, Vercel, Supabase, HubSpot, OpenReplay) peuvent traiter des données hors de l'Union européenne, en particulier aux États-Unis. Ces transferts sont encadrés par [À COMPLÉTER: mécanisme pour chaque prestataire : décision d'adéquation / cadre Data Privacy Framework, clauses contractuelles types]."
      ]
    },
    {
      title: '6. Durées de conservation',
      list: [
        "Données du formulaire d'inscription et fichier transmis : [À COMPLÉTER: durée de conservation, par exemple à compter du dernier contact].",
        "Échanges par e-mail : [À COMPLÉTER: durée].",
        "Texte saisi dans la démonstration : [À COMPLÉTER: durée de conservation des requêtes côté API].",
        "Données de mesure d'audience : [À COMPLÉTER: durée de conservation dans l'outil d'analyse].",
        "Enregistrements de sessions : [À COMPLÉTER: durée de conservation dans OpenReplay].",
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
      title: '8. Réclamation auprès de la CNIL',
      paragraphs: [
        "Si vous estimez que vos droits ne sont pas respectés, vous pouvez introduire une réclamation auprès de la Commission nationale de l'informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, www.cnil.fr."
      ]
    },
    {
      title: '9. Sécurité',
      paragraphs: [
        "Nous mettons en œuvre des mesures techniques et organisationnelles adaptées (connexions chiffrées HTTPS, accès restreints aux données). [À COMPLÉTER: compléter avec les mesures réellement en place]"
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
  updated: '[À COMPLÉTER: date of last update]',
  intro: [
    'This policy explains how Wineater processes your personal data when you use wineater.com, in accordance with Regulation (EU) 2016/679 (GDPR) and the French Data Protection Act. The French version is authoritative.'
  ],
  sections: [
    {
      title: '1. Data controller',
      paragraphs: [
        'The data controller is [À COMPLÉTER: company name and legal form], with registered office at [À COMPLÉTER: registered office address, Bordeaux] (see the legal notice).',
        `Contact for any personal data question: ${CONTACT}. [À COMPLÉTER: data protection officer, if one has been appointed]`
      ]
    },
    {
      title: '2. Data collected, purposes and legal bases',
      list: [
        'Trial sign-up form (name, business name, email address, optional menu or catalogue file, GDPR consent checkbox). Purpose: create and configure your trial account and contact you about it. Legal basis: your consent (checkbox) and, for the ensuing relationship, pre-contractual steps taken at your request. You can withdraw consent at any time.',
        'AI sommelier demo on the site (the text you type to describe a meal or a wish). Purpose: give you wine recommendations. Legal basis: providing the feature you request (legitimate interest). Do not enter personal data in this field.',
        'Demo booking through a HubSpot form (the fields are set in that form: [À COMPLÉTER: list of HubSpot form fields]). Purpose: organise the demo and sales follow-up. Legal basis: pre-contractual steps at your request / legitimate interest in B2B prospecting.',
        'Audience statistics through Google Tag Manager and the tags it triggers ([À COMPLÉTER: list of tags active in container GTM-NLBPMC7X, for example Google Analytics 4]). Purpose: measure traffic and site effectiveness. Legal basis: your consent, given through the cookie banner.',
        'Session recording through OpenReplay (pages visited, mouse movements, clicks, scrolling, technical browser information; text typed into form fields is masked). Purpose: understand usability problems and improve the site. Legal basis: your consent, given through the cookie banner.',
        'Technical server and hosting logs (IP address, date, pages requested). Purpose: security and proper operation of the site. Legal basis: legitimate interest.',
        `Emails sent to ${CONTACT}. Purpose: answer your request. Legal basis: legitimate interest or pre-contractual steps.`
      ]
    },
    {
      title: '3. Cookies and trackers',
      paragraphs: [
        'No audience or session-recording tracker is loaded before you make a choice. If you click "Reject" or do not answer, Google Tag Manager and OpenReplay are not loaded. Google consent signals (Consent Mode) are set to "denied" by default.'
      ],
      list: [
        'Remembering your choice (browser local storage and the "wineater_consent" cookie): strictly necessary, exempt from consent. Duration: 6 months, after which the banner is shown again.',
        'Google Tag Manager / Google Analytics (set only after you accept): audience measurement. Cookie lifetime: [À COMPLÉTER: configured duration, 13 months maximum recommended by the CNIL].',
        'OpenReplay (only after you accept): session recording. Session identifiers stored in the browser: [À COMPLÉTER: duration].',
        'You can change your choice at any time with the "Cookie settings" link in the footer. Rejecting is as easy as accepting.'
      ]
    },
    {
      title: '4. Recipients and processors',
      paragraphs: ['Your data can be accessed by authorised Wineater staff and by the following providers, acting as processors or third parties as the case may be:'],
      list: [
        'Vercel (hosting of the site and API);',
        'Supabase (database and storage of files sent through the sign-up form);',
        'Google (Tag Manager, and Analytics where applicable; Gemini AI models used by the sommelier API to analyse the text typed in the demo);',
        'OpenAI (computing vector embeddings of the text typed in the demo);',
        'OpenReplay (session recording): [À COMPLÉTER: cloud or self-hosted, hosting country];',
        'HubSpot (demo booking form, "eu1" server);',
        'Hosts of external resources loaded by your browser: Supabase Storage (images, fonts), unpkg (widget script), and third-party sites for some partner and press logos. Your browser sends them your IP address when loading these resources;',
        '[À COMPLÉTER: other providers (email, CRM, emailing tools)].'
      ]
    },
    {
      title: '5. Transfers outside the European Union',
      paragraphs: [
        'Some of the providers listed above (notably Google, OpenAI, Vercel, Supabase, HubSpot, OpenReplay) may process data outside the European Union, in particular in the United States. These transfers are covered by [À COMPLÉTER: mechanism for each provider: adequacy decision / Data Privacy Framework, standard contractual clauses].'
      ]
    },
    {
      title: '6. Retention periods',
      list: [
        'Sign-up form data and uploaded file: [À COMPLÉTER: retention period, for example from last contact].',
        'Email exchanges: [À COMPLÉTER: period].',
        'Text typed in the demo: [À COMPLÉTER: retention period for queries on the API side].',
        'Audience measurement data: [À COMPLÉTER: retention period in the analytics tool].',
        'Session recordings: [À COMPLÉTER: retention period in OpenReplay].',
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
      title: '8. Complaint to the CNIL',
      paragraphs: [
        'If you believe your rights are not respected, you can lodge a complaint with the French data protection authority, the Commission nationale de l\'informatique et des libertés (CNIL), 3 place de Fontenoy, TSA 80715, 75334 Paris Cedex 07, France, www.cnil.fr.'
      ]
    },
    {
      title: '9. Security',
      paragraphs: [
        'We apply appropriate technical and organisational measures (encrypted HTTPS connections, restricted access to data). [À COMPLÉTER: complete with the measures actually in place]'
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
  updated: '[À COMPLÉTER: date de dernière mise à jour]',
  intro: [
    "Ces conditions régissent l'accès et l'utilisation du site wineater.com (le « Site »), édité par Wineater (voir les mentions légales). En utilisant le Site, vous les acceptez. Elles ne remplacent pas le contrat applicable à l'offre commerciale Wineater, qui fait l'objet de documents distincts."
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
        "Ces conditions sont soumises au droit français. [À COMPLÉTER: juridiction compétente, par exemple tribunaux du ressort du siège, à valider par le conseil juridique]",
        `Pour toute question : ${CONTACT}.`
      ]
    }
  ]
}

const termsEn: LegalDoc = {
  title: 'Terms of use - Wineater',
  description: 'Terms of use for wineater.com and the AI sommelier demo.',
  h1: 'Website terms of use',
  updated: '[À COMPLÉTER: date of last update]',
  intro: [
    'These terms govern access to and use of wineater.com (the "Site"), published by Wineater (see the legal notice). By using the Site you accept them. They do not replace the contract that applies to the Wineater commercial offer, which is covered by separate documents. The French version is authoritative.'
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
        'These terms are governed by French law. [À COMPLÉTER: competent jurisdiction, for example courts of the registered office, to be confirmed by legal counsel]',
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
