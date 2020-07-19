<template>
    <div id="expenses" class="tabs">
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
                    <td>{{item.expensesAmount}}</td>
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
            expenses: [],
        }
    },
    created: function () {
        /* Sample expenses. */
        const expenses = {
            txid: 'some-random-transaction-id',
            label: 'Development',
            expensesAmount: '100%',
            comments: 'To be determined',
        }

        this.expenses.push(expenses)
    },
}
</script>

<style scoped>
#expenses table {
  width: 100%;
}
#expenses table tr th, #expenses table tr td {
  border: 1px solid #ededed;
  padding: 15px;
}
</style>
