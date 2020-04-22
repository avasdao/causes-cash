<template>
    <div class="project-love">
        <div class="container">
            <div class="row">
                <div class="col-lg-10 col-sm-9 col-9">
                    <div class="project-love-title">
                        <h2 class="title left-title">Projects We Love</h2>

                        <div class="description left-description">
                            We hate to play favorites, but these are the projects that our staff picked as notable standouts.
                        </div>
                    </div>

                    <ul class="project-love-slider">
                        <li v-for="cause of causes" :key="cause.id">
                            <div class="project-love-item clearfix">
                                <router-link to="/details" class="project-love-image">
                                    <img :src="cause.imgUrl" alt="">
                                </router-link>

                                <div class="project-love-item-content project-love-box">
                                    <router-link to="/discover" class="category category-link">
                                        {{cause.category}}
                                    </router-link>

                                    <h3>
                                        <router-link to="/details">
                                            {{cause.title}}
                                        </router-link>
                                    </h3>

                                    <div class="project-love-description">
                                        {{cause.description}}
                                    </div>

                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://">
                                                <img src="@/assets/img/staff-picks-author.png" alt="">
                                            </a>
                                            by
                                            <a class="author-name" href="javascript://">
                                                {{cause.authorName}}
                                            </a>
                                        </div>

                                        <div class="author-address">
                                            <span class="ion-location"></span>
                                            {{cause.location}}
                                        </div>
                                    </div>

                                    <div class="process">
                                        <div class="raised"><span></span></div>

                                        <div class="process-info">
                                            <div class="process-pledged">
                                                <span>{{cause.pledged}}</span>pledged
                                            </div>

                                            <div class="process-funded">
                                                <span>{{cause.funded}}</span>funded
                                            </div>

                                            <div class="process-time">
                                                <span>{{cause.backers}}</span>backers
                                            </div>

                                            <div class="process-time">
                                                <span>{{cause.duration}}</span>days ago
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </li>




                        <li>
                            <div class="project-love-item clearfix">
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Crafts</a>
                                    <h3><a href="campaign_detail.html">The Oreous Pillow</a></h3>
                                    <div class="project-love-description">A watch designed to be an heirloom to be passed down to the next generation.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Design & Art</a>
                                    <h3><a href="campaign_detail.html">Bring back Fun House</a></h3>
                                    <div class="project-love-description">Far far away, behind the word mountains, far from the countries Vokalia and Consonantia.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Fashion</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Film & Video</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Food</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Music</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Games</a>
                                    <h3><a href="campaign_detail.html">Redefine Your VR Experience</a></h3>
                                    <div class="project-love-description">I enjoy with my whole heart. I am alone, and feel the charm of existence in this spot.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Journalism</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Performances</a>
                                    <h3><a href="campaign_detail.html">Uncompromising Ski Gear</a></h3>
                                    <div class="project-love-description">The Orsden Slope Pants don't compromise delivering performance, fit, and value directly to </div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Publishing</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Technology</a>
                                    <h3><a href="campaign_detail.html">Smart Wallet with Solar Charge</a></h3>
                                    <div class="project-love-description">A wonderful serenity has taken possession of my entire soul, like these sweet mornings.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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
                                <a class="project-love-image" href="campaign_detail.html"><img src="images/project-love.jpg" alt=""></a>
                                <div class="project-love-item-content project-love-box">
                                    <a href="javascript://" class="category">Theater</a>
                                    <h3><a href="campaign_detail.html">Bike as a Mobile Art Gallery</a></h3>
                                    <div class="project-love-description">He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.</div>
                                    <div class="project-love-author">
                                        <div class="author-profile">
                                            <a class="author-avatar" href="javascript://"><img src="images/staff-picks-author.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
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

                <Categories />
            </div>
        </div>
    </div><!-- .project-love -->
</template>

