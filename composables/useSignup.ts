// One signup modal for the whole site (rendered in app.vue). Any CTA calls openSignup().
export const useSignup = () => {
  const open = useState<boolean>('signup-open', () => false)
  return {
    open,
    openSignup: () => { open.value = true },
    closeSignup: () => { open.value = false },
  }
}
