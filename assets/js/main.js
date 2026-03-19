(function ($) {
    $(document).ready(function () {

        // offcanvas humbarger
        let offcanvasElement = $('.header-offcanvas');
        offcanvasElement.on('show.bs.offcanvas', function () {
            $('.humbarger-btn').addClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: 'rotate(45deg)',
                marginBottom: '0'
            });
            $('.btn-close span:nth-child(2)').css({
                transform: 'rotate(-45deg)',
                marginTop: '-5px'
            });
        });
        offcanvasElement.on('hide.bs.offcanvas', function () {
            $('.humbarger-btn').removeClass('open');
            $('.btn-close span:nth-child(1)').css({
                transform: '',
                marginBottom: ''
            });
            $('.btn-close span:nth-child(2)').css({
                transform: '',
                marginTop: ''
            });
        });
        
        //  slider

        let heroSlider = new Swiper(".hero-slider", {
            pagination: {
                el: ".swiper-pagination",
            },
        });
        let benefitsSlider = new Swiper(".swiper.benefits-slider", {
            spaceBetween: 45,
            centeredSlides: true,
            loop:true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },

            breakpoints: {
                0: {
                    slidesPerView: 1
                },
                576: {
                    slidesPerView: 2
                },
                992: {
                    slidesPerView: 3
                }
            }
        });
        // slide down
        function setupToggleMenu(triggerSelector, submenuClass, siblingClass) {
            $(triggerSelector).click(function (e) {
                let thisElement = $(this);
                let subMenu = thisElement.next(submenuClass);

                if (subMenu.length > 0) {
                    e.preventDefault();
                    let parentLi = thisElement.parent();
                    parentLi
                        .siblings(siblingClass)
                        .find(submenuClass)
                        .slideUp()
                        .end()
                        .find("a")
                        .removeClass("rotate active");

                    thisElement.toggleClass("rotate active");
                    subMenu.stop(true, true).slideToggle();
                }
            });
        }
        setupToggleMenu(".mobile-nav a", ".sub-menu", ".menu-item-has-children");

        // Magnific popup
        // $(document).on('click', '.trigger-popup', function (e) {
        //     e.preventDefault();
        //     $.magnificPopup.open({
        //         items: {
        //             src: $(this).attr('href')
        //         },
        //         type: 'iframe',
        //         iframe: {
        //             markup: '<div class="mfp-iframe-scaler">' +
        //                 '<div class="mfp-close"></div>' +
        //                 '<iframe class="mfp-iframe" frameborder="0" allowfullscreen allow="autoplay *; fullscreen *"></iframe>' +
        //                 '</div>',
        //             patterns: {
        //                 youtube: {
        //                     index: 'youtube.com/',
        //                     id: function (url) {
        //                         var m = url.match(/[\\?\\&]v=([^\\?\\&]+)/);
        //                         if (!m || !m[1]) return null;
        //                         return m[1];
        //                     },
        //                     src: '//www.youtube.com/embed/%id%?autoplay=1&iframe=true'
        //                 },
        //                 vimeo: {
        //                     index: 'vimeo.com/',
        //                     id: function (url) {
        //                         var m = url.match(/(https?:\/\/)?(www.)?(player.)?vimeo.com\/([a-z]*\/)*([0-9]{6,11})[?]?.*/);
        //                         if (!m || !m[5]) return null;
        //                         return m[5];
        //                     },
        //                     src: '//player.vimeo.com/video/%id%?autoplay=1'
        //                 }
        //             }
        //         },
        //         callbacks: {
        //             open: function () {
        //                 let iframe = jQuery('.mfp-content iframe');
        //                 let player = new Vimeo.Player(iframe);

        //                 player.on('ended', function () {
        //                     jQuery.magnificPopup.close();
        //                 });
        //             },
        //             close: function () {
        //                 let video = document.getElementById("placeholder-video");
        //                 if (video) {
        //                     video.play();
        //                 }
        //             }
        //         }
        //     });
        // });
        // nice select
        $('select').niceSelect();

        $(".top-to-button").on("click", function (e) {
            e.preventDefault();
            lenis.scrollTo(0)
        });



        // OverlayScrollbars
        const {
            OverlayScrollbars,
            ClickScrollPlugin
        } = OverlayScrollbarsGlobal;
        // Initialize the ClickScrollPlugin
        OverlayScrollbars.plugin(ClickScrollPlugin);
        $("body").each(function () {
            OverlayScrollbars(this, {
                scrollbars: {
                    clickScroll: true,
                    autoHide: "leave",
                    dragScrolling: true,
                    clickScrolling: true,
                },
                scrollBehavior: 'smooth',
            });
        });


        gsap.registerPlugin(ScrollTrigger);
        let tl = gsap.timeline();
        let otherSections = document.querySelectorAll('.industry-slider-item ')

        otherSections.forEach((section, index) => {
            tl.to(section, {
                scrollTrigger: {
                    trigger: section,
                    pin: section,
                    scrub: false,
                    start: 'top 0%',
                    end: "bottom 100%",
                    endTrigger: '.slider-wrapper',
                    pinSpacing: false,
                    markers: false,
                },
            })
        })





        // lenis
        // Initialize a new Lenis instance for smooth scrolling
        const lenis = new Lenis();

        // Listen for the 'scroll' event and log the event data to the console
        // lenis.on('scroll', (e) => {
        //     console.log(e);
        // });

        // Synchronize Lenis scrolling with GSAP's ScrollTrigger plugin
        lenis.on('scroll', ScrollTrigger.update);

        // Add Lenis's requestAnimationFrame (raf) method to GSAP's ticker
        // This ensures Lenis's smooth scroll animation updates on each GSAP tick
        gsap.ticker.add((time) => {
            lenis.raf(time * 1000); // Convert time from seconds to milliseconds
        });

        // Disable lag smoothing in GSAP to prevent any delay in scroll animations
        gsap.ticker.lagSmoothing(0);
        // lenis

        	if (window.innerWidth > 991) {
			// animation line
			gsap.utils.toArray(".animation-line").forEach((element) => {
				const delay = parseFloat(element.getAttribute("data-delay")) || 0;
				gsap.fromTo(
					element,
					{
						y: 30,
						opacity: 0,
					},
					{
						y: 0,
						opacity: 1,
						duration: 1.5,
						delay: delay / 1000,
						ease: "power2.out",
						scrollTrigger: {
							trigger: element,
							start: "top 100%",
							toggleActions: "play none none none"
						},
					}
				);
			});
        }





    });
})(jQuery);