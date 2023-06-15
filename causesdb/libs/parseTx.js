/* Import modules. */
import { encodeAddress } from '@nexajs/address'
import { getTransaction } from '@nexajs/rostrum'
import { binToHex } from '@nexajs/utils'
import { hexToBin } from '@nexajs/utils'
import { sha256 } from '@nexajs/crypto'

/* Libauth helpers. */
import { instantiateRipemd160 } from '@bitauth/libauth'
const ripemd160 = await instantiateRipemd160()


/* Libauth helpers. */
import {
    encodeDataPush,
} from '@bitauth/libauth'

export default async (_receiver, _txid) => {
    const transaction = await getTransaction(_txid)
    // console.log('TRANSACTION', transaction)

    const inputs = transaction?.vin
    // console.log('INPUTS', inputs)

    const outputs = transaction?.vout
    // console.log('OUTPUTS', outputs)

    const hex = inputs[0]?.scriptSig.hex
    // console.log('HEX', hex)

    const publicKey = hexToBin(hex.slice(4, 70))
    // console.log('PUBLIC KEY', binToHex(publicKey))

    /* Hash the public key hash according to the P2PKH/P2PKT scheme. */
    const scriptPushPubKey = encodeDataPush(publicKey)
    // console.log('SCRIPT PUSH PUBLIC KEY', scriptPushPubKey);

    const publicKeyHash = ripemd160.hash(sha256(scriptPushPubKey))
    // console.log('PUBLIC KEY HASH (hex)', binToHex(publicKeyHash))

    const pkhScript = hexToBin('17005114' + binToHex(publicKeyHash))
    // console.info('  Public key hash Script:', binToHex(pkhScript))

    const sender = encodeAddress(
        'nexa', 'TEMPLATE', pkhScript)
    // console.info('SENDER', sender)

    const received = outputs.find(_out => {
        return _out.scriptPubKey.hex === _receiver
    })

    /* Validate received. */
    // NOTE: Will occur when SENDING coins from address.
    if (!received) {
        return null
    }

    const satoshis = received.value_satoshi

    const txidem = transaction.txidem

    /* Set package. */
    const pkg = {
        sender,
        satoshis,
        txidem,
        txid: _txid,
        // inputs,
        // outputs,
        // received,
    }

    /* Return package. */
    return pkg
}
