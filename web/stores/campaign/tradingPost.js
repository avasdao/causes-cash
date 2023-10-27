/* Import (test) modules. */
import { v4 as uuidv4 } from 'uuid'

import { encodeAddress } from '@nexajs/address'

import { sha256 } from '@nexajs/crypto'

import { encodePrivateKeyWif } from '@nexajs/hdnode'

/* Import library modules. */
import { getCoins } from '@nexajs/purse'

import { getTip } from '@nexajs/rostrum'

import {
    getTokens,
    sendToken,
} from '@nexajs/token'

import {
    binToHex,
    hexToBin,
} from '@nexajs/utils'

/* Libauth helpers. */
import {
    instantiateRipemd160,
    instantiateSecp256k1,
} from '@bitauth/libauth'

/* Import (individual) modules. */
import {
    encodeDataPush,
    encodeNullData,
    OP,
} from '@nexajs/script'

const PRIVATE_KEY = 'baa017c1c3458fc80c31c7b5a2ce833a3af44d3c172bff3981103d272f9a5a3c' // nexa:nqtsq5g5sjkqk7wzd9wwh9423rr0tda7m027ryljkfy84cjz
const NEXA_RECEIVING_ADDRESS = 'nexa:nqtsq5g57qupnngwws0rlvsevggu6zxqc0tmk7d3v5ulpfh6'
const NEXA_DUMP_ADDRESS = 'nexa:nqtsq5g57qupnngwws0rlvsevggu6zxqc0tmk7d3v5ulpfh6'
const STUDIO_ID = 'nexa:tztnyazksgqpkphrx2m2fgxapllufqmuwp6k07xtlc8k4xcjpqqqq99lxywr8'
const STUDIO_ID_HEX = '9732745682001b06e332b6a4a0dd0fffc4837c707567f8cbfe0f6a9b12080000'
const SATOSHIS = 1337n
const TOKENS = 1337n

const PROVIDER_ADDRESS = 'nexa:nqtsq5g5x7evefxhusyp08wmk6xtu9rqee64uk0uaq28jnlk'
const PROVIDER_PUB_KEY_HASH = '37b2cca4d7e408179ddbb68cbe1460ce755e59fc'
const TRADING_POST_HEX = '6c6c6c6c00c7517f7c76010087636d00677f7501207f756852cd517f7c76010087636d00677f7501207f756888030051147c7e51cd8851cc767b9652cd517f7c76010087636d00677f77517f7c76010087636d00677f75816868789d00c7517f7c76010087636d00677f77517f7c76010087636d00677f758168689f6300cd01217f76517f6e7c817f7700c701217f76517f6e7c817f775979557988557978886d6d6d6d6d687b950210279602220278a16353cc78a2690300511452797e53cd7888756855c478a169c4788ca26353cd517f7c76010087636d00677f7501207f756881009d68c49c6354cd517f7c76010087636d00677f7501207f756881009d686d'

/* Instantiate Libauth crypto interfaces. */
const ripemd160 = await instantiateRipemd160()
const secp256k1 = await instantiateSecp256k1()

export default async () => {
    let coins
    let coinsGuest
    let constraintData
    let constraintHash
    let contractAddress
    let fee
    let lockingScript
    let nexaAddress
    let nullData
    let providerPubKeyHash
    let publicKey
    let publicKeyHash
    let rate
    let receivers
    let response
    let scriptData
    let scriptHash
    let scriptPubKey
    let sellerPubKeyHash
    let tokens
    let tokensGuest
    let txResult
    let unlockingScript
    let unspentTokens
    let userData
    let wif

    /* Encode Private Key WIF. */
    wif = encodePrivateKeyWif({ hash: sha256 }, hexToBin(PRIVATE_KEY), 'mainnet')
    // console.log('WALLET IMPORT FORMAT', wif)

    /* Derive the corresponding public key. */
    publicKey = secp256k1.derivePublicKeyCompressed(hexToBin(PRIVATE_KEY))

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    scriptData = encodeDataPush(publicKey)

    publicKeyHash = ripemd160.hash(sha256(scriptData))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(publicKeyHash),
    ])
    // console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    nexaAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )
    console.info('\n  Nexa address:', nexaAddress)

