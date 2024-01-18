/* Import (test) modules. */
import { v4 as uuidv4 } from 'uuid'

import { encodeAddress } from '@nexajs/address'

import {
    ripemd160,
    sha256,
} from '@nexajs/crypto'

/* Import library modules. */
import { getCoins } from '@nexajs/purse'

/* Import (individual) modules. */
import {
    encodeDataPush,
    encodeNullData,
    OP,
} from '@nexajs/script'

import {
    getTokens,
    sendToken,
} from '@nexajs/token'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Libauth helpers. */
import { instantiateSecp256k1 } from '@bitauth/libauth'

/* Initialize stores. */
import { useWalletStore } from '@/stores/wallet'
const Wallet = useWalletStore()

/* Initialize TradingPost (v2). */
const TRADING_POST_HEX = '6c6c6c6c00c7517f7c76010087636d00677f7501207f756852cd517f7c76010087636d00677f7501207f756888030051147c7e51cd8851cc767b950210279652cd517f7c76010087636d00677f77517f7c76010087636d00677f7581686878a16900c7517f7c76010087636d00677f77517f7c76010087636d00677f758168689f6300cd01217f76517f6e7c817f7700c701217f76517f6e7c817f775979557988557978886d6d6d6d6d687b950210279602220278a16353cc78a2690300511452797e53cd7888756855c478a169c4788ca26353cd517f7c76010087636d00677f7501207f756881009d68c49c6354cd517f7c76010087636d00677f7501207f756881009d686d'

let secp256k1

;(async () => {
    /* Instantiate Libauth crypto interfaces. */
    secp256k1 = await instantiateSecp256k1()
})()

