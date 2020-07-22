<template>
    <div role="tabpanel" class="tab-pane" id="funds">
        <section class="campaign-form form-update">
            <form action="javascript://">
                <div id="itemform">
                    <div class="start-form">
                        <div class="reward-top">
                            <h2 class="reward-title">
                                Financial
                            </h2>

                            <a href="javascript://" class="reward-delete">
                                Delete Reward
                            </a>
                        </div>

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

                <input type="submit" class="btn-primary" value="Save & Continue">
            </form>
        </section>
    </div>
</template>

<script>
/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    mounted: function () {
        $('.add-item').on('click', function (e) {
			e.preventDefault()
			$(this).parent().find('.spopup-bg').fadeIn()
			$(this).parent().find('.item-popup').fadeIn()
		})
        $('.item-cancel').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().fadeOut()
			$(this).parent().parent().parent().find('.spopup-bg').fadeOut()
		})
    },
}
</script>

<style scoped>
/*  */
</style>
