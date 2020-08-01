<template>
    <div id="funds" class="tabs">
        <div v-if="budget">
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
                        <td>{{item.amount}}</td>
                        <td>{{item.comments}}</td>
                    </tr>
                    <!-- <tr>
                        <td>Andrew</td>
                        <td>$80</td>
                        <td>June 15, 2017</td>
                    </tr> -->
                </tbody>
            </table>

            <hr />

            <h1>Campaign Expenses</h1>

            <p>
                Every campaign has a fixed expenses that will be reported publicly.
            </p>

            <table>
                <tbody>
                    <tr>
                        <th>Label</th>
                        <th>Amount</th>
                        <th>Comments</th>
                    </tr>
                    <tr v-for="item of expenses" :key="item.txid">
                        <td>{{item.label}}</td>
                        <td>{{item.amount}}</td>
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

        <div v-else class="campaigns">
            <h1>Use of funds</h1>

            <p class="m-3">
                There is no budget available
            </p>
        </div>

    </div>
</template>

<script>
export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            budget: null,
            expenses: null,
        }
    },
    created: function () {
        /* Sample budget. */
        // const budget = {
        //     txid: 'some-random-transaction-id',
        //     label: 'Development',
        //     amount: '100%',
        //     comments: 'To be determined',
        // }

        // this.budget.push(budget)

        /* Sample expenses. */
        this.expenses = [{
            txid: 'some-random-transaction-id',
            label: 'Food',
            amount: '$10',
            comments: 'To be determined',
        }]

        // this.expenses.push(expense)
    },
}
</script>

<style scoped>
#accounting table {
  width: 100%;
}
#accounting table tr th, #accounting table tr td {
  border: 1px solid #ededed;
  padding: 15px;
}
</style>
