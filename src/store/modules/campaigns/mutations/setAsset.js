/**
 * Set Asset
 *
 * Allows us to update a stored asset resource.
 */
const setAsset = (state, _asset) => {
    /* Set asset owner. */
    const owner = _asset.owner

    /* Set asset id. */
    const id = _asset.id

    /* Set asset type. */
    const type = _asset.type

    /* Set asset id. */
    const assetId = `${id}.${type}`
    // console.log('SET ASSET (assetId):', assetId)

    /* Set asset body. */
    const body = _asset.body
    // console.log('SET ASSET (body):', body)

    /* Validate owner assets. */
    if (!state.assets[owner]) {
        /* Initialize owner assets. */
        state.assets[owner] = {}
    }

    /* Update the asset resource. */
    state.assets[owner][assetId] = body
}

/* Export module. */
export default setAsset
