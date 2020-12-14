/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'

/* Set maximum integer value. */
const INT_MAX = 4294967295 // NOTE: 0xFFFFFFFF | 32-bit max int

/**
 * Build Pledge Authorization
 */
const buildPledgeAuth = async ({ getters, rootGetters, dispatch }, _pkg) => {
    /* Set coin. */
    const coin = _pkg.coin
    // console.log('COIN', coin)

    /* Set user pledge. */
    const userPledge = _pkg.userPledge
    // console.log('USER PLEDGE', userPledge)

    /* Set platform source. */
    const source = _pkg.source
    // console.log('PLATFORM SOURCE', source)

    /* Validate coin. */
    if (!coin.txid || !coin.satoshis) {
        return console.error('No UTXO available for pledge.') // eslint-disable-line no-console
    }

    /* Initialize verification key. */
    const verificationKey = Nito.Purse.fromWIF(coin.wif)
    // console.log('verificationKey', verificationKey, coin.wif)

    /* Set public key. */
    const publicKey = verificationKey.publicKey.toString()
    // console.log('\nPublic key:', publicKey)

    /* Set cash address. */
    const cashAddress = Nito.Address.toCashAddress(verificationKey)
    // console.log('FLIPSTARTER (pledge address)', cashAddress)

    const alias = userPledge.data.alias
    // console.log('ALIAS:', alias)

    const comment = userPledge.data.comment
    // console.log('COMMENT:', comment)

    const expires = userPledge.expires
    // console.log('EXPIRES:', expires)

    /* Set previous transaction hash. */
    const previousTransactionHash = Buffer.from(coin.txid, 'hex')

    /* Set previous transaction output value. */
    const previousTransactionOutputValue = Buffer.from(
        Nito.Utils.encodeNumber(coin.satoshis), 'hex')

    /* Set previous transaction output index (vout). */
    const previousTransactionOutputIndex = Buffer.allocUnsafe(4)
    previousTransactionOutputIndex.writeUIntLE(coin.vout, 0, 4)

    /* Set input lock script. */
    const inputLockScript = Buffer.from(
        Nito.Address.toPubKeyHash(cashAddress), 'hex')

    /* Request commitment message. */
    const verificationMessage = getters.getSighashDigest(
        previousTransactionHash,
        previousTransactionOutputIndex,
        previousTransactionOutputValue,
        inputLockScript,
        userPledge,
    )
    // console.log('verificationMessage', verificationMessage.toString('hex'))

    /* Sign commitment message. */
    const pledgeSig = Nito.Account.sign(verificationMessage, verificationKey)
    // console.log('PLEDGE SIGNATURE', pledgeSig.toString())

    /* Set previous out transaction hash. */
    const previous_output_transaction_hash = coin.txid

    /* Set previous output index. */
    const previous_output_index = coin.vout

    /* Set sequence number. */
    const sequence_number = INT_MAX

    /* Build unlocking script. */
    const unlocking_script =
        (pledgeSig.toString().slice(2, 4) === '44' ? '47' : '48') + // FIXME??
        pledgeSig.toString() +
        'c1' + // NOTE: sigHashType
        '21' +
        publicKey
    // console.log('UNLOCKING SCRIPT:', unlocking_script)

    /* Build assurance output. */
    const assuranceOutput = {
        inputs: [{
            previous_output_transaction_hash,
            previous_output_index,
            sequence_number,
            unlocking_script,
        }],
        data: {
            alias,
            comment,
        },
        data_signature: null
    }
    console.info('Assurance output:', assuranceOutput) // eslint-disable-line no-console

    /* Encode assurance pledge. */
    const encodedPledge = Buffer
        .from(JSON.stringify(assuranceOutput))
        .toString('base64')
    console.info('Flipstarter encoded pledge (base64):', encodedPledge) // eslint-disable-line no-console

    /* Initialize meta. */
    let meta = await rootGetters['profile/getMeta']
    console.log('MAKE PLEDGE (meta):', meta)

    /* Validate metadata. */
    // NOTE: Added to schema on 2020.7.27
    if (!meta) {
        meta = {}
    }

    /* Validate coins. */
    // NOTE: Added to schema on 2020.7.27
    if (!meta.coins) {
        meta.coins = {}
    }

    /* Set coin id. */
    const coinid = `${coin.txid}:${coin.vout}`

    /* Update meta data. */
    meta['coins'][coinid] = {
        label: alias,
        comment,
        lock: {
            isActive: true,
            source,
            createdAt: moment().unix(),
            expiresAt: expires,
        }
    }

    /* Update metadata. */
    dispatch('profile/updateMeta', meta, { root: true })
    // const metaUpdate = dispatch('profile/updateMeta', meta, { root: true })
    // console.log('FLIPSTARTER (metaUpdate):', metaUpdate)

    /* Return encoded pledge. */
    if (_pkg.json) {
        return assuranceOutput
    } else {
        return encodedPledge
    }
}

/* Export module. */
export default buildPledgeAuth
