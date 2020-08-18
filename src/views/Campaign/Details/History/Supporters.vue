<template>
    <div id="supporters" class="tabs">
        <h1>Featured Supporters</h1>

        <table class="mt-3" v-if="funders">
            <tbody>
                <tr>
                    <th>Nickname / Alias</th>
                    <th class="text-center">Comment</th>
                    <th class="text-center">Amount (USD)</th>
                    <th class="text-right">Time</th>
                </tr>
                <tr v-for="funder of funders" :key="funder.publicKeyHash + ':' + funder.monthlyPledgeAmt">
                    <td>{{funder.alias}}</td>
                    <td class="text-center">{{funder.comment}}</td>
                    <td class="text-center">
                        {{formatUSD(funder.monthlyPledgeAmt)}}
                        <small>[ <span class="text-danger">{{funder.payouts.length}}x</span> ]</small>
                    </td>
                    <td class="text-right">{{formatDate(funder.createdAt)}}</td>
                </tr>
            </tbody>
        </table>

        <table class="mt-3" v-if="pledges">
            <tbody>
                <tr>
                    <th>Nickname / Alias</th>
                    <th class="text-center">Comment</th>
                    <th class="text-center">Amount (USD)</th>
                    <th class="text-right">Time</th>
                </tr>
                <tr v-for="pledge of pledges" :key="pledge.previousTransactionHash + ':' + pledge.previousOutputIndex">
                    <td>{{pledge.alias}}</td>
                    <td class="text-center">{{pledge.comment}}</td>
                    <td class="text-center">{{formatSatoshis(pledge.satoshis)}}</td>
                    <td class="text-right">{{formatDate(pledge.createdAt)}}</td>
                </tr>
            </tbody>
        </table>

    </div>
</template>

<script>
/* Import modules. */
import moment from 'moment'
import Nito from 'nitojs'
import numeral from 'numeral'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            usd: null,
            funders: null,
            pledges: null,
        }
    },
    watch: {
        campaign: function (_campaign) {
            /* Handle campaign supporters. */
            if (_campaign && (_campaign.assurances || _campaign.payouts)) {
                console.log('CAMPAIGN HAS CHANGED, UPDATE SUPPORTERS!!', _campaign)

                /* Validate assurances. */
                if (_campaign.assurances) {
                    /* Set assurance id. */
                    const assuranceid = 0 // FIXME: Hard-coded to a single assurance campaign

                    /* Set pledges. */
                    const pledges = _campaign.assurances[assuranceid].pledges

                    /* Validate pledges. */
                    if (!pledges) {
                        return
                    }

                    /* Initialize pledges. */
                    this.pledges = []

                    /* Handle all pledges. */
                    Object.keys(pledges).filter(pledgeid => {
                        if (pledges[pledgeid].isFilled === true || pledges[pledgeid].isSpent === false) {
                            this.pledges.push(pledges[pledgeid])
                        }
                    })

                    /* Sort pledges (decending). */
                    this.pledges.sort((a, b) => {
                        return b.satoshis - a.satoshis
                    })
                }

                /* Validate payouts. */
                if (_campaign.payouts && _campaign.payouts.funders) {
                    /* Set funders. */
                    const funders = _campaign.payouts.funders

                    /* Validate funders. */
                    if (!funders) {
                        return
                    }

                    /* Initialize funders. */
                    this.funders = []

                    /* Handle all funders. */
                    Object.keys(funders).filter(funderid => {
                        if (funders[funderid].nextPayoutAt) {
                            this.funders.push(funders[funderid])
                        }
                    })

                    /* Sort funders (decending). */
                    this.funders.sort((a, b) => {
                        return b.monthlyPledgeAmt - a.monthlyPledgeAmt
                    })
                }

            }
        },
    },
    methods: {
        formatSatoshis(_amount) {
            const value = (_amount / 100000000) * this.usd

            if (value) {
                return numeral(value).format('$0,0[.]00')
            } else {
                return '$0.00'
            }
        },

        formatUSD(_amount) {
            const value = (_amount / 100)

            if (value) {
                return numeral(value).format('$0,0.00')
            } else {
                return '$0.00'
            }
        },

        formatDate(_date) {
            if (_date) {
                return moment.unix(_date).fromNow()
            } else {
                return 'n/a'
            }
        },
    },
    created: async function () {
        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)

        /* Validate assurances. */
        if (this.campaign.assurances) {
            /* Set assurance id. */
            const assuranceid = 0 // FIXME: Hard-coded to a single assurance campaign

            /* Set pledges. */
            const pledges = this.campaign.assurances[assuranceid].pledges

            /* Validate pledges. */
            if (!pledges) {
                return
            }

            /* Initialize pledges. */
            this.pledges = []

            /* Handle all pledges. */
            Object.keys(pledges).filter(pledgeid => {
                if (pledges[pledgeid].isFilled === true || pledges[pledgeid].isSpent === false) {
                    this.pledges.push(pledges[pledgeid])
                }
            })

            /* Sort pledges (decending). */
            this.pledges.sort((a, b) => {
                return b.satoshis - a.satoshis
            })
        }

        /* Validate payouts. */
        if (this.campaign.payouts && this.campaign.payouts.funders) {
            /* Set funders. */
            const funders = this.campaign.payouts.funders

            /* Validate funders. */
            if (!funders) {
                return
            }

            /* Initialize funders. */
            this.funders = []

            /* Handle all funders. */
            Object.keys(funders).filter(funderid => {
                if (funders[funderid].nextPayoutAt) {
                    this.funders.push(funders[funderid])
                }
            })

            /* Sort funders (decending). */
            this.funders.sort((a, b) => {
                return b.monthlyPledgeAmt - a.monthlyPledgeAmt
            })
        }
    },
}
</script>

<style scoped>
#supporters table {
  width: 100%;
}
#supporters table tr th, #supporters table tr td {
  border: 1px solid #ededed;
  padding: 15px;
}
</style>
