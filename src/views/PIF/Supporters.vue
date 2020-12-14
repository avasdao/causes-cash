<template>
    <main>
        <v-alert
            color="red"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-alert"
            dense
        >
            <strong>Volunteer Funding Works!</strong>
            <br />Our goal is to enable <strong>$1,000+</strong> in daily payouts for <u>radical creators</u> by the end of 2020 and <strong>$10,000+</strong> in 2021.
        </v-alert>

        <v-btn block large color="info my-5">
            Learn about "The BCH Commons"
        </v-btn>

        <v-alert
            class="mb-10"
            color="info"
            border="left"
            elevation="2"
            colored-border
            icon="mdi-information"
            dense
        >
            It takes a village of supporters for Causes Cash to continue doing what it does for our content creators.
        </v-alert>

        <h3 class="mt-10">Rainmakers (2) <small class="grey--text">$10,000+</small></h3>

        <v-list dense shaped>
            <v-list-item-group
                v-model="item"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in rainmakers"
                    :key="i"
                >
                    <v-list-item-icon>
                        {{(i + 1)}}.
                        <!-- <v-img :src="item.iconUrl" width="20" /> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.label}} (<a href="javascript://">txid</a>)
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <!-- {{(i + 1)}}. -->
                        <v-img :src="item.iconUrl" width="20" class="list-avatar" />
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <h3 class="mt-5">Angels (3) <small class="grey--text">$5,000+</small></h3>

        <v-list dense shaped>
            <v-list-item-group
                v-model="item"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in angels"
                    :key="i"
                >
                    <v-list-item-icon>
                        {{(i + 1)}}.
                        <!-- <v-img :src="item.iconUrl" width="20" /> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.label}} (<a href="javascript://">txid</a>)
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <!-- {{(i + 1)}}. -->
                        <v-img :src="item.iconUrl" width="20" class="list-avatar" />
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <h3 class="mt-5">Philanthropists (3) <small class="grey--text">$1,000+</small></h3>

        <v-list dense shaped>
            <v-list-item-group
                v-model="item"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in philanthropists"
                    :key="i"
                >
                    <v-list-item-icon>
                        {{(i + 1)}}.
                        <!-- <v-img :src="item.iconUrl" width="20" /> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.label}} (<a href="javascript://">txid</a>)
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <!-- {{(i + 1)}}. -->
                        <v-img :src="item.iconUrl" width="20" class="list-avatar" />
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <h3 class="mt-5">Benefactors (18) <small class="grey--text">$250+</small></h3>

        <v-list dense shaped>
            <!-- <v-subheader>Spotlight (10)</v-subheader> -->

            <v-list-item-group
                v-model="item"
                color="primary"
            >
                <v-list-item
                    v-for="(item, i) in benefactors"
                    :key="i"
                >
                    <v-list-item-icon>
                        {{(i + 1)}}.
                        <!-- <v-img :src="item.iconUrl" width="20" /> -->
                    </v-list-item-icon>

                    <v-list-item-content>
                        <v-list-item-title>
                            {{item.label}} (<a href="javascript://">txid</a>)
                        </v-list-item-title>
                    </v-list-item-content>

                    <v-list-item-icon>
                        <!-- {{(i + 1)}}. -->
                        <v-img :src="item.iconUrl" width="20" class="list-avatar" />
                    </v-list-item-icon>
                </v-list-item>
            </v-list-item-group>
        </v-list>

        <v-btn block>Show all (276) supporters</v-btn>
    </main>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        item: null,
        rainmakers: null,
        angels: null,
        philanthropists: null,
        benefactors: null,
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
        const supporters = require('@/assets/supporters.json')
        // console.log('SUPPORTERS', supporters)

        this.rainmakers = supporters.slice(0, 2)
        this.angels = supporters.slice(2, 5)
        this.philanthropists = supporters.slice(5, 8)
        this.benefactors = supporters.slice(8, 13)
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.list-avatar {
    border-radius: 50%;
}
</style>
