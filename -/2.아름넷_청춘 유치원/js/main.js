$(function () {

    $('#section4 .slick').slick({
        autoplay: true,
        arrows: true,
        variableWidth: true,
        prevArrow: $('#section4 .control .prev'),
        nextArrow: $('#section4 .control .next'),
        draggable: true,
        infinite: true,

        slidesToScroll: 1,
        zIndex: 1000,
        autoplaySpeed: 2000,
        speed: 1500,
    });

    /* section1 */
    var $slick_carousel = $('#section1 .slick');
    $slick_carousel.on('init', function (event, slick) {
        $slick_carousel.find('.slick-current').removeClass('slick-active');
        setTimeout(function () {
            $slick_carousel.find('.slick-current').addClass('slick-active');
        }, 100);
    });

    $('#section1 .slick').slick({
        autoplay: true,
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
    });


});