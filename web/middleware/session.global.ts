/* Import stores. */
import { useProfileStore } from '@/stores/profile'

export default defineNuxtRouteMiddleware(async (to, from) => {
    // NOTE: We skip middleware on server.
    if (process.server) return

    /* Initialize locals. */
    let session

    /* Initialize Profile store. */
    const Profile = useProfileStore()

    /* Manage session. */
    session = await $fetch('/api/sessions', {
        method: 'POST',
        body: { sessionid: Profile.sessionid },
    })

    /* Update (client-side) session. */
    /* Sanitize client-side session. */
    session = {
        id: session.id,
        ...session,
    }

    delete session._id
    delete session._rev

    /* Save session. */
    Profile.saveSession(session)
})
