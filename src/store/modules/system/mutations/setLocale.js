/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Locale
 */
const setLocale = (state, _locale) => {
    /* Set locale. */
    state.locale = msgpack.encode(_locale).toString('hex')
}

/* Export module. */
export default setLocale
