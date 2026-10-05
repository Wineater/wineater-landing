// One signup entry for the whole site. With self-serve on (NUXT_PUBLIC_SELF_SERVE_URL), every
// "Try it free" opens app.wineater.com/signup; the manual-trial form (rendered in app.vue) stays
// for "Prefer we set it up for you?" and is the fallback when self-serve is switched off.
export const useSignup = () => {
  const open = useState<boolean>('signup-open', () => false)
  const { go } = useSelfServe()
  return {
    open,
    openSignup: (location = 'site') => {
      if (!go(location)) open.value = true
    },
    openManualTrial: () => { open.value = true },
    closeSignup: () => { open.value = false },
  }
}
