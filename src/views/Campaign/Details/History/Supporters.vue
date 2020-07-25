<template>
    <div id="supporters" class="tabs">
        <h1>Featured Supporters</h1>

        <table class="mt-3">
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Donate Amount</th>
                    <th>Date</th>
                </tr>
                <tr v-for="pledge of pledges" :key="pledge.previousTransactionHash">
                    <td>{{pledge.alias}}</td>
                    <td>{{pledge.satoshis}}</td>
                    <td>{{formatDate(pledge.createdAt)}}</td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
/* Import modules. */
import moment from 'moment'
import numeral from 'numeral'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            pledges: [],
        }
    },
    watch: {
        campaign: function (_campaign) {
            console.log('SUPPORTERS CAMPAIGN UPDATE', _campaign);
            if (_campaign && _campaign.assurance) {
                this.pledges = _campaign.assurance.pledges
            }
        },
    },
    methods: {
        formatAmount(_value) {
            if (_value) {
                return numeral(_value).format('$0,0[.]00')
            } else {
                return '$0.00'
            }
        },

        formatDate(_date) {
            if (_date) {
                return moment.unix(_date).format('lll')
            } else {
                return 'n/a'
            }
        },
    },
    created: function () {
        /* Sample pledge. */
        const pledge = {
            txid: 'some-random-transaction-id',
            name: 'Satoshi N.',
            pledgeAmount: '$13.37',
            pledgedAt: moment().subtract(3, 'hours').format('lll'),
        }

        this.pledges.push(pledge)
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
