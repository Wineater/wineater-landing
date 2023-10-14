export default defineNuxtRouteMiddleware((to, from) => {
  if (to.path !== from.path && process.client) {
    window.scrollTo(0, 0)
    console.log(6666);
  }
})
