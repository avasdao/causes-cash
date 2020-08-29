<template>
    <div class="container campaign-content">

		<div v-if="campaign && !campaign.isPublished" class="campaign-not-found clearfix">
            <h1>CAMPAIGN NOT FOUND</h1>

            <p class="p-3 mt-3">
                <!-- We are sorry, but the campaign link you entered cannot be found. -->
                Sorry we can't find that campaign.
                Please check the link URL and try again.
            </p>

            <div class="col-12 col-md-7 form-group p-3">
                <input
                    type="text"
                    class="form-control"
                    placeholder="Search by name, title, or town/city"
                >
            </div>
        </div>

		<div v-if="campaign && campaign.isPublished" class="campaign-item clearfix">

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
                            by <a class="author-name" href="javascript://">{{ownerName}}</a>
					</div>

                    <div class="author-address">
                        <i v-if="campaignModel == 'Cash Payouts'" class="fa fa-money mr-1" aria-hidden="true"></i>
                        <i v-if="campaignModel == 'Community Pledge'" class="fa fa-users mr-1" aria-hidden="true"></i>
                        <i v-if="campaignModel == 'Direct Donation'" class="fa fa-btc mr-1" aria-hidden="true"></i>
                        <i v-if="campaignModel == 'Unknown campaign type'" class="fa fa-question mr-1" aria-hidden="true"></i>
                        {{campaignModel}}
                    </div>
				</div>

                <div class="process">
					<div class="raised">
                        <span v-if="campaignModel == 'Community Pledge'"></span>
                    </div>

                    <div v-if="recipient" class="recipient-address">
                        <a :href="'https://explorer.bitcoin.com/bch/address/' + recipient" target="_blank">
                            <i class="fa fa-check-circle text-success ml-2 mr-1"></i>
                            <span class="text-secondary">{{recipient}}</span>
                        </a>

                        (<a href="javascript://">view proof</a>)
                    </div>

                    <div v-if="campaignModel == 'Community Pledge'" class="row process-info">
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
                            <span>{{remaining.time}}</span>
                            {{remaining.suffix}}
                        </div>
                    </div>

                    <div v-if="campaignModel == 'Cash Payouts'" class="row process-info">
                        <div class="col">
                            <span>{{fundingPledged}}</span>
                            <i class="fa fa-bitcoin" aria-hidden="true"></i>
                            IN <small>(last 30 days)</small>
                        </div>

                        <div class="col">
                            <span>$0.00</span>
                            <i class="fa fa-bitcoin" aria-hidden="true"></i>
                            OUT <small>(last 30 days)</small>
                        </div>

                        <div class="col">
                            <span>{{numSupporters}}</span>
                            supporters
                        </div>

                        <!-- <div class="col">
                            <span>{{remaining.time}}</span>
                            {{remaining.suffix}}
                        </div> -->
                    </div>

                    <div v-if="campaignModel == 'Direct Donation'" class="row process-info">
                        <div class="col">
                            <span>{{fundingGoal}}</span>
                            last 24hrs
                        </div>

                        <div class="col">
                            <span>{{fundingPledged}}</span>
                            last 30 days
                        </div>

                        <div class="col">
                            <span>{{numSupporters}}</span>
                            supporters
                        </div>

                        <!-- <div class="col">
                            <span>{{remaining.time}}</span>
                            {{remaining.suffix}}
                        </div> -->
                    </div>

				</div>

                <div v-if="showActions" class="button">
                    <a href="javascript://" class="btn-primary" @click="addMySupport">
                        <i class="fa fa-heart mr-2" aria-hidden="true"></i>
                        Add my support
                    </a>

                    <a href="javascript://" class="btn-warning mr-5" @click="stakePIF">
                        <i class="fa fa-flag mr-2" aria-hidden="true"></i>
                        Stake PIF
                    </a>

                    <a href="javascript://" class="btn-secondary" @click="remindMe">
                        <i class="fa fa-clock-o" aria-hidden="true"></i>
                        Remind me
                    </a>
				</div>

			</div>
		</div>

        <div v-if="campaign && campaign.isPublished" class="campaign-item clearfix">
            <Reminder v-if="showReminder" :campaign="campaign" @cancel="showReminder = false; showActions = true" />
            <Direct v-if="showDirect" :campaign="campaign" @cancel="showDirect = false; showActions = true" />
            <Assurance v-if="showAssurance" :campaign="campaign" @cancel="showAssurance = false; showActions = true" />
            <Payouts v-if="showPayouts" :campaign="campaign" @cancel="showPayouts = false; showActions = true" />
        </div>
	</div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import Nito from 'nitojs'
