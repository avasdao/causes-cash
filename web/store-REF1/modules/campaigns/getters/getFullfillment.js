/* Import modules. */
import Nexa from 'nexajs'

const DUST_LIMIT = 546
const MAX_LIMIT = 2099999997690000

/**
 * Add Output
 *
 * Adds an output to the assurance contract.
 */
const _addOutput = (_outputs, _satoshis, _address) => {
    // Check if the provided address is properly encoded.
    if (!Nexa.Address.isCashAddress(_address)) {
        throw `Cannot add output, provided address '${_address}' does not use the valid CashAddr encoding.`
    }

    // Check if the provided satoshis is of the correct type.
    if (isNaN(_satoshis)) {
        throw `Cannot add output, provided satoshis '${_satoshis}' is not a number.`
    }

    // Check if the provided satoshis is an integer.
    if (!Number.isInteger(_satoshis)) {
        throw `Cannot add output, provided satoshis '${_satoshis}' is not an integer.`
    }

    // Check if the provided satoshis is a positive number.
    if (_satoshis < 0) {
        throw `Cannot add output, provided satoshis '${_satoshis}' is negative.`
    }

    // Check if the provided satoshis is large enough to be accepted.
    if (_satoshis < DUST_LIMIT) {
        throw `Cannot add output, provided satoshis '${_satoshis}' is smaller than the dust limit.`
    }

    // Check if the provided satoshis is too large to be accepted.
    if (_satoshis > MAX_LIMIT) {
        throw `Cannot add output, provided satoshis '${_satoshis}' is larger than the max limit.`
    }

    /* Set value. */
    const value = Nexa.Utils.encodeNumber(_satoshis)

    /* Derive the locking script from the address. */
    const locking_script = Buffer.from(
        Nexa.Address.toPubKeyHash(_address), 'hex')

    /* Structure the output. */
    const output = {
        value,
        locking_script,
    }

    /* Add the output to assurance contract. */
    _outputs.push(output)
}

/**
 * Serialize Input
 *
 * Creates a serialized input part to be used in a raw transaction.
 */
const _serializeInput = (
    _previousTransactionHash,
    _previousOutputIndex,
    _unlockScript,
    _sequenceNumber
) => {
    /* Calculate unlock script length. */
    const unlockScriptLength = Nexa.Utils.varInt(_unlockScript.byteLength)

    /* Return the serialized input structure, as a buffer. */
    return Buffer.concat([
        _previousTransactionHash,
        _previousOutputIndex,
        unlockScriptLength,
        _unlockScript,
        _sequenceNumber,
    ])
}

/**
 * Serialize Outputs
 */
const _serializeOutputs = (_outputs) => {
    /* Initialize output buffers. */
    const outputBuffers = []

    /* Handle all outputs. */
    for (const currentOutput in _outputs) {
        const output = _outputs[currentOutput]

        // Create a lockscript length statement.
        const lockscriptLength = Nexa.Utils
            .varInt(output.locking_script.byteLength)

        // Return the serialized output.
        outputBuffers.push(
            Buffer.concat([
                output.value,
                lockscriptLength,
                output.locking_script
            ])
        )
    }

    /* Return output buffers. */
    return Buffer.concat(outputBuffers)
}

/**
 * Serialize Pledges
 */
const _serializePledges = (_pledges) => {
    /* Initialize pledge buffers. */
    const pledgeBuffers = []

    /* Handle all pledges. */
    _pledges.forEach(_pledge => {
        /* Initialize sequence number. */
        const sequenceNumber = Buffer.alloc(4)

        /* Set sequence number. */
        sequenceNumber.writeUInt32LE(_pledge.sequenceNumber)

        /* Set previous transaction hash. */
        const previousTransactionHash = Nexa.Utils
            .reverseBuffer(Buffer.from(_pledge.previousTransactionHash, 'hex'))

        /* Initialize output index. */
        const outputIndex = Buffer.alloc(4)

        /* Set output index. */
        outputIndex.writeUInt32LE(_pledge.previousOutputIndex)

        /* Add input to buffers. */
        pledgeBuffers.push(
            /* Serialize input. */
            _serializeInput(
                previousTransactionHash,
                outputIndex,
                Buffer.from(_pledge.unlockScript, 'hex'),
                sequenceNumber
            )
        )
    })

    /* Return pledge buffers. */
    return Buffer.concat(pledgeBuffers)
}

/**
 * Get Fullfillment
 *
 * Assembles all currently known commitments into a transaction.
 */
const getFullfillment = () => (_campaign) => {
    // console.log('FULLFILLMENT (campaign):', _campaign)

    /* Set pledges. */
    const pledges = _campaign.assurance.pledges.filter(pledge => !pledge.isSpent)
    // console.log('FULLFILLMENT (pledges):', pledges)

    /* Set recipients. */
    const recipients = _campaign.assurance.recipients
    // console.log('FULLFILLMENT (recipients):', recipients)

    // Create a buffered version statement.
    const version = Buffer.from('02000000', 'hex')

    // Create the input counter and input data buffers.
    const inputCount = Nexa.Utils.varInt(pledges.length)

    /* Generate inputs. */
    const inputs = _serializePledges(pledges)
    // console.log('FULLFILLMENT (inputs):', inputs)

    /* Initialize outputs. */
    const outputs = []

    // Create the output counter and output data buffer.
    const outputCount = Nexa.Utils
        .varInt(Object.keys(recipients).length)

    /* Handle all recipients. */
    recipients.forEach(_recipient => {
        _addOutput(
            outputs,
            _recipient.satoshis,
            _recipient.address
        )
    })
    // console.log('FULLFILLMENT (outputs):', outputs)
    // console.log('FULLFILLMENT (_serializeOutputs):', _serializeOutputs(outputs))

    // Create a buffered disable locktime statement.
    const locktime = Buffer.from('00000000', 'hex')

    /* Return the assembled transaction. */
    return Buffer.concat([
        version,
        inputCount,
        inputs,
        outputCount,
        _serializeOutputs(outputs),
        locktime,
    ])
}

/* Export module. */
export default getFullfillment
