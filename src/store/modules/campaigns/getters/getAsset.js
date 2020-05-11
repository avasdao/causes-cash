/**
* Get Asset
*/
const getAsset = (state) => (_assetOwner, _assetId) => {
    // console.log('GET ASSET (state.assets):', state.assets)
    // console.log('GET ASSET (_assetOwner):', _assetOwner)
    // console.log('GET ASSET (_assetId):', _assetId)

    /* Set owner. */
    const owner = state.assets[_assetOwner]
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
