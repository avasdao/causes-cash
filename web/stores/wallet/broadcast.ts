/* Import modules. */
// import { sha256 } from '@nexajs/crypto'
// import { encodePrivateKeyWif } from '@nexajs/hdnode'

import { encodeAddress } from '@nexajs/address'

// import { sha256 } from '@nexajs/crypto'

import {
    getCoins,
    sendCoins,
} from '@nexajs/purse'

import {
    encodeNullData,
    OP,
} from '@nexajs/script'

import {
    getTokens,
    sendToken,
} from '@nexajs/token'

/* Libauth helpers. */
import {
    encodeDataPush,
    // instantiateRipemd160,
} from '@bitauth/libauth'

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
    console.log('\n  Coins:', coins)

    tokens = await getTokens(this.wallet.wif)
        .catch(err => console.error(err))
    console.log('\n  Tokens:', tokens)

    /* Filter tokens. */
    // NOTE: Currently limited to a "single" Id.
    tokens = tokens.filter(_token => {
        return _token.tokenidHex === tokenidHex
    })
    console.log('\n  Tokens (filtered):', tokens)

    userData = [
        'RAIN',
        `$NXL Holiday Airdrop`,
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)

    receivers = [
        {
            data: nullData,
        },
        ..._receivers,
    ]

//     _receivers.forEach(_receiver => {
//         receivers.push(        {
//             address: _receiver.address,
//             tokenid: tokenidHex, // TODO Allow auto-format conversion.
//             tokens: BigInt(_receiver.tokens),
//         },
// )
//     })

    receivers.push({
        address: this.address,
    })
    console.log('\n  Receivers:', receivers)
return
    /* Send UTXO request. */
    response = await sendToken(coins, tokens, receivers)
    console.log('Send UTXO (response):', response)

    try {
        txResult = JSON.parse(response)
        console.log('TX RESULT', txResult)

        if (txResult.error) {
            console.error(txResult.error)
        }
    } catch (err) {
        console.error(err)
    }

    return txResult
}
