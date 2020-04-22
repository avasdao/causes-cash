<template>
    <main class="coming-soon">
        <div id="wrapper">
            <header id="header" class="site-header">
                <div class="container">
                    <div class="site-brand">
                        <a href="javascript://"><img src="@/assets/logo.png" alt=""></a>
                    </div>
                </div>
            </header>

            <main id="main" class="site-main">
                <div class="container">
                    <h2>Bitcoin Cash Please Is BUIDLing</h2>

                    <h1>A New Website</h1>

                    <div class="desc">
                        Working hard for something you <strong>DON'T</strong> care about is called <strong>STRESS.</strong>
                        <br />Working hard for something you <strong>LOVE</strong> is called <strong>PASSION.</strong>
                    </div>

                    <div class="time">
                        <ul>
                            <li><div class="time-item"><p>{{days}}</p><span>Days</span></div></li>
                            <li><div class="time-item"><p>{{hours}}</p><span>Hours</span></div></li>
                            <li><div class="time-item"><p>{{mins}}</p><span>Mins</span></div></li>
                            <li><div class="time-item"><p>{{seconds}}</p><span>Seconds</span></div></li>
                        </ul>
                    </div>

                    <!-- <div class="button button-popup"> -->
                    <div class="button">
                        <a href="/" class="btn-primary">Check Out the LIVE Preview</a>
                    </div>
                </div>
            </main>

            <footer id="footer" class="site-footer">
                <div class="footer-copyright clearfix">
                    <p class="copyright">
                        &copy; 2020 by <a href="https://bchplease.org" target="_blank">Bitcoin Cash Please.</a> All rights reserved.
                    </p>

                    <div class="follow">
                        <ul>
                            <li class="facebook"><a target="_blank" href="javascript://"><i class="fa fa-facebook" aria-hidden="true"></i></a></li>
                            <li class="twitter"><a target="_blank" href="javascript://"><i class="fa fa-twitter" aria-hidden="true"></i></a></li>
                            <li class="instagram"><a target="_blank" href="javascript://"><i class="fa fa-instagram" aria-hidden="true"></i></a></li>
                            <li class="google"><a target="_blank" href="javascript://"><i class="fa fa-google-plus" aria-hidden="true"></i></a></li>
                        </ul>
                    </div>
                </div>
            </footer>
        </div>
    </main>
</template>

<script>
/* Import jQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    components: {
        //
    },
    data: () => {
        return {
            jQDays: 0,
            jQHours: 0,
            jQMins: 0,
            jQSeconds: 0,
        }
    },
    computed: {
        days() {
            return this.jQDays
        },

        hours() {
            return this.jQHours
        },

        mins() {
            return this.jQMins
        },

        seconds() {
            return this.jQSeconds
        },
    },
    mounted: function () {
        /* Initialize self. */
        const self = this

        /* Set launch date. */
        const launchDate = 'May 15, 2020'

        /* Initialize countdown (launch timer). */
        $('.time ul').countdown({
            date: launchDate,
            render: function(data) {
                // console.log('DATA', data)

                /* Set jQuery days. */
                self.jQDays = this.leadingZeros(data.days, 2)

                /* Set jQuery hours. */
                self.jQHours = this.leadingZeros(data.hours, 2)

                /* Set jQuery mins. */
                self.jQMins = this.leadingZeros(data.min, 2)

                /* Set jQuery seconds. */
                self.jQSeconds = this.leadingZeros(data.sec, 2)
            }
        })
    },
}
</script>

