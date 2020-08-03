/* Import modules. */
import msgpack from 'msgpack-lite'

/**
 * Set Assets
 *
 * `_source` is an object, with a key used to describe the asset type.
 */
const setAssets = (state, _source) => {
    /* Retrieve current assets. */
    const assets = state.assets

    /* Update (merge) assets. */
    const updated = {
        ...assets,
        ..._source,
    }
    console.log('SYSTEM ASSETS (updated):', updated)

    /* Set updated (merged) assets. */
    state.assets = msgpack.encode(updated).toString('hex')
}

/* Export module. */
export default setAssets
