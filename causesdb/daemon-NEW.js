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
// 0 - nexa:nqtsq5g5czrrjztetwg3xhn2k9xmenlm8j6c744awg383n5a (master)
// 1 - nexa:nqtsq5g5l3n7dtqd8mfdx5dnsem7fpnzzjx3xyca09u9f632 (minting)
// 2 - nexa:nqtsq5g5x7evefxhusyp08wmk6xtu9rqee64uk0uaq28jnlk (melting)

;(async () => {
    let wallet

    // return createGroup()
    // return signMessage()

    wallet = await Wallet.init({
        path: `m/44'/29223'/${ACTIVE_ACCOUNT_IDX}'/0/0`,
        mnemonic: process.env.MNEMONIC,
    }, false)

    return console.log('\nWALLET ADDRESS', wallet.address, '\n')

    meltGroup(
    // mintGroup(
    // mintSubgroup(
        wallet,
        // 'nexa:nqtsq5g5k2gjcnxxrudce0juwl4atmh2yeqkghcs46snrqug', // Shomari (Robin Hood)
        // 'nexa:nqtsq5g52285kqgw8c9gukavzj6n6cxav5cq48y86x3gwt0c', // Causes Cash
        // 'nexa:nqtsq5g5zmfck8fxlhkpxe28yu4a747l2e65kuptph2ajp8x',
        // 100000,
        IS_LIVE_BROADCAST,
    )
})()
