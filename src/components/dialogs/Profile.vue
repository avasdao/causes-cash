<template>
    <v-dialog
        :value="isOpen"
        fullscreen
        hide-overlay
        transition="dialog-bottom-transition"
    >
        <v-card>
            <v-toolbar dark color="#8dc351">
                <v-btn icon dark @click="$emit('close')">
                    <v-icon>mdi-close</v-icon>
                </v-btn>

                <v-toolbar-title v-if="hasAuth">@{{getNickname}}</v-toolbar-title>
                <v-toolbar-title v-if="!hasAuth">Guest User</v-toolbar-title>

                <!-- <v-spacer></v-spacer> -->

                <!-- <v-toolbar-items>
                    <v-btn dark text @click="$emit('close')">
                        Close
                    </v-btn>
                </v-toolbar-items> -->
            </v-toolbar>

            <v-tabs v-if="hasAuth" color="#00977e" right>
                <v-tab>Profile</v-tab>
                <v-tab>Wallet</v-tab>
                <v-tab>Settings</v-tab>
                <v-tab>Team</v-tab>

                <v-tab-item key="dashboard" class="mt-5">
                    <Dashboard />
                </v-tab-item>

                <v-tab-item key="wallet" class="mt-5">
                    <Wallet />
                </v-tab-item>

                <v-tab-item key="settings" class="mt-5">
                    <Settings />
                </v-tab-item>

                <v-tab-item key="team" class="mt-5">
                    <Team />
                </v-tab-item>
            </v-tabs>

            <v-container v-if="!hasAuth && !isSkipping">
                <div class="mb-5">
                    <h3 class="red--text no-registration">
                        NO <u>ONLINE</u> REGISTRATION REQUIRED
                    </h3>

                    <div class="notice mt-2">
                        <h3>Your security is our #1 concern!</h3>

                        <p class="mt-2">
                            The email and password you provide below is strictly used to secure your Causes Cash wallet.
                        </p>

                        <p class="mt-2">
                            <strong>100% of your account data is managed locally by your mobile app or web browser.</strong>
                        </p>

                        <p class="mt-2">
                            For your convenience, metadata (eg. campaign details) is encrypted in the Causes Cash cloud.
                        </p>
                    </div>
                </div>

                <v-text-field
                    class="mb-3"
                    type="email"
                    label="Enter your email address"
                    v-model="email"
                    hint="A valid email is required to receive platform notifications"
                    outlined
                ></v-text-field>

                <v-text-field
                    class="mb-3"
                    type="password"
                    label="Enter your password"
                    v-model="password"
                    hint="We recommend using a password manager (eg. KeePass)"
                    outlined
                ></v-text-field>

                <v-btn
                    class="mr-4"
                    @click="signin"
                    color="primary"
                    :disabled="!canSignIn"
                >
                    Sign In
                </v-btn>

                <v-btn
                    class="mr-4"
                    @click="skipSignin"
                    dark
                    color="red"
                    :disabled="!canSignIn"
                >
                    Skip this step
                </v-btn>

                <div class="ma-5" v-if="scryptProgress">
                    <strong>{{scryptProgress}}% complete...</strong>

                    <p v-if="scryptProgress == '99'">
                        Initializing wallet, just a moment...
                    </p>
                </div>

            </v-container>

            <v-container v-if="!hasAuth && isSkipping">
                <div class="mb-5">
                    <h3 class="red--text no-registration">
                        SKIPPING SIGN IN
                    </h3>

                    <div class="notice mt-2">
                        <h3>Your security is our #1 concern!</h3>

                        <p class="mt-2">
                            When bypassing the email &amp; password sign in, the recovery seed for your Causes Cash wallet will be generated randomly.
                        </p>

                        <h3 class="mt-5 mb-5 red--text">
                            <strong>YOU <u>MUST</u> BACK UP YOUR (MNEMONIC) SEED PHRASE TO RECOVER YOUR ACCOUNT/WALLET IN CASE YOUR DEVICE IS EVER RESET OR LOST.</strong>
                        </h3>

                        <p class="mt-5">
                            Click <strong>"CONFIRM AUTO-SIGNIN"</strong> if you understand and wish to proceed.
                        </p>
                    </div>
                </div>

                <v-btn
                    class="mr-4"
                    @click="autoSignin"
                    :dark="canSignIn"
                    color="primary"
                    :disabled="!canSignIn"
                >
                    Confirm Auto-signin
                </v-btn>

                <v-btn
                    class="mr-4"
                    @click="isSkipping = false"
                    :dark="canSignIn"
                    color="red"
                    :disabled="!canSignIn"
                >
                    Cancel
                </v-btn>

                <div class="ma-5" v-if="scryptProgress">
                    <strong>{{scryptProgress}}% complete...</strong>

                    <p v-if="scryptProgress == '99'">
                        Initializing wallet, just a moment...
                    </p>
                </div>

            </v-container>
        </v-card>
    </v-dialog>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
