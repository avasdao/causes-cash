/* Import modules. */
import { Wallet } from '@nexajs/wallet'

// import createGroup from './src/createGroup.js'
// import meltGroup from './src/meltGroup.js'
// import mintGroup from './src/mintGroup.js'
// import mintSubgroup from './src/mintSubgroup.js'
// import signMessage from './src/signMessage.js'

console.log('Starting NexaJS Daemon...')

const IS_LIVE_BROADCAST = false
const ACTIVE_ACCOUNT_IDX = 2
// 0 - nexa:... (master)
// 1 - nexa:... (minting)
// 2 - nexa:... (melting)
// 3 - nexa:... (signing)

;(async () => {
    /* Initialize locals. */
    let wallet

    /* Initialize wallet. */
    wallet = await Wallet.init({
        path: `m/44'/29223'/${ACTIVE_ACCOUNT_IDX}'/0/0`,
        mnemonic: process.env.MNEMONIC,
    }, false)

    return console.log('\nWALLET ADDRESS', wallet.address, '\n')

    if (ACTIVE_ACCOUNT_IDX === 1) {
        // createGroup(
        mintGroup(
        // mintSubgroup(
            wallet,
            'nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug', // Shomari (Robin Hood)
            100000,
            IS_LIVE_BROADCAST,
        )
    }

    if (ACTIVE_ACCOUNT_IDX === 2) {
        meltGroup(
            wallet,
            IS_LIVE_BROADCAST,
        )
    }

    if (ACTIVE_ACCOUNT_IDX === 3) {
        signMessage()
    }
})()
