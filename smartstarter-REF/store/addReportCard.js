/**
 * Add Report Card
 *
 * Allow authorized users to add a new Report Card.
 */
const addReportCard = (_commit) {
    _commit('showNotif', {
        icon: 'error',
        title: 'Authorization Error!',
        message: `You don't have permission to do that`,
    })
}

/* Export module. */
module.exports = addReportCard
