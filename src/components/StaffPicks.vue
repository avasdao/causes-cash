<template>
    <div class="project-love">
        <div class="container">
            <h2 class="title">Projects We Love</h2>
            <div class="description">Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore.</div>
            <div class="tab-menu tab-row">
                <ul id="bx-pager" class="menu-category">
                    <li class="mc-option active" data-tab="bitcoin-cash"><a href="javascript://" data-slide-index="0">Bitcoin Cash</a></li>
                    <li class="mc-option" data-tab="pp1"><a href="javascript://" data-slide-index="1">Comics</a></li>
                    <li class="mc-option" data-tab="pp2"><a href="javascript://" data-slide-index="2">Crafts</a></li>
                    <li class="mc-option" data-tab="pp3"><a href="javascript://" data-slide-index="3">Design &amp; Art</a></li>
                    <li class="mc-option" data-tab="pp4"><a href="javascript://" data-slide-index="4">Fashion</a></li>
                    <li class="mc-option" data-tab="pp5"><a href="javascript://" data-slide-index="5">Film & Video</a></li>
                    <li class="mc-option" data-tab="pp7"><a href="javascript://" data-slide-index="7">Music</a></li>
                    <li class="mc-option" data-tab="pp8"><a href="javascript://" data-slide-index="8">Games</a></li>
                    <li class="mc-option" data-tab="pp9"><a href="javascript://" data-slide-index="9">Performances</a></li>
                    <li class="mc-option" data-tab="pp10"><a href="javascript://" data-slide-index="10">Publishing</a></li>
                    <li class="cat-more"><a href="javascript://">More</a></li>
                </ul>
            </div>
            <div class="row">
                <div class="col-lg-4">
                    <div class="popular-project">
                        <div id="bitcoin-cash" class="pp-item active">
                            <svgicon class="" icon="bitcoin-cash-logo-text" width="60" height="60" :fill="false" :original="true"></svgicon>
                            <h4>29+ Bitcoin Cash Projects</h4>
                        </div>
                        <div id="pp1" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/manga-62.svg" alt="">
                            <h4>290+ Project Comics</h4>
                        </div>
                        <div id="pp2" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/needle.svg" alt="">
                            <h4>290+ Project Crafts</h4>
                        </div>
                        <div id="pp3" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/responsive.svg" alt="">
                            <h4>290+ Project Design & Art</h4>
                        </div>
                        <div id="pp4" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/dress-woman.svg" alt="">
                            <h4>290+ Project Fashion</h4>
                        </div>
                        <div id="pp5" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/video-66.svg" alt="">
                            <h4>290+ Project Film & Video</h4>
                        </div>
                        <div id="pp7" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/note-04.svg" alt="">
                            <h4>290+ Project Music</h4>
                        </div>
                        <div id="pp8" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/controller-3.svg" alt="">
                            <h4>290+ Project Games</h4>
                        </div>
                        <div id="pp9" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/guitar.svg" alt="">
                            <h4>290+ Project Performances</h4>
                        </div>
                        <div id="pp10" class="pp-item">
                            <img src="https://preview.thememusion.com/ideapress/images/assets/printer.svg" alt="">
                            <h4>290+ Project Publishing</h4>
                        </div>

                        <p>
                            Discover projects just for you and get great recommendations when you select your interests.
                        </p>

                        <router-link to="/details" class="btn btn-lg btn-primary">Contribute Now!</router-link>
                        <!-- <a href="javascript://" class="btn-primary">Contribute Now!</a> -->
                    </div>
                </div>

                <div class="col-lg-8">
                    <ul class="project-love-slider pls-col">

                        <BitcoinCash />
                        <Comics />

                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-02.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Crafts</a>
                                    <h3><a href="javascript://">The Oreous Pillow</a></h3>
                                    <div class="project-love-description">A watch designed to be an heirloom to be passed down to the next generation.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-03.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Design & Art</a>
                                    <h3><a href="javascript://">Bring back Fun House</a></h3>
                                    <div class="project-love-description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-01.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Fashion</a>
                                    <h3><a href="javascript://">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-02.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Film & Video</a>
                                    <h3><a href="javascript://">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-01.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Music</a>
                                    <h3><a href="javascript://">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-02.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Games</a>
                                    <h3><a href="javascript://">Redefine Your VR Experience</a></h3>
                                    <div class="project-love-description">I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-03.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Performances</a>
                                    <h3><a href="javascript://">Uncompromising Ski Gear</a></h3>
                                    <div class="project-love-description">The Orsden Slope Pants don't compromise delivering performance, fit, and value directly to </div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/journal-01.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Publishing</a>
                                    <h3><a href="javascript://">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="https://preview.thememusion.com/ideapress/images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
                                        </div>
                                        <div class="author-address"><span class="ion-location"></span>Melbourne, Victoria, AU</div>
                                    </div>
                                    <div class="process">
                                        <div class="raised"><span></span></div>
                                        <div class="process-info">
                                            <div class="process-pledged"><span>$10000</span>pledged</div>
                                            <div class="process-funded"><span>81%</span>funded</div>
                                            <div class="process-time"><span>37</span>backers</div>
                                            <div class="process-time"><span>23</span>days ago</div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
/* Import components. */
import BitcoinCash from '@/components/StaffPicks/BitcoinCash.vue'
import Comics from '@/components/StaffPicks/Comics.vue'

/* Import icons. */
import '@/compiled-icons/bitcoin-cash-logo-text'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        BitcoinCash,
        Comics,
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
.category-icon {
    margin-top: -10px;
    /* width: 60px; */
    /* height: 60px; */
}
</style>
