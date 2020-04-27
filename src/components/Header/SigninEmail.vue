<template>
    <main>
        <div class="instructions">
            <h3>INSTRUCTIONS</h3>

            Causes Cash accounts are <strong>simple, private and secure.</strong>
            You can signin using <strong>ANY email and password</strong> combination that you prefer.
            Your email and password are <strong>NOT verified</strong> by anyone, they are <strong>NOT sent</strong> anywhere and they are <strong>NOT stored</strong> anywhere.
            They are <strong>ONLY</strong> used to create a Bitcoin Cash (BCH) wallet that will be stored <strong>ONLY</strong> in your current web browser.

            <div class="warning text-center">
                !! WARNING: DO NOT FORGET YOUR SIGN IN, OR YOU WILL LOSE ACCESS TO YOUR IRRECOVERABLE WALLET !!
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
                <input type="email" class="form-control" id="validEmail" placeholder="Enter a valid email address">
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
                <input type="password" class="form-control" id="strongPassword" placeholder="Enter a strong password">
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
                <button type="submit" class="btn btn-primary">Sign In</button>
            </div>
        </div>
    </main>
</template>

<script>
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
            //
        }
    },
    methods: {
        //
    },
}
</script>

<style scoped>
div.instructions {
    padding: 0 50px 15px;
    line-height: 25px;
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
