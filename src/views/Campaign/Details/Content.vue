<template>
    <div class="campaign-content">
		<div class="container">
			<div class="">
			<!-- <div class="campaign"> -->

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
                                <span class="ion-location"></span>
                                {{campaignType}}
                            </div>
						</div>

                        <div class="process">
							<div class="raised">
                                <span></span>
                            </div>

                            <div class="process-info">
								<div class="process-funded">
                                    <span>$10000</span>funding goal
                                </div>

                                <div class="process-pledged">
                                    <span>$100</span>pledged
                                </div>

                                <div class="process-time">
                                    <span>2</span>backers
                                </div>

                                <div class="process-time">
                                    <span>1</span>days ago
                                </div>
							</div>
						</div>

                        <div class="share">
                            <!-- <p>
                                Share this project <em class="text-muted">(auto affiliate links)</em>
                            </p> -->

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

                        <div class="button">
                            <a href="javascript://" class="btn-primary view-pledge">
                                Back this Campaign
                            </a>

                            <a href="javascript://" class="btn-secondary">
                                <i class="fa fa-heart" aria-hidden="true"></i>
                                Remind me
                            </a>

                            <div class="spopup-bg"></div>

                            <div class="pledge-popup start-popup">
                                <div class="spopup-title">
                                    <h3>{{title}}</h3>

                                    <div class="spopup-close">
                                        <span class="ion-ios-close-empty"></span>
                                    </div>
                                </div>

                                <div class="spopup-content">
                                    <div class="qr-code text-center" v-html="qr" />

                                    <ul>
                                        <li>
                                            <h4>Please <i class="fa fa-heart text-danger"></i> and support our cause <i class="fa fa-arrow-down"></i></h4>
                                            <a :href="'https://explorer.bitcoin.com/bch/address/' + pledgeAddress" target="_blank"><strong>{{pledgeAddress}}</strong></a>
                                        </li>

                                        <hr />

                                        <li>
                                            <h4>Payment processing fees</h4>

                                            <div class="fee-desc">
                                                <p>
                                                    3% + €0.20 per pledge
                                                </p>

                                                <p>
                                                    Pledges under €10 have a discounted micropledge fee of 5% + €0.05 per pledge
                                                </p>
                                            </div>
                                        </li>
                                    </ul>
                                </div>
                            </div>
						</div>

					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
import DOMPurify from 'dompurify'
import QRCode from 'qrcode'
import showdown from 'showdown'

/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

function makePages() {
    $.each(this.owl.userItems, function (i) {
        $('.owl-controls .owl-page').eq(i)
        .css({
            'background': 'url(' + $(this).find('img').attr('src') + ')',
            'background-size': 'cover',
        })
    })
}

