/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const systemDb = new PouchDB(`https://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@${process.env.COUCHDB_ENDPOINT}/system`)

export default defineEventHandler(async (event) => {
    let response
    let statusCheck

    /* Request system status. */
    response = await systemDb.get('0')
        .catch(err => console.error(err))
    // console.log('RESPONSE', response)

    /* Set status check. */
    statusCheck = response?.statusCheck

    /* Set daily active users (DAU). */
    // FIXME FOR DEV PURPOSES ONLY
    const dau = 888

    /* Set # of CashFusion transactions. */
    // FIXME FOR DEV PURPOSES ONLY
    const campaigns = {
        last_24h: 0,
        last_30d: 0,
        total: 0,
    }

    /* Set monthly active users (MAU). */
    // FIXME FOR DEV PURPOSES ONLY
    const mau = 13370

    /* Set # of CashShuffle transactions. */
    // FIXME FOR DEV PURPOSES ONLY
    const pledges = {
        last_24h: 1337,
        last_30d: 30000,
        total: 1000000,
    }

    /* Build statistics. */
    const stats = {
        statusCheck,
        dau,
        campaigns,
        mau,
        pledges,
    }

    /* Return statistics. */
    return stats
})
