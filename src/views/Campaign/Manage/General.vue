<template>
    <div role="tabpanel" class="tab-pane active" id="general">
        <section class="campaign-form form-update">
            <!-- <div class="container"> -->
            <div class="start-form">
                <form action="javascript://">
                    <div class="field">
                        <label for="projecttitle">Project Title</label>

                        <span class="label-desc">
                            Our search looks through words from your project title and blurb, so make them clear and descriptive of what you’re making.
                            Your profile name will be searchable, too.
                        </span>

                        <input type="text" id="projecttitle" v-model="title" maxlength="60" disabled>
                    </div>

                    <div class="field">
                        <label for="shortblurb">
                            Short Blurb
                        </label>

                        <span class="label-desc">
                            Give people a sense of what you’re doing.
                            Skip “Help me” and focus on what you’re making.
                        </span>

                        <textarea id="shortblurb" cols="30" rows="4" maxlength="135"></textarea>
                    </div>

                    <div class="field">
                        <label for="field-cat">
                            Category <span>*</span>
                        </label>

                        <span class="label-desc">
                            To help backers find your campaign, select a category that best represents your project.
                        </span>

                        <div class="field-select field-cat">
                            <select id="field-cat">
                                <option selected="selected">Select a category</option>
                                <option value="book">Book</option>
                                <option value="crafts">Crafts</option>
                                <option value="design-art">Design &amp; Art</option>
                                <option value="perfomances">Perfomances</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>

                        <div class="field-select">
                            <select name="s">
                                <option selected="selected">Subcategory (optional)</option>
                                <option value="book">Book</option>
                                <option value="crafts">Crafts</option>
                                <option value="design-art">Design &amp; Art</option>
                                <option value="perfomances">Perfomances</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>
                    </div>

                    <div class="field">
                        <label for="projectlocation">
                            Project Location
                        </label>

                        <input type="text" id="projectlocation" v-model="location">
                    </div>

                    <div class="field">
                        <label for="funding">
                            Funding Duration
                        </label>

                        <span class="label-desc">
                            Projects with shorter durations have higher success rates.
                            You won’t be able to adjust your duration after you launch.
                        </span>

                        <input type="date" id="funding" value="">
                    </div>
                    <div class="field">
                        <label for="fundinggoal">Funding Goal</label>

                        <span class="label-desc">
                            Community Pledge funding on Causes Cash is all-or-nothing.
                            It’s okay to raise more than your goal, but if your goal isn’t met, no money will be collected.
                            Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.
                            If your project is successfully funded, the following fees will be collected from your funding total:
                            Causes Cash 5% fee, and payment processing fees (between 3% and 5%).
                            If funding isn’t successful, there are no fees.
                            <a href="javascript://" class="view-fees">View fees breakdown</a>
                        </span>

                        <div class="spopup-bg"></div>

                        <div class="fees-popup start-popup">
                            <div class="spopup-title">
                                <h3>Fees</h3>

                                <div class="spopup-close">
                                    <span class="ion-ios-close-empty"></span>
                                </div>
                            </div>

                            <div class="spopup-content">
                                <p>If your project is successfully funded, the following fees will be collected from your funding total: Ideapress 5% fee, and payment processing fees (between 3% and 5%). If funding isn’t successful, there are no fees.</p>

                                <ul>
                                    <li>
                                        <h4>Ideapress fee</h4>
                                        <div class="fee-desc">
                                            <p>5% of total funds raised </p>
                                        </div>
                                    </li>

                                    <li>
                                        <h4>Payment processing fees</h4>
                                        <div class="fee-desc">
                                            <p>3% + €0.20 per pledge</p>
                                            <p>Pledges under €10 have a discounted micropledge fee of 5% + €0.05 per pledge</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <input type="text" value="" id="fundinggoal">
                    </div>

                    <div class="field">
                        <label for="tag">Tags *</label>
                        <span class="label-desc">Enter up to five keywords that best describe your campaign.</span>
                        <input type="text" id="tag" value="" name="title" placeholder="Enter a few tags for your campaign" />
                    </div>

                    <div class="reminder">
                        <h4>Project Collaborators</h4>

                        <p>
                            Grant your teammates access to help with your project.
                        </p>

                        <a href="javascript://" class="btn-primary">Add collaborators</a>
                    </div>

                    <input type="submit" class="btn-primary" value="Save & Continue">
                </form>
            </div>
        </section>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            ownerSlug: null,
            slug: null,
            extSlug: null,

            campaign: null,
            campaignId: null,
            // fundId: null,
            // referrerId: null,
        }
    },
    computed: {
        ...mapGetters('campaigns', [
            'getAsset',
            'getCampaign',
        ]),

        title() {
            if (this.campaign && this.campaign.title) {
                return this.campaign.title
            } else {
                return null
            }
        },

        location() {
            if (this.campaign && this.campaign.location) {
                return this.campaign.location
            } else {
                return null
            }
        },

    },
    methods: {
        ...mapActions('campaigns', [
            'updateAsset',
        ]),

    },
    created: async function () {
        console.log('PARAMS', this.$route.params)
        console.log('QUERY', this.$route.query)
        console.log('HASH', this.$route.hash)

        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

        /* Set extended slug. */
        this.slug = this.$route.params.slug
        console.log('SLUG', this.slug)

        /* Validate hash. */
        // if (this.$route.hash) {
        //     /* Set extended slug. */
        //     this.fundId = this.$route.hash.slice(1)
        //     console.log('FUND ID (from hash)', this.fundId)
        // }

        /* Validate query. */
        // if (this.$route.query && Object.keys(this.$route.query)[0]) {
        //     /* Set extended slug. */
        //     this.fundId = Object.keys(this.$route.query)[0]
        //     console.log('FUND ID (from query)', this.fundId)
        // }

        /* Validate slug. */
        if (this.ownerSlug && this.slug) {
            /* Set campaign. */
            this.campaign = await this.getCampaign(this.ownerSlug, this.slug)
            console.log('CAMPAIGN', this.campaign)
        }
    },
    mounted: function () {
        $('.view-fees').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().find('.spopup-bg').fadeIn()
			$(this).parent().parent().find('.fees-popup').fadeIn()
		})
		$('.spopup-bg').on('click', function (e) {
			e.preventDefault()
			$(this).fadeOut()
			$(this).parent().find('.fees-popup').fadeOut()
			$(this).parent().find('.item-popup').fadeOut()
		})
		$('.spopup-close').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().fadeOut()
			$(this).parent().parent().parent().find('.spopup-bg').fadeOut()
		})
    },
}
</script>

<style scoped>
/*  */
</style>
