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

                        <div class="campaign-description">
                            <p v-html="summaryDisplay" />
                        </div>

                        <div class="campaign-author clearfix">
							<div class="author-profile">
								<a class="author-icon" href="javascript://">
                                    <img :src="ownerAvatar" alt=""></a>
                                    by <a class="author-name" href="javascript://">{{ownerName}}</a>
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

                        <div class="button">
							<form action="javascript://" id="priceForm" class="campaign-price quantity">
								<input type="number" value="1" min="0" name="s" placeholder="" />
								<button class="btn-primary" type="submit">Back this Cause</button>
							</form>

                            <a href="javascript://" class="btn-secondary">
                                <i class="fa fa-heart" aria-hidden="true"></i>
                                Remind me</a>
						</div>

                        <div class="share">
							<p>
                                Share this project <em class="text-muted">(auto affiliate links)</em>
                            </p>

                            <ul>
								<li class="share-facebook">
                                    <a href="javascript://"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-twitter">
                                    <a href="javascript://"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-google-plus">
                                    <a href="javascript://"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-linkedin">
                                    <a href="javascript://"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-code">
                                    <a href="javascript://"><i class="fa fa-code" aria-hidden="true"></i></a>
                                </li>
							</ul>
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
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
        ]),

        category() {
            if (this.campaign && this.campaign.category) {
                return this.campaign.category
            } else {
                return null
            }
        },

        campaignType() {
            if (this.campaign && this.campaign.type) {
                /* Handle campaign type. */
                switch(this.campaign.type) {
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
            if (this.campaign && this.campaign.title) {
                return this.campaign.title
            } else {
                return null
            }
        },

        summary() {
            if (this.campaign && this.campaign.summary) {
                /* Request summary. */
                const summary = this.getAsset(
                    this.campaign.ownerId, `${this.campaign.slug}.summary`)

                return summary
            } else {
                return null
            }
        },

        description() {
            if (this.campaign && this.campaign.description) {
                return this.campaign.description
            } else {
                return null
            }
        },

        ownerName() {
            if (this.campaign && this.campaign.ownerName) {
                return this.campaign.ownerName
            } else {
                return null
            }
        },

        ownerAvatar() {
            if (this.campaign && this.campaign.ownerAvatar) {
                return this.campaign.ownerAvatar
            } else {
                return null
            }
        },

        descriptionDisplay() {
            /* Validate description. */
            if (this.description) {
                return this.markdown(this.description)
            } else {
                return ''
            }
        },

        summaryDisplay() {
            /* Validate summary. */
            if (this.summary) {
                return this.markdown(this.summary)
            } else {
                return ''
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
            if (this.campaign.images.main) {
                images.push(this.campaign.images.main)
            }

            // /* Validate gallery images. */
            if (this.campaign.images.gallery) {
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

    }
}
</script>

<style scoped>
/*  */
</style>
