/**
 * Get Asset Source
 *
 * Retrieves the latest source of data from our Eternal Db.
 */
const getAssetSource = (state, _assetType) => {
    /* Return source. */
    return state.assets[_assetType]
}

/* Export module. */
export default getAssetSource
