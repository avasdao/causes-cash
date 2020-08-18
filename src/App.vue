<template>
    <router-view/>
</template>

<script>
/* Initialize vuex. */
import { mapActions, mapGetters } from 'vuex'

/* Import JQuery. */
// FIXME: Remove ALL jQuery dependencies.
const $ = window.jQuery

export default {
    computed: {
        ...mapGetters('storage', [
            'getIPFS',
            'getOrbitDB',
        ]),

        ...mapGetters([
            'getFlags',
            'getLocale',
        ]),
    },
    methods: {
        ...mapActions([
            'updateAssetSource',
        ]),

        ...mapActions([
            'updateFlags',
            'updateLocale',
        ]),

        /**
         * Initialize Application
         */
        initApp() {
            /* Initialize flags. */
            if (!this.getFlags) {
                this.updateFlags({
                    darkMode: false,
                    unconfirmed: true,
                })
            }

            /* Initialize locale. */
            if (!this.getLocale) {
                this.updateLocale('en-US')
            }
        },

        initCoinManager() {
            setInterval(() => {
                console.log('COIN MANAGER')
            }, 5000)
        },

        /**
         * Test IPFS Connection
         */
        async testIPFS(_node) {
            console.log('Starting IPFS test...')
            const data = await _node
                .cat('QmcPfKi3LTi8aTU6Zt6zNXmwSyVG8p5tzRhJHNfC8yyynX')
                .catch(err => {
                    console.error(err)
                })

            // data is returned as a Buffer, conver it back to a string
            console.log(data.toString())

            return
        }


        // function readURL(input, thumbimage) {
        //     if (input.files && input.files[0]) {
        //         const reader = new FileReader()
        //
        //         reader.onload = function (e) {
        //             $("#thumbimage").attr('src', e.target.result)
        //         }
        //
        //         reader.readAsDataURL(input.files[0])
        //     } else { // Sử dụng cho IE
        //         $("#thumbimage").attr('src', input.value)
        //     }
        //
        //     $("#thumbimage").show()
        //     $('.filename').text($("#uploadfile").val())
        //     $('.choicefile').css('background', '#C4C4C4')
        //     $('.choicefile').css('cursor', 'default')
        //     $(".removeimg").show()
        //     $(".choicefile").hide()
        // }

        // function readURL1(input, thumbimage) {
        //     if (input.files && input.files[0]) {
        //         const reader = new FileReader()
        //
        //         reader.onload = function (e) {
        //             $("#thumbimage1").attr('src', e.target.result)
        //         }
        //
        //         reader.readAsDataURL(input.files[0])
        //     } else { // Sử dụng cho IE
        //         $("#thumbimage1").attr('src', input.value)
        //     }
        //
        //     $("#thumbimage1").show()
        //     $('.filename1').text($("#uploadfile").val())
        //     $('.choicefile1').css('background', '#C4C4C4')
        //     $('.choicefile1').css('cursor', 'default')
        //     $(".removeimg1").show()
        //     $(".choicefile1").hide()
        // }

        // function readURL2(input, thumbimage) {
        //     if (input.files && input.files[0]) {
        //         const reader = new FileReader()
        //
        //         reader.onload = function (e) {
        //             $("#thumbimage2").attr('src', e.target.result)
        //         }
        //
        //         reader.readAsDataURL(input.files[0])
        //     } else  { // Sử dụng cho IE
        //         $("#thumbimage2").attr('src', input.value)
        //     }
        //
        //     $("#thumbimage2").show()
        //     $('.filename2').text($("#uploadfile").val())
        //     $('.choicefile2').css('background', '#C4C4C4')
        //     $('.choicefile2').css('cursor', 'default')
        //     $(".removeimg2").show()
        //     $(".choicefile2").hide()
        // }

    },
    created: async function () {
        console.log('Initializing application...')

        /* Initialize application. */
        this.initApp()

        /* Initialize coin manager. */
        // this.initCoinManager()

        /* Initialize asset source. */
        this.updateAssetSource()

        /* Initialize IPFS connection. */
        // const node = await this.getIPFS

        /* Test IPFS connection. */
        // await this.testIPFS(node)

        /* Initialize OrbitDB connection. */
        // await this.getOrbitDB

    },
    mounted: async function () {
        /* Initialize WOW. */
        new window.WOW({
            animateClass: 'animated',
            offset: 100,
            // callback: function (box) {
            //     console.log('WOW: animating <' + box.tagName.toLowerCase() + '>')
            // }
        }).init()

        $(".choicefile").bind('click', function () {
            $("#uploadfile").click()
        })
        $(".removeimg").on('click', function () {
            $("#thumbimage").attr('src', '').hide()
            $("#myfileupload").html('<input type="file" id="uploadfile"  onchange="readURL(this)" />')
            $(".removeimg").hide()
            $(".choicefile").show()
            $(".choicefile").bind('click', function () {
                $("#uploadfile").click()
            })
            $('.choicefile').css('background','#C4C4C4')
            $('.choicefile').css('cursor', 'pointer')
            $(".filename").text("")
        })

        $(".choicefile1").bind('click', function () {
            $("#uploadfile1").click()
        })
        $(".removeimg1").on('click', function () {
            $("#thumbimage1").attr('src', '').hide()
            $("#myfileupload1").html('<input type="file" id="uploadfile1"  onchange="readURL1(this)" />')
            $(".removeimg1").hide()
            $(".choicefile1").show()
            $(".choicefile1").bind('click', function () {
                $("#uploadfile1").click()
            })
            $('.choicefile1').css('background','#C4C4C4')
            $('.choicefile1').css('cursor', 'pointer')
            $(".filename1").text("")
        })

        $(".choicefile2").bind('click', function () {
            $("#uploadfile2").click()
        })
        $(".removeimg2").on('click', function () {
            $("#thumbimage2").attr('src', '').hide()
            $("#myfileupload2").html('<input type="file" id="uploadfile2"  onchange="readURL2(this)" />')
            $(".removeimg2").hide()
            $(".choicefile2").show()
            $(".choicefile2").bind('click', function () {
                $("#uploadfile2").click()
            })
            $('.choicefile2').css('background','#C4C4C4')
            $('.choicefile2').css('cursor', 'pointer')
            $(".filename2").text("")
        })

		/*  [ Menu Moblie ]
        - - - - - - - - - - - - - - - - - - - - */
		const toggles = document.querySelectorAll(".c-hamburger")

        for (var i = toggles.length - 1; i >= 0; i--) {
            const toggle = toggles[i]
            toggleHandler(toggle)
        }

        function toggleHandler(toggle) {
            toggle.addEventListener( "click", function(e) {
                e.preventDefault();
                (this.classList.contains("is-active") === true) ? this.classList.remove("is-active") : this.classList.add("is-active")
            })
        }

		/*  [ Back Top ]
        - - - - - - - - - - - - - - - - - - - - */
        $('.back-top').on('click', function (e) {
            e.preventDefault()
            $('html,body').animate({
                scrollTop: 0
            }, 700)
        })

        /*  [ Tab Controls ]
        - - - - - - - - - - - - - - - - - - - - */
        $('.menu-category li.mc-option').on('click', function (e) {
            e.preventDefault()
			var tab_id = $(this).attr('data-tab')
			$('.menu-category li.mc-option').removeClass('active')
			$('.popular-project .pp-item').removeClass('active')
			$(this).addClass('active')
			$("#"+tab_id).addClass('active')
		})

        $('.tabs-controls li').on('click', function (e) {
            e.preventDefault()
			var tab_id = $(this).attr('data-tab')
			$('.tabs-controls li').removeClass('active')
			$('.campaign-content .tabs').removeClass('active')
			$(this).addClass('active')
			$("#"+tab_id).addClass('active')
		})

		/*  [ Menu Category ]
        - - - - - - - - - - - - - - - - - - - - */
		$('.menu-category li.mc-option').on('click', function () {
			// var tab_id = $(this).attr('data-hash')
			$('.menu-category li.mc-option').removeClass('active')
			$(this).addClass('active')
		})
		$('.menu-category li.cat-more a').on('click', function () {
			var url = $(this).attr('href')
			window.location.href = url;
		})

		/*  [ Main Menu ]
        - - - - - - - - - - - - - - - - - - - - */
		$( '.c-hamburger' ).on( 'click', function () {
            $( this ).parents( '.main-menu' ).toggleClass('open')
            $( 'body' ).toggleClass( 'menu-open' )
        })
        $( 'html' ).on( 'click', function(e) {
            if( $( e.target ).closest( '.main-menu.open' ).length == 0 ) {
                $( '.main-menu' ).removeClass( 'open' )
                $( 'body' ).removeClass( 'menu-open' )
                $( '.c-hamburger' ).removeClass('is-active')
            }
        })

        /*  [ Header Fixed ]
        - - - - - - - - - - - - - - - - - - - - */
        if ($(window).width() < 992) {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 0) {
					$('#header').addClass('fixed')
                } else {
					$('#header').removeClass('fixed')
                }
            })
        }

        /*  [ Sub Menu ]
    	- - - - - - - - - - - - - - - - - - - - */
        $( '.main-menu ul > li' ).on('click', function () {
			$( this ).find('.sub-menu').slideToggle()
		})

        $('#start-tag').magicSuggest({
            placeholder: '',
            maxEntryLength: 50,
        })
        $('.process-model li.pm-option').on('click', function (e) {
            e.preventDefault()
			var tab_id = $(this).attr('data-tab')
			$('.process-model li.pm-option').removeClass('active')
			$('.tab-content .tab-pane').removeClass('active')
			$('.process-model li').removeClass()
			$(this).addClass('active')
			$("#"+tab_id).addClass('active')
			$(this).prevAll().addClass("visited")
		})
		$('.process-model li:nth-child(1)').removeClass('visited')
        $('.pane-tab li').on('click', function () {
			var tab_id = $(this).attr('data-tab')
			$('.pane-tab li').removeClass('active')
			$('#story .pane-box').removeClass('active')
			$(this).addClass('active')
			$("#"+tab_id).addClass('active')
		})
		$('.create-perk').on('click', function (e) {
			e.preventDefault()
			$(this).parent().fadeOut(0)
			$(this).parent().parent().find('.start-form').fadeIn()
		})
		$('.connect-fb').on('click', function (e) {
			e.preventDefault()
			$(this).fadeOut(0)
			$(this).parent().find('.fb-content').fadeIn()
		})
		$('.fb-content a').on('click', function (e) {
			e.preventDefault()
			$(this).parent().fadeOut(0)
			$(this).parent().parent().find('.connect-fb').fadeIn()
		})
		$('.add-reward').on('click', function (e) {
			e.preventDefault()
			$("#import").append($("#itemform").html())
		})
		$("#import").bind("DOMSubtreeModified", function () {
			$('.reward-delete').on('click', function (e) {
				e.preventDefault()
				$(this).parent().parent().fadeOut(0)
			})
		})


        // $( '.grid' ).each( function () {
        //     var $grid = $('.grid').isotope({
        //         itemSelector: '.filterinteresting',
        //         layoutMode: 'fitRows',
        //         getSortData: {
        //             name: '.name',
        //             symbol: '.symbol',
        //             number: '.number parseInt',
        //             category: '[data-category]',
        //             weight: function( itemElem ) {
        //                 var weight = $( itemElem ).find('.weight').text()
        //                 return parseFloat( weight.replace( /[\(\)]/g, '') )
        //             }
        //         }
        //     })
        //
        //     // filter functions
        //     var filterFns = {
        //         // show if number is greater than 50
        //         numberGreaterThan50: function () {
        //             var number = $(this).find('.number').text()
        //             return parseInt( number, 10 ) > 50
        //         },
        //         // show if name ends with -ium
        //         ium: function () {
        //             var name = $(this).find('.name').text()
        //             return name.match( /ium$/ )
        //         }
        //     }
        //
        //     // bind filter button click
        //     $('.filter-theme').on( 'click', 'button', function () {
        //         var filterValue = $( this ).attr('data-filter')
        //
        //         // use filterFn if matches value
        //         filterValue = filterFns[ filterValue ] || filterValue;
        //         $grid.isotope({ filter: filterValue })
        //     })
        //
        //     // change is-checked class on buttons
        //     $('.campaign-tabs').each( function( i, buttonGroup ) {
        //         var $buttonGroup = $( buttonGroup )
        //
        //         $buttonGroup.on( 'click', 'button', function () {
        //             $buttonGroup.find('.is-checked').removeClass('is-checked')
        //             $( this ).addClass('is-checked')
        //         })
        //     })
        // })


    },
}

