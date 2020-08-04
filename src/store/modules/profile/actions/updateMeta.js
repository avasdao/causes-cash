/* Import modules. */
const crypto = require('crypto')
import superagent from 'superagent'

/**
 * Encrypt
 *
 * Uses AES-256-CBC to encrypt a plaintext string.
 */
function _encrypt(_plaintext, _key, _algo = 'aes-256-cbc') {
    /* Generate initilization vector. */
    const iv = crypto.randomBytes(16)

    /* Initialize cipher. */
    const cipher = crypto.createCipheriv(_algo, Buffer.from(_key), iv)

    /* Update cipher. */
    let encrypted = cipher.update(_plaintext)

    /* Finalize cipher. */
    encrypted = Buffer.concat([encrypted, cipher.final()])

    /* Return encrypted package. */
    return {
        iv: iv.toString('hex'),
        body: encrypted.toString('hex')
    }
}

/**
 * Update Metadata
 *
 * Metadata is used to store details about addresses.
 */
const updateMeta = async ({ commit, getters }, _meta) => {
    /* Commit metadata. */
    commit('setMeta', _meta)

    const key = getters.getMasterSeed
    console.log('MASTER SEED (key)', key)

    /**
     * Encrypt Metadata
     *
     * For convenience reasons, all metadata is stored in the platform's
     * data repository. For privacy reasons, ALL metadata is first encrypted
     * with a key ONLY know to this profile.
     */
    const encrypted = _encrypt(JSON.stringify(_meta), key)
    console.log('UPDATE META (encrypted):', encrypted)

    const signedPkg = getters.getSignedMessage(encrypted)
    // console.log('SIGNED PACKAGE', signedPkg)

    /* Set api target. */
    const target = 'http://localhost:6767/v1/meta'
    // const target = 'https://api.causes.cash/v1/meta'

    const result = await superagent
        .post(target)
        .send(signedPkg)
    console.log('RESULT', result)

}

/* Export module. */
export default updateMeta

/**
 *
 * {
 *   "addresses": [{
 *     <address>: {
 *       "label": <string>,
 *       "comment": <string>,
 *       "lock": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "campaignid": <string>,
 *         "createdAt": <datetime>,
 *         "expiresAt": <datetime>
 *       }
 *     }
 *   }],
 * }
 *
 * Metadata is used to store details about coins.
 *
 * {
 *   "coins": [{
 *     <coinid>: {
 *       "label": <string>,
 *       "comment": <string>,
 *       "cashfusion": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "rounds": <integer>,
 *         "createdAt": <datetime>,
 *         "updatedAt": <datetime>
 *       },
 *       "cashshuffle": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "rounds": <integer>,
 *         "createdAt": <datetime>,
 *         "updatedAt": <datetime>
 *       },
 *       "lock": {
 *         "isActive": <boolean>,
 *         "label": <string>,
 *         "comment": <string>,
 *         "campaignid": <string>,
 *         "createdAt": <datetime>,
 *         "expiresAt": <datetime>
 *       }
 *     }
 *   }]
 * }
 */
