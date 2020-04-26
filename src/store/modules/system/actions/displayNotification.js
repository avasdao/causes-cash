/**
 * Make Notification Message
 */
const displayNotification = ({ commit }, _notification) => {
    /* Commit notification message. */
    commit('setNotification', _notification)

    /* Set automatic dismiss delay. */
    setTimeout(() => {
        commit('setNotification', null)
    }, 5000)
}

/* Export module. */
export default displayNotification
