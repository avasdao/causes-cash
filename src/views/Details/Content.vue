<template>
    <div class="campaign-content">
		<div class="container">

			<div class="">
			<!-- <div class="campaign"> -->

				<div class="campaign-item clearfix">

                    <div class="campaign-image">
						<div id="owl-campaign" class="campaign-slider">
							<div class="item">
                                <img src="@/assets/img/campaign-recent-01.jpg" alt="">
                            </div>

                            <div class="item">
                                <img src="@/assets/img/campaign-recent-02.jpg" alt="">
                            </div>

                            <div class="item">
                                <img src="@/assets/img/campaign-recent-03.jpg" alt="">
                            </div>
						</div>
					</div>

                    <div class="campaign-box">
						<a href="javascript://" class="category">{{category}}</a>

                        <h3>{{title}}</h3>

                        <div class="campaign-description">
                            <p>{{description}}</p>
                        </div>

                        <div class="campaign-author clearfix">
							<div class="author-profile">
								<a class="author-icon" href="javascript://">
                                    <img :src="authorImgUrl" alt=""></a>
                                    by <a class="author-name" href="javascript://">{{authorName}}</a>
							</div>

                            <div class="author-address">
                                <span class="ion-location"></span>
                                {{campaignType}}
                            </div>
						</div>

                        <div class="process">
							<div class="raised">
                                <span></span>
                            </div>

                            <div class="process-info">
								<div class="process-funded">
                                    <span>$10000</span>funding goal
                                </div>

                                <div class="process-pledged">
                                    <span>$8100</span>pledged
                                </div>

                                <div class="process-time">
                                    <span>37</span>backers
                                </div>

                                <div class="process-time">
                                    <span>23</span>days ago
                                </div>
							</div>
						</div>

                        <div class="button">
							<form action="javascript://" id="priceForm" class="campaign-price quantity">
								<input type="number" value="1" min="0" name="s" placeholder="" />
								<button class="btn-primary" type="submit">Back this Campaign</button>
							</form>

                            <a href="javascript://" class="btn-secondary">
                                <i class="fa fa-heart" aria-hidden="true"></i>
                                Remind me</a>
						</div>

                        <div class="share">
							<p>
                                Share this project <em class="text-muted">(auto affiliate links)</em>
                            </p>

                            <ul>
								<li class="share-facebook">
                                    <a href="javascript://"><i class="fa fa-facebook" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-twitter">
                                    <a href="javascript://"><i class="fa fa-twitter" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-google-plus">
                                    <a href="javascript://"><i class="fa fa-google-plus" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-linkedin">
                                    <a href="javascript://"><i class="fa fa-linkedin" aria-hidden="true"></i></a>
                                </li>

                                <li class="share-code">
                                    <a href="javascript://"><i class="fa fa-code" aria-hidden="true"></i></a>
                                </li>
							</ul>
						</div>
					</div>
				</div>
			</div>
		</div>
	</div>
</template>

<script>
/* Import components. */
// import Summary from './Content/Summary.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        // Summary,
    },
    data: () => {
        return {
            category: null,
            title: null,
        }
    },
    methods: {
        //
    },
    created: function () {
        /* Set category. */
        this.category = 'Product Development'

        /* Set title. */
        this.title = `Nito Cash`

        /* Set description. */
        this.description = `
Nito Cash is the most user-friendly, privacy shielding wallet for crypto newcomers.
The Nito Cash Treasury is the first digital bank to support the nascent CashFusion protocol via a mobile wallet.
        `

        /* Set author name. */
        this.authorName = 'Bitcoin Cash Please'

        /* Set author location. */
        this.campaignType = 'DRIPP Campaign'

        /* Set author image url. */
        this.authorImgUrl = 'https://i.imgur.com/f1kian5.png'
    },
}
</script>

<style scoped>
/*  */
</style>
