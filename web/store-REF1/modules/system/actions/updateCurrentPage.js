/**
 * Update Current Page
 */
const updateCurrentPage = ({ commit }, _page) => {
    /* Commit current page. */
    commit('setCurrentPage', _page)
}

/* Export module. */
export default updateCurrentPage
