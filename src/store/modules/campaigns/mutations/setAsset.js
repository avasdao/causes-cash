/* Import modules. */
const msgpack = require('msgpack-lite')

/**
 * Set Asset
 *
 * Allows us to update a stored asset resource.
 */
const setAsset = (state, _asset) => {
    /* Set asset owner slug. */
    const ownerSlug = _asset.ownerSlug

    // TODO: Validate owner slug.

    /* Set asset id. */
    const id = _asset.id
    // console.log('SET ASSET (id):', id)

    // TODO: Validate id.

    /* Set asset body. */
    const body = _asset.body
    // console.log('SET ASSET (body):', body)

    // TODO: Validate body.

    /* Validate assets. */
    if (!state.assets) {
        /* Initialize assets. */
        state.assets = {}
    }

    /* Validate owner assets. */
    if (!state.assets[ownerSlug]) {
        /* Initialize owner assets. */
        state.assets[ownerSlug] = {}
    }

    /* Update the asset resource. */
    state.assets[ownerSlug][id] = msgpack.encode(body)
}

/* Export module. */
export default setAsset
