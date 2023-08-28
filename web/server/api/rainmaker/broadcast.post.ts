/* Import modules. */
import PouchDB from 'pouchdb'

/* Initialize databases. */
const logsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/logs`)
const rainmakerTxsDb = new PouchDB(`http://${process.env.COUCHDB_USER}:${process.env.COUCHDB_PASSWORD}@127.0.0.1:5984/rainmaker_txs`)

export default defineEventHandler(async (event) => {
    /* Initialize locals. */
    let body
    let coins
    let nexaAddress
    let nullData
    let publicKey
    let publicKeyHash
    let receivers
    let response
    let scriptPubKey
    let scriptPushPubKey
    let tokens
    let txResult
    let userData
    let wif

    /* Set (request) body. */
    body = await readBody(event)
    console.log('BROADCAST (body):', body)


    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    scriptPushPubKey = encodeDataPush(Wallet.wallet.publicKey)

    publicKeyHash = ripemd160.hash(sha256(scriptPushPubKey))

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(publicKeyHash),
    ])

    /* Encode the public key hash into a P2PKH nexa address. */
    nexaAddress = encodeAddress(
        'nexa',
        'TEMPLATE',
        encodeDataPush(scriptPubKey),
    )
    console.info('\n  Nexa address:', nexaAddress)

    coins = await getCoins(wif)
        .catch(err => console.error(err))
    // console.log('\n  Coins:', coins)

    tokens = await getTokens(wif)
        .catch(err => console.error(err))
    // console.log('\n  Tokens:', tokens)

    /* Filter tokens. */
    // NOTE: Currently limited to a "single" Id.
    tokens = tokens.filter(_token => {
        return _token.tokenidHex === TOKEN_ID_HEX
    })
    // console.log('\n  Tokens (filtered):', tokens)

    userData = [
        'RAIN',
        `$AVAS Telegram Airdrop`,
    ]

    /* Initialize hex data. */
    nullData = encodeNullData(userData)

    receivers = [
        {
            data: nullData,
        },
    ]

    body.receivers.forEach(_receiver => {
        receivers.push(        {
            address: _receiver.address,
            tokenid: TOKEN_ID_HEX, // TODO Allow auto-format conversion.
            tokens: _receiver.tokens,
        },
)
    })

    receivers.push({
        address: this.address,
    })
    return console.log('\n  Receivers:', receivers)

    /* Send UTXO request. */
    response = await sendToken(coins, tokens, receivers)
    console.log('Send UTXO (response):', response)

    try {
        txResult = JSON.parse(response)
        console.log('TX RESULT', txResult)

        if (txResult.error) {
            return console.error(txResult.message)
        }
    } catch (err) {
        console.error(err)
    }

    return txResult
})