<script>
/* Import components. */
// import BitcoinCash from '@/components/StaffPicks/BitcoinCash.vue'
import Categories from '@/components/StaffPicks/Categories.vue'
// import Comics from '@/components/StaffPicks/Comics.vue'

/* Import icons. */
import '@/compiled-icons/bitcoin-cash-logo-text'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        // BitcoinCash,
        Categories,
        // Comics,
    },
    data: () => {
        return {
            causes: [],
        }
    },
    methods: {
        //
    },
    created: function () {
        /* Adoption. */
        this.causes.push({
            id: '5f40508f-c083-4c3b-83bf-0e8c00641daa',
            title: `The Everlast Notebook`,
            category: 'Adoption',
            description: `One smart, reusable notebook to last the rest of your life? That's not magic, that's the Everlast.`,
            authorName: `Andrew Noah`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/liW0dGR.jpg',
            pledged: '$5000',
            funded: '41%',
            backers: 37,
            duration: 23,
        })

        /* Bitcoin Cash. */
        this.causes.push({
            id: '6dd01065-a6d3-410c-9bdb-02d76e6ca0f5',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/gE9MLZB.jpg',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Comics. */
        this.causes.push({
            id: '8ed37b3e-69ba-4ae7-a01e-6ecee5eb74e2',
            title: `The Oreous Pillow`,
            category: 'Comics',
            description: `A watch designed to be an heirloom to be passed down to the next generation.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/tN5US0M.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Design & Art. */
        this.causes.push({
            id: '5b67dc8e-181e-4ed4-b7d4-d5ab5619a175',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/KAF3EdH.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Fashion. */
        this.causes.push({
            id: '6d43d008-b148-44db-bede-28c4c05ad744',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/q9BpqJY.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Film & Video. */
        this.causes.push({
            id: '04053df1-581a-412d-92d4-fcc6e720c27f',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/4zWBLfP.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Food. */
        this.causes.push({
            id: 'eec926cb-032c-45cb-97c3-b6ce6ceb819f',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/v65KhXv.jpg',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Fun & Games. */
        this.causes.push({
            id: '45be0df4-5a9e-4088-a3d9-52c6e99fff12',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/BKsh6tn.jpg',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Music. */
        this.causes.push({
            id: 'd4aa6c37-bfbe-42f7-802c-139b535b57f0',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/Qi1syth.jpg',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Infrastructure. */
        this.causes.push({
            id: 'b3668bc5-7cc9-4a9c-907e-f837f2d17747',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/lpuQ8k6.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Privacy. */
        this.causes.push({
            id: '180e2149-0b51-445f-9122-07dd70f04162',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/fMKOjYp.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Publishing. */
        this.causes.push({
            id: '894f9cf1-21d1-4914-858b-44c7d3cfe560',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/rTtwVzt.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Security. */
        this.causes.push({
            id: '6203f72c-334f-4c8f-94ec-443db3869688',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/Ndh1UrO.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

        /* Technology. */
        this.causes.push({
            id: 'e61f7109-a853-4087-80c2-93e037309d77',
            title: `Bike as a Mobile Art Gallery`,
            category: 'Bitcoin Cash',
            description: `He lay on his armour-like back, and if he lifted his head a little he could see his brown belly, slightly domed and divided by arches into stiff sections. The bedding was hardly able to cover it and seemed ready to slide off any moment.`,
            authorName: `Satoshi Nakamoto`,
            location: `Melbourne, Victoria, AU`,
            imgUrl: 'https://i.imgur.com/f4xU2nb.png',
            pledged: '10,000',
            funded: '81%',
            backers: 37,
            duration: 23,
        })

    },
    mounted: function () {
        $('.project-love-slider').bxSlider({
            pagerCustom: '#bx-pager',
            // mode: 'fade',
            mode: 'vertical',
            controls: false,
            startSlide: 1,
            touchEnabled : (navigator.maxTouchPoints > 0),
        })

    },
}
</script>

<style scoped>
.category-btn, .category-link {
    float: right;
}
</style>
