<template>
    <div class="container campaign-content">
		<div class="campaign-item clearfix">

            <div v-if="images" class="campaign-image">
				<div id="campaign-gallery" class="campaign-slider">
					<div class="item">
                        <img :src="images[0]" alt="">
                    </div>

                    <div class="item">
                        <img :src="images[1]" alt="">
                    </div>

                    <div class="item">
                        <img :src="images[2]" alt="">
                    </div>
				</div>
			</div>

            <div class="campaign-box">
                <div class="share">
                    <ul>
                        <li class="share-twitter">
                            <a href="javascript://"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                        </li>

                        <li class="share-google-plus">
                            <a href="javascript://"><i class="fa fa-reddit" aria-hidden="true"></i></a>
                        </li>

                        <!-- <li class="share-facebook">
                            <a href="javascript://"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                        </li> -->

                        <!-- <li class="share-linkedin">
                            <a href="javascript://"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                        </li> -->

                        <li class="share-code">
                            <a href="javascript://"><i class="fa fa-code" aria-hidden="true"></i></a>
                        </li>
                    </ul>
                </div>

                <a href="javascript://" class="category">{{category}}</a>

                <h3>{{title}}</h3>

                <div class="campaign-description clearfix">
                    <p v-html="summary" />
                </div>

                <div class="campaign-author">
					<div class="author-profile">
						<a class="author-icon" href="javascript://">
                            <img :src="ownerAvatar" alt=""></a>
                            by <a class="author-name" href="javascript://">{{ownerLabel}}</a>
					</div>

                    <div class="author-address">
                        <i v-if="campaignModel == 'Community Pledge'" class="fa fa-users" aria-hidden="true"></i>
                        <i v-if="campaignModel == 'Unknown campaign type'" class="fa fa-question" aria-hidden="true"></i>
                        {{campaignModel}}
                    </div>
				</div>

                <div class="process">
					<div class="raised">
                        <span></span>
                    </div>

                    <div class="row process-info">
                        <div class="col">
                            <span>{{fundingGoal}}</span>
                            funding goal
                        </div>

                        <div class="col">
                            <span>{{fundingPledged}}</span>
                            pledged
                        </div>

                        <div class="col">
                            <span>{{numSupporters}}</span>
                            supporters
                        </div>

                        <div class="col">
                            <span>{{lastUpdate}}</span>
                            {{lastUpdateSuffix}}
                        </div>
                    </div>
				</div>

                <div v-if="showActions" class="button">
                    <a href="javascript://" class="btn-primary" @click="showBacking">
                        Support this Campaign
                    </a>

                    <a href="javascript://" class="btn-secondary" @click="showActions = false; showReminder = true">
                        <i class="fa fa-heart" aria-hidden="true"></i>
                        Remind me
                    </a>
				</div>

			</div>
		</div>

        <div class="campaign-item clearfix">
            <Reminder v-if="showReminder" :campaign="campaign" @cancel="showReminder = false; showActions = true" />
            <Direct v-if="showDirect" :campaign="campaign" @cancel="showDirect = false; showActions = true" />
            <Assurance v-if="showAssurance" :campaign="campaign" @cancel="showAssurance = false; showActions = true" />
            <Payouts v-if="showPayouts" :campaign="campaign" @cancel="showPayouts = false; showActions = true" />
        </div>
	</div>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import numeral from 'numeral'

/* Import components. */
import Assurance from './Content/Assurance'
import Direct from './Content/Direct'
import Payouts from './Content/Payouts'
import Reminder from './Content/Reminder'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

/**
 * Make Pages
 *
 * Creates thumbnail images under the main photo.
 */
function makePages() {
    $.each(this.owl.userItems, function (i) {
        $('.owl-controls .owl-page').eq(i)
        .css({
            'background': 'url(' + $(this).find('img').attr('src') + ')',
            'background-size': 'cover',
            // 'padding': '5px',
            'margin': '5px',
            'width': '180px',
            'border': '1pt solid rgba(90, 90, 90, 0.2)',
            '-moz-border-radius': '10px',
            '-webkit-border-radius': '10px',
        })
    })
}

