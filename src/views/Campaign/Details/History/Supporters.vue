<template>
    <div id="supporters" class="tabs">
        <h1>Featured Supporters</h1>

        <table class="mt-3">
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
                    <td class="text-center">{{formatAmount(pledge.satoshis)}}</td>
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
            pledges: null,
        }
    },
    watch: {
        campaign: function (_campaign) {
            /* Handle campaign supporters. */
            if (_campaign && _campaign.assurances) {
                /* Set pledges. */
                const pledges = _campaign.assurances.pledges

                /* Handle all pledges. */
                Object.keys(pledges).filter(pledgeId => {
                    if (pledges[pledgeId].isFilled === true || pledges[pledgeId].isSpent === false) {
                        this.pledges.push(pledges[pledgeId])
                    }
                })

                /* Sort pledges (decending). */
                this.pledges.sort((a, b) => {
                    return b.satoshis - a.satoshis
                })
            }
        },
    },
    methods: {
        formatAmount(_amount) {
            const value = (_amount / 100000000) * this.usd

            if (value) {
                return numeral(value).format('$0,0[.]00')
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

        /* Initialize pledges. */
        this.pledges = []
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