//----------------------------------

    // NOTE: NexScript v0.1.0 offers a less-than optimized version
    //       of this (script) contract (w/ the addition of `OP_SWAP`).
    lockingScript = hexToBin(TRADING_POST_HEX)
    console.info('\n  Script / Contract:', binToHex(lockingScript))

    scriptHash = ripemd160.hash(sha256(lockingScript))
    // console.log('SCRIPT HASH:', scriptHash)
    console.log('SCRIPT HASH (hex):', binToHex(scriptHash))

    /* Derive the corresponding public key. */
    publicKey = secp256k1.derivePublicKeyCompressed(hexToBin(PRIVATE_KEY))
    // console.log('PUBLIC KEY (hex)', binToHex(publicKey))

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    constraintData = encodeDataPush(publicKey)
    // console.log('\n  Arguments Data:', constraintData)

    constraintHash = ripemd160.hash(sha256(constraintData))
    console.log('CONSTRAINT HASH (hex):', binToHex(constraintHash))

    /* Set Seller public key hash. */
    // nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug (Robin Hood Acct)
    sellerPubKeyHash = hexToBin('b2912c4cc61f1b8cbe5c77ebd5eeea2641645f10')

    /* Set exchange rate. */
    rate = 0x01 // 1 (1 satoshi per 1 token)
    // rate = 0x0a // 10 (10 satoshi per 1 token)
    // rate = 0x14 // 20 (20 satoshi per 1 token)
    // rate = 0x1e // 30 (30 satoshi per 1 token)
    // rate = 0x28 // 40 (40 satoshi per 1 token)
    // rate = 0x32 // 50 (50 satoshi per 1 token)

    /* Set provider public key hash. */
    // nexa:nqtsq5g5x7evefxhusyp08wmk6xtu9rqee64uk0uaq28jnlk
    providerPubKeyHash = hexToBin(PROVIDER_PUB_KEY_HASH)

    /* Set provider fee. */
    fee = hexToBin(0x2c01) // 300 (3.00%)
    // fee = 0x0 // 0 (0.00%) FOR DEV PURPOSES ONLY

    /* Build script public key. */
    scriptPubKey = new Uint8Array([
        OP.ZERO, // groupid or empty stack item
        ...encodeDataPush(scriptHash), // script hash
        OP.ZERO, // arguments hash or empty stack item
        ...encodeDataPush(sellerPubKeyHash), // The Sellers' public key hash.
        OP.ONE, // The rate of exchange, charged by the Seller. (measured in <satoshis> per asset)
        ...encodeDataPush(providerPubKeyHash), // An optional 3rd-party (specified by the Seller) used to facilitate the tranaction.
        ...encodeDataPush(fee), // An optional amount charged by the Provider. (measured in <basis points> (bp), eg. 5.25% = 525bp)
    ])
    console.info('\n  Script Public Key:', binToHex(scriptPubKey))

    /* Encode the public key hash into a P2PKH nexa address. */
    contractAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey,
    )
    console.info('\n  Contract address:', contractAddress)

    coins = await getCoins(wif)
        .catch(err => console.error(err))
    console.log('\n  Coins:', coins)

    coinsGuest = await getCoins(wif, scriptPubKey)
        .catch(err => console.error(err))
    console.log('\n  Coins GUEST:', coinsGuest)

    tokens = await getTokens(wif, scriptPubKey)
        .catch(err => console.error(err))

    // FOR DEV PURPOSES ONLY -- take the LARGEST input
    tokens = [tokens.sort((a, b) => Number(b.tokens) - Number(a.tokens))[0]]
    // FOR DEV PURPOSES ONLY -- add scripts
    tokens[0].locking = encodeDataPush(lockingScript)
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

    receivers = [
        {
            data: nullData
        },
        // {
        //     address: contractAddress,
        //     // address: 'nexa:nqtsq5g5sjkqk7wzd9wwh9423rr0tda7m027ryljkfy84cjz',
        //     tokenid: STUDIO_ID_HEX,
        //     tokens: 600n,
        // },
        {
            address: NEXA_RECEIVING_ADDRESS,
            satoshis: 600n,
        },
        {
            address: NEXA_DUMP_ADDRESS,
            tokenid: STUDIO_ID_HEX,
            tokens: 600n,
        },
        {
            address: PROVIDER_ADDRESS,
            satoshis: 600n,
        },
    ]

    // FIXME: FOR DEV PURPOSES ONLY
    receivers.push({
        address: nexaAddress,
    })
    console.log('\n  Receivers:', receivers)

    /* Send UTXO request. */
    response = await sendToken({
        coins,
        tokens,
        receivers,
    })
    console.log('Send UTXO (response):', response)

    try {
        txResult = JSON.parse(response)
        console.log('TX RESULT', txResult)

        if (txResult.error) {
            console.error(txResult.error)
        } else {
            expect(txResult.result).to.have.length(64)
        }
    } catch (err) {
        console.error(err)
    }
}