import moment from 'moment'
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
            'margin': '4px',
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
        isLoading: Boolean,
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
            if (_campaign && _campaign.media && _campaign.isPublished) {
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
            /* Validate campaign theme. */
            if (!this.campaign || !this.campaign.theme) {
                return null
            }

            /* Set theme. */
            const theme = this.campaign.theme

            /* Validate theme. */
            if (theme) {
                /* Handle campaign type. */
                switch(theme) {
                case 'direct':
                    return 'Direct Cash'
                case 'assurance':
                    return 'Community Pledge'
                case 'payouts':
                    return 'Cash Payouts'
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

        recipient() {
            if (this.campaign && (this.campaign.assurances || this.campaign.payouts)) {
                if (this.campaign.assurances) {
                    const assuranceid = 0

                    /* Set recipient. */
                    const recipient = this.campaign.assurances[assuranceid].recipient

                    /* Validate recipient. */
                    if (!recipient) {
                        return ''
                    }

                    /* Return recipient address. */
                    return recipient.address
                }

                if (this.campaign.payouts) {
                    /* Set recipient. */
                    const recipient = this.campaign.payouts.recipient

                    /* Validate recipient. */
                    if (!recipient) {
                        return ''
                    }

                    /* Return recipient address. */
                    return recipient.address
                }
            }

            return ''
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
         * Owner Name
         */
        ownerName() {
            if (this.campaign && (this.campaign.owner.label || this.campaign.owner.nickname)) {
                return this.campaign.owner.label || this.campaign.owner.nickname
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
            if (!this.campaign || !this.campaign.theme) {
                return null
            }

            /* Set theme. */
            const theme = this.campaign.theme

            if (theme === 'assurance') {
                return JSON.stringify(this.campaign.assurances, null, 2)
            }

            return null
        },

        /**
         * Satoshis
         */
        satoshis() {
            if (!this.campaign || !this.campaign.theme) {
                return 0
            }

            /* Set theme. */
            const theme = this.campaign.theme

            const assuranceid = 0

            if (theme === 'assurance') {
                return this.campaign.assurances[assuranceid].recipient.satoshis
            }

            return 0
        },

        /**
         * Address
         */
        address() {
            if (!this.campaign || !this.campaign.theme) {
                return 0
            }

            /* Set theme. */
            const theme = this.campaign.theme

            const assuranceid = 0

            if (theme === 'assurance') {
                return this.campaign.assurances[assuranceid].recipient.address
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
            if (this.campaign && this.campaign.assurances) {
                const assuranceid = 0

                /* Set recipients. */
                const recipient = this.campaign.assurances[assuranceid].recipient

                /* Validate recipients. */
                if (!recipient) {
                    return '$0.00'
                }

                const calc = (recipient.satoshis / 100000000 * this.usd)

                return numeral(calc).format('$0,0[.]00')
            }

            return 'n/a'
        },

        /**
         * Funding Pledged
         */
        fundingPledged() {
            if (this.campaign && (this.campaign.assurances || this.campaign.payouts)) {
                if (this.campaign.assurances) {
                    const assuranceid = 0

                    /* Set pledges. */
                    const pledges = this.campaign.assurances[assuranceid].pledges

                    /* Validate recipients. */
                    if (!pledges) {
                        return '$0.00'
                    }

                    /* Initialize total. */
                    let pledgeTotal = 0

                    /* Loop through ALL pledges. */
                    Object.keys(pledges).forEach(pledgeid => {
                        /* Add satoshis to total. */
                        pledgeTotal += pledges[pledgeid].satoshis
                    })

                    /* Calculate USD total. */
                    const totalUSD = (pledgeTotal / 100000000 * this.usd)

                    /* Return formatted value. */
                    return numeral(totalUSD).format('$0,0.00')
                }

                if (this.campaign.payouts) {
                    /* Set funders. */
                    const funders = this.campaign.payouts.funders
                    // console.log('FUNDERS', funders);

                    /* Validate recipients. */
                    if (!funders) {
                        return '$0.00'
                    }

                    /* Initialize total. */
                    let funderTotal = 0

                    /* Loop through ALL funders. */
                    Object.keys(funders).forEach(funderid => {
                        /* Add satoshis to total. */
                        funderTotal += funders[funderid].monthlyPledgeAmt
                    })
                    // console.log('FUNDER TOTAL', funderTotal);

                    /* Calculate USD total. */
                    const totalUSD = (funderTotal / 1000000 * this.usd)
                    // console.log('TOTAL USD', totalUSD);

                    /* Return formatted value. */
                    return numeral(totalUSD).format('$0,0.00')
                }
            }

            return 'n/a'
        },

        numSupporters() {
            if (this.campaign && (this.campaign.assurances || this.campaign.payouts)) {
                if (this.campaign.assurances) {
                    const assuranceid = 0

                    /* Set pledges. */
                    const pledges = this.campaign.assurances[assuranceid].pledges

                    /* Validate recipients. */
                    if (!pledges) {
                        return 0
                    }

                    /* Return count. */
                    return Object.keys(pledges).length
                }

                if (this.campaign.payouts) {
                    /* Set funders. */
                    const funders = this.campaign.payouts.funders

                    /* Validate recipients. */
                    if (!funders) {
                        return 0
                    }

                    /* Return count. */
                    // FIXME: Limit to `nextPayoutAt` > 0
                    return Object.keys(funders).length
                }
            }

            return 'n/a'
        },

        remaining() {
            if (this.campaign && (this.campaign.assurances || this.campaign.payouts)) {
                if (this.campaign.assurances) {
                    const assuranceid = 0

                    /* Set remaining time. */
                    const expiresAt = this.campaign.assurances[assuranceid].expiresAt
                    console.log('expiresAt', expiresAt, moment().unix());

                    /* Set (remaining) time. */
                    let time = expiresAt - moment().unix()

                    /* Initialize suffix. */
                    let suffix = null

                    /* Calculate minimum value. */
                    if (time > 86400) {
                        time = parseInt(time / 60 / 60 / 24)
                        suffix = 'days to go'
                    } else if (time > 3600) {
                        time = parseInt(time / 60 / 60)
                        suffix = 'hours to go'
                    } else if (time > 60) {
                        time = parseInt(time / 60)
                        suffix = 'mins to go'
                    } else {
                        suffix = 'ending now'
                    }

                    /* Return time time w/ suffix. */
                    return { time, suffix }
                }

                if (this.campaign.payouts) {
                    return { time: 0, suffix: 'TODO' }
                }
            }

            return { time: 'n/a', suffix: '' }
        },

    },
    methods: {
        ...mapActions('utils', [
            'toast',
        ]),

        /**
         * Remind Me
         */
        remindMe() {
            this.toast(['Oops!', 'Campaign reminders are coming soon', 'error'])

            // this.showActions = false
            // this.showReminder = true
        },

        /**
         * Stake PIF
         */
        stakePIF() {
            this.toast(['Oops!', 'You have no PIF to stake', 'error'])

            // this.showActions = false
            // this.showBurn = true
        },

        /**
         * Add My Support
         */
        addMySupport() {
            /* Hide actions. */
            this.showActions = false

            /* Handle support window. */
            if (this.campaign.assurances) {
                /* Show assurance window. */
                this.showAssurance = true
            } else if (this.campaign.direct) {
                /* Show direct window. */
                this.showDirect = true
            } else if (this.campaign.payouts) {
                /* Show payouts window. */
                this.showPayouts = true
            } else {
                /* Show actions. */
                this.showActions = true

                /* Show error notif. */
                return this.toast(['Oops!', 'Support for this campaign has not started', 'error'])
            }
        },

    },
    created: async function () {
        /* Initialize flag. */
        this.showActions = true

        /* Initialize pledge amount. */
        this.pledgeAmount = 0

        this.usd = await Nito.Markets.getTicker('BCH', 'USD')
        // console.info(`Market price (USD)`, this.usd)
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

.process-info small {
    font-size: 0.7em;
    font-style: italic;
}

.recipient-address {
    font-size: 0.8em;
    margin-top: -10px;
}
.recipient-address a {
    display: inline-block;
}
</style>
