<template>
    <div class="col-lg-4">
        <div class="support support-campaign">
            <h3 class="support-campaign-title">
                <span class="text-danger">LIVE</span> Events Timeline
            </h3>

            <!-- <p class="campaignTypeDesc">
                All events are placed into escrow to be withdrawn based on the preset terms of the DRIPP campaign.
            </p> -->

            <div class="plan">
                <button @click="showEvent(1)">
                    <h3 class="text-uppercase">
                        <i class="fa fa-certificate mr-2" aria-hidden="true"></i>
                        New campaign created
                    </h3>

                    <!-- <h2>Official Account Address</h2> -->
                    <!-- <h4>
                        by Campaign Creator
                        <i class="fa fa-flag ml-2" aria-hidden="true"></i>
                    </h4> -->

                    <div class="plan-desc">
                        A new campaign was just created and a new team has been born.
                    </div>

                    <div class="plan-date">
                        <em>10 minutes ago</em>
                    </div>

                    <!-- <div class="plan-author">
                        Estimated Delivery
                    </div> -->

                    <!-- <div class="backer">
                        2 backer
                    </div> -->
                </button>
            </div>

            <div class="plan" v-for="event of events" :key="event.id">
                <button @click="showEvent(event.id)">
                    <h3 class="text-uppercase">{{event.title}}</h3>

                    <h2>Official Account Address</h2>
                    <h4>
                        {{addressDisplay(event.address)}}
                        <i class="fa fa-qrcode ml-2" aria-hidden="true"></i>
                    </h4>

                    <div class="plan-desc" v-html="event.summary" />

                    <div class="plan-date">
                        {{event.dueAt}}
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
            if (_campaign && _campaign.events) {
                // console.log('CAMPAIGN HAS CHANGED, UPDATE FUNDS!!', _campaign.events)

                /* Update events. */
                this.updateEvents()
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

        events() {
            /* Initialize all events. */
            const allEvents = []
            console.log('ALL EVENTS', allEvents)
            return allEvents

            // if (this.campaign && this.campaign.events) {
            //     /* Set events. */
            //     const events = this.campaign.events
            //     // console.log('FUND (events):', events)
            //
            //     /* Load events. */
            //     Object.keys(events).forEach(eventId => {
            //         /* Set event. */
            //         const event = {
            //             id: eventId,
            //             ...events[eventId]
            //         }
            //         // console.log('FUND (event):', event)
            //
            //         /* Retrieve summary. */
            //         const summary = this.getAsset(
            //             this.campaign.owner.slug,
            //             `${this.campaign.slug}.event.${event.id}.summary`
            //         )
            //         // console.log('FUND (summary):', summary)
            //
            //         /* Validate summary. */
            //         if (summary) {
            //             /* Set summary summary. */
            //             event.summary = this.getMarkdown(summary)
            //
            //             /* Add event. */
            //             allEvents.push(event)
            //         }
            //     })
            //     // console.log('FUNDS (allEvents):', allEvents)
            //
            //     /* Return all events. */
            //     return allEvents
            // } else {
            //     return null
            // }
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
         * Show Event
         *
         * NOTE: Open a modal window with event details.
         */
        showEvent(_eventId) {
            /* Set location. */
            const location = window.location
            // console.log('LOCATION', location.href)

            /* Initialize new location. */
            let newLocation = null

            /* Set query. */
            if (location.href.indexOf('?') !== -1) {
                /* Set position. */
                const pos = location.href.indexOf('?')

                newLocation = location.href.slice(0, pos) + '?' + _eventId
            } else {
                newLocation = location.href + '?' + _eventId
            }

            /* Navigate to new window location. */
            window.location.href = newLocation
        },

        /**
         * Update Events
         */
        updateEvents() {
            /* Set events. */
            const events = this.campaign.events
            console.log('FUND (events):', events)

            // /* Load events. */
            // Object.keys(events).forEach(eventId => {
            //     /* Set event. */
            //     const event = {
            //         id: eventId,
            //         ...events[eventId]
            //     }
            //     // console.log('FUND (event):', event)
            //
            //     /* Initialize body. */
            //     let body = null
            //
            //     /* Initialize target. */
            //     let target = null
            //
            //     /* Validate summary. */
            //     if (event.summary.slice(0, 2) === 'Qm' && event.summary.length === 46) {
            //         target = event.summary
            //     } else {
            //         body = event.summary
            //     }
            //
            //     /* Set summary. */
            //     const summary = {
            //         ownerSlug: this.campaign.owner.slug,
            //         id: `${this.campaign.slug}.event.${event.id}.summary`,
            //         body,
            //         target,
            //     }
            //
            //     /* Request summary update. */
            //     this.updateAsset(summary)
            //
            //     /* Initialize body. */
            //     body = null
            //
            //     /* Initialize target. */
            //     target = null
            //
            //     /* Validate description. */
            //     if (event.description.slice(0, 2) === 'Qm' && event.description.length === 46) {
            //         target = event.description
            //     } else {
            //         body = event.description
            //     }
            //
            //     /* Set description. */
            //     const description = {
            //         ownerSlug: this.campaign.owner.slug,
            //         id: `${this.campaign.slug}.event.${event.id}.description`,
            //         body,
            //         target,
            //     }
            //
            //     /* Request description update. */
            //     this.updateAsset(description)
            // })
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
