<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
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
                                                <i class="fa fa-map-marker" aria-hidden="true"></i>Fulham Rd, Fulham, London SW6 1HS, UK
                                            </li>

                                            <li>
                                                <i class="fa fa-phone" aria-hidden="true"></i>(+1) 123.456.789
                                            </li>

                                            <li>
                                                <i class="fa fa-mobile" aria-hidden="true"></i>(+1) 987.654.321
                                            </li>

                                            <li>
                                                <i class="fa fa-envelope-o" aria-hidden="true"></i><a href="/cdn-cgi/l/email-protection" class="__cf_email__" data-cfemail="0f7c6e76676a6363604f466b6a6e5f7d6a7c7c787f216c6062">[email&#160;protected]</a>
                                            </li>
                                        </ul>

                                        <div class="contact-desc">
                                            <p>
                                                Lorem Ipsum is simply dummy text of the printing & typesetting industry. Lorem Ipsum has been scrambled it to make type specimen book.
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
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
