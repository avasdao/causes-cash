/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
 * Update Asset
 */
const updateAsset = ({ commit }, _asset) => {
    /* Set asset owner slug. */
    const ownerSlug = _asset.ownerSlug
    // console.log('UPDATE ASSET (ownerSlug):', ownerSlug)

    /* Set asset id. */
    const id = _asset.id
    // console.log('UPDATE ASSET (id):', id)

    /* Set asset body. */
    const body = _asset.body
    // console.log('UPDATE ASSET (body):', body)

    /* Set asset target. */
    const target = _asset.target
    // console.log('UPDATE ASSET (target):', target)

    /* Validate target. */
    if (target) {
        /* Initialize target URL. */
        let targetUrl = null

        /* Set target URL. */
        // targetUrl = `https://ipfs.io/ipfs/${path}/${id}.${type}.md`
        targetUrl = `https://ipfs.io/ipfs/${target}`
        // console.log('UPDATE ASSET (targetUrl):', targetUrl)

        /* Make request. */
        superagent
            .get(targetUrl)
            .end((err, res) => {
                if (err) {
                    console.error(err) // eslint-disable-line no-console

                    /* Report error. */
                    return Bugsnag.notify(err)
                }

                /* Set response body. */
                const body = res.body || res.text
                // console.log('SUPERUSER (body):', body)

                /* Set asset. */
                const asset = {
                    ownerSlug,
                    id,
                    body,
                }

                /* Commit asset resource. */
                commit('setAsset', asset)
            })
            .catch(Bugsnag.notify)
    }

    /* Validate body. */
    if (body) {
        /* Set asset. */
        const asset = {
            ownerSlug,
            id,
            body,
        }

        /* Commit asset resource. */
        commit('setAsset', asset)
    }

}

/* Export module. */
export default updateAsset
