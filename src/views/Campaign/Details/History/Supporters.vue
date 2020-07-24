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
                <tr v-for="supporter of supporters" :key="supporter.txid">
                    <td>{{supporter.name}}</td>
                    <td>{{supporter.pledgeAmount}}</td>
                    <td>{{supporter.pledgedAt}}</td>
                </tr>
                <!-- <tr>
                    <td>Andrew</td>
                    <td>$80</td>
                    <td>June 15, 2017</td>
                </tr> -->
            </tbody>
        </table>
    </div>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            supporters: [],
        }
    },
    created: function () {
        /* Sample supporter. */
        const supporter = {
            txid: 'some-random-transaction-id',
            name: 'Satoshi N.',
            pledgeAmount: '$13.37',
            pledgedAt: moment().subtract(3, 'hours').format('lll'),
        }

        this.supporters.push(supporter)
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
