/* Import modules. */
import {
    binToHex,
    encodeAddress,
    encodeDataPush,
    hash160,
    hexToBin,
    OP,
} from 'nexajs'

/* Set (REST) API endpoints. */
const ROSTRUM_ENDPOINT = 'https://nexa.sh/v1/rostrum'

/* Set constants. */
const ROSTRUM_METHOD = 'POST'

/* Initialize globals. */
let body
let response

const headers = new Headers()
headers.append('Content-Type', 'application/json')

const getTransaction = async (_id) => {
    body = JSON.stringify({
        request: 'blockchain.transaction.get',
        params: [_id, true],
    })

    // NOTE: Native `fetch` requires Node v21+.
    response = await fetch(ROSTRUM_ENDPOINT, {
        method: ROSTRUM_METHOD,
        headers,
        body,
    }).catch(err => console.error(err))
    response = await response.json()
    // console.log('RESPONSE', response)

    return response
}

/**
 * Parse Transaction
 *
 * Takes the provided receiver (active campaign address) and a specified
 * transaction id, and will return the address of the sender and the
 * amount that was sent.
 */
export default async (_receiver, _txid) => {
    /* Initialize locals. */
    let hex
    let inputs
    let outputs
    let pkg
    let publicKey
    let publicKeyHash
    let receiver
    let satoshis
    let scriptPushPubKey
    let scriptPubKey
    let sender
    let transaction
    let txidem

    transaction = await getTransaction(_txid)
    // console.log('TRANSACTION', transaction)

    inputs = transaction?.vin
    // console.log('INPUTS', inputs)

    outputs = transaction?.vout
    // console.log('OUTPUTS', outputs)

    hex = inputs[0]?.scriptSig.hex
    // console.log('HEX', hex)

    publicKey = hexToBin(hex.slice(4, 70))
    // console.log('PUBLIC KEY', binToHex(publicKey))

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    scriptPushPubKey = encodeDataPush(publicKey)

    publicKeyHash = hash160(scriptPushPubKey)

    scriptPubKey = new Uint8Array([
        OP.ZERO,
        OP.ONE,
        ...encodeDataPush(publicKeyHash),
    ])
    console.info('Script Public Key:', binToHex(scriptPubKey))

    sender = encodeAddress(
        'nexa',
        'TEMPLATE',
        scriptPubKey
    )
    console.info('SENDER', sender)

    /* Find the requested receiver. */
    receiver = outputs.find(_out => {
        return _out.scriptPubKey.hex === _receiver
    })

    /* Validate receiver. */
    // NOTE: Will occur when SENDING coins from address.
    if (!receiver) {
        return null
    }

    /* Set satoshis. */
    satoshis = receiver.value_satoshi

    /* Set transaction idem. */
    txidem = transaction.txidem

    /* Set package. */
    pkg = {
        sender,
        satoshis,
        txidem,
    }

    /* Return package. */
    return pkg
}
