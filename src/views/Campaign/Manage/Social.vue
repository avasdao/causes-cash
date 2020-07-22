<template>
    <div role="tabpanel" class="tab-pane" id="social">
        <section class="campaign-form form-update">
            <div class="start-form">
                <form action="javascript://">
                    <div class="field">
                        <label for="contactemail">News Article #1</label>

                        <input type="email" id="contactemail" placeholder="Amazing Expose">
                    </div>

                    <div class="field">
                        <span class="label-desc">
                            Enter the account you’d like to use to receive funds if your project is successfully funded.
                            The account should belong to the person or legal entity running this project.
                            Once you launch, this information cannot be changed.
                        </span>

                        <div class="field-radio">
                            <input type="radio" id="individual" name="fund">

                            <label for="individual">Individual</label>
                        </div>

                        <div class="field-radio">
                            <input type="radio" id="legal" name="fund">

                            <label for="legal">Legal entity (company or organization)</label>
                        </div>
                    </div>

                    <div class="field">
                        <label for="uploadfile">
                            Project Image
                        </label>

                        <span class="label-desc">
                            This is the first thing that people will see when they come across your project.
                            Choose an image that’s crisp and text-free.
                            <a href="javascript://">Here are some tips.</a>
                        </span>

                        <div class="list-upload">
                            <div class="file-upload">
                                <div class="upload-bg">
                                    <div id="myfileupload">
                                        <input type="file" id="uploadfile" name="ImageUpload" onchange="readURL(this);" accept="image/*" />
                                    </div>

                                    <div id="thumbbox">
                                        <img src="images/assets/logo.png" height="695" width="460" alt="Thumb image" id="thumbimage" />
                                        <a class="removeimg" href="javascript:"></a>
                                    </div>

                                    <div id="boxchoice">
                                        <a href="javascript:" class="choicefile"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Image</a>
                                        <p></p>
                                    </div>

                                    <label class="filename"></label>
                                </div>
                            </div>
                        </div>
                    </div>

                    <hr />

                    <div class="field">
                        <label for="profilename">Facebook</label>

                        <span class="label-desc">
                            Heads up: Once you launch a project, you cannot make changes to your name on Ideapress.
                        </span>

                        <input type="text" id="profilename">
                    </div>

                    <div class="field">
                        <label for="biography">Frequently Asked Questions (FAQ)</label>

                        <textarea id="biography" cols="30" rows="4"></textarea>
                    </div>

                    <div class="field">
                        <label>Websites</label>

                        <span class="label-desc">
                            Some suggestions: Link to your blog, portfolio, Twitter, Instagram, etc.
                        </span>

                        <input type="text">
                    </div>

                    <div class="start-box">
                        <h4>Request help from the community</h4>

                        <p>
                            List the skills, resources, or expertise from others that could help enhance your project.
                            If someone can contribute, they can start a dialogue directly from your project page.
                        </p>

                        <div class="field">
                            <label for="projectneed">
                                Project need (optional)
                            </label>

                            <textarea id="projectneed" cols="30" rows="3" placeholder="Painting the Sistine Chapel will require extravagant but cost-effective colors. Are you a color mixologist who'd like to help?"></textarea>
                        </div>

                        <div class="field">
                            <label for="projectneed1">
                                Project need (optional)
                            </label>

                            <textarea id="projectneed1" cols="30" rows="3" placeholder="Looking for an advanced belayer to hoist us up 68 feet. Otherwise, we’ll have to resort to rickety scaffolding and painting on our backs!"></textarea>
                        </div>

                        <div class="field">
                            <label for="projectneed2">
                                Project need (optional)
                            </label>

                            <textarea id="projectneed2" cols="30" rows="3" placeholder="Do you have experience with image projection onto rounded, uneven surfaces? Please get in touch!"></textarea>
                        </div>
                    </div>

                </form>
            </div>
        </section>
    </div>
</template>

<script>
export default {
    components: {
        //
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