<style scoped>
.coming-soon #wrapper{
  background-image: url(~@/assets/img/coming_soon.jpg);
  background-position: center center;
  background-size: cover;
  background-repeat: no-repeat;
}
.coming-soon .site-header{
  height: auto;
  text-align: center;
  padding: 50px 0;
  margin-bottom: 10px;
}
.coming-soon .site-header,
.coming-soon .site-main,
.coming-soon .site-footer{
  z-index: 9;
  position: relative;
}
.coming-soon .site-header .site-brand{
  float: none;
  line-height: normal;
}
.coming-soon .site-brand img{
  width: auto;
}
.coming-soon .site-main h2{
  font-size: 26px;
  font-weight: 500;
  color: #fff;
  margin-bottom: 8px;
  text-align: center;
}
.coming-soon .site-main h1{
  color: #fff;
  text-align: center;
  text-transform: uppercase;
  font-weight: 700;
  font-size: 36px;
  margin-bottom: 30px;
}
.coming-soon .site-main .desc{
  color: #fff;
  text-align: center;
  width: 40%;
  margin: 0 auto;
}
.coming-soon .site-main .time{
  max-width: 690px;
  margin: 65px auto 0;
}
.coming-soon .site-main .time ul{
  margin: 0 -15px;
}
.coming-soon .site-main .time li{
  list-style: none;
  display: inline-block;
  width: 25%;
  padding: 0 15px;
}
.coming-soon .site-main .time .time-item{
  background-color: #182f57;
  color: #fff;
  text-align: center;
  height: 150px;
  border-radius: 3px;
}
.coming-soon .site-main .time .time-item p{
  font-size: 80px;
  font-weight: 500;
}
.coming-soon .site-footer .footer-copyright p{
  margin-top: 21px;
  float: left;
}
.coming-soon .site-footer .footer-copyright a{
  display: inline-block;
  color: rgba(255, 180, 180, 1.0);
}
.coming-soon .site-footer .footer-copyright .follow{
  float: right;
}
.coming-soon .site-main .time .time-item span{
  display: block;
  margin-top: -14px;
}
.coming-soon .site-main .button{
  display: block;
  margin: 60px auto 0;
  text-align: center;
}
.coming-soon .site-footer .footer-copyright{
  background-color: initial;
  padding: 44px 60px 80px 60px;
}
.coming-soon #wrapper{
  position: relative;
}
.coming-soon #wrapper:after{
  content: '';
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  right: 0;
  background: rgba(0,0,0,0.3);
}
.popup{
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0,0,0,0.3);
  visibility: hidden;
  opacity: 0;
  transition: all 0.4s;
}
.popup.open{
  visibility: visible;
  opacity: 1;
}
.newsletter-popup{
  background: repeating-linear-gradient( 135deg, #4251db, #4251db 10px, #fff 10px, #fff 20px, #f84d3b 20px, #f84d3b 30px, #fff 30px, #fff 40px ) !important;
  position: relative;
  height: 320px;
  left: 0;
  right: 0;
  top: 50%;
  transform: translateY(-50%);
  width: 640px;
  margin: 0 auto;
}
.newsletter-popup .close{
  position: absolute;
  top: -10px;
  right: -10px;
  color: #222;
  opacity: 1;
  height: 30px;
  width: 30px;
  background-color: #fff;
  text-align: center;
  line-height: 30px;
  border-radius: 50%;
  font-size: 14px;
}
.popup-wrapper{
  background-color: #fff;
  position: absolute;
  top: 6px;
  left: 6px;
  right: 6px;
  bottom: 6px;
}
.form-header{
  position: relative;
  padding: 30px;
}
.form-content:before{
  background: linear-gradient(45deg, transparent 33.33%, #ffffff 33.333%, #ffffff 66.66%, transparent 66.66%), linear-gradient(-45deg, transparent 33.33%, #ffffff 33.33%, #ffffff 66.66%, transparent 66.66%) !important;
  top: -5px;
  left: 0;
  width: 100%;
  height: 10px;
  background-size: 20px 40px !important;
  content: '';
  position: absolute;
}
.form-header img{
  width: auto;
  float: left;
}
.form-header .form-text h2{
  clear: none;
  color: #222;

}
.form-header .form-text{
  padding-left: 180px;
}
.form-header .form-text h2{
  text-align: left;
}
.form-content{
  padding: 30px;
  position: relative;
}
.form-content form{
  position: relative;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 42px;
}
.form-content form input{
  width: 70%;
  position: absolute;
  top: 0;
  left: 0;
  bottom: 0;
  height: 42px;
  border-radius: 3px;
}
.form-content form button{
  position: absolute;
  right: 0;
  top: 0;
  height: 42px;
  line-height: 42px;
  width: 25%;
}

@media screen and (max-width: 992px) {
    .coming-soon .site-header{
		background-color: initial;
	}
}

@media screen and (max-width: 767px) {
    .coming-soon .site-header{
		padding: 40px 0;
	}
	.coming-soon .site-footer .footer-copyright{
		padding: 40px;
	}
	.coming-soon .site-main .time{
		margin-top: 60px;
	}
	.coming-soon .site-main{
		padding: 0;
	}
	.coming-soon .site-main .time .time-item p{
		font-size: 60px;
	}
	.coming-soon .site-main .time .time-item span{
		margin-top: 10px;
	}
}

@media screen and (max-width: 576px) {
    .coming-soon .site-main .desc{
		width: 100%;
	}

    .coming-soon .site-main .button{
		margin-top: 20px;
	}
	.coming-soon .site-footer .footer-copyright p{
		float: none;
		margin: 0 0 15px 0;
		text-align: center;
	}
	.coming-soon .site-footer .footer-copyright .follow{
		float: none;
		text-align: center;
	}

    .coming-soon .site-main .time li{
		width: 50%;
		margin-bottom: 30px;
	}
}

@media screen and (max-width: 360px){
    .coming-soon .site-main h2{
        font-size: 18px;
    }

    .coming-soon .site-main h1{
		font-size: 24px;
	}

    .coming-soon .site-main .time .time-item p{
		font-size: 40px;
		display: inline-block;
		line-height: 100px;
	}
	.coming-soon .site-main .time .time-item span{
		margin-top: 0;
	}
}
</style>
