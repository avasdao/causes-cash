<template>
    <div class="login login-button signin-btn">
        <a href="javascript://" class="btn-primary" @click="signIn">Sign In</a>

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

            <div class="tab-content" id="nav-tabContent">
              <div class="tab-pane fade show active" id="nav-home" role="tabpanel" aria-labelledby="nav-home-tab">
                  <Email />
              </div>

              <div class="tab-pane fade" id="nav-profile" role="tabpanel" aria-labelledby="nav-profile-tab">
                  <Extensions />
              </div>

              <div class="tab-pane fade" id="nav-contact" role="tabpanel" aria-labelledby="nav-contact-tab">
                  <Ledger />
              </div>
            </div>
        </form>
    </div>
</template>

<script>
/* Import components. */
import Email from './SigninEmail'
import Extensions from './SigninExtensions'
import Ledger from './SigninLedger'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        Email,
        Extensions,
        Ledger,
    },
    data: () => {
        return {
            //
        }
    },
    methods: {
        //
    },
    created: function () {
        //
    },
    mounted: function () {
        /* Signin handler. */
        $('.signin-btn a').on('click', function (e) {
            e.preventDefault()

            $(this).parent().find('.form-signin').fadeToggle()
            $(this).parent().find('#signinForm').fadeToggle()
        })
        $('.form-signin').on('click', function (e) {
            e.preventDefault()

            $(this).fadeToggle()
            $(this).parent().find('#signinForm').fadeToggle()
        })
    },
}
</script>

<style scoped>
.form-signin {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0,0,0,0.8);
    z-index: 99;
    display: none;
}
.signin-btn form {
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
.signin-btn .tab-pane {
    background-color: rgba(255, 255, 255, 0.85);
    padding: 30px 0 15px;
}
</style>
