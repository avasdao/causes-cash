/* Import stores. */
import { useProfileStore } from '@/stores/profile'
// import { useSystemStore } from '@/stores/system'

/* Initialize stores. */
const Profile = useProfileStore()
// const System = useSystemStore()

export default defineNuxtRouteMiddleware(async (to, from) => {
    // NOTE: We skip middleware on server.
    if (process.server) return

    /* Initialize locals. */
    let session

    // NOTE: Manage (non-blocking) sessions.
    // ;(async () => {
        /* Manage session. */
        session = await $fetch('/api/sessions', {
            method: 'POST',
            body: { sessionid: Profile.sessionid },
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
        Profile.saveSession(session)
    // })()
})
