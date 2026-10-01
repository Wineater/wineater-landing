// v-reveal: fade-up once when a below-the-fold block scrolls into view.
// v-reveal:stagger staggers the element's direct children (60ms, capped at 5).
// Progressive enhancement: SSR HTML is fully visible; the hidden state (.rv) is
// added only on the client, only for elements below the viewport at mount, and
// never under prefers-reduced-motion. Styles live in assets/styles/main.scss.
export default defineNuxtPlugin((nuxtApp) => {
  let io: IntersectionObserver | undefined
  const reveal = (el: Element) => {
    el.classList.add('rv-in')
    io!.unobserve(el)
    setTimeout(() => el.classList.remove('rv', 'rv-in'), 1000) // back to natural CSS
  }
  nuxtApp.vueApp.directive('reveal', {
    mounted(el: HTMLElement, { arg }) {
      el.setAttribute('data-reveal', arg || '')
      if (!('IntersectionObserver' in window) || matchMedia('(prefers-reduced-motion: reduce)').matches) return
      if (el.getBoundingClientRect().top < innerHeight) return
      io ||= new IntersectionObserver(
        (es) => es.forEach((e) => e.isIntersecting && reveal(e.target)),
        { rootMargin: '0px 0px -6% 0px' },
      )
      el.classList.add('rv')
      io.observe(el)
    },
    getSSRProps: ({ arg }) => ({ 'data-reveal': arg || '' }),
  })
})