export default async (_scriptArgs, _amount) => {
    console.log('TRADING POST (script args):', _scriptArgs)
    console.log('TRADING POST (amount):', _amount)

    /* Initialize locals.*/
    let adminAddress
    let adminPkh
    let amountBuyer
    let amountProvider
    let amountSeller
    let coins
    let contractAddress
    let contractChange
    let fee
    let lockingScript
    let multiplier
    let nullData
    let rate
    let receivers
    let response
    let satoshis
    let scriptHash
    let scriptPubKey
    let sellerAddress
    let sellerPkh
    let tokenidHex
    let tokens
    let unspentTokens
    let userData

    console.info('\n  Nexa address:', Wallet.address)
    console.info('\n  WIF', Wallet.wallet.wif)

    /* Set token id (hex). */
    tokenidHex = _scriptArgs.tokenidHex

//----------------------------------

    // NOTE: NexScript v0.1.0 offers a less-than optimized version
    //       of this (script) contract (w/ the addition of `OP_SWAP`).
    lockingScript = hexToBin(TRADING_POST_HEX)
    // console.info('\n  Script / Contract:', binToHex(lockingScript))

    scriptHash = ripemd160(sha256(lockingScript))
    // console.log('SCRIPT HASH:', scriptHash)
    console.log('SCRIPT HASH (hex):', binToHex(scriptHash))

    /* Set Seller public key hash. */
    // nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug (Robin Hood Acct)
    // sellerPkh = hexToBin('b2912c4cc61f1b8cbe5c77ebd5eeea2641645f10')
    sellerPkh = hexToBin(_scriptArgs?.sellerHash)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(sellerPkh),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    sellerAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set exchange rate. */
    rate = _scriptArgs?.rate.toString(16)
    if (rate.length % 2 === 1) {
        rate = '0' + rate
    }
    rate = hexToBin(rate).reverse()
    rate = encodeDataPush(rate) // FIXME Add support for OP.ZERO
    console.log('RATE', binToHex(rate))

    /* Set admin public key hash. */
    // nexa:nqtsq5g5x7evefxhusyp08wmk6xtu9rqee64uk0uaq28jnlk
    adminPkh = hexToBin(_scriptArgs?.adminHash)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(adminPkh),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    adminAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )

    /* Set admin fee. */
    fee = _scriptArgs?.fee.toString(16)
    if (fee.length % 2 === 1) {
        fee = '0' + fee
    }
    fee = hexToBin(fee).reverse()
    fee = encodeDataPush(fee) // FIXME Add support for OP.ZERO
    console.log('FEE', binToHex(fee))

    /* Build script public key. */
    scriptPubKey = new Uint8Array([
        OP.ZERO, // groupid or empty stack item
        ...encodeDataPush(scriptHash), // script hash
        OP.ZERO, // arguments hash or empty stack item
        ...encodeDataPush(sellerPkh), // The Sellers' public key hash.
        ...rate, // The rate of exchange, charged by the Seller. (measured in <satoshis> per asset)
        ...encodeDataPush(adminPkh), // An optional 3rd-party (specified by the Seller) used to facilitate the tranaction.
        ...fee, // An optional amount charged by the Provider. (measured in <basis points> (bp), eg. 5.25% = 525bp)
    ])
    console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    contractAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )
    console.info('\n  Contract address:', contractAddress)

    coins = await getCoins(Wallet.wallet.wif)
        .catch(err => console.error(err))
    console.log('\n  Coins:', coins)

    tokens = await getTokens(Wallet.wallet.wif, scriptPubKey)
        .catch(err => console.error(err))

    // FOR DEV PURPOSES ONLY -- take the LARGEST input
    tokens = [tokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    tokens[0].locking = lockingScript
    tokens[0].unlocking = false
    console.log('\n  Tokens GUEST:', tokens)

    /* Calculate the total balance of the unspent outputs. */
    // FIXME: Add support for BigInt.
    unspentTokens = tokens
        .reduce(
            (totalValue, unspentOutput) => (totalValue + unspentOutput.tokens), BigInt(0)
        )
    console.log('UNSPENT TOKENS', unspentTokens)

    userData = [
        'TPOST',
        'All-in Buyout!',
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)
    // console.log('HEX DATA', nullData)

    /* Calculate contract change. */
    contractChange = unspentTokens - BigInt(_amount)
    console.log('CONTRACT CHANGE', contractChange)

    /* Set Buyer amount. */
    amountBuyer = BigInt(_amount)
    console.log('AMOUNT BUYER', amountBuyer)

    /* Set (contract trade) rate. */
    rate = parseFloat(_scriptArgs?.rate)

    /* Calculate (satoshis) multiplier. */
    multiplier = (rate / 10000.0)

    /* Calculate (Seller) satoshis. */
    // FIXME We MUST round up or risk a (contract) script error.
    satoshis = Math.ceil(_amount / multiplier)

    /* Calculate Seller amount. */
    amountSeller = BigInt(satoshis)
    console.log('AMOUNT SELLER', amountSeller)

    /* Calculate Provider amount. */
    amountProvider = ((amountSeller * BigInt(_scriptArgs?.fee)) / BigInt(10000))
    console.log('AMOUNT PROVIDER', amountProvider)

    /* Initialize receivers. */
    receivers = []

    /* Validate (contract) change. */
    if (contractChange === BigInt(0)) {
        /* Add (Buyout) null data. */
        receivers.push({
            data: nullData
        })
    } else {
        /* Add contract change. */
        receivers.push({
            address: contractAddress,
            tokenid: tokenidHex,
            tokens: BigInt(contractChange),
        })
    }

    /* Add Seller output. */
    receivers.push({
        address: sellerAddress,
        satoshis: BigInt(amountSeller),
    })

    /* Add wallet change output. */
    receivers.push({
        address: Wallet.address,
        tokenid: tokenidHex,
        tokens: BigInt(amountBuyer),
    })

    /* Validate Admin fee. */
    if (amountProvider > BigInt(546)) {
        /* Add Admin fee output. */
        receivers.push({
            address: adminAddress,
            satoshis: BigInt(amountProvider),
        })
    }

    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: Wallet.address,
    })
    console.log('\n  Receivers:', receivers)

    /* Send UTXO request. */
    response = await sendToken({
        coins,
        tokens,
        receivers,
    })
    // console.log('Send UTXO (response):', response)

    /* Return transaction result. */
    return response
}
