/* Import stores. */
import { useProfileStore } from '@/stores/profile'

export default defineNuxtRouteMiddleware(async (to, from) => {
    // NOTE: We skip middleware on server.
    if (process.server) return

    /* Initialize locals. */
    let session

    /* Initialize Profile store. */
    const Profile = useProfileStore()

    /* Update session. */
    if (Profile.sessionid) {
        session = await $fetch(`/api/sessions/${Profile.sessionid}`)
    } else {
        /* Request new session. */
        session = await $fetch(`/api/sessions`)
    }

    /* Validate session. */
    if (!session || session?._id !== Profile.sessionid) {
        /* Save session. */
        Profile.saveSession(session)
    }
})
