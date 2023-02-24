<template>
    <v-card width="400">
        <v-card-text>
            <div class="font-weight-bold ml-8 mb-2">
                Today
            </div>

            <v-timeline align-top dense>
                <v-timeline-item
                    v-for="message in messages"
                    :key="message.time"
                    :color="message.color"
                    small
                >
                    <div>
                        <div class="font-weight-normal">
                            <strong>{{ message.from }}</strong> @{{ message.time }}
                        </div>

                        <div>{{ message.message }}</div>
                    </div>
                </v-timeline-item>
            </v-timeline>
        </v-card-text>
    </v-card>
</template>

<script>
/* Initialize vuex. */
// import { mapActions, mapGetters } from 'vuex'

export default {
    data: () => ({
        messages: [
        {
          from: 'You',
          message: 'Sure, I\'ll see you later.',
          time: '10:42am',
          color: 'deep-purple lighten-1',
        },
        {
          from: 'John Doe',
          message: 'Yeah, sure. Does 1:00pm work?',
          time: '10:37am',
          color: 'green',
        },
        {
          from: 'You',
          message: 'Did you still want to grab lunch today?',
          time: '9:47am',
          color: 'deep-purple lighten-1',
        },
      ],
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
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
