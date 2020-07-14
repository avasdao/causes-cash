<template>
    <main>
        <Header />

        <div class="page-title" :style="{ 'background-image': 'url(' + bannerImg + ')' }">
			<div class="container">
				<h1>Create a New Campaign</h1>
				<div class="breadcrumbs">
					<ul>
						<li><router-link to="/">Home</router-link><span>/</span></li>
						<li>Create a New Campaign</li>
					</ul>
				</div>
			</div>
		</div>

        <section class="campaign-form form-update mb-5">
            <div class="container start-form">
                <form action="javascript://">
                    <h4>
                        Create a New Campaign
                    </h4>

                    <p>
                        Creating a new campaign is really quick and easy.
                        To get started we ONLY ask for a few pieces of information, the rest you can add later, at your convenience.
                        <br /><em class="text-danger">* all fields are required</em>
                    </p>

                    <hr />

                    <div class="field">
                        <label for="title">
                            Campaign Title
                        </label>

                        <span class="label-desc">
                            What is the title of your campaign?
                        </span>

                        <input
                            type="text"
                            id="title"
                            placeholder="Bitcoin Killer App"
                            v-model="title"
                            @keyup="titleValidation($event)"
                         />

                         <div class="input-error" v-if="title && title.length === MAXIMUM_TITLE">
                             Maximum character length is 50
                         </div>

                         <div v-if="slug" class="slug">
                             [ <span>{{slug}}</span> ]
                         </div>
                    </div>

                    <div class="field">
                        <label for="model">
                            Funding Model
                        </label>

                        <span class="label-desc">
                            Please choose from 1 of 3 funding models.
                            How do you want to receive your donations?
                        </span>

                        <div class="field-select">
                            <select id="model" v-model="model">
                                <option value="">Select a Campaign Type</option>
                                <option value="direct">Direct Payment</option>
                                <option value="assurance">Community Pledge</option>
                                <option value="payouts">Daily Payouts</option>
                            </select>
                        </div>
                    </div>

                    <div class="field">
                        <label for="category">
                            Campaign Category
                        </label>

                        <span class="label-desc">
                            To help backers find your campaign, select a category that best represents your campaign.
                        </span>

                        <div class="field-select">
                            <select id="category" v-model="category">
                                <option value="">Select a Category</option>
                                <option value="adoption">Adoption</option>
                                <option value="community">Community</option>
                                <option value="dapp">Decentralized Apps</option>
                                <option value="design-art">Design & Art</option>
                                <option value="education">Education</option>
                                <option value="film-video">Film & Video</option>
                                <option value="fun-games">Fun & Games</option>
                                <option value="hardware">Hardware</option>
                                <option value="health-wellness">Health & Wellness</option>
                                <option value="infrastructure">Infrastructure</option>
                                <option value="music">Music</option>
                                <option value="privacy">Privacy</option>
                                <option value="publishing">Publishing</option>
                                <option value="security">Security</option>
                                <option value="software">Software</option>
                                <option value="world-view">World View</option>
                                <option value="youth">Youth</option>
                            </select>
                        </div>
                    </div>

                    <div class="field clearfix">
                        <label for="location">
                            Primary Location
                            <a href="javascript://" class="view-residence">(why do we ask for this?)</a>
                        </label>

                        <span class="label-desc">Choose the location where you are running the campaign.</span>

                        <div class="field">
                            <div class="field-select">
                                <select id="location" v-model="location">
                                    <option value="">Select Your Campaign's Residence</option>
                                    <option value="Worldwide">Worldwide</option>
                                    <option value="">------------------------------</option>
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

                        <div class="spopup-bg"></div>

                        <div class="residence-popup start-popup">
                            <div class="spopup-title">
                                <h3>Primary Residence</h3>

                                <div class="spopup-close">
                                    <span class="ion-ios-close-empty"></span>
                                </div>
                            </div>

                            <div class="spopup-content">
                                <p class="mb-3">
                                    For compliance with local laws, we <strong>require</strong> that you specify your campaign's primary country of residence.
                                </p>

                                <p>
                                    Your campaign's terms of use, privacy policy and general guidelines will <strong>automatically default</strong> to the rules and regulations of your campaign's residence.
                                </p>

                                <ul>
                                    <li>
                                        <h4>Residence Restrictions</h4>

                                        <div class="fee-desc">
                                            <p>
                                                none
                                            </p>
                                        </div>
                                    </li>
                                </ul>
                            </div>
                        </div>
                    </div>

                    <button @click="createNew" class="btn-primary">
                        Create My New Campaign
                    </button>
                </form>
            </div>
        </section>

        <Footer />
    </main>
