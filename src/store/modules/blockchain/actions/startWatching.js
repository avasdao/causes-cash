/**
 * Start Watching
 *
 * Pulls the latest asset source from our Eternal Db.
 */
const startWatching = async ({ commit }, _request) => {
    console.log('Start watching...', _request)

    /* Commit wallet's master seed. */
    commit('setWatching', _request)
}

/* Export module. */
export default startWatching
