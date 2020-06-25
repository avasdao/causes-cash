/**
 * Update Email Address
 */
const updateEmail = ({ commit }, _email) => {
    /* Commit email. */
    commit('setEmail', _email)
}

/* Export module. */
export default updateEmail
