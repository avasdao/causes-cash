/* Initialize stores. */
import { useSystemStore } from '@/stores/system'

export default defineNuxtRouteMiddleware((to, from) => {
    console.log('SESSION MIDDLEWARE (to):', to)
    console.log('SESSION MIDDLEWARE (from):', from)

    /* Initialize System. */
    const System = useSystemStore()
    console.log('System.ONE_BITCOIN', System.ONE_BITCOIN)

    // if (to.params.id === '1') {
    //     return abortNavigation()
    // }

    // return navigateTo('/')
})
