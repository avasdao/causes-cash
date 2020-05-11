/* Import modules. */
import superagent from 'superagent'

/**
 * Update Asset
 */
const updateAsset = ({ commit }, _asset) => {
    /* Set asset owner. */
    const owner = _asset.owner
    // console.log('UPDATE ASSET (owner):', owner)

    /* Set asset id. */
    const id = _asset.id
    // console.log('UPDATE ASSET (id):', id)

    /* Set asset target. */
    const target = _asset.target
    // console.log('UPDATE ASSET (target):', target)

    /* Set asset path. */
    // FIXME: We should consider pulling this from an Eternal DB.
    // const path = 'QmRfhuMsXwJymiQ46rcryM3mdeXUKTG9PAjAyEQmAsdDSJ'
    // console.log('UPDATE ASSET (path):', path)

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
                return console.error(err) // eslint-disable-line no-console
            }

            /* Set response body. */
            const body = res.body || res.text
            // console.log('SUPERUSER (body):', body)

            /* Set asset. */
            const asset = {
                owner,
                id,
                body,
            }

            /* Commit asset resource. */
            commit('setAsset', asset)
        })
}

/* Export module. */
export default updateAsset
