export default defineNuxtRouteMiddleware((to, from) => {
    console.log('ADMIN MIDDLEWARE (to):', to)
    console.log('ADMIN MIDDLEWARE (from):', from)

    if (to.params.id === '1') {
        return abortNavigation()
    }

    // return navigateTo('/')
})
