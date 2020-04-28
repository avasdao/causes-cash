<template>
    <main>
        <div class="instructions">
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
            <div class="col-sm-2">
                &nbsp;
                <!-- offset fix -->
            </div>

            <label for="validEmail" class="col-sm-2 col-form-label">
                Email
            </label>

            <div class="col-sm-6">
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
            <div class="col-sm-2">
                &nbsp;
                <!-- offset fix -->
            </div>

            <label for="strongPassword" class="col-sm-2 col-form-label">
                Password
            </label>

            <div class="col-sm-6">
                <input
                type="password"
                class="form-control"
                id="strongPassword"
                placeholder="Enter a strong password"
                v-model="password"
            >

                <label class="form-group-label" for="strongPassword">
                    * we highly recommend the use of a password manager
                    (eg. <a href="https://www.lastpass.com/" target="_blank">Lastpass</a>, <a href="https://keepass.info/" target="_blank">KeePass</a>, etc.)
                </label>
            </div>
        </div>

        <div class="form-group row">
            <div class="col-sm-2">
                &nbsp;
                <!-- offset fix -->
            </div>

            <div class="col-sm-8 text-right">
                <button type="button" class="btn btn-primary" @click="signIn">
                    Sign In
                </button>
            </div>
        </div>
    </main>
</template>

<script>
/* Initialize vuex. */
import { mapGetters } from 'vuex'

/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            email: '',
            password: '',
        }
    },
    computed: {
        ...mapGetters([
            'getHelp',
        ]),
    },
    methods: {
        signIn() {
            /* Set password. */
            const password = Buffer.from(this.password.normalize('NFKC'))
            console.log('Password/password', password, this.password, this.password.normalize('NFKC'))

            /* Set salt (email address). */
            const salt = Buffer.from(this.email.normalize('NFKC'))
            console.log('Salt/email', salt, this.email, this.email.normalize('NFKC'))
        },
    },
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
