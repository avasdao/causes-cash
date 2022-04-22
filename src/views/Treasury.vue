<template>
    <v-container>
        <v-alert
            class="mt-5"
            color="info"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-information"
            dense
        >
            Bitcoin Please maintains an on-chain and fully auditable treasury of funds allocated to <strong>The Bitcoin "Commons"</strong>.
        </v-alert>

        <h2 class="mt-5">Public Nodes <small class="pink--text">INFRASTRUCTURE</small></h2>

        <p class="mt-n1 mb-2 text-center">
            <small>as of 2022.4, operational expenses are <strong>~$500/mo</strong></small>
        </p>

        <p>
            Cash DevOps <em>(<a href="https://devops.cash" target="_blank">https://devops.cash</a>)</em> manages several <strong>FREE</strong> public nodes to support the growing number of individuals and teams BUIDLing for the Bitcoin (BCH) ecosystem.
        </p>

        <div class="mt-3">
            <h3 class="font-bold">Bitcoin Cash Node</h3>

            <h5><a href="https://bchn.devops.cash" target="_blank">https://bchn.devops.cash</a></h5>
            <small><ul>
                <li><strong>Mainnet</strong> — <a href="http://mainnet.devops.cash" target="_blank">http://mainnet.devops.cash</a></li>
                <li><strong>Testnet</strong> — <a href="http://testnet.devops.cash" target="_blank">http://testnet.devops.cash</a></li>
                <li><strong>Testnet4</strong> — <a href="http://testnet4.devops.cash" target="_blank">http://testnet4.devops.cash</a></li>
                <li><strong>Scalenet</strong> — <a href="http://scalenet.devops.cash" target="_blank">http://scalenet.devops.cash</a></li>
            </ul></small>
        </div>

        <div class="mt-3">
            <h3 class="font-bold">SmartBCH</h3>

            <h5><a href="https://smartbch.devops.cash" target="_blank">https://smartbch.devops.cash</a></h5>
            <small><ul>
                <li><strong>Mainnet</strong> — <a href="http://smartbch.devops.cash/mainnet" target="_blank">http://smartbch.devops.cash/mainnet</a></li>
                <li><strong>Testnet</strong> — <a href="http://smartbch.devops.cash/testnet" target="_blank">http://smartbch.devops.cash/testnet</a></li>
            </ul></small>
        </div>

        <div class="mt-3">
            <h3 class="font-bold">Fulcrum</h3>

            <h5><a href="http://fulcrum.devops.cash" target="_blank">http://fulcrum.devops.cash</a></h5>
        </div>

        <div class="mt-3">
            <h3 class="font-bold">BitDB</h3>

            <h5><a href="https://bitdb.devops.cash" target="_blank">https://bitdb.devops.cash</a></h5>
        </div>

        <div class="mt-3">
            <h3 class="font-bold">BitSocket</h3>

            <h5><a href="https://bitsocket.devops.cash" target="_blank">https://bitsocket.devops.cash</a></h5>
        </div>

        <div class="my-10">
            <!-- footer spacer -->
        </div>

    </v-container>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        //
    }),
    computed: {
        // ...mapGetters([
        //     'getHelp',
        // ]),

        // ...mapGetters('campaigns', [
        //     'getCampaign',
        // ]),
    },
    methods: {
        //
    },
    created: function () {
        /* Set auto-hide nav flag. */
        this.$store.commit('setHeaderPhoto', require('@/assets/headers/pif.jpg'))

        /* Set current page. */
        this.$store.commit('setCurrentPage', 'treasury')

    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
h2 small, h3 small {
    font-size: 0.6em;
}
</style>
