<template>
    <div role="tabpanel" class="tab-pane" id="social">
        <div class="start-form">
            <form action="javascript://">
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

                <!-- <div class="field">
                    <label for="uploadfile2">Profile photo</label>

                    <span class="label-desc">JPEG, PNG, GIF, or BMP • 50MB file limit</span>

                    <div class="list-upload">
                        <div class="file-upload">
                            <div class="upload-bg">
                                <div id="myfileupload2">
                                    <input type="file" id="uploadfile2" name="ImageUpload" onchange="readURL2(this);" accept="image/*" />
                                </div>

                                <div id="thumbbox2">
                                    <img src="images/assets/logo.png" height="695" width="460" alt="Thumb image" id="thumbimage2" />
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
                </div> -->

                <div class="field">
                    <label for="profilename">Name</label>

                    <span class="label-desc">
                        Heads up: Once you launch a project, you cannot make changes to your name on Ideapress.
                    </span>

                    <input type="text" id="profilename">
                </div>

                <div class="field field-a">
                    <label>Facebook Connect</label>

                    <a href="javascript://" class="connect-fb">Connect to Facebook</a>

                    <div class="fb-content">
                        Connected to Facebook - <a href="javascript://">Disconnect</a>
                    </div>
                </div>

                <div class="field">
                    <label for="biography">Biography</label>

                    <textarea id="biography" cols="30" rows="4"></textarea>
                </div>

                <div class="field">
                    <label for="location">Your location</label>

                    <input type="text" id="location">
                </div>

                <div class="field">
                    <label>Websites</label>

                    <span class="label-desc">
                        Some suggestions: Link to your blog, portfolio, Twitter, Instagram, etc.
                    </span>

                    <input type="text">
                </div>

                <div class="field">
                    <label for="google">
                        Google Analytics
                    </label>

                    <span class="label-desc">
                        Enter your tracking ID to enable Google Analytics for your project.
                        <a href="javascript://">Check out our FAQ for more info.</a>
                    </span>

                    <input type="text" id="google" placeholder="UA-XXXXXXXX-X">
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
