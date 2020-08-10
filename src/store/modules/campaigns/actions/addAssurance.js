/* Import modules. */
import superagent from 'superagent'

/**
 * Add Assurance
 */
const addAssurance = async ({ rootGetters }, _assurance) => {
    // console.log('ADD ASSURANCE:', _assurance)

    const signedPkg = rootGetters['profile/getSignedMessage'](JSON.stringify(_assurance))
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    /* Set api target. */
    const target = `${API_PROVIDER}/assurances`

    const result = await superagent
        .post(target)
        .send(signedPkg)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default addAssurance
