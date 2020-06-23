<template>
    <div id="events" class="tabs">
        <ul>

            <li v-for="event of eventList" :key="event.id">
                <p class="date">
                    {{event.date}}
                </p>

                <h3>{{event.title}}</h3>

                <div class="desc">
                    <p>
                        {{event.description}}
                    </p>
                </div>
            </li>

            <!-- <li>
                <p class="date">
                    31-05-2018
                </p>

                <h3>Our First Office Start</h3>

                <div class="desc">
                    <p>
                        Corned beef leberkas fatback porchetta, strip steak salami turkey short loin flank ham hock landjaeger.
                        Leberkas pork belly kevin shoulder filet mignon.
                        Bacon spare ribs rump chuck turkey, ham hock capicola.
                        Strip steak tongue kielbasa, boudin hamburger t-bone capicola turducken.
                        Landjaeger meatloaf pork belly spare ribs chuck.
                    </p>
                </div>
            </li> -->

        </ul>
    </div>
</template>

<script>
/* Import modules. */
import moment from 'moment'

export default {
    props: {
        campaign: Object,
        fundId: String,
    },
    data: () => {
        return {
            events: []
        }
    },
    computed: {
        eventList() {
            const events = this.events.map(event => {
                /* Format data. */
                event.date = moment.unix(event.createdAt).format('lll')

                /* Return (formatted) event. */
                return event
            })

            /* Return (reversed) array. */
            return events.reverse()
        }
    },
    created: function () {
        /* Add sample event. */
        this.events.push({
            id: '256bf2bf-b4fe-42b9-9731-7ec9fe3856d3',
            title: 'Development Started',
            description: `Nito Cash has official started development of a new ephemeral web wallet.`,
            createdAt: 1577870400,
        })

        /* Add sample event. */
        this.events.push({
            id: '535bab1e-4dda-46d4-907e-2d12958e31e1',
            title: 'First Developer Preview',
            description: `Nito Cash has released its first developer preview.`,
            createdAt: 1580531400,
        })

    },
}
</script>

<style scoped>
.desc {
    margin-bottom: 20px;
}
</style>
