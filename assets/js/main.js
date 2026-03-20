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

        // let heroSlider = new Swiper(".hero-slider", {
        //     loop: true,
        //     autoplay: {
        //         delay: 3000,
        //         disableOnInteraction: false,
        //     },
        //     pagination: {
        //         el: ".swiper-pagination",
        //         clickable: true,
        //     },
        //     slideToClickedSlide: true,
        //     speed: 800,
        // });
        function animateHeroSlide(activeSlide) {
            let heroElementInfo = activeSlide.querySelector(".hero-slider-item-content");

            gsap.fromTo(
                heroElementInfo,
                {
                    y: 50,
                    opacity: 0,
                },
                {
                    y: 0,
                    opacity: 1,
                    duration: 1,
                    ease: "power3.out",
                }
            );
        }
        let heroSlider = new Swiper(".hero-slider", {
            loop: true,
            autoplay: {
                delay: 3000,
                disableOnInteraction: false,
            },
            pagination: {
                el: ".swiper-pagination",
                clickable: true,
            },
            slideToClickedSlide: true,
            speed: 800,
            on: {
                init: function () {
                    let activeSlide = this.slides[this.activeIndex];
                    animateHeroSlide(activeSlide);
                },
                slideChangeTransitionStart: function () {
                    // reset animation
                    this.slides.forEach((slide) => {
                        let heroElement = slide.querySelector(".hero-slider-item-content");
                        if (heroElement) {
                            gsap.set(heroElement, { opacity: 0, y: 50 });
                        }
                    });
                },
                slideChangeTransitionEnd: function () {
                    let activeSlide = this.slides[this.activeIndex];
                    animateHeroSlide(activeSlide);
                },
            },
        });
        let benefitsSlider = new Swiper(".swiper.benefits-slider", {

            centeredSlides: true,
            loop: true,
            navigation: {
                nextEl: ".swiper-button-next",
                prevEl: ".swiper-button-prev",
            },
            breakpoints: {
                0: {
                    slidesPerView: 1,
                    spaceBetween: 50
                },
                576: {
                    slidesPerView: 2,
                    spaceBetween: 25
                },
                768: {
                    slidesPerView: 2,
                    spaceBetween: 30
                },
                992: {
                    slidesPerView: 3,
                    spaceBetween: 40
                },
                1200: {
                    slidesPerView: 3,
                    spaceBetween: 45
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

        gsap.registerPlugin(ScrollTrigger);
        function initAnimation() {
            ScrollTrigger.getAll().forEach(trigger => trigger.kill());
            if (window.innerWidth > 991) {
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
        }
        initAnimation();
        let resizeTimeout;
        window.addEventListener("resize", () => {
            clearTimeout(resizeTimeout);
            resizeTimeout = setTimeout(() => {
                initAnimation();
            }, 300);
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

        	





    });
})(jQuery);