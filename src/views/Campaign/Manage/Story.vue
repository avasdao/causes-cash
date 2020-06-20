<template>
    <div role="tabpanel" class="tab-pane" id="story">
        <div class="start-form">
            <form action="javascript://">
                <div class="field">
                    <label for="uploadfile1">
                        Project Video
                    </label>

                    <span class="label-desc">
                        Have fun – add a video!
                        Projects with a video have a much higher chance of success.
                        For a dose of inspiration, check out the <a href="javascript://">Creator Handbook.</a>
                        Need some help?
                        Visit our <a href="javascript://">Creator FAQ.</a>
                    </span>

                    <div class="list-upload">
                        <div class="file-upload">
                            <div class="upload-bg">
                                <div id="myfileupload1">
                                    <input type="file" id="uploadfile1" name="ImageUpload" onchange="readURL1(this);" accept="video/*" />
                                </div>

                                <div id="thumbbox1">
                                    <img src="images/assets/logo.png" height="695" width="460" alt="Thumb image" id="thumbimage1" />

                                    <a class="removeimg1" href="javascript:"></a>
                                </div>

                                <div id="boxchoice1">
                                    <a href="javascript:" class="choicefile1">
                                        <i class="fa fa-cloud-upload" aria-hidden="true"></i>
                                        Upload Video
                                    </a>

                                    <p></p>
                                </div>

                                <label class="filename1"></label>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="field">
                    <label>Project description</label>

                    <span class="label-desc">
                        Use your project description to share more about what you’re raising funds to do and how you plan to pull it off.
                        It’s up to you to make the case for your project.
                    </span>

                    <div id="editor"></div>
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

                <div class="field">
                    <label for="risks">Risks and challenges</label>

                    <span class="label-desc">
                        What are the risks and challenges that come with completing your project, and how are you qualified to overcome them?
                    </span>

                    <textarea id="risks" cols="30" rows="4"></textarea>
                </div>

                <div class="start-box">
                    <h4>Project FAQs</h4>

                    <p>
                        You can add frequently asked questions to the FAQ tab on your project page once it goes live.
                        <a href="javascript://">Learn more</a>
                    </p>
                </div>

                <input type="submit" class="btn-primary" value="Save & Continue">
            </form>
        </div>
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
