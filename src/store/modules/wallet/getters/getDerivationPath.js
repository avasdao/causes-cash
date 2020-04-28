/**
 * Get Derivation Path
 *
 * Based on (BIP-44) derivation paths.
 * (m / purpose' / coin_type' / account' / change / address_index)
 * source: https://github.com/bitcoin/bips/blob/master/bip-0044.mediawiki
 *
 * Nito provides native support for both Bitcoin Cash (BCH) and Ethereum (ETH).
 * Bitcoin Legacy (BTC) will be supported using compatible exchange APIs
 * (eg. Telr.Exchange).
 */
const getDerivationPath = () => (_wallet) => {
    /* Initialize derivation paths. */
    const derivationPaths = {
        /* Bitcoin Cash (BCH) */
        BCH: `m/44'/145'/0'`,

        /* Ethereum (ETH) */
        ETH: `m/44'/60'/0'`,

        /* Simple Ledger Protocol (SLP) */
        SLP: `m/44'/245'/0'`,
    }

    /* Return derivation path. */
    return derivationPaths[_wallet]
}

/* Export module. */
export default getDerivationPath