import scrypt from 'scrypt-js'
import superagent from 'superagent'

/* Import (local) components. */
import Dashboard from './Profile/Dashboard'
import Settings from './Profile/Settings'
import Team from './Profile/Team'
import Wallet from './Profile/Wallet'

export default {
    props: {
        isOpen: Boolean,
    },
    components: {
        Dashboard,
        Settings,
        Team,
        Wallet,
    },
    data: () => ({
        email: null,
        password: null,

        canSignIn: null,
        isSkipping: null,
        scryptProgress: null,
    }),
    computed: {
        ...mapGetters([
            'getApiProvider',
        ]),

        ...mapGetters('profile', [
            'getNickname',
            'getSignedMessage',
        ]),

        /**
         * Has Authorization
         */
        hasAuth() {
            // TODO: Improve authorization scheme.
            if (this.getNickname) {
                return true
            } else {
                return false
            }
        },

    },
    methods: {
        ...mapActions('profile', [
            // 'destroyProfile',
            'updateEmail',
            'updateMasterSeed',
            'updateNickname',
        ]),

        ...mapActions('utils', [
            'report',
            'toast',
        ]),

        ...mapActions('wallet', [
            'initWallet',
        ]),

        /**
         * Is Email (Address) Valid
         */
        isValidEmail() {
            /* Set regular express. */
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            /* Return test result. */
            return re.test(this.email)
        },

        /**
         * Authorization
         */
        async _authorize() {
            const _updateInterface = (_progress) => {
                this.scryptProgress = Math.trunc(100 * _progress)
            }

            /* Validate email. */
            if (!this.isValidEmail()) {
                this.toast(['Oops!', 'Invalid email, please try again', 'error'])
                return false
            }

            /* Validate password. */
            // TODO: Improve "strong" password validation.
            if (!this.password) {
                this.toast(['Oops!', 'Invalid password, please try again', 'error'])
                return false
            }

            /* Disable sign in button. */
            this.canSignIn = false

            // FIXME: We MUST check and update system.authHashes, if necessary.

            /* Set password. */
            const password = Buffer.from(this.password.normalize('NFKC'))

            /* Set salt (email address). */
            const salt = Buffer.from(this.email.normalize('NFKC'))

            /* Set CPU (memory) cost. */
            // NOTE: increasing this increases the overall difficulty.
            // TODO: Test params on mobile devices (scale back, if necessary).
            // const N = 16384 // 2^14 (original recommendation)
            // const N = 32768 // 2^15 (safe recommendation)
            const N = 65536 // 2^16 (JS-native recommendation)
            // const N = 1048576 // 2^20 (optimal recommendation)

            /* Set block size. */
            // NOTE: Increasing this increases the dependency on memory
            //       latency and bandwidth.
            const r = 8

            /* Set parallelization cost. */
            // NOTE: Increasing this increases the dependency on
            //       multi-processing.
            const p = 1

            /* Set derived key length (in bytes). */
            const dkLen = 32

console.log('STARTING SCRIPT');
            /* Compute master seed. */
            const masterSeed = await scrypt
                .scrypt(password, salt, N, r, p, dkLen, _updateInterface)
console.log('ENDING SCRIPT');

            /* Update master seed. */
            this.updateMasterSeed(masterSeed)

            /* Update email address. */
            this.updateEmail(this.email)

            /* Set nickname. */
            const nickname = this.email.slice(0, this.email.indexOf('@'))

            /* Update nickname. */
            this.updateNickname(nickname)

            /* Initialize wallet. */
            this.initWallet()

            /* Set (current receiving) address. */
            // const address = this.getAddress
            // console.log('ADDRESS', address)

            /* Enable sign in button. */
            this.canSignIn = true

            /* Set target. */
            const target = this.getApiProvider + '/profiles'

            const msg = {
                action: 'SIGNIN_EMAIL',
                email: this.email,
            }

            /* Calculate auth signature. */
            const signedMessage = this.getSignedMessage(JSON.stringify(msg))
            console.log('SIGNED MESSAGE', signedMessage)

            superagent
                .post(target)
                .send(signedMessage)
                .end((err, res) => {
                    if (err) {
                        console.error(err) // eslint-disable-line no-console

                        /* Report error. */
                        return this.report(err)
                    }

                    console.log('SIGN IN (response):', res)
                })

            return true

        },

        /**
         * Skip (Authorization)
         */
        async _skip() {
            const _updateInterface = (_progress) => {
                this.scryptProgress = Math.trunc(100 * _progress)
            }

            /* Set email. */
            this.email = 'guest@causes.cash'

            /* Generate "random" password. */
            this.password = Math.random()
                .toString(36)
                .slice(2) +
            Math.random()
                .toString(36)
                .toUpperCase()
                .slice(2)
            console.log('PASSWORD', this.password)

            /* Validate email. */
            if (!this.isValidEmail()) {
                this.toast(['Oops!', 'Invalid email, please try again', 'error'])
                return false
            }

            /* Validate password. */
            // TODO: Improve "strong" password validation.
            if (!this.password) {
                this.toast(['Oops!', 'Invalid password, please try again', 'error'])
                return false
            }

            /* Disable sign in button. */
            this.canSignIn = false

            // FIXME: We MUST check and update system.authHashes, if necessary.

            /* Set password. */
            const password = Buffer.from(this.password.normalize('NFKC'))

            /* Set salt (email address). */
            const salt = Buffer.from(this.email.normalize('NFKC'))

            /* Set CPU (memory) cost. */
            // NOTE: increasing this increases the overall difficulty.
            // TODO: Test params on mobile devices (scale back, if necessary).
            // const N = 16384 // 2^14 (original recommendation)
            // const N = 32768 // 2^15 (safe recommendation)
            const N = 65536 // 2^16 (JS-native recommendation)
            // const N = 1048576 // 2^20 (optimal recommendation)

            /* Set block size. */
            // NOTE: Increasing this increases the dependency on memory
            //       latency and bandwidth.
            const r = 8

            /* Set parallelization cost. */
            // NOTE: Increasing this increases the dependency on
            //       multi-processing.
            const p = 1

            /* Set derived key length (in bytes). */
            const dkLen = 32

console.log('STARTING SCRIPT');
            /* Compute master seed. */
            const masterSeed = await scrypt
                .scrypt(password, salt, N, r, p, dkLen, _updateInterface)
console.log('ENDING SCRIPT');

            /* Update master seed. */
            this.updateMasterSeed(masterSeed)

            /* Update email address. */
            this.updateEmail(this.email)

            /* Set nickname. */
            const nickname = this.email.slice(0, this.email.indexOf('@'))

            /* Update nickname. */
            this.updateNickname(nickname)

            /* Initialize wallet. */
            this.initWallet()

            /* Set (current receiving) address. */
            // const address = this.getAddress
            // console.log('ADDRESS', address)

            /* Enable sign screen. */
            this.isSkipping = false

            /* Enable sign in button. */
            this.canSignIn = true

            /* Set target. */
            const target = this.getApiProvider + '/profiles'

            const msg = {
                action: 'SIGNIN_EMAIL',
                email: this.email,
            }

            /* Calculate auth signature. */
            const signedMessage = this.getSignedMessage(JSON.stringify(msg))
            console.log('SIGNED MESSAGE', signedMessage)

            superagent
                .post(target)
                .send(signedMessage)
                .end((err, res) => {
                    if (err) {
                        console.error(err) // eslint-disable-line no-console

                        /* Report error. */
                        return this.report(err)
                    }

                    console.log('SIGN IN (response):', res)
                })

            return true

        },

        /**
         * Sign In
         */
        async signin() {
            const isAuthorized = await this._authorize()
            console.log('isAuthorized', isAuthorized)
            return isAuthorized
        },

        /**
         * Skip Sign In
         */
        skipSignin() {
            console.log('SKIPPING SIGNIN')

            /* Toggle skipping (option). */
            this.isSkipping = true
        },

        async autoSignin() {
            console.log('GENERATING AUTO-SIGNIN')

            const skipped = await this._skip()
            console.log('skipped', skipped)
            return skipped
        },

    },
    created: function () {
        /* Initialize sign in button. */
        this.canSignIn = true

        /* Initialize skipping (option). */
        this.isSkipping = false
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
.v-sheet--offset {
    top: -24px;
    position: relative;
}

.notice {
    font-size: 0.9em;
    line-height: 20px;
}
</style>
