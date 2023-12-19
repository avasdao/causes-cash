/**
 * DotEnv (Middleware)
 *
 * Replicates the `process.env` capabilities offered from packages,
 * e.g. `dotenv`; by injected all variables into the applications
 * client-side environment.
 */
export default defineNuxtRouteMiddleware((to, from) => {
    // NOTE: We skip middleware on server.
    if (process.server) return

    /* Retrieve runtime configuration. */
    const runtimeConfig = useRuntimeConfig()
    // console.log('MIDDLEWHARE RUNTIME', runtimeConfig)

    /* Set "public" configuration to "client" environment. */
    process.env = runtimeConfig.public
    // console.log('MIDDLEWHARE PROCESS', process)
})
