/**
 * Self-serve sign-up (client cabinet, phase 4): the "Try it free" buttons open
 * app.wineater.com/signup instead of the manual-trial form. The form stays,
 * reachable from "Prefer we set it up for you?" next to the buttons.
 *
 * Off switch without a code change: NUXT_PUBLIC_SELF_SERVE_URL="" in Vercel.
 */
export function useSelfServe() {
  const config = useRuntimeConfig();
  const { locale } = useI18n();
  const base = String(config.public.selfServeUrl ?? '').trim();
  const enabled = base.length > 0;

  const signupUrl = (location: string) => {
    if (!enabled) return '';
    const u = new URL(base);
    u.searchParams.set('utm_source', 'landing');
    u.searchParams.set('utm_medium', 'cta');
    u.searchParams.set('utm_content', location);
    if (locale.value && locale.value !== 'en') u.searchParams.set('lang', locale.value);
    return u.toString();
  };

  const go = (location: string) => {
    if (!enabled || typeof window === 'undefined') return false;
    window.location.assign(signupUrl(location));
    return true;
  };

  return { enabled, signupUrl, go };
}
