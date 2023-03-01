/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
 * Add Assurance
 */
const addAssurance = async ({ rootGetters }, _assurance) => {
    // console.log('ADD ASSURANCE:', _assurance)

    const signedPkg = rootGetters['profile/getSignedMessage'](JSON.stringify(_assurance))
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Retrieve API provider. */
    const API_PROVIDER = rootGetters.getApiProvider

    let target = null

    /* Set api target. */
    if (_assurance.flipstarter) {
        target = `${API_PROVIDER}/assurances/flipstarter`
    } else {
        target = `${API_PROVIDER}/assurances`
    }

    const result = await superagent
        .post(target)
        .send(signedPkg)
        .catch(Bugsnag.notify)
    // console.log('RESULT', result)

    /* Return result. */
    return result
}

/* Export module. */
export default addAssurance
