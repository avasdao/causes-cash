/**
* Get Asset
*/
const getAsset = (state) => (_assetOwner, _assetId, _assetType) => {
    // console.log('GET ASSET (state):', state)
    // console.log('GET ASSET (store.assets):', state.assets)
    // console.log('GET ASSET (_assetOwner):', _assetOwner)
    // console.log('GET ASSET (_assetId):', _assetId)
    // console.log('GET ASSET (_assetType):', _assetType)

    /* Set owner. */
    const owner = state.assets[_assetOwner]
    // console.log('GET ASSET (owner):', owner)

    /* Set asset id. */
    const assetId = `${_assetId}.${_assetType}`
    // console.log('SET ASSET (assetId):', assetId)

    /* Set asset. */
    const asset = owner[assetId]
    // console.log('GET ASSET (asset):', asset)

    /* Return asset. */
    return asset
}

/* Export module. */
export default getAsset
