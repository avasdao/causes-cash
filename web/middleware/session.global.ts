/* Import stores. */
import { useSystemStore } from '@/stores/system'

export default defineNuxtRouteMiddleware((to, from) => {
    // NOTE: We skip middleware on server.
    if (process.server) return

    /* Initialize locals. */
    let session

    /* Initialize System store. */
    const System = useSystemStore()

    // NOTE: Manage (non-blocking) sessions.
    ;(async () => {
        /* Manage session. */
        session = await $fetch('/api/sessions', {
            method: 'POST',
            body: { sessionid: System.sessionid },
        })

        /* Update (client-side) session. */
        /* Sanitize client-side session. */
        session = {
            id: session._id,
            ...session,
        }

        delete session._id
        delete session._rev

        /* Save session. */
        System.saveSession(session)
    })()
})
