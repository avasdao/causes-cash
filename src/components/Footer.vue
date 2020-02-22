<template>
    <footer id="footer" class="site-footer">
        <div class="footer-menu">
            <div class="container">
                <div class="row">
                    <div class="col-lg-3 col-sm-4 col-4">
                        <div class="footer-menu-item">
                            <h3>Our company</h3>
                            <ul>
                                <li><a href="javascript://">What is Startup Idea</a></li>
                                <li><a href="javascript://">About us</a></li>
                                <li><a href="javascript://">How It Works</a></li>
                                <li><a href="javascript://">What Is This</a></li>
                                <li><a href="javascript://">Jobs</a></li>
                                <li><a href="javascript://">Press</a></li>
                                <li><a href="javascript://">Starts</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-4 col-4">
                        <div class="footer-menu-item">
                            <h3>Campaign</h3>
                            <ul>
                                <li><a href="javascript://">Start Your Campaign</a></li>
                                <li><a href="javascript://">Pricing Campaign</a></li>
                                <li><a href="javascript://">Campaign Support</a></li>
                                <li><a href="javascript://">Trust &amp; Safety</a></li>
                                <li><a href="javascript://">Support</a></li>
                                <li><a href="javascript://">Terms of Use</a></li>
                                <li><a href="javascript://">Privacy Policy</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-4 col-4">
                        <div class="footer-menu-item">
                            <h3>Explore</h3>
                            <ul>
                                <li><a href="javascript://">Design &amp; Art</a></li>
                                <li><a href="javascript://">Crafts</a></li>
                                <li><a href="javascript://">Film &amp; Video</a></li>
                                <li><a href="javascript://">Food</a></li>
                                <li><a href="javascript://">Book</a></li>
                                <li><a href="javascript://">Games</a></li>
                                <li><a href="javascript://">Technology</a></li>
                            </ul>
                        </div>
                    </div>
                    <div class="col-lg-3 col-sm-12 col-12">
                        <div class="footer-menu-item newsletter">
                            <h3>Newsletter</h3>
                            <div class="newsletter-description">Private, secure, spam-free</div>
                            <form action="https://preview.thememusion.com/ideapress/s" method="POST" id="newsletterForm">
                                <input type="text" value="" name="s" placeholder="Enter your email..." />
                                <button type="submit" value=""><span class="ion-android-drafts"></span></button>
                            </form>

                            <div class="follow">
                                <h3>Check out these places</h3>
                                <ul>
                                    <li class="twitter"><a href="https://twitter.com/search?q=%23BitcoinCauses" target="_blank"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                                    <li class="instagram"><a href="https://reddit.com/r/CausesCash" target="_blank"><i class="fa fa-reddit" aria-hidden="true"></i></a></li>
                                    <li class="facebook"><a href="https://github.com/modenero/causes-cash" target="_blank"><i class="fa fa-github" aria-hidden="true"></i></a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="footer-top">
                    <p class="payment-img">
                        <svgicon class="coin-icon" icon="bch" width="42" height="42" :fill="false" :original="true"></svgicon>
                        <svgicon class="coin-icon" icon="dai" width="36" height="36" :fill="false" :original="true"></svgicon>
                        <svgicon class="coin-icon" icon="btc" width="36" height="36" :fill="false" :original="true"></svgicon>
                        <svgicon class="coin-icon" icon="eth" width="36" height="36" :fill="false" :original="true"></svgicon>
                        <svgicon class="coin-icon" icon="ltc" width="36" height="36" :fill="false" :original="true"></svgicon>
                        <svgicon class="coin-icon" icon="xmr" width="36" height="36" :fill="false" :original="true"></svgicon>
                        <svgicon class="coin-icon" icon="xrp" width="36" height="36" :fill="false" :original="true"></svgicon>
                    </p>
                    <div class="footer-top-right">
                        <div class="dropdow field-select">
                            <select name="s">
                                <option value="">$ US Dollar (USD)</option>
                                <option value="">£ Pound Sterling (GBP)</option>
                                <option value="">€ Euro (EUR)</option>
                            </select>
                        </div>
                        <div class="dropdow field-select">
                            <select name="s">
                                <option value="">English</option>
                                <option value="">Greek (Ελληνικά)</option>
                                <option value="">Deutsch (German)</option>
                                <option value="">العربية (Arabic)</option>
                            </select>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <div class="footer-copyright">
            <div class="container">
                <p class="copyright">&copy; 2020 by Modenero. All Rights Reserved.</p>
                <a href="javascript://" class="back-top">Back to top<span class="ion-android-arrow-up"></span></a>
            </div>
        </div>
    </footer>
</template>

<script>
/* Import icons. */
import '@/compiled-icons/bch'
import '@/compiled-icons/btc'
import '@/compiled-icons/dai'
import '@/compiled-icons/eth'
import '@/compiled-icons/ltc'
import '@/compiled-icons/xmr'
import '@/compiled-icons/xrp'

export default {
    props: {
        //
    }
}
</script>

<style scoped>
.coin-icon {
    margin: 0 10px;
}
.payment-img {
    /* vertical-align: middle !important; */
}
/* svgicon {
    margin: 0 5px;
} */
</style>
