<template>
    <div class="home">

        <div class="preloading">
            <div class="preloader loading">
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
                <span class="slice"></span>
            </div>
        </div>

        <div id="wrapper">
            <Header />

            <main id="main" class="site-main">
                <Slideshow />
                <StaffPicks />

                <div class="how-it-work">
                    <div class="container">
                        <h2 class="title">See How It Work</h2>
                        <div class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
                        <div class="row">
                            <div class="col-lg-4">
                                <div class="item-work">
                                    <div class="item-icon"><span>01</span><i class="fa fa-flask" aria-hidden="true"></i></div>
                                    <div class="item-content">
                                        <h3 class="item-title">Discover Ideas</h3>
                                        <div class="item-desc">
                                            <p>A un Angleso it va semblar un simplificat Angles, quam un skeptic Cambridge amico dit me que Occidental es.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="item-work">
                                    <div class="item-icon"><span>02</span><i class="fa fa-leaf" aria-hidden="true"></i></div>
                                    <div class="item-content">
                                        <h3 class="item-title">Create a NEW Cause</h3>
                                        <div class="item-desc">
                                            <p>Ma quande lingues coalesce, li grammatica del resultant lingue es plu simplic e regulari quam ti del coalescent lingues.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-lg-4">
                                <div class="item-work">
                                    <div class="item-icon"><span>03</span><i class="fa fa-money" aria-hidden="true"></i></div>
                                    <div class="item-content">
                                        <h3 class="item-title">Get Funded</h3>
                                        <div class="item-desc">
                                            <p>Li lingues differe solmen in li grammatica, li pronunciation e li plu commun vocabules.</p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- .how-it-work -->
                <div class="latest campaign">
                    <div class="container">
                        <h2 class="title">Discover Causes</h2>
                        <div class="campaign-tabs filter-theme">
                            <button class="button is-checked" data-filter=".filterinteresting">Interesting</button>
                            <button class="button" data-filter=".filtersuccessful">Successful</button>
                            <button class="button" data-filter=".filterpopular">Popular</button>
                            <button class="button" data-filter=".filterlatest">Latest</button>
                        </div>
                        <div class="campaign-content grid">
                            <div class="row">
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular filterlatest">
                                    <div class="campaign-item">
                                        <a class="overlay" href="https://preview.thememusion.com/ideapress/campaign_detail.html">
                                            <img src="https://preview.thememusion.com/ideapress/images/latest-01.jpg" alt="">
                                            <span class="ion-ios-search-strong"></span>
                                        </a>
                                        <div class="campaign-box">
                                            <a href="javascript://" class="category">Crafts</a>
                                            <h3><a href="https://preview.thememusion.com/ideapress/campaign_detail.html">The Oreous Pillow</a></h3>
                                            <div class="campaign-description">A watch designed to be an heirloom to be passed down to the next generation.</div>
                                            <div class="campaign-author">
                                                <a class="author-icon" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/author-01.png" alt=""></a>by <a class="author-name" href="javascript://">Sabato Alterio</a></div>
                                            <div class="process">
                                                <div class="raised"><span></span></div>
                                                <div class="process-info">
                                                    <div class="process-pledged"><span>$630</span>pledged</div>
                                                    <div class="process-funded"><span>26%</span>funded</div>
                                                    <div class="process-time"><span>2</span>days ago</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterlatest">
                                    <div class="campaign-item">
                                        <a class="overlay" href="https://preview.thememusion.com/ideapress/campaign_detail.html">
                                            <img src="https://preview.thememusion.com/ideapress/images/latest-02.jpg" alt="">
                                            <span class="ion-ios-search-strong"></span>
                                        </a>
                                        <div class="campaign-box">
                                            <a href="javascript://" class="category">Book</a>
                                            <h3><a href="https://preview.thememusion.com/ideapress/campaign_detail.html">The Everlast Notebook</a></h3>
                                            <div class="campaign-description">One smart, reusable notebook to last the rest of your life? That's not magic, that's the Everlast.</div>
                                            <div class="campaign-author">
                                                <a class="author-icon" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/author-02.png" alt=""></a>by <a class="author-name" href="javascript://">Samino</a></div>
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
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular">
                                    <div class="campaign-item">
                                        <a class="overlay" href="https://preview.thememusion.com/ideapress/campaign_detail.html">
                                            <img src="https://preview.thememusion.com/ideapress/images/latest-03.jpg" alt="">
                                            <span class="ion-ios-search-strong"></span>
                                        </a>
                                        <div class="campaign-box">
                                            <a href="javascript://" class="category">Perfomances</a>
                                            <h3><a href="https://preview.thememusion.com/ideapress/campaign_detail.html">Uncompromising Ski Gear</a></h3>
                                            <div class="campaign-description">The Orsden Slope Pants don't compromise delivering performance, fit, and value directly to you</div>
                                            <div class="campaign-author">
                                                <a class="author-icon" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/author-03.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a></div>
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
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterlatest">
                                    <div class="campaign-item">
                                        <a class="overlay" href="https://preview.thememusion.com/ideapress/campaign_detail.html">
                                            <img src="https://preview.thememusion.com/ideapress/images/latest-04.jpg" alt="">
                                            <span class="ion-ios-search-strong"></span>
                                        </a>
                                        <div class="campaign-box">
                                            <a href="javascript://" class="category">Technology</a>
                                            <h3><a href="https://preview.thememusion.com/ideapress/campaign_detail.html">Smart Wallet with Solar Charge</a></h3>
                                            <div class="campaign-description">A wonderful serenity has taken possession of my entire soul, like these sweet mornings.</div>
                                            <div class="campaign-author">
                                                <a class="author-icon" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/author-01.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a></div>
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
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting">
                                    <div class="campaign-item">
                                        <a class="overlay" href="https://preview.thememusion.com/ideapress/campaign_detail.html">
                                            <img src="https://preview.thememusion.com/ideapress/images/latest-05.jpg" alt="">
                                            <span class="ion-ios-search-strong"></span>
                                        </a>
                                        <div class="campaign-box">
                                            <a href="javascript://" class="category">Technology</a>
                                            <h3><a href="https://preview.thememusion.com/ideapress/campaign_detail.html">Redefine Your VR Experience</a></h3>
                                            <div class="campaign-description">I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot.</div>
                                            <div class="campaign-author">
                                                <a class="author-icon" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/author-02.png" alt=""></a>by <a class="author-name" href="javascript://">Sabato Alterio</a></div>
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
                                <div class="col-lg-4 col-md-6 col-sm-6 col-6 filterinteresting filterpopular">
                                    <div class="campaign-item">
                                        <a class="overlay" href="https://preview.thememusion.com/ideapress/campaign_detail.html">
                                            <img src="https://preview.thememusion.com/ideapress/images/latest-06.jpg" alt="">
                                            <span class="ion-ios-search-strong"></span>
                                        </a>
                                        <div class="campaign-box">
                                            <a href="javascript://" class="category">Design &amp; Art</a>
                                            <h3><a href="https://preview.thememusion.com/ideapress/campaign_detail.html">Bring back Fun House</a></h3>
                                            <div class="campaign-description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</div>
                                            <div class="campaign-author">
                                                <a class="author-icon" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/author-03.png" alt=""></a>by <a class="author-name" href="javascript://">Samino</a></div>
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
                        <div class="latest-button"><a href="javascript://" class="btn-primary">View all Causes</a></div>
                    </div>
                </div>
                <!-- .latest -->
                <div class="blognews">
                    <div class="container">
                        <h2 class="title">From the Journal</h2>
                        <div class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
                        <div class="blognews-content">
                            <div class="row">
                                <div class="col-lg-4">
                                    <article class="post">
                                        <div class="blognews-thumb">
                                            <a class="overlay" href="https://preview.thememusion.com/ideapress/blog_details.html">
                                                <img src="https://preview.thememusion.com/ideapress/images/journal-01.jpg" alt="">
                                                <span class="ion-ios-search-strong"></span>
                                            </a>
                                        </div>
                                        <div class="blognews-info">
                                            <a href="javascript://" class="blognews-cat">Tips & Insights</a>
                                            <h3 class="blognews-title"><a href="javascript://">Create gallery post types as well</a></h3>
                                            <div class="blognews-content">
                                                <p>Always strive for better work. Never stop learning. Have fun a clear plan for a new project or just an idea on a napkin?</p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-lg-4">
                                    <article class="post">
                                        <div class="blognews-thumb">
                                            <a class="overlay" href="https://preview.thememusion.com/ideapress/blog_details.html">
                                                <img src="https://preview.thememusion.com/ideapress/images/journal-02.jpg" alt="">
                                                <span class="ion-ios-search-strong"></span>
                                            </a>
                                        </div>
                                        <div class="blognews-info">
                                            <a href="javascript://" class="blognews-cat">Case Studies</a>
                                            <h3 class="blognews-title"><a href="javascript://">Win a Set of TouchPoints Basic</a></h3>
                                            <div class="blognews-content">
                                                <p>TouchPoints are neuroscientific wearables that are worn on either side of the body for 15 minutes to reduce stress and anxiety.</p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                                <div class="col-lg-4">
                                    <article class="post">
                                        <div class="blognews-thumb">
                                            <a class="overlay" href="https://preview.thememusion.com/ideapress/blog_details.html">
                                                <img src="https://preview.thememusion.com/ideapress/images/journal-03.jpg" alt="">
                                                <span class="ion-ios-search-strong"></span>
                                            </a>
                                        </div>
                                        <div class="blognews-info">
                                            <a href="javascript://" class="blognews-cat">Products</a>
                                            <h3 class="blognews-title"><a href="javascript://">This Smart Eye Mask Could Be The Answer</a></h3>
                                            <div class="blognews-content">
                                                <p>Waking up is hard to do. That’s why this company is making sleep a priority by giving the classic face mask an upgrade.</p>
                                            </div>
                                        </div>
                                    </article>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- .story -->
                <div class="partners">
                    <div class="container">
                        <div class="partners-slider owl-carousel">
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-01.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-02.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-03.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-04.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-05.png" alt=""></a>
                            </div>
                            <div>
                                <a href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/partner-06.png" alt=""></a>
                            </div>
                        </div>
                    </div>
                </div>
                <!-- .partners -->
            </main>
            <!-- .site-main -->

            <Footer />
        </div>
        <!-- #wrapper -->

    </div>
</template>

<script>
/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'
import Slideshow from '@/components/Slideshow.vue'
import StaffPicks from '@/components/StaffPicks.vue'

export default {
    components: {
        Footer,
        Header,
        Slideshow,
        StaffPicks,
    },
}
</script>
