/**
 * Set Asset
 *
 * Allows us to update a stored asset resource.
 */
const setAsset = (state, _asset) => {
    /* Set asset owner. */
    const owner = _asset.owner

    // TODO: Validate owner.

    /* Set asset id. */
    const id = _asset.id
    // console.log('SET ASSET (id):', id)

    // TODO: Validate id.

    /* Set asset body. */
    const body = _asset.body
    // console.log('SET ASSET (body):', body)

    // TODO: Validate body.

    /* Validate owner assets. */
    if (!state.assets[owner]) {
        /* Initialize owner assets. */
        state.assets[owner] = {}
    }

    /* Update the asset resource. */
    state.assets[owner][id] = body
}

/* Export module. */
export default setAsset
