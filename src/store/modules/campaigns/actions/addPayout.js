/* Import modules. */
import superagent from 'superagent'

/**
 * Add Payout
 */
const addPayout = async ({ rootGetters }, _payout) => {
    /* Sign message. */
    const signedPkg = rootGetters['profile/getSignedMessage'](JSON.stringify(_payout))
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Set api target. */
    const target = 'http://localhost:6767/v1/payouts'
    // const target = 'https://api.causes.cash/v1/payouts'

    /* Make remote call. */
    const result = await superagent
        .post(target)
        .send(signedPkg)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default addPayout