</script>

<style>
section .container {
    margin-bottom: 100px;
}

.fa-question-circle-o {
    cursor: pointer;
}

.input-error {
    color: rgba(255, 0, 0, 1.0);
    margin: 5px 0 0 20px
}

button {
    cursor: pointer;
}

.btn-danger {
    background-color: #dc3545;
    padding: 0 20px;
    border-radius: 2px 2px 2px 2px;
    -moz-border-radius: 2px 2px 2px 2px;
    -webkit-border-radius: 2px 2px 2px 2px;
    height: 46px;
    line-height: 46px;
    border: none;
    display: inline-block;
}
/* .btn-danger:hover{
    background: #08aded;
    background-color: #0094d2;
} */
.btn-outline-danger {
    background-color: #ffffff;
    padding: 0 20px;
    border-radius: 2px 2px 2px 2px;
    -moz-border-radius: 2px 2px 2px 2px;
    -webkit-border-radius: 2px 2px 2px 2px;
    height: 46px;
    line-height: 46px;
    border: 1pt solid #dc3545;
    display: inline-block;
}
.btn-warning {
    background-color: #ffc108;
    padding: 0 20px;
    border-radius: 2px 2px 2px 2px;
    -moz-border-radius: 2px 2px 2px 2px;
    -webkit-border-radius: 2px 2px 2px 2px;
    height: 46px;
    line-height: 46px;
    border: none;
    display: inline-block;
}
/* .btn-danger:hover{
    background: #08aded;
    background-color: #0094d2;
} */
.btn-outline-warning {
    background-color: #ffffff;
    padding: 0 20px;
    border-radius: 2px 2px 2px 2px;
    -moz-border-radius: 2px 2px 2px 2px;
    -webkit-border-radius: 2px 2px 2px 2px;
    height: 46px;
    line-height: 46px;
    border: 1pt solid #ffc108;
    display: inline-block;
}

.markdown a, .campaigns a {
    display: inline-block;
}

#story table th, #story table td, #guide table th, #guide table td {
    border: 1pt solid #c8c8c8;
    padding: 5px;
}

#story h1, #story h2, #guide h1, #guide h2 {
    margin-top: 30px;
    margin-bottom: 10px;
    padding-bottom: 5px;
    border-bottom: 1pt solid #c8c8c8;
}
#story h1, #guide h1 {
    font-size: 2.5em;
}
#story h2, #guide h2 {
    font-size: 1.5em;
}
#story h3, #guide h3 {
    margin-bottom: 10px;
}
</style>