</template>

<script>
/* Import modules. */
import superagent from 'superagent'

/* Import components. */
import Footer from '@/components/Footer.vue'
import Header from '@/components/Header.vue'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        Footer,
        Header,
    },
    data: () => {
        return {
            MAXIMUM_TITLE: 50,

            title: null,
            category: null,
            model: null,
            location: null,
        }
    },
    computed: {
        /* Campaign Banner Image */
        bannerImg() {
            return 'https://i.imgur.com/9vNfGgt.jpg'
        },

        /* Campaign Slug */
        slug() {
            if (this.title) {
                /* Initialize slug. */
                let slug = this.title

                /* Replace spaces with dashses. */
                slug = slug.replace(/ /gi, '-')

                /* Lower case. */
                slug = slug.toLowerCase()

                /* Return slug. */
                return slug
            } else {
                return null
            }
        },
    },
    methods: {
        /**
         * Create New
         */
        async createNew() {
            /* Validate title. */
            if (!this.title || !this.slug) {
                return alert('Enter a title')
            }

            // /* Validate model. */
            if (!this.model) {
                return alert('Enter a model')
            }

            /* Validate category. */
            if (!this.category) {
                return alert('Enter a category')
            }

            /* Validate location. */
            if (!this.location) {
                return alert('Enter a location')
            }

            const pkg = {
                campaignId: 'NEW',
                slug: this.slug,
                title: this.title,
                model: this.model,
                category: this.category,
                owner: {
                    slug: this.ownerSlug,
                },
                location: this.location,
            }

            /* Set api target. */
            const target = 'https://api.causes.cash/v1/campaigns'

            const result = await superagent
                .post(target)
                .send(pkg)
            console.log('RESULT', result)

            if (result.ok && !result.error) {
                this.title = null
                this.category = null
                // this.summary = null
                this.location = null

                alert('New Campaign Created Successfully!')
            }
        },

        titleValidation(_event) {
            /* Validate title. */
            if (!this.title) {
                return
            }

            /* Remove non alpha-numeric characters. */
            this.title = this.title.replace(/[^a-zA-Z0-9 ]/gi, '')

            /* Replace multiple spaces. */
            this.title = this.title.replace(/( )\1+/gi, ' ')

            /* Validate length. */
            if (this.title.length > this.MAXIMUM_TITLE) {
                /* Stop keypress. */
               _event.preventDefault()

               /* Reduce to maximum length. */
               this.title = this.title.slice(0, this.MAXIMUM_TITLE)
            }
        }
    },
    created: function () {
        /* Set owner slug. */
        this.ownerSlug = this.$route.params.pathMatch.toLowerCase()
        console.log('OWNER SLUG', this.ownerSlug)

    },
    mounted: function () {
        $('.view-residence').on('click', function (e) {
			e.preventDefault()
			$(this).parent().parent().find('.spopup-bg').fadeIn()
			$(this).parent().parent().find('.residence-popup').fadeIn()
		})
		$('.spopup-bg').on('click', function (e) {
			e.preventDefault()
			$(this).fadeOut()
			$(this).parent().find('.residence-popup').fadeOut()
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
label a {
    color: rgba(255, 0, 0, 0.5);
    font-style: italic;
    display: inline-block;
    margin-left: 5px;
    font-size: 0.8em;
}

.slug {
    color: rgba(90, 90, 90, 0.5);
    margin: 5px 0 0 20px
}
.slug span {
    color: rgba(255, 0, 0, 0.5);
    display: inline-block;
}
</style>
