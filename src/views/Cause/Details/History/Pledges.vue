<template>
    <div class="col-lg-4">
        <div class="support support-campaign">
            <h3 class="support-campaign-title">Back this Cause</h3>

            <p class="campaignTypeDesc">
                All pledges are placed into escrow to be withdrawn based on the preset terms of the DRIPP campaign.
            </p>

            <div class="plan" v-for="pledge of pledges" :key="pledge.id">
                <button>
                    <h3 class="text-uppercase">{{pledge.title}}</h3>

                    <h2>Official Account Address</h2>
                    <h4>
                        {{addressDisplay(pledge.address)}}
                        <i class="fa fa-qrcode ml-2" aria-hidden="true"></i>
                    </h4>

                    <div class="plan-desc" v-html="pledge.summary" />

                    <div class="plan-date">
                        {{pledge.dueAt}}
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
            pledges: [],
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
        ]),

        ...mapGetters('utils', [
            'getMarkdown',
        ]),

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
         * Load Pledges
         */
        loadPledges() {
            /* Set pledges. */
            const pledges = this.campaign.pledges
            // console.log('PLEDGE (pledges):', pledges)

            /* Load pledges. */
            Object.keys(pledges).forEach(pledgeId => {
                /* Set pledge. */
                const pledge = {
                    id: pledgeId,
                    ...pledges[pledgeId]
                }

                // console.log('PLEDGE (pledge):', pledge)

                /* Retrieve (stored) asset. */
                const asset = this.getAsset(
                    this.campaign.ownerId,
                    `${this.campaign.slug}.pledge.${pledge.id}.summary`
                )
                // console.log('PLEDGE (asset):', asset)

                /* Set asset summary. */
                pledge.summary = this.getMarkdown(asset)

                /* Add pledge. */
                this.pledges.push(pledge)
            })
        },

        /**
         * Update Pledges
         */
        updatePledges() {
            /* Set pledges. */
            const pledges = this.campaign.pledges
            // console.log('PLEDGE (pledges):', pledges)

            /* Load pledges. */
            Object.keys(pledges).forEach(pledgeId => {
                /* Set pledge. */
                const pledge = {
                    id: pledgeId,
                    ...pledges[pledgeId]
                }

                // console.log('PLEDGE (pledge):', pledge)

                /* Initialize asset. */
                let asset = null

                /* Set asset. */
                asset = {
                    owner: this.campaign.ownerId,
                    id: `${this.campaign.slug}.pledge.${pledge.id}.summary`,
                    target: pledge.summary,
                }

                /* Request asset update. */
                this.updateAsset(asset)

                /* Set asset. */
                asset = {
                    owner: this.campaign.ownerId,
                    id: `${this.campaign.slug}.pledge.${pledge.id}.description`,
                    target: pledge.description,
                }

                /* Request asset update. */
                this.updateAsset(asset)
            })
        },

    },
    created: function () {
        /* Update pledges. */
        // this.updatePledges()

        /* Load pledges. */
        this.loadPledges()
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
