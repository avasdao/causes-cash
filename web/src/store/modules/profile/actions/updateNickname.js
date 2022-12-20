/**
 * Update Nickname
 */
const updateNickname = ({ commit }, _nickname) => {
    /* Commit nickname. */
    commit('setNickname', _nickname)
}

/* Export module. */
export default updateNickname
