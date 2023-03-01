/**
 * Update Locale
 */
const updateLocale = ({ commit }, _locale) => {
    /* Commit locale. */
    commit('setLocale', _locale)
}

/* Export module. */
export default updateLocale
