/* Import modules. */
import { Wallet } from '@nexajs/wallet'

// import createGroup from './src/createGroup.js'
// import meltGroup from './src/meltGroup.js'
// import mintGroup from './src/mintGroup.js'
// import mintSubgroup from './src/mintSubgroup.js'
// import signMessage from './src/signMessage.js'

console.log('Starting Causes Cash Daemon...')

const IS_LIVE_BROADCAST = false
const ACTIVE_ACCOUNT_IDX = 3
// 0 - nexa:nqtsq5g5czrrjztetwg3xhn2k9xmenlm8j6c744awg383n5a (master)
// 1 - nexa:nqtsq5g5l3n7dtqd8mfdx5dnsem7fpnzzjx3xyca09u9f632 (minting)
// 2 - nexa:nqtsq5g5x7evefxhusyp08wmk6xtu9rqee64uk0uaq28jnlk (~melting~ TradingPost Admin)
// 3 - nexa:nqtsq5g5h2a30rguxxnq40y2lsg5znx2nqrepqp7kllyc698 (signing)

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
