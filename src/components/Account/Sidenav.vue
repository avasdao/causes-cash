<template>
    <div class="col-lg-3">
        <nav class="account-bar">
            <ul>
                <li :class="{active: tab === 'dashboard'}"><router-link to="/account/dashboard">Dashboard</router-link></li>
                <li :class="{active: tab === 'profile'}"><router-link to="/account/profile">My Profile</router-link></li>
                <li :class="{active: tab === 'causes'}"><router-link to="/account/causes">My Causes</router-link></li>
                <li :class="{active: tab === 'backing'}"><router-link to="/account/backing">Backed Causes</router-link></li>
                <li :class="{active: tab === 'received'}"><router-link to="/account/received">Pledges Received</router-link></li>
                <li :class="{active: tab === 'rewards'}"><router-link to="/account/rewards">Rewards</router-link></li>
                <li :class="{active: tab === 'payments'}"><router-link to="/account/payments">Payments</router-link></li>
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
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
