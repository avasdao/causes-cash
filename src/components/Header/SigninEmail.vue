<template>
    <main>
        <div class="instructions d-none d-md-block">
            <h3>INSTRUCTIONS</h3>

            <ol>
                <li>
                    Causes Cash profiles &amp; wallets are
                    <strong>highly secure <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('campaigns/intro')"></i></strong>
                    within your web browser, but
                    <strong>fully-transparent <i class="fa fa-question-circle-o" aria-hidden="true" @click="getHelp('contributions/free')"></i></strong>
                    on the blockchain.
                </li>

                <li>
                    You can signin using <strong>ANY email and password</strong>
                    combination that you prefer (easy to create multiple accounts).
                </li>

                <li>
                    Your email and password are
                    <strong>NOT verified</strong> by anyone,
                    they are <strong>NOT sent</strong> anywhere
                    and they are <strong>NOT stored</strong> anywhere.
                </li>
            </ol>

            <div class="warning text-center">
                !! WARNING: DO NOT FORGET/LOSE YOUR SIGN IN, OR YOU WILL LOSE ACCESS TO YOUR IRRECOVERABLE WALLET !!
            </div>
        </div>

        <div class="form-group row">
            <div class="col-1 col-sm-2">
                <!-- offset fix -->
            </div>

            <label for="validEmail" class="col-10 col-sm-2 col-form-label">
                Email
            </label>

            <div class="col-1 d-sm-none">
                <!-- offset fix -->
            </div>

            <div class="col-1 d-sm-none">
                <!-- offset fix -->
            </div>

            <div class="col-10 col-sm-6">
                <input
                    type="email"
                    class="form-control"
                    id="validEmail"
                    placeholder="Enter a valid email address"
                    v-model="email"
                >
            </div>
        </div>

        <div class="form-group row">
            <div class="col-1 col-sm-2">
                <!-- offset fix -->
            </div>

            <label for="strongPassword" class="col-10 col-sm-2 col-form-label">
                Password
            </label>

            <div class="col-1 d-sm-none">
                <!-- offset fix -->
            </div>

            <div class="col-1 d-sm-none">
                <!-- offset fix -->
            </div>

            <div class="col-10 col-sm-6">
                <input
                type="password"
                class="form-control"
                id="strongPassword"
                placeholder="Enter a strong password"
                v-model="password"
            >

                <label class="form-group-label d-none d-md-block" for="strongPassword">
                    * we highly recommend the use of a password manager
                    (eg. <a href="https://www.lastpass.com/" target="_blank">Lastpass</a>, <a href="https://keepass.info/" target="_blank">KeePass</a>, etc.)
                </label>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-10 text-right">
                <button
                    type="button"
                    class="btn btn-primary"
                    @click="signIn"
                    :disabled="!canSignIn"
                >
                    Sign In
                </button>
            </div>

            <div class="col-2">
                <!-- offset fix -->
            </div>
        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import modules. */
import scrypt from 'scrypt-js'
import superagent from 'superagent'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            email: '',
            password: '',

            canSignIn: null,
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),

        ...mapGetters('profile', [
            'getSignedMessage',
        ]),
    },
    methods: {
        ...mapActions('profile', [
            'updateEmail',
            'updateMasterSeed',
            'updateNickname',
        ]),

        ...mapActions('utils', [
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
         * Sign In
         */
        signIn() {
            /* Validate email. */
            if (!this.isValidEmail()) {
                return this.toast(['Oops!', 'Invalid email. Please try again.', 'error'])
            }

            /* Validate password. */
            // TODO: Improve "strong" password validation.
            if (!this.password) {
                return this.toast(['Oops!', 'Invalid password. Please try again.', 'error'])
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

            /* Compute key. */
            const keyPromise = scrypt
                .scrypt(password, salt, N, r, p, dkLen)

            /* Resolve key. */
            keyPromise.then(key => {
                /* Update master seed. */
                this.updateMasterSeed(key)

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

                /* Close modal. */
                $('.form-signin').fadeToggle()
                $('#signinForm').fadeToggle()

                /* Set target. */
                const target = 'https://api.causes.cash/v1/profiles'

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
                        if (err) return console.error(err) // eslint-disable-line no-console

                        console.log('SIGN IN (response):', res)
                    })

            })

        },
    },
    created: function () {
        /* Enable sign in button. */
        this.canSignIn = true
    }
}
</script>

<style scoped>
div.instructions {
    padding: 0 50px 15px;
    line-height: 25px;
}
div.instructions ol {
    margin: 15px 0 10px 30px;
}
div.instructions .warning {
    color: red;
    font-weight: 600;
}

form input {
    width: 100%;
    padding: 0 73px 0 15px;
    line-height: 60px;
    border: 0;
    border-radius: 3px;
    overflow: hidden;
}

.form-group-label {
    font-size: 0.8em;
    color: red;
}
.form-group-label a {
    font-weight: 500;
    color: red;
}
</style>
