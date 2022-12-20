# Daily Payouts

> __TL;DR__ Every cause gets its own token; allowing contributors to manage their individual contributions and vote on __how much__ gets distributed and __how often__ it gets distributed.

__Decentralized Radical Investment Performance Pool (DRIPP),__ is a NEW system based on DAICO. The proposal was originally made by Vitalik Buterin and Jason Teusch. DAICO's have NOT been used widely by the crypto community. However, the principles do make a lot of sense for our purposes here.

## How does it work?

Sponsors will contribute to a funding pool _(specific to a single cause);_ and collectively __VOTE__ to maintain control over the __rate of dispersement__ of funds held within the pool. At __ANY__ point during the campaign, contributors are free to withdraw __ANY__ portion of their own contributions/investments _(forfeiting their proportional voting rights)._

## Financial Independence

> Charity is injurious unless it helps the recipient to become independent of it. —John D. Rockefeller

The purpose of this program is NOT for the everlasting support of its contributors; but to develop a sustainable model for financial independence.

One-off campaigns are best served using one of the other models available here. However, for projects looking for sustainable income, this model is a first-step towards learning how to build a business.

## CashScript Contracts

### Mecenas Oracle

Learn more about __[Licho's Mecenas](https://cashscript.org/docs/language/examples#lichos-mecenas)__ contract at __[CashScript](https://cashscript.org/)__.

```
pragma cashscript ^0.4.0;

/**
 * Mecenas Oracle (Fixed Block)
 *
 * This contract enforces a specific market price for payouts to the
 * contract's recipient.
 *
 * A minimum block is provided to ensure that the oracle price
 *
 * A message with a block number and price from after the
 * current block `tx.time` is required.
 *
 * recipient : party whom will will receive the payouts
 * funder    : party whom is pledging the funding for payouts
 * pledgeAmt : value of each payout (in USD cents) eg. 1,337 = $13.37
 *             (NOTE: budgets are monthly, however payouts are daily)
 * oraclePk  : the public key for the price oracle
 */
contract MecenasOracleFixed(
    bytes20 recipient,
    bytes20 funder,
    bytes20 oracle,
    int pledgeAmt,
    int startingBlockHeight,
    pubkey oraclePk
) {
    /**
     * Payout
     *
     * Will make a payout to the recipient of the contract.
     *
     * pk        : public key of the transaction's originator
     * s         : signature of the transaction
     * oracleSig : (data / message) signature of the oracle
     * oracleMsg : payout authorization message from the oracle
     */
    function payout(pubkey pk, sig s, datasig oracleSig, bytes oracleMsg) {
        /* Validate signature of transaction's originator. */
        // NOTE: The transaction can be signed by anyone, because the money
        //       can only be sent to the recipient's registered address.
        require(checkSig(s, pk));

        /* Validate oracle's (data) signature. */
        require(checkDataSig(oracleSig, oracleMsg, oraclePk));

        /* Validate that the UTXO is at least 30 hours old. */
        // NOTE: This is notably longer than the Oracle Payout method
        //       below; to permit front-running and prevent contract abuse
        //       by bad actors.
        // REMOVED FOR DEVELOPMENT PURPOSES ONLY
        require(tx.age >= 30 hours);

        /* Set oracle-defined block height. */
        int oracleBlockHeight = int(oracleMsg.split(4)[0]);

        /* Validate minimum valid block height. */
        require(tx.time >= oracleBlockHeight);

        /* Validate minimum valid block height is greater than starting block height. */
        // NOTE: Oracle prices preceding contract creation are invalid.
        require(oracleBlockHeight >= startingBlockHeight);

        /* Set oracle-defined pledge amount. */
        int oraclePledgeAmt = int(oracleMsg.split(4)[1].split(4)[0]);

        /* Validate pledge amount. */
        require(oraclePledgeAmt == pledgeAmt);

        /* Set oracle-defined payout amount. */
        int oraclePayoutAmt = int(oracleMsg.split(8)[1]);

        /* Set (hardcoded) miner fee. */
        int minerFee = 1000;

        /* Retrieve the coin's value and cast it to an integer. */
        int coinValue = int(bytes(tx.value));

        /* Create an Output that sends the pledge amount to the recipient. */
        bytes34 payeeOutput = new OutputP2PKH(bytes8(oraclePayoutAmt), recipient);

        /* Calculate the coin remainder. */
        bytes8 remainder = bytes8(coinValue - oraclePayoutAmt - minerFee);

        /* Create an Output that sends the remainder back to the contract. */
        bytes32 contractOutput = new OutputP2SH(remainder, hash160(tx.bytecode));

        /* Enforce that these are the only outputs for the current transaction. */
        require(hash256(payeeOutput + contractOutput) == tx.hashOutputs);
    }

    /**
     * Oracle Payout
     *
     * Identical to the `payout` method above, however, we remove the
     * retriction on `tx.age` to permit front-running by the Oracle.
     *
     * Due to the current restrictions of CashScript, we are unable to expire
     * Oracle signatures, which allows them to be re-used. By replaying "old"
     * signatures, it is possible to abuse of the price mechanism of the
     * contract by bad actors.
     *
     * pk        : public key of the oracle
     * s         : (transaction) signature of the oracle
     * oracleSig : (data / message) signature of the oracle
     * oracleMsg : payout authorization message from the oracle
     */
    function oraclePayout(pubkey pk, sig s, datasig oracleSig, bytes oracleMsg) {
        /* Validate oracle's public key. */
        require(hash160(pk) == oracle);

        /* Validate oracle's (transaction) signature. */
        require(checkSig(s, pk));

        /* Validate oracle's (data / message) signature. */
        require(checkDataSig(oracleSig, oracleMsg, oraclePk));

        /* Validate that the UTXO is at least 24 hours old. */
        // REMOVED FOR DEVELOPMENT PURPOSES ONLY
        require(tx.age >= 24 hours);

        /* Set oracle-defined block height. */
        int oracleBlockHeight = int(oracleMsg.split(4)[0]);

        /* Validate minimum valid block height. */
        require(tx.time >= oracleBlockHeight);

        /* Validate minimum valid block height is greater than starting block height. */
        // NOTE: Oracle prices preceding contract creation are invalid.
        require(oracleBlockHeight >= startingBlockHeight);

        /* Set oracle-defined pledge amount. */
        int oraclePledgeAmt = int(oracleMsg.split(4)[1].split(4)[0]);

        /* Validate pledge amount. */
        require(oraclePledgeAmt == pledgeAmt);

        /* Set oracle-defined payout amount. */
        int oraclePayoutAmt = int(oracleMsg.split(8)[1]);

        /* Set (hardcoded) miner fee. */
        int minerFee = 1000;

        /* Retrieve the coin's value and cast it to an integer. */
        int coinValue = int(bytes(tx.value));

        /* Create an Output that sends the pledge amount to the recipient. */
        bytes34 payeeOutput = new OutputP2PKH(bytes8(oraclePayoutAmt), recipient);

        /* Calculate the coin remainder. */
        bytes8 remainder = bytes8(coinValue - oraclePayoutAmt - minerFee);

        /* Create an Output that sends the remainder back to the contract. */
        bytes32 contractOutput = new OutputP2SH(remainder, hash160(tx.bytecode));

        /* Enforce that these are the only outputs for the current transaction. */
        require(hash256(payeeOutput + contractOutput) == tx.hashOutputs);
    }

    /**
     * Reclaim
     *
     * Allows the funder to AT ANYTIME reclaim their remaining pledge(s).
     *
     * NOTE: This method is NOT dependent on the operation of the Oracle.
     */
    function reclaim(pubkey pk, sig s) {
        /* Validate funder's public key. */
        require(hash160(pk) == funder);

        /* Validate funder's transaction signature. */
        require(checkSig(s, pk));
    }
}
```
