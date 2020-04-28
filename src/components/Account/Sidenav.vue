<template>
    <div class="col-lg-3">
        <nav class="account-bar">
            <ul>
                <div class="nav-section-title">
                    Public Information
                    <br /><span>(published transparently on-chain)</span>
                </div>

                <li :class="{active: tab === 'profile'}">
                    <router-link :to="profile">Profile</router-link>
                </li>

                <li :class="{active: tab === 'causes'}">
                    <router-link :to="causes">Causes</router-link>
                </li>

                <li :class="{active: tab === 'payments'}">
                    <router-link :to="payments">Payments Received</router-link>
                </li>

                <li :class="{active: tab === 'rewards'}">
                    <router-link :to="rewards">Rewards Received</router-link>
                </li>

                <hr />

                <div class="nav-section-title">
                    Private Information
                    <br /><span>(encryption + anonymity on-chain)</span>
                </div>

                <li :class="{active: tab === 'dashboard'}">
                    <router-link :to="dashboard">Dashboard</router-link>
                </li>

                <li :class="{active: tab === 'wallet'}">
                    <router-link :to="wallet">Cash Wallet</router-link>
                </li>

                <li :class="{active: tab === 'received'}">
                    <router-link :to="received">Pledges Received</router-link>
                </li>

                <li :class="{active: tab === 'backing'}">
                    <router-link :to="backing">Backed Causes</router-link>
                </li>
            </ul>
        </nav>
    </div>
</template>

<script>
export default {
    props: {
        tab: String,
    },
    components: {
        //
    },
    data: () => {
        return {
            user: null,
        }
    },
    computed: {
        /* Dashboard URL. */
        dashboard() {
            return `/@${this.user}/dashboard`
        },

        /* Profile URL. */
        profile() {
            return `/@${this.user}`
        },

        /* Causes URL. */
        wallet() {
            return `/@${this.user}/wallet`
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
.nav-section-title {
    margin: 15px 0 5px 20px;
    font-size: 0.8em;
    font-weight: 600;
    color: rgba(255, 90, 90, 0.8);
}
.nav-section-title span {
    font-weight: 500;
    color: rgba(150, 150, 150, 0.8);
}
</style>
