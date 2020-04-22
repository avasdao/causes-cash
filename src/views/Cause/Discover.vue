<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
			<div class="container">
				<h1>Discover Causes</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Discover Causes</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
            <div class="campaigns-action clearfix">
                <div class="container">
                    <div class="sort">
                        <span>Sort by:</span>
                        <ul>
                            <li class="active"><a href="javascript://">Recent Project</a></li>
                            <li><a href="javascript://">Most Project</a></li>
                        </ul>
                    </div>
                    <!-- .sort -->
                    <div class="filter">
                        <span>Filter by:</span>
                        <form action="javascript://">
                            <div class="field-select">
                                <select name="s">
                                    <option value="">All Stages</option>
                                    <option value="">Pending</option>
                                    <option value="">Cancel</option>
                                    <option value="">Completed</option>
                                </select>
                            </div>
                            <div class="field-select">
                                <select name="s">
                                    <option value="">All Category</option>
                                    <option value="">Design & Art</option>
                                    <option value="">Book</option>
                                    <option value="">Perfomances</option>
                                    <option value="">Technology</option>
                                </select>
                            </div>
                        </form>
                    </div>
                    <!-- .filter -->
                </div>
            </div>

            <!-- .campaigns-action -->
            <div class="campaigns">
                <div class="container">
                    <div class="campaign-content">
                        <div class="row">
                            <div class="col-lg-12">
                                <div class="campaign-big-item clearfix">
                                    <a href="javascript://" class="campaign-big-image">
                                        <img src="@/assets/img/campaign-big-item.jpg" alt=""></a>

                                    <div class="campaign-big-box">
                                        <a href="javascript://" class="category">Design & Art</a>

                                        <h3><a href="campaign_detail.html">Creative Furniture Designs</a></h3>

                                        <div class="campaign-description">
                                            He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections.
                                            The bedding was hardly able to cover it and seemed ready to slide off any moment.
                                        </div>

                                        <div class="staff-picks-author">
                                            <div class="author-profile">
                                                <a class="author-avatar" href="javascript://"><img src="@/assets/img/author-01.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                            </div>

                                            <div class="author-address">
                                                <span class="ion-location"></span>Melbourne, Victoria, AU
                                            </div>
                                        </div>

                                        <div class="process">
                                            <div class="raised"><span></span></div>

                                            <div class="process-info">
                                                <div class="process-pledged">
                                                    <span>$10000</span>pledged
                                                </div>

                                                <div class="process-funded">
                                                    <span>81%</span>funded
                                                </div>

                                                <div class="process-time">
                                                    <span>37</span>backers
                                                </div>

                                                <div class="process-time">
                                                    <span>23</span>days ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-01.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>

                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Crafts</a>

                                        <h3><a href="campaign_detail.html">The Oreous Pillow</a></h3>

                                        <div class="campaign-description">A watch designed to be an heirloom to be passed down to the next generation.</div>

                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://">
                                                <img src="@/assets/img/author-01.png" alt="">
                                            </a>
                                            by
                                            <a class="author-name" href="javascript://">
                                                Sabato Alterio</a>
                                        </div>

                                        <div class="process">
                                            <div class="raised"><span></span></div>

                                            <div class="process-info">
                                                <div class="process-pledged">
                                                    <span>$630</span>pledged
                                                </div>

                                                <div class="process-funded">
                                                    <span>26%</span>funded
                                                </div>

                                                <div class="process-time">
                                                    <span>2</span>days ago
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-02.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Book</a>
                                        <h3><a href="campaign_detail.html">The Everlast Notebook</a></h3>
                                        <div class="campaign-description">One smart, reusable notebook to last the rest of your life? That's not magic, that's the Everlast.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-02.png" alt=""></a>by <a class="author-name" href="javascript://">Samino</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$370</span>pledged</div>
                                                <div class="process-funded"><span>9%</span>funded</div>
                                                <div class="process-time"><span>9</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-03.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Perfomances</a>
                                        <h3><a href="campaign_detail.html">Uncompromising Ski Gear</a></h3>
                                        <div class="campaign-description">The Orsden Slope Pants don't compromise delivering performance, fit, and value directly to you</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-03.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$610</span>pledged</div>
                                                <div class="process-funded"><span>73%</span>funded</div>
                                                <div class="process-time"><span>14</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-04.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Technology</a>
                                        <h3><a href="campaign_detail.html">Smart Wallet with Solar Charge</a></h3>
                                        <div class="campaign-description">A wonderful serenity has taken possession of my entire soul, like these sweet mornings.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-01.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$3670</span>pledged</div>
                                                <div class="process-funded"><span>58%</span>funded</div>
                                                <div class="process-time"><span>21</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-05.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Technology</a>
                                        <h3><a href="campaign_detail.html">Redefine Your VR Experience</a></h3>
                                        <div class="campaign-description">I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-02.png" alt=""></a>by <a class="author-name" href="javascript://">Sabato Alterio</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$1950</span>pledged</div>
                                                <div class="process-funded"><span>70%</span>funded</div>
                                                <div class="process-time"><span>23</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-06.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Design &amp; Art</a>
                                        <h3><a href="campaign_detail.html">Bring back Fun House</a></h3>
                                        <div class="campaign-description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-03.png" alt=""></a>by <a class="author-name" href="javascript://">Samino</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$3900</span>pledged</div>
                                                <div class="process-funded"><span>69%</span>funded</div>
                                                <div class="process-time"><span>33</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-01.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Technology</a>
                                        <h3><a href="campaign_detail.html">Smart Wallet with Solar Charge</a></h3>
                                        <div class="campaign-description">A wonderful serenity has taken possession of my entire soul, like these sweet mornings.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-01.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$3670</span>pledged</div>
                                                <div class="process-funded"><span>58%</span>funded</div>
                                                <div class="process-time"><span>21</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-02.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Technology</a>
                                        <h3><a href="campaign_detail.html">Redefine Your VR Experience</a></h3>
                                        <div class="campaign-description">I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-02.png" alt=""></a>by <a class="author-name" href="javascript://">Sabato Alterio</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$1950</span>pledged</div>
                                                <div class="process-funded"><span>70%</span>funded</div>
                                                <div class="process-time"><span>23</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4 col-sm-6 col-6">
                                <div class="campaign-item">
                                    <a class="overlay" href="campaign_detail.html">
                                        <img src="@/assets/img/latest-03.jpg" alt="">
                                        <span class="ion-ios-search-strong"></span>
                                    </a>
                                    <div class="campaign-box">
                                        <a href="javascript://" class="category">Design &amp; Art</a>
                                        <h3><a href="campaign_detail.html">Bring back Fun House</a></h3>
                                        <div class="campaign-description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</div>
                                        <div class="campaign-author">
                                            <a class="author-icon" href="javascript://"><img src="@/assets/img/author-03.png" alt=""></a>by <a class="author-name" href="javascript://">Samino</a></div>
                                        <div class="process">
                                            <div class="raised"><span></span></div>
                                            <div class="process-info">
                                                <div class="process-pledged"><span>$3900</span>pledged</div>
                                                <div class="process-funded"><span>69%</span>funded</div>
                                                <div class="process-time"><span>33</span>days ago</div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div class="latest-button text-center">
                        <a href="javascript://" class="btn-primary">Load More Causes</a>
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
