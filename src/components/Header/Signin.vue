<template>
    <div class="login login-button auth-btn">
        <a v-if="!hasAuth" href="javascript://" class="btn-primary" @click="signIn">
            Sign In
        </a>
        <a v-else href="javascript://" class="btn-primary" @click="signOut">
            Sign Out
        </a>

        <div class="form-signin"></div>

        <form action="javascript://" method="POST" id="signinForm">
            <nav class="nav nav-tabs nav-justified" id="nav-tab" role="tablist">
                <a class="nav-item nav-link active" id="nav-home-tab" data-toggle="tab" href="#nav-home" role="tab" aria-controls="nav-home" aria-selected="true">
                    Email &amp; Password
                </a>

                <a class="nav-item nav-link" id="nav-profile-tab" data-toggle="tab" href="#nav-profile" role="tab" aria-controls="nav-profile" aria-selected="false">
                    Badger | MetaMask
                </a>

                <a class="nav-item nav-link" id="nav-contact-tab" data-toggle="tab" href="#nav-contact" role="tab" aria-controls="nav-contact" aria-selected="false">
                    Ledger Nano
                </a>
            </nav>

            <!-- <div class="tab-content" id="nav-tabContent">
                <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                    <Email />
                </div>

                <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                    <Extensions />
                </div>

                <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                    <Ledger />
                </div>
            </div> -->
        </form>
    </div>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import components. */
// import Email from './SigninEmail'
// import Extensions from './SigninExtensions'
// import Ledger from './SigninLedger'
import scrypt from 'scrypt-js'
import superagent from 'superagent'
import Swal from 'sweetalert2'

export default {
    components: {
        // Email,
        // Extensions,
        // Ledger,
    },
    data: () => {
        return {
            //
        }
    },
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
            'destroyProfile',
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
        isValidEmail(_email) {
            /* Set regular express. */
            const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

            /* Return test result. */
            return re.test(_email)
        },

        /**
         * Authorization
         */
        async _authorize(_email, _password) {
            /* Validate email. */
            if (!this.isValidEmail(_email)) {
                // this.toast(['Oops!', 'Invalid email, please try again', 'error'])
                Swal.showValidationMessage(
                    `Invalid email, please try again`
                )

                return false
            }

            /* Validate password. */
            // TODO: Improve "strong" password validation.
            if (!_password) {
                // this.toast(['Oops!', 'Invalid password, please try again', 'error'])
                Swal.showValidationMessage(
                    `Invalid password, please try again`
                )

                return false
            }

            /* Disable sign in button. */
            // this.canSignIn = false

            // FIXME: We MUST check and update system.authHashes, if necessary.

            /* Set password. */
            const password = Buffer.from(_password.normalize('NFKC'))

            /* Set salt (email address). */
            const salt = Buffer.from(_email.normalize('NFKC'))

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

            /* Compute master seed. */
            const masterSeed = await scrypt
                .scrypt(password, salt, N, r, p, dkLen)

            /* Update master seed. */
            this.updateMasterSeed(masterSeed)

            /* Update email address. */
            this.updateEmail(_email)

            /* Set nickname. */
            const nickname = _email.slice(0, _email.indexOf('@'))

            /* Update nickname. */
            this.updateNickname(nickname)

            /* Initialize wallet. */
            this.initWallet()

            /* Set (current receiving) address. */
            // const address = this.getAddress
            // console.log('ADDRESS', address)

            /* Enable sign in button. */
            // this.canSignIn = true

            /* Close modal. */
            // $('.form-signin').fadeToggle()
            // $('#signinForm').fadeToggle()

            /* Set target. */
            const target = this.getApiProvider + '/profiles'

            const msg = {
                action: 'SIGNIN_EMAIL',
                email: _email,
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

            return true

        },

        /**
         * Sign In
         */
        async signIn() {
            // $('.form-signin').fadeToggle()
            // $('#signinForm').fadeToggle()

            // const { value: formValues } = await Swal.fire({
            await Swal.fire({
                title: 'Sign In to Causes Cash',
                html:
                    `<span class="text-danger">NO REGISTRATION REQUIRED</span>` +
                    `<input type="email" id="swal-email" class="swal2-input" placeholder="Enter ANY email address">` +
                    `<input type="password" id="swal-password" class="swal2-input" placeholder="Enter ANY strong password">` +
                    `<small class="text-secondary">( account data is managed locally by your browser )</small>`,
                focusConfirm: false,
                preConfirm: async () => {
                    const email = document.getElementById('swal-email').value
                    const password = document.getElementById('swal-password').value

                    const isAuthorized = await this._authorize(email, password)
                    console.log('isAuthorized', isAuthorized)
                    // Swal.enableButtons()
                    // throw new Error('maybe try again?')
                    return isAuthorized
                }
            })
        },

        /**
         * Sign Out
         *
         * TODO: Show a notification of confirmation.
         */
        signOut() {
            /* Load home. */
            this.$router.replace('/')

            /* Reset profile. */
            this.destroyProfile()

            /* Show notification. */
            this.toast(['Success!', `You've been signed out successfully`, 'success'])
        },

    },
    created: function () {
        //
    },
    mounted: function () {
        // $('.form-signin').on('click', function (e) {
        //     e.preventDefault()
        //
        //     $(this).fadeToggle()
        //     $(this).parent().find('#signinForm').fadeToggle()
        // })
    },
}
</script>

<style>
div.instructions {
    padding: 0 50px 15px;
}
div.instructions .warning {
    color: red;
    font-weight: 600;
}

.coming-soon {
    width: 100%;
    text-align: center;
    /* padding: 20px 0 40px; */
    padding: 20px;
    font-size: 0.9em;
    font-weight: 600;
    line-height: 32px;
    color: rgba(30, 30, 30, 0.5);
}
@media screen and (min-width: 767px) {
    div.instructions {
        padding: 0 50px 15px;
        line-height: 25px;
    }

    .coming-soon {
        padding: 20px 0 40px;
        font-size: 1.6em;
        font-weight: 600;
        line-height: 45px;
    }
}
</style>

<style scoped>
.form-signin {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 10;
    display: none;
}
#signinForm {
    z-index: 10;
}
.auth-btn form {
    position: fixed;
    top: 50%;
    transform: translateY(-50%);
    left: 0;
    right: 0;
    max-width: 960px;
    margin: 0 auto;
    line-height: 60px;
    border-radius: 3px;
    overflow: hidden;
    z-index: 9999;
    display: none;

    background-color: rgba(180, 180, 180, 0.85);
    padding: 0;
}
.auth-btn .tab-pane {
    background-color: rgba(255, 255, 255, 0.85);
    padding: 30px 0 15px;
}
</style>
