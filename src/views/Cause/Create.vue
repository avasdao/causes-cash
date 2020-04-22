<template>
    <main class="faq">
        <Header />

        <div class="page-title background-page">
			<div class="container">
				<h1>Create a New Cause</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Create a New Cause</li>
					</ul>
				</div>
			</div>
		</div>

        <section>
            <div class="container">
                <div class="design-process-section" id="process-tab">
                    <ul class="nav nav-tabs process-model more-icon-preocess" role="tablist">
                        <li>
                            <a href="javascript://">
                                <span><img src="images/assets/log-out.svg" alt=""></span>
                                <p>Exit Editor</p>
                            </a>
                        </li>
                        <li data-tab="basics" class="pm-option active">
                            <a href="javascript://">
                                <span><img src="images/assets/single-folded.svg" alt=""></span>
                                <p>Basics</p>
                            </a>
                        </li>
                        <li data-tab="rewards" class="pm-option">
                            <a href="javascript://">
                                <span><img src="images/assets/award.svg" alt=""></span>
                                <p>Rewards</p>
                            </a>
                        </li>
                        <li data-tab="story" class="pm-option">
                            <a href="javascript://">
                                <span><img src="images/assets/book-open.svg" alt=""></span>
                                <p>Story</p>
                            </a>
                        </li>
                        <li data-tab="about" class="pm-option">
                            <a href="javascript://">
                                <span><img src="images/assets/alert-circle-i.svg" alt=""></span>
                                <p>About</p>
                            </a>
                        </li>
                        <li data-tab="account" class="pm-option">
                            <a href="javascript://">
                                <span><img src="images/assets/single-02.svg" alt=""></span>
                                <p>Account</p>
                            </a>
                        </li>
                        <li>
                            <a href="javascript://">
                                <span><img src="images/assets/eye-17.svg" alt=""></span>
                                <p>Preview</p>
                            </a>
                        </li>
                    </ul>

                    <div class="tab-content">
                        <div role="tabpanel" class="tab-pane active" id="basics">
                            <div class="start-form">
                                <form action="javascript://">
                                    <div class="field">
                                        <label for="uploadfile">Project Image</label>
                                        <span class="label-desc">This is the first thing that people will see when they come across your project. Choose an image that’s crisp and text-free. <a href="javascript://">Here are some tips.</a></span>
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
                                    <div class="field">
                                        <label for="projecttitle">Project Title</label>
                                        <span class="label-desc">Our search looks through words from your project title and blurb, so make them clear and descriptive of what you’re making. Your profile name will be searchable, too.</span>
                                        <input type="text" id="projecttitle" value="" maxlength="60">
                                    </div>
                                    <div class="field">
                                        <label for="shortblurb">Short Blurb</label>
                                        <span class="label-desc">Give people a sense of what you’re doing. Skip “Help me” and focus on what you’re making.</span>
                                        <textarea id="shortblurb" cols="30" rows="4" maxlength="135"></textarea>
                                    </div>
                                    <div class="field">
                                        <label for="field-cat">Category <span>*</span></label>
                                        <span class="label-desc">To help backers find your campaign, select a category that best represents your project.</span>
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
                                        <label for="projectlocation">Project Location</label>
                                        <input type="text" id="projectlocation">
                                    </div>
                                    <div class="field">
                                        <label for="funding">Funding Duration</label>
                                        <span class="label-desc">Projects with shorter durations have higher success rates. You won’t be able to adjust your duration after you launch.</span>
                                        <input type="date" id="funding" value="">
                                    </div>
                                    <div class="field">
                                        <label for="fundinggoal">Funding Goal</label>
                                        <span class="label-desc">Funding on Ideapress is all-or-nothing. It’s okay to raise more than your goal, but if your goal isn’t met, no money will be collected. Your goal should reflect the minimum amount of funds you need to complete your project and send out rewards, and include a buffer for payments processing fees. If your project is successfully funded, the following fees will be collected from your funding total: Ideapress 5% fee, and payment processing fees (between 3% and 5%). If funding isn’t successful, there are no fees. <a href="javascript://" class="view-fees">View fees breakdown</a></span>
                                        <div class="spopup-bg"></div>
                                        <div class="fees-popup start-popup">
                                            <div class="spopup-title">
                                                <h3>Fees</h3>
                                                <div class="spopup-close"><span class="ion-ios-close-empty"></span></div>
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
                                    <div class="reminder">
                                        <h4>Project Collaborators</h4>
                                        <p>Grant your teammates access to help with your project.</p>
                                        <a href="javascript://" class="btn-primary">Add collaborators</a>
                                    </div>
                                    <input type="submit" class="btn-primary" value="Save & Continue">
                                </form>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="rewards">
                            <form action="javascript://">
                                <div id="itemform">
                                    <div class="start-form">
                                        <div class="reward-top">
                                            <h2 class="reward-title">Reward #0</h2>
                                            <a href="javascript://" class="reward-delete">Delete Reward</a>
                                        </div>
                                        <div class="field">
                                            <label for="rewardtitle">Title</label>
                                            <input type="text" id="rewardtitle" value="" required="">
                                        </div>
                                        <div class="field">
                                            <label for="pledge">Pledge amount</label>
                                            <input type="text" id="pledge" value="" required="">
                                        </div>
                                        <div class="field">
                                            <label for="rewarddesc">Description</label>
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
                                                    <div class="spopup-close"><span class="ion-ios-close-empty"></span></div>
                                                </div>
                                                <div class="spopup-desc">Backers will see the items listed when pledging. Questions about how this works? <a href="javascript://">Visit our FAQ.</a></div>
                                                <div class="spopup-content">
                                                    <div class="field">
                                                        <label for="rewardname">Name (required)</label>
                                                        <input type="text" id="rewardname" placeholder="Examples: Album download, Screenplay, etc.">
                                                    </div>
                                                    <div class="field field-checkbox">
                                                        <input type="checkbox" id="citem">
                                                        <label for="citem"><span></span><strong>This is a digital item.</strong>Think album downloads, e-books, videos, or anything that’s delivered online.</label>
                                                    </div>
                                                    <a href="javascript://" class="btn-primary">Create Item</a>
                                                    <a href="javascript://" class="btn item-cancel">Cancel</a>
                                                </div>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label for="estimated">Estimated delivery</label>
                                            <input type="date" id="estimated" value="">
                                        </div>
                                        <div class="field">
                                            <label for="shipping">Shipping details</label>
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
                                                <label for="limit-avai"><span></span>Enable reward limit </label>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div id="import"></div>
                                <a href="javascript://" class="add-reward">Add a new reward</a>
                                <input type="submit" class="btn-primary" value="Save & Continue">
                            </form>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="story">
                            <div class="start-form">
                                <form action="javascript://">
                                    <div class="field">
                                        <label for="uploadfile1">Project Video</label>
                                        <span class="label-desc">Have fun – add a video! Projects with a video have a much higher chance of success. For a dose of inspiration, check out the <a href="javascript://">Creator Handbook.</a> Need some help? Visit our <a href="javascript://">Creator FAQ.</a> </span>
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
                                                        <a href="javascript:" class="choicefile1"><i class="fa fa-cloud-upload" aria-hidden="true"></i> Upload Video</a>
                                                        <p></p>
                                                    </div>
                                                    <label class="filename1"></label>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label>Project description</label>
                                        <span class="label-desc">Use your project description to share more about what you’re raising funds to do and how you plan to pull it off. It’s up to you to make the case for your project.</span>
                                        <div id="editor"></div>
                                    </div>
                                    <div class="start-box">
                                        <h4>Request help from the community</h4>
                                        <p>List the skills, resources, or expertise from others that could help enhance your project. If someone can contribute, they can start a dialogue directly from your project page.</p>
                                        <div class="field">
                                            <label for="projectneed">Project need (optional)</label>
                                            <textarea id="projectneed" cols="30" rows="3" placeholder="Painting the Sistine Chapel will require extravagant but cost-effective colors. Are you a color mixologist who'd like to help?"></textarea>
                                        </div>
                                        <div class="field">
                                            <label for="projectneed1">Project need (optional)</label>
                                            <textarea id="projectneed1" cols="30" rows="3" placeholder="Looking for an advanced belayer to hoist us up 68 feet. Otherwise, we’ll have to resort to rickety scaffolding and painting on our backs!"></textarea>
                                        </div>
                                        <div class="field">
                                            <label for="projectneed2">Project need (optional)</label>
                                            <textarea id="projectneed2" cols="30" rows="3" placeholder="Do you have experience with image projection onto rounded, uneven surfaces? Please get in touch!"></textarea>
                                        </div>
                                    </div>
                                    <div class="field">
                                        <label for="risks">Risks and challenges</label>
                                        <span class="label-desc"> What are the risks and challenges that come with completing your project, and how are you qualified to overcome them? </span>
                                        <textarea id="risks" cols="30" rows="4"></textarea>
                                    </div>
                                    <div class="start-box">
                                        <h4>Project FAQs</h4>
                                        <p>You can add frequently asked questions to the FAQ tab on your project page once it goes live. <a href="javascript://">Learn more</a></p>
                                    </div>
                                    <input type="submit" class="btn-primary" value="Save & Continue">
                                </form>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="about">
                            <div class="start-form">
                                <form action="javascript://">
                                    <div class="field">
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
                                    </div>
                                    <div class="field">
                                        <label for="profilename">Name</label>
                                        <span class="label-desc">Heads up: Once you launch a project, you cannot make changes to your name on Ideapress.</span>
                                        <input type="text" id="profilename">
                                    </div>
                                    <div class="field field-a">
                                        <label>Facebook Connect</label>
                                        <a href="javascript://" class="connect-fb">Connect to Facebook</a>
                                        <div class="fb-content">Connected to Facebook - <a href="javascript://">Disconnect</a></div>
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
                                        <span class="label-desc">Some suggestions: Link to your blog, portfolio, Twitter, Instagram, etc.</span>
                                        <input type="text">
                                    </div>
                                    <div class="field">
                                        <label for="google">Google Analytics</label>
                                        <span class="label-desc">Enter your tracking ID to enable Google Analytics for your project. <a href="javascript://">Check out our FAQ for more info.</a></span>
                                        <input type="text" id="google" placeholder="UA-XXXXXXXX-X">
                                    </div>
                                    <input type="submit" class="btn-primary" value="Save & Continue">
                                </form>
                            </div>
                        </div>
                        <div role="tabpanel" class="tab-pane" id="account">
                            <div class="start-form">
                                <form action="javascript://">
                                    <div class="field">
                                        <label for="contactemail">Contact details</label>
                                        <input type="email" id="contactemail">
                                    </div>
                                    <div class="field">
                                        <label for="individual">Funds recipient</label>
                                        <span class="label-desc">Enter the account you’d like to use to receive funds if your project is successfully funded. The account should belong to the person or legal entity running this project. Once you launch, this information cannot be changed. </span>
                                        <div class="field-radio">
                                            <input type="radio" id="individual" name="fund">
                                            <label for="individual">Individual</label>
                                        </div>
                                        <div class="field-radio">
                                            <input type="radio" id="legal" name="fund">
                                            <label for="legal">Legal entity (company or organization)</label>
                                        </div>
                                    </div>
                                    <div class="start-box">
                                        <h4>Identity verification</h4>
                                        <p> Please verify your identity with your legal name and details (no nicknames or abbreviations). If you’re running this project as a legal entity, a legal representative of the organization should complete this section. </p>
                                        <p><strong>Note:</strong> This name will be displayed publicly on your creator bio. </p>
                                        <div class="field">
                                            <label for="fname">First name</label>
                                            <input type="text" id="fname">
                                        </div>
                                        <div class="field">
                                            <label for="lname">Last name</label>
                                            <input type="text" id="lname">
                                        </div>
                                        <div class="field">
                                            <label for="birthday">Birthday</label>
                                            <input type="date" id="birthday">
                                        </div>
                                        <div class="field">
                                            <label for="address">Address</label>
                                            <input type="text" id="address">
                                        </div>
                                        <div class="field">
                                            <label for="city">City</label>
                                            <input type="text" id="city">
                                        </div>
                                        <div class="field">
                                            <label>Country:</label>
                                            <div class="field-select">
                                                <select>
                                                    <option value="">Select Your Country</option>
                                                    <option value="AF">Afghanistan</option>
                                                    <option value="AX">Åland Islands</option>
                                                    <option value="AL">Albania</option>
                                                    <option value="DZ">Algeria</option>
                                                    <option value="AS">American Samoa</option>
                                                    <option value="AD">Andorra</option>
                                                    <option value="AO">Angola</option>
                                                    <option value="AI">Anguilla</option>
                                                    <option value="AQ">Antarctica</option>
                                                    <option value="AG">Antigua and Barbuda</option>
                                                    <option value="AR">Argentina</option>
                                                    <option value="AM">Armenia</option>
                                                    <option value="AW">Aruba</option>
                                                    <option value="AU">Australia</option>
                                                    <option value="AT">Austria</option>
                                                    <option value="AZ">Azerbaijan</option>
                                                    <option value="BS">Bahamas</option>
                                                    <option value="BH">Bahrain</option>
                                                    <option value="BD">Bangladesh</option>
                                                    <option value="BB">Barbados</option>
                                                    <option value="BY">Belarus</option>
                                                    <option value="BE">Belgium</option>
                                                    <option value="BZ">Belize</option>
                                                    <option value="BJ">Benin</option>
                                                    <option value="BM">Bermuda</option>
                                                    <option value="BT">Bhutan</option>
                                                    <option value="BO">Bolivia, Plurinational State of</option>
                                                    <option value="BQ">Bonaire, Sint Eustatius and Saba</option>
                                                    <option value="BA">Bosnia and Herzegovina</option>
                                                    <option value="BW">Botswana</option>
                                                    <option value="BV">Bouvet Island</option>
                                                    <option value="BR">Brazil</option>
                                                    <option value="IO">British Indian Ocean Territory</option>
                                                    <option value="BN">Brunei Darussalam</option>
                                                    <option value="BG">Bulgaria</option>
                                                    <option value="BF">Burkina Faso</option>
                                                    <option value="BI">Burundi</option>
                                                    <option value="KH">Cambodia</option>
                                                    <option value="CM">Cameroon</option>
                                                    <option value="CA">Canada</option>
                                                    <option value="CV">Cape Verde</option>
                                                    <option value="KY">Cayman Islands</option>
                                                    <option value="CF">Central African Republic</option>
                                                    <option value="TD">Chad</option>
                                                    <option value="CL">Chile</option>
                                                    <option value="CN">China</option>
                                                    <option value="CX">Christmas Island</option>
                                                    <option value="CC">Cocos (Keeling) Islands</option>
                                                    <option value="CO">Colombia</option>
                                                    <option value="KM">Comoros</option>
                                                    <option value="CG">Congo</option>
                                                    <option value="CD">Congo, the Democratic Republic of the</option>
                                                    <option value="CK">Cook Islands</option>
                                                    <option value="CR">Costa Rica</option>
                                                    <option value="CI">Côte d'Ivoire</option>
                                                    <option value="HR">Croatia</option>
                                                    <option value="CU">Cuba</option>
                                                    <option value="CW">Curaçao</option>
                                                    <option value="CY">Cyprus</option>
                                                    <option value="CZ">Czech Republic</option>
                                                    <option value="DK">Denmark</option>
                                                    <option value="DJ">Djibouti</option>
                                                    <option value="DM">Dominica</option>
                                                    <option value="DO">Dominican Republic</option>
                                                    <option value="EC">Ecuador</option>
                                                    <option value="EG">Egypt</option>
                                                    <option value="SV">El Salvador</option>
                                                    <option value="GQ">Equatorial Guinea</option>
                                                    <option value="ER">Eritrea</option>
                                                    <option value="EE">Estonia</option>
                                                    <option value="ET">Ethiopia</option>
                                                    <option value="FK">Falkland Islands (Malvinas)</option>
                                                    <option value="FO">Faroe Islands</option>
                                                    <option value="FJ">Fiji</option>
                                                    <option value="FI">Finland</option>
                                                    <option value="FR">France</option>
                                                    <option value="GF">French Guiana</option>
                                                    <option value="PF">French Polynesia</option>
                                                    <option value="TF">French Southern Territories</option>
                                                    <option value="GA">Gabon</option>
                                                    <option value="GM">Gambia</option>
                                                    <option value="GE">Georgia</option>
                                                    <option value="DE">Germany</option>
                                                    <option value="GH">Ghana</option>
                                                    <option value="GI">Gibraltar</option>
                                                    <option value="GR">Greece</option>
                                                    <option value="GL">Greenland</option>
                                                    <option value="GD">Grenada</option>
                                                    <option value="GP">Guadeloupe</option>
                                                    <option value="GU">Guam</option>
                                                    <option value="GT">Guatemala</option>
                                                    <option value="GG">Guernsey</option>
                                                    <option value="GN">Guinea</option>
                                                    <option value="GW">Guinea-Bissau</option>
                                                    <option value="GY">Guyana</option>
                                                    <option value="HT">Haiti</option>
                                                    <option value="HM">Heard Island and McDonald Islands</option>
                                                    <option value="VA">Holy See (Vatican City State)</option>
                                                    <option value="HN">Honduras</option>
                                                    <option value="HK">Hong Kong</option>
                                                    <option value="HU">Hungary</option>
                                                    <option value="IS">Iceland</option>
                                                    <option value="IN">India</option>
                                                    <option value="ID">Indonesia</option>
                                                    <option value="IR">Iran, Islamic Republic of</option>
                                                    <option value="IQ">Iraq</option>
                                                    <option value="IE">Ireland</option>
                                                    <option value="IM">Isle of Man</option>
                                                    <option value="IL">Israel</option>
                                                    <option value="IT">Italy</option>
                                                    <option value="JM">Jamaica</option>
                                                    <option value="JP">Japan</option>
                                                    <option value="JE">Jersey</option>
                                                    <option value="JO">Jordan</option>
                                                    <option value="KZ">Kazakhstan</option>
                                                    <option value="KE">Kenya</option>
                                                    <option value="KI">Kiribati</option>
                                                    <option value="KP">Korea, Democratic People's Republic of</option>
                                                    <option value="KR">Korea, Republic of</option>
                                                    <option value="KW">Kuwait</option>
                                                    <option value="KG">Kyrgyzstan</option>
                                                    <option value="LA">Lao People's Democratic Republic</option>
                                                    <option value="LV">Latvia</option>
                                                    <option value="LB">Lebanon</option>
                                                    <option value="LS">Lesotho</option>
                                                    <option value="LR">Liberia</option>
                                                    <option value="LY">Libya</option>
                                                    <option value="LI">Liechtenstein</option>
                                                    <option value="LT">Lithuania</option>
                                                    <option value="LU">Luxembourg</option>
                                                    <option value="MO">Macao</option>
                                                    <option value="MK">Macedonia, the former Yugoslav Republic of</option>
                                                    <option value="MG">Madagascar</option>
                                                    <option value="MW">Malawi</option>
                                                    <option value="MY">Malaysia</option>
                                                    <option value="MV">Maldives</option>
                                                    <option value="ML">Mali</option>
                                                    <option value="MT">Malta</option>
                                                    <option value="MH">Marshall Islands</option>
                                                    <option value="MQ">Martinique</option>
                                                    <option value="MR">Mauritania</option>
                                                    <option value="MU">Mauritius</option>
                                                    <option value="YT">Mayotte</option>
                                                    <option value="MX">Mexico</option>
                                                    <option value="FM">Micronesia, Federated States of</option>
                                                    <option value="MD">Moldova, Republic of</option>
                                                    <option value="MC">Monaco</option>
                                                    <option value="MN">Mongolia</option>
                                                    <option value="ME">Montenegro</option>
                                                    <option value="MS">Montserrat</option>
                                                    <option value="MA">Morocco</option>
                                                    <option value="MZ">Mozambique</option>
                                                    <option value="MM">Myanmar</option>
                                                    <option value="NA">Namibia</option>
                                                    <option value="NR">Nauru</option>
                                                    <option value="NP">Nepal</option>
                                                    <option value="NL">Netherlands</option>
                                                    <option value="NC">New Caledonia</option>
                                                    <option value="NZ">New Zealand</option>
                                                    <option value="NI">Nicaragua</option>
                                                    <option value="NE">Niger</option>
                                                    <option value="NG">Nigeria</option>
                                                    <option value="NU">Niue</option>
                                                    <option value="NF">Norfolk Island</option>
                                                    <option value="MP">Northern Mariana Islands</option>
                                                    <option value="NO">Norway</option>
                                                    <option value="OM">Oman</option>
                                                    <option value="PK">Pakistan</option>
                                                    <option value="PW">Palau</option>
                                                    <option value="PS">Palestinian Territory, Occupied</option>
                                                    <option value="PA">Panama</option>
                                                    <option value="PG">Papua New Guinea</option>
                                                    <option value="PY">Paraguay</option>
                                                    <option value="PE">Peru</option>
                                                    <option value="PH">Philippines</option>
                                                    <option value="PN">Pitcairn</option>
                                                    <option value="PL">Poland</option>
                                                    <option value="PT">Portugal</option>
                                                    <option value="PR">Puerto Rico</option>
                                                    <option value="QA">Qatar</option>
                                                    <option value="RE">Réunion</option>
                                                    <option value="RO">Romania</option>
                                                    <option value="RU">Russian Federation</option>
                                                    <option value="RW">Rwanda</option>
                                                    <option value="BL">Saint Barthélemy</option>
                                                    <option value="SH">Saint Helena, Ascension and Tristan da Cunha</option>
                                                    <option value="KN">Saint Kitts and Nevis</option>
                                                    <option value="LC">Saint Lucia</option>
                                                    <option value="MF">Saint Martin (French part)</option>
                                                    <option value="PM">Saint Pierre and Miquelon</option>
                                                    <option value="VC">Saint Vincent and the Grenadines</option>
                                                    <option value="WS">Samoa</option>
                                                    <option value="SM">San Marino</option>
                                                    <option value="ST">Sao Tome and Principe</option>
                                                    <option value="SA">Saudi Arabia</option>
                                                    <option value="SN">Senegal</option>
                                                    <option value="RS">Serbia</option>
                                                    <option value="SC">Seychelles</option>
                                                    <option value="SL">Sierra Leone</option>
                                                    <option value="SG">Singapore</option>
                                                    <option value="SX">Sint Maarten (Dutch part)</option>
                                                    <option value="SK">Slovakia</option>
                                                    <option value="SI">Slovenia</option>
                                                    <option value="SB">Solomon Islands</option>
                                                    <option value="SO">Somalia</option>
                                                    <option value="ZA">South Africa</option>
                                                    <option value="GS">South Georgia and the South Sandwich Islands</option>
                                                    <option value="SS">South Sudan</option>
                                                    <option value="ES">Spain</option>
                                                    <option value="LK">Sri Lanka</option>
                                                    <option value="SD">Sudan</option>
                                                    <option value="SR">Suriname</option>
                                                    <option value="SJ">Svalbard and Jan Mayen</option>
                                                    <option value="SZ">Swaziland</option>
                                                    <option value="SE">Sweden</option>
                                                    <option value="CH">Switzerland</option>
                                                    <option value="SY">Syrian Arab Republic</option>
                                                    <option value="TW">Taiwan, Province of China</option>
                                                    <option value="TJ">Tajikistan</option>
                                                    <option value="TZ">Tanzania, United Republic of</option>
                                                    <option value="TH">Thailand</option>
                                                    <option value="TL">Timor-Leste</option>
                                                    <option value="TG">Togo</option>
                                                    <option value="TK">Tokelau</option>
                                                    <option value="TO">Tonga</option>
                                                    <option value="TT">Trinidad and Tobago</option>
                                                    <option value="TN">Tunisia</option>
                                                    <option value="TR">Turkey</option>
                                                    <option value="TM">Turkmenistan</option>
                                                    <option value="TC">Turks and Caicos Islands</option>
                                                    <option value="TV">Tuvalu</option>
                                                    <option value="UG">Uganda</option>
                                                    <option value="UA">Ukraine</option>
                                                    <option value="AE">United Arab Emirates</option>
                                                    <option value="GB">United Kingdom</option>
                                                    <option value="US">United States</option>
                                                    <option value="UM">United States Minor Outlying Islands</option>
                                                    <option value="UY">Uruguay</option>
                                                    <option value="UZ">Uzbekistan</option>
                                                    <option value="VU">Vanuatu</option>
                                                    <option value="VE">Venezuela, Bolivarian Republic of</option>
                                                    <option value="VN">Viet Nam</option>
                                                    <option value="VG">Virgin Islands, British</option>
                                                    <option value="VI">Virgin Islands, U.S.</option>
                                                    <option value="WF">Wallis and Futuna</option>
                                                    <option value="EH">Western Sahara</option>
                                                    <option value="YE">Yemen</option>
                                                    <option value="ZM">Zambia</option>
                                                    <option value="ZW">Zimbabwe</option>
                                                </select>
                                            </div>
                                        </div>
                                        <div class="field">
                                            <label for="postal">Postal code</label>
                                            <input type="text" id="postal">
                                        </div>
                                    </div>
                                    <input type="submit" class="btn-primary" value="Submit">
                                </form>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

export default {
    components: {
        Footer,
        Header,
    },
    mounted: function () {
        //
    },
}
</script>

<style scoped>
/*  */
</style>
