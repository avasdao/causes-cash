/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Locale
 */
const setLocale = (state, _locale) => {
    /* Set locale. */
    state.locale = msgpack.encode(_locale)
}

/* Export module. */
export default setLocale
