/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
 * Get Flags
 */
const getFlags = (state) => {
    /* Validate state. */
    if (!state || !state.flags) {
        return null
    }

    /* Initialize flags. */
    let flags = null

    /* Initialize accounts. */
    try {
        flags = state.flags
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Report error. */
        Bugsnag.notify(err)

        flags = state.flags // DEPRECATED in June '20
    }

    /* Return flags. */
    return flags
}

/* Export module. */
export default getFlags
