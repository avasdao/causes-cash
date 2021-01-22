/* Import modules. */
import Bugsnag from '@bugsnag/js'
import msgpack from 'msgpack-lite'

/**
 * Get Asset Source
 *
 * Retrieves the latest source of data from our Eternal Db.
 */
const getAssetSource = (state, _assetType) => {
    /* Validate state. */
    if (!state || !state.assets) {
        return null
    }

    /* Initialize assets. */
    let assets = null

    /* Set assets. */
    try {
        assets = msgpack.decode(Buffer.from(state.assets, 'hex'))
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Report error. */
        Bugsnag.notify(err)

        assets = state.assets // DEPRECATED in June '20
    }

    /* Return source. */
    return assets[_assetType]
}

/* Export module. */
export default getAssetSource
