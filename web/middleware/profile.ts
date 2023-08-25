export default defineNuxtRouteMiddleware((to, from) => {
    // console.log('OWNER MIDDLEWARE (to):', to)
    // console.log('OWNER MIDDLEWARE (from):', from)

    if (to.params.id === '1') {
        return abortNavigation()
    }

    // return navigateTo('/')
})
