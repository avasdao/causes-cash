/* Import modules. */
import { Address } from '@nexajs/address'
import { Crypto } from '@nexajs/crypto'
import { Utils } from '@nexajs/utils'

/**
 * Assemble Signature Hash Digest
 */
const getSighashDigest = () => (
    previousTransactionHash,
    previousTransactionOutputIndex,
    previousTransactionOutputValue,
    inputLockScript,
    userPledge,
) => {
    /* Initialize an empty array of outpoints. */
    const transactionOutpoints = []

    /* Initialize value. */
    let value = null

    /* Set value. */
    value = Utils
        .encodeNumber(userPledge.outputs[0].value)
    // console.log('Encoded value:', value)

    /* Set locking script. */
    const locking_script = Address
        .toPubKeyHash(userPledge.outputs[0].address)
    // console.log('Campaign (locking_script):', locking_script)

    /* Set current output. */
    // NOTE: This is the pledge recipient.
    // FIXME: Allow multiple pledge recipients.
    const thisOutputs = [{ value, locking_script }]

    /* Add each output in the current contract. */
    for (const currentOutput in thisOutputs) {
        // Add the output value.
        transactionOutpoints.push(thisOutputs[currentOutput].value)

        // Add the output lockscript.
        transactionOutpoints.push(
            Utils.varBuf(thisOutputs[currentOutput].locking_script)
        )
    }
    // console.log('Transaction outpoints:', transactionOutpoints)

    /* Set version. */
    const nVersion = Buffer.from('02000000', 'hex')

    /* Set hash previous output. */
    const hashPrevouts = Buffer.from(''.padStart(64, '0'), 'hex')

    /* Set hash sequence. */
    const hashSequence = Buffer.from(''.padStart(64, '0'), 'hex')

    /* Set outpoint. */
    const outpoint = Buffer.concat([
        Utils.reverseBuffer(previousTransactionHash),
        previousTransactionOutputIndex,
    ])

    /* Set script code. */
    const scriptCode = Buffer.concat([
        Buffer.from('19', 'hex'),
        inputLockScript,
    ])

    /* Set (transaction) value. */
    value = previousTransactionOutputValue

    /* Set sequence. */
    const nSequence = Buffer.from('FFFFFFFF', 'hex')

    /* Set hash outputs. */
    const hashOutputs = Crypto
        .hash(Buffer.concat(transactionOutpoints), 'sha256sha256')

    /* Set locktime. */
    const nLocktime = Buffer.from('00000000', 'hex')

    /* Set signature hash type. */
    const sighashType = Buffer.from('c1000000', 'hex')

    /* Construct signature hash message. */
    const sighashMessage = Buffer.concat([
        nVersion,
        hashPrevouts,
        hashSequence,
        outpoint,
        scriptCode,
        value,
        nSequence,
        hashOutputs,
        nLocktime,
        sighashType,
    ])
    // console.log('sighashMessage', sighashMessage.toString('hex'));

    /* Create signature hash digest (of message). */
    const sighashDigest = Crypto.hash(sighashMessage, 'sha256sha256')
    // console.log('sighashDigest', sighashDigest.toString('hex'));

    /* Return signature hash digest. */
    return sighashDigest
}

/* Export module. */
export default getSighashDigest
