/* Import modules. */
import Bugsnag from '@bugsnag/js'
import Nito from 'nitojs'

/* Set dust amount (satoshis). */
const DUST = 546

/* Set fee amount (satoshis). */
const FEE = 270

/**
 * Delay (Execution)
 */
const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))

/**
 * Prepare Pledge
 *
 * Moves the required amount of satoshis to a coin on the Causes path `6767`,
 * for locking by the pledge authorization that follows.
 */
const preparePledge = async ({ getters, dispatch }, _pkg) => {
    // console.log('PLEDGE COIN:', _pkg)

    /* Set (source) coin. */
    const coin = _pkg.sourceCoin
    // console.log('COIN', coin)

    if (!coin) {
        return console.error('NO source coin!') // eslint-disable-line no-console
    }

    /* Set donation. */
    const donation = _pkg.donation
    // console.log('DONATION', donation)

    if (!donation) {
        return console.error('NO donation amount!') // eslint-disable-line no-console
    }

    /* Set Causes address. */
    const causesAddress = getters.getAddress('causes')
    // console.log('CAUSES ADDRESS', causesAddress)

    if (!causesAddress) {
        return console.error('NO output address!') // eslint-disable-line no-console
    }

    /* Build receivers. */
    const receivers = [{
        address: causesAddress,
        satoshis: donation,
    }]

    /* Validate change amount. */
    if ((coin.satoshis - donation) > (DUST + FEE)) {
        /* Set change address. */
        const changeAddress = getters.getAddress('change')
        // console.log('CHANGE ADDRESS', changeAddress)

        receivers.push(
            {
                address: changeAddress,
                satoshis: (coin.satoshis - donation - FEE),
            }
        )
    }
    // console.log('RECEIVERS', receivers)

    /* Set auto fee (flag). */
    const autoFee = false

    const results = await Nito.Transaction
        .sendCoin(coin, receivers, autoFee)
        .catch(Bugsnag.notify)
    // console.log('PLEDGE COIN (results):', results)

    /* Validate results. */
    if (results) {
        /* Wait 2 seconds. */
        console.info('Waiting for pledge coin to propagate on-chain...') // eslint-disable-line no-console
        await delay(2000)

        /* Update coins. */
        dispatch('updateCoins')
    }

    /* Return results. */
    return results
}

/* Export module. */
export default preparePledge
