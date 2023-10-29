<script setup lang="ts">
/* Import modules. */
import moment from 'moment'

/* Initialize campaigns. */
const campaigns = ref([])

const loadCampaigns = async () => {
    /* Initialize locals. */
    let campaign

    /* Initialize spotlight campaign ids. */
    const spotlights = [
        '9b269bb0-bccf-4990-ac6b-a1ae69371754',
        '3cf3685a-d9dd-4a6b-bde2-07407455ebc6',
        'a94dfb40-97c6-406b-8b8f-63996ab60118',
        'bb8c71e1-32d1-471a-9ce4-aabbd0592d9d',
        '1c820698-5ad4-4fe6-a3dd-029d99cbc9ca',

        'f900d1b8-1ae0-4e18-8a2f-212631b62562',
        'b4240af8-a027-4f8a-9088-2ae97c53cf63',
        // 'b8fac25d-e619-4ddf-b474-af084e8250ce',
        // '707e2a8c-4eea-4c26-9ea2-c548e9e91726',
        // '475b4cfc-ae95-419d-9681-cf378c083963',
    ]

    /* Add campaigns. */
    for (let i = 0; i < spotlights.length; i++) {
        /* Request campaign. */
        campaign = await $fetch(`/v1/campaign/${spotlights[i]}`)
            .catch(err => console.error(err))
        // console.log('SPOTLIGHT CAMPAIGN', campaign)

        /* Add campaign. */
        campaigns.value.push(campaign)
    }
}

/* Load campaigns. */
loadCampaigns()

const displayDate = (_timestamp) => {
    return moment.unix(_timestamp).format('ll')
}

// TBD
</script>

<template>
    <main class="bg-white py-12 sm:py-16">
        <div class="mx-auto max-w-7xl px-6 lg:px-8">
            <div class="mx-auto max-w-2xl text-center">
                <h2 class="text-3xl font-bold tracking-tight text-gray-900 sm:text-5xl">
                    Spotlight Campaigns
                </h2>

                <p class="mt-2 text-lg leading-8 text-gray-600">
                    Discover great Nexa projects that you want to help support
                </p>
            </div>

            <div class="mx-auto mt-16 grid max-w-2xl auto-rows-fr grid-cols-1 gap-8 sm:mt-20 lg:mx-0 lg:max-w-none lg:grid-cols-3">

                <article
                    v-for="campaign of campaigns" :key="campaign.id"
                    class="relative isolate flex flex-col justify-end overflow-hidden rounded-2xl bg-gray-900 px-8 pb-8 pt-80 sm:pt-48 lg:pt-80"
                >
                    <img
                        :src="campaign.media?.poster"
                        alt=""
                        class="absolute inset-0 -z-10 h-full w-full object-cover"
                    />

                    <div class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/40"></div>

                    <div class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"></div>

                    <section class="flex flex-wrap justify-between items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300">
                        <time datetime="2020-03-16" class="mr-8 text-xl">
                            {{displayDate(campaign.expiresAt)}}
                        </time>

                        <div class="-ml-4 flex items-center gap-x-4">
                            <svg viewBox="0 0 2 2" class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50">
                                <circle cx="1" cy="1" r="1" />
                            </svg>

                            <div class="flex gap-x-2.5">
                                <img
                                    :src="campaign.manager?.icon"
                                    alt=""
                                    class="h-6 w-6 flex-none rounded-full bg-white/10"
                                />

                                <h3 class="text-xl">
                                    {{campaign.manager?.name}}
                                </h3>
                            </div>
                        </div>
                    </section>

                    <h3 class="mt-3 text-3xl font-semibold leading-10 text-white">
                        <NuxtLink :to="'/c/' + campaign.id">
                            <span class="absolute inset-0"></span>
                            {{campaign.title}}
                        </NuxtLink>
                    </h3>
                </article>

            </div>
        </div>
    </main>
</template>
