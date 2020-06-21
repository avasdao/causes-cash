<template>
    <div role="tabpanel" class="tab-pane active" id="general">
        <section class="campaign-form form-update">
            <!-- <div class="container"> -->
            <div class="start-form">
                <form action="javascript://">
                    <div class="field">
                        <label for="projecttitle">Project Title</label>

                        <span class="label-desc">
                            Our search looks through words from your project title and blurb, so make them clear and descriptive of what you’re making.
                            Your profile name will be searchable, too.
                        </span>

                        <input type="text" id="projecttitle" value="" maxlength="60">
                    </div>

                    <div class="field">
                        <label for="shortblurb">
                            Short Blurb
                        </label>

                        <span class="label-desc">
                            Give people a sense of what you’re doing.
                            Skip “Help me” and focus on what you’re making.
                        </span>

                        <textarea id="shortblurb" cols="30" rows="4" maxlength="135"></textarea>
                    </div>

                    <div class="field">
                        <label for="field-cat">
                            Category <span>*</span>
                        </label>

                        <span class="label-desc">
                            To help backers find your campaign, select a category that best represents your project.
                        </span>

                        <div class="field-select field-cat">
                            <select id="field-cat">
                                <option selected="selected">Select a category</option>
                                <option value="book">Book</option>
                                <option value="crafts">Crafts</option>
                                <option value="design-art">Design &amp; Art</option>
                                <option value="perfomances">Perfomances</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>

                        <div class="field-select">
                            <select name="s">
                                <option selected="selected">Subcategory (optional)</option>
                                <option value="book">Book</option>
                                <option value="crafts">Crafts</option>
                                <option value="design-art">Design &amp; Art</option>
                                <option value="perfomances">Perfomances</option>
                                <option value="technology">Technology</option>
                            </select>
                        </div>
                    </div>

                    <div class="field">
                        <label for="projectlocation">
                            Project Location
                        </label>

                        <input type="text" id="projectlocation">
                    </div>

                    <div class="field">
                        <label for="funding">
                            Funding Duration
                        </label>

                        <span class="label-desc">
                            Projects with shorter durations have higher success rates.
                            You won’t be able to adjust your duration after you launch.
                        </span>

                        <input type="date" id="funding" value="">
                    </div>
                    <div class="field">
                        <label for="fundinggoal">Funding Goal</label>

                        <span class="label-desc">
                            Community Pledge funding on Causes Cash is all-or-nothing.
                            It’s okay to raise more than your goal, but if your goal isn’t met, no money will be collected.
                            Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees.
                            If your project is successfully funded, the following fees will be collected from your funding total:
                            Causes Cash 5% fee, and payment processing fees (between 3% and 5%).
                            If funding isn’t successful, there are no fees.
                            <a href="javascript://" class="view-fees">View fees breakdown</a>
                        </span>

                        <div class="spopup-bg"></div>

                        <div class="fees-popup start-popup">
                            <div class="spopup-title">
                                <h3>Fees</h3>

                                <div class="spopup-close">
                                    <span class="ion-ios-close-empty"></span>
                                </div>
                            </div>

                            <div class="spopup-content">
                                <p>If your project is successfully funded, the following fees will be collected from your funding total: Ideapress 5% fee, and payment processing fees (between 3% and 5%). If funding isn’t successful, there are no fees.</p>

                                <ul>
                                    <li>
                                        <h4>Ideapress fee</h4>
                                        <div class="fee-desc">
                                            <p>5% of total funds raised </p>
                                        </div>
                                    </li>

                                    <li>
                                        <h4>Payment processing fees</h4>
                                        <div class="fee-desc">
                                            <p>3% + €0.20 per pledge</p>
                                            <p>Pledges under €10 have a discounted micropledge fee of 5% + €0.05 per pledge</p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>

                        <input type="text" value="" id="fundinggoal">
                    </div>

                    <div class="field">
                        <label for="uploadfile">Campaign Image *</label>

                        <span class="label-desc">Upload a square image that represents your campaign. 570 x 350 recommended resolution.</span>

                        <div class="list-upload">
                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload">
                                        <input type="file" id="uploadfile" name="ImageUpload" onchange="readURL(this);" />
                                    </div>

                                    <div id="thumbbox">
                                        <img src="images/assets/logo.png" height="100" width="100" alt="Thumb image" id="thumbimage" />
                                        <a class="removeimg" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice">
                                        <a href="javascript:" class="choicefile"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename"></label>
                                </div>
                            </div>

                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload1">
                                        <input type="file" id="uploadfile1" name="ImageUpload" onchange="readURL1(this);" />
                                    </div>

                                    <div id="thumbbox1">
                                        <img src="images/assets/logo.png" height="100" width="100" alt="Thumb image" id="thumbimage1" />
                                        <a class="removeimg1" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice1">
                                        <a href="javascript:" class="choicefile1"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename1"></label>
                                </div>
                            </div>

                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload2">
                                        <input type="file" id="uploadfile2" name="ImageUpload" onchange="readURL2(this);" />
                                    </div>

                                    <div id="thumbbox2">
                                        <img src="images/assets/logo.png" height="100" width="100" alt="Thumb image" id="thumbimage2" />
                                        <a class="removeimg2" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice2">
                                        <a href="javascript:" class="choicefile2"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename2"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <div class="field">
                        <label for="tag">Tags *</label>
                        <span class="label-desc">Enter up to five keywords that best describe your campaign.</span>
                        <input type="text" id="tag" value="" name="title" placeholder="Enter a few tags for your campaign" />
                    </div>

                    <div class="reminder">
                        <h4>Project Collaborators</h4>

                        <p>
                            Grant your teammates access to help with your project.
                        </p>

                        <a href="javascript://" class="btn-primary">Add collaborators</a>
                    </div>

                    <input type="submit" class="btn-primary" value="Save & Continue">
                </form>
            </div>
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
        $('.view-fees').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().find('.spopup-bg').fadeIn()
			$(this).parent().parent().find('.fees-popup').fadeIn()
		})
		$('.spopup-bg').on('click', function (e) {
			e.preventDefault()
			$(this).fadeOut()
			$(this).parent().find('.fees-popup').fadeOut()
			$(this).parent().find('.item-popup').fadeOut()
		})
		$('.spopup-close').on('click', function (e) {
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
