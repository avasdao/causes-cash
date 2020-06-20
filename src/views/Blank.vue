<template>
    <main>
        <Header />

        <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
			<div class="container">
				<h1>Blank Page</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Blank Page</li>
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

                                    LEFT

                                </div>

                                <div class="col-lg-4">

                                    RIGHT

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

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        Footer,
        Header,
    },
    computed: {
        /* Banner Image */
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