export default {
    props: {
        campaign: Object,
    },
    components: {
        Assurance,
        Direct,
        Payouts,
        Reminder,
    },
    data: () => {
        return {
            usd: null,

            pledgeAmount: null,
            name: null,
            comment: null,

            showActions: null,
            showReminder: null,
            showDirect: null,
            showAssurance: null,
            showPayouts: null,
        }
    },
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.media) {
                /* Wait a tick. */
                setTimeout(() => {
                    $("#campaign-gallery").owlCarousel({
                        // navigation: true,
                        navigationText: [
                            '<span class="ion-ios-arrow-back"></span>',
                            '<span class="ion-ios-arrow-forward"></span>'
                        ],
                        loop: true,
                        autoplay: true,
                        autoplayTimeout: 3000,
                        autoplayHoverPause: true,
                        singleItem: true,
                        afterInit: makePages,
                        afterUpdate: makePages
                    })
                }, 0)
            }
        },
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
        ]),

        ...mapGetters('utils', [
            'getCategoryDisplay',
            'getMarkdown',
        ]),

        /**
         * Category
         */
        category() {
            if (this.campaign && this.campaign.category) {
                return this.getCategoryDisplay(this.campaign.category)
            } else {
                return null
            }
        },

        /**
         * Campaign Model
         */
        campaignModel() {
            /* Validate campaign model. */
            if (!this.campaign || !this.campaign.model) {
                return null
            }

            /* Set model. */
            const model = this.campaign.model

            /* Validate model. */
            if (model) {
                /* Handle campaign type. */
                switch(model) {
                case 'direct':
                    return 'Direct Cash'
                case 'assurance':
                    return 'Community Pledge'
                case 'payouts':
                    return 'Daily Payouts'
                default:
                    return 'Unknown campaign type'
                }
            } else {
                return null
            }
        },

        /**
         * Title
         */
        title() {
            /* Validate campaign funds. */
            if (!this.campaign || !this.campaign.title) {
                return null
            }

            /* Return campaign title. */
            return this.campaign.title
        },

        /**
         * Summary
         */
        summary() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            /* Initialize summary. */
            let summary = null

            /* Retrieve summary. */
            summary = this.getAsset(
                this.campaign.owner.slug,
                `${this.campaign.slug}.summary`
            )
            // console.log('STORY (summary):', summary)

            /* Validate summary. */
            if (summary) {
                /* Return summary (in markdown). */
                return this.getMarkdown(summary)
            } else {
                return null
            }
        },

        /**
         * Pledge Address
         *
         * For direct donations from funders.
         */
        pledgeAddress() {
            /* Validate campaign funds. */
            if (!this.campaign || !this.campaign.funds) {
                return null
            }

            /* Return pledge address. */
            if (this.fundId) {
                return this.campaign.funds[this.fundId].address
            } else {
                const defaultId = Object.keys(this.campaign.funds).find(fundId => {
                    return this.campaign.funds[fundId].isDefault === true
                })

                /* Return default fund address. */
                return this.campaign.funds[defaultId].address
            }
        },

        /**
         * Owner Label
         */
        ownerLabel() {
            if (this.campaign && this.campaign.owner.label) {
                return this.campaign.owner.label
            } else {
                return null
            }
        },

        /**
         * Owner Avatar
         */
        ownerAvatar() {
            if (this.campaign && this.campaign.owner.avatar) {
                return this.campaign.owner.avatar
            } else {
                return null
            }
        },

        /**
         * Images
         */
        images() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            /* Initialize images. */
            const images = []

            /* Validate main image. */
            if (this.campaign.media && this.campaign.media.main) {
                images.push(this.campaign.media.main)
            }

            // /* Validate gallery images. */
            if (this.campaign.media && this.campaign.media.gallery) {
                let max = 2
                for (let i = 0; i < this.campaign.media.gallery.length; i++) {
                    images.push(this.campaign.media.gallery[i])

                    // FIXME: Increase the maximum gallery size.
                    if (i + 1 === max) break
                }
            }

            /* Return images. */
            return images
        },

        /**
         * Details
         */
        details() {
            if (!this.campaign || !this.campaign.model) {
                return null
            }

            /* Set model. */
            const model = this.campaign.model

            if (model === 'assurance') {
                return JSON.stringify(this.campaign.assurance, null, 2)
            }

            return null
        },

        /**
         * Satoshis
         */
        satoshis() {
            if (!this.campaign || !this.campaign.model) {
                return 0
            }

            /* Set model. */
            const model = this.campaign.model

            if (model === 'assurance') {
                return this.campaign.assurance.recipients[0].satoshis
            }

            return 0
        },

        /**
         * Address
         */
        address() {
            if (!this.campaign || !this.campaign.model) {
                return 0
            }

            /* Set model. */
            const model = this.campaign.model

            if (model === 'assurance') {
                return this.campaign.assurance.recipients[0].address
            }

            return 0
        },

        /**
         * Pledge
         *
         * Used by community pledges.
         */
        pledge() {
            const json = {
                outputs: [{
                    value: this.satoshis,
                    address: this.address
                }],
                data: {
                    alias: this.name,
                    comment: this.comment
                },
                donation: {
                    amount: this.pledgeAmount
                },
                expires: 1596168000
            }

            return Buffer.from(JSON.stringify(json)).toString('base64')
        },

        /**
         * Funding Goal
         */
        fundingGoal() {
            if (this.campaign && this.campaign.assurance) {
                /* Set recipients. */
                const recipients = this.campaign.assurance.recipients

                /* Validate recipients. */
                if (!recipients) {
                    return '$0.00'
                }

                const calc = (recipients[0].satoshis / 100000000 * this.usd)

                return numeral(calc).format('$0,0[.]00')
            }

            return 'n/a'
        },

        /**
         * Funding Pledged
         */
        fundingPledged() {
            if (this.campaign && this.campaign.assurance) {
                /* Set recipients. */
                const recipients = this.campaign.assurance.recipients

                /* Validate recipients. */
                if (!recipients) {
                    return '$0.00'
                }

                // FOR DEV ONLY
                const calc = (recipients[0].satoshis / 100000000 * this.usd) / 2.5

                return numeral(calc).format('$0,0[.]00')
            }

            return 'n/a'
        },

        numSupporters() {
            return 50
        },

        lastUpdate() {
            return 12
        },

        lastUpdateSuffix() {
            return 'days ago'
        }

    },
    methods: {
        /**
         * Show Backing
         */
        showBacking() {
            /* Hide actions. */
            this.showActions = false

            this.showAssurance = true
        },

    },
    created: async function () {
        /* Initialize flag. */
        this.showActions = true

        /* Initialize pledge amount. */
        this.pledgeAmount = 0

        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        console.info(`Market price (USD)`, this.usd)
    },
    mounted: function () {
        //
    }
}
</script>

<style scoped>
.campaign-slider .item img {
    -moz-border-radius: 10px;
    -webkit-border-radius: 10px;
    border-radius: 10px; /* future proofing */
    -khtml-border-radius: 10px; /* for old Konqueror browsers */

    border: 1pt solid rgba(90, 90, 90, 0.2);
}

.share {
    float: right;
    margin: 0;
    padding: 0;
}
</style>
