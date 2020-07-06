/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Get Locale
 */
const getLocale = (state) => {
    /* Validate state. */
    if (!state || !state.locale) {
        return null
    }

    /* Initialize locale. */
    let locale = null

    /* Initialize accounts. */
    try {
        locale = msgpack.decode(Buffer.from(state.locale, 'hex'))
    } catch (err) {
        console.error(err) // eslint-disable-line no-console
        locale = state.locale // DEPRECATED in June '20
    }

    /* Return locale. */
    return locale
}

/* Export module. */
export default getLocale
