/* Import modules. */
import {
    binToHex,
    encodeAddress,
    encodeDataPush,
    getTransaction,
    hexToBin,
    OP,
    sha256,
} from 'nexajs'

/* Libauth helpers. */
import { instantiateRipemd160 } from '@bitauth/libauth'
const ripemd160 = await instantiateRipemd160()

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

    publicKeyHash = ripemd160.hash(sha256(scriptPushPubKey))

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
