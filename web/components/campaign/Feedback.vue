<template>
    <main>
        <!-- 'Customer Reviews' panel, show/hide based on tab state -->
        <div id="tab-panel-reviews" class="-mb-10" aria-labelledby="tab-reviews" role="tabpanel" tabindex="0">
            <h3 class="sr-only">Supporter's Feedback</h3>

            <div
                v-for="supporter of feedback" :key="supporter.id"
                class="flex text-sm text-gray-500 space-x-4"
            >
                <div class="flex-none py-10">
                    <img :src="require('@/assets/cyber-hacker-icon.jpg')" alt="" class="w-10 h-10 bg-gray-100 rounded-full" />
                </div>
                <div class="flex-1 py-10">
                    <h3 class="font-medium text-gray-900">{{supporter.address}}</h3>
                    <p>
                        <time :datetime="supporter.timestamp">
                            {{timestamp(supporter.timestamp)}}
                        </time>
                    </p>

                    <div class="mt-4 prose prose-sm max-w-none text-gray-500">
                        <p>
                            {{supporter.comment}}
                        </p>
                    </div>
                </div>
            </div>

        </div>
    </main>
</template>

<script>
/* Import modules. */
// import { ethers } from 'ethers'
import moment from 'moment'

export default {
    props: {
        supporters: Array,
    },
    data: () => {
        return {
            //
        }
    },
    computed: {
        feedback() {
            if (!this.supporters) return []

            const supporters = this.supporters

            return supporters.reverse()
        },

        // pledges() {
        //     /* Validate supporters. */
        //     if (!this.supporters) return []
        //
        //     /* Initialize supporters. */
        //     const supporters = []
        //
        //     /* Handle supporters. */
        //     this.supporters.forEach(_supporter => {
        //         // NOTE: We filter out donation under 1 satoshi
        //         if (_supporter.pledgeAmount.gt(10000000000n)) {
        //             supporters.push(_supporter)
        //         }
        //     })
        //
        //     /* Return supporters. */
        //     return supporters
        // }

    },
    methods: {
        timestamp(_timestamp) {
            return moment.unix(_timestamp).format('dddd, MMMM Do YYYY, h:mm:ss a')
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        //
    },
}
</script>
