/**
 * Add Imported Seed
 *
 * Funds from the account of an "ephemeral" wallet can be directly imported
 * into the primary wallet.
 *
 * NOTE: "Ephemeral" wallets are created from UUIDs contained within the
 *       querystring of the URL, eg:
 *       (https://nito.cash?d7b617d6-fa97-41aa-a54d-4498cbbd893e)
 */
const addImportedSeed = ({ commit, state }, _seed) => {
    /* Validate new seed (for duplicates). */
    if (state.importedSeeds.includes(_seed)) {
        console.log(_seed, 'has already been imported to this wallet')
    } else {
        console.log('Importing new seed to wallet', _seed)

        /* Set imported seeds. */
        // NOTE: Cloning with ES6 spread operator.
        const importedSeeds = [...state.importedSeeds]

        /* Add new seed to pool. */
        importedSeeds.push(_seed)

        /* Commit new seed pool. */
        commit('setImportedSeeds', importedSeeds)
    }
}

/* Export module. */
export default addImportedSeed
