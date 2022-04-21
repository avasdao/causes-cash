/* Import modules. */
import Bugsnag from '@bugsnag/js'

/**
 * Set Assets
 *
 * `_source` is an object, with a key used to describe the asset type.
 */
const setAssets = (state, _source) => {
    /* Initialize assets. */
    let assets = null

    /* Retrieve current assets. */
    // const assets = state.assets
    try {
        /* Validate assets. */
        if (state.assets) {
            assets = state.assets
        }
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Report error. */
        Bugsnag.notify(err)

        assets = state.assets
    }

    /* Update (merge) assets. */
    const updated = {
        ...assets,
        ..._source,
    }
    // console.log('SYSTEM ASSETS (updated):', updated)

    /* Set updated (merged) assets. */
    state.assets = updated
}

/* Export module. */
export default setAssets
