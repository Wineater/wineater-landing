import {startTracker} from '../utils/tracker'

export default defineNuxtPlugin( (nuxtApp) => {

  return {
    provide: {
      startTracking: () => {
        let config = useRuntimeConfig().public

        let {userId} = startTracker({
          projectKey: 'XkscRWp9UTyrXtkhPbQV'
        })
        //Optional if you need it
        // let uid = useUserId()
        // uid.value = userId
      }
    }
  }
})
