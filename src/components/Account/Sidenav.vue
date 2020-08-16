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

                <li :class="{active: tab === 'campaigns'}">
                    <router-link :to="campaigns">Campaigns</router-link>
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
            ownerSlug: null,
        }
    },
    computed: {
        /* Dashboard */
        dashboard() {
            return `/@${this.ownerSlug}/dashboard`
        },

        /* Profile */
        profile() {
            return `/@${this.ownerSlug}`
        },

        /* Wallet */
        wallet() {
            return `/@${this.ownerSlug}/wallet`
        },

        /* Campaigns */
        campaigns() {
            return `/@${this.ownerSlug}/campaigns`
        },

        /* Backing */
        backing() {
            return `/@${this.ownerSlug}/backing`
        },

        /* Received */
        received() {
            return `/@${this.ownerSlug}/received`
        },

        /* Rewards */
        rewards() {
            return `/@${this.ownerSlug}/rewards`
        },

        /* Payments */
        payments() {
            return `/@${this.ownerSlug}/payments`
        },

    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()

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
