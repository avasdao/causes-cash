<template>
    <div role="tabpanel" class="tab-pane" id="calc">
        <section class="campaign-form form-update">
            <form action="javascript://">
                <h1>Accounting Department</h1>
                <hr />

                <div class="row mt-3">
                    <div class="col">
                        <p class="under-construction mt-3">
                            Oops! We're still working on this area.
                        </p>

                        <p class="under-construction mt-3">
                            Want to help us get this platform ready ASAP?
                        </p>

                        <p class="under-construction my-3">
                            Learn how your ❤️ and support Causes Cash.
                        </p>

                        <button class="btn btn-block btn-outline-success" @click="supportCauses">
                            Support Causes Cash
                        </button>
                    </div>

                    <div class="col">
                        <!-- This area is still under development. -->
                        <!-- <img class="under-construction" src="https://i.imgur.com/8nvqTcU.png" /> -->
                        <img class="under-construction rounded" src="https://i.imgur.com/1yAHZ69.png" />
                    </div>
                </div>

                <!-- <div id="itemform">
                    <div class="start-form">
                        <div class="field">
                            <label for="rewardtitle">
                                Title
                            </label>

                            <input type="text" id="rewardtitle" value="" required="">
                        </div>

                        <div class="field">
                            <label for="pledge">
                                Pledge amount
                            </label>

                            <input type="text" id="pledge" value="" required="">
                        </div>

                        <div class="field">
                            <label for="rewarddesc">
                                Description
                            </label>

                            <textarea id="rewarddesc" cols="30" rows="4" required=""></textarea>
                        </div>

                        <div class="field">
                            <label for="item">Item</label>

                            <table class="item-table">
                                <thead>
                                    <tr>
                                        <th>Name</th>
                                        <th>Number</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    <tr>
                                        <td>ABC</td>
                                        <td>
                                            <input type="number" id="item" min="1" value="1">
                                        </td>
                                    </tr>
                                </tbody>
                            </table>

                            <a href="javascript://" class="add-item btn-primary">Add an item</a>

                            <div class="spopup-bg"></div>

                            <div class="item-popup start-popup">
                                <div class="spopup-title">
                                    <h3>Add a reward item</h3>

                                    <div class="spopup-close">
                                        <span class="ion-ios-close-empty"></span>
                                    </div>
                                </div>

                                <div class="spopup-desc">Backers will see the items listed when pledging. Questions about how this works? <a href="javascript://">Visit our FAQ.</a></div>

                                <div class="spopup-content">
                                    <div class="field">
                                        <label for="rewardname">
                                            Name (required)
                                        </label>

                                        <input type="text" id="rewardname" placeholder="Examples: Album download, Screenplay, etc.">
                                    </div>

                                    <div class="field field-checkbox">
                                        <input type="checkbox" id="citem">

                                        <label for="citem">
                                            <span></span>
                                            <strong>This is a digital item.</strong>
                                            Think album downloads, e-books, videos, or anything that’s delivered online.
                                        </label>
                                    </div>

                                    <a href="javascript://" class="btn-primary">Create Item</a>

                                    <a href="javascript://" class="btn item-cancel">Cancel</a>
                                </div>
                            </div>
                        </div>

                        <div class="field">
                            <label for="estimated">
                                Estimated delivery
                            </label>

                            <input type="date" id="estimated" value="">
                        </div>

                        <div class="field">
                            <label for="shipping">
                                Shipping details
                            </label>

                            <div class="field-select">
                                <select name="s" id="shipping">
                                    <option value="">Select an option</option>
                                    <option value="no">No shipping involved</option>
                                    <option value="restricted">Only ships to certain countries</option>
                                    <option value="unrestricted">Ships anywhere in the world</option>
                                </select>
                            </div>
                        </div>

                        <div class="field">
                            <label for="limit-avai">Limit availability</label>

                            <div class="field-checkbox" id="limit">
                                <input type="checkbox" id="limit-avai">

                                <label for="limit-avai">
                                    <span></span>
                                    Enable reward limit
                                </label>
                            </div>
                        </div>
                    </div>
                </div>

                <div id="import"></div>

                <a href="javascript://" class="add-reward">Add a new reward</a>

                <div class="field">
                    <label for="ccat">Campaign Type *</label>

                    <span class="label-desc">To help backers find your campaign, select a category that best represents your project.</span>

                    <div class="field-select">
                        <select name="s" id="ccat">
                            <option value="">Select a Type</option>
                            <option value="">Adoption</option>
                            <option value="">Community</option>
                            <option value="">DApps</option>
                        </select>
                    </div>
                </div>

                <div class="field">
                    <label for="cduration">Campaign Duration *</label>
                    <span class="label-desc">You can run a campaign for any number of days, with a 60 day duration maximum.</span>
                    <input type="text" id="cduration" value="" name="title" placeholder="60 days" />
                </div>

                <input type="submit" class="btn-primary" value="Save & Continue"> -->
            </form>
        </section>
    </div>
</template>

<script>
export default {
    components: {
        //
    },
    methods: {
        supportCauses() {
            this.$router.push('/@BCHPlease/causes-cash-8ab5c2fc')
        }
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
p.under-construction {
    font-size: 1.4em;
}
</style>
