/* Import modules. */
const msgpack = require('msgpack-lite')

/**
* Get Asset
*/
const getAsset = (state) => (_ownerSlug, _assetId) => {
    // console.log('GET ASSET (state.assets):', state.assets)
    // console.log('GET ASSET (_ownerSlug):', _ownerSlug)
    // console.log('GET ASSET (_assetId):', _assetId)

    /* Validate state. */
    if (!state || !state.assets) {
        return null
    }

    /* Set owner. */
    const owner = msgpack.decode(Buffer.from(state.assets[_ownerSlug]))
    // console.log('GET ASSET (owner):', owner)

    /* Validate owner. */
    if (!owner) {
        return null
    }

    /* Set asset. */
    const asset = owner[_assetId]
    // console.log('GET ASSET (asset):', asset)

    /* Return asset. */
    return asset
}

/* Export module. */
export default getAsset
