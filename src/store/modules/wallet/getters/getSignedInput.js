/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Get Signed Input
 */
const getSignedInput = () => (_transactionBuilder, _hdNode, _index, _input) => {
    // console.log('GET SIGNED INPUT', _index, _input)

    /* Set _input. */
// TEMP: FOR DEVELOPMENT PURPOSES ONLY
    // const input = _inputs[0]
    // console.log('ADDRESS (of signed input)', _input.address)
    // console.log('PATH (of signed input)', _input.path)

    /* Initialize child node. */
    const childNode = _hdNode.derivePath(_input.path)

    /* Set keypair. */
    const keyPair = bitbox.HDNode.toKeyPair(childNode)

    /* Set (signing) amount. */
    const amount = parseInt(_input.satoshis)
    // console.log('SIGNING AMOUNT', amount)

    /* Initialize redeemscript. */
    // TODO: Find out WHY the hell we need this here??
    let redeemScript

    /* Sign the transaction input(s). */
    // FIXME: Allow for multipe inputs.
    _transactionBuilder.sign(
        _index,
        keyPair,
        redeemScript,
        _transactionBuilder.hashTypes.SIGHASH_ALL,
        amount,
        _transactionBuilder.signatureAlgorithms.SCHNORR
    )
}

/* Export module. */
export default getSignedInput
