<template>
    <div id="backers" class="tabs">
        <table>
            <tbody>
                <tr>
                    <th>Name</th>
                    <th>Donate Amount</th>
                    <th>Date</th>
                </tr>
                <tr v-for="backer of backers" :key="backer.txid">
                    <td>{{backer.name}}</td>
                    <td>{{backer.pledgeAmount}}</td>
                    <td>{{backer.pledgedAt}}</td>
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
            backers: [],
        }
    },
    created: function () {
        /* Sample backer. */
        const backer = {
            txid: 'some-random-transaction-id',
            name: 'Satoshi N.',
            pledgeAmount: '$13.37',
            pledgedAt: moment().subtract(3, 'hours').format('lll'),
        }

        this.backers.push(backer)
    },
}
</script>

<style scoped>
#backers table {
  width: 100%;
}
#backers table tr th, #backers table tr td {
  border: 1px solid #ededed;
  padding: 15px;
}
</style>
