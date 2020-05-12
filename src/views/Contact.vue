<template>
    <main class="faq">
        <Header />

        <!-- <div class="page-title background-page"> -->
        <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
			<div class="container">
				<h1>Contact Us</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Contact Us</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
            <div class="container">
                <div class="row">
                    <div class="col-lg-12 main-content">
                        <div class="entry-content">
                            <div class="row">
                                <div class="col-lg-8">
                                    <div class="form-contact">
                                        <h2>Drop US a line</h2>

                                        <form action="javascript://" method="POST" id="contactForm" class="clearfix">
                                            <div class="clearfix">
                                                <div class="field align-left">
                                                    <input type="text" value="" name="s" placeholder="Your Name" />
                                                </div>

                                                <div class="field align-right">
                                                    <input type="text" value="" name="s" placeholder="Your Email" />
                                                </div>
                                            </div>

                                            <div class="field">
                                                <input type="text" value="" name="s" placeholder="Subject" />
                                            </div>

                                            <div class="field-textarea">
                                                <textarea rows="8" placeholder="Message"></textarea>
                                            </div>

                                            <button type="submit" value="Send Messager" class="btn-primary">
                                                Submit Message</button>
                                        </form>
                                    </div>
                                </div>

                                <div class="col-lg-4">
                                    <div class="contact-info">
                                        <h3>Contact Infomation</h3>

                                        <ul>
                                            <li>
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>3423 Piedmont Rd NE, Atlanta, GA 30305
                                            </li>

                                            <li>
                                                <i class="fa fa-phone" aria-hidden="true"></i>+1 (678) 981-8818
                                            </li>

                                            <li>
                                                <i class="fa fa-envelope-o" aria-hidden="true"></i><a href="mailto:support@bchplease.org">support@bchplease.org</a>
                                            </li>

                                            <li>
                                                <i class="fa fa-slack" aria-hidden="true"></i><a href="https://join.slack.com/t/bchplease/shared_invite/zt-e7jj03j5-vJbe47kNrPBjTgTXwLNRkA" target="_blank">Join our Slack</a>
                                            </li>
                                        </ul>

                                        <div class="contact-desc">
                                            <p>
                                                Come visit us at the Atlanta Tech Village in the heart of Buckhead.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
    components: {
        Footer,
        Header,
    },
    computed: {
        /**
         * Banner Image
         */
        bannerImg() {
            return 'https://i.imgur.com/9vNfGgt.jpg'
        },
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
