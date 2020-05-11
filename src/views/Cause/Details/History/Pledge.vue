<template>
    <div class="col-lg-4">
        <div class="support support-campaign">
            <h3 class="support-campaign-title">Back this Cause</h3>

            <p class="campaignTypeDesc">
                All pledges are placed into escrow to be withdrawn based on the preset terms of the DRIPP campaign.
            </p>

            <div class="plan" v-for="account of accounts" :key="account.id">
                <a href="javascript://">
                    <h3 class="text-uppercase">{{account.title}}</h3>

                    <h2>Official Account Address</h2>
                    <h4>
                        {{addressDisplay(account.address)}}
                        <i class="fa fa-qrcode ml-2" aria-hidden="true"></i>
                    </h4>

                    <div class="plan-desc">
                        <p>
                            {{account.description}}
                        </p>
                    </div>

                    <div class="plan-date">
                        {{account.dueAt}}
                    </div>

                    <div class="plan-author">
                        Estimated Delivery
                    </div>

                    <div class="backer">
                        2 backer
                    </div>
                </a>
            </div>
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
            accounts: [],
        }
    },
    computed: {
        //
    },
    methods: {
        addressDisplay(_address) {
            return `${_address.slice(12, 24)} ... ${_address.slice(-12)}`
        },

    },
    created: function () {
        /* Set accounts. */
        const accounts = this.campaign.accounts
        // console.log('PLEDGE (accounts):', accounts)

        /* Load accounts. */
        Object.keys(accounts).forEach(accountId => {
            /* Set account. */
            const account = {
                id: accountId,
                ...accounts[accountId]
            }

            /* Add account. */
            this.accounts.push(account)
        })
    },
}
</script>

<style scoped>
.campaignTypeDesc {
    text-align: center;
    color: rgba(180, 30, 30, 0.5);
    margin-bottom: 25px;
}
</style>
