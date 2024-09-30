/* Import modules. */
import { broadcast } from '@nexajs/provider'
import { getCoins } from '@nexajs/purse'
import { encodeNullData } from '@nexajs/script'
import {
    buildTokens,
    getTokens,
} from '@nexajs/token'

export default async function (_receivers) {
    /* Initialize locals. */
    let body
    let coins
    let nexaAddress
    let nullData
    // let publicKey
    let publicKeyHash
    let receivers
    let response
    let scriptPubKey
    // let scriptPushPubKey
    let tokenidHex
    let tokens
    let txResult
    let userData
    // let wif

    console.info('ADDRESS', this.address)
    console.info('WIF', this.wallet.wif)

    /* Set token id. */
    tokenidHex = _receivers[0].tokenid

    coins = await getCoins(this.wallet.wif)
        .catch(err => console.error(err))
    console.log('COINS', coins)

    tokens = await getTokens(this.wallet.wif)
        .catch(err => console.error(err))
    console.log('TOKENS', tokens)

    /* Filter tokens. */
    // NOTE: Currently limited to a "single" Id.
    tokens = tokens.filter(_token => {
        return _token.tokenidHex === tokenidHex
    })
    console.log('TOKENS (filtered):', tokens)

    userData = [
        'RAIN',
        `$NXY's 1st Airdrop`,
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)

    /* Finalize receivers (w/ message). */
    receivers = [
        {
            data: nullData,
        },
        ..._receivers,
    ]

    receivers.push({
        address: this.address,
    })
    console.log('RECEIVERS', receivers)

    /* Send UTXO request. */
    response = await buildTokens(coins, tokens, receivers)
    console.log('RAW TX', response.hex)
// return
    txResult = await broadcast(response.hex)
    console.log('TX RESULT', txResult)

    if (txResult.error) {
        console.error(txResult.error)
    }

    return txResult
}
