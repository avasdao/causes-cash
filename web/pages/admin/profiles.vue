<script setup lang="ts">
definePageMeta({
    layout: 'admin',
})

useHead({
    title: `Profiles Manager — Causes Cash`,
    meta: [
        { name: 'description', content: `An uncensorable funding platform for radical creators and unstoppable service providers.` }
    ],
})

/* Initialize stores. */
import { useProfileStore } from '@/stores/profile'
import { useSystemStore } from '@/stores/system'
const Profile = useProfileStore()
const System = useSystemStore()

const profiles = ref()

const init = async () => {
    profiles.value = await $fetch('/api/admin/profiles', {
        method: 'POST',
        body: {
            sessionid: Profile.sessionid,
        }
    })
    .catch(err => console.error(err))
    console.log('PROFILES', profiles.value)
}

onMounted(() => {
    init()
})

// onBeforeUnmount(() => {
//     console.log('Before Unmount!')
//     // Now is the time to perform all cleanup operations.
// })
</script>

<template>
    <main class="max-w-7xl mx-auto px-3 py-5 flex flex-col gap-4">
        PROFILES MANAGER
    </main>

    <section v-if="profiles">
        <h2>{{profiles.numProfiles}} profiles found</h2>

        <div v-for="profile of profiles.data" :key="profile.id">
            {{profile.id}}
            <pre>{{profile.doc}}</pre>
        </div>
    </section>
</template>
