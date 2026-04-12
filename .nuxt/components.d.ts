
import type { DefineComponent, SlotsType } from 'vue'
type IslandComponent<T> = DefineComponent<{}, {refresh: () => Promise<void>}, {}, {}, {}, {}, {}, {}, {}, {}, {}, {}, SlotsType<{ fallback: { error: unknown } }>> & T

type HydrationStrategies = {
  hydrateOnVisible?: IntersectionObserverInit | true
  hydrateOnIdle?: number | true
  hydrateOnInteraction?: keyof HTMLElementEventMap | Array<keyof HTMLElementEventMap> | true
  hydrateOnMediaQuery?: string
  hydrateAfter?: number
  hydrateWhen?: boolean
  hydrateNever?: true
}
type LazyComponent<T> = DefineComponent<HydrationStrategies, {}, {}, {}, {}, {}, {}, { hydrated: () => void }> & T


export const ButtonsButton: typeof import("../components/Buttons/Button.vue")['default']
export const ButtonsLangSwitcher: typeof import("../components/Buttons/LangSwitcher.vue")['default']
export const ButtonsPreloader: typeof import("../components/Buttons/Preloader.vue")['default']
export const LandingComponentsAboutBanner: typeof import("../components/LandingComponents/AboutBanner.vue")['default']
export const LandingComponentsAlgorithmInfo: typeof import("../components/LandingComponents/AlgorithmInfo.vue")['default']
export const LandingComponentsBookDemoBanner: typeof import("../components/LandingComponents/BookDemoBanner.vue")['default']
export const LandingComponentsClientLogos: typeof import("../components/LandingComponents/ClientLogos.vue")['default']
export const LandingComponentsFooter: typeof import("../components/LandingComponents/Footer.vue")['default']
export const LandingComponentsForWhom: typeof import("../components/LandingComponents/ForWhom.vue")['default']
export const LandingComponentsHeader: typeof import("../components/LandingComponents/Header.vue")['default']
export const LandingComponentsHowItWorks: typeof import("../components/LandingComponents/HowItWorks.vue")['default']
export const LandingComponentsHowToStart: typeof import("../components/LandingComponents/HowToStart.vue")['default']
export const LandingComponentsPartners: typeof import("../components/LandingComponents/Partners.vue")['default']
export const LandingComponentsProblemBanner: typeof import("../components/LandingComponents/ProblemBanner.vue")['default']
export const LandingComponentsScienceBehind: typeof import("../components/LandingComponents/ScienceBehind.vue")['default']
export const LandingComponentsSignupForm: typeof import("../components/LandingComponents/SignupForm.vue")['default']
export const LandingComponentsSolutions: typeof import("../components/LandingComponents/Solutions.vue")['default']
export const LandingComponentsStartBanner: typeof import("../components/LandingComponents/StartBanner.vue")['default']
export const LandingComponentsStatisticBanner: typeof import("../components/LandingComponents/StatisticBanner.vue")['default']
export const LandingComponentsWidgetHome: typeof import("../components/LandingComponents/WidgetHome.vue")['default']
export const NuxtWelcome: typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']
export const NuxtLayout: typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']
export const NuxtErrorBoundary: typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']
export const ClientOnly: typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']
export const DevOnly: typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']
export const ServerPlaceholder: typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']
export const NuxtLink: typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']
export const NuxtLoadingIndicator: typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']
export const NuxtTime: typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']
export const NuxtRouteAnnouncer: typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']
export const NuxtImg: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']
export const NuxtPicture: typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']
export const NuxtLinkLocale: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']
export const SwitchLocalePathLink: typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']
export const NuxtPage: typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']
export const NoScript: typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']
export const Link: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']
export const Base: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']
export const Title: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']
export const Meta: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']
export const Style: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']
export const Head: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']
export const Html: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']
export const Body: typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']
export const SchemaOrgArticle: typeof import("@unhead/schema-org/vue")['SchemaOrgArticle']
export const SchemaOrgBreadcrumb: typeof import("@unhead/schema-org/vue")['SchemaOrgBreadcrumb']
export const SchemaOrgComment: typeof import("@unhead/schema-org/vue")['SchemaOrgComment']
export const SchemaOrgEvent: typeof import("@unhead/schema-org/vue")['SchemaOrgEvent']
export const SchemaOrgFoodEstablishment: typeof import("@unhead/schema-org/vue")['SchemaOrgFoodEstablishment']
export const SchemaOrgHowTo: typeof import("@unhead/schema-org/vue")['SchemaOrgHowTo']
export const SchemaOrgImage: typeof import("@unhead/schema-org/vue")['SchemaOrgImage']
export const SchemaOrgJobPosting: typeof import("@unhead/schema-org/vue")['SchemaOrgJobPosting']
export const SchemaOrgLocalBusiness: typeof import("@unhead/schema-org/vue")['SchemaOrgLocalBusiness']
export const SchemaOrgOrganization: typeof import("@unhead/schema-org/vue")['SchemaOrgOrganization']
export const SchemaOrgPerson: typeof import("@unhead/schema-org/vue")['SchemaOrgPerson']
export const SchemaOrgProduct: typeof import("@unhead/schema-org/vue")['SchemaOrgProduct']
export const SchemaOrgQuestion: typeof import("@unhead/schema-org/vue")['SchemaOrgQuestion']
export const SchemaOrgRecipe: typeof import("@unhead/schema-org/vue")['SchemaOrgRecipe']
export const SchemaOrgReview: typeof import("@unhead/schema-org/vue")['SchemaOrgReview']
export const SchemaOrgVideo: typeof import("@unhead/schema-org/vue")['SchemaOrgVideo']
export const SchemaOrgWebPage: typeof import("@unhead/schema-org/vue")['SchemaOrgWebPage']
export const SchemaOrgWebSite: typeof import("@unhead/schema-org/vue")['SchemaOrgWebSite']
export const SchemaOrgMovie: typeof import("@unhead/schema-org/vue")['SchemaOrgMovie']
export const SchemaOrgCourse: typeof import("@unhead/schema-org/vue")['SchemaOrgCourse']
export const SchemaOrgItemList: typeof import("@unhead/schema-org/vue")['SchemaOrgItemList']
export const SchemaOrgBook: typeof import("@unhead/schema-org/vue")['SchemaOrgBook']
export const SchemaOrgSoftwareApp: typeof import("@unhead/schema-org/vue")['SchemaOrgSoftwareApp']
export const NuxtIsland: typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']
export const LazyButtonsButton: LazyComponent<typeof import("../components/Buttons/Button.vue")['default']>
export const LazyButtonsLangSwitcher: LazyComponent<typeof import("../components/Buttons/LangSwitcher.vue")['default']>
export const LazyButtonsPreloader: LazyComponent<typeof import("../components/Buttons/Preloader.vue")['default']>
export const LazyLandingComponentsAboutBanner: LazyComponent<typeof import("../components/LandingComponents/AboutBanner.vue")['default']>
export const LazyLandingComponentsAlgorithmInfo: LazyComponent<typeof import("../components/LandingComponents/AlgorithmInfo.vue")['default']>
export const LazyLandingComponentsBookDemoBanner: LazyComponent<typeof import("../components/LandingComponents/BookDemoBanner.vue")['default']>
export const LazyLandingComponentsClientLogos: LazyComponent<typeof import("../components/LandingComponents/ClientLogos.vue")['default']>
export const LazyLandingComponentsFooter: LazyComponent<typeof import("../components/LandingComponents/Footer.vue")['default']>
export const LazyLandingComponentsForWhom: LazyComponent<typeof import("../components/LandingComponents/ForWhom.vue")['default']>
export const LazyLandingComponentsHeader: LazyComponent<typeof import("../components/LandingComponents/Header.vue")['default']>
export const LazyLandingComponentsHowItWorks: LazyComponent<typeof import("../components/LandingComponents/HowItWorks.vue")['default']>
export const LazyLandingComponentsHowToStart: LazyComponent<typeof import("../components/LandingComponents/HowToStart.vue")['default']>
export const LazyLandingComponentsPartners: LazyComponent<typeof import("../components/LandingComponents/Partners.vue")['default']>
export const LazyLandingComponentsProblemBanner: LazyComponent<typeof import("../components/LandingComponents/ProblemBanner.vue")['default']>
export const LazyLandingComponentsScienceBehind: LazyComponent<typeof import("../components/LandingComponents/ScienceBehind.vue")['default']>
export const LazyLandingComponentsSignupForm: LazyComponent<typeof import("../components/LandingComponents/SignupForm.vue")['default']>
export const LazyLandingComponentsSolutions: LazyComponent<typeof import("../components/LandingComponents/Solutions.vue")['default']>
export const LazyLandingComponentsStartBanner: LazyComponent<typeof import("../components/LandingComponents/StartBanner.vue")['default']>
export const LazyLandingComponentsStatisticBanner: LazyComponent<typeof import("../components/LandingComponents/StatisticBanner.vue")['default']>
export const LazyLandingComponentsWidgetHome: LazyComponent<typeof import("../components/LandingComponents/WidgetHome.vue")['default']>
export const LazyNuxtWelcome: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/welcome.vue")['default']>
export const LazyNuxtLayout: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-layout")['default']>
export const LazyNuxtErrorBoundary: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-error-boundary.vue")['default']>
export const LazyClientOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/client-only")['default']>
export const LazyDevOnly: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/dev-only")['default']>
export const LazyServerPlaceholder: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/server-placeholder")['default']>
export const LazyNuxtLink: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-link")['default']>
export const LazyNuxtLoadingIndicator: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-loading-indicator")['default']>
export const LazyNuxtTime: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-time.vue")['default']>
export const LazyNuxtRouteAnnouncer: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-route-announcer")['default']>
export const LazyNuxtImg: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtImg']>
export const LazyNuxtPicture: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-stubs")['NuxtPicture']>
export const LazyNuxtLinkLocale: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/NuxtLinkLocale")['default']>
export const LazySwitchLocalePathLink: LazyComponent<typeof import("../node_modules/@nuxtjs/i18n/dist/runtime/components/SwitchLocalePathLink")['default']>
export const LazyNuxtPage: LazyComponent<typeof import("../node_modules/nuxt/dist/pages/runtime/page")['default']>
export const LazyNoScript: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['NoScript']>
export const LazyLink: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Link']>
export const LazyBase: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Base']>
export const LazyTitle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Title']>
export const LazyMeta: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Meta']>
export const LazyStyle: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Style']>
export const LazyHead: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Head']>
export const LazyHtml: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Html']>
export const LazyBody: LazyComponent<typeof import("../node_modules/nuxt/dist/head/runtime/components")['Body']>
export const LazySchemaOrgArticle: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgArticle']>
export const LazySchemaOrgBreadcrumb: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgBreadcrumb']>
export const LazySchemaOrgComment: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgComment']>
export const LazySchemaOrgEvent: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgEvent']>
export const LazySchemaOrgFoodEstablishment: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgFoodEstablishment']>
export const LazySchemaOrgHowTo: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgHowTo']>
export const LazySchemaOrgImage: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgImage']>
export const LazySchemaOrgJobPosting: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgJobPosting']>
export const LazySchemaOrgLocalBusiness: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgLocalBusiness']>
export const LazySchemaOrgOrganization: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgOrganization']>
export const LazySchemaOrgPerson: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgPerson']>
export const LazySchemaOrgProduct: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgProduct']>
export const LazySchemaOrgQuestion: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgQuestion']>
export const LazySchemaOrgRecipe: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgRecipe']>
export const LazySchemaOrgReview: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgReview']>
export const LazySchemaOrgVideo: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgVideo']>
export const LazySchemaOrgWebPage: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgWebPage']>
export const LazySchemaOrgWebSite: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgWebSite']>
export const LazySchemaOrgMovie: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgMovie']>
export const LazySchemaOrgCourse: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgCourse']>
export const LazySchemaOrgItemList: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgItemList']>
export const LazySchemaOrgBook: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgBook']>
export const LazySchemaOrgSoftwareApp: LazyComponent<typeof import("@unhead/schema-org/vue")['SchemaOrgSoftwareApp']>
export const LazyNuxtIsland: LazyComponent<typeof import("../node_modules/nuxt/dist/app/components/nuxt-island")['default']>

export const componentNames: string[]
