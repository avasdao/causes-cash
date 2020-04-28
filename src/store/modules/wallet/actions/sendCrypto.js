/* Initialize BITBOX. */
const bitbox = new window.BITBOX()

/**
 * Send Crypto
 *
 * Main process for managing crypto transfers (out of wallet).
 */
const sendCrypto = async ({ dispatch, getters }, _params) => {
    /* Set dust amount. */
    const dustAmount = getters.getDustAmount

    /* Set receiver. */
    const receiver = _params.receiver

    /* Set amount. */
    // NOTE: We allow for decimal (fractional) amounts.
    const amount = parseFloat(_params.amount)

    /* Set unit. */
    const unit = _params.unit

    /* Initialize change flag. */
    let hasChange = false

    console.log('SENDING CRYPTO', receiver, amount, unit)

    /* Validate amount (sending to receiver). */
    if (!amount) {
        return dispatch('displayError',
            'Cannot send payment without amount', { root: true })
    }

    try {
        /* Initialize HD node. */
        const hdNode = getters.getHDNode

        /* Set accounts. */
        const accounts = getters.getAddresses('BCH')
        console.log('ALL ACTIVE ACCOUNTS', accounts)

        /* Set addresses. */
        const addresses = accounts.map(account => account.address)
        console.log('ALL ACTIVE ACCOUNT ADDRESES', addresses)

        /* Retrieve unspent transaction outputs. */
        const unspents = await bitbox.Address.utxo(addresses)
        console.log('UNSPENTS', unspents)

        /* Initialize available inputs. */
        const availableInputs = []

        /* Initialize account indexes. */
        const accountIndexes = []

        /* Add ALL (available) unspents. */
        unspents.forEach(unspent => {
            /* Validate UXTO(s). */
            // FIXME: Add support for multiple unspents per account address.
            if (unspent.utxos.length > 0) {
                /* Set address. */
                const address = unspent.cashAddress

                /* Initialize path. */
                let path = null

                // FIXME
                const change = 0

                /* Find unspent index. */
                accounts.forEach(account => {
                    if (account.address === address) {
                        path = `${getters.getDerivationPath('BCH')}/${change}/${account.index}`
                        console.log(`FOUND PATH FOR ${address} - ${path}`)

                        /* Add account index. */
                        accountIndexes.push(account.index)
                    }
                })

                /* Add input to available pool. */
                availableInputs.push({
                    address,
                    path,
                    // FIXME: What about NON-ZERO index (eg. dividend payments)??
                    ...unspent.utxos[0]
                })
            }
        })

        console.log('AVAILABLE INPUTS', availableInputs)

        /* Validate available inputs. */
        if (availableInputs.length == 0) {
            /* Display error. */
            dispatch('displayError',
                `You have no money to send`, { root: true })

            return
        }

        /* Initialize transaction builder. */
        const transactionBuilder = new bitbox.TransactionBuilder('mainnet')

        /* Initialize send amount. */
        let sendAmount = 0

        switch(unit.toUpperCase()) {
        case 'SATOSHIS':
            sendAmount += amount
            break
        case 'BITS':
            sendAmount += (amount * 100)
            break
        case 'MBCH':
            sendAmount += (amount * 100000)
            break
        case 'BCH':
            sendAmount += (amount * 100000000)
            break
        default:
            sendAmount += amount
        }
        console.log('SEND AMOUNT', sendAmount)

        /* Initialize (minimum) byte count. */
        // NOTE: Based on a single input, single output with change.
        let byteCount = 226

        /* Initialize (initial) transaction amount. */
        let txAmount = sendAmount + byteCount
        console.log('(INITIAL) TRANSACTION AMOUNT (incl bytes)', txAmount)

        /* Initialize inputs (count). */
        let inputsCount = 0

        /* Initialize utxo (value) total. */
        let inputsTotal = 0

        /* Loop through ALL uxtos. */
        availableInputs.forEach(input => {
            console.log('INPUT', input)

            /* Validate input flag. */
            if (inputsTotal < txAmount) {
                /* Add input with txid and index of vout. */
                transactionBuilder.addInput(input.txid, input.vout)

                console.log('ADDED UTXO', input.txid, input.vout, input.satoshis)

                /* Add input value to total. */
                inputsTotal += input.satoshis

                /* Increment inputs (count). */
                inputsCount++
            }
        })

        console.log('INPUTS TOTAL', inputsCount, inputsTotal)

        /* Validate total (value) of inputs. */
        if (inputsTotal < txAmount) {
            /* Display error. */
            dispatch('displayError',
                `Your balance is too low.`, { root: true })

            return
        }

        /* Validate send amount. */
        // TODO: Validate BCH dust amount.
        if (sendAmount < dustAmount) {
            /* Display error. */
            dispatch('displayError',
                `Amount is too low. Min: ${dustAmount} sats`, { root: true })

            /* Set flag. */
            // FIXME: How can we display this on the UI?
            // this.sendState = 'idle'

            return
        }

        /* Add output w/ address and amount to send. */
        transactionBuilder.addOutput(receiver, sendAmount)

        /* Complete outputs (to change address). */
        if (sendAmount < inputsTotal) {
            /* Calculate change amount. */
            const changeAmount = inputsTotal - txAmount
            console.log('CHANGE AMOUNT', changeAmount)

            /* Validate change amount. */
            // TODO: Should we adjust the number of outputs??
            if (changeAmount >= dustAmount) {
                /* Set change flag. */
                hasChange = true

                /* Reserve change address. */
                const changeAddress = getters.getChangeAddress
                console.info( // eslint-disable-line no-console
                    'Adding tx change (address / amount)',
                    changeAddress,
                    changeAmount
                )

                /* Add change output w/ change address. */
                transactionBuilder.addOutput(changeAddress, changeAmount)
            }
        }

        /* Validate use of change. */
        // FIXME: Add address detection for P2SH.
        if (hasChange) {
            byteCount = bitbox.BitcoinCash
                .getByteCount({ P2PKH: inputsCount }, { P2PKH: 2 })
        } else {
            byteCount = bitbox.BitcoinCash
                .getByteCount({ P2PKH: inputsCount }, { P2PKH: 1 })
        }
        console.log('(FINAL) BYTE COUNT', byteCount)

        /* Add byte count to send amount. */
        // NOTE: It's the original amount - 1 sat/byte for tx size
        // FIXME: Recommendation is to use 1.1 sat/byte
        txAmount = sendAmount + byteCount
        console.log('(FINAL) TRANSACTION AMOUNT (incl bytes)', txAmount)

        // *********************************************************************
        // *********************************************************************
        // FIXME: We MUST re-validate for a sufficient transaction amount.
        // *********************************************************************
        // *********************************************************************

        /* Set locktime (for immediate propagation). */
        transactionBuilder.setLockTime(0)

        /* Sign input(s). */
        // FIXME: Why are we using a "getter" here for a "reference" update??
        availableInputs.forEach((input, index) => {
            getters.getSignedInput(transactionBuilder, hdNode, index, input)
        })

        /* Build transaction. */
        const tx = transactionBuilder.build()
        console.log('TRANSACTION BUILD', tx)

        /* Set tx output to raw hex. */
        const rawTx = tx.toHex()
        console.info('(Final) Raw transaction', rawTx) // eslint-disable-line no-console

        /* Set state. */
        // this.sendState = 'sending'

        /* Broadcast transaction to network. */
        bitbox.RawTransactions.sendRawTransaction(rawTx)
            .then(
                (result) => {
                    console.log('TX RESULT', result)

                    /* Validate change. */
                    if (hasChange) {
                        /* Increment receiving wallet (index). */
                        dispatch('nextAccount', 'BCH')
                    }

                    /* Increment receiving wallet (index). */
                    // FIXME: Verify that a change account was used.
                    dispatch('updateAccounts', {
                        action: 'disable',
                        indexes: accountIndexes,
                        wallet: 'BCH',
                    })

                    /* Display notification. */
                    dispatch('displayNotification',
                        'Sent successfully!', { root: true })

                    /* Set flag. */
                    // this.sendState = 'idle'
                },
                (err) => {
                    console.error('TX SEND ERROR:', err)

                    /* Validate error. */
                    if (err && err.error && err.error.includes('insufficient priority')) {
                        return dispatch('displayError',
                            `Blockchain fee is too low (${(inputsTotal - txAmount)} sats)`,
                            { root: true })
                    }

                    /* Display error. */
                    dispatch('displayError',
                        err.message ? err.message.split(';')[0] : err, { root: true })

                    /* Set flag. */
                    // this.sendState = 'idle'
                }
            )
    } catch (err) {
        console.error(err) // eslint-disable-line no-console

        /* Display error. */
        dispatch('displayError',
            err.message ? err.message.split(';')[0] : err, { root: true })

        /* Set flag. */
        // FIXME: Add this to the `system` module.
        // this.sendState = 'idle'

        /* Bugsnag alert. */
        throw new Error(err)
    }
}

/* Export module. */
export default sendCrypto
