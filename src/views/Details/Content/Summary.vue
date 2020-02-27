<template>
    <div class="campaign-box">
        <a href="javascript://" class="category">Crafts</a>

        <h3>The Oreous Pillow</h3>

        <div class="campaign-description">
            <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                Etiam tempor, ipsum ut mattis commodo, eros justo feugiat ante, sed tristique erat urna et nibh.
                Donec nec rhoncus mi, non laoreet tortor.
                Proin ullamcorper ipsum interdum tellus scelerisque, a ultricies urna vehicula.
                Mauris faucibus metus quis commodo pharetra.
            </p>
        </div>

        <div class="campaign-author clearfix">
            <div class="author-profile">
                <a class="author-icon" href="javascript://"><img src="@/assets/img/author-01.png" alt=""></a>by <a class="author-name" href="javascript://">Andrew Noah</a>
            </div>

            <div class="author-address">
                <span class="ion-location"></span>
                Melbourne, Victoria, AU
            </div>
        </div>

        <div class="process">
            <div class="raised">
                <span style="width: 262px;"></span>
            </div>

            <div class="process-info">
                <div class="process-funded"><span>$10000</span>funding goal</div>
                <div class="process-pledged"><span>$8100</span>pledged</div>
                <div class="process-time"><span>37</span>backers</div>
                <div class="process-time"><span>23</span>days ago</div>
            </div>
        </div>

        <div class="button">
            <form action="javascript://" id="priceForm" class="campaign-price quantity">
                <input type="number" value="1" min="0" name="s" placeholder="">
                <button class="btn-primary" type="submit">Back this Campaign</button>
            </form>

            <a href="javascript://" class="btn-secondary">
                <i class="fa fa-heart" aria-hidden="true"></i>
                Remind me
            </a>
        </div>

        <div class="share">
            <p>Share this project</p>

            <ul>
                <li class="share-facebook"><a href="javascript://"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                <li class="share-twitter"><a href="javascript://"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                <li class="share-google-plus"><a href="javascript://"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                <li class="share-linkedin"><a href="javascript://"><i class="fa fa-linkedin" aria-hidden="true"></i></a></li>
                <li class="share-code"><a href="javascript://"><i class="fa fa-code" aria-hidden="true"></i></a></li>
            </ul>
        </div>
    </div>
</template>

<script>
/* Import components. */
// import Name from '@/components/Name.vue'

/* Import icons. */
// import '@/compiled-icons/<icon-name>'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
// const $ = window.jQuery

export default {
    components: {
        //
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
/*  */
</style>
