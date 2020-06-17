/**
 * Get Derivation Path
 *
 * Based on (BIP-44) derivation paths.
 * (m / purpose' / coin_type' / account' / change / address_index)
 * source: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 *
 * The `address_index` allows for an unlimited number of addresses to be
 * generated for each session.
 */
const getDerivationPath = () => (_chainId, _acctIndex) => {
    /* Return (hardened) derivation path. */
    return `m/44'/145'/0'/${_chainId}/${_acctIndex}`
}

/* Export module. */
export default getDerivationPath
