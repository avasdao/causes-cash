<template>
    <main class="bg-white overflow-x-hidden">
        <Hero class="pt-12 lg:pt-18" />

        <Sponsors class="hidden" />

        <Spotlight class="pt-16 lg:pt-24" />

        <Benefits class="" />

        <Reporting class="hidden py-16 lg:py-24" />

        <Metrics class="hidden" />

        <Contributors class="hidden py-24 lg:py-32" />

        <CTA class="hidden my-20" />

        <Recent class="hidden py-16 lg:py-24" />

    </main>
</template>

<script>
/* Import components. */
import Benefits from '@/components/Benefits.vue'
import Contributors from '@/components/Contributors.vue'
import CTA from '@/components/CTA.vue'
import Hero from '@/components/Hero.vue'
import Metrics from '@/components/Metrics.vue'
import Recent from '@/components/Recent.vue'
import Reporting from '@/components/Reporting.vue'
import Sponsors from '@/components/Sponsors.vue'
import Spotlight from '@/components/Spotlight.vue'

export default {
    components: {
        Benefits,
        Contributors,
        CTA,
        Hero,
        Metrics,
        Recent,
        Reporting,
        Sponsors,
        Spotlight,
    }
}
</script>
