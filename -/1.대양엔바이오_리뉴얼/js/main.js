$(function () {

    /* aos */
    $(window).on('load', function () {
        AOS.init({
            duration: 1500
        });
    });

    $(window).on('load resize', function () {
        var windowWidth = $(this).width();

        if (windowWidth > 769) {
            $(window).scroll(function () {
                if ($(this).scrollTop() > 600) {
                    $('#section3').addClass('active');
                } else {
                    $('#section3').removeClass('active');
                }
            });
        }
        if (windowWidth < 577) {

            $(window).scroll(function () {
                if ($(this).scrollTop() > 250) {
                    $('#section3').addClass('active');
                } else {
                    $('#section3').removeClass('active');
                }
            });
        }
    });

    $(window).scroll(function () {
        if ($(this).scrollTop()+180 >= Math.ceil($('#section5').offset().top)) {
            $('#section5').addClass('active');
        } else {
            $('#section5').removeClass('active');
        }
    });

    /* section1 */
    $('#section1 .slick').on('beforeChange', function (event, slick, currentSlide, nextSlide) {
        $('#section1 .main_box .text_box').hide();
    });

    $('#section1 .slick').on('afterChange', function (event, slick, currentSlide, nextSlide) {
        $('#section1 .main_box .text_box').fadeIn();
    });

    var $slick_carousel = $('#section1 .slick');
    $slick_carousel.on('init', function (event, slick) {
        $slick_carousel.find('.slick-current').removeClass('slick-active');
        setTimeout(function () {
            $slick_carousel.find('.slick-current').addClass('slick-active');
        }, 100);
    });

    $('#section1 .slick').slick({
        dots: true,
        autoplay: false,
        arrows: false,
        accessibility: false,
        draggable: true,
        infinite: true,
        slidesToShow: 1,
        slidesToScroll: 1,
        zIndex: 1000,
        pauseOnHover: false,
        autoplaySpeed: 5000,
        speed: 1500,
        fade: true
    });


/*
    var ww = $(window).width();
    var mySwiper = undefined;

    function initSwiper() {

        if (ww < 1024 && mySwiper == undefined) {
            mySwiper = new Swiper("#section5 .swiper-container", {
                slidesPerView: 'auto',
                simulateTouch: true,
                loop: true,
                autoplay: {
                    delay: 2500,
                    disableOnInteraction: false,
                },
                navigation: {
                    nextEl: "#section5 .swiper-button-next",
                    prevEl: "#section5 .swiper-button-prev",
                },
            });
        } else if (ww >= 1024 && mySwiper != undefined) {
            mySwiper.destroy();
            mySwiper = undefined;
        }
    }

    initSwiper();

    $(window).on('resize', function () {
        ww = $(window).width();
        initSwiper();
    });
*/
    /* section2 */
    var swiper = new Swiper("#section2 .swiper-container", {
        spaceBetween: 37,
        slidesPerView: 4,
        speed: 1200,
        loopAdditionalSlides: 1,
        autoplay: {
            delay: 2000,
            disableOnInteraction: false,
        },
        loop: true,
        navigation: {
            nextEl: "#section2 .swiper-button-next",
            prevEl: "#section2 .swiper-button-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 1,
                autoplay: {
                    delay: 2000,
                    disableOnInteraction: false,
                },
                speed: 1200,
                spaceBetween: 0,
                centeredSlides: true,
            },

        },


    });

    /* section7 */
    var swiper = new Swiper("#section7 .swiper-container", {
        spaceBetween: 50,
        slidesPerView:3,
        loopAdditionalSlides: 1,
        speed: 700,
        auto: false,
  
        /*
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
        */
        loop: true,
        navigation: {
            nextEl: "#section7 .swiper-button-next",
            prevEl: "#section7 .swiper-button-prev",
        },
        breakpoints: {
            1200: {
                slidesPerView: 3,
                spaceBetween: 35,
                centeredSlides: true,
            },
            768: {
                slidesPerView: 3,
                spaceBetween: 20,
                centeredSlides: true,
            },
            576: {
                slidesPerView: 1,
                spaceBetween: 20,
                centeredSlides: true,
            },
        },

    });

    /* 스크롤 시 자동재생 */
    $(window).scroll(function () {
        if ($(window).scrollTop() > $('body').offset().top) {
            $('#video').addClass('play');
            $('.play').get(0).play();
        } else {
            $('.play').get(0).pause();
            $('#video').removeClass('play');

        }

    });


});