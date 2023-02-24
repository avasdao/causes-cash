/* Import modules. */
import Bugsnag from '@bugsnag/js'

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
        locale = state.locale
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Report error. */
        Bugsnag.notify(err)

        locale = state.locale // DEPRECATED in June '20
    }

    /* Return locale. */
    return locale
}

/* Export module. */
export default getLocale
