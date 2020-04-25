<template>
    <div class="col-lg-3">
        <nav class="account-bar">
            <ul>
                <li :class="{active: tab === 'dashboard'}"><router-link :to="dashboard">Dashboard</router-link></li>
                <li :class="{active: tab === 'profile'}"><router-link :to="profile">Profile</router-link></li>
                <li :class="{active: tab === 'causes'}"><router-link :to="causes">Causes</router-link></li>
                <li :class="{active: tab === 'backing'}"><router-link :to="backing">Backed Causes</router-link></li>
                <li :class="{active: tab === 'received'}"><router-link :to="received">Pledges Received</router-link></li>
                <li :class="{active: tab === 'rewards'}"><router-link :to="rewards">Rewards</router-link></li>
                <li :class="{active: tab === 'payments'}"><router-link :to="payments">Payments</router-link></li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        tab: String,
    },
    data: () => {
        return {
            user: null,
        }
    },
    components: {
        //
    },
    computed: {
        /* Dashboard URL. */
        dashboard() {
            return `/@${this.user}/dashboard`
        },

        /* Profile URL. */
        profile() {
            return `/@${this.user}/profile`
        },

        /* Causes URL. */
        causes() {
            return `/@${this.user}/causes`
        },

        /* Backed Causes URL. */
        backing() {
            return `/@${this.user}/backing`
        },

        /* Pledges Received URL. */
        received() {
            return `/@${this.user}/received`
        },

        /* Rewards URL. */
        rewards() {
            return `/@${this.user}/rewards`
        },

        /* Payments URL. */
        payments() {
            return `/@${this.user}/payments`
        },

    },
    created: function () {
        /* Set user. */
        const user = this.$route.params.pathMatch

        /* Validate user. */
        // FIXME: What should we do if validation fails??
        this.user = user

    },
}
</script>

<style scoped>
/*  */
</style>
