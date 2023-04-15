<script setup>
/* Import modules. */
import { getAddressBalance } from '@nexajs/rostrum'
import { getAddressHistory } from '@nexajs/rostrum'
import moment from 'moment'
import numeral from 'numeral'
import { ref } from 'vue'

const props = defineProps({
    campaign: Object,
    provider: String,
    usd: Number,
})

const campaignPledged = ref(0)
const campaignGoals = ref(null)

const blockNum = ref(0)
const expiration = ref(0)
const fundingGoal = ref(0.0)
// const pledgeBalance = ref(null)

/* Set constants. */
const RETRY_DELAY = 500 // 0.5 seconds
const RETRY_ATTEMPTS = 10 // approx. 5 seconds

/**
 * Funded Display
 */
const fundedDisplay = computed(() => {
    /* Validate pledge balance. */
    if (!campaignPledged.value) return '0.0'

    /* Set satoshis value. */
    const satoshis = campaignPledged.value

    // /* Set NEXA value. */
    const nexValue = Number(
        satoshis / 100
    )

    // /* Return (formatted) value. */
    return numeral(nexValue / 1000000)
        .format('0,0.00[00]')
})

/**
 * Funded Display (USD)
 */
const fundedDisplayUsd = computed(() => {
    /* Validate pledge balance. */
    if (!campaignPledged.value || !props.usd) return '$0.00'

    const usdValue = (campaignPledged.value / 100000000) * props.usd

    /* Return (formatted) value. */
    return numeral(usdValue).format('$0,0.00')
})

/**
 * Requested Display
 */
const requestedDisplay = computed(() => {
    /* Validate funding goal. */
    if (!campaignGoals.value || !props.usd) return '0.00'

    /* Set satoshis value. */
    const satoshis = campaignGoals.value[0].amount

    /* Set NEXA value. */
    const nexValue = Number(satoshis / 100)

    /* Return (formatted) value. */
    return numeral(nexValue / 1000000).format('0,0.00[00]')
})

/**
 * Requesed Display (USD)
 */
const requestedDisplayUsd = computed(() => {
    /* Validate pledge balance. */
    if (!campaignGoals.value || !props.usd) return '$0.00'

    const usdValue = (campaignGoals.value[0].amount / 100000000) * props.usd

    /* Return (formatted) value. */
    return numeral(usdValue).format('$0,0.00')
})

/**
 * Percentage Completed
 */
const pctCompleted = computed(() => {
    /* Validate funding goal. */
    if (!fundingGoal.value || !campaignPledged.value) return 0

    /* Set cents. */
    const cents = campaignPledged.value * 100

    /* Set percentage. */
    const pct = parseInt((cents / fundingGoal.value))

    /* Return percentage. */
    return pct
})

/**
 * Expiration Display
 *
 * Show the time remaining in the campaign.
 */
const expirationDisplay = computed(() => {
    /* Validate expiration. */
    if (!expiration.value) return 'n/a'

    /* Return (formatted) expiration. */
    return moment.unix(expiration.value).fromNow(true)
})

watch(() => props.campaign, async (_campaign) => {
    console.log('CAMPAIGN HAS CHANGED', _campaign)

    /* Request (receiver) address history. */
    // const history = await getAddressHistory(_campaign.receiver)
    //     .catch(err => console.error(err))
    // console.log('HISTORY', history)

    /* Request (receiver) address balance. */
    const balance = await getAddressBalance(_campaign.receiver)
        .catch(err => console.error(err))
    console.log('BALANCE', balance)

    /* Set campaign pledged amount. */
    campaignPledged.value = balance.confirmed

    campaignGoals.value = _campaign.goals
})


</script>

<template>
    <main class="mt-5">
        <h4 class="sr-only">Status</h4>

        <p class="text-3xl text-center font-medium text-gray-700">
            {{fundedDisplay}} of {{requestedDisplay}} <span class="text-2xl text-gray-500">m</span>NEXA
        </p>

        <p class="text-center text-base text-gray-500 font-medium">
            {{fundedDisplayUsd}} of {{requestedDisplayUsd}} USD
        </p>

        <div class="mt-6" aria-hidden="true">
            <div class="bg-gray-200 rounded-full overflow-hidden">
                <div class="h-2 bg-green-600 rounded-full" :style="{ width: pctCompleted + '%' }"></div>
            </div>

            <div class="text-sm text-center font-medium text-gray-600 mt-1 pl-5">
                <div class="text-green-600">
                    <span class="text-xl">{{pctCompleted}}%</span> complete with <span class="text-xl">{{expirationDisplay}}</span> to go
                </div>
            </div>

        </div>
    </main>
</template>
