<template>
    <div class="sideshow">
        <div class="container">
            <div class="sideshow-content">
                <h1
                    v-html="featuredTitleDisplay"
                    class="wow fadeInUp"
                    data-wow-delay=".1s">
                </h1>

                <div
                    v-html="featuredSummaryDisplay"
                    class="sideshow-description wow fadeInUp"
                    data-wow-delay=".1s">
                </div>

                <div class="process wow fadeInUp" data-scroll-nav="1">
                    <div class="raised"><span></span></div>

                    <div class="process-info">
                        <div class="process-pledged">
                            <span>6</span>campaigns
                        </div>

                        <div class="process-pledged">
                            <span>$1.50</span>in payouts
                        </div>

                        <div class="process-pledged">
                            <span>$6.50</span>in pledges
                        </div>

                        <div class="process-pledged">
                            <span>10</span>supporters
                        </div>

                        <!-- <div class="process-pledged">
                            <span>{{pledgedDisplay}}</span>contributions
                        </div> -->

                        <!-- <div class="process-pledged">
                            <span>{{goalDisplay}}</span>funding goal
                        </div> -->

                        <!-- <div class="process-funded">
                            <span>{{fundedPctDisplay}}</span>completed
                        </div> -->

                        <!-- <div class="process-backers">
                            <span>{{numBackersDisplay}}</span>backers
                        </div> -->

                        <!-- <div class="process-time">
                            <span>{{daysRemaining}}</span>days remaining
                        </div> -->
                    </div>
                </div>

                <!-- <div class="button wow fadeInUp" data-wow-delay="0.1s">
                    <a href="javascript://" class="btn-secondary">View Cause Details</a>
                    <a href="javascript://" class="btn-primary">Contribute Now!</a>
                </div> -->
            </div>
        </div>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import modules. */
import numeral from 'numeral'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

export default {
    components: {
        //
    },
    computed: {
        ...mapGetters('campaigns', [
            'getSummary',
        ]),

        featuredTitleDisplay() {
            /* Validate featured title. */
            if (!this.featuredTitle) {
                return null
            }

            /* Initialize display. */
            let display = this.featuredTitle

            /* Add breaks. */
            display = display.replace(/\r\n|\r|\n/g, '<br />')

            return display
        },

        featuredSummaryDisplay() {
            /* Validate featured summary. */
            if (!this.featuredSummary) {
                return null
            }

            /* Initialize display. */
            let display = this.featuredSummary

            /* Add breaks. */
            display = display.replace(/\r\n|\r|\n/g, '<br />')

            return display
        },

        pledgedDisplay() {
            /* Validate pledged. */
            if (!this.pledged) {
                return null
            }

            return numeral(this.pledged).format('$0,0.00[00]')
        },

        goalDisplay() {
            /* Validate goal. */
            if (!this.goal) {
                return null
            }

            return numeral(this.goal).format('$0,0.00[00]')
        },

        fundedPctDisplay() {
            /* Validate values. */
            if (!this.pledged || !this.goal) {
                return null
            }

            /* Calculate (funded) amount. */
            const amount = this.pledged / this.goal
            console.log('Funded', amount)

            return numeral(amount).format('0,0.00[0000]%')
        },

        numBackersDisplay() {
            /* Validate number of backers. */
            if (!this.numBackers) {
                return null
            }

            return numeral(this.numBackers).format('0,0')
        },
    },
    data: () => {
        return {
            featuredTitle: null,
            featuredSummary: null,
            pledged: null,
            goal: null,
            numBackers: null,
            daysRemaining: null,
        }
    },
    methods: {
        //
    },
    created: async function () {
        /* Request campaign summary. */
        const summary = await this.getSummary
        console.log('SUMMARY', summary)

        this.featuredTitle = `We're working towards a sustainable future for Bitcoin Cash BUIDLers`

        this.featuredSummary = `100% Transparency. 100% Open Source. 100% Decentralized.
        Optimized for On-going Project / Campaign Management
        Pay It Forward into our Community Funding Pool
        `

        this.pledged = 10.00

        this.goal = 1000000.00

        this.numBackers = 1

        this.daysRemaining = 999
    },
    mounted: function () {

    },
}
</script>

<style scoped>
.process .raised {
    width: 100%;
    height: 10px;
    background: #fff;
    border-radius: 25px;
    position: relative;
    margin-bottom: 15px;
    overflow: hidden;
}

.process .raised span {
    position: absolute;
    top: 0;
    left: 0;
    bottom: 0;
    border-radius: 25px;
    width: 60%;
    background-color: #00a6eb;
    display: block;
    -webkit-border-top-right-radius: 25px;
    -webkit-border-bottom-right-radius: 25px;
           -moz-border-radius-topright: 25px;
        -moz-border-radius-bottomright: 25px;
               border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
        -webkit-border-top-left-radius: 25px;
     -webkit-border-bottom-left-radius: 25px;
            -moz-border-radius-topleft: 25px;
         -moz-border-radius-bottomleft: 25px;
                border-top-left-radius: 25px;
             border-bottom-left-radius: 25px;
    background-color: #00a6eb;
}

.process .raised span:after {
    content: "";
    position: absolute;
    top: 0; left: 0; bottom: 0; right: 0;
    background-image: -webkit-gradient(linear, 0 0, 100% 100%, color-stop(.25, #00a6eb), color-stop(.25, transparent), color-stop(.5, transparent), color-stop(.5, #00a6eb), color-stop(.75, #00a6eb), color-stop(.75, transparent), to(transparent));
    background-image: -webkit-linear-gradient(-45deg, #0799d7 25%, transparent 25%, transparent 50%, #0799d7 50%, #0799d7 75%, transparent 75%, transparent);
    background-image: -moz-linear-gradient(-45deg, #0799d7 25%, transparent 25%, transparent 50%, #0799d7 50%, #0799d7 75%, transparent 75%, transparent);
    background-image: -ms-linear-gradient(-45deg, #0799d7 25%, transparent 25%, transparent 50%, #0799d7 50%, #0799d7 75%, transparent 75%, transparent);
    background-image: -o-linear-gradient(-45deg, #0799d7 25%, transparent 25%, transparent 50%, #0799d7 50%, #0799d7 75%, transparent 75%, transparent);
    z-index: 1;
    -webkit-background-size: 20px 20px;
    -moz-background-size:    20px 20px;
    background-size:         20px 20px;
    -webkit-animation: move 2s linear infinite;
       -webkit-border-top-right-radius: 25px;
    -webkit-border-bottom-right-radius: 25px;
           -moz-border-radius-topright: 25px;
        -moz-border-radius-bottomright: 25px;
               border-top-right-radius: 25px;
            border-bottom-right-radius: 25px;
        -webkit-border-top-left-radius: 25px;
     -webkit-border-bottom-left-radius: 25px;
            -moz-border-radius-topleft: 25px;
         -moz-border-radius-bottomleft: 25px;
                border-top-left-radius: 25px;
             border-bottom-left-radius: 25px;
    overflow: hidden;
}

.process .process-info span {
    margin-right: 0px !important;
}
.process .process-info div {
    margin-right: 55px !important;
}

@media screen and (max-width: 767px) {
    .sideshow-description {
        display: none;
    }

    .process .process-info span {
        margin-right: 30px !important;
    }
}
</style>
