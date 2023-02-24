/* Import modules. */
const { ethers } = require('ethers')
const superagent = require('superagent')

/* Set ticker endpoint. */
const TICKER_ENDPOINT = 'https://api.telr.io/v1/ticker/quote/BCH'

/* Set constants. */
const RETRY_DELAY = 500 // 0.5 seconds
const RETRY_ATTEMPTS = 10 // approx. 5 seconds

/**
 * Initialize Blockchain
 *
 * Setup RPC node connections.
 */
const initBlockchain = async (_state, _commit, _getters) => {
    /* Initialize retries. */
    let retries = 0

    /* Request ticker. */
    const response = await superagent
        .get(TICKER_ENDPOINT)
        .catch(err => console.error(err))

    /* Validate response. */
    if (!response) {
        throw new Error('Failed to receive response from remote API.')
    }

    /* Set response body. */
    const body = response.body

    /* Validate body. */
    if (!body) {
        throw new Error('Failed to receive valid data from remote API.')
    }

    /* Set USD price. */
    const usd = body.price
    console.info('Campaign initialization (USD):', usd)

    /* Validate body. */
    if (!usd) {
        throw new Error('Failed to receive ticker price from remote API.')
    }

    /* Save USD price. */
    _commit('saveUsd', usd)

    /* Validate Web3 provider. */
    // if (!_getters || !_getters.getProvider) {
    if (!_getters) {
        // console.log('PROVIDER', _getters.getProvider);
        console.error('(Campaign) Blockchain init failed!')

        /* Validate retry attempts. */
        if (retries++ < RETRY_ATTEMPTS) {
            /* Pause and try again. */
            setTimeout(async () => {
                /* Initialize blockchain. */
                initBlockchain(_state, _commit, _getters)
            }, RETRY_DELAY)
        }
    }

    /* Initialize provider. */
    const provider = new ethers.providers
        .JsonRpcProvider(_getters.getProvider)
    // console.log('PROVIDER', provider)

    if (!provider) {
        // console.log('PROVIDER', _getters.getProvider);
        console.error('(Campaign) Provider init failed!')

        /* Validate retry attempts. */
        if (retries++ < RETRY_ATTEMPTS) {
            /* Pause and try again. */
            setTimeout(async () => {
                /* Initialize blockchain. */
                await initBlockchain(_state, _commit, _getters)
            }, RETRY_DELAY)
        }
    }

    /* Validate provider. */
    if (provider) {
        /* Request block number. */
        const blockNum = await provider
            .getBlockNumber()
            .catch(err => console.error(err))
        console.info('Current block height:', blockNum)

        /* Save block number. */
        _commit('saveBlockNum', blockNum)

        /* set provider flag. */
        _commit('saveProvider', true)
    }

}

/* Export module. */
module.exports = initBlockchain