export default {
    props: {
        campaign: Object,
    },
    components: {
        // Summary,
    },
    data: () => {
        return {
            //
        }
    },
    watch: {
        campaign: function (_campaign) {
            if (_campaign && _campaign.images) {
                /* Wait a tick. */
                setTimeout(() => {
                    $("#campaign-gallery").owlCarousel({
                        navigation: true,
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
            'getMarkdown',
        ]),

        category() {
            if (this.campaign && this.campaign.category) {
                switch(this.campaign.category) {
                case 'adoption':
                    return 'Adoption'
                case 'community':
                    return 'Community'
                case 'dapp':
                    return 'Decentralized App'
                case 'design-art':
                    return 'Design & Art'
                case 'education':
                    return 'Education'
                case 'film-video':
                    return 'Film & Video'
                case 'fun-games':
                    return 'Fun & Games'
                case 'hardware':
                    return 'Hardware'
                case 'health-wellness':
                    return 'Health & Wellness'
                case 'infrastructure':
                    return 'Infrastructure'
                case 'music':
                    return 'Music'
                case 'privacy':
                    return 'Privacy'
                case 'publishing':
                    return 'Publishing'
                case 'security':
                    return 'Security'
                case 'software':
                    return 'Software'
                case 'world-view':
                    return 'World View'
                case 'youth':
                    return 'Youth'
                default:
                    return 'Unknown Category'
                }
            } else {
                return null
            }
        },

        campaignType() {
            /* Validate campaign funds. */
            if (!this.campaign || !this.campaign.funds) {
                return null
            }

            /* Initialize type. */
            let type = null

            /* Set pledge type. */
            if (this.fundId) {
                type = this.campaign.funds[this.fundId].type
            } else {
                const defaultId = Object.keys(this.campaign.funds).find(fundId => {
                    return this.campaign.funds[fundId].isDefault === true
                })

                /* Set default fund type. */
                type = this.campaign.funds[defaultId].type
            }

            if (type) {
                /* Handle campaign type. */
                switch(type) {
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

        title() {
            /* Validate campaign funds. */
            if (!this.campaign || !this.campaign.funds) {
                return null
            }

            /* Return pledge title. */
            if (this.fundId) {
                return this.campaign.funds[this.fundId].title
            } else {
                const defaultId = Object.keys(this.campaign.funds).find(fundId => {
                    return this.campaign.funds[fundId].isDefault === true
                })

                /* Return default fund title. */
                return this.campaign.funds[defaultId].title
            }
        },

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

        qr() {
            if (!this.pledgeAddress) {
                return null
            }

            /* Initialize (string) value. */
            let strValue = ''

            /* Initialize scanner parameters. */
            const params = {
                type: 'svg',
                width: 225,
                height: 225,
                color: {
                    dark: '#000',
                    light: '#fff'
                }
            }

            QRCode.toString(this.pledgeAddress, params, (err, value) => {
                if (err) {
                    return console.error('QR Code ERROR:', err)
                }

                /* Set (string) value. */
                strValue = value
            })

            /* Return (string) value. */
            return strValue
        },

        ownerLabel() {
            if (this.campaign && this.campaign.owner.label) {
                return this.campaign.owner.label
            } else {
                return null
            }
        },

        ownerAvatar() {
            if (this.campaign && this.campaign.owner.avatar) {
                return this.campaign.owner.avatar
            } else {
                return null
            }
        },

        images() {
            /* Validate campaign. */
            if (!this.campaign) {
                return null
            }

            /* Initialize images. */
            const images = []

            /* Validate main image. */
            if (this.campaign.images && this.campaign.images.main) {
                images.push(this.campaign.images.main)
            }

            // /* Validate gallery images. */
            if (this.campaign.images && this.campaign.images.gallery) {
                let max = 2
                for (let i = 0; i < this.campaign.images.gallery.length; i++) {
                    images.push(this.campaign.images.gallery[i])

                    // FIXME: Increase the maximum gallery size.
                    if (i + 1 === max) break
                }
            }

            /* Return images. */
            return images
        },
    },
    methods: {
        /**
         * Cleaner
         *
         * Uses DOM Purify to sanitize HTML.
         * (source: https://github.com/cure53/DOMPurify)
         */
        cleaner(_html) {
            /* Return cleaned HTML. */
            return DOMPurify.sanitize(_html)
        },

        /**
         * Markdown Manager
         *
         * Generates HTML from markdown and vice-versa.
         * (source: https://github.com/showdownjs/showdown)
         */
        markdown(_content) {
            /* Initialize converter. */
            const converter = new showdown.Converter()

            /* Set converter to GitHub Flavored Markdown (GFM). */
            converter.setFlavor('github')

            /* Generate HTML content. */
            const html = converter.makeHtml(_content)
            // console.log('HTML', html)

            /* Sanitize HTML content. */
            // const sanitized = this.cleaner(html)

            /* Format HTML. */
            // NOTE: Display fixes, probably related to our CSS.
            const sanitized = html
                .replace(/<ol>/gi, `<ol class="markdown-ul">`)
                .replace(/<ul>/gi, `<ul class="markdown-ul">`)

            /* Return sanitized content (for display). */
            // return sanitized
            return sanitized
        },
    },
    created: function () {
        //
    },
    mounted: function () {
        $('.view-pledge').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().find('.spopup-bg').fadeIn()
			$(this).parent().parent().find('.pledge-popup').fadeIn()
		})
		$('.spopup-bg').on('click', function (e) {
			e.preventDefault()
			$(this).fadeOut()
			$(this).parent().find('.pledge-popup').fadeOut()
			$(this).parent().find('.item-popup').fadeOut()
		})
		$('.spopup-close').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().fadeOut()
			$(this).parent().parent().parent().find('.spopup-bg').fadeOut()
		})
    }
}
</script>

<style scoped>
.qr-code {
    /* margin: 0 0 10px 10px; */
    /* margin: 20px auto; */
    padding: 0;
    /* border: 1pt solid rgba(200, 200, 200, 0.2); */
    /* float: right; */
}

.share {
    float: right;
    margin: 0;
    padding: 0;
}
</style>
