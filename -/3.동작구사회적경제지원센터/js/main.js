$(function () {

    var $slick_carousel = $('#section1 .slick');
    $slick_carousel.on('init', function (event, slick) {
        $slick_carousel.find('.slick-current').removeClass('slick-active');
        setTimeout(function () {
            $slick_carousel.find('.slick-current').addClass('slick-active');
        }, 100);
    });

    $('#section1 .slick').on('afterChange', function (slick, currentSlide, nextSlide) {
        $('#section1 .text_box').fadeIn();
        $('#section1 .slick-dots').show();
    });
    $('#section1 .slick').on('beforeChange', function (slick, currentSlide, nextSlide) {
        $('#section1 .text_box').fadeOut();
        $('#section1 .slick-dots').hide();
    });

    /* section1 */
    $('#section1 .slick').slick({
        autoplay: true,
        arrows: true,
        dots: true,
        prevArrow: $('#section1 .control .prev'),
        nextArrow: $('#section1 .control .next'),
        slidesToShow: 1,
        slidesToScroll: 1,
        fade: true,
        zIndex: 1000,
        autoplaySpeed: 5000,
        speed: 1500,
    });

    /* section3 */
    $('#section3 .slick1').slick({
        autoplay: true,
        arrows: true,
        prevArrow: $('#section3 .control1 .prev'),
        nextArrow: $('#section3 .control1 .next'),
        slidesToShow: 1,
        slidesToScroll: 1,
        zIndex: 1000,
        autoplaySpeed: 5000,
        speed: 1500,
    });

    /* section3 */
    $('#section3 .slick2').slick({
        autoplay: true,
        arrows: true,
        prevArrow: $('#section3 .control2 .prev'),
        nextArrow: $('#section3 .control2 .next'),
        slidesToShow: 1,
        slidesToScroll: 1,
        zIndex: 1000,
        autoplaySpeed: 5000,
        speed: 1500,
    });

    /* section3 */
    $('#section3 .slick3').slick({
        autoplay: true,
        arrows: true,
        prevArrow: $('#section3 .control3 .prev'),
        nextArrow: $('#section3 .control3 .next'),
        slidesToShow: 1,
        slidesToScroll: 1,
        zIndex: 1000,
        autoplaySpeed: 5000,
        speed: 1500,
    });

    $('#section3 .control1 button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#section3 .control1 button.play').show();
            $('#section3 .slick1').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#section3 .control1 button.pause').show();
            $('#section3 .slick1').slick('slickPlay');
        }
    });

    $('#section3 .control2 button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#section3 .control2 button.play').show();
            $('#section3 .slick2').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#section3 .control2 button.pause').show();
            $('#section3 .slick2').slick('slickPlay');
        }
    });


    $('#section3 .control3 button').on('click', function(e) {
        e.preventDefault();
        if ($(this).hasClass('pause')) {
            $(this).hide();
            $('#section3 .control3 button.play').show();
            $('#section3 .slick3').slick('slickPause');
        } else if ($(this).hasClass('play')) {
            $(this).hide();
            $('#section3 .control3 button.pause').show();
            $('#section3 .slick3').slick('slickPlay');
        }
    });

    $(window).on('load', function () {
        AOS.init({
            duration: 1500
        });
    });

});