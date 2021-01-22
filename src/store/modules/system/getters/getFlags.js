/* Import modules. */
import Bugsnag from '@bugsnag/js'
import msgpack from 'msgpack-lite'

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
        flags = msgpack.decode(Buffer.from(state.flags, 'hex'))
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
