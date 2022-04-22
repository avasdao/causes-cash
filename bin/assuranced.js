#!/usr/bin/env node

/* Import core modules. */
const debug = require('debug')('causes:assuranced')
const numeral = require('numeral')
const moment = require('moment')
const Nito = require('nitojs')
const PouchDB = require('pouchdb')
const util = require('util')

const BITBOX = require('bitbox-sdk').BITBOX
const bitbox = new BITBOX()

/* Initialize databases. */
const assurancesDb = new PouchDB('data/assurances')
const campaignsDb = new PouchDB('data/campaigns')
const profilesDb = new PouchDB('data/profiles')

// /* Initialize privacy transactions arrays. */
// let fusionTxs = []
// let shuffleTxs = []
//
// /* Initialize error count. */
// let errors = 0
//
// /* Initialize logging direction. */
// // NOTE: This is used for updating the status.
// let logDirection = null
//
// /* Initialize block counters. */
// let activeBlock = null
// let blockHeight = null
// let newestBlock = null
//
// /* Set constants. */
// const API_DELAY = 1100 // 1.1 seconds
// const BCH_SATOSHIS = 100000000
// const ERRORS_MAX = 10
//
// /**
//  * Delay (Execution)
//  */
// const delay = (ms) => new Promise(resolve => setTimeout(resolve, ms))
//
// /**
//  * Is Transaction Shuffled
//  *
//  * We use the shape detection specified in the `is_coin_shuffled` method
//  * of the Electron Cash wallet:
//  *
//  *     (1) Being in a tx where there are at least 3 outputs of the same amount.
//  *
//  *     (2) Being in a tx where if you group the outputs by amount, the UTXO in
//  *         question belongs to the longest (or tied for longest) group.
//  *         NOTE: This is NOT applicaable, as we ONLY care about the transaction,
//  *               NOT a specific UTXO.
//  *
//  *     (3) All output addresses for this "group" must be different / unique.
//  */
// const isTxShuffled = (_tx) => {
//     /* Set input count. */
//     const numInputs = _tx.vin.length
//
//     /* Validate inputs. */
//     if (numInputs === 5) {
//         debug('isTxShuffled: Found [ 5 ] inputs.')
//     } else {
//         return false
//     }
//
//     /* Set outputs. */
//     const outputs = _tx.vout
//
//     /* Validate output count. */
//     if (outputs.length >= 5) {
//         debug('isTxShuffled: Found at least [ 5 ] outputs.')
//     } else {
//         return false
//     }
//
//     /* Validate output values. */
//     const baseValue = outputs[0].value
//     debug(`isTxShuffled: Base value is [ ${baseValue} ]`)
//     for (let i = 1; i < 5; i++) {
//         if (outputs[i].value === baseValue) {
//             debug(`isTxShuffled: Output [ ${i} ] matches base value.`)
//         } else {
//             return false
//         }
//     }
//
//     /* Validate output addresses. */
//     const addresses = {}
//     for (let i = 0; i < 5; i++) {
//         addresses[outputs[i].scriptPubKey.addresses[0]] = true
//     }
//     if (Object.keys(addresses).length === 5) {
//         debug(`isTxShuffled: Addresses are unique.`)
//     } else {
//         return false
//     }
//
//     return true
// }
//
// /**
//  * Handle Privacy Transaction
//  */
// const handlePrivacyTx = async (_type) => {
//     /* Initialize db. */
//     let db = null
//
//     /* Set privacy transactions. */
//     let privacyTxs = null
//
//     /* Select type. */
//     if (_type === 'fusion') {
//         console.info(`\n\tFound [ ${fusionTxs.length} ] fusion(s).\n`)
//         /* Set database. */
//         db = fusionDb
//
//         /* Set transactions. */
//         privacyTxs = fusionTxs
//     } else {
//         console.info(`\n\tFound [ ${shuffleTxs.length} ] shuffle(s).\n`)
//         /* Set database. */
//         db = shuffleDb
//
//         /* Set transactions. */
//         privacyTxs = shuffleTxs
//     }
//
//     /* Initialize id (aka block height. */
//     let _id = null
//
//     /* Initialize transactions. */
//     const txs = []
//
//     /* Initialize timestamp (aka block time). */
//     let timestamp = null
//
//     /* Loop through privacy transactions. */
//     privacyTxs.forEach(tx => {
//         /* Set id (aka block height). */
//         _id = tx.blockheight.toString()
//
//         /* Set timestamp (aka block time). */
//         timestamp = tx.blocktime
//
//         /* Select type. */
//         if (_type === 'fusion') {
//             // debug('Handling CashFusion tx:', tx)
//         } else {
//             // debug('Handling CashShuffle tx:', tx)
//         }
//
//         /* Calculate input min / max values. */
//         const _inpMinMax = () => {
//             /* Initialize high / low values. */
//             let min = Number.POSITIVE_INFINITY
//             let max = Number.NEGATIVE_INFINITY
//
//             tx.vin.forEach(vin => {
//                 /* Set value. */
//                 const value = vin.value
//
//                 /* Compare minimum. */
//                 if (value < min) min = value
//
//                 /* Compare maximum. */
//                 if (value > max) max = value
//             })
//
//             /* Return min / max. */
//             return { min, max }
//         }
//
//         /* Calculate output min / max values. */
//         const _outMinMax = () => {
//             /* Initialize high / low values. */
//             let min = Number.POSITIVE_INFINITY
//             let max = Number.NEGATIVE_INFINITY
//
//             tx.vout.forEach(vout => {
//                 /* Set value. */
//                 const value = parseInt(parseFloat(vout.value) * BCH_SATOSHIS)
//
//                 /* Skip the OP_RETURN. */
//                 if (value === 0) {
//                     return
//                 }
//
//                 /* Compare minimum. */
//                 if (value < min) min = value
//
//                 /* Compare maximum. */
//                 if (value > max) max = value
//             })
//
//             /* Return min / max. */
//             return { min, max }
//         }
//
//         /* Build (transaction) package. */
//         const txPkg = {
//             txid: tx.txid,
//             inputs: {
//                 count: tx.vin.length,
//                 value: parseInt(tx.valueIn * BCH_SATOSHIS),
//                 min: _inpMinMax().min,
//                 max: _inpMinMax().max,
//             },
//             outputs: {
//                 count: tx.vout.length,
//                 value: parseInt(tx.valueOut * BCH_SATOSHIS),
//                 min: _outMinMax().min,
//                 max: _outMinMax().max,
//             },
//             fees: parseInt(tx.fees * BCH_SATOSHIS),
//             size: tx.size
//         }
//
//         /* Add (transaction) package. */
//         txs.push(txPkg)
//     })
//
//     /* Validate transactions. */
//     if (txs && txs.length) {
//         /* Build (database) package. */
//         const dbPkg = { _id, txs, timestamp }
//         debug('DB package:', dbPkg)
//         // return debug('DB package:', dbPkg)
//         // return console.log('DB package:',
//         //     util.inspect(dbPkg, false, null, true))
//
//         /* Add to database. */
//         const response = await db.put(dbPkg)
//             .catch(err => console.error('ADD PRIVACY LOG ERROR:', err, dbPkg))
//         // debug('Add privacy log response:', response)
//     }
//
//     const status = await db.get('status')
//         .catch(err => console.error('STATUS ERROR:', err))
//
//     if (logDirection === 1) {
//         status.newest = activeBlock
//     } else if (logDirection === -1) {
//         status.oldest = activeBlock
//     }
//     // debug('Status:', status)
//
//     /* Update database. */
//     const response2 = await db.put(status)
//         .catch(err => console.error('UPDATE STATUS ERROR:', err, status))
//     // debug('Update status response:', response2)
// }
//
// /**
//  * Load Transactions
//  *
//  * NOTE: `rest.bitcoin.com` has a 20 tx limit.
//  * TODO: Migrate to `bitdb.devops.cash` when available.
//  */
// const loadTxs = async (_txs) => {
//     /* Request transaction details. */
//     const txDetails = await bitbox.Transaction
//         .details(_txs)
//         .catch(err => console.error(err))
//
//     /* Validate transaction details. */
//     if (txDetails) {
//         // debug('Transaction details:', txDetails)
//
//         txDetails.forEach(tx => {
//             /* Set zeroeth output. */
//             const zeroOut = tx.vout[0]
//             // debug('Output [ 0 ]:', zeroOut)
//
//             /* Validate zeroeth output. */
//             if (zeroOut) {
//                 const zeroValue = zeroOut.value
//                 // debug('Value:', zeroValue)
//
//                 debug('\n\t  Performing Privacy Checks')
//                 debug('\t----------------------------------------')
//
//                 if (isTxShuffled(tx)) {
//                     debug('\t  ✓ Shuffle Detection (PASSED)')
//
//                     /* Add to shuffle transactions. */
//                     shuffleTxs.push(tx)
//
//                     return debug('') // spacer
//                 } else {
//                     debug('\t  𝒙 Shuffle Detection (FAILED)')
//                 }
//
//                 /* Validate value. */
//                 if (parseFloat(zeroValue) === parseFloat(0.0)) {
//                     debug('\t  ✓ Zero Value Check (PASSED)')
//                 } else {
//                     debug('\t  𝒙 Zero Value Check (FAILED)')
//                     return debug('') // spacer
//                 }
//
//                 /* Valdate script. */
//                 const zeroScript = zeroOut.scriptPubKey.hex
//                 // debug('Script:', zeroScript)
//
//                 if (zeroScript.slice(0, 12) === '6a0446555a00') {
//                     debug('\t  ✓ OP_RETURN / Lokad Check (PASSED)')
//                 } else {
//                     debug('\t  𝒙 OP_RETURN / Lokad Check (FAILED)')
//                     return debug('') // spacer
//                 }
//                 debug('') // spacer
//
//                 /* Add to fusion transactions. */
//                 fusionTxs.push(tx)
//             } else {
//                 debug('Next transaction..')
//             }
//         })
//     } else {
//         console.error('Failed to process', `[ ${_txs.length} ]`, 'transactions.')
//         debug('Failed transactions:', _txs)
//
//         if (errors++ < ERRORS_MAX) {
//             console.error(`\n\tWaiting ${API_DELAY / 1000} secs for server. [ ${ERRORS_MAX - errors} ] errors remaining...\n`)
//             await delay(API_DELAY * 10) // ~10 seconds
//
//             // _txs = _txs.filter(txid => {
//             //     // NOTE: Bad address format `s-8f1a5a77bd8e884c66044ec2081a05b0`
//             //     //       https://blockchair.com/bitcoin-cash/address/s-8f1a5a77bd8e884c66044ec2081a05b0
//             //     return txid !== 'b639cc065248d3f4225800d77c35122f3cef78d001269ad011f4b500d48da2f4'
//             // })
//
//             /* Try again. */
//             await loadTxs(_txs)
//         } else {
//             console.error('\n\tBlockchain API has failed too many times. Taking a short break before exiting...\n')
//             await delay(API_DELAY * 900) // ~15 minutes
//
//             console.error('\n\tSorry (smh), exiting now!\n')
//
//             /* Quit application. */
//             process.exit(0)
//         }
//
//     }
// }
//
// /**
//  * Main Process
//  *
//  * Sample CashFusion block:
//  *   - 635498
//  *
//  * Sample CashFusion transaction:
//  *   - c75bcb5c011bb5131db498a33e3d2c195e1ee8d56bd6cfec6e3920ebfc0af4e2
//  */
// const loadBlocks = async (_blocks) => {
//     /* Reset transactions. */
//     fusionTxs = []
//     shuffleTxs = []
//
//     /* Reset error count. */
//     errors = 0
//
//     /* Set next blocks. */
//     const nextBlocks = _blocks
//
//     /* Request blocks. */
//     const blocks = await bitbox.Block
//         .detailsByHeight(nextBlocks)
//         .catch(err => console.error(err))
//
//     /* Validate blocks. */
//     if (blocks && blocks.length) {
//         // debug('Next blocks:', blocks)
//
//         /* Loop through all blocks. */
//         for (let i = 0; i < blocks.length; i++) {
//             /* Set block. */
//             const block = blocks[i]
//
//             /* Set transactions. */
//             // NOTE: We remove the coinbase transaction, as sometimes we have
//             //       a bug caused by non-standard addresses (only located in coinbase).
//             //       eg. s-8f1a5a77bd8e884c66044ec2081a05b0
//             //       https://blockchair.com/bitcoin-cash/address/s-8f1a5a77bd8e884c66044ec2081a05b0
//             const txs = block.tx.slice(1)
//
//             console.info('\n\tProcessing block',
//                 `#${block.height} from ${moment.unix(block.time).format('M/D')}`,
//                 `with [ ${numeral(txs.length).format('0,0')} ] transactions.\n`,
//             )
//
//             /* Validate maximum transaction request length. */
//             if (txs.length > 20) {
//                 for (let i = 0; i < txs.length; i += 20) {
//                     // FOR DEVELOPMENT PURPOSES ONLY
//                     // if (i > 200) break
//
//                     /* Load transactions. */
//                     await loadTxs(txs.slice(i, i + 20))
//
//                     /* Calculate remaining. */
//                     let remaining = txs.length - (i + 20)
//
//                     /* Validate remaining. */
//                     if (remaining > 0) {
//                         remaining = numeral(remaining).format('0,0')
//
//                         console.info(`\n\tWaiting ${API_DELAY / 1000} secs for next tx batch. [ ${remaining} ] txs remaining...\n`)
//                         await delay(API_DELAY)
//                     }
//                 }
//             } else {
//                 /* Load transactions. */
//                 await loadTxs(txs)
//             }
//
//             /* Handle privacy transactions. */
//             await handlePrivacyTx('fusion')
//             await handlePrivacyTx('shuffle')
//
//             console.info(`\n\tCompleted block [ #${activeBlock} ] successfully!`)
//         }
//     } else {
//         console.error('Could NOT process blocks', nextBlocks)
//
//         /* Quit application. */
//         process.exit(0)
//     }
// }

