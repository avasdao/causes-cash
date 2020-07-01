<template>
    <div id="budget" class="tabs">
        <h1>Use of Funds</h1>

        <p>
            Every campaign has a fixed budget that will be followed strictly.
        </p>

        <table>
            <tbody>
                <tr>
                    <th>Label</th>
                    <th>Allocation</th>
                    <th>Comments</th>
                </tr>
                <tr v-for="item of budget" :key="item.txid">
                    <td>{{item.label}}</td>
                    <td>{{item.budgetAmount}}</td>
                    <td>{{item.comments}}</td>
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
export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            budget: [],
        }
    },
    created: function () {
        /* Sample budget. */
        const budget = {
            txid: 'some-random-transaction-id',
            label: 'Development',
            budgetAmount: '100%',
            comments: 'To be determined',
        }

        this.budget.push(budget)
    },
}
</script>

<style scoped>
#budget table {
  width: 100%;
}
#budget table tr th, #budget table tr td {
  border: 1px solid #ededed;
  padding: 15px;
}
</style>
