/* Import modules. */
import superagent from 'superagent'

/**
 * Add Assurance
 */
const addAssurance = async ({ rootGetters }, _assurance) => {
    // console.log('ADD ASSURANCE:', _assurance)

    const signedPkg = rootGetters['profile/getSignedMessage'](JSON.stringify(_assurance))
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Set api target. */
    const target = 'http://localhost:6767/v1/assurance'
    // const target = 'https://api.causes.cash/v1/campaigns'

    const result = await superagent
        .post(target)
        .send(signedPkg)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default addAssurance
