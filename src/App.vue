<template>
    <router-view/>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import components. */
// import { Notification } from '@/components'

export default {
    computed: {
        ...mapGetters('storage', [
            'getIPFS',
            'getOrbitDB',
        ]),
    },
    methods: {
        /**
         * Test IPFS Connection
         */
        async testIPFS(_node) {
            console.log('Starting IPFS test...')
            const data = await _node
                .cat('QmcPfKi3LTi8aTU6Zt6zNXmwSyVG8p5tzRhJHNfC8yyynX')
                .catch(err => {
                    console.error(err)
                })

            // data is returned as a Buffer, conver it back to a string
            console.log(data.toString())

            return
        }

    },
    created: async function () {
        console.log('Initializing application...')

        /* Initialize IPFS connection. */
        const node = await this.getIPFS

        /* Test IPFS connection. */
        await this.testIPFS(node)

        /* Initialize OrbitDB connection. */
        await this.getOrbitDB

    },
}

</script>

<style>
section .container {
    margin-bottom: 100px;
}
</style>
