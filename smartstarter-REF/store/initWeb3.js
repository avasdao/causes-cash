/* Set constants. */
const SMARTBCH_MAINNET_CHAINID = '0x2710'
const SMARTBCH_TESTNET_CHAINID = '0x2711'

/* Set constants. */
const RETRY_DELAY = 200 // 0.2 seconds
const RETRY_ATTEMPTS = 10 // approx. 2 seconds

let retries = 0

/**
*
 * Initialize Web3
 * Attempt to connect to the "injected" Web3 provider.
 * eg. MetaMask
 */
const initWeb3 = (_commit) => {
    if (window.ethereum && window.ethereum.chainId) {
        /* Set chain id. */
        // FIXME: This is DEPRECATED
        // https://docs.metamask.io/guide/provider-migration.html#handling-eth-chainid-return-values
        const chainId = window.ethereum.chainId
        console.log('CHAIN ID', chainId)

        /* Handle chain id. */
        if (chainId) {
            if (chainId === SMARTBCH_MAINNET_CHAINID) { // SmartBCH Mainnet
                /* Request network update. */
                _commit('saveNetwork', 'mainnet')
            } else if (chainId === SMARTBCH_TESTNET_CHAINID) { // SmartBCH Testnet
                /* Request network update. */
                _commit('saveNetwork', 'testnet')
            }
        } else {
            throw new Error('Oops! No CHAIN ID is available from the Web3 provider.')
        }

        console.info('Web3 has been loaded and the blockchain is ready to use.')
    } else {
        console.error('Web3 provider could NOT be found. Re-trying in 3, 2, 1..')

        /* Validate retry attempts. */
        if (retries++ < RETRY_ATTEMPTS) {
            /* Pause and try again. */
            setTimeout(() => {
                /* Initialize Web3. */
                initWeb3(_commit)
            }, RETRY_DELAY)
        } else {
            /* Set to (Mainnet) default. */
            // _commit('saveNetwork', 'mainnet')
            _commit('saveNetwork', 'testnet') // FOR DEV PURPOSES ONLY
        }
    }

}

/* Initialize module. */
module.exports = initWeb3
