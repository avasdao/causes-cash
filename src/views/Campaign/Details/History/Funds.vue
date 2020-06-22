<template>
    <div class="col-lg-4">
        <div class="support support-campaign">
            <h3 class="support-campaign-title">Back this Cause</h3>

            <p class="campaignTypeDesc">
                All funds are placed into escrow to be withdrawn based on the preset terms of the DRIPP campaign.
            </p>

            <div class="plan" v-for="fund of funds" :key="fund.id">
                <button>
                    <h3 class="text-uppercase">{{fund.title}}</h3>

                    <h2>Official Account Address</h2>
                    <h4>
                        {{addressDisplay(fund.address)}}
                        <i class="fa fa-qrcode ml-2" aria-hidden="true"></i>
                    </h4>

                    <div class="plan-desc" v-html="fund.summary" />

                    <div class="plan-date">
                        {{fund.dueAt}}
                    </div>

                    <div class="plan-author">
                        Estimated Delivery
                    </div>

                    <div class="backer">
                        2 backer
                    </div>
                </button>
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

export default {
    props: {
        campaign: Object,
    },
    data: () => {
        return {
            // 
        }
    },
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.funds) {
                // console.log('CAMPAIGN HAS CHANGED, UPDATE FUNDS!!', _campaign.funds)

                /* Update funds. */
                this.updateFunds()
            }
        },
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
        ]),

        ...mapGetters('utils', [
            'getMarkdown',
        ]),

        funds() {
            /* Initialize all funds. */
            const allFunds = []

            if (this.campaign && this.campaign.funds) {
                /* Set funds. */
                const funds = this.campaign.funds
                // console.log('FUND (funds):', funds)

                /* Load funds. */
                Object.keys(funds).forEach(fundId => {
                    /* Set fund. */
                    const fund = {
                        id: fundId,
                        ...funds[fundId]
                    }
                    // console.log('FUND (fund):', fund)

                    /* Retrieve (stored) asset. */
                    const asset = this.getAsset(
                        this.campaign.owner.slug,
                        `${this.campaign.slug}.fund.${fund.id}.summary`
                    )
                    // console.log('FUND (asset):', asset)

                    /* Validate asset. */
                    if (asset) {
                        /* Set asset summary. */
                        fund.summary = this.getMarkdown(asset)

                        /* Add fund. */
                        allFunds.push(fund)
                    }
                })
                // console.log('FUNDS (allFunds):', allFunds)

                /* Return all funds. */
                return allFunds
            } else {
                return null
            }
        }

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

        /**
         * Address Display
         */
        addressDisplay(_address) {
            return `${_address.slice(12, 24)} ... ${_address.slice(-12)}`
        },

        /**
         * Update Funds
         */
        updateFunds() {
            /* Set funds. */
            const funds = this.campaign.funds
            // console.log('FUND (funds):', funds)

            /* Load funds. */
            Object.keys(funds).forEach(fundId => {
                /* Set fund. */
                const fund = {
                    id: fundId,
                    ...funds[fundId]
                }
                // console.log('FUND (fund):', fund)

                /* Initialize asset. */
                let asset = null

                /* Set asset. */
                asset = {
                    ownerSlug: this.campaign.owner.slug,
                    id: `${this.campaign.slug}.fund.${fund.id}.summary`,
                    target: fund.summary,
                }

                /* Request asset update. */
                this.updateAsset(asset)

                /* Set asset. */
                asset = {
                    ownerSlug: this.campaign.owner.slug,
                    id: `${this.campaign.slug}.fund.${fund.id}.description`,
                    target: fund.description,
                }

                /* Request asset update. */
                this.updateAsset(asset)
            })
        },

    },
    created: function () {
        //
    },
}
</script>

<style scoped>
.campaignTypeDesc {
    text-align: center;
    color: rgba(180, 30, 30, 0.5);
    margin-bottom: 25px;
}

.support-campaign {
  background-color: initial;
  padding: 0;
}
.support-campaign select {
  height: initial;
}
.support-campaign h3 {
  border-bottom: 1px solid #ededed;
  font-size: 16px;
  font-weight: 500;
  padding-bottom: 15px;
  position: relative;
  margin-bottom: 40px;
}
.support-campaign h3:after {
  content: '';
  position: absolute;
  bottom: 0;
  left: 0;
  width: 155px;
  background-color: #00a6eb;
  display: block;
  height: 1px;
}
.support-campaign .plan {
  border: 2px solid #ededed;
  border-radius: 2px;
  margin-bottom: 30px;
}
.support-campaign .plan button {
  display: block;
  border: 0;
  text-align: left;
  background-color: #f5f6f6;
  padding: 40px 25px;
  cursor: pointer;
}
.support-campaign .plan button:focus {
  background-color: #00a6eb;
  color: #fff;
}
.support-campaign .plan button:focus:hover {
  color: #fff;
}
.support-campaign .plan button:focus h4 {
  color: #fff;
}
.support-campaign .plan button:hover {
  color: #555555;
}
.support-campaign .plan h4 {
  font-size: 16px;
  font-weight: 500;
  margin-bottom: 22px;
}
.support-campaign .plan .plan-desc {
  margin-bottom: 16px;
}
.support-campaign .plan .backer {
  margin-top: 18px;
  font-weight: 500;
}
</style>