;(async () => {
    console.log('\nStarting Community Pledge Daemon...')

    const results = await assurancesDb.query('api/isIncomplete', {
        // key: ownerSlug,
        include_docs: true,
    }).catch(err => console.error('ASSURANCED ERROR:', err))
    console.log('RESULTS', util.inspect(results, false, null, true))

    /* Set pledges. */
    const pledges = results.rows[0].doc.pledges
    console.log('PLEDGES', pledges)

    const firstPledgeId = Object.keys(pledges)[0]

    /* Set txid. */
    const txid = pledges[firstPledgeId].previousTransactionHash
    console.log('UPDATE STATUS (txid)', txid)

    /* Set vout. */
    const vout = pledges[firstPledgeId].previousOutputIndex
    console.log('UPDATE STATUS (vout)', vout)

    /* Query spent status. */
    const isSpent = await Nito.Blockchain.Query.isSpent(txid, vout)
        .catch(err => console.error('ASSURANCED ERROR:', err))
    console.log('UPDATE STATUS (isSpent)', isSpent, txid, vout)

    /* Validate spent. */
    if (isSpent) {
        console.log('IS ALREADY SPENT')
    } else {
        console.log('HAS NOT BEEN SPENT')
    }


    // while (true) {
    //     const fusionStatus = await fusionDb.get('status')
    //         .catch(err => console.error('FUSION STATUS ERROR:', err))
    //     // debug('Fusion status:', fusionStatus)
    //
    //     const shuffleStatus = await shuffleDb.get('status')
    //         .catch(err => console.error('SHUFFLE STATUS ERROR:', err))
    //     // debug('Shuffle status:', shuffleStatus)
    //
    //     /* Request block height. */
    //     blockHeight = await bitbox.Blockchain.getBlockCount()
    //         .catch(err => console.error('BLOCK HEIGHT ERROR:', err))
    //     debug('Block height:', blockHeight)
    //
    //     /* Set minimum (newest block). */
    //     newestBlock = Math.min(fusionStatus.newest, shuffleStatus.newest)
    //     debug('Newest block:', newestBlock)
    //     console.info(`\n\tWe are [ ${blockHeight - newestBlock} ] block(s) behind the current block.\n`)
    //
    //     /* Determine log direction. */
    //     if (newestBlock === blockHeight) {
    //         logDirection = 0
    //     } else {
    //         logDirection = 1
    //         activeBlock = newestBlock + 1
    //     }
    //
    //     /* Validate log direction. */
    //     if (logDirection === 0) {
    //         /* Set maximum (oldest block). */
    //         const oldestBlock = Math.max(fusionStatus.oldest, shuffleStatus.oldest)
    //         debug('Oldest block:', oldestBlock)
    //
    //         logDirection = -1
    //         activeBlock = oldestBlock - 1
    //     }
    //     debug('Log direction:', logDirection)
    //     debug('Active block:', activeBlock)
    //
    //     /* Load blocks. */
    //     await loadBlocks([activeBlock])
    //
    //     /* Load transactions. */
    //     // loadTxs(['8b042ce2de08e7f946748a310a0c16c3bdd75184086fe2b9d9af321eb076a772'])
    //
    //     /* We can take our time now. */
    //     // FIXME: We need to move to BitDB or SocketDB for real-time feed.
    //     if ((blockHeight - newestBlock) === 0) {
    //         console.info('\n\tWaiting a minute to continue building history...');
    //         /* Wait a minute. */
    //         await delay(60000)
    //     }
    // }
})()
