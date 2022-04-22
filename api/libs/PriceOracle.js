/* Import modules. */
const Nito = require('nitojs')

/**
 * Price Oracle Class
 */
class PriceOracle {
    constructor(_keypair) {
        console.log('Initializing constructor...')

        /* Set keypair. */
        this.keypair = _keypair
    }

    /**
     * Create Message
     *
     * Encode the minimum block height, pledge amount and payout amount
     * into a byte sequence of 12 bytes (4 bytes per value).
     */
    createMessage(_blockHeight, _pledgeAmt, _payoutAmt) {
        const blockHeight = Buffer.alloc(4, 0)
        const pledgeAmt = Buffer.alloc(4, 0)
        const payoutAmt = Buffer.alloc(4, 0)

        Nito.Utils.encodeNumber(_blockHeight).copy(blockHeight)
        Nito.Utils.encodeNumber(_pledgeAmt).copy(pledgeAmt)
        Nito.Utils.encodeNumber(_payoutAmt).copy(payoutAmt)

        return Buffer.concat([blockHeight, pledgeAmt, payoutAmt])
    }

    /**
     * Sign Message
     */
    signMessage(message) {
        return this.keypair.sign(Nito.Crypto.sha256(message)).toDER()
    }
}

/* Export module. */
module.exports = PriceOracle
